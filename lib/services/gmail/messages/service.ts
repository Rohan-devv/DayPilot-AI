import { auth } from "@/lib/auth";
import { corsair } from "@/lib/corsair";
import { SendEmailInput } from "@/lib/services/gmail/messages/types";

/**
 * Step 1
 * Build an RFC 2822 / MIME Email
 */
function buildMimeMessage({
  to,
  subject,
  body,
}: SendEmailInput): string {
  return [
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    body,
  ].join("\r\n"); 
}  

// har element ko \r\n se join kiya hai, taki email ka format sahi rahe.

/**
 * Step 2
 * MIME -> Base64
 */
function encodeBase64(input: string): string {
  return Buffer.from(input, "utf8").toString("base64");
}

/**
 * Step 3
 * Base64 -> Base64URL
 */
function encodeBase64Url(base64: string): string {
  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Send Email
 */
export async function sendEmail(input: SendEmailInput, tenantId?: string) {
  // const session = await auth();

  // if (!session?.user?.id) {
  //   throw new Error("Unauthorized");
  // }

  // const tenantId = `user_${session.user.id}`;

  // Build MIME Email
  const mimeMessage = buildMimeMessage(input);

  // Encode MIME -> Base64
  const base64 = encodeBase64(mimeMessage);

  // Convert Base64 -> Base64URL
  const raw = encodeBase64Url(base64);

  // Send Email
  const response = await corsair
    .withTenant(tenantId!)
    .gmail.api.messages.send({
      raw,
    });

  return response;
}   


import { GetMessageInput } from "./types";

export async function getMessage(
  tenantId: string,
  { messageId }: GetMessageInput
) {
  const response = await corsair
    .withTenant(tenantId)
    .gmail.api.messages.get({
      id: messageId,
    });  

  

  

  return response;
}
