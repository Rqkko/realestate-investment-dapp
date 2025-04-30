const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");

module.exports = async function(deployer, network, accounts) {  // Add accounts parameter
  const vault = await DPVault.deployed();
  const dp = await DP.deployed();
  
  // Transfer DP ownership to vault
  await dp.transferOwnership(vault.address);
};