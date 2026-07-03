import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, Truck, ArrowRight, Star, ShieldCheck, Package, Phone, PhoneCall, User } from "lucide-react";
import Image from "next/image";

interface Route {
  from: string;
  to: string;
  distance: string;
  duration: string;
  price: number;
  popular: boolean;
  image:string
}

interface Mover {
  name: string;
  years: number;
  rating: number;
  reviews: number;
  tags: string[];
  price: number;
  verified: boolean;
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

const routes: Route[] = [
  { from: "New York, NY", to: "Miami, FL", distance: "1,280 mi", duration: "3–5 days", price: 1899, popular: true,image:"/img1.avif" },
  { from: "Los Angeles, CA", to: "Austin, TX", distance: "1,375 mi", duration: "3–5 days", price: 1749, popular: false,image:"/img2.avif" },
  { from: "Chicago, IL", to: "Denver, CO", distance: "996 mi", duration: "2–4 days", price: 1399, popular: true,image:"/img3.webp" },
  { from: "Seattle, WA", to: "San Francisco, CA", distance: "808 mi", duration: "2–3 days", price: 1249, popular: false,image:"/img4.webp" },
  { from: "Boston, MA", to: "Washington, DC", distance: "440 mi", duration: "1–2 days", price: 899, popular: false,image:"/parcels.png" },
  { from: "Dallas, TX", to: "Phoenix, AZ", distance: "887 mi", duration: "2–3 days", price: 1199, popular: false,image:"/img6.webp" },
];

const movers: Mover[] = [
  { name: "Summit Packers Co.", years: 12, rating: 4.9, reviews: 842, tags: ["Residential", "Long-distance"], price: 89, verified: true },
  { name: "BlueLine Movers", years: 8, rating: 4.8, reviews: 613, tags: ["Office", "Storage"], price: 79, verified: true },
  { name: "LimeCrate Relocations", years: 6, rating: 4.7, reviews: 401, tags: ["Piano", "Fragile items"], price: 95, verified: false },
  { name: "Anchor Moving Group", years: 15, rating: 5.0, reviews: 1204, tags: ["Residential", "Office"], price: 99, verified: true },
  { name: "Swift Pack & Ship", years: 4, rating: 4.6, reviews: 288, tags: ["Long-distance", "Storage"], price: 74, verified: false },
  { name: "Golden State Haulers", years: 10, rating: 4.8, reviews: 567, tags: ["Residential", "Fragile items"], price: 84, verified: true },
  { name: "Metro Pack Pros", years: 7, rating: 4.7, reviews: 349, tags: ["Office", "Long-distance"], price: 89, verified: false },
  { name: "Evergreen Movers", years: 9, rating: 4.9, reviews: 721, tags: ["Residential", "Storage"], price: 92, verified: true },
];

export default function HeroWithFilter() {
  // ---- Auto-scrolling movers carousel: advances by 2 cards every 0.5s ----
  const CARD_WIDTH = 264;
  const CARD_GAP = 20;
  const VISIBLE = 4;
  const STEP = CARD_WIDTH + CARD_GAP;
  const N = movers.length;
  const track: Mover[] = [...movers, ...movers.slice(0, VISIBLE)];

  const [index, setIndex] = useState<number>(0);
  const [smooth, setSmooth] = useState<boolean>(true);
  const [service, setService] = useState<string>("truck");
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 2);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

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
    if (!smooth) {
      const raf = requestAnimationFrame(() => setSmooth(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [smooth]);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* ===================== HERO — HALF SCREEN ===================== */}
      <section
        className="relative w-full overflow-hidden text-white select-none antialiased"
        style={{ height: "50vh", minHeight: "420px" }}
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

        {/* NAV */}
        {/* <header
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 md:px-12"
          style={{ zIndex: 30, background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }}
        >
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="text-2xl font-black tracking-tighter text-white">O</span>
            <span className="text-2xl font-black tracking-tighter text-lime-500">S</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 font-semibold text-sm tracking-wide text-white">
            <a href="#process" className="hover:text-lime-400 transition-colors duration-300">Process</a>
            <a href="#locations" className="hover:text-lime-400 transition-colors duration-300">Locations</a>
            <a href="#fleet" className="hover:text-lime-400 transition-colors duration-300">Fleet</a>
            <a href="#contact" className="hover:text-lime-400 transition-colors duration-300">Contact</a>
          </nav>
        </header> */}

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
            className="hero-fade-in hero-delay-1 mt-4 text-sm md:text-base font-medium max-w-md"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Relocate anywhere in the US, stress-free.
          </p>
        </div>
      </section>

      {/* ===================== OVERLAPPING FILTER BAR ===================== */}
    <div className="bg-[#F7F8F5]">
      <div
        className="relative w-full px-4 pb-16"
        style={{ zIndex: 40 }}
      >
        <div
          className="mx-auto max-w-5xl bg-white rounded-2xl shadow-2xl px-5 py-5 md:px-8 md:py-6"
          style={{
            marginTop: "-56px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {/* <div className="mb-5">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 block">
              What do you need?
            </label>
            <div className="flex gap-3">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setService(type.id)}
                  className="flex flex-col items-center gap-1.5 rounded-xl px-3 py-2 transition-all duration-200 cursor-pointer"
                  style={{
                    border: service === type.id ? "2px solid #84cc16" : "2px solid transparent",
                    background: service === type.id ? "rgba(132,204,22,0.08)" : "#F7F8F5",
                  }}
                >
                  <img
                    src={type.image}
                    alt={type.label}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: service === type.id ? "#3f6212" : "#4b5563" }}
                  >
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div> */}

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

          <button className="group  w-full md:w-auto flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-sm px-8 py-3 rounded-full uppercase tracking-wider shadow-lg transition-all duration-300 cursor-pointer">
            Get my free quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
      </div>

      {/* ===================== POPULAR ROUTES LISTING ===================== */}
   <section className="px-6 pb-24" style={{ background: "#F7F8F5" }}>
  <div className="max-w-7xl mx-auto">
    <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-1">
          Trending this month
        </p>
        <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-gray-900">
        Popular relocation<span className="text-blue-800">  routes</span>   
        </h2>
      </div>
      <a
        href="#"
        className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
      >
        View all routes <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {routes.map((route, i) => (
        <div
          key={route.from + route.to}
          className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
        >
          {/* Image at top */}
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={route.image}
              alt={`${route.from} to ${route.to}`}
              fill
              className="object-cover"
            />
            {/* Popular badge */}
            {route.popular && (
              <span className="absolute top-3 left-3 z-10 bg-lime-500 text-black text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Most popular
              </span>
            )}
            {/* Corner ribbon */}
            <div
              className="absolute top-0 right-0 w-20 h-20 z-20"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(135deg, transparent 50%, #005bb5 50%)"
                    : "linear-gradient(135deg, transparent 50%, #84cc16 50%)",
              }}
            />
          </div>

          {/* Details below */}
          <div className="p-5 flex flex-col border-t-2 bg-stone-100  flex-1">
            {/* Route name */}
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg leading-tight">
              <span>{route.from}</span>
              <ArrowRight className="w-4 h-4 text-blue-700 shrink-0" />
              <span>{route.to}</span>
            </div>

            {/* Distance & Duration */}
            <div className="flex items-center gap-4 mt-1 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {route.distance}
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-gray-400" />
                {route.duration}
              </span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between  pt-4 border-t border-gray-100">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold">
                  Starting at
                </p>
                <p className="text-xl font-black text-gray-900">
                  ${route.price}
                </p>
              </div>
              <button className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-extrabold uppercase tracking-wide px-4 py-2.5 rounded-full transition-colors duration-300 cursor-pointer">
                Get quote
              </button>
            </div>
          </div>
        </div>
      ))}
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
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 shrink-0"
                  style={{ width: `${CARD_WIDTH}px` }}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(0,91,181,0.1)" }}
                      >
                        <Package className="w-5 h-5 text-blue-700" />
                      </div>
                      {mover.verified && (
                        <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide text-lime-700 bg-lime-50 px-2 py-1 rounded-full">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-bold text-gray-900 text-base leading-snug">
                      {mover.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      {mover.years} years in business
                    </p>

                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3.5 h-3.5 text-lime-600 fill-lime-500" />
                      <span className="text-xs font-bold text-gray-800">{mover.rating}</span>
                      <span className="text-xs text-gray-400">({mover.reviews})</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {mover.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold">
                          From
                        </p>
                        <p className="text-lg font-black text-gray-900">
                          ${mover.price}<span className="text-xs font-semibold text-gray-400">/hr</span>
                        </p>
                      </div>
                      <button className="bg-lime-500 hover:bg-lime-400 text-black text-xs font-extrabold uppercase tracking-wide px-3.5 py-2 rounded-full transition-colors duration-300 cursor-pointer">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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