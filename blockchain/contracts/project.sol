// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Project {
    // Track each user's stake
    mapping(address => uint256) public stakes;

    // Invest function
    function invest() public payable {
        stakes[msg.sender] += msg.value;
    }

    // Get your stake
    function getStake(address user) public view returns (uint256) {
        return stakes[user];
    }

    // Transfer stake to another
    function transferStake(address to, uint256 amount) public {
        require(stakes[msg.sender] >= amount, "Not enough stake");
        stakes[msg.sender] -= amount;
        stakes[to] += amount;
    }

    // Distribute dividends to all (example: 1% of each stake)
    //function distributeDividend(amonunt...????) public {
        // This will need **more logic** (you can add later)
        // for loop : for inverstors...???
    //}
}

// needed money (100 DP) : raised money (35 DP/100 DP) -> 35% 