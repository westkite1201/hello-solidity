import { ethers } from 'hardhat';

async function main() {
  const DBank = await ethers.getContractFactory('DBank');
  const bank = await DBank.deploy();
  await bank.deployed();
  console.log('DBank가 배포된 컨트랙트의 주소 : ', bank.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
