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
  async session({ session }) {
    try {
      const db = await connectToDB();
      const queryResult = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [session.user.email]
      );
      const user = queryResult.rows[0];
      // store user ID in session
      session.user.id = user.id.toString();
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
        const username = profile.username.replace(" ", "").toLowerCase();
        const image = profile.picture || null;
        await this.query(
          "INSERT INTO users (username, email, image, created_at) VALUES ($1, $2, $3, NOW())",
          [username, profile.email, profile.image]
        );
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new Error("Error checking or creating user in PostgreSQL");
    }
  },
});
export { handler as GET, handler as POST };
