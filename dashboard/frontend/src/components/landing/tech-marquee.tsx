"use client";

const METRICS = [
  { value: "1,200+", label: "Repositories Initialized", sub: "Production deployments worldwide" },
  { value: "5", label: "Agent Frameworks", sub: "PydanticAI, LangGraph, DeepAgents, etc." },
  { value: "4", label: "Vector Engines", sub: "Qdrant, pgvector, Milvus, Chroma" },
  { value: "< 0.4s", label: "Scaffold Speed", sub: "Instant uv sync & Docker Compose" },
];

const LOGOS = [
  { name: "PydanticAI", logo: "/logos/pydantic.svg" },
  { name: "FastAPI", logo: "/logos/python.svg" },
  { name: "Next.js 15", logo: "/logos/nextjs.svg" },
  { name: "LangGraph", logo: "/logos/langgraph.svg" },
  { name: "DeepAgents", logo: "/logos/deepagents.svg" },
  { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
  { name: "Anthropic Claude", logo: "/logos/anthropic.svg" },
  { name: "Google Gemini", logo: "/logos/gemini.svg" },
  { name: "OpenAI GPT-4o", logo: "/logos/openai.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "MCP Protocol", logo: "/logos/mcp.svg" },
  { name: "Tavily Search", logo: "/logos/tavily.svg" },
];

export function TechMarquee() {
  const doubledLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="border-y border-white/6 bg-[#090B12]/80 py-8 relative overflow-hidden backdrop-blur-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Verification Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-b border-white/5">
          {METRICS.map((m) => (
            <div key={m.label} className="p-3">
              <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {m.value}
              </div>
              <div className="text-xs font-medium text-foreground/90 mt-1">{m.label}</div>
              <div className="text-[11px] text-muted-foreground/70 mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Marquee Header Note */}
        <div className="text-center">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/75">
            Verified Compatibility Across The Modern AI Stack
          </p>
        </div>

        {/* Hardware-Accelerated Logo Ribbon */}
        <div className="relative w-full overflow-hidden mask-fade">
          {/* Edge Blur Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#090B12] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#090B12] to-transparent z-10" />

          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
            {doubledLogos.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-2.5 rounded-full border border-white/6 bg-white/[0.02] px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:bg-white/[0.05] hover:text-foreground"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  width="18"
                  height="18"
                  className="h-4.5 w-4.5 object-contain opacity-80 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
                <span className="font-mono text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
