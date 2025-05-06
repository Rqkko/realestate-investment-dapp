const Project = artifacts.require("Project");
const ProjectFactory = artifacts.require("ProjectFactory");
const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");

module.exports = async function(deployer) {
  await deployer.deploy(DP);
  const dp = await DP.deployed();
  await deployer.deploy(DPVault, dp.address);
  const vault = await DPVault.deployed();
  // await deployer.deploy(Project, "Project A", "Description", "Location", dp.address, vault.address);
  deployer.deploy(ProjectFactory);
};
