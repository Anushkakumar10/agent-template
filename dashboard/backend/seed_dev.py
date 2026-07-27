import asyncio
import sys
from pathlib import Path

# Ensure dashboard/backend is in python path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.database import AsyncSessionLocal, init_db  # noqa: E402
from app.models import AgentProject, User  # noqa: E402
from app.security import create_access_token, get_password_hash  # noqa: E402
from sqlalchemy import select  # noqa: E402


async def seed_data():
    print("Initializing database tables...")
    await init_db()

    async with AsyncSessionLocal() as session:
        # Check if sample user exists
        stmt = select(User).where((User.email == "admin@example.com") | (User.username == "admin"))
        user = (await session.execute(stmt)).scalar_one_or_none()

        if not user:
            print("Creating sample developer user...")
            hashed_pwd = get_password_hash("admin123")
            user = User(
                email="admin@example.com",
                username="admin",
                full_name="Sample Developer",
                hashed_password=hashed_pwd,
                is_active=True,
            )
            session.add(user)
            await session.commit()
            await session.refresh(user)
            print(f"[SUCCESS] User created successfully! (ID: {user.id})")
        else:
            print(f"[INFO] Sample user '{user.username}' already exists. (ID: {user.id})")

        # Check if sample project exists
        stmt_proj = select(AgentProject).where(AgentProject.user_id == user.id)
        proj = (await session.execute(stmt_proj)).scalar_one_or_none()

        if not proj:
            print("Creating sample agent project...")
            proj = AgentProject(
                name="Sample AI Assistant",
                slug="sample-ai-assistant",
                description="Sample full-stack agent project for dev testing.",
                user_id=user.id,
                config={
                    "project_name": "Sample AI Assistant",
                    "project_slug": "sample-ai-assistant",
                    "agent_framework": "pydantic_ai",
                    "llm_provider": "openai",
                    "vector_store": "pgvector",
                },
                status="configured",
            )
            session.add(proj)
            await session.commit()
            await session.refresh(proj)
            print(f"[SUCCESS] Sample project created! (ID: {proj.id})")
        else:
            print(f"[INFO] Sample project '{proj.name}' already exists.")

        # Generate access token
        token = create_access_token(user.id)

        print("\n" + "=" * 50)
        print("DEV SEED COMPLETE")
        print("=" * 50)
        print("Credentials:")
        print("  Email:    admin@example.com")
        print("  Username: admin")
        print("  Password: admin123")
        print("-" * 50)
        print("JWT Access Token:")
        print(f"  {token}")
        print("=" * 50 + "\n")


if __name__ == "__main__":
    asyncio.run(seed_data())
