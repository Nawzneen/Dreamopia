import { connectToDB } from "@utils/database";
export const GET = async (req, { params }) => {
  // params for dynamic variables
  try {
    const db = await connectToDB();
    const data = await db.query(
      "SELECT * FROM users ORDER BY created_at DESC LIMIT 10 "
    );
    const users = data.rows;
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch a user posts", { status: 500 });
  }
};