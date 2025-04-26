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
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-3 gap-6 bg-black/20 rounded-2xl p-6 text-white">
      {/* Left side (project details) */}
      <div className="col-span-2 flex flex-col space-y-2">
        <p><span className="font-semibold">Location:</span> {project.location}</p>
        <p><span className="font-semibold">Company:</span> {project.company}</p>
        <p><span className="font-semibold">Price per Unit:</span> ${project.pricePerUnit.toLocaleString()}</p>
        <p><span className="font-semibold">Status:</span> {project.status}</p>
        <div className="mt-4">
          <p className="font-semibold mb-1">More information:</p>
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
        <div className="bg-black/30 rounded-2xl px-10 py-5 mb-4 text-center shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
          <p className="text-lg">Remaining share:</p>
          <p className="text-3xl font-bold mt-1">{project.remainingShare.toLocaleString()} DP</p>
        </div>

        {/* Invest input */}
        <div className="bg-black/30 rounded-2xl px-4 py-12 flex flex-col space-y-4 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.2)]">
          <div className="flex items-center bg-black/40 rounded-lg px-4 py-2">
            <input
              type="number"
              step={0.01}
              placeholder="0.00"
              className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
            />
            <span className="ml-2 font-semibold">DP</span>
          </div>
          <button className="bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 shadow-[0px_0px_15px_2px_rgba(255,255,255,0.5)] transition">
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}
