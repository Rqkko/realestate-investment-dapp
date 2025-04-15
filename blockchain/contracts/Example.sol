// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Example {
    event Invest(address indexed investor, uint256 amount);

    mapping(address => uint256) public ownership;

    function invest() public payable {
        require(msg.value > 0, "Must send ETH");
        ownership[msg.sender] += msg.value;
        emit Invest(msg.sender, msg.value);
    }

    function getOwnership(address user) public view returns (uint256) {
        return ownership[user];
    }
} 