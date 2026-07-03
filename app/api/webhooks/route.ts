import { processWebhook } from "corsair";
import { sql } from "drizzle-orm";

import db from "@/db";
import { usersTable } from "@/db/schema";
import { corsair } from "@/lib/corsair";

export const runtime = "nodejs";

type WebhookBody = Record<string, unknown> | string;

type GmailPubSubPayload = {
  emailAddress: string;
  historyId: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getTenantIdFromUrl(url: string) {
  const searchParams = new URL(url).searchParams;

  return (
    searchParams.get("tenantId") ??
    searchParams.get("tenant_id") ??
    searchParams.get("tenant") ??
    undefined
  );
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function decodeGmailPubSubPayload(body: WebhookBody) {
  if (!isRecord(body) || !isRecord(body.message)) {
    return null;
  }

  const data = body.message.data;

  if (typeof data !== "string") {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64").toString("utf8")
    ) as Partial<GmailPubSubPayload>;

    if (!payload.emailAddress || !payload.historyId) {
      return null;
    }

    return {
      emailAddress: normalizeEmail(payload.emailAddress),
      historyId: payload.historyId,
    } satisfies GmailPubSubPayload;
  } catch {
    return null;
  }
}

async function readWebhookBody(request: Request): Promise<WebhookBody> {
  const text = await request.text();

  if (!text.trim()) {
    return {};
  }

  try {
    const parsed = JSON.parse(text) as unknown;
    return isRecord(parsed) ? parsed : text;
  } catch {
    return text;
  }
}

async function resolveTenantId(requestUrl: string, body: WebhookBody) {
  const tenantIdFromUrl = getTenantIdFromUrl(requestUrl);

  if (tenantIdFromUrl) {
    return tenantIdFromUrl;
  }

  const gmailPayload = decodeGmailPubSubPayload(body);

  if (!gmailPayload) {
    return null;
  }

  const [user] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(sql`lower(${usersTable.email}) = ${gmailPayload.emailAddress}`)
    .limit(1);

  return user ? `user_${user.id}` : null;
}

function jsonResponse(
  body: Record<string, unknown>,
  init?: ResponseInit
) {
  return Response.json(body, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });
}

export async function POST(request: Request) {
  const body = await readWebhookBody(request);
  const tenantId = await resolveTenantId(request.url, body);

  if (!tenantId) {
    const gmailPayload = decodeGmailPubSubPayload(body);

    console.warn("[webhooks] Could not resolve tenant", {
      gmailEmailAddress: gmailPayload?.emailAddress,
    });

    return jsonResponse(
      {
        success: false,
        error: "Could not resolve webhook tenant",
      },
      { status: gmailPayload ? 202 : 400 }
    );
  }

  try {
    const result = await processWebhook(
      corsair,
      Object.fromEntries(request.headers),
      body,
      { tenantId }
    );

    console.log("[webhooks] Processed", {
      tenantId,
      plugin: result.plugin,
      action: result.action,
    });

    if (!result.plugin) {
      return jsonResponse(
        {
          success: false,
          error: "No matching webhook handler found",
        },
        { status: 202 }
      );
    }

    const response = result.response ?? { success: true };
    const status =
      result.response?.statusCode ??
      (result.response?.success === false ? 500 : 200);

    return jsonResponse(response as Record<string, unknown>, {
      status,
      headers: result.responseHeaders,
    });
  } catch (error) {
    console.error("[webhooks] Failed to process webhook", error);

    return jsonResponse(
      {
        success: false,
        error: "Webhook failed",
      },
      { status: 500 }
    );
  }
}
