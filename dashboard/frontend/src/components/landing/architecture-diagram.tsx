"use client";

import { useState } from "react";
import { FileText, Database, Cpu, Layout, ArrowRight, Layers, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";

const ARCH_NODES = [
  {
    id: "sources",
    step: "01",
    title: "Ingestion Sources",
    icon: FileText,
    badge: "Connectors",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    description: "S3, Google Drive, and local CLI documents ingested asynchronously.",
    details: [
      "Scheduled sync connectors with configurable cron intervals",
      "Dynamic PDF parser selection (PyMuPDF, LiteParse, LlamaParse)",
      "Automated document deduplication and chunk hashing",
    ],
    fileRef: "backend/app/rag/connectors/base.py",
  },
  {
    id: "rag",
    step: "02",
    title: "Vector Pipeline",
    icon: Database,
    badge: "Vector Store",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    description: "Pluggable vector store layer supporting hybrid dense & sparse queries.",
    details: [
      "Unified BaseVectorStore abstraction interface",
      "Milvus, Qdrant, ChromaDB, and pgvector adapters",
      "Hybrid similarity search with reranking support",
    ],
    fileRef: "backend/app/rag/vectorstore.py",
  },
  {
    id: "agent",
    step: "03",
    title: "Agent Reasoning",
    icon: Cpu,
    badge: "Orchestrator",
    color: "text-brand bg-brand/10 border-brand/20",
    description: "Multi-agent loop managing tool invocation, memory, and model context.",
    details: [
      "5 Framework options (PydanticAI, LangGraph, DeepAgents, etc.)",
      "Type-safe tool execution with Pydantic validation",
      "End-to-end distributed tracing via Logfire and LangSmith",
    ],
    fileRef: "backend/app/agents/agent.py",
  },
  {
    id: "ui",
    step: "04",
    title: "Next.js Streaming",
    icon: Layout,
    badge: "Frontend UI",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    description: "Server-side rendered App Router with real-time SSE token streaming.",
    details: [
      "Next.js 15 App Router with Server Components",
      "Streaming chat UI with markdown code block formatting",
      "Built-in agent registry and configuration cockpit",
    ],
    fileRef: "frontend/src/app/page.tsx",
  },
];

export function ArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = useState(0);

  return (
    <section id="architecture" className="py-24 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            End-to-end architectural flow.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Decoupled service layers ensure your vector search, ingestion queues, agent logic, and user interface scale independently.
          </p>
        </div>

        {/* 4 Interactive Flow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARCH_NODES.map((node, idx) => {
            const isSelected = selectedNode === idx;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNode(idx)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "border-brand/70 bg-brand/10 ring-1 ring-brand/40 shadow-xl"
                    : "border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/12"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-muted-foreground">{node.step}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${node.color}`}>
                      {node.badge}
                    </span>
                  </div>
                  <node.icon className="h-5 w-5 text-foreground" />
                  <h3 className="font-display text-base font-bold text-foreground tracking-tight">
                    {node.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {node.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/6 mt-4 flex items-center justify-between text-[11px] font-mono text-brand">
                  <span>Inspect Layer</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Layer Inspector */}
        <div className="double-bezel">
          <div className="double-bezel-inner p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/8 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-brand">Layer {ARCH_NODES[selectedNode].step}:</span>
                <span className="font-display text-base font-bold text-foreground">
                  {ARCH_NODES[selectedNode].title} Deep Dive
                </span>
              </div>
              <span className="font-mono text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded border border-white/8">
                File: {ARCH_NODES[selectedNode].fileRef}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {ARCH_NODES[selectedNode].details.map((detail, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/6 bg-white/[0.02] flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
