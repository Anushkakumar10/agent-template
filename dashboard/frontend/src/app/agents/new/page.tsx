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
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-4 text-xs">
          <Link href="/agents">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Agents
          </Link>
        </Button>
        <PageHeader
          eyebrow="Interactive Generator"
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
                className="p-4 rounded-xl border border-border hover:border-brand/50 hover:bg-brand/5 text-left transition-all space-y-1 group"
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

      {/* Step Indicators */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        {[
          { num: 1, label: "Basic Info" },
          { num: 2, label: "AI Framework" },
          { num: 3, label: "Features" },
          { num: 4, label: "Review & Generate" },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setStep(s.num)}
            className={`flex items-center gap-2 text-xs font-medium transition-colors ${
              step === s.num ? "text-brand" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                step === s.num
                  ? "bg-brand text-brand-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {s.num}
            </span>
            <span>{s.label}</span>
          </button>
        ))}
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
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Step 2: AI Framework & LLM Provider</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">AI Agent Framework</label>
                <select
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs"
                  value={aiFramework}
                  onChange={(e) => setAiFramework(e.target.value)}
                >
                  <option value="pydantic_ai" className="bg-background">PydanticAI (Recommended)</option>
                  <option value="langchain" className="bg-background">LangChain</option>
                  <option value="langgraph" className="bg-background">LangGraph</option>
                  <option value="deepagents" className="bg-background">DeepAgents</option>
                  <option value="none" className="bg-background">None (Plain SaaS)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">LLM Provider</label>
                <select
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs"
                  value={llmProvider}
                  onChange={(e) => setLlmProvider(e.target.value)}
                >
                  <option value="google" className="bg-background">Google Gemini</option>
                  <option value="openai" className="bg-background">OpenAI</option>
                  <option value="anthropic" className="bg-background">Anthropic</option>
                  <option value="all" className="bg-background">All Providers (Runtime Selection)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-foreground">Agent Capabilities & Tools</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 rounded-lg border border-border text-xs cursor-pointer hover:bg-secondary/50">
                  <input
                    type="checkbox"
                    checked={enableWebSearch}
                    onChange={(e) => setEnableWebSearch(e.target.checked)}
                  />
                  <span>Web Search (Tavily)</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-lg border border-border text-xs cursor-pointer hover:bg-secondary/50">
                  <input
                    type="checkbox"
                    checked={enableWebFetch}
                    onChange={(e) => setEnableWebFetch(e.target.checked)}
                  />
                  <span>Web Fetch / Scraping</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-lg border border-border text-xs cursor-pointer hover:bg-secondary/50">
                  <input
                    type="checkbox"
                    checked={enableCodeExecution}
                    onChange={(e) => setEnableCodeExecution(e.target.checked)}
                  />
                  <span>Code Execution (Monty Sandbox)</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-lg border border-border text-xs cursor-pointer hover:bg-secondary/50">
                  <input
                    type="checkbox"
                    checked={enableMcpClient}
                    onChange={(e) => setEnableMcpClient(e.target.checked)}
                  />
                  <span>MCP Client Integrations</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Step 3: Database & Integrations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Database</label>
                <select
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                >
                  <option value="postgresql" className="bg-background">PostgreSQL (Asyncpg)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">ORM</label>
                <select
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs"
                  value={ormType}
                  onChange={(e) => setOrmType(e.target.value)}
                >
                  <option value="sqlalchemy" className="bg-background">SQLAlchemy 2.0</option>
                  <option value="sqlmodel" className="bg-background">SQLModel</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-foreground">SaaS Features</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 rounded-lg border border-border text-xs cursor-pointer hover:bg-secondary/50">
                  <input
                    type="checkbox"
                    checked={enableTeams}
                    onChange={(e) => setEnableTeams(e.target.checked)}
                  />
                  <span>Multi-Tenant Teams / Organizations</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-lg border border-border text-xs cursor-pointer hover:bg-secondary/50">
                  <input
                    type="checkbox"
                    checked={enableBilling}
                    onChange={(e) => {
                      setEnableBilling(e.target.checked);
                      if (e.target.checked) setEnableTeams(true);
                    }}
                  />
                  <span>Stripe Billing & Subscriptions</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Step 4: Review Configuration</h3>
            <div className="rounded-xl border border-border p-4 space-y-3 bg-secondary/30">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-semibold">{name}</span></div>
                <div><span className="text-muted-foreground">Framework:</span> <span className="font-semibold">{aiFramework}</span></div>
                <div><span className="text-muted-foreground">LLM:</span> <span className="font-semibold">{llmProvider}</span></div>
                <div><span className="text-muted-foreground">Frontend:</span> <span className="font-semibold">{frontend}</span></div>
                <div><span className="text-muted-foreground">Database:</span> <span className="font-semibold">{database}</span></div>
                <div><span className="text-muted-foreground">Brand:</span> <span className="font-semibold capitalize">{brandColor}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
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
