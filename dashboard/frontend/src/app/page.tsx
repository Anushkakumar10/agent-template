"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Bot, Plus, Download, Rocket, Cpu, Layers, ArrowRight, Database, Plug, Sparkles } from "lucide-react";
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
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeatureBentoGrid } from "@/components/landing/feature-bento-grid";
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
     UNAUTHENTICATED MARKETING LANDING PAGE
     ════════════════════════════════════════════════════════════════════ */
  if (!isAuthenticated) {
    return (
      <div className="-mx-4 sm:-mx-8 -mt-6 -mb-6 page-enter min-h-screen bg-background text-foreground">
        <LandingNav />
        <main>
          <HeroSection />
          <TechMarquee />
          <HowItWorks />
          <FeatureBentoGrid />
          <ArchitectureDiagram />
          <ComparisonTable />
          <FaqSection />
        </main>
        <footer className="py-8 border-t border-border/40 text-center text-xs text-muted-foreground bg-background">
          <p>© 2026 Agent Template Generator. Open source under MIT License.</p>
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
    <div className="space-y-8 pb-12 page-enter">
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
