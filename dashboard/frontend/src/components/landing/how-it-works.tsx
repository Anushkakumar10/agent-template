"use client";

import { useState } from "react";
import { Sliders, Download, Terminal, ArrowRight, Check, Code, Rocket, CheckCircle2 } from "lucide-react";

const PIPELINE_STEPS = [
  {
    num: "01",
    title: "Configure Stack",
    summary: "CLI wizard or declarative flags",
    description:
      "Select your AI agent framework, LLM provider, vector database, and enterprise features via Questionary interactive prompts or single-command flags.",
    snippet: "ak-agent-template create my_agent \\\n  --framework pydantic_ai \\\n  --database postgresql \\\n  --rag --task-queue celery",
  },
  {
    num: "02",
    title: "Generate Repository",
    summary: "Cookiecutter + Post-Gen Hooks",
    description:
      "Cookiecutter generates clean modular Python and TypeScript code. Post-generation hooks immediately validate syntax, run Ruff formatting, and set up git tracking.",
    snippet: "[ok] Generated FastAPI backend (/backend)\n[ok] Generated Next.js 15 UI (/frontend)\n[ok] Configured Qdrant & pgvector adapters\n[ok] Formatted with Ruff (100% compliant)",
  },
  {
    num: "03",
    title: "Run & Deploy",
    summary: "uv sync & Instant Docker boot",
    description:
      "Install dependencies with uv in under 2 seconds, spin up local vector stores with Docker Compose, and push to production on Render and Vercel.",
    snippet: "$ uv sync\n$ docker compose up -d\n$ uv run uvicorn app.main:app --reload\n-> Application active on http://localhost:8000",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 md:py-32 border-t border-white/6 bg-[#090B12]/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            From zero to running agent in three steps.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            A frictionless developer experience designed for engineering velocity and strict code cleanliness.
          </p>
        </div>

        {/* 3 Steps Pipeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selectors (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {PIPELINE_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "border-brand/60 bg-brand/10 ring-1 ring-brand/30 shadow-lg"
                      : "border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/12"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-brand">{step.num}</span>
                    <span className="text-[11px] font-mono text-muted-foreground">{step.summary}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Step Execution Inspector (Right 7 Cols) */}
          <div className="lg:col-span-7 double-bezel">
            <div className="double-bezel-inner p-5 sm:p-7 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/8 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-2 text-foreground font-semibold">
                  <Terminal className="h-4 w-4 text-brand" />
                  Step {PIPELINE_STEPS[activeStep].num}: {PIPELINE_STEPS[activeStep].title} Terminal Execution
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Ready
                </span>
              </div>

              {/* Terminal Code Execution Output */}
              <div className="rounded-xl border border-white/6 bg-[#07080D] p-5 font-mono text-xs overflow-x-auto min-h-[220px]">
                <pre className="text-foreground/90 leading-relaxed font-mono">
                  <code>{PIPELINE_STEPS[activeStep].snippet}</code>
                </pre>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Deterministic Cookiecutter output</span>
                <span className="text-brand">uv · ruff · mypy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
