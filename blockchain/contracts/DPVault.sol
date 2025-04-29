// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DP.sol";

contract DPVault is Ownable {
    DP public dpToken;
    
    event Deposited(address indexed user, uint256 ethAmount, uint256 dpAmount);
    event Withdrawn(address indexed user, uint256 dpAmount, uint256 ethAmount);

    constructor(address dpTokenAddress) Ownable(msg.sender) {
        dpToken = DP(dpTokenAddress);
    }

    // Fallback function moved BEFORE deposit()
    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        require(msg.value > 0, "DPVault: ETH amount must be > 0");
        uint256 dpAmount = msg.value;
        dpToken.mint(msg.sender, dpAmount);
        emit Deposited(msg.sender, msg.value, dpAmount);
    }

    function withdraw(uint256 dpAmount) external {
        require(dpAmount > 0, "DPVault: DP amount must be > 0");
        require(address(this).balance >= dpAmount, "DPVault: Insufficient ETH balance");
        dpToken.burnFrom(msg.sender, dpAmount);
        payable(msg.sender).transfer(dpAmount);
        emit Withdrawn(msg.sender, dpAmount, dpAmount);
    }

    function withdrawETH(uint256 amount) external onlyOwner {
        payable(owner()).transfer(amount);
    }

    function transferDPOwnership(address newOwner) external onlyOwner {
    dpToken.transferOwnership(newOwner);
    }
}