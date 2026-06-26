import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { createCorsair } from 'corsair';
import { gmail } from '@corsair-dev/gmail'; 
import { googlecalendar } from '@corsair-dev/googlecalendar'; 
import {publishInboxUpdate} from "@/lib/events/publish"

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool); // your app tables

export const corsair = createCorsair({
    plugins: [gmail({
         webhookHooks: {
        messageChanged: {
            before(ctx, args) {
                return { ctx, args };
            }, 
            async after(ctx, result) {  
                
                console.log(
    `📨 Publishing inbox update for ${ctx.tenantId}`
  );
                
               
                const tenantId = ctx.tenantId
                await publishInboxUpdate(tenantId) 

               
        
      },
           
            
        },
    },
    }), 
        googlecalendar() 
    ],
    database: pool,
    kek: process.env.CORSAIR_KEK!,
    multiTenancy: true,
});