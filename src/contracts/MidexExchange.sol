pragma solidity ^0.5.0;
import './Token.sol';
contract MidexExchange {
    string public name = "Midex Exchange";
    Token public token;
    uint256 public rate = 100;

    constructor(Token _token) public {
        token = _token;
    }

    event tokenPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate

    );
    function buyCoins() public payable {
        uint totalAmount = msg.value * rate;
        require(token.balanceOf(address(this)) >= totalAmount);
        token.transfer(msg.sender,totalAmount);
        emit tokenPurchased(msg.sender,address(token),totalAmount,rate);
    } 

    function sellCoins(uint _amount) public payable {
       uint ethAmount = _amount / rate;
       token.transferFrom(msg.sender, address(this), _amount);
       msg.sender.transfer(ethAmount);
    }
}