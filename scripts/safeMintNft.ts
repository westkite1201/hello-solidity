const { ethers } = require('hardhat');
const MyNFT = require('../artifacts/contracts/erc721Meta.sol/Erc721Meta.json');

// Replace <MY_NFT_CONTRACT_ADDRESS> with the actual deployed contract address
const myNFTContractAddress = '0x447d47372ee8706A1C4Afd5AAA58b75EeD511023';

async function main() {
  const provider = new ethers.providers.InfuraProvider('sepolia');
  const privateKey = process.env.SEPOLIA_PRIVATE_KEY as string;
  const wallet = new ethers.Wallet(privateKey, provider);
  // Load the contract's ABI (replace with the actual ABI of your MyNFT contract)
  const abi = MyNFT.abi;
  const [signer] = await ethers.getSigners();
  //const userAddress = await signer.getAddress();
  console.log(wallet.address);

  const userAddress = wallet.address;
  // Connect to the deployed contract using the ABI and contract address
  const myNFTContract = new ethers.Contract(myNFTContractAddress, abi, signer);

  // Call the safeMint function to mint a new NFT
  const name = 'My NFT Test';
  const description = 'This is my first NFT';
  const imageUri =
    'https://gateway.pinata.cloud/ipfs/QmRK6ABuRbREH7wCNpEfoE5WXf9aq6fa9NcKk16c68Ptu8?_gl=1*14krs3y*_ga*MzAyNzM1MDc4LjE2OTAxNzQwNTg.*_ga_5RMPXG14TE*MTY5MDE3NDA1OS4xLjEuMTY5MDE3NDE0Ni40OS4wLjA.';
  const message = 'Hello, this is my NFT message';

  console.log('userAddress ', userAddress);
  await myNFTContract.mintNFT(
    userAddress,
    name,
    description,
    imageUri,
    message,
  );

  console.log('NFT minted successfully!');
}

// Run the deployment and minting function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
