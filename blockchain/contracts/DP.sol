// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DP is ERC20, Ownable {
    uint256 private constant INITIAL_SUPPLY = 10_000_000 * 10**18; // 10M tokens with 18 decimals
    
    constructor() ERC20("DeProp Token", "DP") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @dev Mints new tokens to specified address
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint (in wei)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "DP: mint to zero address");
        _mint(to, amount);
    }

    /**
     * @dev Burns tokens from the caller's balance
     * @param amount The amount of tokens to burn (in wei)
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * @dev Burns tokens from a specified address (owner-only)
     * @param from The address to burn tokens from
     * @param amount The amount of tokens to burn (in wei)
     */
    function burnFrom(address from, uint256 amount) external onlyOwner {
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
    }
}