import { and, eq } from "drizzle-orm";

import db from "@/db";
import { corsairAccounts, corsairEntities } from "@/db/schema";

export interface EmailThread {
  id: string;
  from: string;
  subject: string;
  date: string;
  snippet: string;
}

export interface EmailThreadsResponse {
  emails: EmailThread[];
  nextPageToken?: string;
}

const PAGE_SIZE = 5;

export async function getThreads(
  userId: string,
  pageToken?: string,
): Promise<EmailThreadsResponse> {
  const offset = Number.parseInt(pageToken ?? "0", 10);

  const safeOffset = Number.isFinite(offset) && offset > 0 ? offset : 0;

  console.time("raw-db");

  const rows = await db
    .select({
      entityId: corsairEntities.entityId,
      data: corsairEntities.data,
    })
    .from(corsairEntities)
    .innerJoin(
      corsairAccounts,
      eq(corsairEntities.accountId, corsairAccounts.id),
    )
    .where(
      and(
        eq(corsairEntities.entityType, "messages"),
        eq(corsairAccounts.tenantId, `user_${userId}`),
      ),
    );

  console.timeEnd("raw-db");

  const allEmails = Array.from(
    new Map(
      rows.map((row) => {
        const data = row.data as {
          id?: string;
          from?: string;
          subject?: string;
          snippet?: string;
          createdAt?: string;
          internalDate?: string;
          labelIds?: string[];
        };

        return [
          data.id ?? row.entityId,
          {
            id: data.id ?? row.entityId,
            from: data.from ?? "Unknown",
            subject: data.subject ?? "(No Subject)",
            date: data.internalDate
              ? new Date(Number(data.internalDate)).toISOString()
              : "",
            snippet: data.snippet ?? "",
            labels: data.labelIds ?? [],
            internalDate: Number(data.internalDate ?? 0),
          },
        ];
      }),
    ).values(),
  )
    .filter(
      (email) =>
        email.labels.includes("INBOX") &&
        !email.labels.includes("CATEGORY_PROMOTIONS"),
    )
    .sort((a, b) => b.internalDate - a.internalDate);

  const emails: EmailThread[] = allEmails
    .slice(safeOffset, safeOffset + PAGE_SIZE)
    .map((email) => ({
      id: email.id,
      from: email.from,
      subject: email.subject,
      date: email.date,
      snippet: email.snippet,
    }));

  return {
    emails,
    nextPageToken:
      allEmails.length > safeOffset + PAGE_SIZE
        ? String(safeOffset + PAGE_SIZE)
        : undefined,
  };
}
