const MidexExchange = artifacts.require('MidexExchange')
const Token = artifacts.require('Token')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('Midex-Exchange', (accounts) => {
  let token, midexExchange

  before(async () => {
    token = await Token.new()
    midexExchange = await MidexExchange.new()
    // Transfer all tokens to EthSwap (1 million)
    await token.transfer(midexExchange.address, tokens('1000000'))
  })

  describe('Token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'Token')
    })
  })

  describe('MidexExchange deployment', async () => {
    it('contract has a name', async () => {
      const name = await midexExchange.name()
      assert.equal(name, 'Midex Exchange')
    })

    it('contract has tokens', async () => {
      let balance = await token.balanceOf(midexExchange.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

})