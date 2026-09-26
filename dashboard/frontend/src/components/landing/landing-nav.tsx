"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Terminal, Github, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <div className="relative flex h-14 items-center justify-between rounded-full border border-white/10 bg-[#0A0C14]/85 px-4 shadow-[0_16px_36px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-5">
        {/* Brand Identity with Agent Matrix Mark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-medium tracking-tight text-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 border border-brand/30 text-brand shadow-[0_0_12px_rgba(59,130,246,0.3)]">
            <svg
              className="h-4.5 w-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Orchestrator Matrix Mark */}
              <circle cx="12" cy="5" r="2" fill="currentColor" fillOpacity="0.2" />
              <circle cx="5" cy="18" r="2" fill="currentColor" fillOpacity="0.2" />
              <circle cx="19" cy="18" r="2" fill="currentColor" fillOpacity="0.2" />
              <path d="M12 7v10M6.5 16.5l11-9M17.5 16.5l-11-9" strokeOpacity="0.5" />
              <circle cx="12" cy="12" r="6" strokeDasharray="2 2" stroke="currentColor" strokeOpacity="0.8" />
            </svg>
          </span>
          <span className="font-semibold text-sm tracking-tight text-foreground">
            Agent Template
          </span>
          <span className="hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
            v2.4
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground"
        >
          <a
            href="#architecture"
            className="transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-brand rounded"
          >
            Architecture
          </a>
          <a
            href="#frameworks"
            className="transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-brand rounded"
          >
            Frameworks
          </a>
          <a
            href="#rag"
            className="transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-brand rounded"
          >
            RAG Pipeline
          </a>
          <a
            href="#connectors"
            className="transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-brand rounded"
          >
            Connectors
          </a>
          <a
            href="#comparison"
            className="transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-brand rounded"
          >
            Comparison
          </a>
          <a
            href="#faq"
            className="transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-brand rounded"
          >
            FAQ
          </a>
        </nav>

        {/* Action CTAs (Island Button) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-foreground h-8"
          >
            <Link href="/login">Sign In</Link>
          </Button>

          <Button
            asChild
            variant="brand"
            size="sm"
            className="btn-island group h-8.5 px-3.5 py-1 text-xs font-medium shadow-md shadow-brand/25 border border-brand/40"
          >
            <Link href="/register">
              <span>Initialize Stack</span>
              <span className="btn-island-badge h-5 w-5 bg-white/20">
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 z-50 rounded-2xl border border-white/10 bg-[#0C0E18]/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-muted-foreground hover:text-foreground"
            >
              Architecture
            </a>
            <a
              href="#frameworks"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-muted-foreground hover:text-foreground"
            >
              Frameworks
            </a>
            <a
              href="#rag"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-muted-foreground hover:text-foreground"
            >
              RAG Pipeline
            </a>
            <a
              href="#connectors"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-muted-foreground hover:text-foreground"
            >
              Connectors
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-muted-foreground hover:text-foreground"
            >
              Comparison
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-muted-foreground hover:text-foreground"
            >
              FAQ
            </a>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Button asChild variant="outline" size="sm" className="w-full justify-center">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="brand" size="sm" className="w-full justify-center">
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  Initialize Stack Free
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
