import { NextRequest } from "next/server";
import { runAgent } from "@/lib/ai-layer/agent";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  console.log("Agent API HIT: ");

  const session = await auth();

  const tenantId = `user_${session?.user.id}`;

  console.log("ye hai agent ka tenant:", tenantId);

  const body = await req.json();

  const result = await runAgent(tenantId, body.prompt);

  return Response.json(result);
}
