const Token = artifacts.require('Token.sol');
const MidexExchange = artifacts.require('MidexExchange.sol');

module.exports = async function (deployer,network,accounts) {
   await deployer.deploy(Token);
   const token = await Token.deployed();

   await deployer.deploy(MidexExchange,token.address)   ;
   const midexExchange = await MidexExchange.deployed();

 
   // transfer all tokens from rwd into bank
   await token.transfer(midexExchange.address, '1000000000000000000000000');
}