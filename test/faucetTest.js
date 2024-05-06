const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
//const ethers = require('ethers');
require('dotenv').config();


const provider = new ethers.getDefaultProvider(
  'sepolia',
  process.env.API_KEY
);

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function testFaucet() {
    // const Faucet = await ethers.getContractFactory('Faucet');
    // const faucet = await Faucet.deploy();
    const faucet = await ethers.getContractAt("Faucet", process.env.CONTRACT_ADDR);

    const [owner] = await ethers.getSigners();

    let withdrawAmount = ethers.parseUnits('0.01', 'ether');

    return { faucet, owner, withdrawAmount };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await testFaucet();

    expect(await faucet.owner()).to.equal(owner.address);
  });

  // it('should not allow withdrawals above .1 ETH at a time', async function () {
  //   const { faucet, withdrawAmount } = await testFaucet();
  //   await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  // });
  // it('should not allow withdrawals if not owner', async function () {
  //   const { faucet } = await testFaucet();
  //   await expect(faucet.withdrawAll()).to.be.reverted;
  // });

  it('should not allow destroy contract', async function () {
    const { faucet } = await testFaucet();
    await faucet.destroyFaucet();
    const code = await provider.getCode(faucet);
    await expect(code).to.equal("0x");
  });
});