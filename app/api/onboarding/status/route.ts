// app/api/onboarding/status/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getConnectionStatus } from "@/lib/corsair/get-connection-status";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const status = await getConnectionStatus(
    session.user.id
  );

  return NextResponse.json(status);
}