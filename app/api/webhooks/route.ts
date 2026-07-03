

import { processWebhook } from "corsair";
import { corsair } from "@/lib/corsair";

export async function POST(request: Request) { 

  console.log("🔥 WEBHOOK HIT");  

  const url = new URL(request.url); 

   console.log("URL:", request.url);

  try {  
    const headers = Object.fromEntries(request.headers);
    const body = await request.json();   

  const payload = JSON.parse(
  Buffer.from(body.message.data, "base64").toString()
);    

//  console.log(payload)
//  console.log("messageId", body.message.messageId);
// console.log("publishTime", body.message.publishTime);

const email = payload.emailAddress;

const tenantId = url.searchParams.get("tenantId") ||
url.searchParams.get("tenant_Id") || 
url.searchParams.get("tenant_id") ||
 undefined
  

    const result = await processWebhook(
      corsair,
      headers,
      body,
      
        {tenantId}
      
    );   

    
  return Response.json(
  result.response ?? { success: true }
); 

    
  } catch (err) { 
    console.error(err);

    return new Response(
      JSON.stringify({ error: "Webhook failed" }),
      {
        status: 500,
        headers: {
          "content-type": "application/json"
        }
      }
    );
  }
}  