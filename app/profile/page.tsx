"use client"
import React,{useState,useEffect} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from  "@components/Profile"
import PostCard from "@components/PostCard";
import BlankProfile from "@public/blank_profile_pic.png";
import Image from "next/image";
import Feed from "@components/Feed"
interface Post {
  title: string;
  text: string;
  id: number;
}
export default function Page() {
 const {data:session} = useSession(); 
  const [posts, setPosts] = useState([])


  useEffect(() => {
    const fetchPosts = async () => {
      console.log("fetch posts from post api");
      const response = await fetch(`/api/users/${session?.user.user_id}/posts`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    if(session?.user.user_id){
      fetchPosts();
    };
  }, [session?.user.user_id]);
  const handleEdit = ()=>{

  }
const handleDelete = async ()=>{
    
  }
  return (
<Profile 
name="My"
desc="Welcome to your personalized profile page"
data={posts }
handleEdit={handleEdit}
handleDelete={handleDelete}
/>
  )

}
