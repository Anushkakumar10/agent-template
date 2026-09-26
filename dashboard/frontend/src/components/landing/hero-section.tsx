"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Terminal,
  Check,
  Copy,
  Layers,
  Sparkles,
  Cpu,
  Database,
  ShieldCheck,
  Code2,
  FolderTree,
  FileCode,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Framework = "pydantic_ai" | "langgraph" | "deepagents";
type VectorDb = "qdrant" | "pgvector" | "milvus";

const CODE_SNIPPETS: Record<Framework, Record<VectorDb, string>> = {
  pydantic_ai: {
    qdrant: `from pydantic_ai import Agent, RunContext
from app.rag.vectorstore import QdrantVectorStore
from app.core.config import settings

# Type-safe production agent with Logfire instrumentation
agent = Agent(
    model="google-gla:gemini-1.5-pro",
    system_prompt="You are an autonomous research intelligence engine.",
    retries=2,
)

@agent.tool
async def search_knowledge(ctx: RunContext, query: str) -> list[dict]:
    """Retrieve dense hybrid vector embeddings from Qdrant cluster."""
    store = QdrantVectorStore(collection="enterprise_docs")
    return await store.similarity_search(query, top_k=5, score_threshold=0.82)
`,
    pgvector: `from pydantic_ai import Agent, RunContext
from app.rag.vectorstore import PgVectorStore

# Type-safe agent with ACID relational storage
agent = Agent(
    model="openai:gpt-4o",
    system_prompt="Executive research assistant with SQL verification.",
)

@agent.tool
async def hybrid_query(ctx: RunContext, query: str) -> list[dict]:
    """Execute pgvector similarity search combined with full-text BM25."""
    store = PgVectorStore(schema="agents_vectors")
    return await store.hybrid_search(query, limit=4)
`,
    milvus: `from pydantic_ai import Agent, RunContext
from app.rag.vectorstore import MilvusVectorStore

agent = Agent(
    model="anthropic:claude-3-5-sonnet-latest",
    system_prompt="High-throughput retrieval agent for enterprise scale.",
)

@agent.tool
async def query_cluster(ctx: RunContext, query: str) -> list[dict]:
    """Query distributed Milvus cluster with billion-vector scalability."""
    store = MilvusVectorStore(partition="enterprise_v2")
    return await store.dense_search(query, consistency_level="Strong")
`,
  },
  langgraph: {
    qdrant: `from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated
from app.rag.vectorstore import QdrantVectorStore

class AgentState(TypedDict):
    query: str
    documents: list[str]
    iteration_count: int

def retrieve_node(state: AgentState):
    store = QdrantVectorStore(collection="kb_prod")
    docs = store.similarity_search(state["query"])
    return {"documents": docs, "iteration_count": state["iteration_count"] + 1}

# Cyclical state graph with self-correcting evaluation
workflow = StateGraph(AgentState)
workflow.add_node("retrieve", retrieve_node)
workflow.add_edge(START, "retrieve")
app = workflow.compile()
`,
    pgvector: `from langgraph.graph import StateGraph, START, END
from app.rag.vectorstore import PgVectorStore

# Cyclic human-in-the-loop stateful graph
workflow = StateGraph(dict)
workflow.add_node("pg_rag", lambda s: {"context": PgVectorStore().search(s["q"])})
workflow.add_edge(START, "pg_rag")
agent_graph = workflow.compile(checkpointer="postgres")
`,
    milvus: `from langgraph.graph import StateGraph, START, END
from app.rag.vectorstore import MilvusVectorStore

workflow = StateGraph(dict)
workflow.add_node("milvus_scan", lambda s: {"vectors": MilvusVectorStore().search(s["q"])})
agent_graph = workflow.compile()
`,
  },
  deepagents: {
    qdrant: `from deepagents import Swarm, WorkerAgent, Coordinator
from app.rag.vectorstore import QdrantVectorStore

# Hierarchical multi-actor agent team with dedicated tools
researcher = WorkerAgent(
    name="Researcher",
    tools=[QdrantVectorStore(collection="docs").as_tool()],
)
critic = WorkerAgent(name="FactVerifier")
coordinator = Coordinator(team=[researcher, critic], consensus="unanimous")
`,
    pgvector: `from deepagents import Swarm, WorkerAgent
from app.rag.vectorstore import PgVectorStore

team = Swarm(
    agents=[WorkerAgent("Ingestor", tools=[PgVectorStore().as_tool()])],
    strategy="hierarchical",
)
`,
    milvus: `from deepagents import Swarm, WorkerAgent
from app.rag.vectorstore import MilvusVectorStore

team = Swarm(
    agents=[WorkerAgent("EnterpriseSearch", tools=[MilvusVectorStore().as_tool()])],
)
`,
  },
};

