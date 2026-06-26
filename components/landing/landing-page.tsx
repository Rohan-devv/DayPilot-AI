"use client";
import { useState, useEffect } from "react";
import { EmailChatDemo } from "./email-chat-demo";
import { CalendarChatDemo } from "./calendar-chat-demo";
import {
  TESTIMONIALS,
  FEATURES,
  STATS,
  HOW_IT_WORKS,
} from "./constants";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      style={{
        background: "#000",
        color: "#F9FAFB",
        fontFamily: "'Inter', -apple-system, sans-serif",
        minHeight: "100vh",
        lineHeight: 1.6,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />
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
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid #111" : "1px solid transparent",
          transition: "all 0.3s",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                background: "#FF6B00",
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="17"
                height="17"
                fill="none"
                stroke="#000"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
            >
              DayPilot AI
            </span>
          </div>
          <div style={{ display: "flex", gap: 34, alignItems: "center" }}>
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#how" className="nav-link">
              How it works
            </a>
            <a href="#testimonials" className="nav-link">
              Reviews
            </a>
            <a href="#pricing" className="nav-link">
              Pricing
            </a>
          </div>
          <a
            href="/login"
            className="btn-primary"
            style={{ padding: "9px 20px", fontSize: 14 }}
          >
            Get started free
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          paddingTop: 88,
          paddingBottom: 80,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="section">
          <div style={{ maxWidth: 760, marginBottom: 72 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,107,0,0.08)",
                border: "1px solid rgba(255,107,0,0.2)",
                borderRadius: 100,
                padding: "6px 16px",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FF6B00",
                }}
              />
              <span
                style={{ fontSize: 13, color: "#FF8C33", fontWeight: 500 }}
              >
                Now in public beta — free for 14 days
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(48px, 7vw, 84px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "#fff",
                marginBottom: 28,
                fontWeight: 400,
              }}
            >
              Your inbox runs{" "}
              <span style={{ fontStyle: "italic", color: "#FF6B00" }}>you</span>
              .
              <br />
              Time to reverse that.
            </h1>

            <p
              style={{
                fontSize: 19,
                color: "#888",
                lineHeight: 1.75,
                maxWidth: 560,
                marginBottom: 40,
              }}
            >
              Type one sentence. DayPilot sends the email, schedules the
              meeting, and briefs you before you walk in — all from a single
              chat interface.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="/login" className="btn-primary">
                Start for free
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
              </a>
              <a href="#demo" className="btn-secondary">
                See it in action
              </a>
            </div>
            <p style={{ marginTop: 18, fontSize: 13, color: "#333" }}>
              No credit card · Connects in 45 seconds · Works with your
              existing Gmail
            </p>
          </div>

          {/* STATS */}
          <div
            className="stat-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "#0A0A0A",
                  border: "1px solid #111",
                  borderRadius: 14,
                  padding: "20px 22px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 40,
                    fontWeight: 400,
                    color: "#FF6B00",
                    lineHeight: 1.1,
                    marginBottom: 6,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMO */}
      <section id="demo" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="section">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                color: "#FF6B00",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Live demo
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(32px, 5vw, 54px)",
                color: "#fff",
                fontWeight: 400,
                lineHeight: 1.1,
                marginBottom: 14,
              }}
            >
              One sentence. That's all it takes.
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: 16,
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              Type a command below. These demos are fully interactive — try them
              yourself.
            </p>
          </div>

          <div
            className="demo-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    background: "#FF6B0015",
                    border: "1px solid #FF6B0030",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                <div>
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      margin: 0,
                    }}
                  >
                    Send an email
                  </p>
                  <p style={{ color: "#444", fontSize: 12, margin: 0 }}>
                    Natural language → drafted → sent
                  </p>
                </div>
              </div>
              <EmailChatDemo />
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    background: "#FF6B0015",
                    border: "1px solid #FF6B0030",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                <div>
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      margin: 0,
                    }}
                  >
                    Schedule an event
                  </p>
                  <p style={{ color: "#444", fontSize: 12, margin: 0 }}>
                    Describe it → parsed → added to Calendar
                  </p>
                </div>
              </div>
              <CalendarChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        style={{
          paddingTop: 100,
          paddingBottom: 100,
          borderTop: "1px solid #0A0A0A",
        }}
      >
        <div className="section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <p
                style={{
                  color: "#FF6B00",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Process
              </p>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(30px, 4vw, 48px)",
                  color: "#fff",
                  fontWeight: 400,
                  lineHeight: 1.15,
                }}
              >
                Up and running in 45 seconds
              </h2>
            </div>
            <a
              href="/login"
              className="btn-secondary"
              style={{ fontSize: 14 }}
            >
              Connect now →
            </a>
          </div>
          <div
            className="how-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {HOW_IT_WORKS.map((step, i) => (
              <div
                className="how-cell"
                key={i}
                style={{
                  background: "#0A0A0A",
                  border: "1px solid #111",
                  padding: "36px 30px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 72,
                    color: "#111",
                    fontWeight: 400,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {step.step}
                </div>
                <p
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 56,
                    color: "#FF6B00",
                    lineHeight: 1,
                    marginBottom: 20,
                    fontWeight: 400,
                  }}
                >
                  {step.step}
                </p>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: 17,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "#555",
                    fontSize: 14,
                    lineHeight: 1.75,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        style={{ paddingTop: 100, paddingBottom: 100 }}
      >
        <div className="section">
          <div style={{ marginBottom: 60 }}>
            <p
              style={{
                color: "#FF6B00",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Features
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(30px, 4vw, 52px)",
                color: "#fff",
                fontWeight: 400,
                lineHeight: 1.1,
                maxWidth: 520,
              }}
            >
              Everything your executive assistant would do
            </h2>
          </div>
          <div
            className="feature-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="feature-card"
                style={{
                  background: "#0A0A0A",
                  border: "1px solid #111",
                  borderRadius: 16,
                  padding: 28,
                  transition: "border-color 0.2s",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    background: "#111",
                    border: "1px solid #1A1A1A",
                    borderRadius: 11,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(255,107,0,0.08)",
                    border: "1px solid rgba(255,107,0,0.18)",
                    borderRadius: 100,
                    padding: "3px 10px",
                    fontSize: 11,
                    color: "#FF8C33",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    marginBottom: 12,
                  }}
                >
                  {f.tag}
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "#555",
                    fontSize: 14,
                    lineHeight: 1.75,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        style={{
          paddingTop: 100,
          paddingBottom: 100,
          borderTop: "1px solid #0A0A0A",
        }}
      >
        <div className="section">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                color: "#FF6B00",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Reviews
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(30px, 4vw, 52px)",
                color: "#fff",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Used by people who value their time
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 14,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "#0A0A0A",
                  border: "1px solid #111",
                  borderRadius: 16,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "#FF6B0015",
                      border: "1px solid #FF6B0030",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#FF6B00",
                    }}
                  >
                    {t.avatar}
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
                      {t.name}
                    </p>
                    <p
                      style={{
                        color: "#444",
                        fontSize: 12,
                        margin: 0,
                      }}
                    >
                      {t.role}
                    </p>
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        width="13"
                        height="13"
                        fill="#FF6B00"
                        viewBox="0 0 24 24"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p
                  style={{
                    color: "#777",
                    fontSize: 14,
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="section">
          <div
            style={{
              background: "#0A0A0A",
              border: "1px solid #111",
              borderRadius: 20,
              padding: "48px 40px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 32,
              }}
            >
              <div style={{ maxWidth: 420 }}>
                <p
                  style={{
                    color: "#FF6B00",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Integrations
                </p>
                <h2
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(28px, 3.5vw, 44px)",
                    color: "#fff",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    marginBottom: 14,
                  }}
                >
                  Plugs into what you already use
                </h2>
                <p
                  style={{
                    color: "#555",
                    fontSize: 15,
                    lineHeight: 1.75,
                  }}
                >
                  No new apps to learn. DayPilot works inside Google's
                  ecosystem, with your data exactly where it's always been.
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 10,
                }}
              >
                {[
                  { name: "Gmail", icon: "M", color: "#EA4335" },
                  { name: "Google Calendar", icon: "C", color: "#4285F4" },
                  { name: "Google Drive", icon: "D", color: "#34A853" },
                  { name: "Google Meet", icon: "M", color: "#00897B" },
                ].map((int, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#111",
                      border: "1px solid #1A1A1A",
                      borderRadius: 12,
                      padding: "14px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: `${int.color}18`,
                        border: `1px solid ${int.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        color: int.color,
                      }}
                    >
                      {int.icon}
                    </div>
                    <span
                      style={{
                        color: "#bbb",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {int.name}
                    </span>
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
            <p
              style={{
                color: "#FF6B00",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Pricing
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(30px, 4vw, 52px)",
                color: "#fff",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Simple, honest pricing
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
              maxWidth: 880,
              margin: "0 auto",
            }}
          >
            {[
              {
                name: "Starter",
                price: "$0",
                period: "14-day trial",
                features: [
                  "Gmail drafts",
                  "Calendar scheduling",
                  "Daily inbox brief",
                  "Up to 50 emails/day",
                ],
                cta: "Start free",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$24",
                period: "per month",
                features: [
                  "Everything in Starter",
                  "Unlimited emails",
                  "CRM sync (HubSpot)",
                  "Priority scoring AI",
                  "Custom voice & tone",
                ],
                cta: "Get Pro",
                highlight: true,
              },
              {
                name: "Team",
                price: "$18",
                period: "per user / month",
                features: [
                  "Everything in Pro",
                  "Shared inbox rules",
                  "Team briefings",
                  "Admin dashboard",
                  "SSO + audit logs",
                ],
                cta: "Contact sales",
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                style={{
                  background: plan.highlight ? "#0D0700" : "#0A0A0A",
                  border: `1px solid ${plan.highlight ? "#FF6B0055" : "#111"}`,
                  borderRadius: 16,
                  padding: 26,
                  position: "relative",
                }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -11,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#FF6B00",
                      borderRadius: 100,
                      padding: "4px 14px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most popular
                  </div>
                )}
                <p
                  style={{
                    color: "#666",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                >
                  {plan.name}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: 42,
                      color: plan.highlight ? "#FF6B00" : "#fff",
                      fontWeight: 400,
                    }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ color: "#333", fontSize: 13 }}>
                    /{plan.period}
                  </span>
                </div>
                <div
                  style={{
                    borderTop: "1px solid #111",
                    marginTop: 20,
                    paddingTop: 18,
                    marginBottom: 22,
                  }}
                >
                  {plan.features.map((feat, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        fill="none"
                        stroke="#FF6B00"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: "#666", fontSize: 13 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  style={{
                    width: "100%",
                    background: plan.highlight ? "#FF6B00" : "transparent",
                    color: plan.highlight ? "#000" : "#888",
                    border: `1px solid ${plan.highlight ? "#FF6B00" : "#1A1A1A"}`,
                    borderRadius: 9,
                    padding: 12,
                    fontSize: 14,
                    fontWeight: plan.highlight ? 700 : 500,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
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
          <div
            style={{
              background: "#0A0A0A",
              border: "1px solid #1A1A1A",
              borderRadius: 24,
              padding: "72px 60px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 600,
                height: 300,
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <p
              style={{
                position: "relative",
                color: "#FF6B00",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Get started today
            </p>
            <h2
              style={{
                position: "relative",
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(36px, 5vw, 68px)",
                color: "#fff",
                fontWeight: 400,
                lineHeight: 1.08,
                marginBottom: 18,
                maxWidth: 680,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Take back 4 hours.
              <br />
              <span style={{ color: "#FF6B00", fontStyle: "italic" }}>
                Every week.
              </span>
            </h2>
            <p
              style={{
                position: "relative",
                color: "#555",
                fontSize: 17,
                maxWidth: 420,
                margin: "0 auto 40px",
                lineHeight: 1.75,
              }}
            >
              Connect Gmail and Google Calendar in under a minute. No credit
              card. Cancel anytime.
            </p>
            <div
              style={{
                position: "relative",
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/login"
                className="btn-primary"
                style={{ fontSize: 16, padding: "14px 32px" }}
              >
                Start free trial
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
              </a>
              <a
                href="#demo"
                className="btn-secondary"
                style={{ fontSize: 16, padding: "14px 28px" }}
              >
                Watch the demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{ borderTop: "1px solid #0A0A0A", padding: "36px 24px" }}
      >
        <div
          className="section"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 26,
                height: 26,
                background: "#FF6B00",
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="13"
                height="13"
                fill="none"
                stroke="#000"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span style={{ color: "#333", fontSize: 13 }}>
              © 2026 DayPilot AI
            </span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Privacy", "Terms", "Security", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  color: "#2A2A2A",
                  fontSize: 13,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#666")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#2A2A2A")
                }
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}