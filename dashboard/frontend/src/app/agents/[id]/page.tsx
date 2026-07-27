"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bot, Download, Rocket, ArrowLeft, Check, Layers, ExternalLink, RefreshCw, Terminal } from "lucide-react";
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
  updated_at: string;
}

interface Deployment {
  id: string;
  provider: string;
  target_type: string;
  status: string;
  deployment_url?: string;
  logs?: string;
  created_at: string;
}

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: agentId } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const [selectedProvider, setSelectedProvider] = useState<"vercel" | "render">("vercel");
  const [deploying, setDeploying] = useState(false);

  // Fetch Agent Project
  const { data: agent, isLoading } = useQuery<AgentProject>({
    queryKey: ["agent", agentId],
    queryFn: () => apiClient.get<AgentProject>(`/agents/${agentId}`),
    enabled: isAuthenticated && !!agentId,
  });

  // Fetch Deployments
  const { data: deployments = [] } = useQuery<Deployment[]>({
    queryKey: ["deployments", agentId],
    queryFn: () => apiClient.get<Deployment[]>(`/agents/${agentId}/deployments`),
    enabled: isAuthenticated && !!agentId,
  });

  const handleDeploy = async (provider: "vercel" | "render") => {
    setDeploying(true);
    try {
      await apiClient.post(`/agents/${agentId}/deploy`, {
        provider,
        target_type: provider === "vercel" ? "frontend" : "backend",
      });
      queryClient.invalidateQueries({ queryKey: ["agent", agentId] });
      queryClient.invalidateQueries({ queryKey: ["deployments", agentId] });
    } catch (err: any) {
      alert(`Deployment failed: ${err.message}`);
    } finally {
      setDeploying(false);
    }
  };

  if (isLoading || !agent) {
    return (
      <div className="space-y-4 py-8">
        <div className="h-8 w-48 bg-card animate-pulse rounded" />
        <div className="h-64 w-full bg-card animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-4 text-xs">
          <Link href="/agents">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Agent Registry
          </Link>
        </Button>
        <PageHeader
          eyebrow={`Slug: ${agent.slug}`}
          title={agent.name}
          description={agent.description || "Configured full-stack AI agent project."}
          actions={
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <a href={`/api/agents/${agent.id}/download-zip`} download>
                  <Download className="h-4 w-4" /> Download ZIP
                </a>
              </Button>
            </div>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Config Viewer */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Project Overview & Configuration</CardTitle>
              <CardDescription>Configuration schema passed to project generator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono">Framework</p>
                  <p className="font-medium text-sm mt-0.5">{agent.config.ai_framework || "pydantic_ai"}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono">LLM Provider</p>
                  <p className="font-medium text-sm mt-0.5">{agent.config.llm_provider || "google"}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono">Database</p>
                  <p className="font-medium text-sm mt-0.5">{agent.config.database || "postgresql"}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono">ORM</p>
                  <p className="font-medium text-sm mt-0.5">{agent.config.orm_type || "sqlalchemy"}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono">Frontend</p>
                  <p className="font-medium text-sm mt-0.5">{agent.config.frontend || "nextjs"}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono">Brand Color</p>
                  <p className="font-medium text-sm mt-0.5 capitalize">{agent.config.brand_color || "blue"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">JSON Configuration (.ak-agent-template.json)</p>
                <pre className="p-4 rounded-xl bg-secondary/50 font-mono text-xs overflow-x-auto max-h-80 border border-border">
                  {JSON.stringify(agent.config, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Deployment History */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Deployment History</CardTitle>
              <CardDescription>Logs and target URLs for deployed cloud services</CardDescription>
            </CardHeader>
            <CardContent>
              {deployments.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">No deployments triggered yet.</p>
              ) : (
                <div className="space-y-4">
                  {deployments.map((d) => (
                    <div key={d.id} className="rounded-xl border border-border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="brand" className="uppercase font-mono text-[10px]">
                            {d.provider}
                          </Badge>
                          <span className="text-xs font-semibold">{d.target_type}</span>
                        </div>
                        <Badge variant="success">Active</Badge>
                      </div>

                      {d.deployment_url && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">URL:</span>
                          <a href={d.deployment_url} target="_blank" rel="noreferrer" className="text-brand font-medium hover:underline flex items-center gap-1">
                            {d.deployment_url} <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}

                      {d.logs && (
                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground mb-1">Deployment Logs</p>
                          <pre className="p-3 rounded-lg bg-black/80 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                            {d.logs}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Deploy Action Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Deploy Agent</CardTitle>
              <CardDescription>Select a cloud provider to trigger automated deployment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProvider("vercel")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedProvider === "vercel"
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-border hover:border-foreground/20"
                  }`}
                >
                  <p className="font-semibold text-sm">Vercel</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Frontend Next.js App</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedProvider("render")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedProvider === "render"
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-border hover:border-foreground/20"
                  }`}
                >
                  <p className="font-semibold text-sm">Render</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">FastAPI Backend API</p>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-secondary/50 text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">Target Provider: {selectedProvider.toUpperCase()}</p>
                <p>
                  {selectedProvider === "vercel"
                    ? "Builds Next.js 15 SSR application and configures edge rewrites to API."
                    : "Provisions containerized FastAPI server with PostgreSQL and environment secrets."}
                </p>
              </div>

              <Button
                variant="brand"
                className="w-full"
                disabled={deploying}
                onClick={() => handleDeploy(selectedProvider)}
              >
                <Rocket className="h-4 w-4" />
                {deploying ? "Deploying..." : `Deploy to ${selectedProvider.toUpperCase()}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
