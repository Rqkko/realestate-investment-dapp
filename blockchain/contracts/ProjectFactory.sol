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

    function createProject(
        string memory name,
        string memory companyName,
        string memory description,
        string memory location,
        uint8 numBedrooms,
        uint8 roomSize,
        string memory furniture,
        string memory facilities,
        uint256 amountNeeded
    ) external {
        ProjectMetadata metadata = new ProjectMetadata(
            name,
            companyName,
            description,
            location,
            numBedrooms,
            roomSize,
            furniture,
            facilities
        );

        Project project = new Project(
            address(metadata),
            address(dpToken),
            address(dpVault)
        );
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
}
