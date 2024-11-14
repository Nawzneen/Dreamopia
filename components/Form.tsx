import React from "react";
import Link from "next/link";
import { Post } from "../types/types";

interface FormProps {
  type: string;
  submitting: boolean;
  post: Partial<Post>;
  setPost: React.Dispatch<React.SetStateAction<Partial<Post>>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form({
  type,
  submitting,
  post,
  setPost,
  handleSubmit,
}: FormProps) {
  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsInput = e.target.value;
    const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
    setPost({ ...post, tags: tagsArray });
  };
  return (
    <section className="w-full max-w-full flex justify-center items-center flex-start flex-col mt-8 md:mt-16">
      <h1 className="text-left  text-xl md:text-2xl uppercase font-bold  ${delaGothicOne.className} font-sans">
        <span className="text-orange-600"> {type}</span> and share your quotes!
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-5 glassmorphism"
      >
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Your Quote
          </span>
          <textarea
            value={post.text}
            onChange={(e) => setPost({ ...post, text: e.target.value })}
            placeholder="write the quote here..."
            className="form_textarea p-2 mt-1"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Author
          </span>
          <input
            value={post.author || ""}
            onChange={(e) => setPost({ ...post, author: e.target.value })}
            placeholder="Quote's author's name"
            className="form_textarea p-2 mt-1"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Add Tags
          </span>
          <input
            value={post.tags ? post.tags.join(", ") : ""}
            onChange={handleTags}
            placeholder="harrypotter, GOT..."
            className="form_textarea p-2 mt-1"
          />
        </label>
        <div className="flex justify-center items-center">
          <Link href="/" className=" text-sm mx-1">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn text-sm mx-1"
            disabled={submitting}
          >
            {submitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
