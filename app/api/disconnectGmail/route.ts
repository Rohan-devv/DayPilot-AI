import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/db";

import {
  corsairAccounts,
  corsairEntities,
  corsairEvents,
  corsairIntegrations,
} from "@/db/schema";

import { and, eq } from "drizzle-orm";

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
