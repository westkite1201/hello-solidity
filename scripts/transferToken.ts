import { ethers } from 'hardhat';

async function main() {
  // Connect to the Ethereum network
  const provider = new ethers.providers.InfuraProvider('sepolia');

  // Specify the sender's private key
  const privateKey = process.env.SEPOLIA_PRIVATE_KEY as string;
  const wallet = new ethers.Wallet(privateKey, provider);

  // Specify the recipient's address and the amount of Ethereum to transfer
  const recipientAddress = '0x8940eC5E3566afF7d04c96377a23838078e987B5';

  const amount = ethers.utils.parseEther('0.1'); // Transfer 0.1 ETH
  const senderAddress = wallet.address;
  // Specify the gas price for the replacement transaction
  const gasPrice = await provider.getGasPrice();
  console.log(gasPrice);
  // Adjust the gas price as per your requirements
  const nonce = await provider.getTransactionCount(senderAddress);
  // Build and send the transaction
  const transaction = {
    to: recipientAddress,
    value: amount,
    nonce,
    gasPrice: gasPrice,
    gasLimit: 1000000, // Increase the gas limit value as per your requirements
  };

  const signedTransaction = await wallet.signTransaction(transaction);
  const tx = await provider.sendTransaction(signedTransaction);
  console.log('Transaction hash:', tx.hash);
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
