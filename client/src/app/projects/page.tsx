"use client";

import { useState } from "react";
import Navbar from "../components/navbar";

const projects = [
  {
    location: "Bangkok",
    remaining: "12,000 / 20,000 DP",
    imageUrl:
      "https://mpics.mgronline.com/pics/Images/567000002075801.JPEG",
  },
  {
    location: "Chiang Mai",
    remaining: "32,000 / 50,000 DP",
    imageUrl:
      "https://cdn.baania.com/b10/article/1453/photo/186846.jpg",
  },
  {
    location: "Pattaya",
    remaining: "2,000 / 20,000 DP",
    imageUrl:
      "https://www.terrabkk.com/images/news/0000194167/2e3883f4277709c3e58f3b14f809f70d.jpg",
  },
  {
    location: "Nonthaburi",
    remaining: "5,000 / 15,000 DP",
    imageUrl:
      "https://cdn.prod.website-files.com/61d51901f497f53df24dd29a/67283db2b3a3615fe89488dd_67283b7b97f510b22b954f04_Pic-4.jpeg",
  },
];

export default function ProjectPage() {
  return (
    <div className="bg-gradient-to-b from-[#0f1c2e] to-black min-h-screen font-sans text-white">
      <Navbar />

      {/* Page title */}
      <div className="mx-auto px-20 pt-35 max-w-6xl">
        <h1 className="font-bold text-3xl">Project open for Investments</h1>
      </div>

      {/* Project Grid */}
      <div className="gap-8 grid grid-cols-2 mx-auto px-6 pt-10 pb-20 max-w-5xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative bg-white/5 shadow rounded-xl overflow-hidden"
          >
            <img
              src={project.imageUrl}
              alt={project.location}
              className="w-full h-52 object-cover"
            />
            <div className="flex justify-between items-center p-4">
              <p className="m-0 text-sm text-white">
                Location: {project.location}
              </p>
              <button className="bg-white hover:bg-gray-200 px-4 py-2 rounded-md font-semibold text-black text-sm transition">
                See Details
              </button>
            </div>
            <div className="px-4 pb-4">
              <p className="text-sm">Remaining: {project.remaining}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}