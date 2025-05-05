const Project = artifacts.require("Project");
const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");

module.exports = async function(deployer) {
  deployer.deploy(DP).then(async () => {
    const dp = await DP.deployed();
    await deployer.deploy(DPVault, dp.address);
  });

  deployer.deploy(Project, "Project A", "Put description here", "Sukhumvit");
};
