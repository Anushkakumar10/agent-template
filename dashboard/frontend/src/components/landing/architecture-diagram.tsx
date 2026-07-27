"use client";

import { FileText, Database, Cpu, Layout, ArrowRight, Server, Sparkles } from "lucide-react";

export function ArchitectureDiagram() {
  return (
    <section id="architecture" className="py-20 md:py-28 border-b border-border/40 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand mb-4">
            ARCHITECTURE & DATA FLOW
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How your agent stack <span className="gradient-text italic font-normal">fits together.</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Every generated template follows clean architecture principles with decoupled backend API services, vector indexers, and Next.js SSR interface.
          </p>
        </div>

        {/* Diagram Box */}
        <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 card-lift relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center relative z-10">
            {/* Step 1: Sources */}
            <div className="p-4 rounded-xl border border-border/60 bg-secondary/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mx-auto">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-foreground">1. Data Sources</h4>
                <p className="text-[11px] text-muted-foreground mt-1">Google Drive, S3, Local PDFs, Web Scraping</p>
              </div>
            </div>

            {/* Step 2: FastAPI Core & Vector DB */}
            <div className="p-4 rounded-xl border border-brand/40 bg-brand/5 space-y-3 ring-1 ring-brand/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand mx-auto">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-brand">2. FastAPI & RAG Core</h4>
                <p className="text-[11px] text-muted-foreground mt-1">PyMuPDF, Qdrant/Milvus, Hybrid Embeddings</p>
              </div>
            </div>

            {/* Step 3: Agent Orchestrator */}
            <div className="p-4 rounded-xl border border-border/60 bg-secondary/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mx-auto">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-foreground">3. Agent Orchestrator</h4>
                <p className="text-[11px] text-muted-foreground mt-1">PydanticAI / LangGraph / DeepAgents</p>
              </div>
            </div>

            {/* Step 4: Next.js UI & Deploy */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mx-auto">
                <Layout className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-emerald-400">4. Next.js 15 UI</h4>
                <p className="text-[11px] text-muted-foreground mt-1">Chat Interface, Registry & Deployment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
