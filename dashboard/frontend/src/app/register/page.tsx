"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Bot, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { useAuthStore, type User } from "@/stores/auth-store";

interface TokenResponse {
  access_token: string;
  user: User;
}

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiClient.post<TokenResponse>("/auth/register", {
        username,
        email,
        password,
        full_name: fullName || undefined,
      });

      setAuth(res.user, res.access_token);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
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

        {/* Glow accent — shifted position for visual variety */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand/10 blur-[80px]" />

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
            Start building your<br />
            <span className="gradient-text">AI agent stack today.</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Create a local account to configure, generate, and deploy production-ready AI agent projects from your dashboard.
          </p>

          {/* Highlights */}
          <div className="space-y-3 pt-2">
            {[
              { icon: Bot, text: "5 AI frameworks — PydanticAI, LangChain, LangGraph, DeepAgents" },
              { icon: Zap, text: "One-click project generation with ZIP download" },
              { icon: Shield, text: "Full-stack: FastAPI backend + Next.js frontend" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground/5 border border-foreground/10 mt-0.5">
                  <item.icon className="h-3.5 w-3.5 text-brand" />
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
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
              <CardTitle className="text-xl font-display">Create your account</CardTitle>
              <CardDescription className="text-[13px]">Set up your local dashboard access</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-3.5">
                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive font-medium">
                    {error}
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Username</label>
                  <div className="input-glow rounded-md">
                    <Input
                      type="text"
                      placeholder="developer"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-background/40 border-foreground/10 h-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <div className="input-glow rounded-md">
                    <Input
                      type="email"
                      placeholder="dev@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/40 border-foreground/10 h-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Full Name <span className="text-muted-foreground/60">(optional)</span></label>
                  <div className="input-glow rounded-md">
                    <Input
                      type="text"
                      placeholder="Alex Dev"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-background/40 border-foreground/10 h-10"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
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
                  {loading ? "Creating Account..." : "Create Account"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-foreground hover:text-brand transition-colors">
                    Sign in
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
