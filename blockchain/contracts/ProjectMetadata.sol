// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// This contract holds the metadata for a project (due to too many contructor parameters, we need to separate it)
contract ProjectMetadata {
    string public name;
    string public companyName;
    string public description;
    string public location;
    uint8 public numBedrooms;
    uint8 public roomSize;
    string public furniture;
    string public facilities;

    constructor(
        string memory _name,
        string memory _companyName,
        string memory _description,
        string memory _location,
        uint8 _numBedrooms,
        uint8 _roomSize,
        string memory _furniture,
        string memory _facilities
    ) {
        name = _name;
        companyName = _companyName;
        description = _description;
        location = _location;
        numBedrooms = _numBedrooms;
        roomSize = _roomSize;
        furniture = _furniture;
        facilities = _facilities;
    }
}
