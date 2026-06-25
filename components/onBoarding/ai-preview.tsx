export function AiPreview() {
  return (
    <div
      className="
      bg-[#0A0A0A]
      border border-[#1A1A1A]
      rounded-2xl
      p-6
      h-full
    "
    >
      <div className="mb-6">
        <p className="text-white font-semibold">
          DayPilot AI Preview
        </p>

        <p className="text-[#666] text-sm mt-1">
          What you'll unlock after connecting
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end">
          <div className="bg-[#FF6B00] text-black px-4 py-2 rounded-xl max-w-xs text-sm">
            Summarize my inbox
          </div>
        </div>

        <div className="bg-[#111] border border-[#1A1A1A] rounded-xl p-4">
          <p className="text-[#ccc] text-sm">
            You have 3 priority emails:
          </p>

          <ul className="mt-2 text-sm text-[#777] space-y-1">
            <li>• Internship Offer</li>
            <li>• Team Sync Meeting</li>
            <li>• Product Launch Discussion</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#FF6B00] text-black px-4 py-2 rounded-xl max-w-xs text-sm">
            Schedule a meeting tomorrow
          </div>
        </div>

        <div className="bg-[#111] border border-[#1A1A1A] rounded-xl p-4">
          <p className="text-[#ccc] text-sm">
            Meeting scheduled.
          </p>

          <p className="text-[#666] text-xs mt-1">
            Calendar invite sent.
          </p>
        </div>
      </div>
    </div>
  );
}