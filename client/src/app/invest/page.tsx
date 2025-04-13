"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "@/lib/contract";


export default function Home() {
  const [ownership, setOwnership] = useState<string>("");

  const handleInvest = async () => {
    const contract = await getContract();
    const tx = await contract.invest({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    alert("Invested 0.01 ETH");
  };

  const fetchOwnership = async () => {
    const contract = await getContract();
    const address = await contract.signer.getAddress();
    const result = await contract.getOwnership(address);
    setOwnership(ethers.utils.formatEther(result));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>DeProp Real Estate dApp</h1>
      <button onClick={handleInvest}>Invest 0.01 ETH</button>
      <button onClick={fetchOwnership}>Check Ownership</button>
      <p>Your ownership: {ownership} ETH</p>
    </div>
  );
}