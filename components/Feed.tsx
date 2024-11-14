"use client";
import React, { FC, useState, useEffect } from "react";
import QuoteCard from "@components/QuoteCard";
import { Quote, FetchedQuote, QuoteCardListProps } from "../types/types";
import Input from "@components/Input";
import Button from "@components/Button";
const QuoteCardList: FC<QuoteCardListProps> = ({ data, handleTagClick }) => {
  return (
    <>
      {data.map((quote: FetchedQuote) => {
        return (
          <QuoteCard key={quote.quote_id} quote={quote} showUserInfo={true} />
        );
      })}
    </>
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
    <>
      <QuoteCardList data={quotes} handleTagClick={handleTagClick} />
    </>
  );
}
