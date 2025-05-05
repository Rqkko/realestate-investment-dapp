// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Project {
    mapping(address => uint256) public stakes;
    string public name;
    string public description;
    string public image;
    string public location;
    address[] public investors;
    uint256 public amountNeeded;
    uint256 public amountRaised;

    enum ProjectStatus { RaisingFunds, Building, Completed }
    ProjectStatus public status;

    // Project constructor to initialize project with details
    constructor(
        string memory _name,
        string memory _description,
        string memory _image,
        string memory _location,
        uint256 _amountNeeded
    ) {
        name = _name;
        description = _description;
        image = _image;
        location = _location;
        amountNeeded = _amountNeeded;
        amountRaised = 0;
        status = ProjectStatus.RaisingFunds;
    }

    function setAmountNeeded(uint256 _amountNeeded) public {
        amountNeeded = _amountNeeded;
    }

    // setStatus function
    function setStatus(ProjectStatus _status) public {
        status = _status;
    }

    // Investor can sell stake to project directly
    function sellStake(uint256 amount) public {
        require(stakes[msg.sender] >= amount, "Insufficient stake to sell");
        uint256 refund = (amount * amountNeeded) / 100;
        require(address(this).balance >= refund, "Project has insufficient balance");

        stakes[msg.sender] -= amount;
        payable(msg.sender).transfer(refund);
    }

    // invest() using ETH, logic complete
    function invest() public payable {
        require(msg.value <= amountNeeded, "Investment exceeds amount needed");
        require(msg.value > 0, "Investment must be greater than 0");

        if (stakes[msg.sender] == 0) {
            investors.push(msg.sender);
        }

        stakes[msg.sender] += msg.value * 100 / amountNeeded;
        amountRaised += msg.value;
    }

    function getStake(address user) public view returns (uint256) {
        return stakes[user];
    }

    function transferStake(address to, uint256 amount) public {
        require(stakes[msg.sender] >= amount, "Not enough stake");

        if (stakes[to] == 0) {
            investors.push(to);
        }

        stakes[msg.sender] -= amount;
        stakes[to] += amount;
    }

    function distributeDividend(uint256 amount) public {
        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint256 dividend = amount * stakes[investor] / 100;
            payable(investor).transfer(dividend);
        }
    }

    // Allow contract to receive Ether
    receive() external payable {}
}
