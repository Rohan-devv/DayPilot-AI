import db from "@/db";
import {
  corsairAccounts,
  corsairIntegrations,
} from "@/db/schema";

import { eq } from "drizzle-orm";

export async function getConnectionStatus(
  userId: string
) {
  const integrations = await db
    .select({
      name: corsairIntegrations.name,
    })
    .from(corsairAccounts)
    .innerJoin(
      corsairIntegrations,
      eq(
        corsairAccounts.integrationId,
        corsairIntegrations.id
      )
    )
    .where(
      eq(
        corsairAccounts.tenantId,
        `user_${userId}`
      )
    );

  const integrationNames = integrations.map(
    (item) => item.name
  );

  return {
    gmailConnected:
      integrationNames.includes("gmail"),

    calendarConnected:
      integrationNames.includes("googlecalendar"),

    integrations: integrationNames,
  };
}