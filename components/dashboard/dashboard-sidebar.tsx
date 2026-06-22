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
} from "lucide-react";
import { useState } from "react";

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
  const [active, setActive] = useState("Inbox");

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#0d0d0f",
        borderRight: "1px solid #1e1e24",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Logo */}
      {/* Logo */}
<div
  style={{
    padding: "20px 18px",
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
    width: "150px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }}
    >
      <img
        src="/DayPilot_logo.png"
        alt="DayPilot AI"
        style={{
    width: "150px",
    height: "80px",
    objectFit: "contain", 
    mixBlendMode: "screen",
     filter: "brightness(1.7)"
  }}
      />
    </div>

   
  </div>
</div>

      {/* Mail Section */}
      <div style={{ padding: "12px 8px 8px", flex: 1 }}>
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
          Mail
        </p>

        <nav style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {mailItems.map(({ label, icon: Icon, count }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
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
                {/* Active indicator bar */}
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

                <span style={{ flex: 1 }}>{label}</span>

                {count && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: isActive ? "#a5b4fc" : "#4b4b5a",
                      background: isActive ? "#1e1e3a" : "#1a1a20",
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
                  onClick={() => setActive(label)}
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
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #1e1e24",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f97316, #ec4899)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          SH
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "12.5px", fontWeight: 600, color: "#c4c4d8", margin: 0, lineHeight: 1.3 }}>
            My Account
          </p>
          <p style={{ fontSize: "11px", color: "#4b4b5a", margin: 0, lineHeight: 1.3 }}>Free plan</p>
        </div>
        <ChevronRight size={13} color="#3a3a4a" />
      </div>
    </div>
  );
}
