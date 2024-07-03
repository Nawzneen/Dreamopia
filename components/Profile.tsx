"use client";
import React, { FC, useEffect, useState } from "react";
import PostCard from "@components/PostCard";
import BlankProfile from "@public/blank_profile_pic.png";
import Image from "next/image";
import { Post, User} from "../types/types";

interface ProfileProps {
  user?: Partial<User> ; 
  userSession?: Partial<User>;
  name?: string;
  desc: string;
  posts: Post[];
  handleDelete?: (post_id: number) => Promise<void>;
  handleEdit?: (id: number) => void;
}

const styles = {
  profileDetails: {
    backgroundColor: "var(--base-color)",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 10.5px )",
    borderRadius: "10px",
  },
};
const Profile: FC<ProfileProps> = function ({
  user,
  name,
  desc,
  posts,
  handleDelete,
  handleEdit,
}) {
  const [postExists, setPostExists] = useState(false);
  
  useEffect(() => {
    console.log(posts)
    if (posts.length === 0) {
      setPostExists(false);
    }
    else{
      setPostExists(true)
    }
  }, [posts]);

  return (
    <div
      className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 xl:gap-10 p-5"
    >
      <div className="w-full lg:col-span-2 ">
        <div
          className="p-8 text-md shadow mt-8 md:mt-16 text-amber-50"
          style={styles.profileDetails}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-center items-center">
              <div
                className="  rounded-full w-fit p-1"
                style={{ backgroundColor: "var(--secondary-color)" }}
              >
                <Image
                  alt="profile"
                  src={BlankProfile}
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-7 ">
              <div className="text-sm flex  justify-center items-center">
                <div className="flex flex-col items-center ">
                  <span className="font-semibold text-lg">22</span>
                  <span className="text-md">Posts</span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="btn text-sm min-h-10 shadow font-semibold"
                  style={{
                    backgroundColor: "var(--tertiary-color)",
                    color: "var(--font-color)",
                  }}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-16 flex justify-center items-center ">
            <h2 className="text-2xl font-semibold">{user?.username  } </h2>
            <span className="text-2xl font-semibold"> , 27</span>
          </div>
          <p className="mt-2 md:mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos ad
            fugiat iusto tempore, non aut dolore quia distinctio sunt nesciunt
            libero. Quo impedit ipsam quod nisi veritatis, illum reprehenderit
            deleniti?
          </p>
          <hr className="mt-4 mb-4" />
          <div>
            <span>Favorite Geners</span>
          </div>
        </div>
        {/* <div className="favorite_quotes shadow p-8 mt-3 xl:mt-10 ">
          <h2 className="text-2xl text-center font-semibold uppercase">
            Favorite Quotes
          </h2>
          <div className="post_layout">
            {posts.map((post) => {
              return (
                <PostCard
                  key={post.post_id}
                  post={post}
                  handleTagClick={() => {}}
                  handleEdit={() => handleEdit && handleEdit(post.post_id)}
                  handleDelete={() =>
                    handleDelete && handleDelete(post.post_id)
                  }
                />
              );
            })}
          </div>
        </div> */}
      </div>

      {/* //// SECOND PART - POSTS  */}
      <div className="w-full lg:col-span-3 ">
        <div className="p-8 bg-white shadow mt-8 md:mt-16">
          <h2 className="text-2xl text-center font-semibold uppercase">
            Recent Quotes
          </h2>
          <div className="post_layout">
            {postExists ? (
              posts.map((post) => {
                return (
                  <PostCard
                    name= "profile"
                    key={post.post_id}
                    post={post}
                    handleTagClick={() => {}}
                    handleEdit={() => handleEdit && handleEdit(post.post_id)}
                    handleDelete={handleDelete ? (post_id: number) => handleDelete(post_id) : undefined}
                  />
                );
              })
            ) : (
              <div className="mt-4 text-md">This user has no quotes yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
