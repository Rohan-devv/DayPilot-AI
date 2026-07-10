import { processWebhook } from "corsair";

import { corsair } from "@/lib/corsair";
import {
  decodeGmailPubSubPayload,
  resolveTenantIdForGmailWebhook,
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

async function resolveTenantId(request: Request, body: WebhookBody) {
  const tenantIdFromUrl = getTenantIdFromUrl(request.url);

  if (tenantIdFromUrl) {
    return tenantIdFromUrl;
  }

  const gmailPayload = decodeGmailPubSubPayload(body);

  if (!gmailPayload) {
    return null;
  }

  return resolveTenantIdForGmailWebhook(gmailPayload.emailAddress);
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
  const body = await readWebhookBody(request); 

  console.log({
  messageId: (body as any)?.message?.messageId,
  publishTime: (body as any)?.message?.publishTime,
});

  const tenantId = await resolveTenantId(request, body);

  // console.log("\n================ WEBHOOK =================");
  // console.log("URL:", request.url);

  // console.log("\nHEADERS:");
  // console.dir(Object.fromEntries(request.headers), { depth: null });

  // console.log("\nBODY:");
  // console.dir(body, { depth: null });

  // console.log("=========================================\n");

  /*
  ================ WEBHOOK =================
URL: https://localhost:3000/api/webhooks

HEADERS:
{
  accept: 'application/json',
  'accept-encoding': 'gzip, deflate, br',
  'content-length': '332',
  'content-type': 'application/json',
  from: 'noreply@google.com',
  host: 'recount-depravity-paramount.ngrok-free.dev',
  'user-agent': 'APIs-Google; (+https://developers.google.com/webmasters/APIs-Google.html)',
  'x-forwarded-for': '74.125.208.102',
  'x-forwarded-host': 'recount-depravity-paramount.ngrok-free.dev',
  'x-forwarded-port': '3000',
  'x-forwarded-proto': 'https'
}

BODY:
{
  message: {
    data: 'eyJlbWFpbEFkZHJlc3MiOiJyb2hhbjQ5NDIxQGdtYWlsLmNvbSIsImhpc3RvcnlJZCI6NTc1NTIzfQ==',
    messageId: '19778183927998526',
    message_id: '19778183927998526',
    publishTime: '2026-07-04T09:58:32.458Z',
    publish_time: '2026-07-04T09:58:32.458Z'
  },
  subscription: 'projects/daypilot-ai-499412/subscriptions/webhook-daypilot-sub'
}
=========================================  
   */

  if (!tenantId) {
    console.warn("[webhooks] Could not resolve tenant");

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
        { status: 202 },
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
  }  

  
  catch (error) {
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
