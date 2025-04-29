const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");

module.exports = async function (deployer) {
  // 1. Deploy DP Token
  await deployer.deploy(DP);
  const dpToken = await DP.deployed();

  // 2. Deploy Vault with DP Token address
  await deployer.deploy(DPVault, dpToken.address);
  const vault = await DPVault.deployed();

  // 3. Optional: Transfer DP's ownership to vault
  await dpToken.transferOwnership(vault.address);

  console.log("\nDeployment Complete:");
  console.log("DP Token address:", dpToken.address);
  console.log("DPVault address:", vault.address);
};