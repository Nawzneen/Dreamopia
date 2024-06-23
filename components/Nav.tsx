'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/Logo.png'
import {Dela_Gothic_One} from "next/font/google"
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from 'next-auth/react';

interface Providers {
  [key: string]: ClientSafeProvider;
}
const delaGothicOne = Dela_Gothic_One({
  subsets: ['latin'],
  weight: '400',
});

export default function Nav() {
  const isUserLoggedIn = true;
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
    <nav className=" justify-between flex w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src={logo} alt="logo" width={60} height={60} />
        <p className={`logo-text font-bold ${delaGothicOne.className}`} style={{color:"orange",fontSize:'1.5rem', lineHeight: '60px'}}>Blog</p>
      </Link>
      {/* {bigger screen navigation } */}

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5 items-center">
            <Link href="/create-post" className="create_btn btn ">
              Create Post
            </Link>
            <button type="button" onClick={() => signOut()} className="signout_btn btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src=""
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
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
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5 items-center">
            <Link href="/create-post" className="create_btn btn">
              Create Post
            </Link>
            <button type="button" onClick={() => signOut()} className="signout_btn btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="@public/next.svg"
                alt="profile"
                width={37}
                height={37}
                className="rounded-full "
                onClick={() => setDropDown((prev) => !prev)}
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
                   Create Prompt
                  </Link>
                  <button type="button" 
                  onClick={()=>{
                    setDropDown(false);
                    signOut();
                  }}
                  className='mt-5 w-full signout_btn btn'>
                    Sign Out
                  </button>
                </div>
              )}
            </Link>
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
  );
}
