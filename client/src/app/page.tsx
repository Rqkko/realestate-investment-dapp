"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoButton() {
  const router = useRouter();

  // const handleClick = () => {
  //   router.push("/invest");
  // };

  useEffect(() => {
    router.push("/projects");
  })

  // return (
  //   <div className="flex flex-col justify-center items-center bg-gray-200 p-6 min-h-screen text-center">
  //     <h1 className="mb-4 font-semibold text-4xl text-gray-800">
  //       Welcome to DeProp!
  //     </h1>
  //     <p className="mb-6 text-gray-600 text-xl">
  //       Start investing in exciting real estate projects today.
  //     </p>
  //     <button
  //       onClick={handleClick}
  //       className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg text-white transition-colors"
  //     >
  //       Go to Invest Page
  //     </button>
  //   </div>
  // );
}
