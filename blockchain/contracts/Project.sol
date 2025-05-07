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
    
    event ContributionReceived(address indexed contributor, uint256 dpAmount);

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
    function sellStake(uint256 stakeAmount) public {
        require(stakeAmount > 0, "Amount must be greater than 0");
        require(stakes[msg.sender] >= stakeAmount, "Not enough stake to sell");

        // Calculate the DP token amount to return to the investor
        uint256 dpAmount = (stakeAmount * amountNeeded) / 10000;

        // Ensure the project has enough DP tokens to pay the investor
        require(dpToken.balanceOf(address(this)) >= dpAmount, "Project does not have enough DP tokens");

        // Transfer DP tokens back to the investor
        dpToken.transfer(msg.sender, dpAmount);

        // Update the investor's stake and the amount raised
        stakes[msg.sender] -= stakeAmount;
        amountRaised -= dpAmount;

        // Remove the investor from the list if their stake becomes zero
        if (stakes[msg.sender] == 0) {
            for (uint256 i = 0; i < investors.length; i++) {
                if (investors[i] == msg.sender) {
                    investors[i] = investors[investors.length - 1];
                    investors.pop();
                    break;
                }
            }
        }
    }

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

    function depositDP(uint256 dpAmount) public {
        require(dpAmount > 0, "Amount must be greater than 0");

        // Transfer DP tokens from the sender to the Project contract
        dpToken.transferFrom(msg.sender, address(this), dpAmount);

        // Emit an event for tracking contributions
        emit ContributionReceived(msg.sender, dpAmount);
    }

    // function depositToVault() public payable {
    //     require(msg.value > 0, "Must send Ether to deposit");
    //     require(address(this).balance >= msg.value, "Insufficient Ether balance");
    //     dpVault.deposit{value: msg.value}();
    // }

    // // Allow contract to receive Ether
    // receive() external payable {}
}
