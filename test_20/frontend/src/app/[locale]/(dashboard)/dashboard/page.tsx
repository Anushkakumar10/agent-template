"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/hooks";
import { ROUTES, BACKEND_URL } from "@/lib/constants";
import type { HealthResponse, Conversation, ConversationListResponse } from "@/types";
import {
  CheckCircle,
  XCircle,
  Loader2,
  User,
  ArrowRight,
  MessageSquare,
  Database,
  Settings,
  Activity,
  ExternalLink,
  Clock,
  CircleCheck,
  Circle,
  BookOpen,
} from "lucide-react";
import {
  listCollections,
  getCollectionInfo,
  type RAGCollectionInfo,
} from "@/lib/rag-api";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface GettingStartedItem {
  label: string;
  done: boolean;
  href?: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [healthError, setHealthError] = useState(false);
  const [ragStats, setRagStats] = useState<{
    collections: RAGCollectionInfo[];
    totalVectors: number;
  } | null>(null);
  const [recentConversations, setRecentConversations] = useState<Conversation[]>([]);
  const [conversationsLoading, setConversationsLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await apiClient.get<HealthResponse>("/health");
        setHealth(data);
        setHealthError(false);
      } catch {
        setHealthError(true);
      } finally {
        setHealthLoading(false);
      }
    };

    const loadRagStats = async () => {
      try {
        const data = await listCollections();
        const infos: RAGCollectionInfo[] = [];
        let totalVectors = 0;
        for (const name of data.items) {
          try {
            const info = await getCollectionInfo(name);
            infos.push(info);
            totalVectors += info.total_vectors;
          } catch {
            /* ignore */
          }
        }
        setRagStats({ collections: infos, totalVectors });
      } catch {
        /* ignore */
      }
    };

    const loadConversations = async () => {
      try {
        const data = await apiClient.get<ConversationListResponse>(
          "/conversations?limit=5"
        );
        setRecentConversations(data.items || []);
      } catch {
        /* ignore */
      } finally {
        setConversationsLoading(false);
      }
    };

    checkHealth();
    loadRagStats();
    loadConversations();
  }, []);

  const gettingStarted: GettingStartedItem[] = [
    {
      label: "Create your account",
      done: !!user,
    },
    {
      label: "Set up API keys (.env)",
      done: !healthError,
      href: `${BACKEND_URL}/docs`,
    },
    {
      label: "Ingest your first document",
      done: (ragStats?.totalVectors ?? 0) > 0,
      href: ROUTES.RAG,
    },
    {
      label: "Start your first conversation",
      done: recentConversations.length > 0,
      href: ROUTES.CHAT,
    },
  ];

  const completedSteps = gettingStarted.filter((s) => s.done).length;

  const displayName = user?.name || user?.email?.split("@")[0] || "";

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          {getGreeting()}
          {displayName ? `, ${displayName}` : ""}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Here&apos;s what&apos;s happening with your project.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              API Status
            </CardTitle>
            {healthLoading ? (
              <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
            ) : healthError ? (
              <XCircle className="text-destructive h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {healthLoading
                ? "..."
                : healthError
                  ? "Offline"
                  : health?.status || "OK"}
            </p>
            {health?.version && (
              <p className="text-muted-foreground text-xs">v{health.version}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Account
            </CardTitle>
            <User className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="truncate text-sm font-medium">
              {user?.email || "..."}
            </p>
            <p className="text-muted-foreground text-xs">
              {user?.is_superuser ? "Admin" : "User"}
              {user?.created_at &&
                ` · Since ${new Date(user.created_at).toLocaleDateString()}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              AI Agent
            </CardTitle>
            <Activity className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">pydantic_ai</p>
            <p className="text-muted-foreground text-xs">openrouter provider</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Knowledge Base
            </CardTitle>
            <Database className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {ragStats?.totalVectors?.toLocaleString() ?? "..."}
            </p>
            <p className="text-muted-foreground text-xs">
              vectors in {ragStats?.collections?.length ?? "..."} collection
              {ragStats && ragStats.collections.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column — 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Conversations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Recent Conversations
              </CardTitle>
              <Link
                href={ROUTES.CHAT}
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {conversationsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
                </div>
              ) : recentConversations.length === 0 ? (
                <div className="py-8 text-center">
                  <MessageSquare className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                  <p className="text-muted-foreground text-sm">
                    No conversations yet
                  </p>
                  <Link
                    href={ROUTES.CHAT}
                    className="text-brand hover:text-brand-hover mt-2 inline-flex items-center gap-1 text-sm font-medium"
                  >
                    Start your first chat
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentConversations.map((conv) => (
                    <Link
                      key={conv.id}
                      href={ROUTES.CHAT}
                      className="hover:bg-muted/50 flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <MessageSquare className="text-muted-foreground h-4 w-4 shrink-0" />
                        <span className="truncate text-sm font-medium">
                          {conv.title || "Untitled conversation"}
                        </span>
                      </div>
                      <span className="text-muted-foreground ml-2 shrink-0 text-xs">
                        {timeAgo(conv.updated_at)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* RAG Collections */}
          {ragStats && ragStats.collections.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  Collections
                </CardTitle>
                <Link
                  href={ROUTES.RAG}
                  className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                >
                  Manage
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ragStats.collections.map((col) => (
                    <div
                      key={col.name}
                      className="flex items-center justify-between rounded-lg border px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Database className="text-muted-foreground h-4 w-4" />
                        <div>
                          <p className="text-sm font-medium">{col.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {col.total_vectors.toLocaleString()} vectors
                            {col.dim > 0 && ` · ${col.dim}d`}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          col.indexing_status === "ready"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {col.indexing_status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-6">
          {/* Getting Started */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  Getting Started
                </CardTitle>
                <span className="text-muted-foreground text-xs">
                  {completedSteps}/{gettingStarted.length}
                </span>
              </div>
              {/* Progress bar */}
              <div className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="bg-brand h-full rounded-full transition-all"
                  style={{
                    width: `${(completedSteps / gettingStarted.length) * 100}%`,
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gettingStarted.map((step) => {
                  const content = (
                    <div
                      className="flex items-start gap-3"
                    >
                      {step.done ? (
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      ) : (
                        <Circle className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${step.done ? "text-muted-foreground line-through" : ""}`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );

                  if (step.href && !step.done) {
                    return (
                      <Link
                        key={step.label}
                        href={step.href}
                        className="hover:bg-muted/50 -mx-2 block rounded-lg px-2 py-1 transition-colors"
                      >
                        {content}
                      </Link>
                    );
                  }

                  return <div key={step.label}>{content}</div>;
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Link
                href={ROUTES.CHAT}
                className="hover:bg-muted/50 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
              >
                <MessageSquare className="text-brand h-4 w-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Start a Chat</p>
                </div>
                <ArrowRight className="text-muted-foreground h-3.5 w-3.5" />
              </Link>
              <Link
                href={ROUTES.RAG}
                className="hover:bg-muted/50 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
              >
                <Database className="text-brand h-4 w-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Knowledge Base</p>
                </div>
                <ArrowRight className="text-muted-foreground h-3.5 w-3.5" />
              </Link>
              <Link
                href={ROUTES.PROFILE}
                className="hover:bg-muted/50 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
              >
                <Settings className="text-brand h-4 w-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Profile & Settings</p>
                </div>
                <ArrowRight className="text-muted-foreground h-3.5 w-3.5" />
              </Link>
              <a
                href={`${BACKEND_URL}/docs`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-muted/50 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
              >
                <BookOpen className="text-brand h-4 w-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium">API Documentation</p>
                </div>
                <ExternalLink className="text-muted-foreground h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>

          {/* Environment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Environment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium">
                    {healthLoading ? (
                      "..."
                    ) : healthError ? (
                      <span className="text-destructive">Offline</span>
                    ) : (
                      <span className="text-green-500">Online</span>
                    )}
                  </span>
                </div>
                {health?.version && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-mono text-xs">{health.version}</span>
                  </div>
                )}
                {health?.database && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Database</span>
                    <span className="font-medium">{health.database}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Framework</span>
                  <span className="font-medium">PydanticAI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LLM</span>
                  <span className="font-medium">OpenRouter</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vector Store</span>
                  <span className="font-medium">Milvus</span>
                </div>
                <div className="border-t pt-2.5">
                  <a
                    href={`${BACKEND_URL}/docs`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand-hover inline-flex items-center gap-1 text-xs font-medium"
                  >
                    Open API Docs
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
