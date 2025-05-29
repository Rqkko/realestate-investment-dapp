"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import blockies from "ethereum-blockies-base64";
import { ethers } from "ethers";
import Image from "next/image";

import { account, dpContract, provider, dpVaultContract } from "@/lib/contract";

export default function Navbar() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [dpBalance, setDpBalance] = useState<string>("0");
  
  // Deposit States
  const [showDepositOverlay, setShowDepositOverlay] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositTxError, setDepositTxError] = useState<string | null>(null);


  async function fetchBalance() {
    if (dpContract && account) {
      try {
        const bal = await dpContract.balanceOf(account);
        setDpBalance(ethers.utils.formatUnits(bal, 0));
      } catch (err) {
        console.error("Error fetching DP balance:", err);
        setDpBalance("0");
      }
    }
  }

  // Deposit ETH to receive DP
  async function handleDeposit() {
    if (!dpVaultContract) {
      setDepositTxError("Vault contract not initialized.");
      return;
    }
    setDepositLoading(true);
    setDepositTxError(null);
    try {
      if (!provider || !account || !depositAmount) {
        setDepositTxError("Wallet not connected or invalid amount.");
        setDepositLoading(false);
        return;
      }
      const signer = provider.getSigner();
      // Call deposit() and send ETH as value
      const tx = await dpVaultContract.connect(signer).deposit({
        value: ethers.utils.parseEther(depositAmount),
      });
      await tx.wait();
      setShowDepositOverlay(false);
      setDepositAmount("");
      
      fetchBalance(); // Refresh DP balance after deposit
    } catch (error) {
      setDepositTxError("Transaction failed. Please try again.");
      console.error("Vault deposit error:", error);
    }
    setDepositLoading(false);
  }

  useEffect(() => {
    if (account) {
      setAvatar(blockies( account ));
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
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
            <button 
            className="bg-black/70 hover:bg-black shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)] backdrop-blur-lg mr-3 px-3 py-1 rounded-full font-semibold text-gray-100 text-xl hover:text-white transition-colors"
            onClick={() => setShowDepositOverlay(true)}
            title="Deposit ETH to receive DP"
            >
            {dpBalance} DP
            </button>
          <Image
            src={avatar || "/default-profile.jpg"}
            alt="Profile"
            width={36}
            height={36}
            className="mr-5 border-2 border-white rounded-full w-9 h-9 object-cover"
          />
        </div>
      </nav>

      {showDepositOverlay && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60">
          <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-xl min-w-[320px]">
            <h2 className="mb-4 font-bold text-black text-xl">Deposit ETH for DP</h2>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="Amount in ETH"
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full text-black"
              disabled={depositLoading}
            />
            {depositTxError && <div className="mb-2 text-red-600">{depositTxError}</div>}
            <div className="flex gap-4">
              <button
                onClick={handleDeposit}
                disabled={depositLoading || !depositAmount}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold text-white transition"
              >
                {depositLoading ? "Depositing..." : "Deposit"}
              </button>
              <button
                onClick={() => {
                  setShowDepositOverlay(false);
                  setDepositAmount("");
                  setDepositTxError(null);
                }}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-semibold text-black transition"
                disabled={depositLoading}
              >
                Cancel
              </button>
            </div>
            <p className="mt-4 text-gray-500 text-xs">
              1 ETH will be converted to 100 DP tokens
            </p>
          </div>
        </div>
      )}
    </>
  );
}