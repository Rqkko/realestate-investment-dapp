// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Project.sol";

contract ProjectFactory {
    address[] public projects;

    event ProjectCreated(address projectAddress, address creator);

    function createProject(uint256 amountNeeded) external {
        Project project = new Project();
        project.setAmountNeeded(amountNeeded);
        projects.push(address(project));
        emit ProjectCreated(address(project), msg.sender);
    }

    function getAllProjects() external view returns (address[] memory) {
        return projects;
    }

    function getProject(uint index) external view returns (address) {
        require(index < projects.length, "Invalid index");
        return projects[index];
    }

    function getProjectCount() external view returns (uint256) {
        return projects.length;
    }

    // TODO: make getOnGoingProjects()
}
