const { ethers } = require('hardhat');

async function main() {
  // Deploy the contract
  const MyToken = await ethers.getContractFactory('Erc721Meta');
  const myToken = await MyToken.deploy('westkite', 'wk');

  // Wait for the contract to be deployed
  await myToken.deployed();

  // Mint tokens
  //   const to = '0x598338ef6c0d411b1fEF5E6ff0EC2a63D3cE1faf';
  //   await myToken.safeMint(to);

  //   console.log('Tokens minted and contract deployed!');
  console.log('Contract address:', myToken.address);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
