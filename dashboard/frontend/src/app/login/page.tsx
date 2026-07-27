"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Bot, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { useAuthStore, type User } from "@/stores/auth-store";

interface TokenResponse {
  access_token: string;
  user: User;
}

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiClient.post<TokenResponse>("/auth/login", {
        email_or_username: usernameOrEmail,
        password,
      });

      setAuth(res.user, res.access_token);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-background">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] auth-panel-gradient flex-col justify-between p-10 relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* Glow accent */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand/10 blur-[80px]" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm">Agent Dashboard</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground leading-snug">
            Build production AI agents<br />
            <span className="gradient-text">in minutes, not weeks.</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Configure FastAPI + Next.js agent projects with 5 frameworks, 4 vector stores, and 20+ enterprise integrations.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["PydanticAI", "LangGraph", "RAG Pipeline", "MCP Client", "Stripe Billing"].map((f) => (
              <span
                key={f}
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-foreground/5 border border-foreground/10 text-muted-foreground"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[11px] text-muted-foreground/60">
            Open-source agent template generator
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center relative dot-grid">
        {/* Soft glow behind form */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand/8 blur-[80px] pointer-events-none" />

        <div className="w-full max-w-md px-6 relative z-10 page-enter">
          <Card className="glass-card border-foreground/8 shadow-2xl">
            <CardHeader className="space-y-1 text-center pb-4">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand mb-3">
                <Sparkles className="h-5.5 w-5.5" />
              </div>
              <CardTitle className="text-xl font-display">Welcome back</CardTitle>
              <CardDescription className="text-[13px]">Sign in to manage your agent projects</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive font-medium">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Username or Email</label>
                  <div className="input-glow rounded-md">
                    <Input
                      type="text"
                      placeholder="admin or admin@example.com"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      className="bg-background/40 border-foreground/10 h-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Password</label>
                  <div className="input-glow rounded-md">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background/40 border-foreground/10 h-10"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-2">
                <Button type="submit" variant="brand" className="w-full h-10" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="font-semibold text-foreground hover:text-brand transition-colors">
                    Register here
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
