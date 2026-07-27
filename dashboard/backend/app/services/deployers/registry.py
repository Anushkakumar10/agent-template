from app.services.deployers.base import BaseDeployer
from app.services.deployers.render import RenderDeployer
from app.services.deployers.vercel import VercelDeployer

DEPLOYERS: dict[str, BaseDeployer] = {
    "vercel": VercelDeployer(),
    "render": RenderDeployer(),
}


def get_deployer(provider_id: str) -> BaseDeployer | None:
    """Get deployment provider by ID."""
    return DEPLOYERS.get(provider_id.lower())


def list_deployers() -> list[dict[str, str]]:
    """List registered deployment providers."""
    return [
        {
            "provider_id": d.provider_id,
            "display_name": d.display_name,
            "target_type": d.target_type,
        }
        for d in DEPLOYERS.values()
    ]
