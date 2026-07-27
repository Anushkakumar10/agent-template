"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Bot, Plus, Download, Rocket, Search, Filter } from "lucide-react";
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
    <div className="space-y-6 pb-12">
      <PageHeader
        eyebrow="Registry"
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

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents by name, framework, description..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-44 animate-pulse bg-card/50" />
          ))}
        </div>
      ) : filteredAgents.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <Bot className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-60" />
          <h3 className="font-semibold text-base">No Matching Agent Projects</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto mb-4">
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
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="flex flex-col justify-between p-5 hover:border-foreground/30 transition-all">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg tracking-tight truncate">{agent.name}</h3>
                  <Badge variant={agent.status === "deployed" ? "success" : "secondary"}>
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {agent.description || "No description provided."}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <Badge variant="outline" className="font-mono">
                    Framework: {agent.config.ai_framework || "pydantic_ai"}
                  </Badge>
                  <Badge variant="outline" className="font-mono">
                    Provider: {agent.config.llm_provider || "google"}
                  </Badge>
                  <Badge variant="outline" className="font-mono">
                    DB: {agent.config.database || "postgresql"}
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
