import { signIn, auth } from "@/lib/auth"; 
import {redirect} from "next/navigation"

export default async function LoginPage() {   
    const session = await auth()  

    if(session){
       redirect("/dashboard")
    } 

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">
        Continue with Google
      </button>
    </form>
  );
}