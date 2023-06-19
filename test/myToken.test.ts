import { expect } from 'chai';
import { ethers, network } from 'hardhat';
import { MyToken, MyToken__factory } from '../typechain-types';

describe('MyToken', () => {
  const name = 'OpenZeppelin Token';
  const symbol = 'OZT';
  let initialSupply = '10000000000000000000000'; // 10000 * 1e18

  let myTokenFactory: MyToken__factory;
  let myToken: MyToken;

  beforeEach(async () => {
    myTokenFactory = (await ethers.getContractFactory(
      'MyToken',
    )) as MyToken__factory;
    myToken = await myTokenFactory.deploy(name, symbol, initialSupply);
    await myToken.deployed();
  });

  it('Should have correct name', async () => {
    expect(await myToken.name()).to.equal(name);
  });

  it('Should have correct symbol', async () => {
    expect(await myToken.symbol()).to.equal(symbol);
  });

  it('Should have correct initial supply', async () => {
    expect(await myToken.totalSupply()).to.equal(initialSupply);
  });

  it('Should have 18 decimals', async () => {
    expect(await myToken.decimals()).to.equal(18);
  });
});
