import os
from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.deps import get_current_user
from app.models import AgentProject, User
from app.schemas import AgentProjectCreate, AgentProjectOut, AgentProjectUpdate
from app.services.generator import generate_agent_zip, validate_and_parse_config

router = APIRouter(prefix="/agents", tags=["Agent Projects"])


def cleanup_file(path: str):
    """Background task cleanup for generated temporary zip file."""
    try:
        if os.path.exists(path):
            os.remove(path)
            parent = os.path.dirname(path)
            if os.path.exists(parent) and not os.listdir(parent):
                os.rmdir(parent)
    except Exception:
        pass


@router.get("", response_model=list[AgentProjectOut])
async def list_agents(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> list[AgentProjectOut]:
    """List all agent projects owned by current user."""
    stmt = select(AgentProject).where(AgentProject.user_id == current_user.id).order_by(AgentProject.created_at.desc())
    results = await db.execute(stmt)
    projects = results.scalars().all()
    return [AgentProjectOut.model_validate(p) for p in projects]


@router.post("", response_model=AgentProjectOut, status_code=status.HTTP_201_CREATED)
async def create_agent(
    agent_in: AgentProjectCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> AgentProjectOut:
    """Create a new agent project configuration record."""
    # Ensure config has project_name set matching agent_in.name
    config = dict(agent_in.config)
    slug = agent_in.name.lower().replace(" ", "_").replace("-", "_")
    config["project_name"] = slug
    if agent_in.description:
        config["project_description"] = agent_in.description

    # Validate against ProjectConfig
    try:
        parsed_config = validate_and_parse_config(config)
        validated_dict = parsed_config.model_dump()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid agent configuration: {e}",
        )

    project = AgentProject(
        name=agent_in.name,
        slug=slug,
        description=agent_in.description,
        user_id=current_user.id,
        config=validated_dict,
        status="configured",
    )
    db.add(project)
    await db.flush()
    await db.refresh(project)

    return AgentProjectOut.model_validate(project)


@router.get("/{agent_id}", response_model=AgentProjectOut)
async def get_agent(
    agent_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> AgentProjectOut:
    """Get agent project details."""
    stmt = select(AgentProject).where(
        AgentProject.id == agent_id,
        AgentProject.user_id == current_user.id,
    )
    project = (await db.execute(stmt)).scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Agent project not found")
    return AgentProjectOut.model_validate(project)


@router.put("/{agent_id}", response_model=AgentProjectOut)
async def update_agent(
    agent_id: str,
    agent_in: AgentProjectUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> AgentProjectOut:
    """Update agent project configuration."""
    stmt = select(AgentProject).where(
        AgentProject.id == agent_id,
        AgentProject.user_id == current_user.id,
    )
    project = (await db.execute(stmt)).scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Agent project not found")

    if agent_in.name is not None:
        project.name = agent_in.name
        project.slug = agent_in.name.lower().replace(" ", "_").replace("-", "_")
    if agent_in.description is not None:
        project.description = agent_in.description
    if agent_in.status is not None:
        project.status = agent_in.status
    if agent_in.config is not None:
        cfg = dict(agent_in.config)
        cfg["project_name"] = project.slug
        try:
            parsed = validate_and_parse_config(cfg)
            project.config = parsed.model_dump()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid configuration: {e}",
            )

    await db.flush()
    await db.refresh(project)
    return AgentProjectOut.model_validate(project)


@router.delete("/{agent_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_agent(
    agent_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    """Delete agent project record."""
    stmt = select(AgentProject).where(
        AgentProject.id == agent_id,
        AgentProject.user_id == current_user.id,
    )
    project = (await db.execute(stmt)).scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Agent project not found")
    await db.delete(project)
    return None


@router.get("/{agent_id}/download-zip")
async def download_agent_zip(
    agent_id: str,
    background_tasks: BackgroundTasks,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    """Generate agent project dynamically and return downloadable .zip file."""
    stmt = select(AgentProject).where(
        AgentProject.id == agent_id,
        AgentProject.user_id == current_user.id,
    )
    project = (await db.execute(stmt)).scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Agent project not found")

    try:
        zip_path = generate_agent_zip(project.config)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate project zip: {e}",
        )

    background_tasks.add_task(cleanup_file, zip_path)
    filename = f"{project.slug}.zip"

    return FileResponse(
        path=zip_path,
        media_type="application/zip",
        filename=filename,
    )
