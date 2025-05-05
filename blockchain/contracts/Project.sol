// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DP.sol";
import "./DPVault.sol";

contract Project {
    mapping(address => uint256) public stakes;  // out of 10000 (To allow decimal in frontend)
    string public name;
    string public description;
    // string public image;
    string public location;
    address[] public investors;
    uint256 public amountNeeded;
    uint256 public amountRaised;

    enum ProjectStatus { RaisingFunds, Building, Completed }
    ProjectStatus public status;

    DP public dpToken;
    DPVault public dpVault;

    constructor(
        string memory _name,
        string memory _description,
        string memory _location,
        address _dpTokenAddress,
        address _dpVaultAddress
    ) {
        name = _name;
        description = _description;
        location = _location;
        status = ProjectStatus.RaisingFunds;
        dpToken = DP(_dpTokenAddress);
        dpVault = DPVault(payable(_dpVaultAddress));
    }

    function setAmountNeeded(uint256 _amountNeeded) public {
        amountNeeded = _amountNeeded;
    }

    function setStatus(ProjectStatus _status) public {
        status = _status;
    }

    // Investor can sell stake to project directly
    function sellStake(uint256 amount) public {
        require(stakes[msg.sender] >= amount, "Insufficient stake to sell");
        uint256 refund = (amount * amountNeeded) / 100;
        require(address(this).balance >= refund, "Project has insufficient balance");

    function invest(uint256 dpAmount) public {
        require(status == ProjectStatus.RaisingFunds, "Project is not raising funds");
        require(dpAmount > 0, "Investment must be greater than 0");
        require(amountRaised + dpAmount <= amountNeeded, "Investment exceeds amount needed");

        // Transfer DP tokens from the investor to the project
        dpToken.transferFrom(msg.sender, address(this), dpAmount);

        // Add investor to the list (if not already present)
        if (stakes[msg.sender] == 0) {
            investors.push(msg.sender);
        }

        stakes[msg.sender] += dpAmount * 10000 / amountNeeded;
        amountRaised += dpAmount;

        // Automatically change status to Building if funding goal is met
        if (amountRaised >= amountNeeded) {
            status = ProjectStatus.Building;
        }
    }

    function getStake(address user) public view returns (uint256) {
        return stakes[user];
    }

    function transferStake(address to, uint256 amount) public {
        require(stakes[msg.sender] >= amount, "Not enough stake");

        if (stakes[to] == 0) {
            investors.push(to);
        }

        stakes[msg.sender] -= amount;
        stakes[to] += amount;
    }

    function distributeDividend(uint256 amount) public {
        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint256 dividend = amount * stakes[investor] / 10000;
            dpToken.transfer(investor, dividend);
        }
    }

    // Allow contract to receive Ether
    receive() external payable {}
}
