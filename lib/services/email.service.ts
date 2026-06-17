import { corsair } from "@/lib/corsair";

export async function getThreads(userId: string) {
  return corsair
    .withTenant(`user_${userId}`)
    .gmail
    .api
    .threads
    .list({});
}