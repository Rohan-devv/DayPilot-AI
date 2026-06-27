"use client";

import {
  type InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Email {
  id: string;
  from: string;
  subject: string;
  date: string;
  snippet: string;
}

interface EmailResponse {
  emails: Email[];
  nextPageToken?: string;
}

async function fetchEmails(pageParam?: string): Promise<EmailResponse> {
  const url = pageParam
    ? `/api/email?pageToken=${encodeURIComponent(pageParam)}`
    : "/api/email";

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch emails");
  }

  return res.json();
}

export function EmailList() {  
  
  
  const queryClient = useQueryClient();  

  useEffect(() => {
  const es = new EventSource("/api/events");

  es.onmessage = (event) => {
    console.log("📩 SSE Event:", event.data);

    queryClient.invalidateQueries({
      queryKey: ["emails", "inbox"],
    });
  };

  es.onerror = (err) => {
    console.error("SSE Error", err);
  };

  return () => {
    es.close();
  };
}, [queryClient]);  



  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    EmailResponse,
    Error,
    InfiniteData<EmailResponse, string | undefined>,
    string[],
    string | undefined
  >({
    queryKey: ["emails", "inbox"],
    queryFn: ({ pageParam }) => fetchEmails(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken, 


    staleTime: Infinity,
    refetchOnWindowFocus: false,

  });



  const emails = data?.pages.flatMap((page) => page.emails) ?? [];

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-slate-400">Syncing your inbox...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-10 text-sm text-red-400">
        {error.message}
      </div>
    );
  }

  return (
    <div className="mt-4 h-[380px] overflow-y-auto px-6">
      <p className="mb-4 text-lg font-medium">Total Emails: {emails.length}</p>

      {emails.map((email) => {
        const sender =
          email.from?.split("<")[0]?.replace(/"/g, "").trim() || "Unknown";
        const avatar = sender.charAt(0).toUpperCase();
        const colors = [
          "bg-blue-600",
          "bg-purple-600",
          "bg-green-600",
          "bg-pink-600",
          "bg-orange-600",
        ];
        const color = colors[sender.length % colors.length];

        return (
          <div
            key={email.id}
            className="mb-3 cursor-pointer rounded-xl border border-slate-700 p-4 transition hover:bg-slate-800/30"
          >
            <div className="flex gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${color}`}
              >
                {avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{sender}</h3>
                  <span className="text-xs text-slate-400">
                    {email.date ? new Date(email.date).toLocaleDateString() : ""}
                  </span>
                </div>

                <p className="mt-1 font-medium text-slate-200">
                  {email.subject}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                  {email.snippet}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {hasNextPage && (
        <div className="flex justify-center py-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetchingNextPage && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
