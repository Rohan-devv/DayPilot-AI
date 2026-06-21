export type AgentResponse =
  | {
      type: "email_list";
      emails: EmailCard[];
    }
  | {
      type: "message";
      content: string;
    };

export type EmailCard = {
  from: string;
  subject: string;
  date: string;
  snippet: string;
};