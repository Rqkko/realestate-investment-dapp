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
//     <div className="max-w-5xl mx-auto mt-10 grid grid-cols-3 gap-6 bg-black/20 rounded-2xl p-6 text-white">
//       {/* Left side (project details) */}
//       <div className="col-span-2 flex flex-col space-y-2">
//         <p><span className="font-semibold">Location:</span> {project.location}</p>
//         <p><span className="font-semibold">Company:</span> {project.company}</p>
//         <p><span className="font-semibold">Price per Unit:</span> ${project.pricePerUnit.toLocaleString()}</p>
//         <p><span className="font-semibold">Status:</span> {project.status}</p>
//         <div className="mt-4">
//           <p className="font-semibold mb-1">More information:</p>
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
//         <div className="bg-black/30 rounded-2xl px-10 py-5 mb-4 text-center shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
//           <p className="text-lg">Remaining share:</p>
//           <p className="text-3xl font-bold mt-1">{project.remainingShare.toLocaleString()} DP</p>
//         </div>

//         {/* Invest input */}
//         <div className="bg-black/30 rounded-2xl px-4 py-12 flex flex-col space-y-4 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
//           <div className="flex items-center bg-black/40 rounded-lg px-4 py-2">
//             <input
//               type="number"
//               step={0.01}
//               placeholder="0.00"
//               className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
//             />
//             <span className="ml-2 font-semibold">DP</span>
//           </div>
//           <button className="bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.5)] transition">
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
//     <div className="max-w-5xl mx-auto mt-10 grid grid-cols-3 gap-6 bg-black/20 rounded-2xl p-6 text-white">
//       {/* Left side (project details) */}
//       <div className="col-span-2 flex flex-col space-y-2">
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
//           <p className="font-semibold mb-1">More information:</p>
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
//         <div className="bg-black/30 rounded-2xl px-10 py-5 mb-4 text-center shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
//           <p className="text-lg">Remaining share:</p>
//           <p className="text-3xl font-bold mt-1">{remainingShare.toLocaleString()} DP</p>
//         </div>

//         {/* Invest input */}
//         <div className="bg-black/30 rounded-2xl px-4 py-12 flex flex-col space-y-4 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
//           <div className="flex items-center bg-black/40 rounded-lg px-4 py-2">
//             <input
//               type="number"
//               step="0.01"
//               placeholder="0.00"
//               className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
//               value={investmentAmount}
//               onChange={(e) => setInvestmentAmount(e.target.value)}
//             />
//             <span className="ml-2 font-semibold">DP</span>
//           </div>
//           <button
//             onClick={handleInvest}
//             className="bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.5)] transition"
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

export default function InvestmentCard() {
  const [investmentAmount, setInvestmentAmount] = useState<string>(""); // User's input investment amount
  const [remainingShare, setRemainingShare] = useState<number>(30000); // Initial mock data for remaining shares
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
    const projectAddress = "<PROJECT_CONTRACT_ADDRESS>"; // Replace with your actual contract address
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as unknown as ethers.providers.ExternalProvider
    );
    const signer = provider.getSigner();
    const projectContract = new ethers.Contract(projectAddress, ProjectABI.abi, signer);

    // Fetching details from the contract
    const name = await projectContract.name();
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
    alert("Failed to fetch project details. Please check the console for more information.");
  }
};

    fetchProjectDetails();
  }, []);

  const handleInvest = async () => {
    if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
      alert("Please enter a valid investment amount greater than 0.");
      return;
    }

    try {
      const projectAddress = "<PROJECT_CONTRACT_ADDRESS>"; // Replace with your actual contract address
      const provider = new ethers.providers.Web3Provider(
  window.ethereum as unknown as ethers.providers.ExternalProvider
);
      const signer = provider.getSigner();
      const projectContract = new ethers.Contract(projectAddress, ProjectABI.abi, signer);

      const dpAmount = ethers.utils.parseEther(investmentAmount);
      const tx = await projectContract.invest(dpAmount);
      await tx.wait();

      alert(`Successfully invested ${investmentAmount} DP!`);
      setRemainingShare((prev) => prev - parseFloat(investmentAmount));
    } catch (error) {
      console.error("Investment error:", error);
      alert("Investment failed. Please try again or check the console for errors.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-3 gap-6 bg-black/20 rounded-2xl p-6 text-white">
      {/* Left side (project details) */}
      <div className="col-span-2 flex flex-col space-y-2">
        <p>
          <span className="font-semibold">Location:</span> {projectDetails.location}
        </p>
        <p>
          <span className="font-semibold">Company:</span> UrbanPrime Dev
        </p>
        <p>
          <span className="font-semibold">Price per Unit:</span> $450,000
        </p>
        <p>
          <span className="font-semibold">Status:</span> {projectDetails.status}
        </p>
        <div className="mt-4">
          <p className="font-semibold mb-1">More information:</p>
          <p>Bedrooms: 1</p>
          <p>Bathrooms: 1</p>
          <p>Sq. Ft.: 750</p>
          <p>Furniture: Fully furnished</p>
          <p className="mt-2">
            Facilities: Rooftop garden ・ Co-working lounge ・ Pet spa ・ Bike storage
          </p>
        </div>
      </div>

      {/* Right side (remaining share and invest input) */}
      <div className="flex flex-col justify-between">
        {/* Remaining share */}
        <div className="bg-black/30 rounded-2xl px-10 py-5 mb-4 text-center shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
          <p className="text-lg">Remaining share:</p>
          <p className="text-3xl font-bold mt-1">
            {remainingShare.toLocaleString()} DP
          </p>
        </div>

        {/* Invest input */}
        <div className="bg-black/30 rounded-2xl px-4 py-12 flex flex-col space-y-4 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
          <div className="flex items-center bg-black/40 rounded-lg px-4 py-2">
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
            />
            <span className="ml-2 font-semibold">DP</span>
          </div>
          <button
            onClick={handleInvest}
            className="bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.5)] transition"
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}
