import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    const db = await connectToDB();
    const data = await db.query(
      "SELECT posts.*, users.email, users.username, users.image FROM posts JOIN users ON posts.user_id = users.user_id ORDER BY posts.created_at DESC LIMIT 10"
    );
    const posts = data.rows;
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("faield to fetch posts", { status: 500 });
  }
};
