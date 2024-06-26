import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const db = await connectToDB();
        const queryResult = await db.query(
          "SELECT * FROM users WHERE email = $1",
          [session.user.email]
        );
        const user = queryResult.rows[0];
        // store user ID in session
        // should i turn this into string?!
        session.user.user_id = user.user_id;
        return session;
      } catch (error) {
        console.error("error fetching user from postgreSQL", error.message);
        throw new Error("erro fetching user from postgres");
      }
    },
    async signIn({ profile }) {
      try {
        const db = await connectToDB();
        const queryResult = await db.query(
          "SELECT * FROM users WHERE email = $1",
          [profile.email]
        );
        const user = queryResult.rows[0];
        if (!user) {
            console.log("user doesnt exist")

          const username = profile.name.replace(" ", "").toLowerCase();
          const image = profile.picture || null;
          await db.query(
            "INSERT INTO users (username, email, image, created_at) VALUES ($1, $2, $3, NOW())",
            [username, profile.email, image]
          );
        }
        return true;
      } catch (error) {
        console.log(error.message);
        throw new Error("Error checking or creating user in PostgreSQL");
      }
    },
  },
});
export { handler as GET, handler as POST };
