"use client";

import { Sliders, Download, Terminal, ArrowRight } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Sliders,
    title: "Configure Your Stack",
    description: "Choose your AI framework (PydanticAI, LangGraph, etc.), LLM provider, vector database, and extra capabilities like Stripe billing or MCP tools.",
    detail: "Interactive wizard or Click CLI",
  },
  {
    num: "02",
    icon: Download,
    title: "Generate Production Code",
    description: "Click generate to invoke Cookiecutter with post-gen formatting hooks. Download a clean ZIP package with FastAPI backend and optional Next.js frontend.",
    detail: "Clean modular repository",
  },
  {
    num: "03",
    icon: Terminal,
    title: "Run Local & Deploy Cloud",
    description: "Run `uv sync` to install dependencies, spin up Docker services, and deploy seamlessly to Vercel (frontend) or Render (backend API).",
    detail: "Instant docker compose up",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 border-b border-border/40 bg-background relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand mb-4">
            HOW IT WORKS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Get started in <span className="gradient-text italic font-normal">three simple steps.</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            From initial stack selection to local execution, experience a frictionless developer workflow designed to get AI agents into production fast.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-4 card-lift flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-brand">{step.num}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground tracking-tight">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>{step.detail}</span>
                <ArrowRight className="h-3.5 w-3.5 text-brand" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
