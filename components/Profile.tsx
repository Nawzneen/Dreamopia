import React from 'react'
import PostCard from "@components/PostCard";
import BlankProfile from "@public/blank_profile_pic.png";
import Image from "next/image";
import Feed from "@components/Feed"

const PostCardList = ({ data }) => {
    console.log("data in postcard list issssssssssss", data)
  return (
    <div className="post_layout">
      {data.map((post) => {
        return <PostCard key={post.post_id} post={post} />;
      })}
    </div>
  );
};

export default function Profile({name, desc, data, handleDelete, handleEdit}) {

  return (
    <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 ">
      <div className="w-full lg:col-span-2 ">
        <div className="p-8 bg-white shadow mt-8 md:mt-16">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex justify-center items-center">
              <div
                className="  rounded-full w-fit p-1"
                style={{ backgroundColor: "var(--primary-color)" }}
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
            <div className="text-sm flex  justify-center items-center">
              <div className="flex flex-col">
                <span className="font-semibold">22</span>
                <span>Posts</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button className="btn text-sm min-h-10">Connect</button>
            </div>
          </div>
          <div className="mt-4 md:mt-16 flex justify-center items-center ">
            <h2 className="text-2xl font-semibold">Nazanin </h2>{" "}
            <span> , 27</span>
           
          </div>
          <p className="mt-2 md:mt-4"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos ad fugiat iusto tempore, non aut dolore quia distinctio sunt nesciunt libero. Quo impedit ipsam quod nisi veritatis, illum reprehenderit deleniti?</p>
        <hr className="mt-4 mb-4"/>
        <div><span>Favorite Genres</span></div>
        </div>
      </div>

      {/* //// SECOND PART - POSTS  */}
      <div className="w-full lg:col-span-3 ">
        <div className="p-8 bg-white shadow mt-8 md:mt-16">
          <h2 className="text-2xl text-center font-semibold"> Recent Posts:</h2>
          <PostCardList data={data} />
        </div>
      </div>
    </div>
  )
}
