{%- if cookiecutter.use_telegram %}
"""Telegram webhook receiver endpoint.

Registers a single endpoint that Telegram will POST updates to:
    POST /channels/telegram/{bot_id}/webhook
"""

import asyncio
import logging
from typing import Any

{%- if cookiecutter.use_postgresql %}
from uuid import UUID
{%- endif %}

from fastapi import APIRouter, HTTPException, Request, Response

from app.api.deps import ChannelBotSvc

logger = logging.getLogger(__name__)

router = APIRouter()

_background_tasks: set[asyncio.Task[None]] = set()


{%- if cookiecutter.use_postgresql %}


@router.post("/{bot_id}/webhook", status_code=200)
async def telegram_webhook(
    bot_id: UUID,
    request: Request,
    bot_service: ChannelBotSvc,
) -> Response:
    """Receive Telegram webhook updates.

    Immediately returns HTTP 200 to Telegram, then processes the update
    asynchronously in the background so Telegram does not time out.
    """
    from app.channels import get_adapter

    adapter = get_adapter("telegram")

    headers: dict[str, str] = dict(request.headers)
    payload: dict[str, Any] = await request.json()

    bot = await bot_service.find_active(bot_id)
    if bot is None:
        # Return 200 silently — Telegram should not know about inactive bots
        return Response(status_code=200)

    if bot.webhook_secret and not adapter.verify_webhook_signature(headers, bot.webhook_secret):
        raise HTTPException(status_code=403, detail="Invalid webhook signature")

    incoming = adapter.parse_incoming(payload, str(bot_id))
    if incoming is None:
        return Response(status_code=200)  # ignore non-text updates

    # Fire-and-forget — acknowledge to Telegram immediately
    task = asyncio.create_task(_process_webhook_update(incoming))
    _background_tasks.add(task)
    task.add_done_callback(_background_tasks.discard)
    return Response(status_code=200)


{%- elif cookiecutter.use_sqlite %}


@router.post("/{bot_id}/webhook", status_code=200)
async def telegram_webhook(
    bot_id: str,
    request: Request,
    bot_service: ChannelBotSvc,
) -> Response:
    """Receive Telegram webhook updates."""
    from app.channels import get_adapter

    adapter = get_adapter("telegram")

    headers: dict[str, str] = dict(request.headers)
    payload: dict[str, Any] = await request.json()

    bot = bot_service.find_active(bot_id)
    if bot is None:
        return Response(status_code=200)

    if bot.webhook_secret and not adapter.verify_webhook_signature(headers, bot.webhook_secret):
        raise HTTPException(status_code=403, detail="Invalid webhook signature")

    incoming = adapter.parse_incoming(payload, str(bot_id))
    if incoming is None:
        return Response(status_code=200)

    task = asyncio.create_task(_process_webhook_update(incoming))
    _background_tasks.add(task)
    task.add_done_callback(_background_tasks.discard)
    return Response(status_code=200)


{%- elif cookiecutter.use_mongodb %}


@router.post("/{bot_id}/webhook", status_code=200)
async def telegram_webhook(
    bot_id: str,
    request: Request,
    bot_service: ChannelBotSvc,
) -> Response:
    """Receive Telegram webhook updates."""
    from app.channels import get_adapter

    adapter = get_adapter("telegram")

    headers: dict[str, str] = dict(request.headers)
    payload: dict[str, Any] = await request.json()

    bot = await bot_service.find_active(bot_id)
    if bot is None:
        return Response(status_code=200)

    if bot.webhook_secret and not adapter.verify_webhook_signature(headers, bot.webhook_secret):
        raise HTTPException(status_code=403, detail="Invalid webhook signature")

    incoming = adapter.parse_incoming(payload, str(bot_id))
    if incoming is None:
        return Response(status_code=200)

    task = asyncio.create_task(_process_webhook_update(incoming))
    _background_tasks.add(task)
    task.add_done_callback(_background_tasks.discard)
    return Response(status_code=200)


{%- endif %}


async def _process_webhook_update(incoming: Any) -> None:
    """Process the webhook update asynchronously in the background."""
    from app.channels.router import ChannelMessageRouter

    channel_router = ChannelMessageRouter()
    try:
{%- if cookiecutter.use_postgresql %}
        from app.db.session import get_db_context

        async with get_db_context() as db:
            await channel_router.route(incoming, db)
{%- elif cookiecutter.use_sqlite %}
        from contextlib import contextmanager

        from app.db.session import get_db_session

        # NOTE: Holding a sync SQLite session across an `await` boundary is not
        # ideal — see channels/telegram.py for details.
        with contextmanager(get_db_session)() as db:
            await channel_router.route(incoming, db)
{%- elif cookiecutter.use_mongodb %}
        await channel_router.route(incoming, None)
{%- else %}
        await channel_router.route(incoming, None)
{%- endif %}
    except Exception:
        logger.exception("Error processing Telegram webhook update")
{%- endif %}
