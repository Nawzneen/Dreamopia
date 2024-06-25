import { connectToDB } from "@utils/database";
import {NextResponse} from 'next/server'
// import {useSession} from "next-auth/react"

export const POST = async (req, res) => {
    // const session = useSession();
  const { userId, title, text, tag } = await req.json();
  console.log("request daaaaaaaaaataaaaaaaaaaaaaaaaaaaaa ==============================", userId, title, text, tag)
  try {
    const db = await connectToDB();
    await db.query(
      "INSERT INTO posts (user_id, title, text,  created_at) VALUES ($1,$2,$3,NOW())",
      [userId, title, text  ]
    );


      return NextResponse.json({message: "post created successfuly"})
  } catch (error) {
    console.log(error.message);
    // throw new Error("Error creating a new post in PostgreSQL");
    return NextResponse.json({message: "Error creting the post"})

  }
};
