"use client"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { InboxStats } from "@/components/dashboard/inbox-stats";
import { FolderTabs } from "@/components/dashboard/folder-tabs";
import { EmailList } from "@/components/dashboard/email-list";
import { AiWorkspace } from "@/components/dashboard/ai-workspace"; 
import type { ConnectionStatus }  from "@/lib/corsair/get-connection-status"; 

import { ResizableLayout } from "@/components/dashboard/resizable-layout"; 
import {Toaster} from "react-hot-toast"  

import { useDashboardUIStore } from "@/stores/dashboard-ui-store";

import React from 'react' 
import ComposeEmail from "./compose-email";

type ClientDashboardProps = {
    status: ConnectionStatus
}

const ClientDashboard = ({status}: ClientDashboardProps) => {  

    const isComposeOpen = useDashboardUIStore(
  (state) => state.isComposeOpen
);
    
  return ( 

   <div className="flex h-screen"> 
      <Toaster/>
      <DashboardSidebar />

      <ResizableLayout
        aiPanel={<AiWorkspace initialConnections={status} />}
      >
        <>
          <DashboardHeader />
          <InboxStats />
          <FolderTabs />
          <EmailList />
        </>
      </ResizableLayout>  

      {
  isComposeOpen && (
    <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[3px]">
  <div className="absolute bottom-5 right-[390px]">
    <ComposeEmail />
  </div>
</div>
  ) 
  }


      
    </div>
  )
}

export default ClientDashboard