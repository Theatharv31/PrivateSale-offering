import { expect } from "chai";
import { ethers } from "hardhat";

describe("PropXPS Token Contract", function () {
  let token, owner, account1, account2;

  before(async function () {
    [owner, account1, account2] = await ethers.getSigners();
    token = await ethers.getContractAt("PropXPS", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  });

  it("Only owner should mint 5000.500 tokens", async function () {
    const tx = await token.connect(owner).mint(5000500);
    await tx.wait();

    const expectedBalance = ethers.parseUnits("5000.5", 18);
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.be.gte(expectedBalance);
  });

  it("Owner should transfer 300.300 tokens to account1", async function () {
    const tokensToTransfer = 300300;
    const expectedAmount = ethers.parseUnits("300.3", 18);

    const privateSaleAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const tx = await token.connect(owner).transferToPrivateSale(tokensToTransfer, privateSaleAddress);
    await tx.wait();

    const balance = await token.balanceOf(account1.address);
    expect(balance).to.equal(expectedAmount);
  });
});
