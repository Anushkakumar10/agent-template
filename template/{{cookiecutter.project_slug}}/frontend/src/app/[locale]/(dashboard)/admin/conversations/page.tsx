"use client";

{%- if cookiecutter.use_jwt %}
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/stores";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui";
import Link from "next/link";
import { ExternalLink, Search } from "lucide-react";

interface ConversationAdminItem {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
  message_count: number;
}

interface ConversationAdminListResponse {
  items: ConversationAdminItem[];
  total: number;
}

const PAGE_SIZE = 50;

export default function AdminConversationsPage() {
  const { user } = useAuthStore();
  const [conversations, setConversations] = useState<ConversationAdminItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        skip: String(page * PAGE_SIZE),
        limit: String(PAGE_SIZE),
        include_archived: String(showArchived),
      });
      if (debouncedSearch) params.set("search", debouncedSearch);

      const response = await fetch(`/api/v1/admin/conversations?${params.toString()}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch conversations");

      const data: ConversationAdminListResponse = await response.json();
      setConversations(data.items);
      setTotal(data.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch conversations";
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, showArchived, debouncedSearch]);

  useEffect(() => {
    if (user?.role !== "admin") return;
    fetchConversations();
  }, [user, fetchConversations]);

  if (user?.role !== "admin") {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-muted-foreground">Access denied</div>
      </div>
    );
  }

  if (loading && conversations.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">All Conversations</h1>
        <div className="bg-card rounded-lg border">
          <div className="p-4 border-b">
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && conversations.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">All Conversations</h1>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or ID..."
            className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => {
              setShowArchived(e.target.checked);
              setPage(0);
            }}
            className="rounded"
          />
          Show archived
        </label>
      </div>

      {/* Stats */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total} conversations
      </div>

      {/* Conversations List */}
      <div className="bg-card rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Messages</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conv) => (
              <tr key={conv.id} className="border-b hover:bg-muted/50">
                <td className="p-4 text-sm">
                  {formatDate(conv.created_at)}
                </td>
                <td className="p-4">
                  <div className="font-medium">{conv.title || "Untitled"}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {conv.id.slice(0, 8)}...
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {conv.message_count}
                </td>
                <td className="p-4">
                  {conv.is_archived ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      Archived
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                      Active
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <Link
                    href={`/chat?id=${conv.id}`}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
            {conversations.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No conversations found
                </td>
              </tr>
            )}
            {loading && conversations.length > 0 && (
              <tr>
                <td colSpan={5} className="p-4">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 p-4">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-3 py-1 rounded hover:bg-muted disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 rounded hover:bg-muted disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
{%- else %}
// Admin conversations page placeholder - JWT not enabled
export default function AdminConversationsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center text-muted-foreground">
        Authentication not enabled
      </div>
    </div>
  );
}
{%- endif %}
