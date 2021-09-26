// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Bcoin {
    string public name = "Token";
    string public symbol = "USDT";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        uint256 value,
        address indexed _spender
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approval(uint256 _value, address _spender)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _value, _spender);
        return true;
    }

    function transferFrom(
        address _to,
        address _from,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceOf[msg.sender]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] += _value;
        balanceOf[_to] -= _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
