// "use client";

// export default function InvestmentCard() {
//   // Mock data (simulate coming from a database)
//   const project = {
//     location: "Downtown, City A",
//     company: "UrbanPrime Dev",
//     pricePerUnit: 450000,
//     status: "Pre-selling",
//     bedrooms: 1,
//     bathrooms: 1,
//     squareFeet: 750,
//     furniture: "Fully furnished",
//     facilities: [
//       "Rooftop garden",
//       "Co-working lounge",
//       "Pet spa",
//       "Bike storage",
//     ],
//     remainingShare: 30000,
//   };

//   return (
//     <div className="gap-6 grid grid-cols-3 bg-black/20 mx-auto mt-10 p-6 rounded-2xl max-w-5xl text-white">
//       {/* Left side (project details) */}
//       <div className="flex flex-col space-y-2 col-span-2">
//         <p><span className="font-semibold">Location:</span> {project.location}</p>
//         <p><span className="font-semibold">Company:</span> {project.company}</p>
//         <p><span className="font-semibold">Price per Unit:</span> ${project.pricePerUnit.toLocaleString()}</p>
//         <p><span className="font-semibold">Status:</span> {project.status}</p>
//         <div className="mt-4">
//           <p className="mb-1 font-semibold">More information:</p>
//           <p>Bedrooms: {project.bedrooms}</p>
//           <p>Bathrooms: {project.bathrooms}</p>
//           <p>Sq. Ft.: {project.squareFeet}</p>
//           <p>Furniture: {project.furniture}</p>
//           <p className="mt-2">
//             Facilities: {project.facilities.join(" ・ ")}
//           </p>
//         </div>
//       </div>

//       {/* Right side (remaining share and invest input) */}
//       <div className="flex flex-col justify-between">
//         {/* Remaining share */}
//         <div className="bg-black/30 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)] mb-4 px-10 py-5 rounded-2xl text-center">
//           <p className="text-lg">Remaining share:</p>
//           <p className="mt-1 font-bold text-3xl">{project.remainingShare.toLocaleString()} DP</p>
//         </div>

//         {/* Invest input */}
//         <div className="flex flex-col space-y-4 bg-black/30 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)] px-4 py-12 rounded-2xl">
//           <div className="flex items-center bg-black/40 px-4 py-2 rounded-lg">
//             <input
//               type="number"
//               step={0.01}
//               placeholder="0.00"
//               className="flex-1 bg-transparent text-white outline-none placeholder-gray-400"
//             />
//             <span className="ml-2 font-semibold">DP</span>
//           </div>
//           <button className="bg-white hover:bg-gray-200 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.5)] py-2 rounded-lg font-semibold text-black transition">
//             Invest
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { ethers } from "ethers";
// import { account, exampleContract } from "@/lib/contract";

// export default function InvestmentCard() {
//   const [investmentAmount, setInvestmentAmount] = useState<string>(""); // State to capture user input
//   const [remainingShare, setRemainingShare] = useState<number>(30000); // Mock remaining shares

//   // Function to handle investment
//   const handleInvest = async () => {
//     if (!exampleContract) {
//       alert("Contract not deployed on this network.");
//       return;
//     }

//     if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
//       alert("Please enter a valid investment amount.");
//       return;
//     }

//     try {
//       const tx = await exampleContract.invest({
//         value: ethers.utils.parseEther(investmentAmount),
//       });
//       await tx.wait();

//       alert(`Successfully invested ${investmentAmount} ETH`);
//       setRemainingShare((prev) => prev - parseFloat(investmentAmount)); // Update remaining shares
//     } catch (error) {
//       console.error("Investment error:", error);
//       alert("Investment failed. Please try again.");
//     }
//   };

//   return (
//     <div className="gap-6 grid grid-cols-3 bg-black/20 mx-auto mt-10 p-6 rounded-2xl max-w-5xl text-white">
//       {/* Left side (project details) */}
//       <div className="flex flex-col space-y-2 col-span-2">
//         <p>
//           <span className="font-semibold">Location:</span> Downtown, City A
//         </p>
//         <p>
//           <span className="font-semibold">Company:</span> UrbanPrime Dev
//         </p>
//         <p>
//           <span className="font-semibold">Price per Unit:</span> $450,000
//         </p>
//         <p>
//           <span className="font-semibold">Status:</span> Pre-selling
//         </p>
//         <div className="mt-4">
//           <p className="mb-1 font-semibold">More information:</p>
//           <p>Bedrooms: 1</p>
//           <p>Bathrooms: 1</p>
//           <p>Sq. Ft.: 750</p>
//           <p>Furniture: Fully furnished</p>
//           <p className="mt-2">
//             Facilities: Rooftop garden ・ Co-working lounge ・ Pet spa ・ Bike
//             storage
//           </p>
//         </div>
//       </div>

//       {/* Right side (remaining share and invest input) */}
//       <div className="flex flex-col justify-between">
//         {/* Remaining share */}
//         <div className="bg-black/30 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)] mb-4 px-10 py-5 rounded-2xl text-center">
//           <p className="text-lg">Remaining share:</p>
//           <p className="mt-1 font-bold text-3xl">{remainingShare.toLocaleString()} DP</p>
//         </div>

