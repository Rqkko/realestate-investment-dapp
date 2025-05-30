const ProjectFactory = artifacts.require("ProjectFactory");
const Project = artifacts.require("Project");
const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");

contract("Project Integration", (accounts) => {
  let factory, dp, vault, project, projectAddress;

  before(async () => {
    factory = await ProjectFactory.deployed();
    dp = await DP.deployed();
    vault = await DPVault.deployed();

    // Create a new project for testing
    await factory.createProject('The Avana', 'A high-end condominium', 'Sukhumvit', 1000, { from: accounts[0] });
    projectAddress = await factory.projects(0);
    project = await Project.at(projectAddress);

    // Add more investors
    await vault.deposit({ value: web3.utils.toWei("5", "ether"), from: accounts[2] });
    await dp.approve(project.address, 500, { from: accounts[2] });
    await project.invest(500, { from: accounts[2] });
    await vault.deposit({ value: web3.utils.toWei("3", "ether"), from: accounts[3] });
    await dp.approve(project.address, 300, { from: accounts[3] });
    await project.invest(300, { from: accounts[3] });
    await vault.deposit({ value: web3.utils.toWei("1", "ether"), from: accounts[4] });
    await dp.approve(project.address, 100, { from: accounts[4] });
    await project.invest(100, { from: accounts[4] });
  });

  it("should get project details", async () => {
    const projectName = await project.name();
    assert.equal(projectName, "The Avana", "Project name should be 'The Avana'");

    const amountNeeded = await project.amountNeeded();
    assert.equal(amountNeeded.toString(), "1000", "Amount needed should be 10000 DP");
  });

  it("should allow investor to deposits ETH to DPVault and receives DP tokens", async () => {
  await vault.deposit({ value: web3.utils.toWei("1", "ether"), from: accounts[1] });
    const bal = await dp.balanceOf(accounts[1]);
    assert.equal(bal.toString(), "100", "Investor should receive 100 DP tokens");
  });

  it("should allow investor to invests 100 DP into The Avana", async () => {
    await dp.approve(project.address, 100, { from: accounts[1] });
    await project.invest(100, { from: accounts[1] });

    const amountRaised = await project.amountRaised();
    assert.equal(amountRaised.toString(), "1000", "Amount raised should be 1000 DP");

    const bal = await dp.balanceOf(accounts[1]);
    assert.equal(bal.toString(), "0", "Investor DP balance should be 0 after investment");
  });

  it("should check the investor in The Avana", async () => {
    const investor = await project.investors(3);
    assert.equal(investor, accounts[1], "Investor at index 3 should be the investor");
  });

  it("should check stake of investors", async () => {
    const stake = await project.stakes(accounts[1]);
      assert.equal(stake.toString(), "1000", `Stake of investor should be 1000 (10%)`);
  });

  it("should distribute dividends to investors", async () => {
    // accounts[9] deposits and invests to provide profit
    await vault.deposit({ value: web3.utils.toWei("1", "ether"), from: accounts[9] });
    await dp.approve(project.address, 100, { from: accounts[9] });
    await project.depositDP(100, { from: accounts[9] });

    // Distribute 100 DP as dividends
    await project.distributeDividend(100);

    // Check DP balance of accounts[1] (should receive 10 DP for 10% of 100)
    const bal = await dp.balanceOf(accounts[1]);
    assert.equal(bal.toString(), "10", "Investor should receive 10 DP as dividend");
  });

  it("should allow investor to sell their stake", async () => {
    await project.sellStake(1000, { from: accounts[1] }); // 1000 = 10%
    const bal = await dp.balanceOf(accounts[1]);
    assert(bal.toNumber() == 110, "Investor should have 110 DP after selling stake");
  });

  it("should allow investor to withdraw DP for ETH", async () => {
    await dp.approve(vault.address, 110, { from: accounts[1] });
    const initialEth = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
    const tx = await vault.withdraw(110, { from: accounts[1] });
    const gasUsed = web3.utils.toBN(tx.receipt.gasUsed);
    const txDetails = await web3.eth.getTransaction(tx.tx);
    const gasPrice = web3.utils.toBN(txDetails.gasPrice);
    const gasCost = gasUsed.mul(gasPrice);
    const finalEth = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
    const receivedEth = finalEth.sub(initialEth).add(gasCost);
    assert.equal(receivedEth.toString(), web3.utils.toWei("1", "ether"), "Investor should receive 0.1 ETH for 10 DP tokens");
    const bal = await dp.balanceOf(accounts[1]);
    assert.equal(bal.toString(), "0", "Investor DP balance should be 0 after withdrawal");
  });
});