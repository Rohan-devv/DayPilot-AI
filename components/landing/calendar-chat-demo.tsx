"use client";
import { useState } from "react";
import { CAL_EXAMPLE } from "./constants";
import type { CalendarStage, CalendarEvent } from "./types";

export function CalendarChatDemo() {
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<CalendarStage>("idle");
  const [event, setEvent] = useState<CalendarEvent | null>(null);

  const handleSchedule = () => {
    if (!input.trim()) return;
    setStage("thinking");
    setTimeout(() => {
      setEvent({
        title: "Product Review",
        date: "Saturday, 28 June 2026",
        time: "3:00 PM – 4:00 PM",
        guests: ["design@team.co", "alex@daypilot.ai"],
        location: "Google Meet (auto-generated)",
        note: 'Parsed from: "product review on 28th June at 3 PM with the design team"',
      });
      setStage("preview");
    }, 1500);
  };

  const handleConfirm = () => setStage("confirmed");
  const handleReset = () => {
    setStage("idle");
    setInput("");
    setEvent(null);
  };

  return (
    <div
      style={{
        background: "#0A0A0A",
        border: "1px solid #1A1A1A",
        borderRadius: 16,
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          background: "#111",
          borderBottom: "1px solid #1A1A1A",
          padding: "13px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "#333",
          }}
        />
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "#333",
          }}
        />
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "#333",
          }}
        />
        <span
          style={{
            marginLeft: 10,
            fontSize: 12,
            color: "#555",
            letterSpacing: "0.03em",
          }}
        >
          DayPilot — Calendar Agent
        </span>
        <div
          style={{
            marginLeft: "auto",
            background: "#1A0A00",
            border: "1px solid #FF6B0044",
            borderRadius: 6,
            padding: "2px 10px",
            fontSize: 11,
            color: "#FF6B00",
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          LIVE
        </div>
      </div>

      <div style={{ padding: 18, minHeight: 300 }}>
        {/* intro */}
        <div
          style={{ display: "flex", gap: 10, marginBottom: 16 }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#FF6B0022",
              border: "1px solid #FF6B0044",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div
            style={{
              background: "#111",
              border: "1px solid #1A1A1A",
              borderRadius: "0 12px 12px 12px",
              padding: "10px 14px",
              maxWidth: "80%",
            }}
          >
            <p
              style={{
                color: "#ccc",
                fontSize: 13,
                margin: 0,
                lineHeight: 1.65,
              }}
            >
              Tell me what to schedule — date, time, who's joining. I'll create
              the event and send invites.
            </p>
          </div>
        </div>

        {/* user bubble */}
        {stage !== "idle" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                background: "#FF6B00",
                borderRadius: "12px 0 12px 12px",
                padding: "10px 14px",
                maxWidth: "80%",
              }}
            >
              <p
                style={{
                  color: "#000",
                  fontSize: 13,
                  margin: 0,
                  lineHeight: 1.65,
                  fontWeight: 500,
                }}
              >
                {input}
              </p>
            </div>
          </div>
        )}

        {/* thinking */}
        {stage === "thinking" && (
          <div
            style={{ display: "flex", gap: 10, marginBottom: 16 }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#FF6B0022",
                border: "1px solid #FF6B0044",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#FF6B00"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div
              style={{
                background: "#111",
                border: "1px solid #1A1A1A",
                borderRadius: "0 12px 12px 12px",
                padding: "12px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#FF6B00",
                      animation: `bounce 1.2s ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
                <span
                  style={{
                    color: "#555",
                    fontSize: 12,
                    marginLeft: 8,
                  }}
                >
                  Parsing details and checking calendar…
                </span>
              </div>
            </div>
          </div>
        )}

        {/* event preview */}
        {(stage === "preview" || stage === "confirmed") && event && (
          <div
            style={{ display: "flex", gap: 10, marginBottom: 16 }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#FF6B0022",
                border: "1px solid #FF6B0044",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#FF6B00"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "#666",
                  fontSize: 12,
                  marginBottom: 8,
                }}
              >
                Here's what I'll create — confirm to add to your calendar:
              </p>
              <div
                style={{
                  background: "#111",
                  border: "1px solid #1A1A1A",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                {/* event card header */}
                <div
                  style={{
                    background: "#FF6B0011",
                    borderBottom: "1px solid #1A1A1A",
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#FF6B00",
                      borderRadius: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        color: "#000",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      JUN
                    </span>
                    <span
                      style={{
                        fontSize: 16,
                        color: "#000",
                        fontWeight: 700,
                      }}
                    >
                      28
                    </span>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 14,
                        margin: 0,
                      }}
                    >
                      {event.title}
                    </p>
                    <p
                      style={{
                        color: "#888",
                        fontSize: 12,
                        margin: 0,
                      }}
                    >
                      {event.date}
                    </p>
                  </div>
                </div>
                {/* details */}
                <div style={{ padding: "12px 14px" }}>
                  {[
                    { icon: "🕒", label: event.time },
                    { icon: "👥", label: event.guests.join(", ") },
                    { icon: "📍", label: event.location },
                  ].map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        marginBottom: i < 2 ? 8 : 0,
                      }}
                    >
                      <span style={{ fontSize: 13 }}>{row.icon}</span>
                      <span
                        style={{
                          color: "#888",
                          fontSize: 12,
                          lineHeight: 1.5,
                        }}
                      >
                        {row.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    borderTop: "1px solid #1A1A1A",
                    padding: "8px 14px",
                  }}
                >
                  <p
                    style={{
                      color: "#333",
                      fontSize: 11,
                      margin: 0,
                      fontStyle: "italic",
                    }}
                  >
                    {event.note}
                  </p>
                </div>
              </div>
              {stage === "preview" && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 10,
                  }}
                >
                  <button
                    onClick={handleConfirm}
                    style={{
                      background: "#FF6B00",
                      color: "#000",
                      border: "none",
                      borderRadius: 8,
                      padding: "9px 18px",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Add to Calendar
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                  <button
                    onClick={handleReset}
                    style={{
                      background: "transparent",
                      color: "#555",
                      border: "1px solid #1A1A1A",
                      borderRadius: 8,
                      padding: "9px 14px",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* confirmed */}
        {stage === "confirmed" && (
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#FF6B0022",
                border: "1px solid #FF6B0044",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#FF6B00"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div
              style={{
                background: "#0D0D0D",
                border: "1px solid #FF6B0033",
                borderRadius: "0 12px 12px 12px",
                padding: "10px 14px",
              }}
            >
              <p
                style={{
                  color: "#FF8C33",
                  fontWeight: 600,
                  fontSize: 13,
                  margin: "0 0 2px",
                }}
              >
                ✓ Event added to Google Calendar
              </p>
              <p
                style={{ color: "#555", fontSize: 12, margin: 0 }}
              >
                Invites sent to design@team.co · Meet link attached · Reminder
                set for 30 min before
              </p>
            </div>
          </div>
        )}
      </div>

      {/* input bar */}
      <div
        style={{
          borderTop: "1px solid #1A1A1A",
          padding: "12px 14px",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && stage === "idle" && handleSchedule()
          }
          placeholder={CAL_EXAMPLE}
          disabled={stage !== "idle"}
          style={{
            flex: 1,
            background: "#111",
            border: "1px solid #1A1A1A",
            borderRadius: 8,
            padding: "10px 14px",
            color: "#fff",
            fontSize: 13,
            outline: "none",
            fontFamily: "inherit",
            opacity: stage !== "idle" ? 0.4 : 1,
          }}
        />
        {stage === "idle" ? (
          <button
            onClick={handleSchedule}
            disabled={!input.trim()}
            style={{
              background: input.trim() ? "#FF6B00" : "#1A1A1A",
              color: input.trim() ? "#000" : "#333",
              border: "none",
              borderRadius: 8,
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: input.trim() ? "pointer" : "default",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            <svg
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleReset}
            style={{
              background: "#1A1A1A",
              color: "#666",
              border: "none",
              borderRadius: 8,
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
            </svg>
          </button>
        )}
      </div>
      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>
    </div>
  );
}