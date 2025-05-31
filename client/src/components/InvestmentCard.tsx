"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { account } from "@/lib/contract";
import ProjectMetadataABI from "@/lib/contracts/ProjectMetadata.json";
import ProjectABI from "@/lib/contracts/Project.json";

interface InvestmentCardProps {
  projectAddress: string;
  setProjectName: (name: string) => void;
}

export default function InvestmentCard({
  projectAddress,
  setProjectName,
}: InvestmentCardProps) {
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [remainingShare, setRemainingShare] = useState<number>(0);

  const [projectDetails, setProjectDetails] = useState({
    name: "",
    location: "",
    amountNeeded: 0,
    amountRaised: 0,
    status: "Raising Funds",
  });

  const [metaDetails, setMetaDetails] = useState({
    companyName: "",
    description: "",
    numBedrooms: 0,
    roomSize: 0,
    furniture: "",
    facilities: "",
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!account) {
        alert("Please connect your wallet.");
        return;
      }

      console.log(
        "Fetching project details for Project address:",
        projectAddress
      );

      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as unknown as ethers.providers.ExternalProvider,
          "any"
        );
        const signer = provider.getSigner();

        // Instantiate the Project contract
        const projectContract = new ethers.Contract(
          projectAddress,
          ProjectABI.abi,
          signer
        );

        // Defensive check: projectContract should NOT have a name() method
        if (typeof projectContract.name === "function") {
          console.warn(
            "Warning: projectContract has name() function, this is unexpected."
          );
          // Optionally throw error if you want strict checking
          // throw new Error("Project contract should not have name() method.");
        }

        // Get metadata contract address from the Project contract
        const metadataAddress = await projectContract.projectMetadata();
        console.log("Project address:", projectAddress);
        console.log("Metadata contract address:", metadataAddress);

        // Validate metadataAddress is a valid Ethereum address and not zero address
        if (
          !ethers.utils.isAddress(metadataAddress) ||
          metadataAddress === ethers.constants.AddressZero
        ) {
          alert(
            "Invalid metadata contract address returned from projectMetadata()"
          );
          return;
        }

        // Instantiate ProjectMetadata contract at metadataAddress
        const metadataContract = new ethers.Contract(
          metadataAddress,
          ProjectMetadataABI.abi,
          signer
        );

        // Check metadataContract has a name() method
        if (typeof metadataContract.name !== "function") {
          alert("Metadata contract does not have a name() method!");
          return;
        }

        // Call metadata methods safely
        const name = await metadataContract.name();
        setProjectName(name);

        const location = await metadataContract.location();
        const companyName = await metadataContract.companyName();
        const description = await metadataContract.description();
        const numBedrooms =
          (await metadataContract.numBedrooms()).toNumber?.() ??
          Number(await metadataContract.numBedrooms());
        const roomSize =
          (await metadataContract.roomSize()).toNumber?.() ??
          Number(await metadataContract.roomSize());
        const furniture = await metadataContract.furniture();
        const facilities = await metadataContract.facilities();

        setProjectDetails((prev) => ({
          ...prev,
          name,
          location,
        }));

        setMetaDetails({
          companyName,
          description,
          numBedrooms,
          roomSize,
          furniture,
          facilities,
        });

        // Fetch project investment info
        const amountNeededRaw = await projectContract.amountNeeded();
        const amountRaisedRaw = await projectContract.amountRaised();
        const statusEnumRaw = await projectContract.status();

        // Safely convert BigNumber to number
        const amountNeeded = amountNeededRaw.toNumber
          ? amountNeededRaw.toNumber()
          : Number(amountNeededRaw);
        const amountRaised = amountRaisedRaw.toNumber
          ? amountRaisedRaw.toNumber()
          : Number(amountRaisedRaw);
        const statusEnum = statusEnumRaw.toNumber
          ? statusEnumRaw.toNumber()
          : Number(statusEnumRaw);

        const statusMap: Record<number, string> = {
          0: "Raising Funds",
          1: "Building",
          2: "Completed",
        };

        setProjectDetails((prev) => ({
          ...prev,
          amountNeeded,
          amountRaised,
          status: statusMap[statusEnum] || "Unknown",
        }));

        setRemainingShare(amountNeeded - amountRaised);
      } catch (error) {
        console.error("Error fetching project metadata:", error);
        alert("Failed to fetch metadata. Check console for details.");
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

    const projectContract = new ethers.Contract(
      projectAddress,
      ProjectABI.abi,
      signer
    );
    const dpTokenAddress = await projectContract.dpToken();

    const dpToken = new ethers.Contract(
      dpTokenAddress,
      [
        "function approve(address spender, uint256 amount) public returns (bool)",
        "function allowance(address owner, address spender) public view returns (uint256)",
        "function balanceOf(address account) view returns (uint256)",
      ],
      signer
    );

    // 🚫 No decimals logic
    const dpAmount = ethers.BigNumber.from(investmentAmount);

    const balance = await dpToken.balanceOf(userAddress);
    console.log("User DP balance:", balance.toString());
    console.log("Investment amount:", dpAmount.toString());

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

    // Refresh share info
    const updatedRaisedRaw = await projectContract.amountRaised();
    const updatedNeededRaw = await projectContract.amountNeeded();

    const updatedRaised = updatedRaisedRaw.toNumber
      ? updatedRaisedRaw.toNumber()
      : Number(updatedRaisedRaw);
    const updatedNeeded = updatedNeededRaw.toNumber
      ? updatedNeededRaw.toNumber()
      : Number(updatedNeededRaw);
    setRemainingShare(updatedNeeded - updatedRaised);
  } catch (error) {
    console.error("Investment error:", error);
    alert("Investment failed. Check the console for details.");
  }
  window.location.reload();

};


  return (
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-3 gap-6 bg-black/20 rounded-2xl p-6 text-white">
      <div className="col-span-2 flex flex-col space-y-2">
        <p>
          <span className="font-semibold">Location:</span>{" "}
          {projectDetails.location}
        </p>
        <p>
          <span className="font-semibold">Company:</span>{" "}
          {metaDetails.companyName}
        </p>
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {metaDetails.description}
        </p>
        <p>
          <span className="font-semibold">Price per Unit:</span> $450,000
        </p>
        <p>
          <span className="font-semibold">Status:</span> {projectDetails.status}
        </p>
        <div className="mt-4">
          <p className="font-semibold mb-1">More information:</p>
          <p>Bedrooms: {metaDetails.numBedrooms}</p>
          <p>Room Size: {metaDetails.roomSize} sq. ft.</p>
          <p>Furniture: {metaDetails.furniture}</p>
          <p className="mt-2">Facilities: {metaDetails.facilities}</p>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="bg-black/30 rounded-2xl px-10 py-5 mb-4 text-center shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
          <p className="text-lg">Remaining share:</p>
          <p className="text-3xl font-bold mt-1">
            {remainingShare.toLocaleString()} DP
          </p>
        </div>

        <div className="bg-black/30 rounded-2xl px-4 py-12 flex flex-col space-y-4 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
          <div className="flex items-center bg-black/40 rounded-lg px-4 py-2 w-full overflow-hidden">
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="bg-transparent outline-none text-white flex-1 min-w-0 placeholder-gray-400"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
            />
            <span className="ml-2 font-semibold whitespace-nowrap">DP</span>
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
