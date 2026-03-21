"use client";

import Link from "next/link";
import { useAuth } from "@/hooks";
import { buttonVariants } from "@/components/ui";
import { ThemeToggle } from "@/components/theme";
import { LanguageSwitcherCompact } from "@/components/language-switcher";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LogOut, User } from "lucide-react";

interface LandingNavProps {
  signInLabel: string;
  getStartedLabel: string;
  dashboardLabel: string;
}

export function LandingNav({ signInLabel, getStartedLabel, dashboardLabel }: LandingNavProps) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-background/80 sticky top-0 z-50 border-b border-border/50 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={ROUTES.HOME} className="text-lg font-bold tracking-tight">
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcherCompact />
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <Link
                href={ROUTES.DASHBOARD}
                className={cn(buttonVariants({ size: "sm" }), "bg-brand text-brand-foreground hover:bg-brand-hover")}
              >
                {dashboardLabel}
              </Link>
              <span className="text-muted-foreground hidden items-center gap-1 text-sm sm:flex">
                <User className="h-3.5 w-3.5" />
                {user?.email?.split("@")[0]}
              </span>
              <button
                onClick={logout}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-8 w-8 p-0")}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href={ROUTES.LOGIN}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                {signInLabel}
              </Link>
              <Link
                href={ROUTES.REGISTER}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "bg-brand text-brand-foreground hover:bg-brand-hover hidden sm:inline-flex"
                )}
              >
                {getStartedLabel}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
