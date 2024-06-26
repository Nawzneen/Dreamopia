import React from "react";
import Link from "next/link";

interface Post {
    title: string | null;
    text: string;
    tag: string;
  }
  
interface FormProps {
    type: string;
    submitting: boolean;
    post: Post;
    setPost: React.Dispatch<React.SetStateAction<Post>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
  }

export default function Form({
  type,
  submitting,
  post,
  setPost,
  handleSubmit,
}: FormProps) {
  return (
    <section className="w-full max-w-full flex justify-center items-center flex-start flex-col">
      <h1 className="text-left">
        <span className="">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share what you think!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-5 glassmorphism"
      >
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            
            Title
          </span>
        <input
          value={post.title || ''}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="write a title..."
          className="form_textarea p-2 mt-1"
        />
        </label>
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            
            Your Post
          </span>
        <textarea
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
          placeholder="write what you think here..."
          className="form_textarea p-2 mt-1"
        />
        </label>
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            
            Choose Tags
          </span>
        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="#harrypotter #GOT..."
          className="form_textarea p-2 mt-1"
        />
        </label>
<div className="flex justify-center items-center">
    <Link href="/" className=" text-sm mx-1"> Cancel</Link>
    <button type="submit" className="btn text-sm mx-1" disabled={submitting}> {submitting ? "Submitting": "Submit"}</button>
</div>
      </form>
    </section>
  );
}
