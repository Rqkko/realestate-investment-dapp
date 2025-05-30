"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";

import { projectFactoryContract } from "@/lib/contract";
import ProjectABI from "@/lib/contracts/Project.json";
import ProjectMetadataABI from "@/lib/contracts/ProjectMetadata.json";
import Navbar from "@/components/navbar";
import realestate1 from "../../../public/realestates/realestate_1.jpg";
import realestate2 from "../../../public/realestates/realestate_2.jpg";
import realestate3 from "../../../public/realestates/realestate_3.jpg";
import realestate4 from "../../../public/realestates/realestate_4.jpg";

const images = [realestate1, realestate2, realestate3, realestate4];

const ProjectStatusMap = {
  0: "Raising Funds",
  1: "Building",
  2: "Completed",
};

interface Project {
  address: string;
  name: string;
  location: string;
  amountRaised: number;
  amountNeeded: number;
  status: string;
}

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const signer = projectFactoryContract?.signer;

        const projectAddresses = await projectFactoryContract?.getAllProjects() as string[];

        const projectsTemp = await Promise.all(
          projectAddresses.map(async (projectAddress) => {
            const projectContract = new ethers.Contract(
              projectAddress,
              ProjectABI.abi,
              signer
            );

            // Get metadata contract address from Project
            const metadataAddress = await projectContract.projectMetadata();

            // Create ProjectMetadata contract instance
            const metadataContract = new ethers.Contract(
              metadataAddress,
              ProjectMetadataABI.abi,
              signer
            );

            // Fetch fields from metadata contract
            const name = await metadataContract.name();
            const location = await metadataContract.location();

            // Fetch amounts and status from Project
            const amountNeeded = await projectContract.amountNeeded();
            const amountRaised = await projectContract.amountRaised();
            const status = await projectContract.status();

            return {
              address: projectAddress,
              name,
              location,
              amountRaised: amountRaised.toNumber(),
              amountNeeded: amountNeeded.toNumber(),
              status: ProjectStatusMap[status as keyof typeof ProjectStatusMap],
            };
          })
        );

        setProjects(projectsTemp);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#0f1c2e] to-black min-h-screen font-sans text-white">
      <Navbar />

      {/* Page title */}
      <div className="mx-auto px-20 pt-35 max-w-6xl">
        <h1 className="font-bold text-3xl">Projects open for Investments</h1>
      </div>

      {/* Project Grid */}
      <div className="gap-8 grid grid-cols-2 mx-auto px-6 pt-10 pb-20 max-w-5xl">
        {projects.map((project, index) => {
          if (project.status !== ProjectStatusMap[0]) return null;

          return (
            <div
              key={index}
              className="relative bg-white/5 shadow rounded-xl overflow-hidden"
            >
              <Image
                src={images[index % 4]}
                alt={"Project Image"}
                width={500}
                height={208}
                className="w-full h-52 object-cover"
              />
              <div className="flex justify-between items-center p-4">
                <p className="m-0 text-sm text-white">{project.name}</p>
                <button
                  className="bg-white hover:bg-gray-200 px-4 py-2 rounded-md font-semibold text-black text-sm transition"
                  onClick={() => {
                    window.location.href = `/projectDetails/${project.address}`;
                  }}
                >
                  See Details
                </button>
              </div>
              <div className="px-4 pb-4">
                <p className="text-sm">Location: {project.location}</p>
              </div>
              <div className="px-4 pb-4">
                <p className="text-sm">
                  Remaining: {project.amountNeeded - project.amountRaised}/{project.amountNeeded}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
