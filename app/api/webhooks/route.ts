import { processWebhook } from "corsair";

import { corsair } from "@/lib/corsair";
import {
  decodeGmailPubSubPayload,
  resolveTenantIdForGmailWebhook,
  updateGmailWebhookHistoryId, // 👈 naya import
} from "@/lib/services/gmail/webhook";

export const runtime = "nodejs";

type WebhookBody = Record<string, unknown> | string;

async function readWebhookBody(request: Request): Promise<WebhookBody> {
  const text = await request.text();

  if (!text.trim()) {
    return {};
  }

  try {
    const parsed = JSON.parse(text) as unknown;

    return typeof parsed === "object" && parsed !== null
      ? (parsed as Record<string, unknown>)
      : text;
  } catch {
    return text;
  }
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

// 👇 CHANGE: ab ye gmailPayload bhi return karega (tenantId ke saath), taaki
// route mein dobara decode na karna pade aur success ke baad historyId update ho sake
async function resolveTenantIdAndPayload(request: Request, body: WebhookBody) {
  const tenantIdFromUrl = getTenantIdFromUrl(request.url);
  const gmailPayload = decodeGmailPubSubPayload(body);

  if (tenantIdFromUrl) {
    return { tenantId: tenantIdFromUrl, gmailPayload };
  }

  if (!gmailPayload) {
    return { tenantId: null, gmailPayload: null };
  }

  console.log("Resolving tenant for:", gmailPayload.emailAddress);

  const tenant = await resolveTenantIdForGmailWebhook(gmailPayload.emailAddress);
  console.log("Resolved tenant:", tenant);

  return { tenantId: tenant, gmailPayload };
}

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  return Response.json(body, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });
}

export async function POST(request: Request) {
  console.log("webhook start ho raha hai !!!");
  const body = await readWebhookBody(request);

  console.log({
    messageId: (body as any)?.message?.messageId,
    publishTime: (body as any)?.message?.publishTime,
  });

  const { tenantId, gmailPayload } = await resolveTenantIdAndPayload(request, body);

  if (!tenantId) {
    console.warn("[webhooks],  tenant resolve fuck!");

    return jsonResponse(
      {
        success: false,
        error: "Could not resolve webhook tenant",
      },
      { status: 202 },
    );
  }

  try {
    const result = await processWebhook(
      corsair,
      Object.fromEntries(request.headers),
      body,
      { tenantId },
    );   

    const dbMessages = await corsair
  .withTenant(tenantId)
  .gmail.db.messages.list({ limit: 5 });

//console.log(dbMessages);

    console.log(" ye process ho raha hai : ", {
      tenantId,
      plugin: result.plugin,
      action: result.action,
    });

    console.dir(result, { depth: null });

    if (!result.plugin) {
      return jsonResponse(
        {
          success: false,
          error: "No matching webhook handler found",
        },
        { status: 202 },
      );
    }

    // 👇 CRITICAL FIX: processWebhook success hone ke baad naya historyId
    // DB mein persist karo, taaki agla webhook stale/expired historyId se
    // history.list() na chalaye. Ye pehle kabhi update hi nahi ho raha tha.
    if (gmailPayload?.historyId) {
      try {
        await updateGmailWebhookHistoryId(tenantId, gmailPayload.historyId);
        console.log("historyId updated:", {
          tenantId,
          historyId: gmailPayload.historyId,
        });
      } catch (err) {
        console.error("[webhooks] Failed to persist historyId", err);
      }
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
      { status: 500 },
    );
  }
}