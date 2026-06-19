import Link from "next/link"; 
import { signIn, auth } from "@/lib/auth"; 
import {redirect} from "next/navigation" 

export default async  function Home() {  
  const session = await auth()  

  if(!session){
    redirect("/login")
  } 
  redirect("/dashboard")


  return (
    <div>
      <Link href="/login">
        Login
      </Link>
    </div>
  );
}