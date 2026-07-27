from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.deps import get_current_user
from app.models import AgentProject, Deployment, User
from app.schemas import DeploymentCreate, DeploymentOut
from app.services.deployers.registry import get_deployer, list_deployers

router = APIRouter(prefix="", tags=["Deployments"])


@router.get("/deployments/providers")
async def get_providers():
    """List supported cloud deployment providers."""
    return list_deployers()


@router.get("/agents/{agent_id}/deployments", response_model=list[DeploymentOut])
async def list_agent_deployments(
    agent_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> list[DeploymentOut]:
    """List deployment history for an agent project."""
    stmt = select(AgentProject).where(
        AgentProject.id == agent_id,
        AgentProject.user_id == current_user.id,
    )
    project = (await db.execute(stmt)).scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Agent project not found")

    stmt_dep = select(Deployment).where(Deployment.agent_id == agent_id).order_by(Deployment.created_at.desc())
    deps = (await db.execute(stmt_dep)).scalars().all()
    return [DeploymentOut.model_validate(d) for d in deps]


@router.post("/agents/{agent_id}/deploy", response_model=DeploymentOut, status_code=status.HTTP_201_CREATED)
async def deploy_agent(
    agent_id: str,
    dep_in: DeploymentCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> DeploymentOut:
    """Trigger deployment for an agent project using selected provider (e.g. Vercel, Render)."""
    stmt = select(AgentProject).where(
        AgentProject.id == agent_id,
        AgentProject.user_id == current_user.id,
    )
    project = (await db.execute(stmt)).scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Agent project not found")

    deployer = get_deployer(dep_in.provider)
    if not deployer:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported deployment provider '{dep_in.provider}'. Supported: vercel, render",
        )

    # Execute deployment provider workflow
    result = await deployer.deploy(
        agent_config=project.config,
        agent_name=project.name,
        agent_slug=project.slug,
        api_key=dep_in.api_key,
        custom_config=dep_in.config,
    )

    # Save record to database
    deployment = Deployment(
        agent_id=project.id,
        provider=deployer.provider_id,
        target_type=dep_in.target_type or deployer.target_type,
        status=result.status,
        deployment_url=result.deployment_url,
        logs=result.logs,
    )
    db.add(deployment)

    # Update project status
    project.status = "deployed"

    await db.flush()
    await db.refresh(deployment)

    return DeploymentOut.model_validate(deployment)
