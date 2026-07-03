import { redis } from "./redis";

export async function publishInboxUpdate(
  tenantId: string | undefined
) {
  if (!tenantId) {
    console.warn("❌ Missing tenantId");
    return;
  }

  const channel = `inbox:${tenantId}`;

  const receivers = await redis.publish(
    channel,
    JSON.stringify({
      type: "EMAIL_UPDATED",
      tenantId,
      timestamp: Date.now(),
    })
  );

  console.log("📨 Publishing inbox update");
  console.log("Channel:", channel);
  console.log("Receivers:", receivers);
}