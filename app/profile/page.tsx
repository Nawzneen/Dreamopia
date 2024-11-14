"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { User, Post, Session } from "../../types/types";

export default function MyPage() {
  const router = useRouter();
  console.log("router", router);
  const { data: session, status } = useSession();
  console.log("status", status);

  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [editedUser, setEditedUser] = useState<User>();
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  const [myUser, setMyUser] = useState<User>();

  useEffect(() => {
    // redirect to the homepage if the user is not logged in
    if (!session) {
      router.push("/");
    }
    const fetchMyPosts = async () => {
      const response = await fetch(
        `/api/users/${(session?.user as User)?.user_id}/posts`
      );
      const data = await response.json();
      setMyPosts(data);
    };
    const fetchMyUser = async () => {
      const response = await fetch(
        `/api/users/${(session?.user as User)?.user_id}`
      );
      const data = await response.json();
      setMyUser(data);
    };
    if ((session?.user as User)?.user_id) {
      fetchMyPosts();
      fetchMyUser();
    }
  }, [router, session, status]);
  const handleEdit = (post_id: number) => {
    router.push(`/update-post?id=${post_id}`);
  };
  const handleDelete = async (post_id: number) => {
    const hasConfirmed = confirm("Are you sure you want to delete this quote?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post_id}`, {
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
  const handleProfileEdit = async (user_id: number) => {
    try {
      await fetch("/api/users/[id]", {
        method: "PATCH",
        body: JSON.stringify({
          username: editedUser.username,
          age: editedUser.age,
          favoriteGenres: editedUser.favoriteGenres,
        }),
      });
    } catch (error) {}
  };
  return (
    <Profile
      user={myUser as Partial<User>}
      desc="Welcome to your personalized profile page"
      posts={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleProfileEdit={handleProfileEdit}
      // isEditing={isEditing}
    />
  );
}
