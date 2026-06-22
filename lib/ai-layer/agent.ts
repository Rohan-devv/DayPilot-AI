import { Agent, run } from "@openai/agents";

import { buildCorsairTools } from "./provider";
import { DAYPILOT_SYSTEM_PROMPT } from "./prompt"; 
import { parseAgentResult }
from "./parser";

export async function runAgent(
  tenantId: string,
  prompt: string
) {
  const tools = buildCorsairTools(
    tenantId
  );

  const agent = new Agent({
    name: "DayPilot AI",

    model: "gpt-4o-mini",

    instructions:
      DAYPILOT_SYSTEM_PROMPT,

    tools,
  });

  const result = await run(
    agent,
    prompt
  );     
  
//   console.log(
//   Object.keys(result)
// );

// console.log(
//   result.finalOutput
// );

// console.dir(
//   result.newItems,
//   { depth: null }
// );


 




  

console.log(
  parseAgentResult(result)
);
 

 return parseAgentResult(
  result
);
}