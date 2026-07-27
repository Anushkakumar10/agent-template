"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Bot, Plus, Download, Rocket, Cpu, Layers, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

interface AgentProject {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: string;
  config: Record<string, any>;
  created_at: string;
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();

  const { data: agents = [], isLoading } = useQuery<AgentProject[]>({
    queryKey: ["agents"],
    queryFn: () => apiClient.get<AgentProject[]>("/agents"),
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <Bot className="h-8 w-8" />
        </div>
        <div className="space-y-2 max-w-md">
          <h1 className="text-3xl font-bold font-display tracking-tight">Agent Template Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Visual management workspace to create, configure, download, and deploy production-ready AI agents.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="brand" size="lg">
            <Link href="/login">Sign In to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </div>
    );
  }

  const activeAgents = agents.length;
  const deployedAgents = agents.filter((a) => a.status === "deployed").length;

  return (
    <div className="space-y-8 pb-12">
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
        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Total Projects</p>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-3">
            <p className="font-display text-3xl font-semibold tracking-tight">{isLoading ? "—" : activeAgents}</p>
            <p className="text-xs text-muted-foreground mt-1">Configured AI projects</p>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Deployed Services</p>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-3">
            <p className="font-display text-3xl font-semibold tracking-tight">{isLoading ? "—" : deployedAgents}</p>
            <p className="text-xs text-muted-foreground mt-1">Active cloud deployments</p>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Supported Frameworks</p>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-3">
            <p className="font-display text-3xl font-semibold tracking-tight">5</p>
            <p className="text-xs text-muted-foreground mt-1">PydanticAI, LangGraph, DeepAgents & more</p>
          </div>
        </Card>
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
              <Card key={i} className="h-40 animate-pulse bg-card/50" />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <Card className="p-8 text-center border-dashed">
            <Bot className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-60" />
            <h3 className="font-semibold text-sm">No Agent Projects Yet</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto mb-4">
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
            {agents.slice(0, 6).map((agent) => (
              <Card key={agent.id} className="hover:border-foreground/30 transition-colors flex flex-col justify-between p-5">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base tracking-tight truncate">{agent.name}</h3>
                    <Badge variant={agent.status === "deployed" ? "success" : "secondary"}>
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px]">
                    {agent.description || "No description provided."}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {agent.config.ai_framework || "pydantic_ai"}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[10px]">
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
