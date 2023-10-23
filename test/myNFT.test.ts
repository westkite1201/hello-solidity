import { expect } from 'chai';
import { ethers, network } from 'hardhat';
import { MyNFT, MyNFT__factory } from '../typechain-types';

describe('MyNFT', function () {
  let myNft: MyNFT;
  let myNftFactory: MyNFT__factory;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    myNftFactory = (await ethers.getContractFactory('MyNFT')) as MyNFT__factory;
    myNft = await myNftFactory.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
    await myNft.deployed();
  });

  it('Should mint a token', async function () {
    const initialBalance = await myNft.balanceOf(owner.address);
    expect(initialBalance).to.equal(0);

    // Mint a token
    await myNft.safeMint(owner.address);

    const newBalance = await myNft.balanceOf(owner.address);
    expect(newBalance).to.equal(1);
  });

  it('Should transfer a token', async function () {
    // Mint a token
    await myNft.safeMint(owner.address);

    const tokenId = 0;

    // Transfer the token from owner to addr1
    await myNft.transferFrom(owner.address, addr1.address, tokenId);

    const ownerBalance = await myNft.balanceOf(owner.address);
    const addr1Balance = await myNft.balanceOf(addr1.address);

    expect(ownerBalance).to.equal(0);
    expect(addr1Balance).to.equal(1);

    const ownerOfToken = await myNft.ownerOf(tokenId);
    expect(ownerOfToken).to.equal(addr1.address);
  });
});
