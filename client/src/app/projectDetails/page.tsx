"use client";
import { useState } from "react";
import InvestmentCard from "@/app/components/InvestmentCard";
import Navbar from "@/app/components/navbar";


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
      <Navbar />


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