//         {/* Invest input */}
//         <div className="flex flex-col space-y-4 bg-black/30 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)] px-4 py-12 rounded-2xl">
//           <div className="flex items-center bg-black/40 px-4 py-2 rounded-lg">
//             <input
//               type="number"
//               step="0.01"
//               placeholder="0.00"
//               className="flex-1 bg-transparent text-white outline-none placeholder-gray-400"
//               value={investmentAmount}
//               onChange={(e) => setInvestmentAmount(e.target.value)}
//             />
//             <span className="ml-2 font-semibold">DP</span>
//           </div>
//           <button
//             onClick={handleInvest}
//             className="bg-white hover:bg-gray-200 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.5)] py-2 rounded-lg font-semibold text-black transition"
//           >
//             Invest
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { account } from "@/lib/contract";
import ProjectABI from "@/lib/contracts/Project.json";

interface InvestmentCardProps {
  projectAddress: string;
  setProjectName: (name: string) => void;
}

export default function InvestmentCard({ projectAddress, setProjectName }: InvestmentCardProps) {
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [remainingShare, setRemainingShare] = useState<number>(0);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    location: "",
    amountNeeded: 0,
    amountRaised: 0,
    status: "Raising Funds",
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!account) {
        alert("Please connect your wallet.");
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as unknown as ethers.providers.ExternalProvider,
          "any"
        );
        const signer = provider.getSigner();
        const projectContract = new ethers.Contract(projectAddress, ProjectABI.abi, signer);

        const name = await projectContract.name();
        setProjectName(name);
        const location = await projectContract.location();
        const amountNeeded = parseInt(await projectContract.amountNeeded());
        const amountRaised = parseInt(await projectContract.amountRaised());
        const statusEnum = parseInt(await projectContract.status());

        const statusMap: Record<number, string> = {
          0: "Raising Funds",
          1: "Building",
          2: "Completed",
        };

        setProjectDetails({
          name,
          location,
          amountNeeded,
          amountRaised,
          status: statusMap[statusEnum] || "Unknown",
        });

        setRemainingShare(amountNeeded - amountRaised);
      } catch (error) {
        console.error("Error fetching project details:", error);
        alert("Failed to fetch project details. Check console for details.");
      }
    };

    if (projectAddress) fetchProjectDetails();
  }, [projectAddress, setProjectName]);

  const handleInvest = async () => {
  if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
    alert("Please enter a valid investment amount greater than 0.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    const projectContract = new ethers.Contract(projectAddress, ProjectABI.abi, signer);
    const dpTokenAddress = await projectContract.dpToken();

    const dpToken = new ethers.Contract(
      dpTokenAddress,
      [
        "function approve(address spender, uint256 amount) public returns (bool)",
        "function allowance(address owner, address spender) public view returns (uint256)",
        "function balanceOf(address account) view returns (uint256)",
        "function decimals() view returns (uint8)",
      ],
      signer
    );

    // 🔥 TEMP: Hardcode decimals = 0
    const decimals = 0;
    console.log("Using token decimals:", decimals);

    const dpAmount = ethers.BigNumber.from(investmentAmount);

    const balance = await dpToken.balanceOf(userAddress);
    console.log("User DP balance (raw):", balance.toString());
    console.log("Investment amount (raw):", dpAmount.toString());

    if (balance.lt(dpAmount)) {
      alert(`Not enough DP tokens. You have ${balance.toString()} DP.`);
      return;
    }

    const allowance = await dpToken.allowance(userAddress, projectAddress);
    if (allowance.lt(dpAmount)) {
      const approveTx = await dpToken.approve(projectAddress, dpAmount);
      await approveTx.wait();
    }

    const investTx = await projectContract.invest(dpAmount);
    await investTx.wait();

    alert(`Successfully invested ${investmentAmount} DP!`);
    setInvestmentAmount("");

    const updatedRaised = await projectContract.amountRaised();
    const updatedNeeded = await projectContract.amountNeeded();
    setRemainingShare(updatedNeeded - updatedRaised);

  } catch (error) {
    console.error("Investment error:", error);
    alert("Investment failed. Check the console for details.");
  }
};



  return (
    <div className="gap-6 grid grid-cols-3 bg-black/20 mx-auto mt-10 p-6 rounded-2xl max-w-5xl text-white">
      <div className="flex flex-col space-y-2 col-span-2">
        <p><span className="font-semibold">Location:</span> {projectDetails.location}</p>
        <p><span className="font-semibold">Company:</span> UrbanPrime Dev</p>
        <p><span className="font-semibold">Price per Unit:</span> $450,000</p>
        <p><span className="font-semibold">Status:</span> {projectDetails.status}</p>
        <div className="mt-4">
          <p className="mb-1 font-semibold">More information:</p>
          <p>Bedrooms: 1</p>
          <p>Bathrooms: 1</p>
          <p>Sq. Ft.: 750</p>
          <p>Furniture: Fully furnished</p>
          <p className="mt-2">
            Facilities: Rooftop garden ・ Co-working lounge ・ Pet spa ・ Bike storage
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="bg-black/30 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)] mb-4 px-10 py-5 rounded-2xl text-center">
          <p className="text-lg">Remaining share:</p>
          <p className="mt-1 font-bold text-3xl">
            {remainingShare.toLocaleString()} DP
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-black/30 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)] px-4 py-12 rounded-2xl">
          <div className="flex items-center bg-black/40 px-4 py-2 rounded-lg">
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-400"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
            />
            <span className="ml-2 font-semibold">DP</span>
          </div>
          <button
            onClick={handleInvest}
            className="bg-white hover:bg-gray-200 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.5)] py-2 rounded-lg font-semibold text-black transition"
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}
