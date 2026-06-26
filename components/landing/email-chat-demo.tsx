"use client";
import { useState, useRef } from "react";
import { useTypewriter } from "./use-typewriter";
import { EMAIL_EXAMPLE } from "./constants";
import type { EmailStage, EmailDraft } from "./types";

export function EmailChatDemo() {
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<EmailStage>("idle");
  const [showEmail, setShowEmail] = useState<EmailDraft | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const parsedEmail: EmailDraft = {
    to: "abc@gmail.com",
    subject: "Interview Meeting — 20th June",
    body: `Hi,

I hope this message finds you well.

I wanted to reach out regarding the interview scheduled for 20th June. Please consider this email a formal confirmation of our meeting.

Could you kindly share the preferred time slot and any details about the format? I'll make sure to be fully prepared.

Looking forward to connecting.

Best regards,
Alex`,
  };

  const typewriterActive = stage === "composing";
  const emailBody = useTypewriter(parsedEmail.body, 14, typewriterActive);

  const handleSend = () => {
    if (!input.trim()) return;
    setStage("thinking");
    setTimeout(() => {
      setShowEmail(parsedEmail);
      setStage("composing");
    }, 1400);
  };

  const handleConfirmSend = () => {
    setStage("sent");
  };

  const handleReset = () => {
    setStage("idle");
    setInput("");
    setShowEmail(null);
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
      {/* header */}
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
          DayPilot — Email Agent
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

      {/* chat area */}
      <div style={{ padding: 18, minHeight: 300 }}>
        {/* assistant intro message */}
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
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
              Hey! Tell me who to email and why — I'll draft and send it for
              you.
            </p>
          </div>
        </div>

        {/* user message */}
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
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                  Drafting your email…
                </span>
              </div>
            </div>
          </div>
        )}

        {/* composed email preview */}
        {(stage === "composing" || stage === "sent") && showEmail && (
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
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                Draft ready — review before I send:
              </p>
              <div
                style={{
                  background: "#111",
                  border: "1px solid #1A1A1A",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    borderBottom: "1px solid #1A1A1A",
                    padding: "10px 14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        color: "#444",
                        fontSize: 11,
                        fontWeight: 600,
                        width: 50,
                        textTransform: "uppercase",
                      }}
                    >
                      To
                    </span>
                    <span
                      style={{ color: "#FF8C33", fontSize: 12 }}
                    >
                      {showEmail.to}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span
                      style={{
                        color: "#444",
                        fontSize: 11,
                        fontWeight: 600,
                        width: 50,
                        textTransform: "uppercase",
                      }}
                    >
                      Subject
                    </span>
                    <span
                      style={{ color: "#ddd", fontSize: 12 }}
                    >
                      {showEmail.subject}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    padding: "12px 14px",
                    color: "#aaa",
                    fontSize: 13,
                    lineHeight: 1.75,
                    whiteSpace: "pre-wrap",
                    minHeight: 100,
                  }}
                >
                  {stage === "sent" ? showEmail.body : emailBody}
                  {stage === "composing" &&
                    emailBody.length < showEmail.body.length && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 2,
                          height: 13,
                          background: "#FF6B00",
                          marginLeft: 2,
                          animation: "blink 0.9s infinite",
                        }}
                      />
                    )}
                </div>
              </div>
              {stage === "composing" &&
                emailBody.length >= showEmail.body.length && (
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 10,
                    }}
                  >
                    <button
                      onClick={handleConfirmSend}
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
                      Send now
                      <svg
                        width="13"
                        height="13"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
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
                      Edit
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* sent confirmation */}
        {stage === "sent" && (
          <div
            style={{ display: "flex", gap: 10, marginBottom: 8 }}
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
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                  fontSize: 13,
                  fontWeight: 600,
                  margin: "0 0 2px",
                }}
              >
                ✓ Email sent to abc@gmail.com
              </p>
              <p
                style={{
                  color: "#555",
                  fontSize: 12,
                  margin: 0,
                }}
              >
                Interview meeting confirmed for 20th June · Saved to Sent
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
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && stage === "idle" && handleSend()
          }
          placeholder={EMAIL_EXAMPLE}
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
            onClick={handleSend}
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
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>
    </div>
  );
}