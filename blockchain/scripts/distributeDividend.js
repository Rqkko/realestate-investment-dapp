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

    // Get 'The Avana' project address
    console.log("Gettings 'The Avana'...");
    const projectAddress = await factory.getProject(0);
    const project = await Project.at(projectAddress);
    console.log("'The Avana' deployed at:", project.address);

    // Set project status to Completed
    await project.setStatus(2);

    // Account 9 deposits 100 DP
    await vault.deposit({ value: web3.utils.toWei("1", 'ether'), from: accounts[9] });
    await dp.approve(project.address, 100, { from: accounts[9] })
    await project.depositDP(100, { from: accounts[9] });

    await project.distributeDividend(100)
    console.log("Dividend distributed");
    callback();
  } catch (err) {
    console.error("Error in script:", err);
    callback(err);
  }
}