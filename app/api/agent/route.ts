import { NextRequest } from "next/server";
import { runAgent } from "@/lib/ai-layer/agent";

export async function POST(
  req: NextRequest
) {  

   console.log("API HIT");
  const body = await req.json();

  const result = await runAgent(
    "user_2",
    body.prompt
  );  
  
 
  

  return Response.json(result);
}