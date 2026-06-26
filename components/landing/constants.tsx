export const EMAIL_EXAMPLE =
  "Send an email to abc@gmail.com for a meeting interview scheduled on 20th June";

export const CAL_EXAMPLE =
  "Schedule a product review on 28th June at 3 PM with the design team";

export const TESTIMONIALS = [
  {
    name: "Priya Nair",
    role: "Head of Partnerships, Series B startup",
    avatar: "PN",
    quote:
      "DayPilot reads my email threads and drafts replies that sound exactly like me. I've cut my inbox time by half.",
  },
  {
    name: "Marcus Webb",
    role: "CEO, Webb Consulting",
    avatar: "MW",
    quote:
      "The calendar intelligence is uncanny. It spots scheduling conflicts I'd have missed and handles the back-and-forth automatically.",
  },
  {
    name: "Leila Santos",
    role: "VP Operations, Fintech co.",
    avatar: "LS",
    quote:
      "We deployed DayPilot across the exec team. Meeting prep, follow-ups, agenda summaries — it runs the whole rhythm.",
  },
  {
    name: "Tom Fujimoto",
    role: "Independent Consultant",
    avatar: "TF",
    quote:
      "As a solo operator, this tool is like having a full-time EA. Affordable, always on, never loses context.",
  },
];

export const FEATURES = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Natural language email",
    desc: "Just say who to email and why. DayPilot writes, formats, and sends — no fields to fill, no subject line to craft.",
    tag: "Email Agent",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Instant scheduling",
    desc: "Tell it when and who — it finds the slot, creates the event, sends invites, and attaches a Meet link. One sentence.",
    tag: "Calendar Agent",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
    title: "Tone-matched drafts",
    desc: "References your previous emails to match your voice — not a generic AI tone, but how you actually write.",
    tag: "AI Writing",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Secure OAuth only",
    desc: "No passwords stored. Your data stays inside Google's infrastructure. We only read what you authorize, nothing more.",
    tag: "Privacy",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Priority inbox scoring",
    desc: "Learns which threads need your reply today vs. next week. Cuts the noise so your attention goes where it matters.",
    tag: "Smart Filter",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Pre-meeting briefs",
    desc: "Before every event, get a one-page context pack: recent emails, open threads, and suggested talking points.",
    tag: "Prep Kit",
  },
];

export const STATS = [
  { value: "4.2h", label: "Saved per week, on average" },
  { value: "91%", label: "Drafts sent without edits" },
  { value: "3×", label: "Faster scheduling" },
  { value: "10k+", label: "Professionals onboarded" },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your workspace",
    body: "Link Gmail and Google Calendar via OAuth in under 45 seconds. No passwords, no third-party data storage.",
  },
  {
    step: "02",
    title: "Just type what you need",
    body: "Send an email, schedule a meeting, get a briefing — all in plain English. No forms, no dropdowns, no clicking around.",
  },
  {
    step: "03",
    title: "DayPilot handles the rest",
    body: "It drafts, sends, schedules, and confirms. Your inbox and calendar stay organized without you lifting a finger.",
  },
];