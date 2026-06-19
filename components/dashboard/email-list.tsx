"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Email {
  id: string;
  from: string;
  subject: string;
  date: string;
  snippet: string;
}

export function EmailList() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [pageToken, setPageToken] =
    useState<string>();

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [prefetchedEmails, setPrefetchedEmails] =
    useState<Email[]>([]);

  const [prefetchedPageToken, setPrefetchedPageToken] =
    useState<string>();

  useEffect(() => {
    async function loadInitialEmails() {
      const res = await fetch("/api/email");

      const data = await res.json();

      setEmails(data.emails);
      setPageToken(data.nextPageToken);

      setLoading(false);

      prefetchNextPage(
        data.nextPageToken
      );
    }

    loadInitialEmails();
  }, []);

  async function prefetchNextPage(
    token?: string
  ) {
    if (!token) return;

    const res = await fetch(
      `/api/email?pageToken=${token}`
    );

    const data = await res.json();

    setPrefetchedEmails(
      data.emails
    );

    setPrefetchedPageToken(
      data.nextPageToken
    );
  }

  async function loadMore() {
    if (loadingMore) return;

    if (!prefetchedEmails.length)
      return;

    setLoadingMore(true);

    setEmails((prev) => {
      const merged = [
        ...prev,
        ...prefetchedEmails,
      ];

      return merged.filter(
        (email, index, self) =>
          index ===
          self.findIndex(
            (e) =>
              e.id === email.id
          )
      );
    });

    setPageToken(
      prefetchedPageToken
    );

    setLoadingMore(false);

    await prefetchNextPage(
      prefetchedPageToken
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Loader2 className="h-8 w-8 animate-spin" />

        <p className="text-slate-400">
          Syncing your inbox...
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        px-6
        mt-4
        h-[380px]
        overflow-y-auto
      "
    >
      <p className="mb-4 text-lg font-medium">
        Total Emails: {emails.length}
      </p>

      {emails.map((email) => {
        const sender =
          email.from
            ?.split("<")[0]
            ?.replace(/"/g, "")
            ?.trim() ||
          "Unknown";

        const avatar =
          sender
            .charAt(0)
            .toUpperCase();

        const colors = [
          "bg-blue-600",
          "bg-purple-600",
          "bg-green-600",
          "bg-pink-600",
          "bg-orange-600",
        ];

        const color =
          colors[
            sender.length %
              colors.length
          ];

        return (
          <div
            key={email.id}
            className="
              mb-3
              rounded-xl
              border
              border-slate-700
              p-4
              hover:bg-slate-800/30
              transition
              cursor-pointer
            "
          >
            <div className="flex gap-4">

              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  font-bold
                  text-white
                  ${color}
                `}
              >
                {avatar}
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">
                  <h3
                    className="
                      font-semibold
                      text-white
                    "
                  >
                    {sender}
                  </h3>

                  <span
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    {email.date
                      ? new Date(
                          email.date
                        ).toLocaleDateString()
                      : ""}
                  </span>
                </div>

                <p
                  className="
                    mt-1
                    font-medium
                    text-slate-200
                  "
                >
                  {email.subject}
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-400
                    line-clamp-2
                  "
                >
                  {email.snippet}
                </p>

              </div>

            </div>
          </div>
        );
      })}

      {prefetchedEmails.length >
        0 && (
        <div className="flex justify-center py-4">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-slate-700
              bg-slate-900
              px-5
              py-2
              hover:bg-slate-800
              disabled:opacity-50
            "
          >
            {loadingMore && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {loadingMore
              ? "Loading emails..."
              : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}