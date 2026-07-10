  "use client"
  import {
    Inbox,
    Star,
    MailOpen,
    Send,
    FileText,
    ShieldAlert,
    Trash2,
    Calendar,
    Bot,
    ChevronRight,
    Pencil
  } from "lucide-react";
  import { useState } from "react"; 
  import { signOut } from "next-auth/react";
  import { LogOut } from "lucide-react";  
  import {toast} from "react-hot-toast" 

  import { useDashboardUIStore } from "@/stores/dashboard-ui-store";
import { SideBarItem } from "@/types/dashboard";


  const mailItems = [
    { label: "Inbox", icon: Inbox, count: 201 },
    { label: "Starred", icon: Star },
    { label: "Unread", icon: MailOpen, count: 12 },
    { label: "Sent", icon: Send },
    { label: "Drafts", icon: FileText, count: 3 },
    { label: "Spam", icon: ShieldAlert, count: 5 },
    { label: "Trash", icon: Trash2 },
  ];

  const toolItems = [
    { label: "Calendar", icon: Calendar },
    { label: "AI Agent", icon: Bot },
  ];

  export function DashboardSidebar() { 

   const active = useDashboardUIStore(
  (state) => state.activeSidebarItem
);

const setActive = useDashboardUIStore(
  (state) => state.setActiveSidebarItem
);

const openCompose = useDashboardUIStore(
  (state) => state.openCompose
);
    


    return ( 
    
      <div
        style={{
          width: "260px",
          minHeight: "100vh",
          background: "#c7ccd5",
  borderRight: "1px solid #E3E7EE",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', -apple-system, sans-serif",
        }}
      >
        {/* Logo */}
        {/* Logo */}
  <div
    style={{
      padding: "20px 5px",
      borderBottom: "1px solid #1e1e24",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
    <div
    style={{
      height: "50px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      paddingLeft: "39px",
      background: "#c7ccd5",
    }}
  >
    

    <img
      src="/gmail.png"
      alt="gmail"
      style={{
        width: "50px",
        height: "45px",
        objectFit: "contain",
      }}
    />

    <span
      style={{
        fontSize: "22px",
        fontWeight: 400,
        color: "#212123",
        fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
        letterSpacing: "-0.3px",
      }}
    >
      Gmail
    </span>
  </div>

    
    </div> 

    <div style={{ padding: "16px" }}>
    <button 
      
      onClick={openCompose}
    
      style={{
        height: "56px",
        width: "145px",
        borderRadius: "16px",
        border: "none",
        background: "#9dcff0",
        color: "#10283b",
        fontWeight: 500,
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "0 18px",
        boxShadow: "0 1px 3px rgba(0,0,0,.15)",
      }}
    >
      ✏️ Compose
    </button>
  </div>
  </div>   



        {/* Mail Section */}
        <div style={{ padding: "12px 8px 8px", flex: 1 }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: "600",
              color: "#6B7280",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "4px 10px 8px",
            }}
          >
            Mail
          </p>

          <nav style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {mailItems.map(({ label, icon: Icon, count }) => {
              const isActive = active === label;
              return (
                <button
                  key={label}
                  onClick={() => setActive(label as SideBarItem)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: "0 16px 16px 0",
                    border: "none",
                    cursor: "pointer",
                    background: isActive ? "#D3E3FD" : "transparent",
  color: isActive ? "#001D35" : "#444746",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "13.5px",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background = "#13131a";
                      (e.currentTarget as HTMLButtonElement).style.color = "#c4c4d8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "#8888a0";
                    }
                  }}
                >
                  

                  <Icon
                    size={15}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    color={isActive ? "#818cf8" : "currentColor"}
                  />

                  <span style={{ flex: 1 }}>{label}</span>

                  {count && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#5F6368",
                        background: "transparent",
                        padding: "1px 7px",
                        borderRadius: "20px",
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Tools Section */}
          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: "600",
                color: "#4b4b5a",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 10px 8px",
              }}
            >
              Tools
            </p>

            <nav style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {toolItems.map(({ label, icon: Icon }) => {
                const isActive = active === label;
                return (
                  <button
                    key={label}
                    onClick={() => setActive(label as SideBarItem)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "7px 10px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      background: isActive ? "#1a1a2e" : "transparent",
                      color: isActive ? "#a5b4fc" : "#8888a0",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "13.5px",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                      position: "relative",
                      justifyContent: "space-between",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.background = "#13131a";
                        (e.currentTarget as HTMLButtonElement).style.color = "#c4c4d8";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "#8888a0";
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {isActive && (
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "20%",
                            height: "60%",
                            width: "3px",
                            borderRadius: "0 3px 3px 0",
                            background: "linear-gradient(180deg, #6366f1, #8b5cf6)",
                          }}
                        />
                      )}
                      <Icon
                        size={15}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        color={isActive ? "#818cf8" : "currentColor"}
                      />
                      <span>{label}</span>
                    </div>
                    <ChevronRight size={13} color="#3a3a4a" />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer */}
        {/* Footer */} 
        
  <div
    style={{
      padding: "12px 16px",
      borderTop: "1px solid #1e1e24",
    }}
  >  

    {/* Profile */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "#F1F3F4",
  color: "#444746",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 700,
        
          flexShrink: 0,
        }}
      >
        SH
      </div>

      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: "12.5px",
            fontWeight: 600,
            color: "#c4c4d8",
            margin: 0,
          }}
        >
          My Account
        </p>

        <p
          style={{
            fontSize: "11px",
            color: "#4b4b5a",
            margin: 0,
          }}
        >
          Free Plan
        </p>
      </div>
    </div>

    {/* Logout Button */}
    <button
      onClick={() =>  {
        toast.success("Logged out successfully");
        signOut({
          callbackUrl: "/",
        })  
      }
        
      }
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #1e1e24",
        background: "#13131a",
        color: "#ef4444",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: 600,
        transition: "all 0.2s ease",
      }}
    >
      <LogOut size={15} />
      Logout
    </button>
  </div>
      </div>
    );
  }
