const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("FaucetModule", (m) => {
  const faucet = m.contract("Faucet");
  console.log(`This is contract address: ${faucet.address}`);
  return { faucet };
});