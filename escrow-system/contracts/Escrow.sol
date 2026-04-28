// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    address public arbiter;

    uint public amount;
    bool public isReleased;
    bool public isDisputed;

    constructor(address _seller, address _arbiter) payable {
        buyer = msg.sender;
        seller = _seller;
        arbiter = _arbiter;
        amount = msg.value;
    }

    function releaseFunds() public {
        require(msg.sender == buyer, "Only buyer");
        require(!isDisputed, "Disputed");

        isReleased = true;
        payable(seller).transfer(amount);
    }

    function raiseDispute() public {
        require(msg.sender == buyer, "Only buyer");
        isDisputed = true;
    }

    function resolveDispute(bool releaseToSeller) public {
        require(msg.sender == arbiter, "Only arbiter");

        if (releaseToSeller) {
            payable(seller).transfer(amount);
        } else {
            payable(buyer).transfer(amount);
        }

        isReleased = true;
    }
}
