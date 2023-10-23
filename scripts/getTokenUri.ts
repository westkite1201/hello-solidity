const { ethers } = require('ethers');
const MyNFT = require('../artifacts/contracts/erc721Meta.sol/Erc721Meta.json');

async function main() {
  const provider = new ethers.providers.InfuraProvider('sepolia');

  const contractAddress = '0x769cf8b6a03D5D3e47dE515AD402CFAA724E43cd'; // Replace with the actual address of your deployed MyNFT contract
  const contractAbi = MyNFT.abi; // Replace with the ABI of your MyNFT contract

  const tokenId = 0; // Replace with the token ID of the NFT you want to query

  async function getTokenURI() {
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider,
    );
    console.log(
      'contract= ',
      await contract.name(),
      await contract.owner(),
      //await contract.getTokenData(tokenId),
    );

    try {
      const tokenURI = await contract.tokenURI(tokenId);
      console.log('Token URI:', tokenURI);
    } catch (error) {
      console.error('Error fetching token URI:', error);
    }
  }
  await getTokenURI();
}
// Run the deployment and minting function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
