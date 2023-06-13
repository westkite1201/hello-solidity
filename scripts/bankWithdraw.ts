import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

const CONTRACT_ADDRESS = '0x99F5548df1A33FD9E6c04e2b45E99c624a4094F0';
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
async function main() {
  // Get the deployed Bank contract
  const Bank = await ethers.getContractFactory('Bank');
  const bank = await Bank.attach(CONTRACT_ADDRESS);

  // Get the signer and the user's address
  const [signer] = await ethers.getSigners();
  const userAddress = await signer.getAddress();

  // Call the deposit function
  const withdrawTx = await bank
    .connect(signer)
    .withdraw(userAddress, '5000000000');

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
