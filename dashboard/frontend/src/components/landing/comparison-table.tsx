"use client";

import { Check, X, Minus } from "lucide-react";

const COMPARISON_ROWS = [
  {
    capability: "Multi-Agent Framework Choice (5 Options)",
    template: "yes",
    templateNote: "PydanticAI, LangGraph, DeepAgents, LangChain, Core",
    diy: "no",
    diyNote: "Weeks of manual glue code",
    generic: "no",
    genericNote: "Typically locked to single framework",
  },
  {
    capability: "Pluggable Vector Store Adapters (4 DBs)",
    template: "yes",
    templateNote: "Qdrant, Milvus, ChromaDB, pgvector",
    diy: "partial",
    diyNote: "Single store locked",
    generic: "no",
    genericNote: "Not included",
  },
  {
    capability: "Scheduled Document Sync Connectors",
    template: "yes",
    templateNote: "Google Drive, Amazon S3, Local CLI",
    diy: "no",
    diyNote: "Must write custom sync daemons",
    generic: "partial",
    genericNote: "Basic file upload only",
  },
  {
    capability: "Runtime PDF Parser Switcher",
    template: "yes",
    templateNote: "PyMuPDF, LiteParse, LlamaParse",
    diy: "no",
    diyNote: "Custom parsing pipeline",
    generic: "no",
    genericNote: "Not included",
  },
  {
    capability: "Full-Stack FastAPI + Next.js 15 SSR",
    template: "yes",
    templateNote: "Streaming SSE, App Router, Tailwind",
    diy: "partial",
    diyNote: "Complex CORS & SSE setup",
    generic: "partial",
    genericNote: "Frontend or backend only",
  },
  {
    capability: "Stripe Billing, JWT Auth & Teams",
    template: "yes",
    templateNote: "Pre-wired webhooks & tenant models",
    diy: "no",
    diyNote: "3+ weeks of boilerplate",
    generic: "yes",
    genericNote: "Basic auth template",
  },
  {
    capability: "Deterministic Docker & uv Dependency Setup",
    template: "yes",
    templateNote: "Sub-second sync, zero lock-in",
    diy: "no",
    diyNote: "Prone to dependency conflicts",
    generic: "partial",
    genericNote: "Basic Dockerfile",
  },
];

function RenderStatus(status: string) {
  if (status === "yes") {
    return (
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400"
        aria-label="Supported"
      >
        <Check className="h-3 w-3 stroke-[3]" />
      </span>
    );
  }
  if (status === "no") {
    return (
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/15 text-rose-400"
        aria-label="Not supported"
      >
        <X className="h-3 w-3 stroke-[3]" />
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/15 text-amber-400"
      aria-label="Partially supported"
    >
      <Minus className="h-3 w-3 stroke-[3]" />
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section id="comparison" className="py-24 md:py-32 border-t border-white/6 bg-[#090B12]/50 relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Why engineering teams choose our template.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            See how the Agent Template generator compares against manual DIY implementation and generic SaaS starter kits.
          </p>
        </div>

        {/* Double-Bezel Table Frame */}
        <div className="double-bezel">
          <div className="double-bezel-inner p-2 sm:p-4 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <caption className="sr-only">
                Comparison of Full-Stack Agent Template versus DIY implementation and generic SaaS starters
              </caption>
              <thead>
                <tr className="border-b border-white/8 text-xs font-mono text-muted-foreground">
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-foreground">
                    Core Capability
                  </th>
                  <th
                    scope="col"
                    className="p-4 sm:p-5 font-bold text-brand bg-brand/10 border-x border-brand/20 rounded-t-xl text-center"
                  >
                    Agent Template
                  </th>
                  <th scope="col" className="p-4 sm:p-5 text-center">
                    DIY From Scratch
                  </th>
                  <th scope="col" className="p-4 sm:p-5 text-center">
                    Generic SaaS Boilerplates
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6 text-xs">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.015] transition-colors">
                    {/* Capability Name */}
                    <th scope="row" className="p-4 sm:p-5 font-medium text-foreground">
                      {row.capability}
                    </th>

                    {/* Agent Template Column (Highlighted) */}
                    <td className="p-4 sm:p-5 bg-brand/[0.04] border-x border-brand/15 text-center space-y-1">
                      <div className="flex justify-center">{RenderStatus(row.template)}</div>
                      <p className="text-[10px] font-mono text-muted-foreground">{row.templateNote}</p>
                    </td>

                    {/* DIY Column */}
                    <td className="p-4 sm:p-5 text-center space-y-1">
                      <div className="flex justify-center">{RenderStatus(row.diy)}</div>
                      <p className="text-[10px] font-mono text-muted-foreground/80">{row.diyNote}</p>
                    </td>

                    {/* Generic Starter Column */}
                    <td className="p-4 sm:p-5 text-center space-y-1">
                      <div className="flex justify-center">{RenderStatus(row.generic)}</div>
                      <p className="text-[10px] font-mono text-muted-foreground/80">{row.genericNote}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
