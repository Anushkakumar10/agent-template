from typing import Any

from fastapi import APIRouter
from pydantic import ValidationError

from fastapi_gen.config import (
    AIFrameworkType,
    AuthMode,
    BackgroundTaskType,
    BillingModelType,
    BrandColorType,
    CIType,
    DatabaseType,
    EmailProviderType,
    FrontendType,
    LLMProviderType,
    OAuthProvider,
    OrmType,
    PaymentProviderType,
    PdfParserType,
    ProjectConfig,
    RerankerType,
    ReverseProxyType,
    TenancyMode,
    VectorStoreType,
)

router = APIRouter(prefix="/templates", tags=["Templates & Config"])


def _enum_options(enum_cls):
    return [{"value": item.value, "label": item.name.replace("_", " ").title()} for item in enum_cls]


@router.get("/options")
async def get_template_options():
    """Get all supported template choices, enums, and defaults for the creation wizard."""
    default_config = ProjectConfig(project_name="my_agent", enable_redis=True)
    return {
        "enums": {
            "database": _enum_options(DatabaseType),
            "orm_type": _enum_options(OrmType),
            "auth_mode": _enum_options(AuthMode),
            "oauth_provider": _enum_options(OAuthProvider),
            "ai_framework": _enum_options(AIFrameworkType),
            "llm_provider": _enum_options(LLMProviderType),
            "background_tasks": _enum_options(BackgroundTaskType),
            "frontend": _enum_options(FrontendType),
            "brand_color": _enum_options(BrandColorType),
            "ci_type": _enum_options(CIType),
            "reverse_proxy": _enum_options(ReverseProxyType),
            "vector_store": _enum_options(VectorStoreType),
            "pdf_parser": _enum_options(PdfParserType),
            "reranker_type": _enum_options(RerankerType),
            "email_provider": _enum_options(EmailProviderType),
            "tenancy": _enum_options(TenancyMode),
            "payment_provider": _enum_options(PaymentProviderType),
            "billing_model": _enum_options(BillingModelType),
        },
        "defaults": default_config.model_dump(),
    }


@router.get("/presets")
async def get_presets():
    """Get predefined configuration presets for fast project creation."""
    return [
        {
            "id": "ai-agent",
            "name": "AI Agent Assistant",
            "description": "PydanticAI agent with streaming, web search/fetch, code sandbox, and MCP client.",
            "config": {
                "ai_framework": AIFrameworkType.PYDANTIC_AI.value,
                "llm_provider": LLMProviderType.GOOGLE.value,
                "enable_web_search": True,
                "enable_web_fetch": True,
                "enable_code_execution": True,
                "enable_mcp_client": True,
                "frontend": FrontendType.NEXTJS.value,
                "database": DatabaseType.POSTGRESQL.value,
            },
        },
        {
            "id": "production-saas",
            "name": "Full SaaS Platform",
            "description": "Multi-tenant B2B SaaS with Teams, Stripe billing, transactional emails, and admin panel.",
            "config": {
                "enable_teams": True,
                "tenancy": TenancyMode.MULTI_ORG.value,
                "enable_billing": True,
                "enable_email": True,
                "enable_admin_panel": True,
                "frontend": FrontendType.NEXTJS.value,
                "database": DatabaseType.POSTGRESQL.value,
            },
        },
        {
            "id": "minimal",
            "name": "Minimal Starter",
            "description": "Lightweight FastAPI + Next.js starter with PostgreSQL database and JWT auth.",
            "config": {
                "ai_framework": AIFrameworkType.NONE.value,
                "enable_docker": False,
                "background_tasks": BackgroundTaskType.NONE.value,
                "frontend": FrontendType.NEXTJS.value,
                "database": DatabaseType.POSTGRESQL.value,
            },
        },
    ]


@router.post("/validate")
async def validate_config(config: dict[str, Any]):
    """Validate a draft configuration dictionary and check for rule violations."""
    if "project_name" not in config:
        config["project_name"] = "draft_agent"

    try:
        parsed = ProjectConfig.model_validate(config)
        return {
            "valid": True,
            "config": parsed.model_dump(),
            "errors": [],
        }
    except ValidationError as e:
        errors = [
            {"loc": " -> ".join(str(x) for x in err["loc"]), "msg": err["msg"]}
            for err in e.errors()
        ]
        return {
            "valid": False,
            "errors": errors,
        }
