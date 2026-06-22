"use client";

import { useState } from "react"; 
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Email = {
  type: "email";
  from: string;
  date: string;
  subject: string;
  snippet: string;
  attachments?: string[];
};

type ChatMessage = {
  role: "user" | "assistant";
  content?: string;
  emails?: Email[];
};  

function EmailCard({email}: {email: Email}) {
  const attachments = email.attachments ?? [];  

  console.log("type of data on frontend email component: ", typeof email)// string 

  console.log(email)  

//   {
//   "type": "email",
//   "from": "Excloud <no-reply@excloud.dev>",
//   "date": "Sat, 20 Jun 2026 11:00:25 +0000",
//   "subject": "Excloud | Resource summary for Rohan-ChaiCode",
//   "snippet": "Resource summary Rohan-ChaiCode Org #2078 · As of 2026-06-20 10:57 UTC Hi Rohan Pal, Here&#39;s a summary of resources currently active under Rohan-ChaiCode. 2 Compute 2 Volumes 0 Snapshots 0 IPv4",
//   "attachments": []
// }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-indigo-500/20 bg-slate-900/80 p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            From
          </p>

          <p className="mt-1 text-sm font-medium text-white break-all">
            {email.from}
          </p>
        </div>

        <p className="text-xs text-slate-500 shrink-0">
          {email.date}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-indigo-400">
          Subject
        </p>

        <h3 className="mt-1 text-lg font-semibold text-white">
          {email.subject}
        </h3>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {email.snippet}
      </p>

      {attachments.length > 0 && (
        <div className="mt-4 border-t border-slate-800 pt-4">
          <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
            Attachments
          </p>

          <div className="flex flex-wrap gap-2">
            {attachments.map((file) => (
              <div
                key={file}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200"
              >
                📎 {file}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AiWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

 async function handleSendMessage() {
  if (!input.trim() || loading) return;

  const currentInput = input;

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      content: currentInput,
    },
  ]);

  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: currentInput,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to call agent");
    }

    const data = await res.json();

    console.log("Agent Response:", data);

    if (data.type === "email_list") {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          emails: data.emails,
        },
      ]);

      return;
    }

    if (data.type === "message" || data.type === "summary") {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
        },
      ]);

      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "I couldn't understand the response format.",
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Something went wrong. Please try again.",
      },
    ]);
  } finally {
    setLoading(false);
  }
}

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

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              margin: "auto",
              color: "#64748b",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Start a conversation with DayPilot AI
          </div>
        )}

        {messages.map((msg, index) => {
  if (msg.role === "user") {
    return (
      <div
        key={index}
        className="flex justify-end"
      >
        <div className="max-w-[80%] rounded-2xl bg-indigo-600 px-4 py-3 text-white">
          {msg.content}
        </div>
      </div>
    );
  }  

 if (msg.content) {
  return (
    <div
      key={index}
      className="flex justify-start"
    >
      <div className="max-w-[85%] rounded-2xl border border-indigo-500/20 bg-slate-900/90 px-5 py-4 text-slate-200 shadow-lg">

        <div className="prose prose-invert prose-sm max-w-none">

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-4 text-2xl font-bold text-white">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="mb-3 mt-6 text-xl font-semibold text-indigo-300">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="mb-2 mt-5 text-lg font-semibold text-cyan-300">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
                <p className="mb-3 leading-7 text-slate-300">
                  {children}
                </p>
              ),

              strong: ({ children }) => (
                <strong className="font-semibold text-white">
                  {children}
                </strong>
              ),

              ul: ({ children }) => (
                <ul className="mb-4 ml-5 list-disc space-y-2">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="mb-4 ml-5 list-decimal space-y-3">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="text-slate-300">
                  {children}
                </li>
              ),

              blockquote: ({ children }) => (
                <blockquote className="my-4 border-l-4 border-indigo-500 pl-4 italic text-slate-400">
                  {children}
                </blockquote>
              ),

              code: ({ children }) => (
                <code className="rounded bg-slate-800 px-2 py-1 text-cyan-300">
                  {children}
                </code>
              ),

              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 underline"
                >
                  {children}
                </a>
              ),
            }}
          >
            {msg.content}
          </ReactMarkdown>

        </div>
      </div>
    </div>
  );
}

  if (msg.emails) {
    return (
      <div
        key={index}
        className="space-y-4"
      >
        {msg.emails.map((email) => (
          <EmailCard
            key={`${email.subject}-${email.date}`}
            email={email}
          />
        ))}
      </div>
    );
  }

  return null;
})}

     {loading && (
  <div className="flex justify-start">
    <div className="flex items-center gap-3 rounded-2xl border border-indigo-500/20 bg-slate-900 px-4 py-3">
      <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" />
      <div
        className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
        style={{ animationDelay: "0.15s" }}
      />
      <div
        className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
        style={{ animationDelay: "0.3s" }}
      />

      <span className="ml-2 text-sm text-slate-300">
        DayPilot AI is thinking...
      </span>
    </div>
  </div>
)}
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
          "Send Emails 📧",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setInput(item)}
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
            placeholder="Send an email to abc@gmail.com..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
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

          <div
            style={{
              padding: "12px",
              display: "flex",
              justifyContent: "flex-end",
              borderTop: "1px solid #2f3140",
            }}
          >
            <button
              onClick={handleSendMessage}
              disabled={loading}
              style={{
                background:
                  "linear-gradient(135deg,#6366f1,#06b6d4)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "10px 18px",
                cursor: "pointer",
                fontWeight: 600,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}