import { connectToDB } from "@utils/database";
import { text } from "stream/consumers";

export const GET = async (req) => {
  try {
    const db = await connectToDB();
    const data = await db.query(
      "SELECT quotes.*, users.email, users.username, users.image FROM quotes JOIN users ON quotes.user_id = users.user_id ORDER BY quotes.created_at DESC LIMIT 10"
    );
    // Formatting the data
    const quotes = data.rows.map((row) => ({
      quote_id: row.quote_id,
      text: row.text,
      created_at: row.created_at,
      edited_at: row.edited_at,
      tags: row.tags,
      author: row.author,
      user: {
        user_id: row.user_id,
        email: row.email,
        username: row.username,
        image: row.image,
      },
    }));
    return new Response(JSON.stringify(quotes), { status: 200 });
  } catch (error) {
    return new Response("faield to fetch quotes", { status: 500 });
  }
};