export function HeroSection() {
  const [selectedFw, setSelectedFw] = useState<Framework>("pydantic_ai");
  const [selectedDb, setSelectedDb] = useState<VectorDb>("qdrant");
  const [activeTab, setActiveTab] = useState<"code" | "tree">("code");
  const [copied, setCopied] = useState(false);

  const cliCommand = "uvx ak-agent-template create my-agent";

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-20 md:pt-12 md:pb-28">
      {/* Ambient Radial Depth Glow */}
      <div className="ambient-glow-hero" />

      {/* Grid Texture Layer */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Hierarchy */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          {/* Restrained Eyebrow Badge (1 of allowed 3 across the entire page) */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono tracking-wider text-muted-foreground">
            <span className="status-dot status-dot--active" />
            <span className="text-foreground font-medium">v2.4 RELEASE</span>
            <span className="text-white/30">•</span>
            <span>FASTAPI + NEXT.JS 15</span>
          </div>

          {/* High-Impact Headline (Sentence Case, tight tracking, max 2 lines) */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] text-foreground leading-[1.08] text-balance">
            Production AI agents. <br />
            <span className="gradient-text-subtle">Engineered from day one.</span>
          </h1>

          {/* Subtext (Disciplined length under 20 words) */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Generate full-stack FastAPI and Next.js repositories with pre-configured agent frameworks, vector pipelines, and 20+ enterprise connectors.
          </p>

          {/* Primary Action Cluster */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            {/* Button-in-Button Island CTA */}
            <Button
              asChild
              variant="brand"
              size="lg"
              className="btn-island group h-12 px-5 py-2 text-sm font-semibold shadow-lg shadow-brand/25 border border-brand/40"
            >
              <Link href="/register">
                <span>Initialize Stack Free</span>
                <span className="btn-island-badge h-7 w-7 bg-white/20">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Button>

            {/* Quick-Start Terminal Command Box with Copy Feedback */}
            <div className="flex h-12 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-xs text-muted-foreground shadow-inner backdrop-blur-md">
              <Terminal className="h-3.5 w-3.5 text-brand shrink-0" aria-hidden="true" />
              <span className="text-foreground/90 font-medium select-all">{cliCommand}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-brand"
                title="Copy terminal command"
                aria-label="Copy terminal command"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            Interactive Cockpit: The Live Agent Studio (Double-Bezel Architecture)
           ========================================================================= */}
        <div className="relative mt-12 md:mt-16 mx-auto max-w-5xl">
          {/* Subtle Ambient Stage Glow behind Cockpit */}
          <div className="absolute inset-x-8 top-10 -z-10 h-72 rounded-full bg-brand/12 blur-3xl pointer-events-none" />

          {/* Double-Bezel Shell */}
          <div className="double-bezel">
            {/* Double-Bezel Inner Core */}
            <div className="double-bezel-inner p-4 sm:p-6 overflow-hidden">
              {/* Studio Window Chrome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/8 gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5 text-brand" />
                    Agent Studio Configurator
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Zero Glue Code
                  </span>
                  <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab("code")}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                        activeTab === "code"
                          ? "bg-brand text-brand-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      agent.py
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("tree")}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                        activeTab === "tree"
                          ? "bg-brand text-brand-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      File Tree
                    </button>
                  </div>
                </div>
              </div>

              {/* Studio Body: Two Columns (Interactive Controls + Live Code) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
                {/* Left Column: Interactive Stack Switches (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  {/* Framework Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                      <span>1. Agent Framework</span>
                      <span className="text-[10px] text-brand">Selectable</span>
                    </label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {[
                        { id: "pydantic_ai", label: "PydanticAI", badge: "Type-Safe + Logfire" },
                        { id: "langgraph", label: "LangGraph", badge: "Cyclic State Machine" },
                        { id: "deepagents", label: "DeepAgents", badge: "Multi-Actor Swarm" },
                      ].map((fw) => (
                        <button
                          key={fw.id}
                          type="button"
                          onClick={() => setSelectedFw(fw.id as Framework)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all ${
                            selectedFw === fw.id
                              ? "border-brand/60 bg-brand/10 text-foreground ring-1 ring-brand/40 shadow-xs"
                              : "border-white/5 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                          }`}
                        >
                          <span className="font-semibold text-foreground">{fw.label}</span>
                          <span className="text-[10px] font-mono text-muted-foreground/80">{fw.badge}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vector Database Selector */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                      <span>2. Vector Database</span>
                      <span className="text-[10px] text-emerald-400">4 Supported</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: "qdrant", label: "Qdrant" },
                        { id: "pgvector", label: "pgvector" },
                        { id: "milvus", label: "Milvus" },
                      ].map((db) => (
                        <button
                          key={db.id}
                          type="button"
                          onClick={() => setSelectedDb(db.id as VectorDb)}
                          className={`py-2 px-1 text-center rounded-lg border text-xs font-mono transition-all ${
                            selectedDb === db.id
                              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30"
                              : "border-white/5 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04]"
                          }`}
                        >
                          {db.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Built-in Enterprise Add-ons */}
                  <div className="p-3 rounded-xl border border-white/5 bg-white/[0.015] space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                      Active Enterprise Battery
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/8 text-foreground/80">
                        FastAPI 0.115
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/8 text-foreground/80">
                        Next.js 15
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/8 text-foreground/80">
                        Celery + Redis
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/8 text-foreground/80">
                        Docker Compose
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/8 text-foreground/80">
                        Stripe Billing
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/8 text-foreground/80">
                        Drive/S3 Sync
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Dynamic Code or Tree Viewer (8 cols) */}
                <div className="lg:col-span-8 flex flex-col justify-between rounded-xl border border-white/8 bg-[#08090E] p-4 font-mono text-xs overflow-hidden shadow-inner">
                  {activeTab === "code" ? (
                    <div className="space-y-2 overflow-x-auto min-h-[280px]">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <FileCode className="h-3.5 w-3.5 text-brand" />
                          backend/app/agents/agent.py
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          Live Generated Blueprint
                        </span>
                      </div>
                      <pre className="text-muted-foreground leading-relaxed text-[11.5px] font-mono selection:bg-brand/30">
                        <code>{CODE_SNIPPETS[selectedFw][selectedDb]}</code>
                      </pre>
                    </div>
                  ) : (
                    <div className="space-y-2 min-h-[280px] text-[11.5px]">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <FolderTree className="h-3.5 w-3.5 text-brand" />
                          Generated Repository Architecture
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          100% Modular Structure
                        </span>
                      </div>
                      <div className="space-y-1 text-muted-foreground font-mono py-2">
                        <p className="text-foreground font-semibold">my_agent_project/</p>
                        <p className="pl-4">├── backend/</p>
                        <p className="pl-8">├── app/</p>
                        <p className="pl-12 text-brand">├── agents/           # {selectedFw} orchestrator logic</p>
                        <p className="pl-12 text-emerald-400">├── rag/              # {selectedDb} vectorstore & connectors</p>
                        <p className="pl-12">├── api/v1/           # Streaming SSE chat endpoints</p>
                        <p className="pl-12">├── worker/           # Celery & background tasks</p>
                        <p className="pl-8">├── pyproject.toml     # uv managed dependencies</p>
                        <p className="pl-4">├── frontend/          # Next.js 15 App Router chat cockpit</p>
                        <p className="pl-4">└── docker-compose.yml # PostgreSQL + {selectedDb} + Redis</p>
                      </div>
                    </div>
                  )}

                  {/* Cockpit Status Bar */}
                  <div className="mt-3 pt-3 border-t border-white/8 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Type-Checked (mypy strict)
                      </span>
                      <span>Formatted with Ruff</span>
                    </div>
                    <span className="text-foreground/80 font-mono">
                      uv sync ready • 0.4s setup
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
