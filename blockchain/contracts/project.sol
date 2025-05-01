// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Project {
    mapping(address => uint256) public stakes;               // Track how much each user has invested
    address[] public investors;                              // Store all investor addresses

    function invest() public payable {                       // Users invest Ether into the contract
        if (stakes[msg.sender] == 0) {                       // First-time investor? Add to list
            investors.push(msg.sender);
        }
        stakes[msg.sender] += msg.value;                     // Increase their stake
    }

    function getStake(address user) public view returns (uint256) {
        return stakes[user];                                 // Return user's invested amount
    }

    function transferStake(address to, uint256 amount) public {
        require(stakes[msg.sender] >= amount, "Not enough stake"); // Ensure sender has enough stake

        if (stakes[to] == 0) {                               // New recipient? Add to investors
            investors.push(to);
        }

        stakes[msg.sender] -= amount;                        // Deduct from sender
        stakes[to] += amount;                                // Add to recipient
    }

    function distributeDividend() public {
        for (uint i = 0; i < investors.length; i++) {        // Loop through all investors
            address investor = investors[i];                 // Get investor address
            uint256 dividend = stakes[investor] / 100;       // Calculate 1% dividend
            payable(investor).transfer(dividend);            // Send dividend
        }
    }

    receive() external payable {}                            // Allow contract to receive Ether
}
