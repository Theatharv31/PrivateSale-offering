const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PrivateSaleOffering (pre-deployed)", function () {
  let privateSaleOffering;
  let propXPSToken;
  let owner, acc1, acc2, acc3;

  // Replace these with your actual deployed addresses
  const deployedTokenAddress = " 0x5FbDB2315678afecb367f032d93F642f64180aa3"; // PropXPS token
  const privateSaleAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";     // Replace with actual address

  before(async () => {
    [owner, acc1, acc2, acc3] = await ethers.getSigners();

    // Attach to deployed token contract
    const PropXPS = await ethers.getContractFactory("PropXPS");
    propXPSToken = await PropXPS.attach(deployedTokenAddress);

    // Attach to deployed PrivateSaleOffering contract
    const PrivateSaleOffering = await ethers.getContractFactory("PrivateSaleOffering");
    privateSaleOffering = await PrivateSaleOffering.attach(privateSaleAddress);
  });

  it("should add referral code 'RAJEEV' with 50% discount from owner", async () => {
    await privateSaleOffering.connect(owner).addReferralCode("RAJEEV", 50);

    const discount = await privateSaleOffering.referralDiscounts("RAJEEV");
    expect(discount).to.equal(50);
  });

  it("should allow account 3 to transfer tokens using 'RAJEEV' with 10 ether", async () => {
    const code = "RAJEEV";
    const amountSent = ethers.parseEther("10");
    const recipient = acc3.address;

    // Calculate expected token amount
    const expectedTokens = await privateSaleOffering.calculateTokens(code, amountSent);

    // Call transferTokens from account 3
    await privateSaleOffering.connect(acc3).transferTokens(code, amountSent, recipient);

    // Check balance of acc3
    const balance = await propXPSToken.balanceOf(recipient);
    console.log(expectedTokens);
   
  });
});
