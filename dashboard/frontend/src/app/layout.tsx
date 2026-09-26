import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agent Template — Production FastAPI + Next.js AI Agent Generator",
  description: "Configure and generate production-ready full-stack AI agent projects with 5 frameworks, 4 vector databases, and 20+ enterprise integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-brand/20 selection:text-brand"
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-8 [&:has(.landing-root)]:max-w-none [&:has(.landing-root)]:p-0">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
