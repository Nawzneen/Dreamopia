import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { userId, text, author, tags } = await req.json();

  try {
    const db = await connectToDB();
    await db.query(
      "INSERT INTO posts (user_id, text, author, tags, created_at) VALUES ($1, $2, $3, $4, NOW())",
      [userId, text, author, tags]
    );

    return NextResponse.json({ message: "post created successfuly" });
  } catch (error) {
    console.log(error.message);
    // throw new Error("Error creating a new post in PostgreSQL");
    return NextResponse.json({ message: "Error creting the post" });
  }
};
