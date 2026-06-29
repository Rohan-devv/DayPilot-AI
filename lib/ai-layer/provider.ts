import { OpenAIAgentsProvider } from "@corsair-dev/mcp";
import { tool } from "@openai/agents";

import { corsair } from "@/lib/corsair";

export function buildCorsairTools(
  tenantId: string
) {
  const provider = new OpenAIAgentsProvider();

  return provider.build({
    corsair: corsair.withTenant(tenantId),
    tool,
  });
}