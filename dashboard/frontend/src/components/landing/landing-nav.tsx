"use client";

import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-opacity hover:opacity-90">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground shadow-md shadow-brand/20">
            <Sparkles className="h-4.5 w-4.5" />
          </span>
          <span className="font-display text-base font-semibold">Agent Template</span>
        </Link>

        {/* Section Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#architecture" className="transition-colors hover:text-foreground">
            Architecture
          </a>
          <a href="#comparison" className="transition-colors hover:text-foreground">
            Comparison
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>

        {/* Auth CTAs */}
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="brand" size="sm" className="rounded-full text-xs font-medium shadow-sm">
            <Link href="/register">
              <span>Get Started</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
