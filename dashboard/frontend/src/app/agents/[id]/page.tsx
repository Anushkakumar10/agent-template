"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bot, Download, Rocket, ArrowLeft, Check, Layers, ExternalLink, RefreshCw, Terminal, ChevronDown, ChevronRight, Copy, Clock } from "lucide-react";
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
  const [jsonExpanded, setJsonExpanded] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const handleCopyJson = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

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
    <div className="space-y-8 pb-12 page-enter">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-4 text-xs">
          <Link href="/agents">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Agent Registry
          </Link>
        </Button>
        <PageHeader
          title={
            <span className="flex items-center gap-3">
              {agent.name}
              <Badge
                variant={agent.status === "deployed" ? "success" : "secondary"}
                className="text-xs ml-1"
              >
                <span
                  className={`status-dot mr-1.5 ${
                    agent.status === "deployed" ? "status-dot--active" : "status-dot--idle"
                  }`}
                />
                {agent.status}
              </Badge>
            </span>
          }
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
                {/* Framework */}
                <div className="rounded-xl border border-border/60 p-3 space-y-1 bg-secondary/20 transition-colors hover:bg-secondary/30">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Framework</p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-background p-1 border border-border shadow-xs">
                      <img
                        src={
                          (agent.config.ai_framework || "pydantic_ai") === "pydantic_ai"
                            ? "/logos/pydantic.svg"
                            : agent.config.ai_framework === "langchain"
                            ? "/logos/langchain.svg"
                            : agent.config.ai_framework === "langgraph"
                            ? "/logos/langgraph.svg"
                            : agent.config.ai_framework === "deepagents"
                            ? "/logos/deepagents.svg"
                            : "/logos/python.svg"
                        }
                        alt="Framework"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-xs text-foreground truncate">
                      {agent.config.ai_framework || "pydantic_ai"}
                    </span>
                  </div>
                </div>

                {/* LLM Provider */}
                <div className="rounded-xl border border-border/60 p-3 space-y-1 bg-secondary/20 transition-colors hover:bg-secondary/30">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">LLM Provider</p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-background p-1 border border-border shadow-xs">
                      <img
                        src={
                          (agent.config.llm_provider || "google") === "google"
                            ? "/logos/gemini.svg"
                            : agent.config.llm_provider === "openai"
                            ? "/logos/openai.svg"
                            : agent.config.llm_provider === "anthropic"
                            ? "/logos/anthropic.svg"
                            : "/logos/mcp.svg"
                        }
                        alt="LLM Provider"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-xs text-foreground truncate">
                      {agent.config.llm_provider || "google"}
                    </span>
                  </div>
                </div>

                {/* Database */}
                <div className="rounded-xl border border-border/60 p-3 space-y-1 bg-secondary/20 transition-colors hover:bg-secondary/30">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Database</p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-background p-1 border border-border shadow-xs">
                      <img src="/logos/postgresql.svg" alt="Database" className="h-full w-full object-contain" />
                    </div>
                    <span className="font-semibold text-xs text-foreground truncate">
                      {agent.config.database || "postgresql"}
                    </span>
                  </div>
                </div>

                {/* ORM */}
                <div className="rounded-xl border border-border/60 p-3 space-y-1 bg-secondary/20 transition-colors hover:bg-secondary/30">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">ORM</p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-background p-1 border border-border shadow-xs">
                      <img src="/logos/python.svg" alt="ORM" className="h-full w-full object-contain" />
                    </div>
                    <span className="font-semibold text-xs text-foreground truncate">
                      {agent.config.orm_type || "sqlalchemy"}
                    </span>
                  </div>
                </div>

                {/* Frontend */}
                <div className="rounded-xl border border-border/60 p-3 space-y-1 bg-secondary/20 transition-colors hover:bg-secondary/30">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Frontend</p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-background p-1 border border-border shadow-xs">
                      <img
                        src={agent.config.frontend === "none" ? "/logos/python.svg" : "/logos/nextjs.svg"}
                        alt="Frontend"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-xs text-foreground truncate">
                      {agent.config.frontend || "nextjs"}
                    </span>
                  </div>
                </div>

                {/* Brand Color */}
                <div className="rounded-xl border border-border/60 p-3 space-y-1 bg-secondary/20 transition-colors hover:bg-secondary/30">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Brand Color</p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span
                      className={`h-4 w-4 rounded-full border border-background shadow-xs ${
                        agent.config.brand_color === "green"
                          ? "bg-emerald-500"
                          : agent.config.brand_color === "violet"
                          ? "bg-violet-500"
                          : agent.config.brand_color === "orange"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <span className="font-semibold text-xs text-foreground capitalize">
                      {agent.config.brand_color || "blue"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Collapsible JSON Configuration Panel */}
              <div className="rounded-xl border border-border/60 bg-secondary/20 overflow-hidden mt-2">
                <div
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-secondary/40 transition-colors select-none"
                  onClick={() => setJsonExpanded(!jsonExpanded)}
                >
                  <div className="flex items-center gap-2">
                    {jsonExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-xs font-semibold text-foreground">
                      JSON Configuration (.ak-agent-template.json)
                    </span>
                  </div>
                  {jsonExpanded && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyJson(JSON.stringify(agent.config, null, 2));
                      }}
                    >
                      {copiedJson ? (
                        <>
                          <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                          <span className="text-emerald-500 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {jsonExpanded && (
                  <div className="border-t border-border/60 p-4 bg-background/60 relative group">
                    <pre className="font-mono text-xs overflow-x-auto max-h-80 text-foreground leading-relaxed">
                      {JSON.stringify(agent.config, null, 2)}
                    </pre>
                  </div>
                )}
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
                <div className="py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground mx-auto mb-3">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">No deployments yet</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                    Deploy your first service using the panel on the right to see deployment history here.
                  </p>
                </div>
              ) : (
                <div className="space-y-0 relative">
                  {/* Timeline connector */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-border/40 rounded-full" />

                  {deployments.map((d, idx) => (
                    <div key={d.id} className="relative pl-10 pb-6 last:pb-0">
                      {/* Timeline dot */}
                      <div className="absolute left-[10px] top-1 w-[12px] h-[12px] rounded-full border-2 border-brand bg-background z-10" />

                      <div className="rounded-xl border border-border/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="brand" className="uppercase font-mono text-[10px]">
                              {d.provider}
                            </Badge>
                            <span className="text-xs font-semibold">{d.target_type}</span>
                          </div>
                          <Badge variant="success">
                            <span className="status-dot status-dot--active mr-1.5" />
                            Active
                          </Badge>
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
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    selectedProvider === "vercel"
                      ? "border-brand bg-brand/5 shadow-sm ring-1 ring-brand/50"
                      : "border-border/60 hover:border-foreground/20"
                  }`}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background p-1 border border-border shadow-xs mt-0.5">
                    <img src="/logos/nextjs.svg" alt="Vercel Next.js" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Vercel</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Frontend Next.js App</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedProvider("render")}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    selectedProvider === "render"
                      ? "border-brand bg-brand/5 shadow-sm ring-1 ring-brand/50"
                      : "border-border/60 hover:border-foreground/20"
                  }`}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background p-1 border border-border shadow-xs mt-0.5">
                    <img src="/logos/python.svg" alt="Render FastAPI" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Render</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">FastAPI Backend API</p>
                  </div>
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
