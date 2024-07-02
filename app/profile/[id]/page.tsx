"use client";

import { useEffect, useState } from "react";
import { useSearchParams, notFound } from "next/navigation";
import Profile from "@components/Profile";
import { Post } from "../../../types/types";
interface UserProfileProps {
  params: {
    id: number;
  };
}
const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

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
        if (data.length === 0){
          console.log("user doesnt have a post yet")
        }
        setUserPosts(data);
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName || ""}
      desc={`${userName}'s profile. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
