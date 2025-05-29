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

  // Overlay States
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMode, setOverlayMode] = useState<"menu" | "deposit" | "withdraw">("menu");
  const [amount, setAmount] = useState<string>("");
  const [txLoading, setTxLoading] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);

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
      setTxError("Vault contract not initialized.");
      return;
    }
    setTxLoading(true);
    setTxError(null);
    try {
      if (!provider || !account || !amount) {
        setTxError("Wallet not connected or invalid amount.");
        setTxLoading(false);
        return;
      }
      const signer = provider.getSigner();
      const tx = await dpVaultContract.connect(signer).deposit({
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      setShowOverlay(false);
      setAmount("");
      fetchBalance();
    } catch (error) {
      setTxError("Transaction failed. Please try again.");
      console.error("Vault deposit error:", error);
    }
    setTxLoading(false);
  }

  // Withdraw DP to receive ETH
  async function handleWithdraw() {
    if (!dpVaultContract) {
      setTxError("Vault contract not initialized.");
      return;
    }
    if (!dpContract) {
      setTxError("DP contract not initialized.");
      return;
    }

    setTxLoading(true);
    setTxError(null);
    try {
      if (!provider || !account || !amount) {
        setTxError("Wallet not connected or invalid amount.");
        setTxLoading(false);
        return;
      }
      const signer = provider.getSigner();

      const dpAmount = amount;

      // Approve the vault to spend DP tokens
      const approveTx = await dpContract.connect(signer).approve(dpVaultContract.address, dpAmount);
      await approveTx.wait();

      // Withdraw DP for ETH
      const tx = await dpVaultContract.connect(signer).withdraw(dpAmount);
      await tx.wait();

      setShowOverlay(false);
      setAmount("");
      fetchBalance();
    } catch (error) {
      setTxError("Transaction failed. Please try again.");
      console.error("Vault withdraw error:", error);
    }
    setTxLoading(false);
  }

  useEffect(() => {
    if (account) {
      setAvatar(blockies(account));
    }
    fetchBalance();
  }, []);

  // Overlay content
  let overlayContent = null;
  if (showOverlay) {
    if (overlayMode === "menu") {
      overlayContent = (
        <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-xl min-w-[320px]">
          <h2 className="mb-4 font-bold text-black text-xl">DP Vault</h2>
          <div className="flex gap-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold text-white transition"
              onClick={() => { setOverlayMode("deposit"); setTxError(null); setAmount(""); }}
            >
              Deposit
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold text-white transition"
              onClick={() => { setOverlayMode("withdraw"); setTxError(null); setAmount(""); }}
            >
              Withdraw
            </button>
          </div>
          <button
            className="bg-gray-300 hover:bg-gray-400 mt-6 px-4 py-2 rounded font-semibold text-black transition"
            onClick={() => { setShowOverlay(false); setOverlayMode("menu"); setTxError(null); setAmount(""); }}
          >
            Close
          </button>
        </div>
      );
    } else if (overlayMode === "deposit") {
      overlayContent = (
        <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-xl min-w-[320px]">
          <h2 className="mb-4 font-bold text-black text-xl">Deposit ETH for DP</h2>
          <input
            type="number"
            min="0"
            step="any"
            placeholder="Amount in ETH"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="mb-4 px-4 py-2 border rounded w-full text-black"
            disabled={txLoading}
          />
          {txError && <div className="mb-2 text-red-600">{txError}</div>}
          <div className="flex gap-4">
            <button
              onClick={handleDeposit}
              disabled={txLoading || !amount}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold text-white transition"
            >
              {txLoading ? "Depositing..." : "Deposit"}
            </button>
            <button
              onClick={() => { setOverlayMode("menu"); setTxError(null); setAmount(""); }}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-semibold text-black transition"
              disabled={txLoading}
            >
              Back
            </button>
          </div>
          <p className="mt-4 text-gray-500 text-xs">
            1 ETH will be converted to 100 DP tokens
          </p>
        </div>
      );
    } else if (overlayMode === "withdraw") {
      overlayContent = (
        <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-xl min-w-[320px]">
          <h2 className="mb-4 font-bold text-black text-xl">Withdraw DP for ETH</h2>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Amount in DP"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="mb-4 px-4 py-2 border rounded w-full text-black"
            disabled={txLoading}
          />
          {txError && <div className="mb-2 text-red-600">{txError}</div>}
          <div className="flex gap-4">
            <button
              onClick={handleWithdraw}
              disabled={txLoading || !amount}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold text-white transition"
            >
              {txLoading ? "Withdrawing..." : "Withdraw"}
            </button>
            <button
              onClick={() => { setOverlayMode("menu"); setTxError(null); setAmount(""); }}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-semibold text-black transition"
              disabled={txLoading}
            >
              Back
            </button>
          </div>
          <p className="mt-4 text-gray-500 text-xs">
            100 DP tokens will be converted to 1 ETH
          </p>
        </div>
      );
    }
  }

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
            onClick={() => { setShowOverlay(true); setOverlayMode("menu"); setTxError(null); setAmount(""); }}
            title="Deposit or Withdraw DP"
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
      {showOverlay && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60">
          {overlayContent}
        </div>
      )}
    </>
  );
}