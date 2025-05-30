import { useState } from "react";
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ethers } from "ethers";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { provider } from "@/lib/contract";
import ProjectABI from "@/lib/contracts/Project.json";

interface ProjectCardProps {
  address: string
  title: string
  location: string
  status: string
  invested: number
  stakes: number
  earnings: number
  progress: number
  image: string
}

export function ProjectCard({ address, title, location, status, invested, stakes, earnings, progress, image }: ProjectCardProps) {
  const [showSellOverlay, setShowSellOverlay] = useState(false);
  const [sellAmount, setSellAmount] = useState("");
  const [sellLoading, setSellLoading] = useState(false);
  const [sellError, setSellError] = useState<string | null>(null);

  function openSellOverlay() {
    setSellAmount("");
    setSellError(null);
    setShowSellOverlay(true);
  }

  async function handleSell() {
    setSellLoading(true);
    setSellError(null);
    try {
      if (!provider) {
        setSellError("Wallet not connected.");
        setSellLoading(false);
        return;
      }
      if (!sellAmount || isNaN(Number(sellAmount)) || Number(sellAmount) <= 0 || Number(sellAmount) > stakes) {
        setSellError("Enter a valid amount.");
        setSellLoading(false);
        return;
      }

      const signer = provider.getSigner();
      const projectContract = new ethers.Contract(
        address,
        ProjectABI.abi,
        signer
      );

      // sellAmount is in percent * 100 (e.g., 1000 = 10%)
      const tx = await projectContract.sellStake(Math.floor(Number(sellAmount) * 100));
      await tx.wait();

      setShowSellOverlay(false);
      setSellLoading(false);
      setSellAmount("");
      window.dispatchEvent(new Event("refresh-dp-balance"));
    } catch (error) {
      setSellError("Failed to sell stakes.");
      setSellLoading(false);
      console.error("Sell error:", error);
    }
  }

  return (
    <>
      <Card className="gap-2 bg-white/5">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            <Image src={image || "/placeholder_realEstate.jpg"} alt={title} width={500} height={192} className="w-full h-full object-cover" />
            <div className="bottom-4 left-4 absolute">
              <p className="font-medium text-sm text-white">{location}</p>
              <h3 className="font-bold text-white text-xl">{title}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="gap-4 grid grid-cols-2">
            <div>
              <p className="text-sm text-white">Status</p>
              <p className="font-bold text-lg text-white">{status}</p>
            </div>
            <div>
              <p className="text-sm text-white">Invested</p>
              <p className="font-bold text-lg text-white">{invested} DP</p>
            </div>
          </div>
          <div className="gap-4 grid grid-cols-2">
            <div>
              <p className="text-sm text-white">Stakes</p>
              <p className="font-bold text-lg text-white">{stakes}%</p>
            </div>
            <div>
              <p className="text-sm text-white">Earnings</p>
              <p className="font-bold text-lg text-white">{earnings} DP</p>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-xs">
              <span className="text-white">Percent Raised</span>
              <span className="font-medium text-white">{progress}%</span>
            </div>
          </div>
          <Progress value={progress} className="bg-gray-500 h-2" />
        </CardContent>
        <CardFooter className="flex flex-col gap-4 p-4 pt-0">
          <Button variant="outline" className="bg-white/5 w-full" asChild>
            <Link href={`/projectDetails/${address}`}>
              Details
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="bg-white/5 w-full"
            onClick={openSellOverlay}
          >
            Sell
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
      {showSellOverlay && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60">
          <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-xl min-w-[320px]">
            <h2 className="mb-4 font-bold text-black text-xl">Sell Stakes</h2>
            <div className="flex items-center mb-4 w-40%">
              <input
                type="number"
                min="0.00"
                step="1"
                placeholder="Percent to sell"
                value={sellAmount}
                onChange={e => setSellAmount(e.target.value)}
                className="px-4 py-2 border rounded w-full text-black"
                disabled={sellLoading}
              />
              <span className="ml-2 font-semibold text-black text-lg">%</span>
            </div>
            {sellError && <div className="mb-2 text-red-600">{sellError}</div>}
            <div className="flex gap-4">
              <button
                onClick={handleSell}
                disabled={sellLoading || !sellAmount}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold text-white transition"
              >
                {sellLoading ? "Selling..." : "Sell"}
              </button>
              <button
                onClick={() => setShowSellOverlay(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-semibold text-black transition"
                disabled={sellLoading}
              >
                Cancel
              </button>
            </div>
            <p className="mt-4 text-gray-500 text-xs">
              Specify the percent of stakes you want to sell for this project.
            </p>
          </div>
        </div>
      )}
    </>
  )
}