import { auth } from "@/lib/auth";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { InboxStats } from "@/components/dashboard/inbox-stats";
import { FolderTabs } from "@/components/dashboard/folder-tabs";
import { EmailList } from "@/components/dashboard/email-list";
import { AiWorkspace } from "@/components/dashboard/ai-workspace";

import { ResizableLayout } from "@/components/dashboard/resizable-layout"; 
import {Toaster} from "react-hot-toast"  

import { getConnectionStatus } from "@/lib/corsair/get-connection-status"; 
import { redirect } from "next/navigation"; 
import ClientDashboard from "@/components/dashboard/client-dashboard";



export default async function DashboardPage() {  
  
  
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }    

  const status = await getConnectionStatus(
    session.user.id
  );

  if (
    !status.gmailConnected &&
    !status.calendarConnected
  ) {
    redirect("/onboarding");
  }



  return <ClientDashboard status={status} />
}