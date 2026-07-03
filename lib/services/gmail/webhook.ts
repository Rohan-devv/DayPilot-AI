import { decodePubSubMessage } from "@corsair-dev/gmail";
import { isNull, lte, or, sql } from "drizzle-orm";

import db from "@/db";
import { gmailWebhookTenants, usersTable } from "@/db/schema";
import { corsair } from "@/lib/corsair";

const GMAIL_API_BASE = "https://gmail.googleapis.com/gmail/v1";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const WATCH_RENEWAL_WINDOW_MS = 24 * 60 * 60 * 1000;

type GmailPubSubPayload = {
  emailAddress: string;
  historyId: string;
};

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type GmailProfileResponse = {
  emailAddress?: string;
  historyId?: string;
};

type GmailWatchResponse = {
  historyId?: string;
  expiration?: string;
};

type GmailWatchSetupResult = {
  tenantId: string;
  emailAddress: string;
  historyId: string | null;
  watchExpiration: Date | null;
};

type GmailWatchRenewalResult =
  | (GmailWatchSetupResult & { ok: true })
  | {
      ok: false;
      tenantId: string;
      emailAddress: string;
      error: string;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeEmailAddress(emailAddress: string) {
  return emailAddress.trim().toLowerCase();
}

function getGmailPubSubTopicName() {
  const topicName =
    process.env.GMAIL_PUBSUB_TOPIC ??
    process.env.GMAIL_PUBSUB_TOPIC_NAME ??
    process.env.GOOGLE_PUBSUB_TOPIC ??
    process.env.GOOGLE_PUBSUB_TOPIC_NAME;

  if (!topicName) {
    throw new Error(
      "Missing GMAIL_PUBSUB_TOPIC. Expected: projects/<project-id>/topics/<topic-name>."
    );
  }

  if (!topicName.startsWith("projects/") || !topicName.includes("/topics/")) {
    throw new Error(
      "Invalid GMAIL_PUBSUB_TOPIC. Expected: projects/<project-id>/topics/<topic-name>."
    );
  }

  return topicName;
}

function parseWatchExpiration(expiration?: string) {
  if (!expiration) {
    return null;
  }

  const expiresAtMs = Number(expiration);
  if (!Number.isFinite(expiresAtMs)) {
    return null;
  }

  return new Date(expiresAtMs);
}

async function readGoogleJson<T>(response: Response) {
  const text = await response.text();

  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Google returned non-JSON response: ${text}`);
  }
}

async function getValidGmailAccessToken(
  tenantId: string,
  forceRefresh = false
) {
  const keys = corsair.withTenant(tenantId).gmail.keys;
  const [accessToken, expiresAt, refreshToken, credentials] =
    await Promise.all([
      keys.get_access_token(),
      keys.get_expires_at(),
      keys.get_refresh_token(),
      keys.get_integration_credentials(),
    ]);

  const expiresAtNumber = Number(expiresAt);
  const nowSeconds = Math.floor(Date.now() / 1000);

  if (
    !forceRefresh &&
    accessToken &&
    Number.isFinite(expiresAtNumber) &&
    expiresAtNumber > nowSeconds + 300
  ) {
    return accessToken;
  }

  if (!refreshToken) {
    throw new Error(`Missing Gmail refresh token for tenant "${tenantId}".`);
  }

  if (!credentials.client_id || !credentials.client_secret) {
    throw new Error("Missing Gmail OAuth client credentials in Corsair setup.");
  }

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const token = await readGoogleJson<GoogleTokenResponse>(response);

  if (!response.ok || !token.access_token) {
    const message =
      token.error_description ??
      token.error ??
      `Google token refresh failed with status ${response.status}.`;
    throw new Error(message);
  }

  const newExpiresAt = nowSeconds + (token.expires_in ?? 3600);

  await Promise.all([
    keys.set_access_token(token.access_token),
    keys.set_expires_at(String(newExpiresAt)),
  ]);

  return token.access_token;
}

async function gmailRequest<T>(
  tenantId: string,
  path: string,
  init: RequestInit = {},
  forceRefresh = false
): Promise<T> {
  const accessToken = await getValidGmailAccessToken(tenantId, forceRefresh);
  const response = await fetch(`${GMAIL_API_BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
      ...init.headers,
    },
  });

  if (response.status === 401 && !forceRefresh) {
    return gmailRequest<T>(tenantId, path, init, true);
  }

  const data = await readGoogleJson<T>(response);

  if (!response.ok) {
    throw new Error(
      `Gmail request failed (${response.status}): ${JSON.stringify(data)}`
    );
  }

  return data;
}

