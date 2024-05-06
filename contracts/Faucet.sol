//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Faucet{
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw(uint _amount) payable public {
        require(_amount <= 100000000000000000);
        (bool s, ) = payable(msg.sender).call{value: _amount}("");
        require(s, "Failed to send Ether");
    }

    function withdrawAll() onlyOwner public {
        (bool s, ) = owner.call{value: address(this).balance}("");
        require(s, "Failed to send Ether");
    }
    function destroyFaucet() onlyOwner public {
        selfdestruct(owner);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not owner");
        _;
    }
}