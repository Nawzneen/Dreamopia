import { connectToDB } from "@utils/database";
export const GET = async (req, { params }) => {
  // params for dynamic variables
  try {
    const db = await connectToDB();
    const data = await db.query(
      "SELECT * FROM posts WHERE user_id = $1 ORDER BY posts.created_at DESC LIMIT 10 ",
      [params.id]
    );
    const posts = data.rows;
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch a user posts", { status: 500 });
  }
};
