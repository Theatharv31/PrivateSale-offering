// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./propx-ps.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PrivateSaleOffering is ReentrancyGuard {

    PropXPS public immutable propXPSToken;
    address public immutable owner;

    uint256 public tokenPrice = 0.2 ether;
    mapping(string => uint256) public referralDiscounts;

    event ReferralCodeAdded(string code, uint256 discountPercent);
    event ReferralCodeUpdated(string code, uint256 newDiscountPercent);
    event TokenTransferred(address indexed to, uint256 tokensTransferred, string referralCode, uint256 discount);
    event TokenPriceUpdated(uint256 newPrice);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address tokenAddress) {
        propXPSToken = PropXPS(tokenAddress);
        owner = msg.sender;
    }

    function addReferralCode(string memory code, uint256 discountPercent) external onlyOwner {
        require(discountPercent <= 100, "Invalid discount");
        referralDiscounts[code] = discountPercent;
        emit ReferralCodeAdded(code, discountPercent);
    }

    function changeReferralCode(string memory code, uint256 newDiscountPercent) external onlyOwner {
        require(referralDiscounts[code] > 0, "Code doesn't exist");
        require(newDiscountPercent <= 100, "Invalid discount");
        referralDiscounts[code] = newDiscountPercent;
        emit ReferralCodeUpdated(code, newDiscountPercent);
    }

    function changeTokenPrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be > 0");
        tokenPrice = newPrice;
        emit TokenPriceUpdated(newPrice);
    }

    function calculateTokens(string memory code, uint256 amountReceived) public view returns (uint256) {
        uint256 discount = referralDiscounts[code];
        require(discount <= 100, "Invalid discount");

        uint256 discountedTokenPrice = tokenPrice * (100 - discount) / 100;
        uint256 tokensToTransfer = (amountReceived * (10 ** 18)) / discountedTokenPrice;

        return tokensToTransfer;
    }

    function transferTokens(string memory code, uint256 amountReceived, address recipient) external nonReentrant {
        require(recipient != address(0), "Invalid recipient");
        require(bytes(code).length > 0, "Referral code cannot be empty");
        require(amountReceived > 0, "Amount received must be greater than zero");

        uint256 tokensToTransfer = calculateTokens(code, amountReceived);
        require(propXPSToken.balanceOf(address(this)) >= tokensToTransfer, "Not enough tokens in contract");

        bool sent = propXPSToken.transfer(recipient, tokensToTransfer);
        require(sent, "Token transfer failed");

        emit TokenTransferred(recipient, tokensToTransfer, code, referralDiscounts[code]);
    }
}