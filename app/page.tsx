import React from 'react' 
import LandingPage from "@/components/landing/landing-page" 
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getConnectionStatus } from "@/lib/corsair/get-connection-status";

const page = async () => {  
   const session = await auth();

  if (!session?.user?.id) {
    return <LandingPage />;
  }

  const status = await getConnectionStatus(
    session.user.id
  );

  if (
    !status.gmailConnected &&
    !status.calendarConnected
  ) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
  return (
    <div> 
      <LandingPage/>

    </div>
  )
}

export default page