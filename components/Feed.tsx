"use client";
import React, { useState, useEffect } from "react";
import PostCard from "@components/PostCard";
interface Post {
  title: string;
  text: string;
  id: number;
}
const PostCardList = ({ data, handleTagClick }) => {
    console.log("data in postcard list issssssssssss", data)
  return (
    <div className="post_layout mt-16">
      {data.map((post) => {
        return <PostCard key={post.post_id} post={post} />;
      })}
    </div>
  );
};

export default function Feed() {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState([]);

  //   -------
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("fetch posts from post api");
      const response = await fetch("/api/post");
      const data = await response.json();
      console.log("data in feed issssssssssssssssss",data);
      setPosts(data);
    };
    fetchPosts();
  }, []);
  function handleSearchChange(e) {}
  function handleTagClick() {
    console.log("test");
  }
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          value={searchText}
          onChange={handleSearchChange}
          required
          type="text"
          placeholder="search for a tag or a username"
        />
      </form>
      <PostCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
}
