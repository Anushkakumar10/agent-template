"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight, Terminal, Check, Copy, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FAQS = [
  {
    q: "Which agent frameworks can I choose during generation?",
    a: "You can select from PydanticAI (type-safe with Logfire), LangGraph (cyclical graphs with persistent checkpoints), DeepAgents (hierarchical multi-actor swarms), LangChain, or a lightweight raw FastAPI backend without pre-built agent orchestrators.",
  },
  {
    q: "What vector databases and embedding providers are supported?",
    a: "We include out-of-the-box adapters for Milvus, Qdrant, ChromaDB, and PostgreSQL pgvector. All implementations adhere to a unified BaseVectorStore abstraction, allowing seamless runtime provider swapping.",
  },
  {
    q: "How do scheduled document sync connectors work?",
    a: "Generated projects include background connectors for Google Drive (service accounts), Amazon S3/MinIO buckets, and local CLI folders. Connectors can run on scheduled background cron intervals or via direct API triggers.",
  },
  {
    q: "How do I run and test the generated project locally?",
    a: "Extract your generated stack and run `uv sync` to install Python dependencies in seconds. Run `docker compose up -d` to launch your chosen vector database, and run `uv run uvicorn app.main:app --reload` to start the backend with automatic hot-reloading.",
  },
  {
    q: "Is there any proprietary vendor lock-in?",
    a: "None. You own 100% of the code. The output is clean, standard open-source Python (FastAPI, Pydantic V2) and Next.js 15 (React 19). No proprietary runtime dependencies or closed licensing.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const cliCommand = "uvx ak-agent-template";

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Frequently asked questions.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Everything you need to know about architecture, stack options, and local execution.
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const contentId = `faq-content-${idx}`;
            const headerId = `faq-header-${idx}`;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/8 bg-[#0D1019]/90 overflow-hidden transition-colors hover:border-white/14"
              >
                <button
                  type="button"
                  id={headerId}
                  aria-controls={contentId}
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-white/6 pt-4"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            Studio Final Call-to-Action Stage (Double-Bezel Architecture)
           ========================================================================= */}
        <div className="relative pt-8">
          {/* Ambient Glow behind CTA */}
          <div className="absolute inset-x-4 top-1/2 -z-10 h-64 -translate-y-1/2 rounded-full bg-brand/15 blur-3xl pointer-events-none" />

          <div className="double-bezel">
            <div className="double-bezel-inner p-8 sm:p-12 text-center space-y-6">
              <div className="max-w-xl mx-auto space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-brand font-semibold">
                  Start Building Today
                </span>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Ready to deploy production AI agents?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Generate a complete, type-safe FastAPI and Next.js stack with your exact framework and vector store preferences.
                </p>
              </div>

              {/* Action Cluster */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  variant="brand"
                  size="lg"
                  className="btn-island group h-12 px-6 py-2 text-sm font-semibold shadow-xl shadow-brand/30 border border-brand/40"
                >
                  <Link href="/register">
                    <span>Initialize Stack Free</span>
                    <span className="btn-island-badge h-7 w-7 bg-white/20">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </Button>

                {/* Inline Quick-Start CLI Snippet */}
                <div className="flex h-12 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-xs text-muted-foreground shadow-inner backdrop-blur-md">
                  <Terminal className="h-3.5 w-3.5 text-brand shrink-0" aria-hidden="true" />
                  <span className="text-foreground/90 font-medium select-all">{cliCommand}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="ml-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-brand"
                    title="Copy command"
                    aria-label="Copy CLI command"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-[11px] font-mono text-muted-foreground/70">
                100% Open Source under MIT License • No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
