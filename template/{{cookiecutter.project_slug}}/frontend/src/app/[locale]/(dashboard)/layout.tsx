import { Header, Sidebar } from "@/components/layout";
{%- if cookiecutter.use_jwt or cookiecutter.use_api_key %}
import { AuthGuard } from "@/components/layout/auth-guard";
{%- endif %}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
{%- if cookiecutter.use_jwt or cookiecutter.use_api_key %}
    <AuthGuard>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-3 sm:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
{%- else %}
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-3 sm:p-6">{children}</main>
      </div>
    </div>
{%- endif %}
  );
}
