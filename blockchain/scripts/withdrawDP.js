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

    const projectAddress = await factory.getProject(0);
    const project = await Project.at(projectAddress);

    // Check DP in project
    const dpInProject = await dp.balanceOf(project.address);
    console.log("DP in project:", dpInProject.toString());

    // Investors sell stakes
    await project.sellStake(1000, { from: accounts[1] });
    await project.sellStake(5000, { from: accounts[2] });
    await project.sellStake(3000, { from: accounts[3] });
    await project.sellStake(1000, { from: accounts[4] });
    console.log("DP distributed to all investors");

    // Approve DP for the vault
    await dp.approve(vault.address, 100, { from: accounts[1] });
    await dp.approve(vault.address, 500, { from: accounts[2] });
    await dp.approve(vault.address, 300, { from: accounts[3] });
    await dp.approve(vault.address, 100, { from: accounts[4] });
    console.log("DP approved for the vault");

    // Withdraw DP from the vault
    await vault.withdraw(100, { from: accounts[1] });
    await vault.withdraw(500, { from: accounts[2] });
    await vault.withdraw(300, { from: accounts[3] });
    await vault.withdraw(100, { from: accounts[4] });
    console.log("DP withdrawn from the vault");

    callback();
  } catch (err) {
    console.error("Error in script:", err);
    callback(err);
  }
}