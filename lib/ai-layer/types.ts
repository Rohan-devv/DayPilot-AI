export type AgentResponse =
  | {
      type: "email_list";
      emails: {
        from: string;
        subject: string;
        date: string;
        snippet: string;
      }[];
    }
  | {
      type: "summary";
      content: string;
    }
  | {
      type: "message";
      content: string;
    }
  | {
      type: "draft";
      subject: string;
      body: string;
    };