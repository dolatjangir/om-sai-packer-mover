"use client"
import React from 'react';

// --- Types ---
interface Service {
  title: string;
  description: string;
  image: string;
  icon: string;
}

// --- Data for the Service Cards ---
const services: Service[] = [
  {
    title: "HOME & OFFICE\nSHIFTING",
    description: "Expert moving for homes and corporate spaces with care.",
    image: "https://picsum.photos/seed/om-sai-home-office/600/800",
    icon: "/home.png",
  },
  {
    title: "WAREHOUSING\n& STORAGE",
    description: "Secure and structured storage solutions for your goods.",
    image: "https://picsum.photos/seed/om-sai-warehouse/600/800",
    icon: "/warehouse.png",
  },
  {
    title: "TRANSPORTATION\n(as seen on our fleet)",
    description: "Efficient and timely logistics across roads.",
    image: "https://picsum.photos/seed/om-sai-transport/600/800",
    icon: "/pickup.png",
  },
  {
    title: "PAN INDIA\nSERVICES",
    description: "Comprehensive relocations across the nation.",
    image: "https://picsum.photos/seed/om-sai-pan-india/600/800",
    icon: "/map.png",
  },
  {
    title: "EXPRESS\nMOVING",
    description: "Rapid transit for time-critical shipments.",
    image: "https://picsum.photos/seed/om-sai-express/600/800",
    icon: "/clock.png",
  },
];

// --- Reusable Logo Component ---
const Logo: React.FC = () => (
  <div className="flex items-center gap-3">
    <h2 className="text-2xl md:text-4xl font-extrabold text-blue-900 tracking-wider">
      OM <span className='text-lime-600'>SAI</span>
    </h2>
  </div>
);

const OmSaiLogisticsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8 font-sans">

      {/* Framed section: square border with logos attached at the corners */}
      <div className="max-w-7xl mx-auto relative border-2 border-blue-900 px-6 md:px-10 pt-14 pb-16 md:pt-8 md:pb-10">

        {/* Top-left logo, attached to the border */}
        <div className="absolute top-0 left-6 md:left-10 -translate-y-1/2 bg-stone-50 px-3 md:px-4">
          <Logo />
        </div>

        {/* Bottom-right logo, attached to the border */}
        <div className="absolute bottom-0 right-6 md:right-10 translate-y-1/2 bg-stone-50 px-3 md:px-4 flex items-center gap-4">
          <Logo />
        </div>

        {/* Main Title */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-2xl lg:text-4xl font-extrabold text-blue-900 uppercase tracking-tight">
            <span className='text-lime-600'>OM SAI MOVER PACKER</span> : <span className="font-semibold">Professional Logistics Solutions</span>
          </h1>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service: Service, index: number) => (
            <div
              key={index}
              className="relative h-80 overflow-hidden rounded-sm border-b-4 border-blue-900 shadow-2xl shadow-lime-100 bg-stone-200 flex flex-col items-center justify-center text-center p-6"
            >
              <img src={service.icon} alt={service.title} className="mb-2" />

              <h3 className="text-lg md:text-xl font-bold text-blue-900 whitespace-pre-line leading-tight mb-4 uppercase">
                {service.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OmSaiLogisticsPage;