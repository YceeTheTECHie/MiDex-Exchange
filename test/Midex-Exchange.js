
const MidexExchange = artifacts.require('MidexExchange')
const Token = artifacts.require('Token')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('Midex-Exchange0', ([owner,customer]) => {
    let token, midexExchange

    before(async () => {
        token = await Token.new()
        midexExchange = await MidexExchange.new(token.address)
        // Transfer all tokens to EthSwap (1 million)
        await token.transfer(midexExchange.address, tokens('1000000'))
    })

    describe('Token contract was  deployment', async () => {
        it('contract has a name', async () => {
            const name = await token.name()
            assert.equal(name, 'Token')
        })
    })
    describe('MidexExchange was deployment', async () => {
        it('contract has a name', async () => {
            const name = await midexExchange.name()
            assert.equal(name, 'Midex Exchange')
        })

            it('contract has tokens', async () => {
              let balance = await token.balanceOf(midexExchange.address)
              assert.equal(balance.toString(), tokens('1000000'))
            })
    })
    describe('BuyCoin()', async () => {
         let result 
        before(async () => {
            result = await midexExchange.buyCoins({from: customer, value: web3.utils.toWei('1','ether') })
        })
        
    it('Customer received the payment', async () => {
        let customerBalance = await token.balanceOf(customer);
        let deployerBalance = await token.balanceOf(midexExchange.address);
        assert.equal(customerBalance.toString(), tokens('100'));
        assert.equal(deployerBalance.toString(), tokens('999900'));


    })
        
         
     it('Total supply of token reduces by 1', async () => {
        let deployerBalance = await token.balanceOf(midexExchange.address);
         assert.equal(deployerBalance.toString(), tokens('999900'));

     })
        
    it('Token Purchased event returns correct events', async () => {
        const events = result.logs[0].args;
        console.log(events);
        assert.equal(events.account, customer);
        assert.equal(events.token, token.address);
        assert.equal(events.amount.toString(), tokens('100'));
        assert.equal(events.rate.toString(), '100');




    })
        
  })

    })
