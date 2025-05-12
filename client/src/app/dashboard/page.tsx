"use client"

import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { projectFactoryContract, account } from "@/lib/contract";
import ProjectABI from "@/lib/contracts/Project.json";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { InvestmentChart } from "@/components/investment-chart"
import { ProjectCard } from "@/components/project-card"
import { InvestmentSummary } from "@/components/investment-summary"
import Navbar from "../components/navbar"
import realestate1 from "../../../public/realestates/realestate_1.jpg";
import realestate2 from "../../../public/realestates/realestate_2.jpg";
import realestate3 from "../../../public/realestates/realestate_3.jpg";
import realestate4 from "../../../public/realestates/realestate_4.jpg";

const images = [realestate1.src, realestate2.src, realestate3.src, realestate4.src];

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

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [projectsInvested, setProjectsInvested] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!account) {
        alert("Please connect your wallet.");
        return;
      }

      try {
        const projectAddresses = await projectFactoryContract?.getAllProjects() as string[];

        const projectsTemp: Project[] = [];

        await Promise.all(
          projectAddresses.map(async (projectAddress) => {
            const projectContract = new ethers.Contract(
              projectAddress,
              ProjectABI.abi,
              projectFactoryContract?.signer
            );

            const investors = await projectContract.getAllInvestors();

            if (!account) {
              console.log("Please connect your wallet.");
              return;
            }

            if (!investors.map((addr: string) => addr.toLowerCase()).includes(account.toLowerCase())) {
              return;
            }

            const name = await projectContract.name();
            const location = await projectContract.location();
            const amountNeeded = await projectContract.amountNeeded();
            const amountRaised = await projectContract.amountRaised();
            const status = await projectContract.status();

            projectsTemp.push({
              address: projectAddress,
              name,
              location,
              amountRaised: amountRaised.toNumber(),
              amountNeeded: amountNeeded.toNumber(),
              status: ProjectStatusMap[status as keyof typeof ProjectStatusMap],
            });
          })
        );

        console.log("Projects Temp:", projectsTemp);
        setProjects(projectsTemp);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [])

  useEffect(() => {
    const calculateInvestmentSummary = () => {
      let totalInvestedTemp = 0;
      let projectsInvestedTemp = 0;
      // let totalEarningsTemp = 0;

      projects.forEach((project) => {
        const investedAmount = project.amountRaised;
        // const earnings = (project.amountRaised / project.amountNeeded) * 100;

        totalInvestedTemp += investedAmount;
        // totalEarningsTemp += earnings;

        if (investedAmount > 0) {
          projectsInvestedTemp++;
        }
      });

      setTotalInvested(totalInvestedTemp);
      setProjectsInvested(projectsInvestedTemp);
      // setTotalEarnings(totalEarningsTemp);
    };

    calculateInvestmentSummary();
  }, [projects])

  return (
    <div className="bg-gradient-to-b from-[#0f1c2e] to-black min-h-screen font-sans text-white">
      <Navbar />

      <div className="flex flex-1 pt-35">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-3xl text-white tracking-tight">Investor Dashboard</h1>
              <p className="text-white">Manage your real estate investments and track your returns.</p>
            </div>

            <InvestmentSummary 
              totalInvested={totalInvested}
              projectsInvested={projectsInvested}
              totalEarnings={totalEarnings}
            />

            <h2 className="font-bold text-2xl text-white tracking-tight">Investments</h2>

            <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {

                return (
                  <ProjectCard
                    key={index}
                    address={project.address}
                    title={project.name}
                    location={project.location}
                    status={project.status}
                    invested={project.amountRaised}
                    earnings={0} //TODO: Calculate earnings based on project data
                    progress={(project.amountRaised / project.amountNeeded) * 100}
                    image={images[index % 4]}
                  />
                );
              })}
            </div>
            
            {/* <Card>
              <CardHeader>
                <CardTitle>Investment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <InvestmentChart />
              </CardContent>
            </Card> */}
          </div>
        </main>
      </div>
    </div>
  )
}
