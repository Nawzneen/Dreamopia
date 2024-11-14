"use client";
import React, { FC, useEffect, useState } from "react";
import PostCard from "@components/PostCard";
import BlankProfile from "@public/blank_profile_pic.png";
import Image from "next/image";
import { Post, User } from "../types/types";
import { useSession } from "next-auth/react";

interface ProfileProps {
  user: Partial<User>;
  desc: string;
  posts: Post[];
  handleEditProfile?: (user_id: number) => Promise<void>;
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
  desc,
  posts,
  // isEditing,
  handleEditProfile,
  handleDelete,
  handleEdit,
}) {
  const [postExists, setPostExists] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<Partial<User>>({});

  const { data: session } = useSession();
  useEffect(() => {
    if (posts.length === 0) {
      setPostExists(false);
    } else {
      setPostExists(true);
    }
  }, [posts]);

  return (
    <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 xl:gap-10 p-5">
      {/* FIRST PART - PROFILE CARD  */}
      {isEditing ? (
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
                <div className="flex justify-center items-center gap-3">
                  <button
                    className="w-[60px] btn text-sm min-h-10 shadow font-semibold"
                    style={{
                      backgroundColor: "var(--tertiary-color)",
                      color: "var(--font-color)",
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="w-[860x] btn text-sm min-h-10 shadow font-semibold"
                    style={{
                      backgroundColor: "var(--tertiary-color)",
                      color: "var(--font-color)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <hr className="mt-8 " />

            <div className="mt-4 ">
              {/* <label htmlFor="username col-span-0" /> */}
              <span className="font-satoshi font-semibold text-base  ">
                Username
              </span>
              <input
                name="username"
                className="w-full px-2 py-1 rounded-md  mt-1 bg-gray-200 text-gray-50"
                value={user.username}
                onChange={(e) =>
                  setEditedProfile({ ...user, username: e.target.value })
                }
              />
            </div>
            <div className=" mt-4">
              {/* <label htmlFor="about" /> */}
              <span className="font-satoshi font-semibold text-base ">
                About you
              </span>
              <textarea
                className="w-full mt-1 px-2 py-1 bg-gray-200 text-gray-50"
                name="about"
                value={user.about}
                onChange={(e) =>
                  setEditedProfile({ ...user, about: e.target.value })
                }
              />
            </div>
            {/* <div>
            <span>Favorite Geners</span>
          </div> */}
          </div>
        </div>
      ) : (
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
              <div className="w-full flex justify-center items-center gap-7 ">
                <div className="text-sm flex  justify-center items-center">
                  <div className="flex flex-col items-center ">
                    <span className="font-semibold text-lg">22</span>
                    <span className="text-md">Posts</span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  {(session?.user as User)?.user_id === user?.user_id ? (
                    <button
                      className=" w-[100px] btn text-sm min-h-10 shadow font-semibold"
                      style={{
                        backgroundColor: "var(--tertiary-color)",
                        color: "var(--font-color)",
                      }}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="w-[100px] tn text-sm min-h-10 shadow font-semibold"
                      style={{
                        backgroundColor: "var(--tertiary-color)",
                        color: "var(--font-color)",
                      }}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 md:mt-16 flex justify-center items-center ">
              <h2 className="text-2xl font-semibold">{user?.username} </h2>
              <span className="text-2xl font-semibold"> , {user?.age}</span>
            </div>
            <p className="mt-4 md:mt-4">{user?.about}</p>
            <hr className="mt-4 mb-4" />
            {/* <div>
            <span>Favorite Geners</span>
          </div> */}
          </div>
        </div>
      )}

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
                    name="profile"
                    key={post.post_id}
                    post={post}
                    handleTagClick={() => {}}
                    handleEdit={() => handleEdit && handleEdit(post.post_id)}
                    handleDelete={
                      handleDelete
                        ? (post_id: number) => handleDelete(post_id)
                        : undefined
                    }
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
