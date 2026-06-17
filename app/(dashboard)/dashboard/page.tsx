import { auth } from "@/lib/auth";
import { getThreads } from "@/lib/services/email.service";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }  
  

  const emails = await getThreads(session.user.id); 
  const threads = emails.threads ?? [];

  return (
    <div>
      <h1>Inbox</h1>

      {emails.threads?.map((email) => (
        <div key={email.id}>
          {email.snippet}
        </div>
      ))}
    </div>
  );
}