// components/full-page-loader.tsx
"use client"
import { Loader2 } from "lucide-react";

export function FullPageLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-white" />
    </div>
  );
}