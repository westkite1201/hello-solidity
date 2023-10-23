const { ethers } = require('hardhat');

async function main() {
  // Deploy the contract
  const MyToken = await ethers.getContractFactory('MyNFT');
  const myToken = await MyToken.deploy(
    'westkite',
    'wk',
    'https://gateway.pinata.cloud/ipfs/QmRK6ABuRbREH7wCNpEfoE5WXf9aq6fa9NcKk16c68Ptu8?_gl=1*1g3n2k7*_ga*MzAyNzM1MDc4LjE2OTAxNzQwNTg.*_ga_5RMPXG14TE*MTY5MDE3NDA1OS4xLjEuMTY5MDE3NDE0Ni40OS4wLjA.',
  );

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
