# CLAUDE.md

## Project Overview

**ai_agent** - FastAPI application generated with [Full-Stack AI Agent Template](https://github.com/anushka-kumar/agent-template).

**Stack:** FastAPI + Pydantic v2, PostgreSQL (async)
, JWT + API Key auth, Redis, PydanticAI, RAG (milvus), Celery, Next.js 15 (i18n)

## Commands

```bash
# Backend
cd backend
uv run uvicorn app.main:app --reload --port 8000
pytest
ruff check . --fix && ruff format .

# Database
uv run alembic upgrade head
uv run alembic revision --autogenerate -m "Description"

# Frontend
cd frontend
bun dev
bun test

# Docker
docker compose up -d

# RAG
uv run ai_agent rag-collections
uv run ai_agent rag-ingest /path/to/file.pdf --collection docs
uv run ai_agent rag-search "query" --collection docs
uv run ai_agent rag-sync-gdrive --collection docs

# Sync Sources
uv run ai_agent cmd rag-sources
uv run ai_agent cmd rag-source-add
uv run ai_agent cmd rag-source-sync
```

## Project Structure

```
backend/app/
├── api/routes/v1/    # HTTP endpoints
├── services/         # Business logic
├── repositories/     # Data access
├── schemas/          # Pydantic models
├── db/models/        # Database models
├── core/config.py    # Settings
├── agents/           # AI agents
├── rag/              # RAG (embeddings, vector store, ingestion)
│   └── connectors/   # Sync source connectors (Google Drive, S3)
└── commands/         # CLI commands
```

## Key Conventions

- Use `db.flush()` in repositories (not `commit`)
- Services raise domain exceptions (`NotFoundError`, `AlreadyExistsError`)
- Schemas: separate `Create`, `Update`, `Response` models
- Commands auto-discovered from `app/commands/`
- Document ingestion via CLI and API upload
- Sync sources: configurable connectors with scheduled sync

## Environment Variables

Key variables in `.env`:
```bash
ENVIRONMENT=local
POSTGRES_HOST=localhost
POSTGRES_PASSWORD=secret
SECRET_KEY=change-me-use-openssl-rand-hex-32
OPENAI_API_KEY=sk-...
AI_MODEL=gpt-4.1-mini           # Default LLM model for chat
AI_AVAILABLE_MODELS=             # JSON list of models shown in UI selector (auto-configured)
AI_TEMPERATURE=0.7               # LLM temperature (0.0-1.0)
LOGFIRE_TOKEN=your-token
MILVUS_HOST=localhost
MILVUS_PORT=19530
```
