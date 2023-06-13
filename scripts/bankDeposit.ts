import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

const CONTRACT_ADDRESS = '0xCA27d226B88Dba42e85A5Fb5801c76beAC3b65EC';
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
  const depositTx = await bank
    .connect(signer)
    .deposit({ value: ethers.utils.parseEther('0.0123') });

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
