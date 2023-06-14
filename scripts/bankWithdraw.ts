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

  const withdrawValue = '0.1';
  // Call the deposit function

  // const gasLimit = await bank.connect(signer).estimateGasWithdraw(userAddress, ethers.utils.parseEther(withdrawValue));.

  const withdrawTx = await bank
    .connect(signer)
    .withdraw(ethers.utils.parseEther(withdrawValue));

  await withdrawTx.wait();

  // Call the getBalance function
  const balance = await bank.getBalance(userAddress);

  console.log('withdraw successful!');
  const balanceInEther = ethers.utils.formatEther(balance);

  console.log(`Current balance for ${userAddress}: ${balanceInEther} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
