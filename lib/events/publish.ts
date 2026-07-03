import { redis } from "./redis";

export async function publishInboxUpdate(
  tenantId: string | undefined
) {
 const receivers = await redis.publish(
  "inbox:user_2",
  JSON.stringify({
    type: "EMAIL_UPDATED",
  })
);

console.log("📨 Publishing inbox update");
console.log("Receivers:", receivers);
}  

//console.log("Receivers:", receivers);