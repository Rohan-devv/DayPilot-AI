import { AgentResponse } from "./types";

function getHeader(
  headers: any[],
  target: string
) {
  return (
    headers.find(
      (h) =>
        h.name?.toLowerCase() ===
        target.toLowerCase()
    )?.value ?? ""
  );
}

export function parseAgentResult(
  result: any,
  prompt: string
): AgentResponse {

  const normalizedPrompt =
    prompt.toLowerCase();

  // SUMMARY REQUESTS FIRST
  if (
    normalizedPrompt.includes("summarize") ||
    normalizedPrompt.includes("summary")
  ) {
    return {
      type: "message",
      content:
        result.finalOutput ??
        "No summary generated.",
    };
  }

  const toolOutputs =
    result.newItems.filter(
      (item: any) =>
        item.type ===
        "tool_call_output_item"
    );

  const emailOutputs =
    toolOutputs.filter(
      (item: any) =>
        item.rawItem?.name ===
        "run_script"
    );

  if (emailOutputs.length > 0) {
    const emails = emailOutputs.map(
      (item: any) => {
        const raw = JSON.parse(
          item.output
        );

        return {
          from: getHeader(
            raw.payload?.headers ?? [],
            "From"
          ),
          subject: getHeader(
            raw.payload?.headers ?? [],
            "Subject"
          ),
          date: getHeader(
            raw.payload?.headers ?? [],
            "Date"
          ),
          snippet:
            raw.snippet ?? "",
        };
      }
    );

    return {
      type: "email_list",
      emails,
    };
  }

  return {
    type: "message",
    content:
      result.finalOutput ??
      "No response generated.",
  };
}