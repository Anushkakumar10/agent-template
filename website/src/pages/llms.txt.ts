import type { APIRoute } from "astro";
import { projects } from "../data/projects";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.origin ?? "https://oss.ak-labs.io";
  const projectList = projects
    .map((p) => {
      const status = p.status === "coming-soon" ? " (coming soon)" : "";
      const url = `${siteUrl}/${p.slug}/`;
      return `- [${p.name}${status}](${url}): ${p.tagline.en}`;
    })
    .join("\n");

  const body = `# ${new URL(siteUrl).hostname}

> AK Labs OSS — Open-source AI agent tools for Python.
> 13 projects: templates, frameworks, toolsets, and resources.
> Built by AK Labs — Applied Agentic AI Engineering Consultancy with 30+ production deployments.

## Projects

${projectList}

## Pages

- [Home](${siteUrl}/): OSS portfolio landing — all projects grouped by category
- [Blog](${siteUrl}/blog/): Tutorials, framework comparisons, and implementation guides
- [FAQ](${siteUrl}/faq/): Common questions about frameworks and configuration
- [Full-Stack AI Agent Template](${siteUrl}/agent-template/): Custom landing with configurator
- [Configurator](${siteUrl}/agent-template/configurator/): 9-step visual wizard to generate projects

## Links

- GitHub: https://github.com/ak-labs
- Website: ${siteUrl}/
- AK Labs: https://ak-labs.io/
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
