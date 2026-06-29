

import { useState } from "react";
type IntegrationCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  loading?: boolean;
  onConnect: () => void;
};

export function IntegrationCard({
  title,
  description,
  icon,
  connected,
  loading,
  onConnect,
}: IntegrationCardProps) {    
  
  const [isConnecting, setIsConnecting] = useState(false) 

    const handleConnect = () => {  
      
      setIsConnecting(true)

      
  window.location.href =
    "/api/connectToGmail?plugin=gmail";
};

    
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
      <div className="mb-4">{icon}</div>

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
            onClick={handleConnect}
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
            {isConnecting ?"Please wait...": "Connect Gmail"}
          </button>
        )}
      </div>
    </div>
  );
}