import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import type { ExternalProvider } from "@ethersproject/providers";

import ExampleABI from "./contracts/Example.json";
import DPABI from "./contracts/DP.json";
import DPVaultABI from "./contracts/DPVault.json";
import ProjectFactoryABI from "./contracts/ProjectFactory.json";

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
let dpContract: ethers.Contract | undefined;
let dpVaultContract: ethers.Contract | undefined;
let projectFactoryContract: ethers.Contract | undefined;

if (typeof window !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ExternalProvider);
  const signer = provider.getSigner();
  
  const network = await provider.getNetwork();
  const networkId = String(network.chainId);
  
  account = (await provider.send("eth_requestAccounts", []))[0];
  
  // Get the contract address from the ABI
  let exampleContractAddress: string;
  let dpContractAddress: string;
  let dpVaultContractAddress: string;
  let projectFactoryContractAddress: string;
  try {
    exampleContractAddress = (ExampleABI.networks as NetworkMap)[networkId].address;
    dpContractAddress = (DPABI.networks as NetworkMap)[networkId].address;
    dpVaultContractAddress = (DPVaultABI.networks as NetworkMap)[networkId].address;
    projectFactoryContractAddress = (ProjectFactoryABI.networks as NetworkMap)[networkId].address;
  } catch { 
    console.log("Invalid networkId, using default contract address (1337)");
    exampleContractAddress = (ExampleABI.networks as NetworkMap)["1337"].address;
    dpContractAddress = (DPABI.networks as NetworkMap)["1337"].address;
    dpVaultContractAddress = (DPVaultABI.networks as NetworkMap)["1337"].address;
    projectFactoryContractAddress = (ProjectFactoryABI.networks as NetworkMap)["1337"].address;
  }
  exampleContract = new ethers.Contract(exampleContractAddress, ExampleABI.abi, signer);
  dpContract = new ethers.Contract(dpContractAddress, DPABI.abi, signer);
  dpVaultContract = new ethers.Contract(dpVaultContractAddress, DPVaultABI.abi, signer);
  projectFactoryContract = new ethers.Contract(projectFactoryContractAddress, ProjectFactoryABI.abi, signer);
}

export { provider, account, exampleContract, dpContract, dpVaultContract, projectFactoryContract };
