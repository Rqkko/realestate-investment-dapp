"use client";
import { useState } from "react";
import InvestmentCard from "@/app/projectDetails/components/InvestmentCard";

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
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0022CC] flex flex-col pb-100">
      {/* Spacer */}
      <div className="h-20" />

      {/* Navbar */}
      <nav
        className="flex fixed top-10 left-1/2 -translate-x-1/2 items-center justify-between 
        bg-white/25 backdrop-blur-lg rounded-full px-6 sm:px-8 py-3 
        shadow-[0px_0px_20px_2px_rgba(255,255,255,0.4)] w-full max-w-6xl mx-auto z-30"
      >
        {/* Left, Center, Right sides (same as before) */}
        <div className="flex items-center space-x-4 sm:space-x-6 flex-grow justify-between">
          <a
            href="#"
            className="text-gray-100 hover:text-white font-reg text-sm transition-colors ml-10"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-100 hover:text-white font-reg text-sm transition-colors mr-60"
          >
            Projects
          </a>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-white text-3xl">
          Deprop
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6 flex-grow justify-end">
          <a
            href="#"
            className="text-gray-100 hover:text-white font-reg text-sm transition-colors mr-30"
          >
            Dashboard
          </a>
          <span className="bg-black text-gray-100 font-semibold text-xl px-3 mr-3 py-1 rounded-full bg-black/70 backdrop-blur-lg shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)]">
            1000 DP
          </span>
          <img
            src="/happy-laughing-young-handsome-southeast-asian-man-isolated-blue-studio-background.jpg"
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-white mr-5"
          />
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-col items-center pt-24 px-4">
        <div className="w-[90%] max-w-5xl">
          {/* "The Willow" title */}
          <p className="text-white text-3xl font-bold mb-5">The Willow</p>

          {/* Photo Collage */}
          <div className="flex gap-2">
            {/* Left - Big Image */}
            <div className="w-2/3">
              <img
                src={bigImage}
                alt="Big Room"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>

            {/* Right - 2 Stacked Images */}
            <div className="w-1/3 flex flex-col gap-2">
              <img
                src={smallImageTop}
                alt="Living Room"
                className="w-full h-1/2 object-cover rounded-lg"
              />
              <div className="relative h-1/2">
                <img
                  src={smallImageBottom}
                  alt="Kitchen"
                  className="w-full h-full object-cover rounded-lg"
                />
                {/* Show all photos button */}
                <button
                  onClick={() => openModal(0)}
                  className="absolute bottom-4 right-4 bg-black/70 text-white text-sm font-semibold px-4 py-2 rounded-full"
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
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl px-6">
            <button
              onClick={closeModal}
              className="absolute top-4 right-6 text-white text-2xl"
            >
              ✕
            </button>

            <div className="flex items-center justify-between">
              <button onClick={prevPhoto} className="text-white text-4xl px-4">
                ‹
              </button>

              <img
                src={photos[currentPhotoIndex]}
                alt="Carousel"
                className="max-h-[80vh] object-contain rounded-lg"
              />

              <button onClick={nextPhoto} className="text-white text-4xl px-4">
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
