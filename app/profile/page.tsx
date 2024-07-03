"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { User, Post, Session } from "../../types/types";


export default function MyPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const user = session?.user;

  useEffect(() => {
    const fetchMyPosts = async () => {
      const response = await fetch(`/api/users/${(user as User)?.user_id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };
    if ((user as User)?.user_id) {
      fetchMyPosts();
    }
  }, [(user as User)?.user_id]);
  const handleEdit = (post_id: number) => {
    router.push(`/update-post?id=${post_id}`);
  };
  const handleDelete = async (post_id: number) => {
    const hasConfirmed = confirm("Are you sure you want to delete this quote?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/promp/${post_id}`, {
          method: "DELETE",
        });
        const filteredPosts = myPosts.filter(
          (item: Post) => item.post_id !== post_id
        );
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
    name="My"
      user={(user as Partial<User>) || {}}
      desc="Welcome to your personalized profile page"
      posts={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
