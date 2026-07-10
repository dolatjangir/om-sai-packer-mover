"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  Truck,
  Users,
  Star,
  Headphones,
  MapPin,
  Clock,
  ArrowRight,
  Home,
  CheckCircle2,
  ChevronRight,
  
  Building,
  Package,
  Car,
  Warehouse,
  Image,
  Grid3X3,
  RefreshCw,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");

  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hero
        gsap.fromTo(
          ".hero-breadcrumb",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-text",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-badge",
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.6,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".hero-image",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
        );

        // Gallery
        gsap.fromTo(
          ".gallery-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".filter-btn",
          { opacity: 0, y: 15 },
          {
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".gallery-item",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          }
        );

        // Stats
        gsap.fromTo(
          ".stat-item",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          }
        );

        // CTA
        gsap.fromTo(
          ".cta-content",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );

        // Footer
        gsap.fromTo(
          ".footer-col",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );

        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const filters = [
    { name: "All", icon: Grid3X3 },
    { name: "Residential Moving", icon: Home },
    { name: "Office Relocation", icon: Building },
    { name: "Packing Services", icon: Package },
    { name: "Vehicle Shipping", icon: Car },
    { name: "Storage Solutions", icon: Warehouse },
    { name: "Our Team", icon: Users },
  ];

  const galleryItems = [
    { label: "Residential packing", span: "col-span-1 row-span-1" },
    { label: "Office relocation", span: "col-span-1 row-span-1" },
    { label: "Team packing boxes", span: "col-span-1 row-span-1" },
    { label: "Mover with chair", span: "col-span-1 row-span-1" },
    { label: "MoveEasy truck", span: "col-span-1 row-span-1" },
    { label: "Loading truck", span: "col-span-1 row-span-1" },
    { label: "Vehicle shipping", span: "col-span-1 row-span-1" },
    { label: "Storage warehouse", span: "col-span-1 row-span-1" },
    { label: "Stairs moving", span: "col-span-1 row-span-1" },
    { label: "Wrapping furniture", span: "col-span-1 row-span-1" },
    { label: "Stairs carrying", span: "col-span-1 row-span-1" },
    { label: "Team packing", span: "col-span-1 row-span-1" },
    { label: "Packed boxes room", span: "col-span-1 row-span-1" },
    { label: "Unloading truck", span: "col-span-1 row-span-1" },
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: MapPin, value: "200+", label: "Cities Covered" },
    { icon: Shield, value: "99%", label: "On-Time Delivery" },
    { icon: Star, value: "4.8/5", label: "Customer Rating" },
    { icon: Headphones, value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-(--background) font-sans overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-(--blue-900) to-(--blue-800) overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              {/* Breadcrumb */}
              <nav className="hero-breadcrumb flex items-center gap-2 text-xs mb-6 lg:mb-8">
                <span className="text-(--blue-200) hover:text-white cursor-pointer transition-colors">
                  Home
                </span>
                <ChevronRight className="w-3 h-3 text-(--blue-300)" />
                <span className="text-white font-medium">Gallery</span>
              </nav>

              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                Our Gallery
              </h1>
              <h2 className="hero-subtitle text-2xl sm:text-3xl lg:text-4xl font-bold text-(--lime-400) leading-tight mb-6">
                Real Moves. Real People. Real Smiles.
              </h2>

              <p className="hero-text text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-8">
                Take a look at some of our recent moves and happy customers. We
                take pride in every move we make.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                {[
                  { icon: Users, text: "Professional Team", sub: "Trained & experienced moving experts" },
                  { icon: Shield, text: "Safe Handling", sub: "Careful packing & secure transport" },
                  { icon: Truck, text: "Modern Fleet", sub: "Well-maintained vehicles" },
                  { icon: CheckCircle2, text: "Happy Customers", sub: "Thousands of satisfied customers" },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="hero-badge flex items-start gap-2.5"
                  >
                    <div className="w-8 h-8 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                      <badge.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        {badge.text}
                      </p>
                      <p className="text-(--blue-200) text-[10px] leading-tight">
                        {badge.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="hero-image relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <div className="absolute inset-0 bg-(--blue-800)/20" />
                <div className="w-full h-full bg-(--gray-200) flex items-center justify-center">
                  <div className="text-center p-8">
                    <Users className="w-20 h-20 text-(--gray-400) mx-auto mb-3" />
                    <p className="text-(--gray-500) text-sm">
                      Movers wrapping furniture
                    </p>
                    <p className="text-(--gray-400) text-xs mt-1">
                      Replace with actual image
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80V40C240 80 480 0 720 0C960 0 1200 80 1440 40V80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ===== EXPLORE OUR MOVING GALLERY ===== */}
      <section ref={galleryRef} className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="gallery-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            Explore Our <span className="text-(--lime-500)">Moving Gallery</span>
          </h2>
          <div className="w-12 h-1 bg-(--lime-500) mx-auto mb-8" />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-8 lg:mb-10">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                className={`filter-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeFilter === filter.name
                    ? "bg-(--lime-500) text-white"
                    : "bg-(--gray-100) text-(--gray-600) hover:bg-(--gray-200) hover:text-(--blue-900)"
                }`}
              >
                <filter.icon className="w-3.5 h-3.5" />
                {filter.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {/* Row 1 - 3 items */}
            {galleryItems.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="gallery-item rounded-xl lg:rounded-2xl overflow-hidden bg-(--gray-100) aspect-[4/3] flex items-center justify-center group cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="text-center p-4">
                  <Image className="w-8 h-8 text-(--gray-400) mx-auto mb-1 group-hover:text-(--blue-900) transition-colors" />
                  <p className="text-(--gray-400) text-[10px] group-hover:text-(--gray-600)">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}

            {/* Row 2 - 3 items */}
            {galleryItems.slice(3, 6).map((item, idx) => (
              <div
                key={idx + 3}
                className="gallery-item rounded-xl lg:rounded-2xl overflow-hidden bg-(--gray-100) aspect-[4/3] flex items-center justify-center group cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="text-center p-4">
                  <Image className="w-8 h-8 text-(--gray-400) mx-auto mb-1 group-hover:text-(--blue-900) transition-colors" />
                  <p className="text-(--gray-400) text-[10px] group-hover:text-(--gray-600)">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}

            {/* Row 3 - 3 items */}
            {galleryItems.slice(6, 9).map((item, idx) => (
              <div
                key={idx + 6}
                className="gallery-item rounded-xl lg:rounded-2xl overflow-hidden bg-(--gray-100) aspect-[4/3] flex items-center justify-center group cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="text-center p-4">
                  <Image className="w-8 h-8 text-(--gray-400) mx-auto mb-1 group-hover:text-(--blue-900) transition-colors" />
                  <p className="text-(--gray-400) text-[10px] group-hover:text-(--gray-600)">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}

            {/* Row 4 - 5 items (smaller) */}
            {galleryItems.slice(9, 14).map((item, idx) => (
              <div
                key={idx + 9}
                className="gallery-item rounded-xl lg:rounded-2xl overflow-hidden bg-(--gray-100) aspect-[4/3] flex items-center justify-center group cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="text-center p-4">
                  <Image className="w-8 h-8 text-(--gray-400) mx-auto mb-1 group-hover:text-(--blue-900) transition-colors" />
                  <p className="text-(--gray-400) text-[10px] group-hover:text-(--gray-600)">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8 lg:mt-10">
            <button className="inline-flex items-center gap-2 bg-white border-2 border-(--blue-900) text-(--blue-900) hover:bg-(--blue-900) hover:text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors group">
              Load More Photos
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section ref={statsRef} className="py-10 lg:py-14 bg-white border-t border-(--gray-100)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="stat-item flex items-center gap-3 justify-center lg:justify-start"
              >
                <div className="w-10 h-10 bg-(--blue-50) rounded-lg flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5 text-(--blue-900)" />
                </div>
                <div>
                  <p className="text-(--blue-900) font-bold text-lg lg:text-xl">
                    {stat.value}
                  </p>
                  <p className="text-(--gray-500) text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section ref={ctaRef} className="py-8 lg:py-12 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="cta-content bg-(--blue-900) rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-(--lime-500)/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              {/* Left Image */}
              <div className="hidden lg:block w-40 h-32 bg-(--blue-800)/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <Users className="w-10 h-10 text-(--blue-300) mx-auto mb-1" />
                  <p className="text-(--blue-300) text-[10px]">Mover with box</p>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">
                  We Don&apos;t Just Move Things, <br />
                  We Move Lives with{" "}
                  <span className="text-(--lime-400)">Care.</span>
                </h3>
                <p className="text-(--blue-200) text-sm">
                  Experience the MoveEasy difference today!
                </p>
              </div>

              {/* Right CTAs */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-5 py-3 rounded-full text-sm transition-colors group"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:18001234567"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-5 py-3 rounded-full text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  1800 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
}