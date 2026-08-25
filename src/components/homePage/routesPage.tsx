"use client"

import { ArrowRight, MapPin, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link";

interface Route {
  from: string;
  to: string;
  distance: string;
  duration: string;
  price: number;
  popular: boolean;
  image:string
}

const routes: Route[] = [
  { from: "Vaishali Nagar", to: "Sodala", distance: "5 km", duration: "15 mins", price: 150, popular: true, image: "/img1.avif" },
  { from: "Malviya Nagar", to: "C-Scheme", distance: "8 km", duration: "25 mins", price: 200, popular: false, image: "/img2.avif" },
  { from: "Mansarovar", to: "Raja Park", distance: "12 km", duration: "35 mins", price: 280, popular: true, image: "/img3.webp" },
  { from: "Jagatpura", to: "Sindhi Camp", distance: "14 km", duration: "40 mins", price: 320, popular: false, image: "/img4.webp" },
  { from: "Bapu Nagar", to: "Vidyadhar Nagar", distance: "9 km", duration: "30 mins", price: 220, popular: false, image: "/parcels.png" },
  { from: "Sitapura", to: "Vaishali Nagar", distance: "22 km", duration: "55 mins", price: 450, popular: false, image: "/img6.webp" },
];


export default function RoutesPage() {
  return (
 <section className="px-6 pb-4" style={{ background: "#F7F8F5" }}>
  <div className="max-w-6xl mx-auto">
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
                  ₹{route.price}
                </p>
              </div>
              <Link href="/get-a-quote"><button className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-extrabold uppercase tracking-wide px-4 py-2.5 rounded-full transition-colors duration-300 cursor-pointer">
                Get quote
              </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  )
}
