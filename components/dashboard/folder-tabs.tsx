const folders = [
  "Inbox",
  "Unread",
  "Sent",
  "Drafts",
  "Attachments",
  "Starred",
  "Trash",
  "Spam",
];

export function FolderTabs() {
  return (
    <div className="flex flex-wrap gap-2 px-6">
      {folders.map((folder) => (
        <button
          key={folder}
          className="
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            px-4
            py-2
            text-sm
            hover:bg-slate-800
          "
        >
          {folder}
        </button>
      ))}
    </div>
  );
}