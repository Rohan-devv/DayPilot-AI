import { AgentResponse } from "./types";

export function parseAgentResult(
  result: any
): AgentResponse {

  const output =
    result.finalOutput;

  try {
    return JSON.parse(output);
  } catch {
    return {
      type: "message",
      content:
        typeof output === "string"
          ? output
          : "Unable to parse response.",
    };
  }
}