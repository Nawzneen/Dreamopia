"use client";
import React, { FC, useState, useEffect } from "react";
import PostCard from "@components/PostCard";
import {Post, FetchedPost, PostCardListProps } from "../types/types"


const PostCardList: FC<PostCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className="post_layout ">
      {data.map((post : FetchedPost) => {
        return <PostCard key={post.post_id} post={post} />;
      })}
    </div>
  );
};

export default function Feed() {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<FetchedPost[]>([]);

  //   -------
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("fetch posts from post api");
      const response = await fetch("/api/post");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  function handleSearchChange(e: any) {}
  function handleTagClick() {
    console.log("test");
  }
  return (
    <section className="feed_section ">
      <div className="flex justify-center align-center  ">
      <form className="relative w-full  flex" style={{backgroundColor: "var(--quaternary-color)"}}>
        <input
          value={searchText}
          onChange={handleSearchChange}
          required
          type="text"
          placeholder="search for a tag..."
          className="p-1 w-full"
          style={{backgroundColor: "var(--quaternary-color)"}}
        />
        <button className="btn">Search</button>
      </form>
      </div>
      <PostCardList data={posts} handleTagClick={handleTagClick}  />
    </section>
  );
}
