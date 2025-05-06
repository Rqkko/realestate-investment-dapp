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

    // Step 1: Create a project
    console.log("Creating project...");
    await factory.createProject("Project A", "Luxury condo", "Sukhumvit", 1000);
    const projectAddress = await factory.getProject(0);
    const project = await Project.at(projectAddress);
    console.log("Project deployed at:", project.address);

    // Step 2: Each account deposits
    await vault.deposit({
      from: accounts[9],
      value: web3.utils.toWei("5", "ether") // 5 ETH * 100 = 500 DP
    })
    console.log(`Account 9 DP Balance:`, (await dp.balanceOf(accounts[9])).toString());
    await vault.deposit({
      from: accounts[8],
      value: web3.utils.toWei("3", "ether") // 3 ETH * 100 = 300 DP
    })
    console.log(`Account 8 DP Balance:`, (await dp.balanceOf(accounts[8])).toString());
    await vault.deposit({
      from: accounts[7],
      value: web3.utils.toWei("1", "ether") // 1 ETH * 100 = 100 DP
    })
    console.log(`Account 7 DP Balance:`, (await dp.balanceOf(accounts[7])).toString());

    // Step 3: Each account approves and invests their DP
    console.log("Approving and investing DP...");
    await dp.approve(project.address, 500, { from: accounts[9] });
    await project.invest(500, { from: accounts[9] });

    await dp.approve(project.address, 300, { from: accounts[8] });
    await project.invest(300, { from: accounts[8] });

    await dp.approve(project.address, 100, { from: accounts[7] });
    await project.invest(100, { from: accounts[7] });

    // Step 4: Check final raised amount
    const amountRaised = await project.amountRaised();
    console.log("Amount Raised:", amountRaised.toString());

    const status = await project.status();
    console.log("Project Status (0: RaisingFunds, 1: Building, 2: Completed):", status.toString());

    callback();
  } catch (err) {
    console.error("Error in script:", err);
    callback(err);
  }
};
