.PHONY: help install dev docker-db backend-dev frontend-dev test test-backend test-frontend

help:
	@echo "Agent Template Management Dashboard"
	@echo ""
	@echo "Commands:"
	@echo "  make install       Install backend and frontend dependencies"
	@echo "  make docker-db     Start PostgreSQL container via Docker Compose"
	@echo "  make backend-dev   Start FastAPI backend dev server (:4100)"
	@echo "  make frontend-dev  Start Next.js frontend dev server (:4000)"
	@echo "  make test          Run backend & frontend tests"

install:
	uv sync
	cd frontend && bun install

docker-db:
	docker compose up -d

backend-dev:
	uv run uvicorn app.main:app --host 0.0.0.0 --port 4100 --reload --app-dir backend

frontend-dev:
	cd frontend && bun run dev

test-backend:
	uv run pytest backend/tests/

test-frontend:
	cd frontend && bun run type-check

test: test-backend test-frontend
