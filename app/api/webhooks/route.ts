

import { processWebhook } from "corsair";
import { corsair } from "@/lib/corsair";

export async function POST(request: Request) {
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

const tenantId =
  email === "rohan49421@gmail.com"
    ? "user_2"
    : "user_1";



 

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