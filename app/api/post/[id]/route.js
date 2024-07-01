// GET
import { connectToDB } from "@utils/database";

export const GET = async ( { params }) => {
  try {
    const db = await connectToDB();
    const data = await db.query("SELECT * FROM posts WHERE post_id = $1", [
      params.id,
    ]);
    const post = data.rows[0];
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to get post ", { status: 500 });
  }
};

// PATCH

export const PATCH = async (req, { params }) => {

  const post = await req.json();
  try {
    const db = await connectToDB();
    const data = await db.query("SELECT * FROM posts WHERE user_id = $1", [
      params.id,
    ]);

    if (!data.rows) {
      return new Response("Post not found", { status: 404 });
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
export const DELETE = async ( { params }) => {
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
