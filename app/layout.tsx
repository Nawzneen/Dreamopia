import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Nav from '@components/Nav'
// import Provider from '@components/Provider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "A blog for fantasy fans!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><div className="main">
        <div className="main-bg"/>
      </div>
      <main className="app">
        <Nav/>
        {children}
      </main>


      </body>
    </html>
  );
}
