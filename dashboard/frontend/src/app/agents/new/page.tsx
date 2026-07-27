"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Bot, ArrowLeft, ArrowRight, Check, Sparkles, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

interface Preset {
  id: string;
  name: string;
  description: string;
  config: Record<string, any>;
}

/* ── Wizard step config ──────────────────────────────────────────── */
const STEPS = [
  { num: 1, label: "Basic Info" },
  { num: 2, label: "AI Framework" },
  { num: 3, label: "Features" },
  { num: 4, label: "Review & Generate" },
];

export default function NewAgentWizardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState("my_ai_agent");
  const [description, setDescription] = useState("My custom FastAPI + Next.js AI Agent");
  const [aiFramework, setAiFramework] = useState("pydantic_ai");
  const [llmProvider, setLlmProvider] = useState("google");
  const [database, setDatabase] = useState("postgresql");
  const [ormType, setOrmType] = useState("sqlalchemy");
  const [frontend, setFrontend] = useState("nextjs");
  const [brandColor, setBrandColor] = useState("blue");
  const [backgroundTasks, setBackgroundTasks] = useState("none");
  const [enableWebSearch, setEnableWebSearch] = useState(true);
  const [enableWebFetch, setEnableWebFetch] = useState(true);
  const [enableCodeExecution, setEnableCodeExecution] = useState(true);
  const [enableMcpClient, setEnableMcpClient] = useState(true);
  const [enableTeams, setEnableTeams] = useState(false);
  const [enableBilling, setEnableBilling] = useState(false);

  const [saving, setSaving] = useState(false);

  // Presets Query
  const { data: presets = [] } = useQuery<Preset[]>({
    queryKey: ["presets"],
    queryFn: () => apiClient.get<Preset[]>("/templates/presets"),
    enabled: isAuthenticated,
  });

  const applyPreset = (preset: Preset) => {
    if (preset.config.ai_framework) setAiFramework(preset.config.ai_framework);
    if (preset.config.llm_provider) setLlmProvider(preset.config.llm_provider);
    if (preset.config.database) setDatabase(preset.config.database);
    if (preset.config.frontend) setFrontend(preset.config.frontend);
    if (preset.config.enable_teams !== undefined) setEnableTeams(preset.config.enable_teams);
    if (preset.config.enable_billing !== undefined) setEnableBilling(preset.config.enable_billing);
  };

  const handleCreate = async () => {
    setSaving(true);
    try {
      const config = {
        project_name: name.toLowerCase().replace(/\s+/g, "_"),
        project_description: description,
        ai_framework: aiFramework,
        llm_provider: llmProvider,
        database,
        orm_type: ormType,
        frontend,
        brand_color: brandColor,
        background_tasks: backgroundTasks,
        enable_web_search: enableWebSearch,
        enable_web_fetch: enableWebFetch,
        enable_code_execution: enableCodeExecution,
        enable_mcp_client: enableMcpClient,
        enable_teams: enableTeams,
        enable_billing: enableBilling,
      };

      const res = await apiClient.post<any>("/agents", {
        name,
        description,
        config,
      });

      router.push(`/agents/${res.id}`);
    } catch (err: any) {
      alert(`Creation failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto page-enter">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-4 text-xs">
          <Link href="/agents">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Agents
          </Link>
        </Button>
        <PageHeader
          title="Create Agent Project"
          description="Configure your full-stack AI agent with interactive choices and live validation."
        />
      </div>

      {/* Preset Selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-brand" /> Quick-Start Presets
          </CardTitle>
          <CardDescription>Select a preset to pre-fill configuration options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p)}
                className="p-4 rounded-xl border border-border/60 hover:border-brand/50 hover:bg-brand/5 text-left transition-all space-y-1 group card-lift"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xs group-hover:text-brand transition-colors">{p.name}</p>
                  <Sparkles className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2">{p.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Connected Step Progress Bar ──────────────────────────────── */}
      <div className="flex items-center px-2">
        {STEPS.map((s, idx) => {
          const isActive = step === s.num;
          const isCompleted = step > s.num;
          const isLast = idx === STEPS.length - 1;

          return (
            <div key={s.num} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
              {/* Step circle + label */}
              <button
                type="button"
                onClick={() => setStep(s.num)}
                className="flex items-center gap-2 group shrink-0"
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-brand text-brand-foreground shadow-md shadow-brand/25 scale-110"
                      : isCompleted
                      ? "bg-brand/80 text-brand-foreground"
                      : "bg-secondary text-secondary-foreground group-hover:bg-secondary/80"
                  }`}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : s.num}
                </span>
                <span
                  className={`text-xs font-medium transition-colors hidden sm:inline ${
                    isActive
                      ? "text-brand"
                      : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </button>

              {/* Connector line */}
              {!isLast && (
                <div className="flex-1 mx-3 h-[2px] rounded-full overflow-hidden bg-border/40">
                  <div
                    className="h-full bg-brand transition-all duration-500 ease-out rounded-full"
                    style={{ width: isCompleted ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Form Wizard Steps */}
      <Card className="p-6 space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Step 1: Basic Information</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Project Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my_ai_agent"
              />
              <p className="text-[11px] text-muted-foreground">Used as directory slug and module identifier.</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your agent application"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Frontend Framework</label>
                <select
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs"
                  value={frontend}
                  onChange={(e) => setFrontend(e.target.value)}
                >
                  <option value="nextjs" className="bg-background">Next.js 15 (App Router)</option>
                  <option value="none" className="bg-background">None (API Only)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Brand Color</label>
                <select
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs capitalize"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                >
                  <option value="blue" className="bg-background">Blue (Default)</option>
                  <option value="green" className="bg-background">Green</option>
                  <option value="violet" className="bg-background">Violet</option>
                  <option value="orange" className="bg-background">Orange</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-base">Step 2: AI Framework & LLM Provider</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Select your preferred AI agent framework, LLM provider, and built-in capabilities.
              </p>
            </div>

            {/* AI Agent Framework Selection */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Select AI Agent Framework
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    id: "pydantic_ai",
                    name: "PydanticAI",
                    logo: "/logos/pydantic.svg",
                    badge: "Recommended",
                    badgeVariant: "default",
                    description: "Type-safe, production-ready framework built on Pydantic & Logfire.",
                  },
                  {
                    id: "langchain",
                    name: "LangChain",
                    logo: "/logos/langchain.svg",
                    badge: "Ecosystem",
                    badgeVariant: "secondary",
                    description: "Feature-packed ecosystem with hundreds of tools & integrations.",
                  },
                  {
                    id: "langgraph",
                    name: "LangGraph",
                    logo: "/logos/langgraph.svg",
                    badge: "Stateful Graphs",
                    badgeVariant: "secondary",
                    description: "Cyclical graph orchestration for complex multi-actor flows.",
                  },
                  {
                    id: "deepagents",
                    name: "DeepAgents",
                    logo: "/logos/deepagents.svg",
                    badge: "Multi-Agent",
                    badgeVariant: "secondary",
                    description: "Hierarchical multi-agent framework for team collaboration.",
                  },
                  {
                    id: "none",
                    name: "Plain SaaS (None)",
                    logo: "/logos/python.svg",
                    badge: "Lightweight",
                    badgeVariant: "outline",
                    description: "Standard FastAPI backend without pre-built agent orchestrators.",
                  },
                ].map((fw) => {
                  const selected = aiFramework === fw.id;
                  return (
                    <button
                      key={fw.id}
                      type="button"
                      onClick={() => setAiFramework(fw.id)}
                      className={`relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all group ${
                        selected
                          ? "border-brand bg-brand/10 ring-1 ring-brand shadow-sm"
                          : "border-border/60 hover:border-brand/50 hover:bg-secondary/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background p-1.5 border border-border shadow-xs">
                              <img src={fw.logo} alt={fw.name} className="h-full w-full object-contain" />
                            </div>
                            <span className="font-semibold text-xs text-foreground group-hover:text-brand transition-colors">
                              {fw.name}
                            </span>
                          </div>
                          {selected ? (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-brand-foreground">
                              <Check className="h-3 w-3" />
                            </span>
                          ) : (
                            <Badge variant={fw.badgeVariant as any} className="text-[10px] px-1.5 py-0">
                              {fw.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                          {fw.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LLM Provider Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Select LLM Provider
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    id: "google",
                    name: "Google Gemini",
                    logo: "/logos/gemini.svg",
                    badge: "Fast & Vision",
                    description: "Gemini 1.5 Pro & Flash with long context support.",
                  },
                  {
                    id: "openai",
                    name: "OpenAI (ChatGPT)",
                    logo: "/logos/openai.svg",
                    badge: "Popular",
                    description: "GPT-4o and o1 models with structured output.",
                  },
                  {
                    id: "anthropic",
                    name: "Anthropic Claude",
                    logo: "/logos/anthropic.svg",
                    badge: "Reasoning",
                    description: "Claude 3.5 Sonnet & Haiku for deep reasoning.",
                  },
                  {
                    id: "all",
                    name: "All Providers",
                    logo: "/logos/mcp.svg",
                    badge: "Dynamic",
                    description: "Runtime switching across Gemini, OpenAI & Claude.",
                  },
                ].map((prov) => {
                  const selected = llmProvider === prov.id;
                  return (
                    <button
                      key={prov.id}
                      type="button"
                      onClick={() => setLlmProvider(prov.id)}
                      className={`relative flex flex-col justify-between p-3.5 rounded-xl border text-left transition-all group ${
                        selected
                          ? "border-brand bg-brand/10 ring-1 ring-brand shadow-sm"
                          : "border-border/60 hover:border-brand/50 hover:bg-secondary/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-background p-1 border border-border shadow-xs">
                              <img src={prov.logo} alt={prov.name} className="h-full w-full object-contain" />
                            </div>
                            <span className="font-semibold text-xs text-foreground group-hover:text-brand transition-colors">
                              {prov.name}
                            </span>
                          </div>
                          {selected && (
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-brand-foreground">
                              <Check className="h-2.5 w-2.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          {prov.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Agent Capabilities & Tools */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Agent Capabilities & Integrations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: "webSearch",
                    checked: enableWebSearch,
                    setter: setEnableWebSearch,
                    title: "Web Search (Tavily)",
                    logo: "/logos/tavily.svg",
                    description: "Real-time AI web search engine with domain filtering & page parsing.",
                  },
                  {
                    key: "webFetch",
                    checked: enableWebFetch,
                    setter: setEnableWebFetch,
                    title: "Web Fetch & Scraping",
                    logo: "/logos/nextjs.svg",
                    description: "Fetch web pages and extract clean markdown content for context.",
                  },
                  {
                    key: "codeExec",
                    checked: enableCodeExecution,
                    setter: setEnableCodeExecution,
                    title: "Code Execution (Monty)",
                    logo: "/logos/monty.svg",
                    description: "Execute untrusted Python code inside a secure isolated sandbox.",
                  },
                  {
                    key: "mcpClient",
                    checked: enableMcpClient,
                    setter: setEnableMcpClient,
                    title: "MCP Client Integrations",
                    logo: "/logos/mcp.svg",
                    description: "Connect agent to external Model Context Protocol servers & tools.",
                  },
                ].map((tool) => (
                  <button
                    key={tool.key}
                    type="button"
                    onClick={() => tool.setter(!tool.checked)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                      tool.checked
                        ? "border-brand/70 bg-brand/5 ring-1 ring-brand/50"
                        : "border-border/60 hover:bg-secondary/40"
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background p-1.5 border border-border shadow-xs mt-0.5">
                      <img src={tool.logo} alt={tool.title} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-foreground">{tool.title}</span>
                        <input
                          type="checkbox"
                          checked={tool.checked}
                          onChange={() => {}} // handled by parent button click
                          className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{tool.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-base">Step 3: Database & SaaS Features</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Configure persistent storage, database ORM, and enterprise SaaS functionality.
              </p>
            </div>

            {/* Database & ORM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border/60 space-y-3 bg-secondary/20">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background p-1.5 border border-border shadow-xs">
                    <img src="/logos/postgresql.svg" alt="PostgreSQL" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-foreground">Database Engine</p>
                    <p className="text-[11px] text-muted-foreground">PostgreSQL with Asyncpg driver</p>
                  </div>
                </div>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                >
                  <option value="postgresql">PostgreSQL (Asyncpg - Recommended)</option>
                </select>
              </div>

              <div className="p-4 rounded-xl border border-border/60 space-y-3 bg-secondary/20">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background p-1.5 border border-border shadow-xs">
                    <img src="/logos/python.svg" alt="Python ORM" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-foreground">ORM Framework</p>
                    <p className="text-[11px] text-muted-foreground">Async database models</p>
                  </div>
                </div>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium"
                  value={ormType}
                  onChange={(e) => setOrmType(e.target.value)}
                >
                  <option value="sqlalchemy">SQLAlchemy 2.0 (Async Session)</option>
                  <option value="sqlmodel">SQLModel (Pydantic + SQLAlchemy)</option>
                </select>
              </div>
            </div>

            {/* SaaS Feature Toggles */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Enterprise & SaaS Features
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEnableTeams(!enableTeams)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    enableTeams
                      ? "border-brand/70 bg-brand/5 ring-1 ring-brand/50"
                      : "border-border/60 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background p-1.5 border border-border shadow-xs mt-0.5">
                    <img src="/logos/nextjs.svg" alt="Teams" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-foreground">Multi-Tenant Teams</span>
                      <input
                        type="checkbox"
                        checked={enableTeams}
                        onChange={() => {}}
                        className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand cursor-pointer"
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Organization workspace switching, team roles, and member invitations.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const nextVal = !enableBilling;
                    setEnableBilling(nextVal);
                    if (nextVal) setEnableTeams(true);
                  }}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    enableBilling
                      ? "border-brand/70 bg-brand/5 ring-1 ring-brand/50"
                      : "border-border/60 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background p-1.5 border border-border shadow-xs mt-0.5">
                    <img src="/logos/stripe.svg" alt="Stripe" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-foreground">Stripe Billing</span>
                      <input
                        type="checkbox"
                        checked={enableBilling}
                        onChange={() => {}}
                        className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand cursor-pointer"
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Subscription tiers, usage metering, webhook handling, and customer portal.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-base">Step 4: Review Agent Configuration</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Verify your agent settings before initializing the project repository.
              </p>
            </div>

            <div className="rounded-xl border border-brand/20 p-5 space-y-4 bg-brand/[0.03] gradient-border-top">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Project Details</span>
                  <p className="font-semibold text-sm text-foreground">{name}</p>
                  <p className="text-muted-foreground text-xs">{description}</p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">AI Framework</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background p-1 border border-border">
                      <img
                        src={
                          aiFramework === "pydantic_ai"
                            ? "/logos/pydantic.svg"
                            : aiFramework === "langchain"
                            ? "/logos/langchain.svg"
                            : aiFramework === "langgraph"
                            ? "/logos/langgraph.svg"
                            : aiFramework === "deepagents"
                            ? "/logos/deepagents.svg"
                            : "/logos/python.svg"
                        }
                        alt={aiFramework}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-medium text-foreground capitalize">{aiFramework.replace("_", " ")}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">LLM Provider</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background p-1 border border-border">
                      <img
                        src={
                          llmProvider === "google"
                            ? "/logos/gemini.svg"
                            : llmProvider === "openai"
                            ? "/logos/openai.svg"
                            : llmProvider === "anthropic"
                            ? "/logos/anthropic.svg"
                            : "/logos/mcp.svg"
                        }
                        alt={llmProvider}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-medium text-foreground capitalize">{llmProvider}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Database & ORM</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background p-1 border border-border">
                      <img src="/logos/postgresql.svg" alt="PostgreSQL" className="h-full w-full object-contain" />
                    </div>
                    <span className="font-medium text-foreground capitalize">{database} ({ormType})</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/60 pt-3">
                <span className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold block mb-2">Enabled Tools & Features</span>
                <div className="flex flex-wrap gap-2">
                  {enableWebSearch && (
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2.5 bg-background">
                      <img src="/logos/tavily.svg" alt="Tavily" className="h-3.5 w-3.5 object-contain" />
                      <span>Web Search (Tavily)</span>
                    </Badge>
                  )}
                  {enableWebFetch && (
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2.5 bg-background">
                      <img src="/logos/nextjs.svg" alt="Fetch" className="h-3.5 w-3.5 object-contain" />
                      <span>Web Fetch</span>
                    </Badge>
                  )}
                  {enableCodeExecution && (
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2.5 bg-background">
                      <img src="/logos/monty.svg" alt="Monty" className="h-3.5 w-3.5 object-contain" />
                      <span>Monty Sandbox</span>
                    </Badge>
                  )}
                  {enableMcpClient && (
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2.5 bg-background">
                      <img src="/logos/mcp.svg" alt="MCP" className="h-3.5 w-3.5 object-contain" />
                      <span>MCP Client</span>
                    </Badge>
                  )}
                  {enableTeams && (
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2.5 bg-background">
                      <img src="/logos/nextjs.svg" alt="Teams" className="h-3.5 w-3.5 object-contain" />
                      <span>Multi-Tenant Teams</span>
                    </Badge>
                  )}
                  {enableBilling && (
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2.5 bg-background">
                      <img src="/logos/stripe.svg" alt="Stripe" className="h-3.5 w-3.5 object-contain" />
                      <span>Stripe Billing</span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
          >
            Previous
          </Button>

          {step < 4 ? (
            <Button
              type="button"
              variant="brand"
              size="sm"
              onClick={() => setStep((s) => s + 1)}
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="brand"
              size="sm"
              disabled={saving}
              onClick={handleCreate}
            >
              <Check className="h-4 w-4" />
              {saving ? "Generating & Saving..." : "Save Agent Configuration"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
