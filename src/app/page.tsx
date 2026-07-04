"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import OmSaiLogisticsPage from '../components/services';
import HeroWithFilter from '@/components/hero';
import Navbar from '@/components/navbar';
import { Heart, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    title: '5000+ Successful Moves',
    desc: 'Trusted by families and businesses across the country to relocate safely, on time, every time.',
    icon: (
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    ),
  },
  {
    title: 'Trained & Verified Staff',
    desc: 'Every packer and driver is background-checked, trained, and insured for a safe move.',
    icon: (
      <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.2c-3.3 0-9.8 1.6-9.8 4.9v2.7h19.6v-2.7c0-3.3-6.5-4.9-9.8-4.9z" />
    ),
  },
  {
    title: 'On-Time Guarantee',
    desc: 'Real-time tracked fleet and planned routes mean your move arrives exactly when promised.',
    icon: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 11h4v2h-6V7h2v6z" />
    ),
  },
  {
    title: 'Transparent Pricing',
    desc: 'No hidden charges. Get a clear, itemized quote before your move — what you see is what you pay.',
    icon: (
      <path d="M11 2v2.06A8.994 8.994 0 003.06 12H1v2h2.06A8.994 8.994 0 0011 21.94V24h2v-2.06A8.994 8.994 0 0020.94 14H23v-2h-2.06A8.994 8.994 0 0013 4.06V2h-2zm1 4a6 6 0 110 12 6 6 0 010-12z" />
    ),
  },
];

interface Mover {
  name: string;
  years: number;
  rating: number;
  reviews: number;
  tags: string[];
  price: number;
  image:string;
  subtitle:string;
  status:string;
  verified: boolean;
}

