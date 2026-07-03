"use client"
import React, { ReactNode } from 'react';

// --- Types ---
interface Service {
  title: string;
  description: string;
  image: string;
  icon: ReactNode;
}

// --- Data for the Service Cards ---
// NOTE: image URLs below are placeholder stock photos (picsum.photos).
// Swap the `image` field for each service with your own real photography.
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
    icon:"/warehouse.png",
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
    {/* <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5C25 5 10 25 15 50C20 75 40 95 60 90C70 87 75 75 70 65C65 55 50 60 45 50C40 40 50 25 65 30" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" />
      <circle cx="45" cy="40" r="5" fill="#1e3a8a" />
      <path d="M80 20C85 30 80 45 70 50" stroke="#84cc16" strokeWidth="4" strokeLinecap="round" />
    </svg> */}
  </div>
);

// --- Reusable ISO Badge Component ---
const IsoBadge: React.FC = () => (
  <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-blue-900 bg-lime-50 text-center flex-shrink-0">
    <div className="flex flex-col items-center leading-none">
      <span className="text-xs md:text-sm font-bold text-blue-900">ISO</span>
      <span className="text-xs text-lime-600 font-semibold mt-1">CERTIFIED</span>
    </div>
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

        {/* Top-right ISO badge, attached to the border */}
        <div className="absolute top-0 right-6 md:right-10 -translate-y-1/2 bg-stone-50 px-3 md:px-4">
          {/* <IsoBadge /> */}
        </div>

        {/* Bottom-right logo, attached to the border */}
        <div className="absolute bottom-0 right-6 md:right-10 translate-y-1/2 bg-stone-50 px-3 md:px-4 flex items-center gap-4">
          {/* <IsoBadge /> */}
          <Logo />
        </div>

        {/* Main Title */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-2xl lg:text-4xl font-extrabold text-blue-900 uppercase tracking-tight">
           <span className='text-lime-600'> OM SAI MOVER PACKER    </span>: <span className="font-semibold">Professional Logistics Solutions</span>
          </h1>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service: Service, index: number) => (
            <div
              key={index}
              className="group relative h-80 overflow-hidden rounded-sm border-b-4 border-blue-900 shadow-lg cursor-pointer"
            >
              {/* Pre-hover layer: image + dark overlay + big bottom-center title */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="absolute inset-0 bg-black opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <span className="text-white text-lg md:text-xl font-bold uppercase tracking-wide whitespace-pre-line leading-tight">
                    {service.title}
                  </span>
                </div>
              </div>

              {/* Hover layer: existing card design */}
              <div className="absolute inset-0 bg-lime-50 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="mb-2">
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-blue-900 whitespace-pre-line leading-tight mb-4 uppercase">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base font-medium">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OmSaiLogisticsPage;

