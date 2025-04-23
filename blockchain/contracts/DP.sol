// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DP is ERC20, Ownable {
    uint256 private constant INITIAL_SUPPLY = 10_000_000 * 10**18; // Fixed decimal calculation
    
    constructor() ERC20("DeProp Token", "DP") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "DP: mint to zero address");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "DP: burn amount exceeds balance");
        _burn(msg.sender, amount);
    }
}