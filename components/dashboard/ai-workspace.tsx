"use client";

import {
  Bot,
  CheckCircle2,
  Inbox,
  Paperclip,
  PenLine,
  Search,
  Send,
  Sparkles,
  Zap,
} from "lucide-react"; 

import { useState, useEffect } from "react";
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

const quickActions = [
  {
    label: "Latest emails",
    prompt: "Latest Emails",
    icon: Search,
  },
  {
    label: "Summarize inbox",
    prompt: "Summarize Inbox",
    icon: Sparkles,
  },
  {
    label: "Draft reply",
    prompt: "Draft Reply",
    icon: PenLine,
  },
  {
    label: "Send email",
    prompt: "Send Emails",
    icon: Send,
  },
];

function EmailCard({ email }: { email: Email }) {
  const attachments = email.attachments ?? []; 
  
  return (
    <div className="w-full rounded-lg border border-zinc-800/90 bg-zinc-950/75 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            From
          </p>

          <p className="mt-1 break-all text-sm font-medium text-zinc-100">
            {email.from}
          </p>
        </div>

        <p className="shrink-0 text-right text-xs text-zinc-500">
          {email.date}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">
          Subject
        </p>

        <h3 className="mt-1 text-base font-semibold leading-6 text-white">
          {email.subject}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {email.snippet}
      </p>

      {attachments.length > 0 && (
        <div className="mt-4 border-t border-zinc-800 pt-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Attachments
          </p>

          <div className="flex flex-wrap gap-2">
            {attachments.map((file) => (
              <div
                key={file}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/80 bg-zinc-900 px-3 py-2 text-sm text-zinc-200"
              >
                <Paperclip className="h-3.5 w-3.5 text-violet-300" />
                <span>{file}</span>
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


  const [connections, setConnections] =
  useState({
    gmailConnected: false,
    calendarConnected: false,
  });    

  useEffect(() => {
  async function loadStatus() {
    try {
      const res = await fetch(
        "/api/onboarding/status"
      );

      const data = await res.json();

      setConnections(data);
    } catch (error) {
      console.error(error);
    }
  }

  loadStatus();
}, []); 


  

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
          content: "I couldn't understand the response format.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  } 

  async function handleDissconnectCalendar(){
       const res = await fetch("/api/disconnectCalendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: (JSON.stringify({plugin: "googlecalendar"})) 

       })  

       const data = await res.json() 

       console.log(data)
       window.location.reload()
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden border-l border-zinc-800 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_32%),linear-gradient(180deg,#0b0b0f_0%,#07070a_52%,#050506_100%)] text-zinc-100">
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-400/80 via-zinc-700 to-transparent" />

       {/* Header — Gmail dot + agent label */}
    <div className="mb-5 flex justify-center">
  <div
    className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-green-500/20
      bg-green-500/10
      px-4
      py-2
      backdrop-blur-md
    "
  >
    <span className="relative flex h-[10px] w-[10px]">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex h-[10px] w-[10px] rounded-full bg-green-500" />
    </span>

    <span className="text-[13px] font-medium text-green-400">
      {connections.gmailConnected &&
      connections.calendarConnected
        ? "Gmail & Calendar Connected"
        : connections.gmailConnected
        ? "Gmail Connected"
        : connections.calendarConnected
        ? "Calendar Connected"
        : "No Integrations Connected"}
    </span>
  </div>
</div>  

<div className="flex justify-center gap-2 mb-4">
  {connections.gmailConnected && (
    <button
      onClick={async () => {
        const res = await fetch(
          "/api/disconnectGmail",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              plugin: "gmail",
            }),
          }
        );

        const data =
          await res.json();

        console.log(data);

        window.location.reload();
      }}
      className="
        px-3 py-1.5
        rounded-lg
        text-xs
        bg-red-500/10
        border
        border-red-500/20
        text-red-400
      "
    >
      Disconnect Gmail
    </button>
  )}

  {connections.calendarConnected && (
    <button
      onClick={handleDissconnectCalendar}
      className="
        px-3 py-1.5
        rounded-lg
        text-xs
        bg-red-500/10
        border
        border-red-500/20
        text-red-400
      "
    >
      Disconnect Calendar
    </button>
  )}
</div>
   <br /> 
     <hr />

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div className="m-auto flex max-w-[280px] flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
              <Sparkles className="h-5 w-5 text-violet-300" />
            </div>
            <p className="text-sm font-medium text-zinc-300">
              Start a conversation with DayPilot AI
            </p>
            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Ask for inbox summaries, email drafts, or a quick read on your latest mail.
            </p>
          </div>
        )}

        {messages.map((msg, index) => {
          if (msg.role === "user") {
            return (
              <div
                key={index}
                className="flex justify-end"
              >
                <div className="max-w-[82%] rounded-lg border border-violet-300/20 bg-violet-500/20 px-4 py-3 text-sm leading-6 text-violet-50 shadow-[0_16px_40px_rgba(76,29,149,0.24)]">
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
                <div className="max-w-[88%] rounded-lg border border-zinc-800 bg-zinc-950/85 px-4 py-3 text-sm text-zinc-200 shadow-[0_20px_55px_rgba(0,0,0,0.26)]">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mb-4 text-xl font-semibold leading-7 text-white">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="mb-3 mt-5 text-lg font-semibold leading-7 text-violet-200">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mb-2 mt-4 text-base font-semibold leading-6 text-cyan-100">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="mb-3 leading-7 text-zinc-300 last:mb-0">
                          {children}
                        </p>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),

                      ul: ({ children }) => (
                        <ul className="mb-4 ml-5 list-disc space-y-2 text-zinc-300">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="mb-4 ml-5 list-decimal space-y-2 text-zinc-300">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="leading-6">
                          {children}
                        </li>
                      ),

                      blockquote: ({ children }) => (
                        <blockquote className="my-4 border-l-2 border-violet-400/70 pl-4 italic text-zinc-400">
                          {children}
                        </blockquote>
                      ),

                      code: ({ children }) => (
                        <code className="rounded-md border border-zinc-800 bg-black/50 px-1.5 py-0.5 text-cyan-200">
                          {children}
                        </code>
                      ),

                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-cyan-200 underline decoration-cyan-300/40 underline-offset-4"
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
            );
          }

          if (msg.emails) {
            return (
              <div
                key={index}
                className="space-y-3"
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
            <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/85 px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300" />
                <div
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300"
                  style={{ animationDelay: "0.15s" }}
                />
                <div
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>

              <span className="text-sm text-zinc-400">
                DayPilot AI is thinking...
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-zinc-800/90 bg-zinc-950/55 px-4 py-3 backdrop-blur-xl">
        {quickActions.map(({ label, prompt, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => setInput(prompt)}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 text-xs font-medium text-zinc-300 shadow-sm transition hover:border-violet-400/50 hover:bg-zinc-900 hover:text-white"
          >
            <Icon className="h-3.5 w-3.5 text-violet-300" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-zinc-800/90 bg-black/20 p-4">
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/90 shadow-[0_24px_80px_rgba(0,0,0,0.38)] focus-within:border-violet-400/50">
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
            className="h-28 w-full resize-none bg-transparent px-4 py-4 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-500"
          />

          <div className="flex items-center justify-between border-t border-zinc-800 px-3 py-3">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Inbox className="h-3.5 w-3.5" />
              <span>Inbox agent</span>
            </div>

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-violet-300/25 bg-violet-500/90 px-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(124,58,237,0.32)] transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Zap className="h-4 w-4" />
                  <span>Thinking</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
