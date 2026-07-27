"use client";

const TECH_ITEMS = [
  { label: "PydanticAI", logo: "/logos/pydantic.svg" },
  { label: "LangChain", logo: "/logos/langchain.svg" },
  { label: "LangGraph", logo: "/logos/langgraph.svg" },
  { label: "DeepAgents", logo: "/logos/deepagents.svg" },
  { label: "Google Gemini", logo: "/logos/gemini.svg" },
  { label: "OpenAI GPT-4o", logo: "/logos/openai.svg" },
  { label: "Anthropic Claude", logo: "/logos/anthropic.svg" },
  { label: "PostgreSQL", logo: "/logos/postgresql.svg" },
  { label: "Qdrant", logo: "/logos/mcp.svg" },
  { label: "Milvus", logo: "/logos/mcp.svg" },
  { label: "ChromaDB", logo: "/logos/mcp.svg" },
  { label: "Stripe Billing", logo: "/logos/stripe.svg" },
  { label: "Tavily Web Search", logo: "/logos/tavily.svg" },
  { label: "Monty Sandbox", logo: "/logos/monty.svg" },
  { label: "Model Context Protocol (MCP)", logo: "/logos/mcp.svg" },
];

export function TechMarquee() {
  const doubledItems = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="py-6 border-b border-border/40 bg-secondary/15 overflow-hidden">
      <div className="flex w-full">
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
          {doubledItems.map((item, idx) => (
            <div key={`${item.label}-${idx}`} className="flex items-center gap-6">
              <div className="flex items-center gap-2.5 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs font-medium text-foreground/90 shadow-2xs backdrop-blur-xs">
                <img src={item.logo} alt="" className="h-4 w-4 object-contain" />
                <span>{item.label}</span>
              </div>
              <span className="text-brand text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
