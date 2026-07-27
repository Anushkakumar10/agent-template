"use client";

import { Cpu, Database, RefreshCw, Shield, Zap, Lock, Search, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FeatureBentoGrid() {
  return (
    <section id="features" className="py-20 md:py-28 border-b border-border/40 bg-secondary/10 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand mb-4">
            FEATURE BENTO
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything your agent needs, <span className="gradient-text italic font-normal">pre-configured.</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Stop spending weeks wiring up vector databases, PDF parsers, background task queues, and authentication. Everything is built and ready for day one.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 5 AI Frameworks (Wide 2 columns) */}
          <div className="md:col-span-2 rounded-2xl border border-border/60 bg-card p-6 space-y-6 card-lift gradient-border-top flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-brand uppercase tracking-wider">AI Frameworks</span>
                <Badge variant="outline" className="font-mono text-[10px]">5 Framework Options</Badge>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                Pick the perfect orchestrator for your agent flow.
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                Whether you need PydanticAI for type-safe structured data, LangGraph for cyclical stateful graphs, or DeepAgents for multi-actor teams.
              </p>
            </div>

            {/* Framework Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { name: "PydanticAI", logo: "/logos/pydantic.svg", desc: "Type-safe + Logfire" },
                { name: "LangChain", logo: "/logos/langchain.svg", desc: "Standard Ecosystem" },
                { name: "LangGraph", logo: "/logos/langgraph.svg", desc: "Cyclical Graphs" },
                { name: "DeepAgents", logo: "/logos/deepagents.svg", desc: "Hierarchical Teams" },
                { name: "PydanticDeep", logo: "/logos/pydantic.svg", desc: "Deep Reasoning" },
                { name: "FastAPI Core", logo: "/logos/python.svg", desc: "Raw Async Backend" },
              ].map((fw) => (
                <div key={fw.name} className="p-3 rounded-xl border border-border/60 bg-secondary/30 space-y-1">
                  <div className="flex items-center gap-2">
                    <img src={fw.logo} alt="" className="h-4 w-4 object-contain" />
                    <span className="font-semibold text-xs text-foreground">{fw.name}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{fw.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: 4 Vector DBs */}
          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-6 card-lift flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-brand uppercase tracking-wider">Vector Store RAG</span>
                <Badge variant="outline" className="font-mono text-[10px]">4 Stores</Badge>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground tracking-tight">
                Vector DBs & Embeddings
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect Milvus, Qdrant, ChromaDB, or pgvector for similarity & hybrid search.
              </p>
            </div>

            {/* Simulated Relevance Results */}
            <div className="space-y-2 pt-2 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg border border-border/60 bg-background/80 flex items-center justify-between">
                <span className="text-foreground truncate max-w-[140px]">Qdrant VectorStore</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">0.96 score</span>
              </div>
              <div className="p-2.5 rounded-lg border border-border/60 bg-background/80 flex items-center justify-between">
                <span className="text-foreground truncate max-w-[140px]">pgvector Hybrid</span>
                <span className="text-brand font-bold bg-brand/10 px-1.5 py-0.5 rounded">0.91 score</span>
              </div>
              <div className="p-2.5 rounded-lg border border-border/60 bg-background/80 flex items-center justify-between">
                <span className="text-foreground truncate max-w-[140px]">Milvus / Chroma</span>
                <span className="text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded">0.88 score</span>
              </div>
            </div>
          </div>

          {/* Card 3: Multi-Source Sync */}
          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-6 card-lift flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-brand uppercase tracking-wider">Sync Connectors</span>
                <Badge variant="outline" className="font-mono text-[10px]">Auto Sync</Badge>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground tracking-tight">
                Document Source Connectors
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sync files from Google Drive, Amazon S3, local directory CLI commands, and API uploads.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              {[
                { icon: RefreshCw, title: "Scheduled Sync", desc: "Automatic background document indexing." },
                { icon: FileText, title: "PDF Parsers", desc: "PyMuPDF, LiteParse, LlamaParse runtime selection." },
                { icon: Lock, title: "Granular Security", desc: "Row-level security and permission controls." },
              ].map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <b.icon className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">{b.title}</span>
                    <p className="text-[11px] text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Enterprise Battery (Wide 2 columns) */}
          <div className="md:col-span-2 rounded-2xl border border-border/60 bg-card p-6 space-y-6 card-lift gradient-border-top flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-brand uppercase tracking-wider">Enterprise Ready</span>
                <Badge variant="outline" className="font-mono text-[10px]">Production Grade</Badge>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                Full-stack infrastructure built-in out of the box.
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                No need to assemble auth, billing, background task workers, or containerization from scratch.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { title: "Stripe Billing", desc: "Subscriptions & Webhooks", logo: "/logos/stripe.svg" },
                { title: "JWT Auth", desc: "Multi-tenant Teams", logo: "/logos/nextjs.svg" },
                { title: "Celery Queue", desc: "Redis Background Tasks", logo: "/logos/python.svg" },
                { title: "Docker Compose", desc: "PostgreSQL & Vector DBs", logo: "/logos/postgresql.svg" },
              ].map((ent) => (
                <div key={ent.title} className="p-3 rounded-xl border border-border/60 bg-secondary/30 space-y-1">
                  <img src={ent.logo} alt="" className="h-4 w-4 object-contain mb-1" />
                  <span className="font-semibold text-xs text-foreground block">{ent.title}</span>
                  <p className="text-[10px] text-muted-foreground">{ent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
