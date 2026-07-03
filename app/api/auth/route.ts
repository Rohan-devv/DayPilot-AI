import { processOAuthCallback } from "corsair/oauth";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { corsair } from "@/lib/corsair";
import { setupGmailWebhookForTenant } from "@/lib/services/gmail/webhook";

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

  const storedState = request.cookies.get("oauth_state")?.value;

  if (!storedState || storedState !== state) {
    return new NextResponse("Invalid state", {
      status: 400,
    });
  }

  try {
    const result = await processOAuthCallback(corsair, {
      code,
      state,
      redirectUri: REDIRECT_URI,
    });

    const redirectUrl =
      result.plugin === "gmail" ? "/onboarding" : "/dashboard";

    /*   
    1. bhai route file nahi hai waha redirect() kaam nahi karega, isliye NextResponse.redirect use kiya hai.
    2. Normal file mein directly redirect() kaam karega, route file mein nahi.
    
    */  

    // webhook initialize 

    if(result.plugin === "gmail") {
  await setupGmailWebhookForTenant(result.tenantId);
}

    const response = NextResponse.redirect(new URL(redirectUrl, request.url)); 
    // const response = NextResponse.json({
    //   success: true,
    //   plugin: result.plugin,
    //   tenantId: result.tenantId,
    // });

    response.cookies.delete("oauth_state");

    return response;
    // Redirect to the dashboard or any other page after successful authentication
    // return redirect("/dashboard");
  } catch (error) {
    console.dir(error, { depth: null });

    const response = new NextResponse("OAuth failed", { status: 500 });

    response.cookies.delete("oauth_state");

    return response;
  }
}
