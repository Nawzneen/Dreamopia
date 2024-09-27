// TO FETCH USERS BY ID 
import { connectToDB } from "@utils/database";
export const GET = async (req, { params }) => {
  // params for dynamic variables
  try {
    const db = await connectToDB();
    const data = await db.query(
      "SELECT * FROM users WHERE user_id= $1 ", [params.id]
    );
    const user = data.rows[0];
    if(data.rows[0].length === 0){
      // this user doesnt exist 
    return new Response("User doesnt exist", { status: 404 });
    }
    console.log("users.are", user)
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch a user posts", { status: 500 });
  }
};