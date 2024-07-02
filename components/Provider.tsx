"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
// import {Session as SesssionType} from "../types/types"
interface ProviderProps {
  children: React.ReactNode;
  session?: Session | null ;
}
export default function Provider({ children, session }: ProviderProps)  {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
