const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");
const ProjectFactory = artifacts.require("ProjectFactory");
const Project = artifacts.require("Project");

module.exports = async function (callback) {
  try {
    const factory = await ProjectFactory.deployed();

    console.log("Creating projects...");

    // The Avana
    await factory.createProject(
      "The Avana",
      "Avana Group",
      "Luxury condo in Sukhumvit, close to BTS.",
      "Sukhumvit",
      2,
      70,
      "Fully furnished",
      "Pool, Gym, Lounge",
      1000
    );
    console.log("Created The Avana");

    // Cascade One
    await factory.createProject(
      "Cascade One",
      "Cascade Living Co., Ltd.",
      "All-in-one modern condominium in Bangna.",
      "Bangna",
      1,
      35,
      "Semi-furnished",
      "Pool, Co-working Space, Rooftop Garden",
      3000
    );
    console.log("Created Cascade One");

    // Nova Crest
    await factory.createProject(
      "Nova Crest",
      "Nova Estates",
      "Eco-friendly living in the heart of Khao Yai.",
      "Khao Yai",
      3,
      120,
      "Fully furnished",
      "Nature Trail, Clubhouse, Playground",
      2000
    );
    console.log("Created Nova Crest");

    // The Luma
    await factory.createProject(
      "The Luma",
      "Luma Developments",
      "Affordable urban living in Bangkok.",
      "Bangkok",
      1,
      28,
      "Unfurnished",
      "Laundry, 24h Security, Parking",
      500
    );
    const projectAddress4 = await factory.getProject(3);
    const project4 = await Project.at(projectAddress4);
    await project4.setStatus(2);
    console.log("Created The Luma");

    callback();
  } catch (err) {
    console.error("Error in script:", err);
    callback(err);
  }
}