import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {db} from "@/db";

import {
  corsairAccounts,
  corsairEntities,
  corsairEvents,
  corsairIntegrations,
} from "@/db/schema";

import { and, eq } from "drizzle-orm"; 
import { getValidGmailAccessToken } from "@/lib/services/gmail/webhook";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plugin } = await request.json();

  if (!plugin) {
    return NextResponse.json({ error: "Missing plugin" }, { status: 400 });
  }

  try {
    // Find integration (gmail / googlecalendar)
    const integration = await db
      .select()
      .from(corsairIntegrations)
      .where(eq(corsairIntegrations.name, plugin))
      .limit(1);

    const foundIntegration = integration[0];

    if (!foundIntegration) {
      return NextResponse.json(
        { error: "Integration not found" },
        { status: 404 },
      );
    }

    // Find user's account for this integration
    const accounts = await db
      .select()
      .from(corsairAccounts)
      .where(
        and(
          eq(corsairAccounts.tenantId, `user_${session.user.id}`),
          eq(corsairAccounts.integrationId, foundIntegration.id),
        ),
      )
      .limit(1);

    const account = accounts[0];

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }    



    if (plugin === "gmail") {
  const accessToken = await getValidGmailAccessToken(
    `user_${session.user.id}`,
  );

  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/stop",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to stop Gmail watch: ${error}`);
  }

  console.log("✅ Gmail watch stopped");
}



    // Transaction = all or nothing
    await db.transaction(async (tx) => {
      await tx
        .delete(corsairEvents)
        .where(eq(corsairEvents.accountId, account.id));

      await tx
        .delete(corsairEntities)
        .where(eq(corsairEntities.accountId, account.id));

      await tx
        .delete(corsairAccounts)
        .where(eq(corsairAccounts.id, account.id));
    });

    return NextResponse.json({
      success: true,
      disconnected: plugin,
    });
  } catch (error) {
    console.error("Disconnect failed:", error);

    return NextResponse.json(
      {
        error: "Failed to disconnect",
      },
      { status: 500 },
    );
  }
}
