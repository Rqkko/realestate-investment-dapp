"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { account, exampleContract } from "@/lib/contract";


export default function Home() {
  const [ownership, setOwnership] = useState<string>("");

  const handleInvest = async () => {
    if (!exampleContract) {
      alert("Contract not deployed on this network.");
      return;
    }
    const tx = await exampleContract.invest({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    alert("Invested 0.01 ETH");
  };

  const fetchOwnership = async () => {
    if (!exampleContract) {
      alert("Contract not deployed on this network.");
      return;
    }
    const result = await exampleContract.getOwnership(account);
    setOwnership(ethers.utils.formatEther(result));
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-6 min-h-screen">
      <h1 className="mb-6 font-bold text-4xl text-blue-600">DeProp Real Estate dApp</h1>
      <div className="space-y-4">
        <button
          onClick={handleInvest}
          className="bg-blue-500 hover:bg-blue-600 shadow-md px-6 py-2 rounded-lg font-semibold text-white transition duration-300"
        >
          Invest 0.01 ETH
        </button>
        <button
          onClick={fetchOwnership}
          className="bg-green-500 hover:bg-green-600 shadow-md px-6 py-2 rounded-lg font-semibold text-white transition duration-300"
        >
          Check Ownership
        </button>
      </div>
      <p className="mt-6 text-gray-700 text-lg">
        Your ownership: <span className="font-bold">{ownership} ETH</span>
      </p>
    </div>
  );
}