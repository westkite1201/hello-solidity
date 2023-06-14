import { expect } from 'chai';
import { ethers } from 'hardhat';
import { DBank } from '../typechain-types';
let dbank: DBank;

describe('DBank', () => {
  let owner;
  let user;

  beforeEach(async () => {
    const DBank = await ethers.getContractFactory('DBank');
    dbank = await DBank.deploy();
    await dbank.deployed();

    [owner, user] = await ethers.getSigners();
  });

  it('should allow depositing funds', async () => {
    const depositAmount = ethers.utils.parseEther('1.0');
    const [user] = await ethers.getSigners();

    const initialBalance = await ethers.provider.getBalance(user.address);
    console.log(
      'Initial user balance:',
      ethers.utils.formatEther(initialBalance),
    );

    const deposit = await dbank.connect(user).deposit({ value: depositAmount });
    const tx: any = await deposit.wait();
    const depositor = tx.events[0].args[0];
    const value = tx.events[0].args[1];

    console.log('value = ', value);
    console.log('depositor = ', depositor);
    // const balanceAfter: any = await dbank.getBalance(_depositor1);
  });

  //   it('should allow withdrawing funds', async () => {
  //     const depositAmount = ethers.utils.parseEther('1.0');
  //     const withdrawAmount = ethers.utils.parseEther('0.5');
  //     const signer = await ethers.getSigners();
  //     user = signer[0];
  //     await dbank.connect(user).deposit({ value: depositAmount });

  //     await expect(
  //       dbank.connect(user).withdraw(withdrawAmount),
  //     ).to.changeEtherBalance(user, withdrawAmount);
  //   });

  //   it('should not allow depositing zero amount', async () => {
  //     const signer = await ethers.getSigners();
  //     user = signer[0];
  //     await expect(dbank.connect(user).deposit({ value: 0 })).to.be.revertedWith(
  //       'Deposit amount should be greater than zero.',
  //     );
  //   });

  //   it('should not allow withdrawing zero amount', async () => {
  //     const signer = await ethers.getSigners();
  //     user = signer[0];
  //     await expect(dbank.connect(user).withdraw(0)).to.be.revertedWith(
  //       'Withdrawal amount should be greater than zero.',
  //     );
  //   });

  //   it('should not allow withdrawing more than the account balance', async () => {
  //     const signer = await ethers.getSigners();
  //     user = signer[0];
  //     const depositAmount = ethers.utils.parseEther('1.0');
  //     const withdrawAmount = ethers.utils.parseEther('2.0');

  //     await dbank.connect(user).deposit({ value: depositAmount });

  //     await expect(
  //       dbank.connect(user).withdraw(withdrawAmount),
  //     ).to.be.revertedWith('Insufficient balance.');
  //   });

  //   it('should emit Deposit event when funds are deposited', async () => {
  //     const signer = await ethers.getSigners();
  //     user = signer[0];
  //     const depositAmount = ethers.utils.parseEther('1.0');

  //     await expect(dbank.connect(user).deposit({ value: depositAmount }))
  //       .to.emit(dbank, 'Deposit')
  //       .withArgs(user.address, depositAmount);
  //   });

  //   it('should emit Withdrawal event when funds are withdrawn', async () => {
  //     const signer = await ethers.getSigners();
  //     user = signer[0];
  //     const depositAmount = ethers.utils.parseEther('1.0');
  //     const withdrawAmount = ethers.utils.parseEther('0.5');

  //     await dbank.connect(user).deposit({ value: depositAmount });

  //     await expect(dbank.connect(user).withdraw(withdrawAmount))
  //       .to.emit(dbank, 'Withdrawal')
  //       .withArgs(user.address, withdrawAmount);
  //   });

  //   it('should return the correct balance for an account', async () => {
  //     const signer = await ethers.getSigners();
  //     user = signer[0];
  //     const depositAmount = ethers.utils.parseEther('1.0');

  //     await dbank.connect(user).deposit({ value: depositAmount });

  //     const userBalance = await dbank.getBalance(user.address);
  //     expect(userBalance).to.equal(depositAmount);
  //   });
});
