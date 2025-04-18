// scripts/deploy.js
/*
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // Get contract factory
  const Token = await ethers.getContractFactory("PropXPS");

  try {
    // Deploy contract
    const token = await Token.deploy();

    // Wait for contract to be mined
  
    await token.deployed();
    const proppsaddress = token.address;
    // Log the contract address
    console.log("PropXPS token deployed to:", proppsaddress);
  } catch (error) {
    console.error("Deployment failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in main:", error);
    process.exit(1);
  });

*/

async function main() {
  // Specify the address of the already deployed PropXPS token contract
  const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update this if needed

  // Get the contract to deploy
  const PrivateSaleOffering = await ethers.getContractFactory("PrivateSaleOffering");

  // Deploy the contract with the PropXPS token address as a constructor parameter
  const privateSaleOffering = await PrivateSaleOffering.deploy(tokenAddress);

  // Wait for the deployment to complete
  await privateSaleOffering.deployed();
  const privateaddress =  privateSaleOffering.address;

  console.log("PrivateSaleOffering deployed to:", privateaddress);
}

// Run the main function and catch any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  
