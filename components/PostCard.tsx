"use client";
import React from "react";
import Image from "next/image";
import BlankProfile from "@public/blank_profile_pic.png";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { PostCardProps, User } from "../types/types";

const PostCard: React.FC<PostCardProps> = ({
  name,
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
}) => {
  const pathName = usePathname();
  const createdDate = formatDate(post.created_at);
  const editedDate = post.last_edit
    ? formatDate(post.last_edit)
    : "Not available";
  const { data: session } = useSession();
  return (
    <div className="PostCard_container flex justify-center align-center w-full">
      <div className="w-full mt-4 md:mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
        <div className="top_container w-full flex justify-between mb-3">
          <div className="flex flex-row items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: "var(--primary-color)" }}
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="category rounded px-4 py-1 bg-yellow-200 text-zinc-700 text-sm font-semibold">
              {post.category_id ? post.category_id : "test"}
            </div>
          </div>
          <div className="flex items-center">
            {(session?.user as User)?.user_id === post.user_id &&
              pathName === "/profile" && (
                <>
                  {handleEdit && (
                    <button
                      className=" mr-1"
                      onClick={() => handleEdit(post.post_id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                        style={{ color: "var(--primary-color)" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                  )}
                  {handleDelete && (
                    <button
                      className=" ml-1"
                      onClick={() => handleDelete(post.post_id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                        style={{ color: "var(--primary-color)" }}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
                </>
              )}
          </div>
        </div>
        <div className="middle_container ">
          <p
            className=" font-normal text-base"
            style={{ color: "var(--font-color)" }}
          >
            {post.text}
          </p>
          <p className="text-sm text-right mb-5 text-gray-400 italic">
            {post.author}
          </p>
          <div className="post_tags_container w-full flex flex-row items-center justify-end ">
            {post.tags?.map((tag, i) => {
              return (
                <div
                  key={i}
                  className="post_tags   py-1 ml-1  text-amber-100 text-sm font-semibold"
                  style={{ color: "var(--base-color)" }}
                >
                  #{tag}
                </div>
              );
            })}
          </div>
        </div>
        <div className="spacer flex-1" style={{ height: "40px" }}></div>
        <div className="post_author_date bg-gray-300 py-3 px-6  absolute bottom-0 left-0 w-full flex justify-between items-center ">
          {name !== "profile" && (
            <div>
              {post.image ? (
                <Image
                  src={post.image}
                  alt="user profile"
                  width={30}
                  height={30}
                  className="inline mr-2 rounded-full"
                />
              ) : (
                <Image
                  src={BlankProfile}
                  alt="user profile"
                  width={30}
                  height={30}
                  className="inline mr-2 rounded-full"
                />
              )}
              <span className="font-semibold">{post.username}</span>
            </div>
          )}
          <div className="">
            <span className="text-sm">{createdDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;

function formatDate(inputDate: string): string {
  // Parse the input date string
  const date = new Date(inputDate);

  // Extract the components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(2); // Get last two digits of the year
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format and return the date
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
