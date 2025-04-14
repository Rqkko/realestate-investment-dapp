import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import type { ExternalProvider } from "@ethersproject/providers";

import ExampleABI from "./contracts/Example.json";

interface NetworkMap {
  [key: string]: {
    address: string;
  };
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

let provider: ethers.providers.Web3Provider | undefined;
let account: string | undefined;
let exampleContract: ethers.Contract | undefined;

if (typeof window !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ExternalProvider);
  const signer = provider.getSigner();
  
  const network = await provider.getNetwork();
  const networkId = String(network.chainId);
  
  account = (await provider.send("eth_requestAccounts", []))[0];
  
  let exampleContractAddress: string;
  try {
    exampleContractAddress = (ExampleABI.networks as NetworkMap)[networkId].address;
  } catch {
    console.log("Invalid networkId, using default contract address (1337)");
    exampleContractAddress = (ExampleABI.networks as NetworkMap)["1337"].address;
  }
  exampleContract = new ethers.Contract(exampleContractAddress, ExampleABI.abi, signer);
}

export { provider, account, exampleContract };
