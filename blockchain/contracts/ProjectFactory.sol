// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DP.sol";
import "./DPVault.sol";
import "./Project.sol";

contract ProjectFactory {
    DP public dpToken;
    DPVault public dpVault;
    Project[] public projects;

    event ProjectCreated(address projectAddress, address creator);

    constructor(
        address _dpTokenAddress,
        address _dpVaultAddress
    ) {

        dpToken = DP(_dpTokenAddress);
        dpVault = DPVault(payable(_dpVaultAddress));
    }

    function createProject(string calldata name, string calldata description, string calldata location, uint256 amountNeeded) external {
        Project project = new Project(name, description, location, address(dpToken), address(dpVault));
        project.setAmountNeeded(amountNeeded);
        projects.push(project);
        emit ProjectCreated(address(project), msg.sender);
    }

    function getAllProjects() external view returns (Project[] memory) {
        return projects;
    }

    function getProject(uint index) external view returns (Project) {
        require(index < projects.length, "Invalid index");
        return projects[index];
    }

    function getProjectCount() external view returns (uint256) {
        return projects.length;
    }

    // TODO: make getOnGoingProjects()
}
