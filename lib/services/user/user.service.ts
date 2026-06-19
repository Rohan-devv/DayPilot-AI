import  db from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";


type CreateUserInput = {
    name: string ;
    age: number;
  email: string; 
  image?: string ;
};

export async function createUserIfNotExists({
  name,age,email,image
}: CreateUserInput) {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return existingUser[0];
  }

  const [newUser] = await db
    .insert(usersTable)
    .values({
     
      name, 
      age, 
      email, 
      image
    })
    .returning();

  return newUser;
}  

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return user;
}