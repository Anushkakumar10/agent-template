"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FAQS = [
  {
    q: "What frameworks are included in the generated template?",
    a: "You can select from PydanticAI, LangChain, LangGraph, DeepAgents, or PydanticDeep. You can also generate a lightweight FastAPI backend without pre-built agent orchestrators.",
  },
  {
    q: "Which vector databases can I use for RAG?",
    a: "We support Milvus, Qdrant, ChromaDB, and PostgreSQL with pgvector. The generated repository includes pre-written vector store abstraction wrappers for seamlessly switching providers.",
  },
  {
    q: "How do I run the generated project locally?",
    a: "Simply extract the downloaded ZIP archive, navigate to the folder, and run `uv sync` to install Python dependencies. Launch the FastAPI server with `uv run uvicorn` and Next.js with `bun run dev`.",
  },
  {
    q: "What deployment targets are supported?",
    a: "The dashboard includes 1-click deployment automation for Vercel (Next.js SSR application) and Render (FastAPI backend API), plus standard Docker Compose configs.",
  },
  {
    q: "Is there any lock-in or proprietary code?",
    a: "Zero lock-in. The generated repository contains clean, modular open-source Python and TypeScript code. You own 100% of the code and can host it anywhere.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-background relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything you need <span className="gradient-text italic font-normal">to know.</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Have questions about project generation, stack options, or licensing? We've got answers.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-border/60 bg-card overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-foreground hover:text-brand transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40 mt-1 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-2xl border border-brand/30 bg-brand/5 p-8 md:p-12 text-center space-y-6 gradient-border-top relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Ready to build your next AI agent project?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Create your account in seconds and generate production-ready FastAPI + Next.js code tailored to your exact stack requirements.
            </p>
            <div className="pt-2">
              <Button asChild variant="brand" size="lg" className="rounded-full px-8 h-12 text-sm font-semibold shadow-lg shadow-brand/20">
                <Link href="/register">
                  <Sparkles className="h-4 w-4 mr-2" /> Start Building Free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
