"use client";

import { Check, X, Minus } from "lucide-react";

const COMPARISON_ROWS = [
  {
    feature: "Choice of 5 Production AI Frameworks",
    template: "yes",
    diy: "no",
    generic: "no",
  },
  {
    feature: "4 Vector Store Options (Qdrant, Milvus, Chroma, pgvector)",
    template: "yes",
    diy: "partial",
    generic: "no",
  },
  {
    feature: "Multi-Source Document Connectors (Google Drive, S3, CLI)",
    template: "yes",
    diy: "no",
    generic: "partial",
  },
  {
    feature: "PDF Parsing Engine Selection (PyMuPDF, LlamaParse)",
    template: "yes",
    diy: "no",
    generic: "no",
  },
  {
    feature: "FastAPI + Next.js 15 Full-Stack Integration",
    template: "yes",
    diy: "partial",
    generic: "partial",
  },
  {
    feature: "Stripe Billing, JWT Auth & Multi-Tenant Teams",
    template: "yes",
    diy: "no",
    generic: "yes",
  },
  {
    feature: "Instant Ready-to-Run Docker & UV Sync Setup",
    template: "yes",
    diy: "no",
    generic: "partial",
  },
];

function RenderCell(val: string) {
  if (val === "yes") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 mx-auto">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (val === "no") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/15 text-rose-400 mx-auto">
        <X className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-400 mx-auto">
      <Minus className="h-3.5 w-3.5" />
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section id="comparison" className="py-20 md:py-28 border-b border-border/40 bg-secondary/10 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand mb-4">
            THE BOILERPLATE DIFFERENCE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Why developers choose <span className="gradient-text italic font-normal">our generator.</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Compare our full-stack agent template generator against building from scratch or using generic SaaS starter templates.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30 text-xs font-semibold text-foreground">
                  <th className="p-4 sm:p-5">Capability / Feature</th>
                  <th className="p-4 sm:p-5 text-center bg-brand/10 text-brand border-x border-brand/20">
                    Agent Template
                  </th>
                  <th className="p-4 sm:p-5 text-center">DIY / From Scratch</th>
                  <th className="p-4 sm:p-5 text-center">Generic SaaS Starter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-foreground">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-center bg-brand/5 border-x border-brand/15">
                      {RenderCell(row.template)}
                    </td>
                    <td className="p-4 sm:p-5 text-center">{RenderCell(row.diy)}</td>
                    <td className="p-4 sm:p-5 text-center">{RenderCell(row.generic)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
