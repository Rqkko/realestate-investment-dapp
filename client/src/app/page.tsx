"use client";

import { useRouter } from "next/navigation";
import Navbar from "./components/navbar";
import realestate1 from "../../public/realestates/realestate_1.jpg";
import realestate2 from "../../public/realestates/realestate_2.jpg";
import realestate3 from "../../public/realestates/realestate_3.jpg";
import realestate4 from "../../public/realestates/realestate_4.jpg";
import Image from "next/image";

const images = [realestate1, realestate2, realestate3, realestate4];

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/invest");
  };
  const handleClick2 = () => {
    router.push("/projectDetails");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 p-6 min-h-screen text-center">
      <h1 className="mb-4 font-semibold text-4xl text-gray-800">
        Welcome to DeProp!
      </h1>
      <p className="mb-6 text-gray-600 text-xl">
        Start investing in exciting real estate projects today.
      </p>
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg text-white transition-colors"
      >
        Go to Invest Page
      </button>
      <button
        onClick={handleClick2}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg text-white transition-colors"
      >
        Project Details
      </button>
    </div>
  );
}