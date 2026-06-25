
"use client"
import { useState, useEffect, useRef } from "react";

// ── THEME: pure black + white + orange ──────────────────────────
// #000000  bg
// #0A0A0A  card bg
// #111111  input bg
// #1A1A1A  border
// #FF6B00  orange accent
// #FF8C33  orange hover
// #FFFFFF  primary text
// #999999  muted text

type EmailStage = "idle" | "thinking" | "composing" | "sent";

type CalendarStage = "idle" | "thinking" | "preview" | "confirmed";

type EmailDraft = {
  to: string;
  subject: string;
  body: string;
};

type CalendarEvent = {
  title: string;
  date: string;
  time: string;
  guests: string[];
  location: string;
  note: string;
};

function useTypewriter(text: string, speed = 22, active = true) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
  }, [text, active]);
  useEffect(() => {
    if (!active) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
    return () => clearTimeout(t);
  }, [active, displayed, text, speed]);
  return displayed;
}

// ── EMAIL CHATBOT DEMO ───────────────────────────────────────────
const EMAIL_EXAMPLE = "Send an email to abc@gmail.com for a meeting interview scheduled on 20th June";

function EmailChatDemo() {
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<EmailStage>("idle"); // idle | thinking | composing | sent
  const [showEmail, setShowEmail] = useState<EmailDraft | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const parsedEmail = {
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
    <div style={{ background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 16, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      {/* header */}
      <div style={{ background: "#111", borderBottom: "1px solid #1A1A1A", padding: "13px 18px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#333" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#333" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#333" }} />
        <span style={{ marginLeft: 10, fontSize: 12, color: "#555", letterSpacing: "0.03em" }}>DayPilot — Email Agent</span>
        <div style={{ marginLeft: "auto", background: "#1A0A00", border: "1px solid #FF6B0044", borderRadius: 6, padding: "2px 10px", fontSize: 11, color: "#FF6B00", fontWeight: 700, letterSpacing: "0.06em" }}>LIVE</div>
      </div>

      {/* chat area */}
      <div style={{ padding: 18, minHeight: 300 }}>

        {/* assistant intro message */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FF6B0022", border: "1px solid #FF6B0044", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: "0 12px 12px 12px", padding: "10px 14px", maxWidth: "80%" }}>
            <p style={{ color: "#ccc", fontSize: 13, margin: 0, lineHeight: 1.65 }}>Hey! Tell me who to email and why — I'll draft and send it for you.</p>
          </div>
        </div>

        {/* user message */}
        {stage !== "idle" && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <div style={{ background: "#FF6B00", borderRadius: "12px 0 12px 12px", padding: "10px 14px", maxWidth: "80%" }}>
              <p style={{ color: "#000", fontSize: 13, margin: 0, lineHeight: 1.65, fontWeight: 500 }}>{input}</p>
            </div>
          </div>
        )}

        {/* thinking */}
        {stage === "thinking" && (
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FF6B0022", border: "1px solid #FF6B0044", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: "0 12px 12px 12px", padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B00", animation: `bounce 1.2s ${i*0.2}s infinite` }} />
                ))}
                <span style={{ color: "#555", fontSize: 12, marginLeft: 8 }}>Drafting your email…</span>
              </div>
            </div>
          </div>
        )}

        {/* composed email preview */}
        {(stage === "composing" || stage === "sent") && showEmail && (
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FF6B0022", border: "1px solid #FF6B0044", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#666", fontSize: 12, marginBottom: 8 }}>Draft ready — review before I send:</p>
              <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ borderBottom: "1px solid #1A1A1A", padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <span style={{ color: "#444", fontSize: 11, fontWeight: 600, width: 50, textTransform: "uppercase" }}>To</span>
                    <span style={{ color: "#FF8C33", fontSize: 12 }}>{showEmail.to}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ color: "#444", fontSize: 11, fontWeight: 600, width: 50, textTransform: "uppercase" }}>Subject</span>
                    <span style={{ color: "#ddd", fontSize: 12 }}>{showEmail.subject}</span>
                  </div>
                </div>
                <div style={{ padding: "12px 14px", color: "#aaa", fontSize: 13, lineHeight: 1.75, whiteSpace: "pre-wrap", minHeight: 100 }}>
                  {stage === "sent" ? showEmail.body : emailBody}
                  {stage === "composing" && emailBody.length < showEmail.body.length && (
                    <span style={{ display: "inline-block", width: 2, height: 13, background: "#FF6B00", marginLeft: 2, animation: "blink 0.9s infinite" }} />
                  )}
                </div>
              </div>
              {stage === "composing" && emailBody.length >= showEmail.body.length && (
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={handleConfirmSend} style={{ background: "#FF6B00", color: "#000", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    Send now
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                  <button onClick={handleReset} style={{ background: "transparent", color: "#555", border: "1px solid #1A1A1A", borderRadius: 8, padding: "9px 14px", fontSize: 13, cursor: "pointer" }}>Edit</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* sent confirmation */}
        {stage === "sent" && (
          <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FF6B0022", border: "1px solid #FF6B0044", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div style={{ background: "#0D0D0D", border: "1px solid #FF6B0033", borderRadius: "0 12px 12px 12px", padding: "10px 14px" }}>
              <p style={{ color: "#FF8C33", fontSize: 13, fontWeight: 600, margin: "0 0 2px" }}>✓ Email sent to abc@gmail.com</p>
              <p style={{ color: "#555", fontSize: 12, margin: 0 }}>Interview meeting confirmed for 20th June · Saved to Sent</p>
            </div>
          </div>
        )}
      </div>

      {/* input bar */}
      <div style={{ borderTop: "1px solid #1A1A1A", padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && stage === "idle" && handleSend()}
          placeholder={EMAIL_EXAMPLE}
          disabled={stage !== "idle"}
          style={{ flex: 1, background: "#111", border: "1px solid #1A1A1A", borderRadius: 8, padding: "10px 14px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", opacity: stage !== "idle" ? 0.4 : 1 }}
        />
        {stage === "idle" ? (
          <button onClick={handleSend} disabled={!input.trim()} style={{ background: input.trim() ? "#FF6B00" : "#1A1A1A", color: input.trim() ? "#000" : "#333", border: "none", borderRadius: 8, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() ? "pointer" : "default", transition: "all 0.2s", flexShrink: 0 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        ) : (
          <button onClick={handleReset} style={{ background: "#1A1A1A", color: "#666", border: "none", borderRadius: 8, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
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

// ── CALENDAR CHATBOT DEMO ────────────────────────────────────────
const CAL_EXAMPLE = "Schedule a product review on 28th June at 3 PM with the design team";

function CalendarChatDemo() {
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<CalendarStage>("idle"); // idle | thinking | preview | confirmed
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
        note: "Parsed from: \"product review on 28th June at 3 PM with the design team\"",
      });
      setStage("preview");
    }, 1500);
  };

  const handleConfirm = () => setStage("confirmed");
  const handleReset = () => { setStage("idle"); setInput(""); setEvent(null); };

  return (
    <div style={{ background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 16, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: "#111", borderBottom: "1px solid #1A1A1A", padding: "13px 18px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#333" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#333" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#333" }} />
        <span style={{ marginLeft: 10, fontSize: 12, color: "#555", letterSpacing: "0.03em" }}>DayPilot — Calendar Agent</span>
        <div style={{ marginLeft: "auto", background: "#1A0A00", border: "1px solid #FF6B0044", borderRadius: 6, padding: "2px 10px", fontSize: 11, color: "#FF6B00", fontWeight: 700, letterSpacing: "0.06em" }}>LIVE</div>
      </div>

      <div style={{ padding: 18, minHeight: 300 }}>
        {/* intro */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FF6B0022", border: "1px solid #FF6B0044", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: "0 12px 12px 12px", padding: "10px 14px", maxWidth: "80%" }}>
            <p style={{ color: "#ccc", fontSize: 13, margin: 0, lineHeight: 1.65 }}>Tell me what to schedule — date, time, who's joining. I'll create the event and send invites.</p>
          </div>
        </div>

        {/* user bubble */}
        {stage !== "idle" && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <div style={{ background: "#FF6B00", borderRadius: "12px 0 12px 12px", padding: "10px 14px", maxWidth: "80%" }}>
              <p style={{ color: "#000", fontSize: 13, margin: 0, lineHeight: 1.65, fontWeight: 500 }}>{input}</p>
            </div>
          </div>
        )}

        {/* thinking */}
        {stage === "thinking" && (
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FF6B0022", border: "1px solid #FF6B0044", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: "0 12px 12px 12px", padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B00", animation: `bounce 1.2s ${i*0.2}s infinite` }} />
                ))}
                <span style={{ color: "#555", fontSize: 12, marginLeft: 8 }}>Parsing details and checking calendar…</span>
              </div>
            </div>
          </div>
        )}

        {/* event preview */}
        {(stage === "preview" || stage === "confirmed") && event && (
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FF6B0022", border: "1px solid #FF6B0044", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#666", fontSize: 12, marginBottom: 8 }}>Here's what I'll create — confirm to add to your calendar:</p>
              <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 10, overflow: "hidden" }}>
                {/* event card header */}
                <div style={{ background: "#FF6B0011", borderBottom: "1px solid #1A1A1A", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: "#FF6B00", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                    <span style={{ fontSize: 9, color: "#000", fontWeight: 700, textTransform: "uppercase" }}>JUN</span>
                    <span style={{ fontSize: 16, color: "#000", fontWeight: 700 }}>28</span>
                  </div>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>{event.title}</p>
                    <p style={{ color: "#888", fontSize: 12, margin: 0 }}>{event.date}</p>
                  </div>
                </div>
                {/* details */}
                <div style={{ padding: "12px 14px" }}>
                  {[
                    { icon: "🕒", label: event.time },
                    { icon: "👥", label: event.guests.join(", ") },
                    { icon: "📍", label: event.location },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 2 ? 8 : 0 }}>
                      <span style={{ fontSize: 13 }}>{row.icon}</span>
                      <span style={{ color: "#888", fontSize: 12, lineHeight: 1.5 }}>{row.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid #1A1A1A", padding: "8px 14px" }}>
                  <p style={{ color: "#333", fontSize: 11, margin: 0, fontStyle: "italic" }}>{event.note}</p>
                </div>
              </div>
              {stage === "preview" && (
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={handleConfirm} style={{ background: "#FF6B00", color: "#000", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    Add to Calendar
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </button>
                  <button onClick={handleReset} style={{ background: "transparent", color: "#555", border: "1px solid #1A1A1A", borderRadius: 8, padding: "9px 14px", fontSize: 13, cursor: "pointer" }}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* confirmed */}
        {stage === "confirmed" && (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FF6B0022", border: "1px solid #FF6B0044", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div style={{ background: "#0D0D0D", border: "1px solid #FF6B0033", borderRadius: "0 12px 12px 12px", padding: "10px 14px" }}>
              <p style={{ color: "#FF8C33", fontWeight: 600, fontSize: 13, margin: "0 0 2px" }}>✓ Event added to Google Calendar</p>
              <p style={{ color: "#555", fontSize: 12, margin: 0 }}>Invites sent to design@team.co · Meet link attached · Reminder set for 30 min before</p>
            </div>
          </div>
        )}
      </div>

      {/* input bar */}
      <div style={{ borderTop: "1px solid #1A1A1A", padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && stage === "idle" && handleSchedule()}
          placeholder={CAL_EXAMPLE}
          disabled={stage !== "idle"}
          style={{ flex: 1, background: "#111", border: "1px solid #1A1A1A", borderRadius: 8, padding: "10px 14px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", opacity: stage !== "idle" ? 0.4 : 1 }}
        />
        {stage === "idle" ? (
          <button onClick={handleSchedule} disabled={!input.trim()} style={{ background: input.trim() ? "#FF6B00" : "#1A1A1A", color: input.trim() ? "#000" : "#333", border: "none", borderRadius: 8, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() ? "pointer" : "default", transition: "all 0.2s", flexShrink: 0 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        ) : (
          <button onClick={handleReset} style={{ background: "#1A1A1A", color: "#666", border: "none", borderRadius: 8, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ── REST OF PAGE ─────────────────────────────────────────────────

const TESTIMONIALS = [
  { name: "Priya Nair", role: "Head of Partnerships, Series B startup", avatar: "PN", quote: "DayPilot reads my email threads and drafts replies that sound exactly like me. I've cut my inbox time by half." },
  { name: "Marcus Webb", role: "CEO, Webb Consulting", avatar: "MW", quote: "The calendar intelligence is uncanny. It spots scheduling conflicts I'd have missed and handles the back-and-forth automatically." },
  { name: "Leila Santos", role: "VP Operations, Fintech co.", avatar: "LS", quote: "We deployed DayPilot across the exec team. Meeting prep, follow-ups, agenda summaries — it runs the whole rhythm." },
  { name: "Tom Fujimoto", role: "Independent Consultant", avatar: "TF", quote: "As a solo operator, this tool is like having a full-time EA. Affordable, always on, never loses context." },
];

const FEATURES = [
  { icon: <svg width="20" height="20" fill="none" stroke="#FF6B00" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, title: "Natural language email", desc: "Just say who to email and why. DayPilot writes, formats, and sends — no fields to fill, no subject line to craft.", tag: "Email Agent" },
  { icon: <svg width="20" height="20" fill="none" stroke="#FF6B00" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, title: "Instant scheduling", desc: "Tell it when and who — it finds the slot, creates the event, sends invites, and attaches a Meet link. One sentence.", tag: "Calendar Agent" },
  { icon: <svg width="20" height="20" fill="none" stroke="#FF6B00" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>, title: "Tone-matched drafts", desc: "References your previous emails to match your voice — not a generic AI tone, but how you actually write.", tag: "AI Writing" },
  { icon: <svg width="20" height="20" fill="none" stroke="#FF6B00" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Secure OAuth only", desc: "No passwords stored. Your data stays inside Google's infrastructure. We only read what you authorize, nothing more.", tag: "Privacy" },
  { icon: <svg width="20" height="20" fill="none" stroke="#FF6B00" strokeWidth="1.8" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, title: "Priority inbox scoring", desc: "Learns which threads need your reply today vs. next week. Cuts the noise so your attention goes where it matters.", tag: "Smart Filter" },
  { icon: <svg width="20" height="20" fill="none" stroke="#FF6B00" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, title: "Pre-meeting briefs", desc: "Before every event, get a one-page context pack: recent emails, open threads, and suggested talking points.", tag: "Prep Kit" },
];

const STATS = [
  { value: "4.2h", label: "Saved per week, on average" },
  { value: "91%", label: "Drafts sent without edits" },
  { value: "3×", label: "Faster scheduling" },
  { value: "10k+", label: "Professionals onboarded" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Connect your workspace", body: "Link Gmail and Google Calendar via OAuth in under 45 seconds. No passwords, no third-party data storage." },
  { step: "02", title: "Just type what you need", body: "Send an email, schedule a meeting, get a briefing — all in plain English. No forms, no dropdowns, no clicking around." },
  { step: "03", title: "DayPilot handles the rest", body: "It drafts, sends, schedules, and confirms. Your inbox and calendar stay organized without you lifting a finger." },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#000", color: "#F9FAFB", fontFamily: "'Inter', -apple-system, sans-serif", minHeight: "100vh", lineHeight: 1.6 }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link { color: #666; text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }
        .btn-primary { background: #FF6B00; color: #000; border: none; border-radius: 10px; padding: 13px 28px; font-size: 15px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; font-family: inherit; text-decoration: none; }
        .btn-primary:hover { background: #FF8C33; transform: translateY(-1px); }
        .btn-secondary { background: transparent; color: #ccc; border: 1px solid #1A1A1A; border-radius: 10px; padding: 12px 24px; font-size: 15px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; font-family: inherit; text-decoration: none; }
        .btn-secondary:hover { border-color: #333; background: rgba(255,255,255,0.03); color: #fff; }
        .section { max-width: 1140px; margin: 0 auto; padding: 0 24px; }
        .feature-card:hover { border-color: #2A2A2A !important; }
        @media (max-width: 768px) {
          .demo-grid { grid-template-columns: 1fr !important; }
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .feature-grid { grid-template-columns: 1fr !important; }
          .how-grid { grid-template-columns: 1fr !important; border-radius: 14px !important; }
          .how-cell { border-radius: 0 !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: scrolled ? "rgba(0,0,0,0.95)" : "transparent", backdropFilter: "blur(20px)", borderBottom: scrolled ? "1px solid #111" : "1px solid transparent", transition: "all 0.3s", padding: "0 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "#FF6B00", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="17" height="17" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", color: "#fff" }}>DayPilot AI</span>
          </div>
          <div style={{ display: "flex", gap: 34, alignItems: "center" }}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how" className="nav-link">How it works</a>
            <a href="#testimonials" className="nav-link">Reviews</a>
            <a href="#pricing" className="nav-link">Pricing</a>
          </div>
          <a href="/login" className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>Get started free</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 88, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section">
          <div style={{ maxWidth: 760, marginBottom: 72 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B00" }} />
              <span style={{ fontSize: 13, color: "#FF8C33", fontWeight: 500 }}>Now in public beta — free for 14 days</span>
            </div>

            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(48px, 7vw, 84px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "#fff", marginBottom: 28, fontWeight: 400 }}>
              Your inbox runs{" "}
              <span style={{ fontStyle: "italic", color: "#FF6B00" }}>you</span>.
              <br />Time to reverse that.
            </h1>

            <p style={{ fontSize: 19, color: "#888", lineHeight: 1.75, maxWidth: 560, marginBottom: 40 }}>
              Type one sentence. DayPilot sends the email, schedules the meeting, and briefs you before you walk in — all from a single chat interface.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="/login" className="btn-primary">
                Start for free
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a href="#demo" className="btn-secondary">See it in action</a>
            </div>
            <p style={{ marginTop: 18, fontSize: 13, color: "#333" }}>No credit card · Connects in 45 seconds · Works with your existing Gmail</p>
          </div>

          {/* STATS */}
          <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: "#0A0A0A", border: "1px solid #111", borderRadius: 14, padding: "20px 22px" }}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 40, fontWeight: 400, color: "#FF6B00", lineHeight: 1.1, marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMO */}
      <section id="demo" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="section">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#FF6B00", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Live demo</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 5vw, 54px)", color: "#fff", fontWeight: 400, lineHeight: 1.1, marginBottom: 14 }}>One sentence. That's all it takes.</h2>
            <p style={{ color: "#666", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>Type a command below. These demos are fully interactive — try them yourself.</p>
          </div>

          <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, background: "#FF6B0015", border: "1px solid #FF6B0030", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>Send an email</p>
                  <p style={{ color: "#444", fontSize: 12, margin: 0 }}>Natural language → drafted → sent</p>
                </div>
              </div>
              <EmailChatDemo />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, background: "#FF6B0015", border: "1px solid #FF6B0030", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" fill="none" stroke="#FF6B00" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>Schedule an event</p>
                  <p style={{ color: "#444", fontSize: 12, margin: 0 }}>Describe it → parsed → added to Calendar</p>
                </div>
              </div>
              <CalendarChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ paddingTop: 100, paddingBottom: 100, borderTop: "1px solid #0A0A0A" }}>
        <div className="section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ color: "#FF6B00", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Process</p>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(30px, 4vw, 48px)", color: "#fff", fontWeight: 400, lineHeight: 1.15 }}>Up and running in 45 seconds</h2>
            </div>
            <a href="/login" className="btn-secondary" style={{ fontSize: 14 }}>Connect now →</a>
          </div>
          <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, borderRadius: 16, overflow: "hidden" }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div className="how-cell" key={i} style={{ background: "#0A0A0A", border: "1px solid #111", padding: "36px 30px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 20, right: 20, fontFamily: "'Instrument Serif', serif", fontSize: 72, color: "#111", fontWeight: 400, lineHeight: 1, userSelect: "none" }}>{step.step}</div>
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 56, color: "#FF6B00", lineHeight: 1, marginBottom: 20, fontWeight: 400 }}>{step.step}</p>
                <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 600, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: "#555", fontSize: 14, lineHeight: 1.75 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="section">
          <div style={{ marginBottom: 60 }}>
            <p style={{ color: "#FF6B00", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Features</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(30px, 4vw, 52px)", color: "#fff", fontWeight: 400, lineHeight: 1.1, maxWidth: 520 }}>Everything your executive assistant would do</h2>
          </div>
          <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card" style={{ background: "#0A0A0A", border: "1px solid #111", borderRadius: 16, padding: 28, transition: "border-color 0.2s", cursor: "default" }}>
                <div style={{ width: 42, height: 42, background: "#111", border: "1px solid #1A1A1A", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  {f.icon}
                </div>
                <div style={{ display: "inline-block", background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.18)", borderRadius: 100, padding: "3px 10px", fontSize: 11, color: "#FF8C33", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 12 }}>{f.tag}</div>
                <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: "#555", fontSize: 14, lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ paddingTop: 100, paddingBottom: 100, borderTop: "1px solid #0A0A0A" }}>
        <div className="section">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#FF6B00", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Reviews</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(30px, 4vw, 52px)", color: "#fff", fontWeight: 400, lineHeight: 1.1 }}>Used by people who value their time</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#0A0A0A", border: "1px solid #111", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#FF6B0015", border: "1px solid #FF6B0030", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#FF6B00" }}>{t.avatar}</div>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>{t.name}</p>
                    <p style={{ color: "#444", fontSize: 12, margin: 0 }}>{t.role}</p>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                    {[...Array(5)].map((_, j) => <svg key={j} width="13" height="13" fill="#FF6B00" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  </div>
                </div>
                <p style={{ color: "#777", fontSize: 14, lineHeight: 1.75, margin: 0 }}>"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="section">
          <div style={{ background: "#0A0A0A", border: "1px solid #111", borderRadius: 20, padding: "48px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
              <div style={{ maxWidth: 420 }}>
                <p style={{ color: "#FF6B00", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Integrations</p>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px, 3.5vw, 44px)", color: "#fff", fontWeight: 400, lineHeight: 1.15, marginBottom: 14 }}>Plugs into what you already use</h2>
                <p style={{ color: "#555", fontSize: 15, lineHeight: 1.75 }}>No new apps to learn. DayPilot works inside Google's ecosystem, with your data exactly where it's always been.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                {[{ name: "Gmail", icon: "M", color: "#EA4335" }, { name: "Google Calendar", icon: "C", color: "#4285F4" }, { name: "Google Drive", icon: "D", color: "#34A853" }, { name: "Google Meet", icon: "M", color: "#00897B" }].map((int, i) => (
                  <div key={i} style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${int.color}18`, border: `1px solid ${int.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: int.color }}>{int.icon}</div>
                    <span style={{ color: "#bbb", fontSize: 13, fontWeight: 500 }}>{int.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="section">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ color: "#FF6B00", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Pricing</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(30px, 4vw, 52px)", color: "#fff", fontWeight: 400, lineHeight: 1.1 }}>Simple, honest pricing</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, maxWidth: 880, margin: "0 auto" }}>
            {[
              { name: "Starter", price: "$0", period: "14-day trial", features: ["Gmail drafts", "Calendar scheduling", "Daily inbox brief", "Up to 50 emails/day"], cta: "Start free", highlight: false },
              { name: "Pro", price: "$24", period: "per month", features: ["Everything in Starter", "Unlimited emails", "CRM sync (HubSpot)", "Priority scoring AI", "Custom voice & tone"], cta: "Get Pro", highlight: true },
              { name: "Team", price: "$18", period: "per user / month", features: ["Everything in Pro", "Shared inbox rules", "Team briefings", "Admin dashboard", "SSO + audit logs"], cta: "Contact sales", highlight: false },
            ].map((plan, i) => (
              <div key={i} style={{ background: plan.highlight ? "#0D0700" : "#0A0A0A", border: `1px solid ${plan.highlight ? "#FF6B0055" : "#111"}`, borderRadius: 16, padding: 26, position: "relative" }}>
                {plan.highlight && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "#FF6B00", borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, color: "#000", whiteSpace: "nowrap" }}>Most popular</div>}
                <p style={{ color: "#666", fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{plan.name}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 42, color: plan.highlight ? "#FF6B00" : "#fff", fontWeight: 400 }}>{plan.price}</span>
                  <span style={{ color: "#333", fontSize: 13 }}>/{plan.period}</span>
                </div>
                <div style={{ borderTop: "1px solid #111", marginTop: 20, paddingTop: 18, marginBottom: 22 }}>
                  {plan.features.map((feat, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <svg width="13" height="13" fill="none" stroke="#FF6B00" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ color: "#666", fontSize: 13 }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <button style={{ width: "100%", background: plan.highlight ? "#FF6B00" : "transparent", color: plan.highlight ? "#000" : "#888", border: `1px solid ${plan.highlight ? "#FF6B00" : "#1A1A1A"}`, borderRadius: 9, padding: 12, fontSize: 14, fontWeight: plan.highlight ? 700 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="section">
          <div style={{ background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 24, padding: "72px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <p style={{ position: "relative", color: "#FF6B00", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>Get started today</p>
            <h2 style={{ position: "relative", fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px, 5vw, 68px)", color: "#fff", fontWeight: 400, lineHeight: 1.08, marginBottom: 18, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
              Take back 4 hours.<br /><span style={{ color: "#FF6B00", fontStyle: "italic" }}>Every week.</span>
            </h2>
            <p style={{ position: "relative", color: "#555", fontSize: 17, maxWidth: 420, margin: "0 auto 40px", lineHeight: 1.75 }}>Connect Gmail and Google Calendar in under a minute. No credit card. Cancel anytime.</p>
            <div style={{ position: "relative", display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/login" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
                Start free trial
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a href="#demo" className="btn-secondary" style={{ fontSize: 16, padding: "14px 28px" }}>Watch the demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #0A0A0A", padding: "36px 24px" }}>
        <div className="section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 26, height: 26, background: "#FF6B00", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <span style={{ color: "#333", fontSize: 13 }}>© 2026 DayPilot AI</span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Privacy", "Terms", "Security", "Contact"].map(link => (
              <a key={link} href="#" style={{ color: "#2A2A2A", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#666"}
                onMouseLeave={e => e.currentTarget.style.color = "#2A2A2A"}
              >{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
