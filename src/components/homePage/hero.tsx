import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, Truck, ArrowRight, Star, ShieldCheck, Package, Phone, PhoneCall, User, Heart } from "lucide-react";
import Image from "next/image";
import RoutesPage from "./routesPage";
import Link from "next/link";




interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}
interface ServiceType {
  id: string;
  label: string;
  image: string;
}

const serviceTypes: ServiceType[] = [
  { id: "truck", label: "Truck", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=200" },
  { id: "bike", label: "Bike", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=200" },
  { id: "packer", label: "Mover & Packer", image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=200" },
];


const services: ServiceItem[] = [
    {
      id: 1,
      title: "Household Relocation",
      description: "Specialized packing for fragile items.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-emerald-500">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Corporate Moves",
      description: "Minimal downtime, IT asset handling.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-blue-600">
          <rect x="16" y="16" width="6" height="6" rx="1"/>
          <rect x="2" y="16" width="6" height="6" rx="1"/>
          <rect x="9" y="2" width="6" height="6" rx="1"/>
          <path d="M12 8v8"/>
          <path d="M12 12H5v4"/>
          <path d="M12 12h7v4"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Vehicle Transport",
      description: "Open and enclosed car carriers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-emerald-500">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Secure Warehousing",
      description: "Long & short-term storage solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-emerald-500">
          <path d="M3 21V10l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <path d="M9 21V12h6v9"/>
        </svg>
      )
    }
  ];





export default function HeroWithFilter() {
  // ---- Auto-scrolling movers carousel: advances by 2 cards every 0.5s ----



  const [smooth, setSmooth] = useState<boolean>(true);


  
  


  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* ===================== HERO — HALF SCREEN ===================== */}
     <section
  className="relative w-full overflow-hidden text-white select-none antialiased"
  style={{ height: "50vh", minHeight: "480px" }}
>
  <div className="absolute inset-0 w-full h-full">
    {/* Left piece */}
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        WebkitMaskImage:
          "linear-gradient(115deg, #000 0%, #000 45.5%, transparent 50.5%)",
        maskImage:
          "linear-gradient(115deg, #000 0%, #000 45.5%, transparent 50.5%)",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1000"
        alt="City traffic"
        className="w-full h-full object-cover"
        style={{ filter: "grayscale(20%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(30,58,138,0.4)", mixBlendMode: "multiply" }}
      />
    </div>

    {/* Right piece */}
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        WebkitMaskImage:
          "linear-gradient(115deg, transparent 47.5%, #000 52.5%, #000 100%)",
        maskImage:
          "linear-gradient(115deg, transparent 47.5%, #000 52.5%, #000 100%)",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000"
        alt="Suburban house"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(132,204,22,0.3)", mixBlendMode: "multiply" }}
      />
    </div>

    {/* Diagonal ribbon */}
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        background:
          "linear-gradient(115deg, transparent 47.5%, #005bb5 47.5%, #005bb5 49.5%, #84cc16 49.5%, #84cc16 52.5%, transparent 52.5%)",
      }}
    />
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "linear-gradient(115deg, transparent 50%, rgba(132,204,22,0.15) 70%)",
      }}
    />
  </div>

  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      zIndex: 15,
      background:
        "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, transparent 75%)",
    }}
  />

  {/* HERO CONTENT */}
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
    <h1
      className="hero-fade-in font-black italic uppercase max-w-3xl leading-none"
      style={{
        fontSize: "clamp(28px, 5vw, 52px)",
        letterSpacing: "-0.03em",
        textShadow: "0 6px 18px rgba(0,0,0,0.9)",
      }}
    >
      Coast to coast, <br />
      city to city, moved fast.
    </h1>

    <p
      className="hero-fade-in hero-delay-1 mt-2 text-sm md:text-base font-medium max-w-md"
      style={{ color: "rgba(255,255,255,0.85)" }}
    >
      Relocate anywhere in the Jaipur, stress-free.
    </p>
    {/*  */}
         <div className="w-full max-w-7xl mx-auto p-3  min-height-screen flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="flex items-center gap-2 bg-stone-100 border border-gray-200 rounded-xl p-3 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Icon Container */}
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10">
              {service.icon}
            </div>

            {/* Content Container */}
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-0.5">
                Service Pillar
              </span>
              <h3 className="text-base font-bold text-gray-900 leading-tight ">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-snug">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ===================== OVERLAPPING FILTER BAR ===================== */}
    <div className="bg-[#F7F8F5]">
      <div
        className="relative w-full px-4 pb-16"
        style={{ zIndex: 40 }}
      >
        <div
          className="mx-auto max-w-5xl bg-stone-100 rounded-2xl shadow-2xl px-5 py-5 md:px-8 md:py-6"
          style={{
            marginTop: "-110px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
         

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 items-end">
               <img src="/parcels.png" className="absolute w-24 top-34 right-16  mt-6"/>
            <img src="/truck.png" className="absolute w-50 top-18 right-40  mt-6"/>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Moving from
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-lime-500 transition-colors">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <input
                  type="text"
                  placeholder="City or ZIP code"
                  className="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Moving to
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-lime-500 transition-colors">
                <MapPin className="w-4 h-4 text-lime-600 shrink-0" />
                <input
                  type="text"
                  placeholder="City or ZIP code"
                  className="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
   <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Phone No.
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-lime-500 transition-colors">
                <PhoneCall className="w-4 h-4 text-lime-600 shrink-0" />
                <input
                  type="text"
                  placeholder="+91XXXXXXXXXX"
                  className="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
             <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
               Name
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-lime-500 transition-colors">
                <User className="w-4 h-4 text-lime-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Move date
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-lime-500 transition-colors">
                <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                <input
                  type="date"
                  className="w-full text-sm text-gray-800 outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Home size
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-lime-500 transition-colors">
                <Truck className="w-4 h-4 text-gray-500 shrink-0" />
                <select className="w-full text-sm text-gray-800 outline-none bg-transparent">
                  <option>Studio</option>
                  <option>1 bedroom</option>
                  <option>2 bedrooms</option>
                  <option>3+ bedrooms</option>
                </select>
              </div>
            </div>
          </div>

         <Link href="/get-a-quote"> <button className="group  w-full md:w-auto flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-sm px-8 py-3 rounded-full uppercase tracking-wider shadow-lg transition-all duration-300 cursor-pointer">
            Get my free quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          </Link>
        </div>
      </div>
      </div>

      {/* ===================== POPULAR ROUTES LISTING ===================== */}
   <RoutesPage/>

    

      <style>{`
        .hero-fade-in {
          opacity: 0;
          transform: translateY(16px);
          animation: heroFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-delay-1 { animation-delay: 0.12s; }
        @keyframes heroFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-in { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}