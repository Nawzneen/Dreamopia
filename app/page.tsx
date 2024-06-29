import { Suspense } from "react";
import Image from "next/image";
import Feed from "@components/Feed";
import Users from "@components/Users";
import HeroBG from "@public/pngaaa.png";
export default function Home() {
  return (
    <>
      <section className="home_section pt-8 md:pt-16 mt-16 ">
        <div className="container home_header_section grid grid-cols-1 md:grid-cols-2 gap-10 p-8 items-center justify-center shadow-2xl ">
          <div className="col-span-1 text-center flex items-center justify-center ">
            <div className=" ">
              {/* <svg width="450" height="450" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 10 C 50 150, 150 50, 200 200 S 300 350, 350 200"
                  stroke="black"
                  fill="transparent"
                  stroke-width="2"
                />
                <path
                  d="M50 50 C 90 180, 180 90, 230 230 S 330 370, 370 230"
                  stroke="black"
                  fill="transparent"
                  stroke-width="2"
                />
                <path
                  d="M30 30 C 70 160, 160 70, 210 210 S 310 350, 350 210"
                  stroke="black"
                  fill="transparent"
                  stroke-width="2"
                />
                <path
                  d="M70 70 C 110 200, 200 110, 250 250 S 350 390, 390 250"
                  stroke="black"
                  fill="transparent"
                  stroke-width="2"
                />
                <path
                  d="M20 120 C 60 250, 150 140, 200 300 S 300 450, 400 300"
                  stroke="black"
                  fill="transparent"
                  stroke-width="2"
                />
                <path
                  d="M80 80 C 120 210, 210 120, 260 260 S 360 400, 400 260"
                  stroke="black"
                  fill="transparent"
                  stroke-width="2"
                />
                <path
                  d="M10 200 C 100 100, 200 300, 300 200 S 400 100, 300 300"
                  stroke="black"
                  fill="transparent"
                  stroke-width="2"
                />
                <path
                  d="M20 300 C 60 150, 150 300, 200 350 S 300 450, 350 300"
                  stroke="black"
                  fill="transparent"
                  stroke-width="2"
                />
              </svg> */}
              <div className=" home_header_text font-extrabold font-seif flex flex-col  ">
                <h1 className="text-5xl text-left">InQuotes</h1>
                <p className="text-right text-2xl pt-4">
                  Write and read your favorite Quote here...
                </p>
              </div>

              <Image
                src={HeroBG}
                alt="book"
                className="pt-4"
                style={{ filter: "hue-rotate(180deg)" }}
              />
            </div>
          </div>
          <div className="p-8 md:p-16 col-span-1 text-center right_section flex flex-col justify-center relative ">
            <div className="next_arrow arrows  absolute right-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 md:size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div className="prev_arrow arrows absolute left-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 md:size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </div>

            <p className="text-md md:text-2xl lg:text-3xl relative w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline relative bottom-4 left-0 w-10 "
                viewBox="0 0 300 300"
                fill="#FFF"
              >
                <path d="M103.23 145.98c-24.42-11.67-29.98-44.15-10.47-62.91 4.5-4.97 15.66-9.15 10.79-17.58-2.29-3.84-7.25-5.03-11.05-2.67-40.13 28.21-76.9 64.95-68.47 129.87 7.69 59.24 105.24 63.52 107.08-2.53 0-19.63-11.51-36.35-27.88-44.18zm146.08 0c-24.42-11.67-29.98-44.15-10.47-62.91 4.5-4.97 15.66-9.15 10.79-17.58-2.29-3.84-7.25-5.03-11.05-2.67-40.13 28.21-76.9 64.95-68.47 129.87 7.69 59.24 105.24 63.52 107.08-2.53 0-19.63-11.51-36.35-27.88-44.18z"></path>
              </svg>
              Not knowing when the dawn will come, I open every door!
            </p>
            <span className="p-16 absolute right-0 bottom-0">
              Emily Dickinson
            </span>
          </div>
        </div>
        <div className="home_bottom_section grid grid-cols-3 md:grid-cols-3 justify-center  pt-16 md:pt-32 px-5 md:px-1 lg:px-32 2xl:px-48 mt-32 ">
          <div className="col-span-2 px-4">
            <Feed />
          </div>
          <div className="col-span-1 px-4">
            <Users />
          </div>
         
        </div>
      </section>
     
    </>
  );
}
