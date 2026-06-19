import { corsair } from "@/lib/corsair";

export interface EmailThread {
  id: string;
  from: string;
  subject: string;
  date: string;
  snippet: string;
}  

export interface EmailThreadsResponse {
  emails: EmailThread[];
  nextPageToken?: string;
}  


function getHeader(
  headers: Array<{
    name?: string;
    value?: string;
  }>,
  key: string
) {
  return (
    headers.find(
      (h) =>
        h.name?.toLowerCase() ===
        key.toLowerCase()
    )?.value ?? ""
  );
}

export async function getThreads(
  userId: string,
  pageToken?: string
): Promise<EmailThreadsResponse> {

  const list = await corsair
    .withTenant(`user_${userId}`)
    .gmail
    .api
    .messages
    .list({
      userId: "me",
      maxResults: 5,
      pageToken,
    });

  const emails = await Promise.all(
    (list.messages ?? []).map(
      async (message) => {

        const email = await corsair
          .withTenant(`user_${userId}`)
          .gmail
          .api
          .messages
          .get({
            id: message.id!,
          }); 
          

        const headers =
          email.payload?.headers ?? []; 

          

        return {
          id: email.id ?? "",

          from: getHeader(
            headers,
            "From"
          ),

          subject: getHeader(
            headers,
            "Subject"
          ),

          date: getHeader(
            headers,
            "Date"
          ),

          snippet:
            email.snippet ?? "",
        };
      }
    )
  );

  return {
    emails,
    nextPageToken:
      list.nextPageToken,
  };
}