"use client";

export default function InvestmentCard() {
  // Mock data (simulate coming from a database)
  const project = {
    location: "Downtown, City A",
    company: "UrbanPrime Dev",
    pricePerUnit: 450000,
    status: "Pre-selling",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 750,
    furniture: "Fully furnished",
    facilities: [
      "Rooftop garden",
      "Co-working lounge",
      "Pet spa",
      "Bike storage",
    ],
    remainingShare: 30000,
  };

  return (
    <div className="gap-6 grid grid-cols-3 bg-black/20 mx-auto mt-10 p-6 rounded-2xl max-w-5xl text-white">
      {/* Left side (project details) */}
      <div className="flex flex-col space-y-2 col-span-2">
        <p><span className="font-semibold">Location:</span> {project.location}</p>
        <p><span className="font-semibold">Company:</span> {project.company}</p>
        <p><span className="font-semibold">Price per Unit:</span> ${project.pricePerUnit.toLocaleString()}</p>
        <p><span className="font-semibold">Status:</span> {project.status}</p>
        <div className="mt-4">
          <p className="mb-1 font-semibold">More information:</p>
          <p>Bedrooms: {project.bedrooms}</p>
          <p>Bathrooms: {project.bathrooms}</p>
          <p>Sq. Ft.: {project.squareFeet}</p>
          <p>Furniture: {project.furniture}</p>
          <p className="mt-2">
            Facilities: {project.facilities.join(" ・ ")}
          </p>
        </div>
      </div>

      {/* Right side (remaining share and invest input) */}
      <div className="flex flex-col justify-between">
        {/* Remaining share */}
        <div className="bg-black/30 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)] mb-4 px-10 py-5 rounded-2xl text-center">
          <p className="text-lg">Remaining share:</p>
          <p className="mt-1 font-bold text-3xl">{project.remainingShare.toLocaleString()} DP</p>
        </div>

        {/* Invest input */}
        <div className="flex flex-col space-y-4 bg-black/30 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)] px-4 py-12 rounded-2xl">
          <div className="flex items-center bg-black/40 px-4 py-2 rounded-lg">
            <input
              type="number"
              step={0.01}
              placeholder="0.00"
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-400"
            />
            <span className="ml-2 font-semibold">DP</span>
          </div>
          <button className="bg-white hover:bg-gray-200 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.5)] py-2 rounded-lg font-semibold text-black transition">
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}
