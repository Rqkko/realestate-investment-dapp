"use client";
import { useState } from "react";
import InvestmentCard from "@/app/components/InvestmentCard";

export default function ProjectDetails() {
  const bigImage = "/peaceful-bedroom-with-beige-colors-simple-design.jpg";
  const smallImageTop = "/living-room-scandinavian-interior-design.jpg";
  const smallImageBottom = "/empty-modern-room-with-furniture.jpg";

  const photos = [bigImage, smallImageTop, smallImageBottom];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-black to-[#0022CC] pb-100 min-h-screen">
      {/* Spacer */}
      <div className="h-20" />

      {/* Navbar */}
      <nav
        className="top-10 left-1/2 z-30 fixed flex justify-between items-center bg-white/25 shadow-[0px_0px_20px_2px_rgba(255,255,255,0.4)] backdrop-blur-lg mx-auto px-6 sm:px-8 py-3 rounded-full w-full max-w-6xl -translate-x-1/2"
      >
        {/* Left, Center, Right sides (same as before) */}
        <div className="flex flex-grow justify-between items-center space-x-4 sm:space-x-6">
          <a
            href="#"
            className="ml-10 font-reg text-gray-100 text-sm hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="mr-60 font-reg text-gray-100 text-sm hover:text-white transition-colors"
          >
            Projects
          </a>
        </div>
        <div className="left-1/2 absolute font-bold text-3xl text-white transform -translate-x-1/2">
          Deprop
        </div>
        <div className="flex flex-grow justify-end items-center space-x-4 sm:space-x-6">
          <a
            href="#"
            className="mr-30 font-reg text-gray-100 text-sm hover:text-white transition-colors"
          >
            Dashboard
          </a>
          <span className="bg-black bg-black/70 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)] backdrop-blur-lg mr-3 px-3 py-1 rounded-full font-semibold text-gray-100 text-xl">
            1000 DP
          </span>
          <img
            src="/happy-laughing-young-handsome-southeast-asian-man-isolated-blue-studio-background.jpg"
            alt="Profile"
            className="mr-5 border-2 border-white rounded-full w-9 h-9 object-cover"
          />
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-col items-center px-4 pt-24">
        <div className="w-[90%] max-w-5xl">
          {/* "The Willow" title */}
          <p className="mb-5 font-bold text-3xl text-white">The Willow</p>

          {/* Photo Collage */}
          <div className="flex gap-2">
            {/* Left - Big Image */}
            <div className="w-2/3">
              <img
                src={bigImage}
                alt="Big Room"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>

            {/* Right - 2 Stacked Images */}
            <div className="flex flex-col gap-2 w-1/3">
              <img
                src={smallImageTop}
                alt="Living Room"
                className="rounded-lg w-full h-1/2 object-cover"
              />
              <div className="relative h-1/2">
                <img
                  src={smallImageBottom}
                  alt="Kitchen"
                  className="rounded-lg w-full h-full object-cover"
                />
                {/* Show all photos button */}
                <button
                  onClick={() => openModal(0)}
                  className="right-4 bottom-4 absolute bg-black/70 px-4 py-2 rounded-full font-semibold text-sm text-white"
                >
                  Show all photos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* InvestmentCard */}
      <InvestmentCard />

      {/* Modal */}
      {isModalOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">
          <div className="relative px-6 w-full max-w-3xl">
            <button
              onClick={closeModal}
              className="top-4 right-6 absolute text-2xl text-white"
            >
              ✕
            </button>

            <div className="flex justify-between items-center">
              <button onClick={prevPhoto} className="px-4 text-4xl text-white">
                ‹
              </button>

              <img
                src={photos[currentPhotoIndex]}
                alt="Carousel"
                className="rounded-lg max-h-[80vh] object-contain"
              />

              <button onClick={nextPhoto} className="px-4 text-4xl text-white">
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
