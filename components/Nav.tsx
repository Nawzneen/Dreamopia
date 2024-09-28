"use client";
import React, { useState, useEffect } from "react";
import Input from "@components/Input";
import Link from "next/link";
import Image from "next/image";
import logo from "@public/Logo.png";
import blankProfilePic from "@public/blank_profile_pic.png";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { HiMenuAlt3 } from "react-icons/hi";
import { Dela_Gothic_One } from "next/font/google";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";

interface Providers {
  [key: string]: ClientSafeProvider;
}
const delaGothicOne = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Providers | null>(null);
  const [dropDown, setDropDown] = useState<boolean>(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <>
      <nav className="bg-gray-800 pt-4 b w-full mx-auto shadow-2xl  ">
        <div className="items-center flex justify-around">
          <div>
            <Link href="/" className="">
              <span
                className={` text-2xl font-bold  text-secondary-color tracking-wider `}
              >
                InQuotes
              </span>
            </Link>
          </div>
          {/* WEB DISPLAY  */}
          <div className="sm:flex hidden">
            {session?.user ? (
              <div className="nav-items text-sm flex gap-x-1  items-center">
                <div className="nav-item">
                  <Input type="text" placeholder="Search" />
                </div>
                <div className="nav-item">
                  <button className="bg-secondary-color h-[30px] px-3 py-1 rounded-lg bg-gradient-to-r from-secondary-color to-primary-color">
                    <Link href="/create-post" className="text-white">
                      Create
                    </Link>
                  </button>
                </div>
                <div className="nav-item">
                  <Link href="/profile">
                    <Image
                      src={session?.user.image || blankProfilePic}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </Link>
                </div>
                <div
                  className="nav-item hover:cursor-pointer"
                  onClick={() => signOut()}
                >
                  {/* SIGN OUT ICON  */}
                  <LiaSignOutAltSolid size={30} color="gray" />
                </div>
              </div>
            ) : (
              <>
                <div className="nav-items grid grid-flow-col gap-x-4  text-white justify-between items-center text-sm text-grey-50">
                  <div className="nav-item">
                    <Input type="text" placeholder="Search" />
                  </div>
                  <div className="nav-item">
                    {providers &&
                      Object.values(providers).map((provider) => (
                        <button
                          type="button"
                          key={provider.name}
                          onClick={() => signIn(provider.id)}
                          className="text-gray-100 text-sm"
                        >
                          Sign In
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* MOBILE NAVIGATION */}
          <div className="sm:hidden flex items-center  bg-gray-800">
            {session?.user ? (
              <div className="grid grid-flow-col items-center gap-x-4">
                {/* Search Bar */}
                <Input type="text" placeholder="Search" />
                {/* Hamburger Menu Icon */}
                <button
                  className="text-gray-100 focus:outline-none"
                  onClick={() => setDropDown(!dropDown)}
                >
                  <HiMenuAlt3 size={30} />
                </button>

                {/* Dropdown Menu */}
                {dropDown && (
                  <div className="absolute top-14 right-0 bg-gray-700 text-white rounded-lg shadow-lg w-48 p-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-600 rounded"
                      onClick={() => setDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-post"
                      className="block px-4 py-2 hover:bg-gray-600 rounded"
                      onClick={() => setDropDown(false)}
                    >
                      Create
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setDropDown(false);
                        signOut();
                      }}
                      className="block px-4 py-2 hover:bg-gray-600 rounded w-full text-left"
                    >
                      Sign Outt
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-x-4 w-full">
                  <Input type="text" placeholder="Search" />
                  <div className="nav-item">
                    {providers &&
                      Object.values(providers).map((provider) => (
                        <button
                          type="button"
                          key={provider.name}
                          onClick={() => signIn(provider.id)}
                          className="text-gray-100 text-sm"
                        >
                          Sign In
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="relative h-[1px] top-0 left-0 right-0 bottom-0 w-auto mx-[2px] mt-[0.85em] ml-[3px] flex-grow rounded-[4px] bg-gradient-to-r  from-secondary-color to-primary-color"></div>
      </nav>
    </>
  );
}
