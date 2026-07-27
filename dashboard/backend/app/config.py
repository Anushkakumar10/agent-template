from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings for dashboard backend."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    PROJECT_NAME: str = "Agent Template Dashboard API"
    VERSION: str = "0.1.0"
    API_V1_PREFIX: str = "/api"

    # Security
    SECRET_KEY: str = "super-secret-dashboard-key-change-in-production-12345"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database: Default to PostgreSQL, with support for SQLite fallback
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/agent_dashboard",
        description="Async database URL (PostgreSQL via asyncpg or SQLite via aiosqlite)",
    )


settings = Settings()
