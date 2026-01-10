{%- if cookiecutter.enable_admin_panel and cookiecutter.use_postgresql %}
"""SQLAdmin configuration."""

from typing import ClassVar

from sqlalchemy import create_engine
from sqladmin import Admin, ModelView
{%- if cookiecutter.admin_require_auth %}
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
{%- endif %}

from app.core.config import settings
{%- if cookiecutter.admin_require_auth %}
from app.core.security import verify_password
{%- endif %}
from app.db.models.user import User
{%- if cookiecutter.enable_session_management %}
from app.db.models.session import Session
{%- endif %}
{%- if cookiecutter.include_example_crud %}
from app.db.models.item import Item
{%- endif %}
{%- if cookiecutter.enable_conversation_persistence %}
from app.db.models.conversation import Conversation, Message, ToolCall
{%- endif %}
{%- if cookiecutter.enable_webhooks %}
from app.db.models.webhook import Webhook, WebhookDelivery
{%- endif %}

# SQLAdmin requires a synchronous engine
sync_engine = create_engine(settings.DATABASE_URL_SYNC, echo=settings.DEBUG)

{%- if cookiecutter.admin_require_auth %}


class AdminAuth(AuthenticationBackend):
    """Admin panel authentication backend.

    Requires superuser credentials to access the admin panel.
    """

    async def login(self, request: Request) -> bool:
        """Validate admin login credentials."""
        form = await request.form()
        email = form.get("username")
        password = form.get("password")

        if not email or not password:
            return False

        # Get user from database
        from sqlalchemy.orm import Session as DBSession

        with DBSession(sync_engine) as session:
            user = session.query(User).filter(User.email == email).first()

            if (
                user
                and verify_password(str(password), user.hashed_password)
                and user.is_superuser
            ):
                # Store user info in session
                request.session["admin_user_id"] = str(user.id)
                request.session["admin_email"] = user.email
                return True

        return False

    async def logout(self, request: Request) -> bool:
        """Clear admin session."""
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        """Check if user is authenticated."""
        admin_user_id = request.session.get("admin_user_id")
        if not admin_user_id:
            return False

        # Verify user still exists and is superuser
        from sqlalchemy.orm import Session as DBSession

        with DBSession(sync_engine) as session:
            user = session.query(User).filter(User.id == admin_user_id).first()
            if user and user.is_superuser and user.is_active:
                return True

        # User no longer valid, clear session
        request.session.clear()
        return False
{%- endif %}


# === User Management ===


class UserAdmin(ModelView, model=User):  # type: ignore[call-arg]
    """User admin view."""

    name = "User"
    name_plural = "Users"
    icon = "fa-solid fa-user"

    column_list: ClassVar = [
        User.id,
        User.email,
        User.full_name,
        User.is_active,
        User.is_superuser,
        User.role,
        User.created_at,
    ]
    column_searchable_list: ClassVar = [User.email, User.full_name]
    column_sortable_list: ClassVar = [User.id, User.email, User.is_active, User.created_at]
    form_excluded_columns: ClassVar = [User.hashed_password, User.created_at, User.updated_at]
    can_create: ClassVar = True
    can_edit: ClassVar = True
    can_delete: ClassVar = True
    can_view_details: ClassVar = True

{%- if cookiecutter.enable_session_management %}


class SessionAdmin(ModelView, model=Session):  # type: ignore[call-arg]
    """Session admin view."""

    name = "Session"
    name_plural = "Sessions"
    icon = "fa-solid fa-key"

    column_list: ClassVar = [
        Session.id,
        Session.user_id,
        Session.device_name,
        Session.device_type,
        Session.ip_address,
        Session.is_active,
        Session.created_at,
        Session.last_used_at,
    ]
    column_searchable_list: ClassVar = [Session.device_name, Session.ip_address]
    column_sortable_list: ClassVar = [Session.id, Session.created_at, Session.last_used_at]
    form_excluded_columns: ClassVar = [Session.refresh_token_hash]
    can_create: ClassVar = False  # Sessions are created via login
    can_edit: ClassVar = True
    can_delete: ClassVar = True
    can_view_details: ClassVar = True
{%- endif %}

{%- if cookiecutter.include_example_crud %}


# === Items (Example CRUD) ===


class ItemAdmin(ModelView, model=Item):  # type: ignore[call-arg]
    """Item admin view."""

    name = "Item"
    name_plural = "Items"
    icon = "fa-solid fa-box"

    column_list: ClassVar = [
        Item.id,
        Item.title,
        Item.is_active,
        Item.created_at,
    ]
    column_searchable_list: ClassVar = [Item.title, Item.description]
    column_sortable_list: ClassVar = [Item.id, Item.title, Item.created_at]
    can_create: ClassVar = True
    can_edit: ClassVar = True
    can_delete: ClassVar = True
    can_view_details: ClassVar = True
{%- endif %}

{%- if cookiecutter.enable_conversation_persistence %}


# === AI Conversations ===


