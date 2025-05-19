"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import blockies from "ethereum-blockies-base64";
import { account } from "@/lib/contract";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
      if (account) {
        setAvatar(blockies( account ));
      }
    }, []);

  return (
    <nav className="top-10 left-1/2 z-30 fixed flex justify-between items-center bg-white/25 shadow-[0px_0px_20px_2px_rgba(255,255,255,0.4)] backdrop-blur-lg mx-auto px-6 sm:px-8 py-3 rounded-full w-full max-w-6xl -translate-x-1/2">
      <div className="flex flex-grow justify-between items-center space-x-4 sm:space-x-6">
        <button
          className="ml-10 font-reg text-sm text-white hover:text-gray-400 transition-colors"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <button
          className="mr-60 font-reg text-sm text-white hover:text-gray-400 transition-colors"
          onClick={() => router.push("/projects")}
        >
          Projects
        </button>
      </div>
      <div className="left-1/2 absolute font-bold text-3xl text-white transform -translate-x-1/2">
        DeProp
      </div>
      <div className="flex flex-grow justify-end items-center space-x-4 sm:space-x-6">
        <button
          className="mr-30 font-reg text-sm text-white hover:text-gray-400 transition-colors"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </button>
        <span className="bg-black/70 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)] backdrop-blur-lg mr-3 px-3 py-1 rounded-full font-semibold text-gray-100 text-xl">
          1000 DP
        </span>
        <Image
          src={avatar || "/default-profile.jpg"}
          alt="Profile"
          width={36}
          height={36}
          className="mr-5 border-2 border-white rounded-full w-9 h-9 object-cover"
        />
      </div>
    </nav>
  );
}