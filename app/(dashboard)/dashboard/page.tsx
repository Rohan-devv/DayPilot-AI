import { auth } from "@/lib/auth";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"; 
import { DashboardHeader } from "@/components/dashboard/dashboard-header"; 
import { InboxStats } from "@/components/dashboard/inbox-stats"; 
import { FolderTabs } from "@/components/dashboard/folder-tabs"; 
import { EmailList } from "@/components/dashboard/email-list"; 
import { AiWorkspace } from "@/components/dashboard/ai-workspace";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  

  return (
   <div 
   className="flex h-screen">
  <DashboardSidebar />

  {/* Inbox Section */}
  <main className="flex-1 overflow-y-auto">
    <DashboardHeader />
    <InboxStats />
    <FolderTabs />
    <EmailList />
  </main>

   <div className="
    w-[360px]
    min-w-[320px]
    max-w-[500px]
    resize-x
    overflow-auto
    border-l
    border-zinc-800
  ">
    <AiWorkspace />
  </div>
</div>
  );
}