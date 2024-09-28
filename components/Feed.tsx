"use client";
import React, { FC, useState, useEffect } from "react";
import QuoteCard from "@components/QuoteCard";
import { Quote, FetchedQuote, QuoteCardListProps } from "../types/types";
import Input from "@components/Input";
import Button from "@components/Button";
const QuoteCardList: FC<QuoteCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className="">
      {data.map((quote: FetchedQuote) => {
        return (
          <QuoteCard key={quote.quote_id} quote={quote} showUserInfo={true} />
        );
      })}
    </div>
  );
};

export default function Feed() {
  const [searchText, setSearchText] = useState<string>("");
  const [quotes, setQuotes] = useState<FetchedQuote[]>([]);

  //   -------
  useEffect(() => {
    const fetchQuotes = async () => {
      console.log("fetch quotes from quotes api");
      const response = await fetch("/api/quote");
      try {
        const data = await response.json();
        console.log("quotes should be", data);
        setQuotes(data);
      } catch (error) {
        console.log("there is an error", error);
      }
    };
    fetchQuotes();
  }, []);
  function handleSearchChange(e: any) {}
  function handleTagClick() {
    console.log("test");
  }
  return (
    <div className="mx-auto w-[480px] mt-4 md:mt-8">
      <div className="flex justify-center align-center  ">
        <form className=" w-full  grid grid-cols-[80%_20%]  md:gap-4">
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
      </div>
      <QuoteCardList data={quotes} handleTagClick={handleTagClick} />
    </div>
  );
}