export function decodeGmailPubSubPayload(body: unknown) {
  if (!isRecord(body) || !isRecord(body.message)) {
    return null;
  }

  const data = body.message.data;

  if (typeof data !== "string") {
    return null;
  }

  try {
    const payload = decodePubSubMessage(data);

    if (!payload.emailAddress || !payload.historyId) {
      return null;
    }

    return {
      emailAddress: normalizeEmailAddress(payload.emailAddress),
      historyId: payload.historyId,
    } satisfies GmailPubSubPayload;
  } catch {
    return null;
  }
}

export async function resolveTenantIdForGmailWebhook(emailAddress: string) {
  const normalizedEmailAddress = normalizeEmailAddress(emailAddress);

  const [mapping] = await db
    .select({
      tenantId: gmailWebhookTenants.tenantId,
    })
    .from(gmailWebhookTenants)
    .where(
      sql`lower(${gmailWebhookTenants.emailAddress}) = ${normalizedEmailAddress}`
    )
    .limit(1);

  if (mapping?.tenantId) {
    return mapping.tenantId;
  }

  const [user] = await db
    .select({
      id: usersTable.id,
    })
    .from(usersTable)
    .where(sql`lower(${usersTable.email}) = ${normalizedEmailAddress}`)
    .limit(1);

  return user ? `user_${user.id}` : null;
}

async function saveGmailWebhookTenant({
  tenantId,
  emailAddress,
  historyId,
  watchExpiration,
}: GmailWatchSetupResult) {
  const normalizedEmailAddress = normalizeEmailAddress(emailAddress);
  const now = new Date();

  await db
    .insert(gmailWebhookTenants)
    .values({
      tenantId,
      emailAddress: normalizedEmailAddress,
      historyId,
      watchExpiration,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: gmailWebhookTenants.tenantId,
      set: {
        emailAddress: normalizedEmailAddress,
        historyId,
        watchExpiration,
        updatedAt: now,
      },
    });
}

export async function setupGmailWebhookForTenant(tenantId: string) {
  const topicName = getGmailPubSubTopicName();

  const profile = await gmailRequest<GmailProfileResponse>(
    tenantId,
    "/users/me/profile"
  );

  if (!profile.emailAddress) {
    throw new Error(`Could not read Gmail profile for tenant "${tenantId}".`);
  }

  const normalizedEmailAddress = normalizeEmailAddress(profile.emailAddress);

  await saveGmailWebhookTenant({
    tenantId,
    emailAddress: normalizedEmailAddress,
    historyId: profile.historyId ?? null,
    watchExpiration: null,
  });

  const watch = await gmailRequest<GmailWatchResponse>(tenantId, "/users/me/watch", {
    method: "POST",
    body: JSON.stringify({
      topicName,
      labelIds: ["INBOX"],
    }),
  });

  const result = {
    tenantId,
    emailAddress: normalizedEmailAddress,
    historyId: watch.historyId ?? profile.historyId ?? null,
    watchExpiration: parseWatchExpiration(watch.expiration),
  } satisfies GmailWatchSetupResult;

  await saveGmailWebhookTenant(result);

  return result;
}

export async function renewDueGmailWebhookWatches(
  renewalWindowMs = WATCH_RENEWAL_WINDOW_MS
) {
  const renewBefore = new Date(Date.now() + renewalWindowMs);
  const rows = await db
    .select({
      tenantId: gmailWebhookTenants.tenantId,
      emailAddress: gmailWebhookTenants.emailAddress,
    })
    .from(gmailWebhookTenants)
    .where(
      or(
        isNull(gmailWebhookTenants.watchExpiration),
        lte(gmailWebhookTenants.watchExpiration, renewBefore)
      )
    );

  const results: GmailWatchRenewalResult[] = [];

  for (const row of rows) {
    try {
      const setup = await setupGmailWebhookForTenant(row.tenantId);
      results.push({ ...setup, ok: true });
    } catch (error) {
      results.push({
        ok: false,
        tenantId: row.tenantId,
        emailAddress: row.emailAddress,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return results;
}