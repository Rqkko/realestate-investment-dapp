"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import InvestmentCard from "@/components/InvestmentCard";
import Navbar from "@/components/navbar";

import realestate1 from "../../../../public/realestates/realestate_1.jpg";
import realestate2 from "../../../../public/realestates/realestate_2.jpg";
import realestate3 from "../../../../public/realestates/realestate_3.jpg";
import realestate4 from "../../../../public/realestates/realestate_4.jpg";

export default function ProjectDetailsPage() {
  const { address } = useParams();
  const projectAddress = address as string;
  const [projectName, setProjectName] = useState("Loading...");

  const [bigImage, setBigImage] = useState("");
  const [smallImageTop, setSmallImageTop] = useState("");
  const [smallImageBottom, setSmallImageBottom] = useState("");

  useEffect(() => {
  if (projectName === "The Avana") {
    setBigImage(realestate1.src);
    setSmallImageTop(realestate1.src);
    setSmallImageBottom(realestate1.src);
  } else if (projectName === "Cascade One") {
    setBigImage(realestate2.src);
    setSmallImageTop(realestate2.src);
    setSmallImageBottom(realestate2.src);
  } else if (projectName === "Nova Crest") {
    setBigImage(realestate3.src);
    setSmallImageTop(realestate3.src);
    setSmallImageBottom(realestate3.src);
  } else if (projectName === "The Luma") { // ✅ Corrected project name
    setBigImage(realestate4.src);
    setSmallImageTop(realestate4.src);
    setSmallImageBottom(realestate4.src);
  }
}, [projectName]);


  const photos = [bigImage, smallImageTop, smallImageBottom];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const nextPhoto = () => setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const allImagesSame = bigImage === smallImageTop && smallImageTop === smallImageBottom;

  // ... keep your imports and hooks as-is ...

return (
  <div className="flex flex-col bg-gradient-to-b from-black to-[#0022CC] pb-100 min-h-screen">
    <div className="h-20" />
    <Navbar />

    <div className="flex flex-col items-center px-4 pt-24">
      <div className="w-[90%] max-w-5xl">
        <p className="mb-5 font-bold text-3xl text-white">{projectName}</p>

        {allImagesSame ? (
          <div className="flex w-full h-[400px]"> {/* full width with fixed height */}
            {bigImage && (
              <img
                src={bigImage}
                alt="Project"
                className="rounded-lg w-full h-full object-cover"
              />
            )}
          </div>
        ) : (
          <div className="flex gap-2 h-[400px]">
            <div className="w-2/3">
              {bigImage && (
                <img
                  src={bigImage}
                  alt="Big Room"
                  className="rounded-lg w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-col gap-2 w-1/3">
              {smallImageTop && (
                <img
                  src={smallImageTop}
                  alt="Living Room"
                  className="rounded-lg w-full h-1/2 object-cover"
                />
              )}
              <div className="relative h-1/2">
                {smallImageBottom && (
                  <img
                    src={smallImageBottom}
                    alt="Kitchen"
                    className="rounded-lg w-full h-full object-cover"
                  />
                )}
                <button
                  onClick={() => openModal(0)}
                  className="right-4 bottom-4 absolute bg-black/70 px-4 py-2 rounded-full font-semibold text-sm text-white"
                >
                  Show all photos
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    <InvestmentCard projectAddress={projectAddress} setProjectName={setProjectName} />

    {isModalOpen && (
      <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">
        <div className="relative px-6 w-full max-w-3xl">
          <button onClick={closeModal} className="top-4 right-6 absolute text-2xl text-white">✕</button>
          <div className="flex justify-between items-center">
            <button onClick={prevPhoto} className="px-4 text-4xl text-white">‹</button>
            {photos[currentPhotoIndex] && (
              <img
                src={photos[currentPhotoIndex]}
                alt="Carousel"
                className="rounded-lg max-h-[80vh] object-contain"
              />
            )}
            <button onClick={nextPhoto} className="px-4 text-4xl text-white">›</button>
          </div>
        </div>
      </div>
    )}
  </div>
);

}
