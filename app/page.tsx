"use client";
import React from "react";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { MdRefresh } from "react-icons/md";
import QuoteCard from "@components/QuoteCard";
import Feed from "@components/Feed";
import TagsCategories from "@components/TagsCategories";
const words = ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            dignissimos assumenda! Ex voluptatum voluptate perferendis, fuga,
            maxime est eaque adipisci architecto dignissimos tempora aut earum
            aperiam tenetur officiis. Quod, sit.
`;
interface RandomQuote {
  quote: string;
  author: string;
  category: string;
}
const Home = () => {
  //   const [randomQuote, setRandomQuote] = useState<RandomQuote>({
  //     quote: "",
  //     author: "",
  //     category: "",
  //   });
  //   const [changeRandomQuote, setChangeRandomeQuote] = useState<Boolean>(false);

  //   useEffect(() => {
  //     const fetchRandomQuote = async () => {
  //       try {
  //         const apiKey = process.env.NEXT_PUBLIC_API_NINJAS_KEY;

  //         if (!apiKey) {
  //           throw new Error("API key is not defined");
  //         }
  //         const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
  //           method: "GET",
  //           headers: {
  //             "X-Api-Key": apiKey,
  //             "Content-Type": "application/json",
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error(`Error: ${response.statusText}`);
  //         }
  //         const data = await response.json();
  //         setRandomQuote(data[0]);
  //       } catch (error) {
  //         console.log(error);
  //         throw new Error("Something wrong happend, try again.");
  //       }
  //     };
  //     fetchRandomQuote();
  //   }, [changeRandomQuote]);
  return (
    <>
      <section className="bg-primary-color min-h-[90vh] flex-grow flex justify-center items-center">
        <div className="w-[90vw] sm:w-[80vw] lg:w-[50rem] text-center flex flex-col justify-around items-center relative  rounded-xl">
          <div
            className=" text-gray-50  italic text-lg sm:text-xl md:text-2xl  primary-font flex flex-col
        
        "
          >
            <div className="mr-auto">
              <RiDoubleQuotesL size={30} />
            </div>

            {/* {randomQuote.quote}
             */}
            <TextGenerateEffect
              duration={2}
              filter={false}
              words={words}
              className="font-thin "
              // className="bg-gradient-to-r from-[#f9f871] to-[#3a5e70] text-transparent bg-clip-text"
            />
            <div className=" ml-auto">
              <RiDoubleQuotesR size={30} />
            </div>
          </div>
          <div className="w-full text-right pt-3 ">
            <span className="  mb-3 opacity-80 text-tertiary-color tracking-wider ">
              {/* {randomQuote.author} */}
              Random author
            </span>
          </div>
          <button
            className="opacity-20 absolute bottom-2"
            //   onClick={() => setChangeRandomeQuote((prev) => !prev)}
          >
            <MdRefresh size={30} />
          </button>
        </div>
      </section>
      <section className="grid gap-x-32 px-4 md:px-32 grid-cols-1 md:grid-cols-5 justify-around bg-quaternary-color">
        <div className="mt-8 md:mt-16 md:col-span-3 order-2 md:order-none">
          <Feed />
        </div>
        <div className=" mt-8 md:mt-16 bg-tertiary-color p-6 h-fit rounded-md md:col-span-2 order-1 md:order-none">
          <TagsCategories />
        </div>
      </section>
    </>
  );
};

export default Home;
