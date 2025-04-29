const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");

module.exports = async function(deployer, network, accounts) {  // Add accounts parameter
  const vault = await DPVault.deployed();
  const dp = await DP.deployed();
  
  // Transfer DP ownership to accounts[0]
  await vault.transferDPOwnership(accounts[0], {from: accounts[0]});
  console.log("Transferred DP ownership to:", accounts[0]);
};