const movers: Mover[] = [
  { name: "Summit Packers Co.", years: 12, rating: 4.9, reviews: 842, tags: ["Residential", "Long-distance"], price: 1189, verified: true, image:"/first.webp",subtitle:"this is a good mover packer in jaipur",status:"" },
  { name: "BlueLine Movers", years: 8, rating: 4.8, reviews: 613, tags: ["Office", "Storage"], price: 2179, verified: true, image:"/img1.avif",subtitle:"this is a good mover packer in jaipur",status:"cancelled" },
  { name: "LimeCrate Relocations", years: 6, rating: 4.7, reviews: 401, tags: ["Piano", "Fragile items"], price: 3495, verified: false, image:"/second.webp",subtitle:"this is a good mover packer in jaipur",status:"pending" },
  { name: "Anchor Moving Group", years: 15, rating: 5.0, reviews: 1204, tags: ["Residential", "Office"], price: 2199, verified: true, image:"/third.webp",subtitle:"this is a good mover packer in jaipur",status:"tommorow" },
  { name: "Swift Pack & Ship", years: 4, rating: 4.6, reviews: 288, tags: ["Long-distance", "Storage"], price: 1174, verified: false, image:"/four.avif",subtitle:"this is a good mover packer in jaipur",status:"" },
  { name: "Golden State Haulers", years: 10, rating: 4.8, reviews: 567, tags: ["Residential", "Fragile items"], price: 894, verified: true, image:"/family-worker-img.png",subtitle:"this is a good mover packer in jaipur",status:"work is done" },
  { name: "Metro Pack Pros", years: 7, rating: 4.7, reviews: 349, tags: ["Office", "Long-distance"], price: 1899, verified: false, image:"/img3.webp",subtitle:"this is a good mover packer in jaipur",status:"packing is start" },
  { name: "Evergreen Movers", years: 9, rating: 4.9, reviews: 721, tags: ["Residential", "Storage"], price: 2492, verified: true, image:"/img2.avif",subtitle:"this is a good mover packer in jaipur",status:"moving is in 15 mints" },
];
export default function HeroSection() {
    const CARD_WIDTH = 264;
    const CARD_GAP = 20;
    const VISIBLE = 4;
    const STEP = CARD_WIDTH + CARD_GAP;
    const N = movers.length;
    const track: Mover[] = [...movers, ...movers.slice(0, VISIBLE)];
  const [service, setService] = useState<string>("truck");
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [index, setIndex] = useState<number>(0);
      const [smooth, setSmooth] = useState<boolean>(true);
      
    useEffect(() => {
        if (index >= N) {
          resetTimeout.current = setTimeout(() => {
            setSmooth(false);
            setIndex(0);
          }, 1800);
        }
        return () => {
          if (resetTimeout.current) clearTimeout(resetTimeout.current);
        };
      }, [index, N]);
      useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev:any) => prev + 2);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (!smooth) {
      const raf = requestAnimationFrame(() => setSmooth(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [smooth]);

  return (
    <>
    <Navbar/>
    <HeroWithFilter/>
 <section className="relative w-full bg-[#F7F8F5] overflow-hidden py-10 px-6 md:px-12 font-sans">
 
      {/* Faint diagonal brand accent, top-right — echoes the hero ribbon without competing with it */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-linear-[115deg,transparent_45%,#005bb5_45%,#005bb5_48%,#84cc16_48%,#84cc16_51%,transparent_51%] opacity-[0.08] pointer-events-none" />
 
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
 
        {/* LEFT: Content */}
        <div className="flex flex-col text-left">
          <span className="text-lime-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">
            Why Choose Us
          </span>
 
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-blue-950 leading-[1.05] mb-5">
            Om Sai Packers <br className="hidden sm:block" />
            <span className="text-lime-600">& Movers</span>
          </h2>
 
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mb-8">
            From careful packing to safe transport and hassle-free unloading, Om Sai
            Packers &amp; Movers handles every step of your relocation with care —
            so you can focus on settling into your new home.
          </p>
 
          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-9">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="shrink-0 w-11 h-11 rounded-lg bg-blue-950 flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 fill-lime-400" viewBox="0 0 24 24">
                    {f.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-blue-950 text-sm md:text-base mb-1">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-snug">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
 
          <button className="self-start bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-sm md:text-base px-7 py-3 rounded-full uppercase tracking-wider shadow-[0_8px_20px_rgba(132,204,22,0.35)] hover:shadow-[0_10px_25px_rgba(132,204,22,0.55)] transform hover:-translate-y-0.5 transition-all duration-300 ease-out cursor-pointer">
            Get Free Quote
          </button>
        </div>
 
        {/* RIGHT: Truck image */}
        <div className="relative w-full h-72 sm:h-96 md:h-[460px]">
          {/* Blue backdrop panel, offset behind the image for depth */}
          <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full bg-blue-950 rounded-2xl" />
 
          {/* Lime accent bar, offset opposite corner */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-2/3 h-2/3 bg-lime-500 rounded-2xl -z-10" />
 
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200"
              alt="Om Sai Packers and Movers truck"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-blue-950/50 via-transparent to-transparent" />
          </div>
 
          {/* Stat pill, overlapping the image bottom-left */}
          <div className="absolute -bottom-5 left-4 sm:left-6 bg-white rounded-xl shadow-xl px-5 py-3 flex items-center gap-3 border border-gray-100">
            <span className="text-2xl md:text-3xl font-black text-blue-950">10+</span>
            <span className="text-xs md:text-sm font-semibold text-gray-500 leading-tight">
              Years of<br />Trusted Service
            </span>
          </div>
        </div>
 
      </div>
    </section>
      {/* ===================== PACKERS & MOVERS — AUTO-SCROLL LISTING ===================== */}
      <section className="px-6 pb-24 pt-4" style={{ background: "#F7F8F5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-1">
              Vetted and verified
            </p>
            <h2 className="italic font-black uppercase tracking-tight text-gray-900 text-2xl md:text-3xl">
            <span className="text-lime-600">Packers &amp; movers</span> <span className="text-blue-900">   you can trust</span> 
            </h2>
          </div>

          <div className="relative" style={{ overflow: "hidden" }}>
            <div
              className="flex"
              style={{
                gap: `${CARD_GAP}px`,
                transform: `translateX(-${index * STEP}px)`,
                transition: smooth ? "transform 0.45s cubic-bezier(0.4,0,0.2,1)" : "none",
              }}
            >
 {track.map((mover, i) => (
  <div
    key={`${mover.name}-${i}`}
    className=" rounded-xl   transition-shadow duration-300 shrink-0 overflow-hidden"
    style={{ width: `${CARD_WIDTH}px` }}
  >
    {/* Image Section */}
    <div className="relative w-full" style={{ height: "130px" }}>
      <img
        src={mover.image || "/placeholder-mover.jpg"}
        alt={mover.name}
        className="w-full h-full object-cover"
      />

      {/* Dark gradient overlay at bottom for text readability */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
        }}
      />

      {/* RERA Badge - top left */}
      {mover.verified && (
        <span className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
          RERA
        </span>
      )}

      {/* Heart / Wishlist icon - top right */}
      <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
        <Heart className="w-3.5 h-3.5 text-gray-700" />
      </button>

      {/* Status text - bottom of image */}
      <p className="absolute bottom-2.5 left-3 text-white text-xs font-semibold">
        {mover.status || "Ready To Move"}
      </p>
    </div>

    {/* Info Section */}
    <div className="p-1">
      <h3 className="font-bold text-gray-900 text-base pt-2 leading-snug">
        {mover.name}
      </h3>
      <p className="text-xs text-gray-500 font-medium mt-1 leading-snug">
        {mover.subtitle}
      </p>
      <p className="text-sm font-bold text-gray-900 mt-1">
        ₹ {mover.price}
      </p>
    </div>
  </div>
))}
            </div>
          </div>
        </div>
      </section>
    <OmSaiLogisticsPage/>
  
    </>
  );
}