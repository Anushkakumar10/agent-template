from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# Auth & User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)
    full_name: str | None = None


class UserLogin(BaseModel):
    email_or_username: str
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: EmailStr
    username: str
    full_name: str | None = None
    is_active: bool
    created_at: datetime


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# Agent Project Schemas
class AgentProjectCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: str | None = None
    config: dict[str, Any] = Field(default_factory=dict)


class AgentProjectUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    config: dict[str, Any] | None = None
    status: str | None = None


class AgentProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    slug: str
    description: str | None
    user_id: str
    config: dict[str, Any]
    status: str
    output_path: str | None
    created_at: datetime
    updated_at: datetime


# Deployment Schemas
class DeploymentCreate(BaseModel):
    provider: str = Field(..., description="Target provider, e.g., 'vercel', 'render'")
    target_type: str = Field(default="fullstack", description="'frontend', 'backend', or 'fullstack'")
    api_key: str | None = Field(default=None, description="Optional API key override for deployment provider")
    config: dict[str, Any] = Field(default_factory=dict)


class DeploymentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    agent_id: str
    provider: str
    target_type: str
    status: str
    deployment_url: str | None
    logs: str | None
    created_at: datetime
    updated_at: datetime
