import React from 'react' 
import LandingPage from "@/components/landing/landing-page" 
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getConnectionStatus } from "@/lib/corsair/get-connection-status";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/landingPage");
  }

  const status = await getConnectionStatus(session.user.id);

  if (!status) {
    redirect("/");
  }

  if (!status.gmailConnected || !status.calendarConnected) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
}