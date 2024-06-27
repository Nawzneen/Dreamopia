// GET
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  console.log("GETTING THE POST");
  try {
    const db = await connectToDB();
    // const data = await db.query(
    //   "SELECT posts.*, users.email, users.username, users.image FROM posts JOIN users ON posts.user_id = users.user_id ORDER BY posts.created_at DESC LIMIT 10"
    // );
    const data = await db.query("SELECT * FROM posts WHERE post_id = $1", [
      params.id,
    ]);
    const post = data.rows[0];
    if (!post) {
      return new Response("Post not found", { status: 400 });
    }
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to get post ", { status: 500 });
  }
};

// PATCH

// Helper function to parse JSON body


export const PATCH = async (req, { params }) => {

  const post = await req.json();
  console.log(post)
  // console.log("req.body is ", body);
  // console.log("post in patch is", body)
  try {
    const db = await connectToDB();
    const data = await db.query("SELECT * FROM posts WHERE user_id = $1", [
      params.id,
    ]);

    if (!data.rows) {
      return new Response("Post not found", { status: 400 });
    }
    const updatePostQuery =
      "UPDATE posts SET title=$1, text=$2 WHERE post_id = $3";
    await db.query(updatePostQuery, [post.title, post.text, params.id]);
    return new Response("Post updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update post", { status: 500 });
  }
};
// DELETE
export const DELETE = async (req, { params }) => {
  // const { post } = await req.json();
  try {
    const db = await connectToDB();
    const data = await db.query("SELECT 1 FROM posts WHERE user_id = $1", [
      params.id,
    ]);

    if (!data.rows) {
      return new Response("Post not found", { status: 400 });
    }
    const updatePostQuery = "DELETE FROM posts WHERE post_id = $1";
    await db.query(updatePostQuery, [params.id]);
    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete post", { status: 500 });
  }
};
