"use client" 

import { MailCheck, CalendarDays } from "lucide-react"; 
import { useState } from "react";  

type IntegrationType = "gmail" | "googlecalendar"; 

type IntegrationCardProps = { 
  type: IntegrationType;
  title: string;
  description: string;
 
  connected: boolean;
  loading?: boolean;
  onConnect: () => void; 
  buttonText?: string;
};  

const integrationIcons: Record<IntegrationType, React.ReactNode> = {
  gmail: <MailCheck />,
  googlecalendar: <CalendarDays />, 
};

export function IntegrationCard({
  type,
  title,
  description,
  
  connected,
  loading,
  onConnect, 
  buttonText
}: IntegrationCardProps) {

  const [isConnecting, setIsConnecting] = useState(false)

  const handleClick = () => {
    setIsConnecting(true)
    onConnect()
  }

  return (
    <div
      className="
      bg-[#0A0A0A]
      border border-[#1A1A1A]
      rounded-2xl
      p-6
      transition-all
      hover:border-[#2A2A2A]
    "
    >
      <div className="mb-4">{integrationIcons[type]}</div>

      <h3 className="text-white text-lg font-semibold">
        {title}
      </h3>

      <p className="text-[#666] text-sm mt-2">
        {description}
      </p>

      <div className="mt-6">
        {connected ? (
          <div
            className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            border
            border-green-500/20
            bg-green-500/10
            text-green-400
            text-sm
          "
          >
            ✓ Connected
          </div>
        ) : (
          <button
            onClick = {handleClick}
            disabled={loading}
            className="
            bg-[#FF6B00]
            text-black
            px-5
            py-2.5
            rounded-lg
            font-semibold
            hover:bg-[#FF8C33]
            transition
          "
          >
            {isConnecting ? "Please wait..." : buttonText }
          </button>
        )}
      </div>
    </div>
  );
}






