import { generateOAuthUrl } from "corsair/oauth";
import { NextRequest, NextResponse } from "next/server";

import { corsair } from "@/lib/corsair"
import { auth } from "@/lib/auth";

const REDIRECT_URI = `${process.env.APP_URL}/api/auth`;

export async function GET(request: NextRequest) {
  const session = await auth(); 

 console.log(
  "CONNECT USER",
  session?.user.id,
  session?.user.email
)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const plugin = new URL(request.url).searchParams.get("plugin");

  if (!plugin) {
    return NextResponse.json(
      { error: "Missing plugin" },
      { status: 400 }
    );
  }

  const { url, state } = await generateOAuthUrl(
    corsair,
    plugin,
    {
      tenantId :`user_${session.user.id}`,
      redirectUri: REDIRECT_URI,
    }
  );

  const response = NextResponse.redirect(url);

  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
  });

  return response;
} 
 