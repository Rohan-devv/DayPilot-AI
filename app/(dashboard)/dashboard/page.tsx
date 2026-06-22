import { auth } from "@/lib/auth";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { InboxStats } from "@/components/dashboard/inbox-stats";
import { FolderTabs } from "@/components/dashboard/folder-tabs";
import { EmailList } from "@/components/dashboard/email-list";
import { AiWorkspace } from "@/components/dashboard/ai-workspace";

import { ResizableLayout } from "@/components/dashboard/resizable-layout";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="flex h-screen">
      <DashboardSidebar />

      <ResizableLayout
        aiPanel={<AiWorkspace />}
      >
        <>
          <DashboardHeader />
          <InboxStats />
          <FolderTabs />
          <EmailList />
        </>
      </ResizableLayout>
    </div>
  );
}