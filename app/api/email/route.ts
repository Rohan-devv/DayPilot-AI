// app/api/email/route.ts

import { corsair } from "@/lib/corsair";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const tenantId = `user_${session.user.id}`;

    console.log("tenant:", tenantId);

    const result = await corsair
      .withTenant(tenantId)
      .gmail
      .api
      .threads
      .list({})
    return NextResponse.json(result); 
    console.log(result)
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : null,
    });
  }
}