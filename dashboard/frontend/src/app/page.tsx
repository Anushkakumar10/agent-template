"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Bot, Plus, Download, Rocket, Cpu, Layers, ArrowRight, Database, Plug, Sparkles, Github, Terminal, BookOpen, Shield } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

// Unauthenticated Landing Components
import { LandingNav } from "@/components/landing/landing-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { TechMarquee } from "@/components/landing/tech-marquee";
import { FeatureBentoGrid } from "@/components/landing/feature-bento-grid";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ArchitectureDiagram } from "@/components/landing/architecture-diagram";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { FaqSection } from "@/components/landing/faq-section";

interface AgentProject {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: string;
  config: Record<string, any>;
  created_at: string;
}

/* ── Helper: framework logo path ────────────────────────────────────── */
function frameworkLogo(fw: string) {
  const map: Record<string, string> = {
    pydantic_ai: "/logos/pydantic.svg",
    langchain: "/logos/langchain.svg",
    langgraph: "/logos/langgraph.svg",
    deepagents: "/logos/deepagents.svg",
  };
  return map[fw] || "/logos/python.svg";
}

function providerLogo(p: string) {
  const map: Record<string, string> = {
    google: "/logos/gemini.svg",
    openai: "/logos/openai.svg",
    anthropic: "/logos/anthropic.svg",
  };
  return map[p] || "/logos/mcp.svg";
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();

  const { data: agents = [], isLoading } = useQuery<AgentProject[]>({
    queryKey: ["agents"],
    queryFn: () => apiClient.get<AgentProject[]>("/agents"),
    enabled: isAuthenticated,
  });

  /* ════════════════════════════════════════════════════════════════════
     UNAUTHENTICATED MARKETING LANDING PAGE (Vanguard System)
     ════════════════════════════════════════════════════════════════════ */
  if (!isAuthenticated) {
    return (
      <div className="landing-root w-full min-h-screen bg-background text-foreground page-enter">
        <LandingNav />
        <main>
          <HeroSection />
          <TechMarquee />
          <FeatureBentoGrid />
          <HowItWorks />
          <ArchitectureDiagram />
          <ComparisonTable />
          <FaqSection />
        </main>

        {/* Global Studio 4-Column Footer */}
        <footer className="border-t border-white/8 bg-[#07090F] py-16 text-xs text-muted-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {/* Column 1: Brand & Matrix Mark (2 cols) */}
              <div className="col-span-2 space-y-4">
                <Link href="/" className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 border border-brand/30 text-brand">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="5" r="2" fill="currentColor" fillOpacity="0.2" />
                      <circle cx="5" cy="18" r="2" fill="currentColor" fillOpacity="0.2" />
                      <circle cx="19" cy="18" r="2" fill="currentColor" fillOpacity="0.2" />
                      <path d="M12 7v10M6.5 16.5l11-9M17.5 16.5l-11-9" strokeOpacity="0.5" />
                    </svg>
                  </span>
                  <span>Agent Template</span>
                </Link>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                  Production-grade FastAPI and Next.js full-stack scaffolding engine for autonomous AI agents, dense vector RAG, and enterprise connectors.
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Open Source under MIT License</span>
                </div>
              </div>

              {/* Column 2: Frameworks */}
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
                  Frameworks
                </p>
                <ul className="space-y-2 text-xs">
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">PydanticAI</span></li>
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">LangGraph</span></li>
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">DeepAgents</span></li>
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">LangChain</span></li>
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">FastAPI Core</span></li>
                </ul>
              </div>

              {/* Column 3: RAG & Infrastructure */}
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
                  Vector & Data
                </p>
                <ul className="space-y-2 text-xs">
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">Qdrant VectorStore</span></li>
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">PostgreSQL pgvector</span></li>
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">Milvus Distributed</span></li>
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">Google Drive Sync</span></li>
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">Amazon S3 Connector</span></li>
                </ul>
              </div>

              {/* Column 4: Resources & CLI */}
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
                  Resources
                </p>
                <ul className="space-y-2 text-xs">
                  <li><a href="#architecture" className="hover:text-foreground transition-colors">Architecture Guide</a></li>
                  <li><a href="#comparison" className="hover:text-foreground transition-colors">Stack Comparison</a></li>
                  <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                  <li><Link href="/login" className="hover:text-foreground transition-colors">Developer Portal</Link></li>
                  <li><span className="hover:text-foreground transition-colors cursor-pointer">CLI Reference</span></li>
                </ul>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground">
              <p>© 2026 Agent Template Generator. Built for autonomous AI engineering teams.</p>
              <div className="flex items-center gap-6 font-mono text-[11px]">
                <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
                <span className="hover:text-foreground transition-colors cursor-pointer">Terms</span>
                <span className="hover:text-foreground transition-colors cursor-pointer">Security</span>
                <span className="hover:text-foreground transition-colors cursor-pointer">MIT License</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════════
     AUTHENTICATED DASHBOARD
     ════════════════════════════════════════════════════════════════════ */
  const activeAgents = agents.length;
  const deployedAgents = agents.filter((a) => a.status === "deployed").length;

  return (
    <div className="px-4 py-6 sm:px-8 max-w-7xl w-full mx-auto space-y-8 pb-12 page-enter">
      <PageHeader
        title={`Welcome back, ${user?.username || "Developer"}`}
        description="Configure, download, and manage your FastAPI + Next.js AI agent projects."
        actions={
          <Button asChild variant="brand">
            <Link href="/agents/new">
              <Plus className="h-4 w-4" />
              New Agent Project
            </Link>
          </Button>
        }
      />

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            label: "Total Projects",
            value: isLoading ? "—" : activeAgents,
            sub: "Configured AI projects",
            icon: Bot,
          },
          {
            label: "Deployed Services",
            value: isLoading ? "—" : deployedAgents,
            sub: "Active cloud deployments",
            icon: Rocket,
          },
          {
            label: "Supported Frameworks",
            value: 5,
            sub: "PydanticAI, LangGraph, DeepAgents & more",
            icon: Cpu,
          },
        ].map((m) => (
          <Card key={m.label} className="p-5 flex flex-col justify-between gradient-border-top card-lift">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{m.label}</p>
              <m.icon className="h-4 w-4 text-muted-foreground/60" />
            </div>
            <div className="mt-3">
              <p className="font-display text-3xl font-semibold tracking-tight">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Agents Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight">Agent Registry</h2>
            <p className="text-xs text-muted-foreground">Recently configured AI agent projects</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/agents">
              View All Registry <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-44 animate-pulse bg-card/50" />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <Card className="p-10 text-center border-dashed">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand mx-auto mb-4">
              <Bot className="h-7 w-7" />
            </div>
            <h3 className="font-semibold text-sm">No Agent Projects Yet</h3>
            <p className="text-xs text-muted-foreground mt-1.5 max-w-sm mx-auto mb-5">
              Get started by creating your first full-stack AI agent with customized tools and infrastructure.
            </p>
            <Button asChild variant="brand" size="sm">
              <Link href="/agents/new">
                <Plus className="h-4 w-4" /> Create Agent Project
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agents.slice(0, 6).map((agent, i) => (
              <Card
                key={agent.id}
                className={`card-lift flex flex-col justify-between p-5 stagger-${Math.min(i + 1, 6)}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base tracking-tight truncate">{agent.name}</h3>
                    <Badge variant={agent.status === "deployed" ? "success" : "secondary"}>
                      <span
                        className={`status-dot mr-1.5 ${
                          agent.status === "deployed" ? "status-dot--active" : "status-dot--idle"
                        }`}
                      />
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px]">
                    {agent.description || "No description provided."}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-[10px] gap-1 py-0.5">
                      <img
                        src={frameworkLogo(agent.config.ai_framework || "pydantic_ai")}
                        alt=""
                        className="h-3 w-3 object-contain"
                      />
                      {agent.config.ai_framework || "pydantic_ai"}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[10px] gap-1 py-0.5">
                      <img
                        src={providerLogo(agent.config.llm_provider || "google")}
                        alt=""
                        className="h-3 w-3 object-contain"
                      />
                      {agent.config.llm_provider || "google"}
                    </Badge>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    <Link href={`/agents/${agent.id}`}>Configure &rarr;</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
