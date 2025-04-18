// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PropXPS is ERC20, Ownable, ReentrancyGuard {
    event TokensMinted(address indexed to, uint256 amount);
    event PrivateSaleTransfer(address indexed to, uint256 amount);

    constructor() ERC20("PropX-PS", "PPS") {}

    function mint(uint256 numberOfTokens) external onlyOwner nonReentrant {
        require(numberOfTokens > 0, "Mint: amount must be > 0");

        uint256 amount = numberOfTokens * 10 ** decimals();
        _mint(owner(), amount);

        emit TokensMinted(owner(), amount);
    }

    function transferToPrivateSale(uint256 numberOfTokens, address recipient) external onlyOwner nonReentrant {
        require(numberOfTokens > 0, "Transfer: amount must be > 0");
        require(recipient != address(0), "Transfer: zero address not allowed");

        uint256 amount = numberOfTokens * 10 ** decimals();
        _transfer(owner(), recipient, amount);

        emit PrivateSaleTransfer(recipient, amount);
    }
}  
