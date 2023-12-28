// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlightTicketPurchase {
    address public owner;
    uint256 public ticketPrice;
    address public passenger;
    bool public isTicketPurchased;

    event TicketPurchased(address indexed buyer, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }


    modifier hasValue() {
        require(msg.value >= ticketPrice, "Insufficient funds");
        _;
    }

    constructor(uint256 _ticketPrice) payable {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
    }

    function setTicketPrice(uint256 _newTicketPrice) public onlyOwner {
        ticketPrice = _newTicketPrice;
    }

    function purchaseTicket(uint256 _paymentAmount) external payable {
        require(_paymentAmount >= ticketPrice, "Insufficient payment amount");

        passenger = msg.sender;
        isTicketPurchased = true;
        emit TicketPurchased(passenger, _paymentAmount);
    }

    function withdrawFunds() external onlyOwner {
        require(isTicketPurchased, "Ticket has not been purchased yet");
        uint256 contractBalance = address(this).balance;
        if (contractBalance > 0) {
            payable(owner).transfer(contractBalance);
        }
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}