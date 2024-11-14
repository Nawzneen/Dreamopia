import React from "react";
import Input from "@components/Input";
import Button from "@components/Button";
const TagsCategories = () => {
  const tags = [
    "poetry",
    "movies",
    "comicbooks",
    "non-fiction",
    "fiction",
    "non-inspiorational",
    "inspirational",
    "motivational",
    "biography",
    "edgar-allan-poe",
    "horror",
    "romance",
    "thriller",
  ];
  const categories = ["movies", "books", "poetry"];
  return (
    <>
      <form className=" w-full  grid grid-cols-[75%_20%]  md:gap-2">
        <Input type="" placeholder="Search here" toColor="gray-200" />
        <Button text="Search" toColor="gray-200" />

        {/* <input
            value={searchText}
            onChange={handleSearchChange}
            required
            type="text"
            placeholder="search for a tag..."
            className="p-1 w-full"
            style={{ backgroundColor: "var(--quaternary-color)" }}
          /> */}
      </form>
      <div className="mt-4">
        <p className="text-base mb-1 text-quaternary-color">Categories</p>
        <div className="text-xs flex gap-x-1 mt-2">
          {categories.map((category) => (
            <span
              key={category}
              className="bg-secondary-color rounded-md p-1 text-gray text-sm "
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className=" text-quaternary-color text-base">Tags</p>
        <div className="flex flex-row flex-wrap gap-x-1 text-xs  mt-2">
          {tags.map((tag) => (
            <span key={tag} className="w-fit text-sm">
              <span className="  text-gray-800">#</span>
              <span className="  text-gray-800">{tag}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default TagsCategories;
