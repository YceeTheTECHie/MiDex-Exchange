pragma solidity ^0.5.0;

contract MidexExchange {
    string public name = "Midex Exchange";
    Token public token;
    uint256 public rate = 100;

    constructor(Token _token) public {
        token = _token;
    }

    function buyCoins() public payable {
        uint amountToken = msg.value * 100;
        token.transfer(msg.sender,totalAmount);
    } 
}