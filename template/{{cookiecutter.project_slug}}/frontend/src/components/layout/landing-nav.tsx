"use client";

import Link from "next/link";
{%- if cookiecutter.use_jwt or cookiecutter.use_api_key %}
import { useAuth } from "@/hooks";
{%- endif %}
import { buttonVariants } from "@/components/ui";
import { ThemeToggle } from "@/components/theme";
{%- if cookiecutter.enable_i18n %}
import { LanguageSwitcherCompact } from "@/components/language-switcher";
{%- endif %}
import { APP_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
{%- if cookiecutter.use_jwt or cookiecutter.use_api_key %}
import { LogOut, User } from "lucide-react";
{%- endif %}

interface LandingNavProps {
  signInLabel: string;
  getStartedLabel: string;
  dashboardLabel: string;
}

export function LandingNav({ signInLabel, getStartedLabel, dashboardLabel }: LandingNavProps) {
{%- if cookiecutter.use_jwt or cookiecutter.use_api_key %}
  const { user, isAuthenticated, logout } = useAuth();
{%- endif %}

  return (
    <nav className="bg-background/80 sticky top-0 z-50 border-b border-border/50 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={ROUTES.HOME} className="text-lg font-bold tracking-tight">
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
{%- if cookiecutter.enable_i18n %}
          <LanguageSwitcherCompact />
{%- endif %}
          <ThemeToggle />

{%- if cookiecutter.use_jwt or cookiecutter.use_api_key %}
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
{%- else %}
          <Link
            href={ROUTES.LOGIN}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            {signInLabel}
          </Link>
{%- endif %}
        </div>
      </div>
    </nav>
  );
}
