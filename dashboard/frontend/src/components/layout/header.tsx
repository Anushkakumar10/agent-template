"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, LayoutDashboard, Plus, LogOut, User as UserIcon, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Hide header on auth pages and unauthenticated landing page (they have their own navigation bar)
  const isAuthPage = pathname === "/login" || pathname === "/register";
  if (isAuthPage || (!isAuthenticated && pathname === "/")) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>Agent Dashboard</span>
          </Link>

          {isAuthenticated && (
            <nav className="hidden sm:flex items-center gap-1">
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </Link>
              <Link
                href="/agents"
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname.startsWith("/agents") && pathname !== "/agents/new"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <Bot className="h-4 w-4" />
                Agent Registry
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button asChild size="sm" variant="brand">
                <Link href="/agents/new">
                  <Plus className="h-4 w-4" />
                  New Agent
                </Link>
              </Button>

              <div className="flex items-center gap-2 pl-2 border-l border-border text-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold text-xs">
                  {user?.username?.substring(0, 2).toUpperCase() || "U"}
                </span>
                <span className="hidden md:inline font-medium text-foreground text-xs">{user?.username}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={handleLogout} title="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" variant="brand">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
