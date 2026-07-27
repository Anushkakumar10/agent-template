import logging
from collections.abc import AsyncGenerator

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

logger = logging.getLogger("uvicorn")


def build_engine(url: str):
    connect_args = {}
    if url.startswith("sqlite"):
        connect_args["check_same_thread"] = False
    return create_async_engine(
        url,
        connect_args=connect_args,
        echo=False,
        future=True,
    )


current_db_url = settings.DATABASE_URL
engine = build_engine(current_db_url)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for providing database session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def _ensure_postgres_database_exists(db_url: str):
    """If database doesn't exist on PostgreSQL, connect to 'postgres' system DB and CREATE DATABASE."""
    try:
        from yarl import URL

        url_obj = URL(db_url)
        db_name = url_obj.path.lstrip("/")
        if db_name and db_name != "postgres":
            # Engine pointing to default system database 'postgres'
            sys_url = str(url_obj.with_path("/postgres"))
            sys_engine = create_async_engine(sys_url, isolation_level="AUTOCOMMIT")
            async with sys_engine.connect() as conn:
                res = await conn.execute(
                    text(f"SELECT 1 FROM pg_database WHERE datname='{db_name}'")
                )
                if not res.scalar():
                    logger.info(f"[PostgreSQL] Creating database '{db_name}'...")
                    await conn.execute(text(f'CREATE DATABASE "{db_name}"'))
            await sys_engine.dispose()
    except Exception as e:
        logger.debug(f"Database auto-creation check skipped: {e}")


async def init_db() -> None:
    """Initialize database tables with automatic PostgreSQL DB creation if needed."""
    if not current_db_url.startswith("sqlite"):
        await _ensure_postgres_database_exists(current_db_url)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info(f"Database successfully initialized using {current_db_url}")
