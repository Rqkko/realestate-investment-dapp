// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DP.sol";

contract DPVault is Ownable {
    DP public dpToken;
    uint256 private rate = 100; 
    
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
        require(address(msg.sender).balance >= msg.value, "DPVault: Insufficient ETH balance");
        uint256 dpAmount = msg.value * rate;
        dpToken.mint(msg.sender, dpAmount);
        emit Deposited(msg.sender, msg.value, dpAmount);
    }

    function withdraw(uint256 dpAmount) external {
        require(dpAmount > 0, "DPVault: DP amount must be > 0");
        require(dpToken.balanceOf(msg.sender) >= dpAmount, "DPVault: Insufficient DP balance");
        require(address(this).balance >= dpAmount/rate, "DPVault: Insufficient ETH in vault");
        dpToken.burnFrom(msg.sender, dpAmount);
        payable(msg.sender).transfer(dpAmount/rate);
        emit Withdrawn(msg.sender, dpAmount, dpAmount);
    }

    function withdrawETH(uint256 amount) external onlyOwner {
        payable(owner()).transfer(amount);
    }
}