from abc import ABC, abstractmethod
from typing import Any

from pydantic import BaseModel


class DeploymentResult(BaseModel):
    status: str  # "success", "failed", "deploying"
    deployment_url: str | None = None
    logs: str | None = None
    provider_deployment_id: str | None = None


class BaseDeployer(ABC):
    """Abstract base class for cloud deployment providers (Vercel, Render, AWS, K8s, etc.)."""

    provider_id: str
    display_name: str
    target_type: str  # "frontend", "backend", "fullstack"

    @abstractmethod
    async def deploy(
        self,
        agent_config: dict[str, Any],
        agent_name: str,
        agent_slug: str,
        api_key: str | None = None,
        custom_config: dict[str, Any] | None = None,
    ) -> DeploymentResult:
        """Trigger deployment for an agent project."""
        pass

    @abstractmethod
    async def check_status(self, provider_deployment_id: str) -> DeploymentResult:
        """Check status of an ongoing deployment."""
        pass
