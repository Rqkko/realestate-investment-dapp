// TODO Fix this (If have time)
const DP = artifacts.require("DP");

contract("DP", (accounts) => {
  let dp;
  const owner = accounts[0];
  const initialSupply = "10000000000000000000000000"; // 10M tokens in wei (string format)

  before(async () => {
    dp = await DP.new();
  });

  it("should mint initial supply to owner", async () => {
    const balance = await dp.balanceOf(owner);
    assert.equal(balance.toString(), initialSupply);
  });

  it("should allow token burning", async () => {
    const burnAmount = "1000000000000000000"; // 1 token in wei
    const expectedBalance = "9999999000000000000000000"; // 10M - 1 in wei
    
    await dp.burn(burnAmount, { from: owner });
    const balance = await dp.balanceOf(owner);
    assert.equal(balance.toString(), expectedBalance);
  });
});