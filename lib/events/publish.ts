import { redis } from "./redis";

export async function publishInboxUpdate(
  tenantId: string | undefined
) {
  await redis.publish(
    `inbox:${tenantId}`,
    JSON.stringify({
      type: "EMAIL_UPDATED", 
      tenantId,
      timestamp: Date.now(),
    })
  );
}