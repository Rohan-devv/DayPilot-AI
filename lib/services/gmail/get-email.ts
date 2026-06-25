import { and, desc, eq } from "drizzle-orm";

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
      updatedAt: corsairEntities.updatedAt,
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
    )
    .orderBy(desc(corsairEntities.updatedAt))
    .limit(PAGE_SIZE + 1)
    .offset(safeOffset);

  console.timeEnd("raw-db");

  const emails: EmailThread[] = rows.slice(0, PAGE_SIZE).map((row) => {
    const data = row.data as {
      id?: string;
      from?: string;
      subject?: string;
      snippet?: string;
      createdAt?: string;
    };

    return {
      id: data.id ?? row.entityId,

      from: data.from ?? "Unknown",

      subject: data.subject ?? "(No Subject)",

      date: data.createdAt ?? "",

      snippet: data.snippet ?? "",
    };
  });

  return {
    emails,
    nextPageToken:
      rows.length > PAGE_SIZE ? String(safeOffset + PAGE_SIZE) : undefined,
  };
}

// import { corsair } from "@/lib/corsair";

// export interface EmailThread {
//   id: string;
//   from: string;
//   subject: string;
//   date: string;
//   snippet: string;
// }

// export interface EmailThreadsResponse {
//   emails: EmailThread[];
//   nextPageToken?: string;
// }

// function getHeader(
//   headers: Array<{
//     name?: string;
//     value?: string;
//   }>,
//   key: string
// ) {
//   return (
//     headers.find(
//       (h) =>
//         h.name?.toLowerCase() ===
//         key.toLowerCase()
//     )?.value ?? ""
//   );
// }

// // export async function getThreads(
// //   userId: string,
// //   pageToken?: string
// // ): Promise<EmailThreadsResponse> {

// //   console.time("list");

// //   const list = await corsair
// //     .withTenant(`user_${userId}`)
// //     .gmail
// //     .api
// //     .messages
// //     .list({
// //       userId: "me",
// //       maxResults: 5,
// //       pageToken,
// //     });

// //     console.timeEnd("list");

// //   const emails = await Promise.all(
// //     (list.messages ?? []).map(
// //       async (message) => {

// //         console.time(message.id);

// //         const email = await corsair
// //           .withTenant(`user_${userId}`)
// //           .gmail
// //           .api
// //           .messages
// //           .get({
// //             id: message.id!,
// //           });

// //           console.timeEnd(message.id);

// //         const headers =
// //           email.payload?.headers ?? [];

// //         return {
// //           id: email.id ?? "",

// //           from: getHeader(
// //             headers,
// //             "From"
// //           ),

// //           subject: getHeader(
// //             headers,
// //             "Subject"
// //           ),

// //           date: getHeader(
// //             headers,
// //             "Date"
// //           ),

// //           snippet:
// //             email.snippet ?? "",
// //         };
// //       }
// //     )
// //   );

// //   return {
// //     emails,
// //     nextPageToken:
// //       list.nextPageToken,
// //   };
// // }

// export async function getThreads(
//   userId: string
// ) {
// console.time("list-5");

// const emails =
//   await corsair
//     .withTenant(`user_${userId}`)
//     .gmail
//     .db
//     .messages
//     .list({ limit: 5});

// console.timeEnd("list-5");

// console.log(emails.length);

//   return {
//     emails: [],
//   };
// }
