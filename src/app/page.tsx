"use client"
import React from 'react';
import Image from 'next/image';
import MoverPackerServices from '@/components/services';

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


export default function HeroSection() {
  return (
    <>
    <section className="relative w-full h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden font-sans text-white select-none antialiased">

      {/* 1. BACKGROUND IMAGES — diagonally clipped with a CSS mask so the cut
          uses the EXACT same 115deg angle as the ribbon below. Because both
          the mask and the ribbon gradient are computed off the same element
          size, they always line up perfectly at any viewport width — no
          hand-tuned clip-path polygons that would drift on resize. */}
      <div className="absolute inset-0 w-full h-full">

        {/* Left piece: City image, cut on its RIGHT side */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            WebkitMaskImage:
              'linear-gradient(115deg, #000 0%, #000 45.5%, transparent 50.5%)',
            maskImage:
              'linear-gradient(115deg, #000 0%, #000 45.5%, transparent 50.5%)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1000"
            alt="City Traffic"
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        </div>

        {/* Right piece: House image, cut on its LEFT side */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            WebkitMaskImage:
              'linear-gradient(115deg, transparent 47.5%, #000 52.5%, #000 100%)',
            maskImage:
              'linear-gradient(115deg, transparent 47.5%, #000 52.5%, #000 100%)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000"
            alt="Suburban House"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-lime-500/30 mix-blend-multiply" />
        </div>

        {/* The 30-degree ribbon — untouched, still sits on top (z-10) and
            physically hides the soft mask feather where the two images meet */}
        <div className="absolute inset-0 z-10 bg-linear-[115deg,transparent_47.5%,#005bb5_47.5%,#005bb5_49.5%,#84cc16_49.5%,#84cc16_52.5%,transparent_52.5%] pointer-events-none" />

        {/* Right side soft green shade softener */}
        <div className="absolute inset-0 z-0 bg-linear-[115deg,transparent_50%,rgba(132,204,22,0.15)_70%]" />
      </div>

      {/* 1b. CONTRAST BOOSTER — a quiet radial vignette behind the copy so
          headline/badge stay legible no matter how bright the photo behind
          them is. Sits above the ribbon, below the content. */}
      <div className="absolute inset-0 z-[15] bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.25)_45%,transparent_75%)] pointer-events-none" />

      {/* 2. NAVIGATION BAR */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 md:px-12 bg-linear-to-b from-black/50 to-transparent">
        <div className="flex items-center space-x-1 cursor-pointer">
          <span className="text-3xl font-black tracking-tighter text-white">O</span>
          <span className="text-3xl font-black tracking-tighter text-lime-500">S</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 font-semibold text-sm tracking-wide text-white drop-shadow-md">
          <a href="#process" className="hover:text-lime-400 transition-colors duration-300">Process</a>
          <a href="#locations" className="hover:text-lime-400 transition-colors duration-300">Locations</a>
          <a href="#fleet" className="hover:text-lime-400 transition-colors duration-300">Fleet</a>
          <a href="#contact" className="hover:text-lime-400 transition-colors duration-300">Contact</a>
        </nav>

        <div className="absolute top-14 right-6 md:right-12 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 w-44 shadow-lg hidden sm:block">
          <p className="text-[10px] text-gray-200 font-medium mb-1 text-right">Animated map with real-time.</p>
          <div className="w-full h-20 bg-emerald-950/40 rounded-lg relative overflow-hidden flex items-center justify-center border border-emerald-500/20">
            <svg className="w-full h-full stroke-blue-400 fill-none" viewBox="0 0 100 50">
              <path d="M10,40 Q30,10 60,25 T90,15" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="90" cy="15" r="3" className="fill-lime-400 animate-ping" />
              <circle cx="90" cy="15" r="2" className="fill-lime-500" />
            </svg>
          </div>
        </div>
      </header>

      {/* 3. HERO CONTENT */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center mt-12">

        <h1 className="hero-fade-in text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase max-w-5xl leading-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)]">
          Coast to Coast, <br />
          <span className="text-white">City to City, Moved Fast.</span>
        </h1>

        <div className="hero-fade-in hero-delay-1 relative flex items-center justify-center w-full max-w-2xl my-6">

          <div className="absolute w-full flex items-center justify-between pointer-events-none px-4 sm:px-12">
            <svg className="w-8 h-8 text-blue-500 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            <svg className="w-8 h-8 text-blue-500 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center  backdrop-blur-xs px-6 py-8 rounded-md border border-blue-400/40 shadow-2xl mx-12">
             <img
    src="/hero-section-image.png"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-contain opacity-50"
  />
            {/* <div className="flex items-center space-x-2 bg-blue-950 px-3 py-1 rounded border border-blue-700 shadow-inner">
              <div className="text-white font-black text-xs tracking-tighter leading-none">
                <span className="text-blue-400">M</span><span className="text-lime-400">R</span>
              </div>
              <div className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">
                Metro <span className="text-blue-400 font-normal block text-[7px] tracking-normal -mt-0.5">RELOCATORS</span>
              </div>
            </div> */}
            <p className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-white mt-1 drop-shadow-sm">
              Relocate anywhere in the US, stress-free.
            </p>
          </div>
        </div>

        <button className="hero-fade-in hero-delay-2 group mt-2 bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-base md:text-lg px-8 py-3.5 rounded-full uppercase tracking-wider shadow-[0_8px_20px_rgba(132,204,22,0.4)] hover:shadow-[0_10px_25px_rgba(132,204,22,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 ease-out cursor-pointer">
          Plan My Move
        </button>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/50 to-transparent pointer-events-none z-10" />

      <style jsx>{`
        .hero-fade-in {
          opacity: 0;
          transform: translateY(16px);
          animation: heroFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-delay-1 { animation-delay: 0.12s; }
        .hero-delay-2 { animation-delay: 0.24s; }
        @keyframes heroFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
 <section className="relative w-full bg-white overflow-hidden py-16 md:py-24 px-6 md:px-12 font-sans">
 
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
    <MoverPackerServices/>
  
    </>
  );
}