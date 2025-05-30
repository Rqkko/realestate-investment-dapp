const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");

contract("DPVault", (accounts) => {
  let dp, vault;
  const owner = accounts[0];
  const user = accounts[1];

  before(async () => {
    dp = await DP.deployed();
    vault = await DPVault.deployed();
  });

  it("should allow deposit of ETH and mint DP tokens", async () => {
    const depositAmount = web3.utils.toWei("1", "ether");
    await vault.deposit({ from: user, value: depositAmount });

    const dpBalance = await dp.balanceOf(user);
    // Assuming 1 ETH = 100 DP tokens (with 18 decimals)
    assert.equal(dpBalance, 100, "User should receive 100 DP tokens");
  });

  it("should allow withdrawal of DP tokens for ETH", async () => {
    // Approve vault to spend user's DP tokens
    await dp.approve(vault.address, 100, { from: user });

    // Withdraw 100 DP tokens (should receive 1 ETH)
    const initialEthBalance = web3.utils.toBN(await web3.eth.getBalance(user));
    const tx = await vault.withdraw(100, { from: user });
    const gasUsed = web3.utils.toBN(tx.receipt.gasUsed);
    const txDetails = await web3.eth.getTransaction(tx.tx);
    const gasPrice = web3.utils.toBN(txDetails.gasPrice);
    const gasCost = gasUsed.mul(gasPrice);

    const finalEthBalance = web3.utils.toBN(await web3.eth.getBalance(user));
    // User should receive 1 ETH minus gas cost
    assert(
      finalEthBalance.sub(initialEthBalance).add(gasCost).eq(web3.utils.toBN(web3.utils.toWei("1", "ether"))),
      "User should receive 1 ETH for 100 DP tokens"
    );
  });

  it("should update DPVault ETH balance correctly", async () => {
    const vaultBalance = await web3.eth.getBalance(vault.address);
    // After deposit and withdrawal, vault should have 0 ETH
    assert.equal(web3.utils.fromWei(vaultBalance, "ether"), "0", "Vault ETH balance should be 0");
  });
});