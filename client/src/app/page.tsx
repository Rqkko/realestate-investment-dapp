"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import realestate1 from "../../public/realestates/realestate_1.jpg";
import realestate2 from "../../public/realestates/realestate_2.jpg";
import realestate3 from "../../public/realestates/realestate_3.jpg";
import realestate4 from "../../public/realestates/realestate_4.jpg";
import Image from "next/image";

const images = [realestate1, realestate2, realestate3, realestate4];

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/projectDetails");
  };

  return (
        <div className="bg-gradient-to-b from-[#0f1c2e] to-black min-h-screen font-sans text-white">
      <Navbar />

      <div className="flex flex-col justify-center items-center mx-auto px-20 pt-20 max-w-6xl min-h-screen">
        <h1 className="mb-4 font-bold text-4xl">Welcome to DeProp!</h1>

        <p className="mb-8 text-gray-300 text-xl">
          Start investing in exciting real estate projects today.
        </p>

        <div className="flex gap-4 mb-8">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`Real estate ${idx + 1}`}
              width={200}
              height={80}
              className="rounded-lg object-cover"
            />
          ))}
        </div>

        <button
          onClick={() => router.push("/projects")}
          className="bg-white hover:bg-gray-200 px-4 py-2 rounded font-bold text-black"
        >
          Explore Projects
        </button>

        {/* <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg text-white transition-colors"
        >
          Project Details
        </button> */}
      </div>
    </div>
  );
}