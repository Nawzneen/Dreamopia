"use client";
import React from "react";
import Image from "next/image";
import BlankProfile from "@public/blank_profile_pic.png";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Quote } from "@/types/types";
interface QuoteCardProps {
  quote: Quote;
  handleEdit?: (quote_id: number) => void;
  handleDelete?: (quote_id: number) => Promise<void>;
  handleTagClick?: (tag: string) => void;
  // onDelete?: () => void;
  // onEdit?: () => void;
  showUserInfo?: boolean;
  isOwner?: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, showUserInfo }) => {
  const pathName = usePathname();
  const createdDate = formatDate(quote.created_at);
  //   const editedDate = post.last_edit
  //     ? formatDate(post.last_edit)
  //     : "Not available";
  const { data: session } = useSession();
  return (
    <div
      className="quoteCard_container py-4 px-4 flex flex-col justify-center align-center w-full 
    "
    >
      <div className="quoteCard_details flex justify-between items-center">
        <div>
          <Image
            src={BlankProfile}
            alt="user profile"
            width={30}
            height={30}
            className="inline mr-2 rounded-full"
          />
          <span className="text-sm">{quote.user.username}</span>
        </div>
        <span className="text-xs">{createdDate}</span>
      </div>
      <p>{quote.text}</p>
      <p className="text-right text-sm">{quote.author}</p>
      <div className="quoteCard_tags text-xs ">
        {quote.tags?.map((tag, i) => {
          return (
            <span key={i} className="pr-1">
              #{tag}
            </span>
          );
        })}
      </div>
      <div className="relative h-[1px] top-0 left-0 right-0 bottom-0 w-auto mx-[2px] mt-[0.85em] ml-[3px] flex-grow rounded-[4px] bg-gradient-to-r  from-secondary-color to-primary-color"></div>
    </div>
  );
};
export default QuoteCard;

function formatDate(inputDate: string): string {
  // Parse the input date string correctly
  console.log(inputDate);
  const date = new Date(Date.parse(inputDate));
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  // Extract the components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(2); // Get last two digits of the year
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // Format and return the date
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
