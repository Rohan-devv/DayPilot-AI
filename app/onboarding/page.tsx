"use client";

import { useEffect, useState } from "react";
import { IntegrationCard } from "@/components/onBoarding/integration-card";
import { OnboardingProgress } from "@/components/onBoarding/onboarding-progress";
import { AiPreview } from "@/components/onBoarding/ai-preview"; 
import { FullPageLoader } from "@/components/full-page-loader/page";
//import { FullPageLoader } from "@/components/full-page-loader";



export default function OnboardingPage() {

  const [gmailConnected, setGmailConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false); 
  const [loading, setLoading] = useState(true);   

 
  useEffect(() => {
  if (gmailConnected && calendarConnected) {
    window.location.replace("/dashboard");
  }
}, [gmailConnected, calendarConnected]); 


 useEffect(() => {
    async function loadStatus() {
      try {

        const res = await fetch("/api/onboarding/status")
        const data = await res.json()

        setGmailConnected(data.gmailConnected)
        setCalendarConnected(data.calendarConnected) 
        //window.location.reload()

      } catch (error) {

        console.error("Error fetching connection status:", error);

      }finally {
        setLoading(false);
      }

    }
    loadStatus()
  }, []) 

  const connectGmail = () => {
    window.location.href =
      "/api/connectToGmail?plugin=gmail";
  };

  const connectCalendar = () => {
    window.location.href =
      "/api/connectToCalendar?plugin=googlecalendar";
  };
    




  const current = gmailConnected ? 2 : 1;

  const heading = gmailConnected
    ? "Almost there 🎉"
    : "Connect your workspace";

  const description = gmailConnected
    ? "Connect Google Calendar to finish your setup."
    : "Connect Gmail to get started with DayPilot.";
 

  

  if(loading) { 
  return <FullPageLoader />;

 }



  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="max-w-3xl">
          <OnboardingProgress
            current={current}
            total={2}
          />

          <h1 className="text-5xl font-semibold mb-4">
            {heading}
          </h1>

          <p className="text-[#666] text-lg">
            {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-14">

          <div className="space-y-6">

            {!gmailConnected && (
              <IntegrationCard
                type="gmail"
                title="Gmail"
                description="Read emails, draft replies and send emails."
                connected={gmailConnected}
                onConnect={connectGmail}
                buttonText="Connect Gmail"
              />
            )}

            {gmailConnected && !calendarConnected && (
              <IntegrationCard
                type="googlecalendar"
                title="Google Calendar"
                description="Read events, create meetings and manage your schedule."
                connected={calendarConnected}
                onConnect={connectCalendar}
                buttonText="Connect Google Calendar"
              />
            )}

          </div>

          <AiPreview />
        </div>
      </div>
    </main>
  );
}