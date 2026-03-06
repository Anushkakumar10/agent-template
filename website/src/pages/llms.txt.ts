import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.origin ?? "https://template.ak-labs.io";
  const body = `# ${new URL(siteUrl).hostname}

> Full-stack template for production AI agent apps: FastAPI + Next.js.
> Supports Pydantic AI, LangChain, LangGraph, CrewAI, DeepAgents.
> 75+ config options, 3 presets, web configurator, Docker Compose.
> Open-source (MIT), built by AK Labs — Applied Agentic AI consultancy.

## Pages

- [Home](${siteUrl}/): Ship production AI apps in minutes — landing page with features, presets, quickstart
- [Configurator](${siteUrl}/configurator/): 9-step visual wizard to configure and download a project as ZIP
- [FAQ](${siteUrl}/faq/): Common questions about frameworks, deployment, and configuration
- [Blog](${siteUrl}/blog/): Tutorials, framework comparisons, and implementation guides

## Key Features

- **5 AI Frameworks:** Pydantic AI, LangChain, LangGraph, CrewAI, DeepAgents — each with tool calling and WebSocket streaming
- **3 LLM Providers:** OpenAI, Anthropic, OpenRouter (200+ models)
- **Databases:** PostgreSQL, MongoDB, SQLite with SQLAlchemy or SQLModel ORM
- **Authentication:** JWT, API Keys, Google OAuth, session management
- **Real-time:** WebSocket streaming with token-by-token output and conversation persistence
- **Infrastructure:** Docker Compose (dev + prod), Kubernetes, Traefik/Nginx reverse proxy
- **Observability:** Logfire (Pydantic AI), Sentry (error tracking), Prometheus (metrics)
- **Background Tasks:** Celery, TaskIQ, or ARQ with Redis
- **CI/CD:** GitHub Actions, GitLab CI
- **Frontend:** Next.js 15 with React 19, TypeScript, Tailwind CSS, App Router
- **DevOps:** Pre-commit hooks, Makefile, pytest, .env generation
- **Admin:** Django-style admin panel (SQLAlchemy + PostgreSQL)

## Installation

\`\`\`bash
pip install ak-agent-template
ak-agent-template create my_app --preset ai-agent
\`\`\`

Or use the web configurator at ${siteUrl}/configurator/

## Links

- GitHub: https://github.com/anushka-kumar/agent-template
- PyPI: https://pypi.org/project/ak-agent-template/
- Website: ${siteUrl}/
- AK Labs: https://ak-labs.io/
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
