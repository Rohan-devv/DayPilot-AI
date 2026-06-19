  import NextAuth from "next-auth"
  import Google from "next-auth/providers/google" 
  import { createUserIfNotExists, getUserByEmail } from "./services/user/user.service";

  export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],  

    callbacks: {
      async signIn({ user }) {
        if (!user.email) {
          return false;
        }

        await createUserIfNotExists({
          name: user.name ?? user.email,
          age:0,
          email: user.email,
          image: user.image ?? undefined,
        });

        return true;
      },

      async jwt({ token }) {
         if (!token.email || token.userId) {
          return token;
        }

        const dbUser = await getUserByEmail(token.email);

        if (dbUser) {
          token.userId = String(dbUser.id);
        }

        return token;
      },

      async session({ session, token }) {
        if (session.user && typeof token.userId === "string") {
          session.user.id = token.userId;
        }

        return session;
      },
    },

    
  })  

  /* 

  ============================ OAuth Biggest Learning ================================ 

  In a traditional JWT authentication system, after verifying the user's email and password,
  we fetch the user from the database and directly store the database user ID inside the JWT token.
    Later, whenever the token is verified, we can access that user ID directly from the token payload.
    In OAuth (Google Login), the flow is slightly different because Google authenticates the user, not our database. 
    After a successful Google login, Auth.js receives the user's profile information such as name, email, and image from Google. 
    Since Google does not know our database user ID, we first create or fetch the corresponding user record in our database using the email provided by Google.
      During the JWT callback, Auth.js already provides a token containing information like the user's email. We use this email to query our database, retrieve the
      matching user record, and then attach the database ID to the token (e.g., token.userId = dbUser.id). Later, in the session callback, we copy this userId from the 
      token into session.user.id. As a result, every authenticated session contains both the Google profile information and our own database user ID, allowing us to uniquely
        identify the user throughout the application and use that ID for database operations, tenant mapping, and integrations such as Corsair.

  */
