"use client";

import { useState } from "react";
import {
  Cpu,
  Database,
  RefreshCw,
  Shield,
  Zap,
  Lock,
  Search,
  FileText,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FeatureBentoGrid() {
  const [selectedFwTab, setSelectedFwTab] = useState<"pydantic" | "langgraph" | "deep">("pydantic");
  const [similarityScore, setSimilarityScore] = useState(0.94);

  return (
    <section id="frameworks" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient Radial Accent Glow */}
      <div className="ambient-glow-accent top-1/3 left-1/4" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Architecture built for autonomous production.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Every layer of the generated repository is modular, strictly typed, and verified with automated test suites before you write a single line of business logic.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* =========================================================================
              Card 1: Multi-Framework Orchestration Engine (8 Columns)
             ========================================================================= */}
          <div className="lg:col-span-8 double-bezel">
            <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-brand font-semibold flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5" />
                    Agent Orchestration Engine
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground bg-white/5 px-2.5 py-0.5 rounded-full border border-white/8">
                    5 Framework Blueprints
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Choose the orchestrator tailored to your execution model.
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Whether your system requires type-safe Pydantic structured output, LangGraph cyclical state graphs, or DeepAgents hierarchical actor teams.
                </p>
              </div>

              {/* Interactive Framework Demonstrator Tabs */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-white/8 pb-3">
                  <button
                    type="button"
                    onClick={() => setSelectedFwTab("pydantic")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      selectedFwTab === "pydantic"
                        ? "bg-brand text-brand-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    PydanticAI (Type-Safe)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFwTab("langgraph")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      selectedFwTab === "langgraph"
                        ? "bg-brand text-brand-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    LangGraph (Cyclic Graph)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFwTab("deep")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      selectedFwTab === "deep"
                        ? "bg-brand text-brand-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    DeepAgents (Multi-Actor)
                  </button>
                </div>

                {/* Tab Output Body */}
                <div className="rounded-xl border border-white/8 bg-[#090B12] p-4 font-mono text-xs text-muted-foreground space-y-2">
                  {selectedFwTab === "pydantic" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-foreground font-semibold">
                        <span>PydanticAI + Logfire Observability</span>
                        <span className="text-emerald-400 font-mono text-[10px]">Zero Schema Errors</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Guaranteed JSON schema output with runtime Pydantic V2 validation and zero-configuration OpenTelemetry tracing via Logfire.
                      </p>
                    </div>
                  )}

                  {selectedFwTab === "langgraph" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-foreground font-semibold">
                        <span>Cyclical State Machine + Checkpointing</span>
                        <span className="text-brand font-mono text-[10px]">LangSmith Ready</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Stateful workflows with conditional looping, human-in-the-loop intervention approval hooks, and persistent Postgres checkpoints.
                      </p>
                    </div>
                  )}

                  {selectedFwTab === "deep" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-foreground font-semibold">
                        <span>Hierarchical Multi-Agent Swarms</span>
                        <span className="text-purple-400 font-mono text-[10px]">Parallel Consensus</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Coordinated actor teams featuring specialized research, verification, and summarization agents with unanimous synthesis.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              Card 2: Production Vector RAG Pipeline (4 Columns)
             ========================================================================= */}
          <div id="rag" className="lg:col-span-4 double-bezel">
            <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5" />
                    Vector RAG Core
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground bg-white/5 px-2.5 py-0.5 rounded-full border border-white/8">
                    4 Engines
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground tracking-tight">
                  Dense & Hybrid Similarity Search
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Plug-and-play vector store abstractions for Qdrant, Milvus, ChromaDB, and PostgreSQL pgvector.
                </p>
              </div>

              {/* Similarity Distance Meter */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Simulated Relevance Score:</span>
                  <span className="text-emerald-400 font-bold">{similarityScore.toFixed(3)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand to-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${similarityScore * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-center">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="text-foreground font-semibold">Qdrant</div>
                    <div className="text-emerald-400">0.962</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="text-foreground font-semibold">pgvector</div>
                    <div className="text-brand">0.914</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="text-foreground font-semibold">Milvus</div>
                    <div className="text-purple-400">0.898</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              Card 3: Scheduled Document Connectors (4 Columns)
             ========================================================================= */}
          <div id="connectors" className="lg:col-span-4 double-bezel">
            <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-brand font-semibold flex items-center gap-1.5">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Sync Connectors
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground bg-white/5 px-2.5 py-0.5 rounded-full border border-white/8">
                    Auto Indexing
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground tracking-tight">
                  Multi-Source Sync Pipelines
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Background document sync with scheduled chron daemons and PDF parser selection.
                </p>
              </div>

              {/* Source List */}
              <div className="space-y-2 pt-1 text-xs">
                {[
                  { name: "Google Drive Service Account", schedule: "Every 15m", status: "Active" },
                  { name: "Amazon S3 / MinIO Buckets", schedule: "Real-time Event", status: "Listening" },
                  { name: "Local Directory CLI Command", schedule: "On-demand", status: "Ready" },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="p-2.5 rounded-lg border border-white/6 bg-white/[0.02] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium text-foreground text-xs block">{s.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{s.schedule}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================================
              Card 4: Full-Stack Enterprise Battery (8 Columns)
             ========================================================================= */}
          <div className="lg:col-span-8 double-bezel">
            <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-brand" />
                    Full-Stack Battery
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Production Infrastructure
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Zero scaffold assembly. Complete foundation on day one.
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Auth, billing, asynchronous background queues, and container recipes ship pre-configured in your generated repository.
                </p>
              </div>

              {/* Enterprise Capabilities 4-Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  {
                    title: "Stripe Billing",
                    desc: "Webhooks & Subscriptions",
                    icon: Zap,
                  },
                  {
                    title: "JWT & Multi-Tenant",
                    desc: "Role-based Team Access",
                    icon: Lock,
                  },
                  {
                    title: "Celery + Redis",
                    desc: "Distributed Background Jobs",
                    icon: Activity,
                  },
                  {
                    title: "Docker Compose",
                    desc: "Postgres + Vector DB Recipes",
                    icon: Layers,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl border border-white/6 bg-white/[0.02] space-y-1.5 hover:border-brand/40 transition-colors"
                  >
                    <item.icon className="h-4 w-4 text-brand" />
                    <span className="font-semibold text-xs text-foreground block">{item.title}</span>
                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
