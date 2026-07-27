.PHONY: help install dev backend-dev frontend-dev test test-backend test-frontend

help:
	@echo "Agent Template Management Dashboard"
	@echo ""
	@echo "Commands:"
	@echo "  make install       Install backend and frontend dependencies"
	@echo "  make dev           Start both backend (:4100) and frontend (:4000)"
	@echo "  make backend-dev   Start FastAPI backend dev server"
	@echo "  make frontend-dev  Start Next.js frontend dev server"
	@echo "  make test          Run backend & frontend tests"

install:
	uv sync
	cd frontend && bun install

backend-dev:
	uv run uvicorn app.main:app --host 0.0.0.0 --port 4100 --reload --app-dir backend

frontend-dev:
	cd frontend && bun run dev

test-backend:
	uv run pytest backend/tests/

test-frontend:
	cd frontend && bun run type-check

test: test-backend test-frontend
