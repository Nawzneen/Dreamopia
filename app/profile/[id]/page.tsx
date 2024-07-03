"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Profile from "@components/Profile";
import { User, Post } from "../../../types/types";
interface UserProfileProps {
  params: {
    id: number;
  };
}
const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  // const params = useParams();
  const [user, setUser] = useState<User>();

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/users/${params?.id}/posts`);
        // not found is not working
        if (res.status === 404) {
          notFound();
        }
        const data: Post[] = await res.json();
        if (data.length === 0) {
          console.log("user doesnt have a post yet");
        }
        setUserPosts(data);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${params.id}`);
        if (res.status === 404) {
          // user doesnt exist
          notFound();
        }
        const user: User = await res.json();
        setUser(user);
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    if (params?.id) fetchUser(), fetchPosts();
  }, [params.id]);

  return (
    <Profile
      user={user}
      desc={`${user?.username}'s profile. Explore ${user?.username}'s exceptional prompts and be inspired by the power of their imagination`}
      posts={userPosts}
    />
  );
};

export default UserProfile;
