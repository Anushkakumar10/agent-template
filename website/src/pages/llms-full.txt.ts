import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.origin ?? "https://template.ak-labs.io";
  const body = `# Full-Stack AI Agent Template — Complete Reference

> ${siteUrl}

## What is this?

The Full-Stack AI Agent Template is an open-source project generator that creates production-ready AI/LLM applications with FastAPI backend and Next.js frontend. One CLI command generates a complete project with your choice of AI framework, database, authentication, and 75+ configuration options.

Published on PyPI as \`ak-agent-template\`. MIT licensed. Built by AK Labs (ak-labs.io), an Applied Agentic AI Engineering Consultancy with 30+ production AI agent implementations.

---

## Quick Start

\`\`\`bash
pip install ak-agent-template
ak-agent-template create my_app --preset ai-agent
cd my_app
make docker-db        # Start PostgreSQL
make install          # Install dependencies
make db-migrate       # Generate migration
make db-upgrade       # Apply migration
make create-admin     # Create admin user
make run              # Start backend at localhost:8000
# In another terminal:
cd frontend && bun install && bun dev  # Start frontend at localhost:3000
\`\`\`

Alternative: use the web configurator at ${siteUrl}/configurator/ — a 9-step visual wizard that generates the project as a ZIP download entirely client-side.

---

## AI Frameworks

The template supports 5 AI agent frameworks, each pre-configured with WebSocket streaming, tool calling, and conversation persistence:

### Pydantic AI (Default)
Type-safe AI agent framework by the creators of Pydantic. Uses Python type hints for structured outputs, automatic validation, and retries. Best for production systems that need reliability and type safety. Integrated with Logfire for observability.

### LangChain
The most popular LLM framework. Extensive ecosystem of integrations, chains, and tools. Best for projects that need access to LangChain's large library of pre-built components. Integrated with LangSmith for observability.

### LangGraph
Built on LangChain, adds stateful multi-step workflows with a graph-based execution model. Best for complex agent workflows that need conditional branching, cycles, and state management.

### CrewAI
Multi-agent orchestration framework. Define agents with roles, goals, and backstories. Best for projects that need multiple specialized agents working together on complex tasks.

### DeepAgents
Modular agent architecture with planning, filesystem operations, subagent delegation, and skills. Human-in-the-loop approval for tool calls. Best for autonomous agent systems that need structured planning and approval workflows.

---

## LLM Providers

- **OpenAI** — GPT-4o, GPT-4o-mini, and other OpenAI models
- **Anthropic** — Claude Sonnet, Claude Haiku, and other Anthropic models
- **OpenRouter** — Access 200+ models from multiple providers with one API key (Pydantic AI only)

---

## Databases

- **PostgreSQL** — Recommended for production. Supports SQLAlchemy and SQLModel ORMs. Required for admin panel, conversation persistence.
- **MongoDB** — Document database option with Motor async driver.
- **SQLite** — Zero-config option for development and small deployments.
- **None** — API-only projects without persistence.

---

## Authentication

- **JWT** — JSON Web Token authentication with access/refresh token rotation. Optional Google OAuth.
- **API Keys** — Simple API key authentication for service-to-service communication.
- **Both** — JWT + API Keys combined.
- **None** — No authentication (development/internal use).

---

## Infrastructure Options

- **Redis** — Caching, rate limiting, session storage, background task broker
- **Background Tasks** — Celery (most mature), TaskIQ (async-native), ARQ (lightweight)
- **Rate Limiting** — Token bucket with configurable requests/period
- **File Storage** — Local filesystem or cloud storage
- **Webhooks** — Inbound/outbound webhook support
- **WebSockets** — Real-time streaming with optional auth
- **CORS** — Cross-origin resource sharing configuration
- **Admin Panel** — Django-style admin (requires PostgreSQL + SQLAlchemy)

---

## Observability

- **Logfire** — Pydantic's observability platform. Auto-instruments FastAPI, database, Redis, Celery, HTTPX.
- **Sentry** — Error tracking and performance monitoring.
- **Prometheus** — Metrics collection with Grafana dashboards.

---

## DevOps

- **Docker Compose** — Development and production configurations with health checks.
- **Kubernetes** — Deployment manifests for container orchestration.
- **Reverse Proxy** — Traefik (included or external) or Nginx (included or external) with automatic TLS.
- **CI/CD** — GitHub Actions or GitLab CI pipelines.
- **Pre-commit** — Ruff linting, formatting, and type checking hooks.
- **Makefile** — Common development commands (install, run, test, migrate, etc.).

---

## Frontend

- **Next.js 15** — React 19, TypeScript, Tailwind CSS, App Router.
- **Optional i18n** — Internationalization support.
- **Chat Interface** — Pre-built AI agent chat with WebSocket streaming.

---

## Web Configurator

The web configurator at ${siteUrl}/configurator/ is a 9-step wizard:

1. **Project Info** — Name, description, author, Python version
2. **Database** — PostgreSQL, MongoDB, SQLite, or none
3. **Authentication** — JWT, API keys, OAuth
4. **AI Agent** — Framework, LLM provider, streaming, persistence
5. **Infrastructure** — Background tasks, Redis, caching, observability
6. **Integrations** — WebSockets, file storage, webhooks, admin panel
7. **Dev Tools** — Docker, Kubernetes, CI/CD, testing
8. **Frontend** — Next.js with optional i18n
9. **Review** — Final config review, download ZIP or copy CLI command

The configurator runs entirely client-side using Nunjucks (Jinja2-compatible JS engine) + JSZip. No server required — 246 template files are bundled into a single JSON at build time.

---

## 3 Presets

### Minimal
API-only FastAPI project. No database, no auth, no Docker. For prototyping or microservices.

### Production
Full-stack with PostgreSQL, JWT auth, Redis caching, Sentry + Prometheus monitoring, Docker + Kubernetes, GitHub Actions CI/CD.

### AI Agent (Most Popular)
Pydantic AI with WebSocket streaming, conversation persistence, PostgreSQL, Redis, Next.js frontend, Docker, GitHub Actions.

---

## Frequently Asked Questions

### Which AI framework should I choose?
- **Pydantic AI** for type-safe, production-grade agents with Logfire observability
- **LangChain** for access to the largest ecosystem of integrations and tools
- **LangGraph** for complex multi-step workflows with state management
- **CrewAI** for multi-agent collaboration with role-based agents
- **DeepAgents** for autonomous agents with planning and human-in-the-loop approval

### Can I switch AI frameworks after generating?
Yes. Regenerate the project with a different --ai-framework flag. Your custom code outside the generated agent module is preserved if you use version control.

### Is this free?
Yes. The template is MIT licensed and free to use for personal and commercial projects. No premium tiers, no usage limits.

### How do I deploy to production?
The template includes production Docker Compose files. Copy .env.example to .env.prod, configure credentials, and run: docker compose -f docker-compose.prod.yml up -d --build

### What Python versions are supported?
Python 3.11, 3.12, and 3.13. Select during project generation.

---

## Links

- Website: ${siteUrl}/
- Configurator: ${siteUrl}/configurator/
- GitHub: https://github.com/anushka-kumar/agent-template
- PyPI: https://pypi.org/project/ak-agent-template/
- AK Labs: https://ak-labs.io/
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
