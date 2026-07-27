"use client";

import Link from "next/link";
import { ArrowUpRight, Star, Bot, Cpu, Database, Wrench, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AVATARS = ["AK", "MR", "JP", "SL", "DN"];

const FLOAT_PILLS = [
  {
    icon: Cpu,
    label: "5 Agent Frameworks",
    className: "left-[-16px] top-12 md:left-[-36px] md:top-16 float-y",
  },
  {
    icon: Database,
    label: "4 Vector DBs RAG",
    className: "right-[-12px] top-20 md:right-[-40px] md:top-24 float-y-delayed",
  },
  {
    icon: Wrench,
    label: "MCP Tools & Web Search",
    className: "left-[5%] bottom-[-16px] md:left-[10%] md:bottom-[-22px] float-y-delayed",
  },
  {
    icon: Sparkles,
    label: "FastAPI + Next.js 15",
    className: "right-[6%] bottom-[-10px] md:right-[10%] md:bottom-[-18px] float-y",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border/40 spotlight-bg">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 text-center flex flex-col items-center">
        {/* Hero Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15] max-w-4xl">
          Build production AI agents <br className="hidden sm:inline" />
          <span className="gradient-text italic font-normal">in minutes, not weeks.</span>
        </h1>

        {/* Hero Description */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Configure complete agent applications with <strong className="text-foreground font-semibold">5 AI frameworks</strong>,{" "}
          <strong className="text-foreground font-semibold">4 vector stores</strong>, and{" "}
          <strong className="text-foreground font-semibold">20+ enterprise integrations</strong>. Download a clean, ready-to-run FastAPI + Next.js stack.
        </p>

        {/* Dual CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="brand" size="lg" className="rounded-full px-7 h-12 text-sm font-semibold shadow-lg shadow-brand/20">
            <Link href="/register" className="flex items-center gap-2">
              <span>Generate Agent Stack Free</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-foreground/20 text-brand-foreground">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="rounded-full px-6 h-12 text-sm font-medium border-border/80 hover:bg-secondary">
            <Link href="#features">Explore Features</Link>
          </Button>
        </div>

        {/* Reassurance Microcopy */}
        <p className="mt-4 text-[11px] font-mono text-muted-foreground/75 tracking-wide">
          Open-source • Zero lock-in • Ready for Docker & Cloud Deployment
        </p>

        {/* Social Proof */}
        <div className="mt-8 flex flex-col items-center sm:flex-row sm:gap-4">
          <div className="flex -space-x-2">
            {AVATARS.map((initials, i) => (
              <span
                key={initials}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background font-mono text-[10px] font-bold text-white shadow-xs"
                style={{
                  background: `linear-gradient(135deg, oklch(65% 0.2 ${240 + i * 25}), oklch(50% 0.2 ${240 + i * 25}))`,
                }}
              >
                {initials}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-center sm:items-start mt-2 sm:mt-0">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Trusted by developers to generate <strong className="text-foreground font-semibold">1,200+ agent projects</strong>
            </p>
          </div>
        </div>

        {/* Dashboard Interactive Mockup Container */}
        <div className="relative mt-14 md:mt-20 w-full max-w-4xl">
          {/* Background Glow */}
          <div className="absolute inset-x-12 top-1/4 -z-10 h-1/2 rounded-full bg-brand/15 blur-3xl pointer-events-none" />

          {/* Interactive Mockup Frame */}
          <div className="rounded-2xl border border-foreground/15 bg-card/80 p-3 sm:p-4 shadow-2xl backdrop-blur-xl transition-all">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-border/50 pb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-[11px] font-mono text-muted-foreground ml-2">ak-agent-template generator</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" /> Ready to output
                </span>
              </div>
            </div>

            {/* Dashboard Content Teaser */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
              {/* Card 1 */}
              <div className="rounded-xl border border-border/60 bg-secondary/30 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <img src="/logos/pydantic.svg" alt="" className="h-4 w-4" /> PydanticAI Agent
                  </span>
                  <span className="text-[10px] font-mono text-brand bg-brand/15 px-2 py-0.5 rounded">Configured</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Type-safe agent with Logfire tracing & streaming response.</p>
              </div>

              {/* Card 2 */}
              <div className="rounded-xl border border-border/60 bg-secondary/30 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <img src="/logos/postgresql.svg" alt="" className="h-4 w-4" /> pgvector + Qdrant
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">RAG Ready</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Hybrid vector search with auto-document sync connectors.</p>
              </div>

              {/* Card 3 */}
              <div className="rounded-xl border border-border/60 bg-secondary/30 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <img src="/logos/nextjs.svg" alt="" className="h-4 w-4" /> Next.js 15 App
                  </span>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded">Full Stack</span>
                </div>
                <p className="text-[11px] text-muted-foreground">App Router frontend with chat interface & agent registry.</p>
              </div>
            </div>
          </div>

          {/* Floating Capability Pills */}
          {FLOAT_PILLS.map((pill) => (
            <div
              key={pill.label}
              className={`absolute hidden md:inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/90 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-md ${pill.className}`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <pill.icon className="h-3 w-3" />
              </span>
              <span>{pill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
