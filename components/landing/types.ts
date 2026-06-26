export type EmailStage = "idle" | "thinking" | "composing" | "sent";

export type CalendarStage = "idle" | "thinking" | "preview" | "confirmed";

export type EmailDraft = {
  to: string;
  subject: string;
  body: string;
};

export type CalendarEvent = {
  title: string;
  date: string;
  time: string;
  guests: string[];
  location: string;
  note: string;
};