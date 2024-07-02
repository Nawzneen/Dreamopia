import { connectToDB } from "@utils/database";
export const GET = async (req, { params }) => {
  // params for dynamic variables
  try {
    const db = await connectToDB();
    // check to see if the user exist
    const userData = await db.query(
      "SELECT EXISTS (SELECT 1 FROM users WHERE user_id = $1)",
      [params.id]
    );
    const user = userData.rows[0];
    if (!user.exists) {
      return new Response("User not Found", { status: 404 });
    } else {
      const data = await db.query(
        "SELECT * FROM posts WHERE user_id = $1 ORDER BY posts.created_at DESC LIMIT 10 ",
        [params.id]
      );
      const posts = data.rows;
      if (data.rows.length == 0) {
        // There is no post for this user
        return new Response(JSON.stringify(posts), { status: 200 });
      }
      return new Response(JSON.stringify(posts), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch a user posts", { status: 500 });
  }
};
