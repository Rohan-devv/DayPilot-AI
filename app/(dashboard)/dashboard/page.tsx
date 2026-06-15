import {auth} from "@/lib/auth";     
import {redirect} from "next/navigation"

export default  async function DashBoardPage() { 
    const session = await auth()  

    if(!session){  
        redirect("/login")
    }  

    console.log("session: ", session)


    return ( 
        <div>
            <h1>Dashboard</h1>  

            <pre>
        {JSON.stringify(session.user, null, 2)}
             </pre>
        </div>

    )
}