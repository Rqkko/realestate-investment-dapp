const DP = artifacts.require("DP");
const DPVault = artifacts.require("DPVault");
const ProjectFactory = artifacts.require("ProjectFactory");
const Project = artifacts.require("Project");

module.exports = async function (callback) {
  try {
    const factory = await ProjectFactory.deployed();

    console.log("Creating projects...");
    // await factory.createProject("The Avana", "Luxury condo", "Sukhumvit", 1000);
    await factory.createProject(
      "The Avana",
      "Avana Group",
      "Luxury condo",
      "Sukhumvit",
      2,
      70,
      "Fully furnished",
      "Pool, Gym, Lounge Parking",
      1000
    );
    const projectAddress1 = await factory.getProject(0);
    const project1 = await Project.at(projectAddress1);
    console.log("'The Avana' deployed at:", project1.address);

    // await factory.createProject("Cascade One", "All in One Condo", "Bangna", 3000);
    // const projectAddress2 = await factory.getProject(1);
    // const project2 = await Project.at(projectAddress2);
    // console.log("'Cascade One' deployed at:", project2.address);

    // await factory.createProject("Nova Crest", "Better Living", "Khao Yai", 2000);
    // const projectAddress3 = await factory.getProject(2);
    // const project3 = await Project.at(projectAddress3);
    // console.log("'Nova Crest' deployed at:", project3.address);

    // await factory.createProject("The Luma", "Affordable Living", "Bangkok", 500);
    // const projectAddress4 = await factory.getProject(3);
    // const project4 = await Project.at(projectAddress4);
    // console.log("'The Luma' deployed at:", project4.address);
    // await project4.setStatus(2);

    callback();
  } catch (err) {
    console.error("Error in script:", err);
    callback(err);
  }
}