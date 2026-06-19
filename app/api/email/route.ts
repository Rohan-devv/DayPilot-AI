import { auth } from "@/lib/auth";
import { getThreads } from "@/lib/services/gmail/get-email";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }  
  

  const pageToken =
    req.nextUrl.searchParams.get("pageToken") ??
    undefined;
  
  const data = await getThreads(
    session.user.id,
    pageToken
  );

  return NextResponse.json(data);
}