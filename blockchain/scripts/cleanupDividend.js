const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");
const ProjectFactory = artifacts.require("ProjectFactory");
const Project = artifacts.require("Project");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const dp = await DP.deployed();
    const vault = await DPVault.deployed();
    const factory = await ProjectFactory.deployed();

    // Transfer DP tokens from accounts[1-4] to accounts[8]
    await dp.transfer(accounts[8], 10, { from: accounts[1] });
    await dp.transfer(accounts[8], 50, { from: accounts[2] });
    await dp.transfer(accounts[8], 30, { from: accounts[3] });
    await dp.transfer(accounts[8], 10, { from: accounts[4] });

    // accounts[8] calls withdraw 100 DP for ETH from the vault
    await dp.approve(vault.address, 100, { from: accounts[8] });
    await vault.withdraw(100, { from: accounts[8] });
    console.log("DP withdrawn from the vault");

    callback();
  } catch (err) {
    console.error("Error in script:", err);
    // callback(err);
  }
}