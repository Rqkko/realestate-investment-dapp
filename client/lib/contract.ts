import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import type { ExternalProvider } from "@ethersproject/providers"; // <-- important

import ExampleABI from "../../blockchain/build/contracts/Example.json"; // Adjust path

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("No wallet found");
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ExternalProvider);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ExampleABI.abi, signer);
  return contract;
};
