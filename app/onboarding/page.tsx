"use client";

import { useState } from "react";
import { IntegrationCard } from "@/components/onBoarding/integration-card";
import { OnboardingProgress } from "@/components/onBoarding/onboarding-progress";
import { AiPreview } from "@/components/onBoarding/ai-preview";

export default function OnboardingPage() {
  const [gmailConnected] = useState(false);
  const [calendarConnected] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="max-w-3xl">
          <OnboardingProgress
            current={1}
            total={2}
          />

          <h1 className="text-5xl font-semibold mb-4">
            Connect your workspace
          </h1>

          <p className="text-[#666] text-lg">
            DayPilot works directly with Gmail
            and Google Calendar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-14">

          <div className="space-y-6">

            <IntegrationCard
              title="Gmail"
              description="Read emails, draft replies and send emails."
              connected={gmailConnected}
              onConnect={() => { 
                
              }}
              icon={<span className="text-3xl">📧</span>}
            />

            
          </div>

          <AiPreview />
        </div>
      </div>
    </main>
  );
}