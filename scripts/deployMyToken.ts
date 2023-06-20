import { ethers } from 'hardhat';

async function main() {
  let initialSupply = '10000000000000000000000'; // 10000 * 1e18
  const myTokenFactory = await ethers.getContractFactory('MyToken');
  const myToken = await myTokenFactory.deploy(
    'Seoyeon Token',
    'SEO',
    initialSupply,
  );

  await myToken.deployed();

  console.log(`Token deployed to: ${myToken.address}`);
  console.log('----------------------------------------------------');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// const deployFunction: DeployFunction = async ({
//   getNamedAccounts,
//   deployments,
// }) => {
//   const { log } = deployments;
//   const { deployer } = await getNamedAccounts();
//   const myTokenFactory = await ethers.getContractFactory('MyToken');
//   let initialSupply = '10000000000000000000000'; // 10000 * 1e18

//   log(`Deploying token with account ${deployer}`);
//   const myToken = await myTokenFactory.deploy(
//     'OpenZeppelin Token',
//     'OZT',
//     initialSupply,
//   );
//   await myToken.deployed();
//   log(`Token deployed to: ${myToken.address}`);
//   log('----------------------------------------------------');
// };

// export default deployFunction;
// deployFunction.tags = [`all`, `token`];
