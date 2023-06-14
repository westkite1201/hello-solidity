import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
async function main() {
  // Get the deployed Bank contract
  const Bank = await ethers.getContractFactory('DBank');
  const bank = await Bank.attach(CONTRACT_ADDRESS);

  // Get the signer and the user's address
  const [signer] = await ethers.getSigners();
  const userAddress = await signer.getAddress();

  // Call the deposit function
  const depositTx = await bank
    .connect(signer)
    .deposit({ value: ethers.utils.parseEther('0.1') });

  await depositTx.wait();

  // Call the getBalance function
  const balance = await bank.getBalance(userAddress);

  console.log('Deposit successful!');
  const balanceInEther = ethers.utils.formatEther(balance);

  console.log(`Current balance for ${userAddress}: ${balanceInEther} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
