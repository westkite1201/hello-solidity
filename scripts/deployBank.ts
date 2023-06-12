import { ethers } from 'hardhat';

async function main() {
  const Bank = await ethers.getContractFactory('Bank');
  const bank = await Bank.deploy();
  await bank.deployed();
  console.log('Bank가 배포된 컨트랙트의 주소 : ', bank.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
