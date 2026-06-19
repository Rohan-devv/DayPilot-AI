"use client";

export function AiWorkspace() {
  return (
    <div
      style={{
        position: "relative",
        borderLeft: "1px solid #1e1e24",
        background: "#050816",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* AI Glow Strip */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "2px",
          height: "100%",
          background:
            "linear-gradient(to bottom,#06b6d4,#6366f1,#8b5cf6)",
          boxShadow: "0 0 25px #6366f1",
        }}
      />

      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #1e1e24",
          background:
            "radial-gradient(circle at top, rgba(99,102,241,.25), transparent 70%)",
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
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#6366f1,#06b6d4)",
              boxShadow:
                "0 0 30px rgba(99,102,241,.8)",
            }}
          />

          <div>
            <h2
              style={{
                margin: 0,
                color: "white",
                fontWeight: 700,
              }}
            >
              DayPilot AI
            </h2>

            <p
              style={{
                margin: 0,
                marginTop: "2px",
                color: "#818cf8",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              ACTIVE • CONNECTED
            </p>
          </div>
        </div>
      </div>

      {/* Empty Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          color: "#64748b",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        Start a conversation with DayPilot AI
      </div>

      {/* Quick Actions */}
      <div
        style={{
          padding: "14px",
          borderTop: "1px solid #1e1e24",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {[
          "Latest Emails ✨",
          "Summarize Inbox 🧠",
          "Draft Reply ⚡",
          "send emails 📧"
        ].map((item) => (
          <button
            key={item}
            style={{
              background:
                "linear-gradient(135deg,#1e293b,#111827)",
              border: "1px solid #3730a3",
              color: "white",
              padding: "8px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #1e1e24",
        }}
      >
        <div
          style={{
            background: "#13131a",
            border: "1px solid #2f3140",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow:
              "0 0 30px rgba(99,102,241,.12)",
          }}
        >
          <textarea
            placeholder="Send an email to abc@gmail.com for... "
            style={{
              width: "100%",
              minHeight: "120px",
              resize: "none",
              background: "transparent",
              border: "none",
              padding: "16px",
              color: "white",
              outline: "none",
              fontSize: "14px",
            }}
          />
        </div>
      </div>
    </div>
  );
}