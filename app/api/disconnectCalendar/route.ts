import { NextRequest, NextResponse } from "next/server"; 
import {auth} from "@/lib/auth" 

import db from "@/db" 

import { 
    corsairAccounts,
    corsairEntities,
    corsairEvents,
    corsairIntegrations

} from "@/db/schema"
import { and, eq } from "drizzle-orm";

export async function POST(req: NextRequest) { 

    const session = await auth()

    if(!session?.user.id){
        return NextResponse.json ({error: "Unauthorized"}, {status: 401})
    }  
    
    const {plugin} = await req.json() 

    if(!plugin) return NextResponse.json({error:"Missing Plugin"}, {status: 400}) 



    try {  

        const integration =
         await db.select()
        .from(corsairIntegrations)
        .where(eq(corsairIntegrations.name, plugin))
        .limit(1) 

        const foundIntegration = integration[0]

        if(!foundIntegration) {
            return NextResponse.json({error: "Integratin not found"},{status: 401})
        } 

        const account = 
         await db.select()
         .from(corsairAccounts)
         .where(  
            and( 
                eq(corsairAccounts.tenantId,`user_${session.user.id}`),  
                eq(corsairAccounts.integrationId, foundIntegration.id)
            )
            
        ) 

        const foundAccount = account[0]

        if(!foundAccount){
            return NextResponse.json({error: "Account not found"}, {status:401})
        } 
        
        // Transaction all or nothing 

        await db.transaction(async (tx) => {
            await tx.delete(corsairEntities)
            .where(eq(corsairEntities.accountId, foundAccount.id)) 

             await tx.delete(corsairEvents)
            .where(eq(corsairEvents.accountId, foundAccount.id)) 
            
             await tx.delete(corsairAccounts)
            .where(eq(corsairAccounts.id, foundAccount.id)) 
        }) 

       return  NextResponse.json({
            success: "true",
            dissconnected: plugin
        })


         


        
    } catch (error) { 
        return NextResponse.json({error: "Failed to Dissconect"}, {status: 500})
        
    }

}