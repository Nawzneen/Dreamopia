"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import {User, Post} from "../../types/types"


export default function CreatePost() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Partial<Post>>({
    text: "",
    author:"",
    tags: [],
  });
  async function createPost(e: any) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          text: post.text,
          tags: post.tags,
          author: post.author,
          userId: (session?.user as User).user_id 
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div>
      <Form
        type="Create"
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={createPost}
      />
    </div>
  );
}
