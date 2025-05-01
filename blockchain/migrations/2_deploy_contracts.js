// migrations/2_deploy_contracts.js
const Project = artifacts.require("Project");

module.exports = function (deployer) {
  deployer.deploy(Project);
};
