const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");

module.exports = async function(deployer) {
  // Deploy DP
  await deployer.deploy(DP);
  const dp = await DP.deployed();
  
  // Deploy Vault with DP's address
  await deployer.deploy(DPVault, dp.address);
};