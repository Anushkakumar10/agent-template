import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Agent Template Management Dashboard",
  description: "Create, configure, deploy, and manage AI agent projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 px-4 py-6 sm:px-8 max-w-7xl w-full mx-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
