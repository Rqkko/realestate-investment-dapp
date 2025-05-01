"use client";

import { useState } from "react";

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
    <div className="bg-gradient-to-b from-[#0f1c2e] to-black min-h-screen text-white font-sans">
      {/* Navbar */}
      {/* <nav className="top-10 left-1/2 z-30 fixed flex justify-between items-center bg-white/25 shadow-[0px_0px_20px_2px_rgba(255,255,255,0.4)] backdrop-blur-lg mx-auto px-6 sm:px-8 py-3 rounded-full w-full max-w-6xl -translate-x-1/2">
        <div className="flex flex-grow justify-between items-center space-x-4 sm:space-x-6">
          <a href="#" className="ml-10 font-reg text-gray-100 text-sm hover:text-white transition-colors">
            Home
          </a>
          <a href="#" className="font-reg text-gray-100 text-sm hover:text-white transition-colors">
            Projects
          </a>
        </div>
        <div className="left-1/2 absolute font-bold text-3xl text-white transform -translate-x-1/2">
          Deprop
        </div>
        <div className="flex flex-grow justify-end items-center space-x-4 sm:space-x-6">
          <a href="#" className="font-reg text-gray-100 text-sm hover:text-white transition-colors">
            Dashboard
          </a>
          <span className="bg-black bg-black/70 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)] backdrop-blur-lg px-3 py-1 rounded-full font-semibold text-gray-100 text-xl">
            1000 DP
          </span>
          <img
            src="/happy-laughing-young-handsome-southeast-asian-man-isolated-blue-studio-background.jpg"
            alt="Profile"
            className="mr-5 border-2 border-white rounded-full w-9 h-9 object-cover"
          />
        </div>
      </nav> */}

      {/* Page title */}
      <div className="pt-10 px-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Project open for Investments</h1>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto px-6 pb-20 pt-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-xl overflow-hidden shadow relative"
          >
            <img
              src={project.imageUrl}
              alt={project.location}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <p className="text-white text-sm m-0">
                Location: {project.location}
              </p>
              <button className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition">
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