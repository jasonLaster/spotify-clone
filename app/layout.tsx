import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Player } from "@/components/player";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "A modern Spotify clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <div className="h-screen flex flex-col">
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-gradient-to-b from-spotify-darkgray to-black overflow-y-auto">
              {children}
            </main>
          </div>
          <Player />
        </div>
      </body>
    </html>
  );
}
