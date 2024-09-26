import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import React from "react";
import { Session } from "../types/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InQoutes",
  description: "A blog for quote lovers!",
};

interface RootLayoutProps {
  children: React.ReactNode;
  session: Session;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="app  flex flex-col min-h-screen">
            <Nav />
            <div className="flex flex-col flex-grow">{children}</div>
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}
