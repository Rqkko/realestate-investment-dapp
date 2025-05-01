// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Project {
    mapping(address => uint256) public stakes;
    string public projectName;
    string public projectDescription;
    string public projectImage;
    string public projectLocation;
    address[] public investors;
    uint256 public amountNeeded;
    uint256 public amountRaised;

    function setAmountNeeded(uint256 _amountNeeded) public {
        amountNeeded = _amountNeeded;
    }

    // TODO: Change every part that utilizes ETH to DP
    function invest() public payable {
        require(msg.value <= amountNeeded, "Investment exceeds amount needed");
        require(msg.value > 0, "Investment must be greater than 0");
        // Add investor to list (if not already present)
        if (stakes[msg.sender] == 0) {
            investors.push(msg.sender);
        }
        stakes[msg.sender] += msg.value*100/amountNeeded;
        amountRaised += msg.value;
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
            uint256 dividend = amount * stakes[investor] / 100;
            payable(investor).transfer(dividend);
        }
    }
    
    // Allow contract to receive Ether
    receive() external payable {}
}
