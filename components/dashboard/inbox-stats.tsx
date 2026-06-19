export function InboxStats() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
        <p className="text-sm text-zinc-400">
          TOTAL UNREAD MAILS
        </p>

        <h2 className="mt-2 text-4xl font-bold text-white">
          201
        </h2>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
        <p className="text-sm text-zinc-400">
          TOTAL EVENTS
        </p>

        <h2 className="mt-2 text-4xl font-bold text-white">
          0
        </h2>
      </div>
    </div>
  );
} 