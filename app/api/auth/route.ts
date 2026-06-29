import { processOAuthCallback } from "corsair/oauth";
import { NextRequest, NextResponse } from "next/server";

import { corsair } from "@/lib/corsair";

const REDIRECT_URI = `${process.env.APP_URL}/api/auth`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return new NextResponse("Missing code or state", {
      status: 400,
    });
  }

  const storedState =
    request.cookies.get("oauth_state")?.value;

  if (!storedState || storedState !== state) {
    return new NextResponse("Invalid state", {
      status: 400,
    });
  }

  try {
    const result = await processOAuthCallback(
      corsair,
      {
        code,
        state,
        redirectUri: REDIRECT_URI,
      }
    );

    const response = NextResponse.json({
      success: true,
      plugin: result.plugin,
      tenantId: result.tenantId,
    });

    response.cookies.delete("oauth_state");

   return NextResponse.redirect(
  new URL("/dashboard", request.url)
);
  } catch (error) {
    console.dir(error, { depth: null });
 

    const response = new NextResponse(
      "OAuth failed",
      { status: 500 }
    );

    response.cookies.delete("oauth_state");

    return response;
  }
}