class ConversationAdmin(ModelView, model=Conversation):  # type: ignore[call-arg]
    """Conversation admin view."""

    name = "Conversation"
    name_plural = "Conversations"
    icon = "fa-solid fa-comments"

    column_list: ClassVar = [
        Conversation.id,
        Conversation.user_id,
        Conversation.title,
        Conversation.is_archived,
        Conversation.created_at,
    ]
    column_searchable_list: ClassVar = [Conversation.title]
    column_sortable_list: ClassVar = [Conversation.id, Conversation.created_at]
    can_create: ClassVar = True
    can_edit: ClassVar = True
    can_delete: ClassVar = True
    can_view_details: ClassVar = True


class MessageAdmin(ModelView, model=Message):  # type: ignore[call-arg]
    """Message admin view."""

    name = "Message"
    name_plural = "Messages"
    icon = "fa-solid fa-message"

    column_list: ClassVar = [
        Message.id,
        Message.conversation_id,
        Message.role,
        Message.model_name,
        Message.tokens_used,
        Message.created_at,
    ]
    column_searchable_list: ClassVar = [Message.content, Message.role]
    column_sortable_list: ClassVar = [Message.id, Message.role, Message.created_at]
    can_create: ClassVar = True
    can_edit: ClassVar = True
    can_delete: ClassVar = True
    can_view_details: ClassVar = True


class ToolCallAdmin(ModelView, model=ToolCall):  # type: ignore[call-arg]
    """ToolCall admin view."""

    name = "Tool Call"
    name_plural = "Tool Calls"
    icon = "fa-solid fa-wrench"

    column_list: ClassVar = [
        ToolCall.id,
        ToolCall.message_id,
        ToolCall.tool_name,
        ToolCall.status,
        ToolCall.duration_ms,
        ToolCall.started_at,
    ]
    column_searchable_list: ClassVar = [ToolCall.tool_name, ToolCall.tool_call_id]
    column_sortable_list: ClassVar = [ToolCall.id, ToolCall.tool_name, ToolCall.started_at]
    can_create: ClassVar = False  # Tool calls are created by the agent
    can_edit: ClassVar = True
    can_delete: ClassVar = True
    can_view_details: ClassVar = True
{%- endif %}

{%- if cookiecutter.enable_webhooks %}


# === Webhooks ===


class WebhookAdmin(ModelView, model=Webhook):  # type: ignore[call-arg]
    """Webhook admin view."""

    name = "Webhook"
    name_plural = "Webhooks"
    icon = "fa-solid fa-link"

    column_list: ClassVar = [
        Webhook.id,
        Webhook.name,
        Webhook.url,
        Webhook.is_active,
        Webhook.created_at,
    ]
    column_searchable_list: ClassVar = [Webhook.name, Webhook.url]
    column_sortable_list: ClassVar = [Webhook.id, Webhook.name, Webhook.is_active, Webhook.created_at]
    form_excluded_columns: ClassVar = [Webhook.secret]  # Hide secret in forms
    can_create: ClassVar = True
    can_edit: ClassVar = True
    can_delete: ClassVar = True
    can_view_details: ClassVar = True


class WebhookDeliveryAdmin(ModelView, model=WebhookDelivery):  # type: ignore[call-arg]
    """WebhookDelivery admin view."""

    name = "Webhook Delivery"
    name_plural = "Webhook Deliveries"
    icon = "fa-solid fa-paper-plane"

    column_list: ClassVar = [
        WebhookDelivery.id,
        WebhookDelivery.webhook_id,
        WebhookDelivery.event_type,
        WebhookDelivery.response_status,
        WebhookDelivery.success,
        WebhookDelivery.attempt_count,
        WebhookDelivery.created_at,
    ]
    column_searchable_list: ClassVar = [WebhookDelivery.event_type]
    column_sortable_list: ClassVar = [
        WebhookDelivery.id,
        WebhookDelivery.event_type,
        WebhookDelivery.success,
        WebhookDelivery.created_at,
    ]
    can_create: ClassVar = False  # Deliveries are created by webhook dispatch
    can_edit: ClassVar = False
    can_delete: ClassVar = True
    can_view_details: ClassVar = True
{%- endif %}


def setup_admin(app):
    """Setup SQLAdmin for the FastAPI app."""
    {%- if cookiecutter.admin_require_auth %}
    authentication_backend = AdminAuth(secret_key=settings.SECRET_KEY)
    admin = Admin(
        app,
        sync_engine,
        title="{{ cookiecutter.project_name }} Admin",
        authentication_backend=authentication_backend,
    )
    {%- else %}
    admin = Admin(
        app,
        sync_engine,
        title="{{ cookiecutter.project_name }} Admin",
    )
    {%- endif %}

    # User management
    admin.add_view(UserAdmin)
{%- if cookiecutter.enable_session_management %}
    admin.add_view(SessionAdmin)
{%- endif %}

{%- if cookiecutter.include_example_crud %}
    # Items
    admin.add_view(ItemAdmin)
{%- endif %}

{%- if cookiecutter.enable_conversation_persistence %}
    # AI Conversations
    admin.add_view(ConversationAdmin)
    admin.add_view(MessageAdmin)
    admin.add_view(ToolCallAdmin)
{%- endif %}

{%- if cookiecutter.enable_webhooks %}
    # Webhooks
    admin.add_view(WebhookAdmin)
    admin.add_view(WebhookDeliveryAdmin)
{%- endif %}

    return admin
{%- else %}
"""Admin panel - not configured."""
{%- endif %}
