"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {Post} from "../../types/types"
import Form from "@components/Form";

export default function UpdatePost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id")
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Partial<Post>>({
    text: "",
    author:"",
    tags: []
  });


  useEffect(()=>{
    const getPost = async ()=>{
      const response = await fetch(`/api/post/${postId}`)
      const data = await response.json();
      setPost({
        author: data.author,
        text: data.text, 
        tags: data.tags
      })
    }
if(postId) getPost();
  },[postId])

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert("Missing post Id!");

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          author: post.author,
          text: post.text,
          tags: post.tags
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
  };

  return (
    <div>
      <Form
        type="Update"
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={updatePost}
      />

    </div>
  );
}
