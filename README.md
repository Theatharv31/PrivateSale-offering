# PropX Private Sale Smart Contracts

This repository contains the smart contract code for managing the PropX private token sale on Ethereum-compatible blockchains. The system allows:

- 💡 Referral-based token purchases
- 🏷️ Each referral code has a unique discount percentage
- 🧮 Tokens are calculated based on the current price minus the referral discount
- 🔐 Uses nonReentrant security for safe token transfers
- 💰 Admin can manage referral codes and update token prices on-chain

---

## 🧾 How it Works

1. Admin adds referral codes (e.g., `RAJEEV`, `VIKAS`, `SONU`), each with a unique discount (e.g., 10%, 20%).
2. A buyer provides a referral code and purchase amount (in ETH or MATIC).
3. The smart contract calculates how many tokens they receive based on:
   - `discountedTokenPrice = tokenPrice * (100 - discount) / 100`
   - `tokens = amountPaid / discountedTokenPrice`
4. Tokens are transferred directly to the buyer.

