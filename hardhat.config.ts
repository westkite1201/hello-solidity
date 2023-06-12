import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and replace "KEY" with it
const INFURA_API_KEY = process.env.INFURA_API_KEY;

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY as string;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
