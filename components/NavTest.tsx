"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@public/Logo.png";
import blankProfilePic from "@public/blank_profile_pic.png";

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
      <nav className=" justify-between items-center flex w-full pt-3 px-1 py-1 md:px-3 md:py-3 lg:px-5 lg lg:py-5 shadow-lg">
        <Link href="/" className="flex gap-2 flex-center">
          <Image src={logo} alt="logo" className="w-[50px]" />
          <span
            className={`logo-text text-orange-400 text-2xl font-bold  ${delaGothicOne.className}`}
            style={{ color: "#e7eec1" }}
          >
            InQuotes
          </span>
        </Link>
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-1 md:gap-3 items-center">
              <button className="create_btn btn text-sm">
                <Link href="/create-post" className="">
                  Create Quote
                </Link>
              </button>

              <Link href="/profile">
                <Image
                  src={session?.user.image || blankProfilePic}
                  alt="profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
              <div
                onClick={() => signOut()}
                className="signout_btn  text-sm hover:cursor-pointer"
              >
                <svg
                  style={{ color: "var(--tertiary-color)" }}
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
                  <path d="M7 12h14l-3 -3m0 6l3 -3" />
                </svg>
              </div>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="signin_btn btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>

        {/* MOBILE NAVIGATION  */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5 items-center">
              <div className="flex">
                <Image
                  src={session?.user.image || blankProfilePic}
                  alt="profile"
                  width={37}
                  height={37}
                  className="rounded-full "
                  onClick={() => setDropDown(!dropDown)}
                />
                {dropDown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-post"
                      className="dropdown_link"
                      onClick={() => setDropDown(false)}
                    >
                      Create Quote
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setDropDown(false);
                        signOut();
                      }}
                      className="mt-5 w-full signout_btn btn hover:cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="signin_btn btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
}
