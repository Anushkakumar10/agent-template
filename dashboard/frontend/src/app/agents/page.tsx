"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Bot, Plus, Download, Rocket, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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

/* ── Helpers ─────────────────────────────────────────────────────── */
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

export default function AgentRegistryPage() {
  const { isAuthenticated } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: agents = [], isLoading } = useQuery<AgentProject[]>({
    queryKey: ["agents"],
    queryFn: () => apiClient.get<AgentProject[]>("/agents"),
    enabled: isAuthenticated,
  });

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.description && a.description.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="space-y-6 pb-12 page-enter">
      <PageHeader
        title="Agent Projects"
        description="View, manage, download as ZIP, and deploy your registered AI agent templates."
        actions={
          <Button asChild variant="brand">
            <Link href="/agents/new">
              <Plus className="h-4 w-4" /> New Agent
            </Link>
          </Button>
        }
      />

      {/* Search bar + result count */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents by name, framework, description..."
            className="pl-9 bg-card/50 border-border/60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {!isLoading && (
          <Badge variant="secondary" className="text-xs font-mono px-3 py-1.5 shrink-0">
            {filteredAgents.length} project{filteredAgents.length !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-52 animate-pulse bg-card/50" />
          ))}
        </div>
      ) : filteredAgents.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand mx-auto mb-4">
            <Bot className="h-7 w-7" />
          </div>
          <h3 className="font-semibold text-base">No Matching Agent Projects</h3>
          <p className="text-xs text-muted-foreground mt-1.5 max-w-sm mx-auto mb-5">
            {searchTerm ? "No agents matched your search query." : "You haven't created any agent configurations yet."}
          </p>
          <Button asChild variant="brand" size="sm">
            <Link href="/agents/new">
              <Plus className="h-4 w-4" /> Create Agent Project
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent, i) => (
            <Card
              key={agent.id}
              className={`flex flex-col justify-between p-5 card-lift stagger-${Math.min(i + 1, 6)}`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 border border-brand/15">
                      <img
                        src={frameworkLogo(agent.config.ai_framework || "pydantic_ai")}
                        alt=""
                        className="h-4.5 w-4.5 object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-base tracking-tight truncate">{agent.name}</h3>
                  </div>
                  <Badge variant={agent.status === "deployed" ? "success" : "secondary"} className="shrink-0">
                    <span
                      className={`status-dot mr-1.5 ${
                        agent.status === "deployed" ? "status-dot--active" : "status-dot--idle"
                      }`}
                    />
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 pl-[42px]">
                  {agent.description || "No description provided."}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border/60 space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <Badge variant="outline" className="font-mono gap-1 py-0.5">
                    <img
                      src={frameworkLogo(agent.config.ai_framework || "pydantic_ai")}
                      alt=""
                      className="h-3 w-3 object-contain"
                    />
                    {agent.config.ai_framework || "pydantic_ai"}
                  </Badge>
                  <Badge variant="outline" className="font-mono gap-1 py-0.5">
                    <img
                      src={providerLogo(agent.config.llm_provider || "google")}
                      alt=""
                      className="h-3 w-3 object-contain"
                    />
                    {agent.config.llm_provider || "google"}
                  </Badge>
                  <Badge variant="outline" className="font-mono py-0.5">
                    {agent.config.database || "postgresql"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                    <a href={`/api/agents/${agent.id}/download-zip`} download>
                      <Download className="h-3.5 w-3.5" /> Download ZIP
                    </a>
                  </Button>
                  <Button asChild variant="brand" size="sm" className="h-8 text-xs">
                    <Link href={`/agents/${agent.id}`}>Details &rarr;</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
