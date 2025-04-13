// migrations/2_deploy_contracts.js
const Example = artifacts.require("Example");

module.exports = function (deployer) {
  deployer.deploy(Example);
};
