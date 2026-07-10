"use client";

import {
  type InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Loader2, Star, Paperclip } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center gap-3 py-24 font-[Roboto,Arial,sans-serif]">
        <Loader2 className="h-7 w-7 animate-spin text-[#4285f4]" />
        <p className="text-sm text-[#5f6368]">Syncing your inbox...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-10 text-sm text-[#d93025] font-[Roboto,Arial,sans-serif]">
        {error.message}
      </div>
    );
  }

  return (
    <div className="font-[Roboto,Arial,sans-serif] bg-white text-[#202124]">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[#e8eaed] px-4 py-2">
        <p className="text-xs text-[#5f6368]">
          <span className="font-medium text-[#202124]">{emails.length}</span>{" "}
          emails
        </p>
      </div>

      {/* Email rows */}
      <div className="h-[380px] overflow-y-auto">
        {emails.map((email) => {
          const sender =
            email.from?.split("<")[0]?.replace(/"/g, "").trim() || "Unknown";
          const avatar = sender.charAt(0).toUpperCase();
          const colors = [
            "#1a73e8",
            "#9334e6",
            "#188038",
            "#e8388a",
            "#e8710a",
            "#12b5cb",
            "#d93025",
          ];
          const color = colors[sender.length % colors.length];

          return (
            <div
              key={email.id}
              className="group flex cursor-pointer items-center gap-3 border-b border-[#f1f3f4] px-4 py-2.5 transition-colors hover:bg-[#f2f6fc] hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.15)]"
            >
              {/* Checkbox (Gmail-style, revealed on hover) */}
              <input
                type="checkbox"
                onClick={(e) => e.stopPropagation()}
                className="h-4 w-4 shrink-0 cursor-pointer accent-[#1a73e8]"
              />

              {/* Star */}
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 text-[#c4c7c5] hover:text-[#f2b400]"
                aria-label="Star email"
              >
                <Star className="h-[18px] w-[18px]" />
              </button>

              {/* Avatar */}
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: color }}
              >
                {avatar}
              </div>

              {/* Sender */}
              <div className="w-[180px] shrink-0 truncate text-sm text-[#202124]">
                {sender}
              </div>

              {/* Subject + snippet */}
              <div className="min-w-0 flex-1 truncate text-sm">
                <span className="text-[#202124]">{email.subject}</span>
                <span className="text-[#5f6368]"> — {email.snippet}</span>
              </div>

              {/* Attachment icon placeholder (visual only) */}
              <Paperclip className="hidden h-4 w-4 shrink-0 text-[#5f6368] group-hover:block" />

              {/* Date */}
              <div className="w-16 shrink-0 text-right text-xs text-[#5f6368]">
                {email.date
                  ? new Date(email.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </div>
            </div>
          );
        })}

        {hasNextPage && (
          <div className="flex justify-center py-4">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-5 py-2 text-sm font-medium text-[#1a73e8] transition hover:bg-[#f2f6fc] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isFetchingNextPage && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}