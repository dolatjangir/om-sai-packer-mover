"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  MapPin,
  Clock,
  Headphones,
  Star,
  CheckCircle2,
  ArrowRight,
  Home,
  Truck,
  Package,
  Car,
  ShieldCheck,
  ClipboardList,
  FileText,
  Box,
  ShoppingCart,
  Check,
  ChevronRight,
 
  Mail,
  Sofa,
  Monitor,
  Wine,
  FileCheck,
  CarFront,
  Flower2,
  MapPinned,
  Users,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function LongDistanceMoves() {
  const heroRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const indiaRef = useRef<HTMLDivElement>(null);
  const careRef = useRef<HTMLDivElement>(null);
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
          ".hero-cta",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.8,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".hero-image",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-card",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 0.9, ease: "back.out(1.7)" }
        );

        // Trust bar
        gsap.fromTo(
          ".trust-item",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: trustRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );

        // Offer
        gsap.fromTo(
          ".offer-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: offerRef.current,
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
          ".offer-card",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: offerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );

        // Process
        gsap.fromTo(
          ".process-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: processRef.current,
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
          ".process-step",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: processRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );

        // India + Care
        gsap.fromTo(
          ".india-content",
          { opacity: 0, x: -40 },
          {
            scrollTrigger: {
              trigger: indiaRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".care-content",
          { opacity: 0, x: 40 },
          {
            scrollTrigger: {
              trigger: careRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
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

  const heroBadges = [
    { icon: MapPin, text: "Pan India Service", sub: "We move you anywhere in India" },
    { icon: Shield, text: "Safe & Secure", sub: "Your goods are packed and transported safely" },
    { icon: Clock, text: "On-Time Delivery", sub: "Timely delivery, every time" },
    { icon: Headphones, text: "24/7 Support", sub: "We're here to help you, always" },
  ];

  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Fully Insured",
      desc: "For Complete Peace of Mind",
    },
    {
      icon: MapPinned,
      title: "Real-Time Tracking",
      desc: "Track Your Move Every Step",
    },
    {
      icon: Truck,
      title: "Door-to-Door Delivery",
      desc: "From Pickup to Final Destination",
    },
  ];

  const offers = [
    {
      icon: Package,
      title: "Professional Packing",
      desc: "High-quality packing materials and expert packing for maximum safety.",
      imgLabel: "Professional packing",
    },
    {
      icon: Truck,
      title: "Secure Transportation",
      desc: "Well-maintained vehicles designed for long distance and safe transit.",
      imgLabel: "Transportation truck",
    },
    {
      icon: Box,
      title: "Loading & Unloading",
      desc: "Trained professionals handle loading and unloading with care.",
      imgLabel: "Loading unloading",
    },
    {
      icon: Shield,
      title: "Goods Insurance",
      desc: "Comprehensive insurance options to protect your belongings.",
      imgLabel: "Insurance shield",
    },
    {
      icon: MapPinned,
      title: "Real-Time Tracking",
      desc: "Stay updated with real-time tracking of your shipment in transit.",
      imgLabel: "Tracking phone",
    },
    {
      icon: Home,
      title: "Door-to-Door Service",
      desc: "We pick up from your door and deliver to your new address safely.",
      imgLabel: "Door delivery",
    },
  ];

  const processSteps = [
    {
      num: "1",
      icon: ClipboardList,
      title: "Inquiry & Survey",
      desc: "Share your requirements and get a free survey & consultation.",
    },
    {
      num: "2",
      icon: FileText,
      title: "Plan & Quote",
      desc: "We create a customized moving plan and provide a transparent quote.",
    },
    {
      num: "3",
      icon: Box,
      title: "Packing & Preparation",
      desc: "We pack your items securely using premium quality materials.",
    },
    {
      num: "4",
      icon: Truck,
      title: "Transportation",
      desc: "Your goods are transported safely and on time to your new location.",
    },
    {
      num: "5",
      icon: ShoppingCart,
      title: "Unloading & Unpacking",
      desc: "We unload and unpack your items with complete care.",
    },
    {
      num: "6",
      icon: CheckCircle2,
      title: "Final Placement",
      desc: "Everything is placed where you want it – just the way you like.",
    },
  ];

  const indiaFeatures = [
    "All Major Cities & Towns",
    "Inter-State & Inter-City Moves",
    "Household, Office & Vehicle Transport",
    "Safe, Reliable & Affordable",
  ];

  const careItems = [
    { icon: Sofa, label: "Furniture & Fixtures" },
    { icon: Monitor, label: "Electronics & Appliances" },
    { icon: Wine, label: "Fragile & Valuable Items" },
    { icon: FileCheck, label: "Documents & Files" },
    { icon: CarFront, label: "Vehicles Transport" },
    { icon: Flower2, label: "Plants & Decor Items" },
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: MapPin, value: "200+", label: "Cities Covered" },
    { icon: ShieldCheck, value: "99%", label: "On-Time Delivery" },
    { icon: Star, value: "4.8/5", label: "Customer Rating" },
    { icon: Headphones, value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
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
                <span className="text-(--blue-200) hover:text-white cursor-pointer transition-colors">
                  Services
                </span>
                <ChevronRight className="w-3 h-3 text-(--blue-300)" />
                <span className="text-white font-medium">Long Distance Moves</span>
              </nav>

              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                Long Distance Moves
              </h1>
              <h2 className="hero-subtitle text-2xl sm:text-3xl lg:text-4xl font-bold text-(--lime-400) leading-tight mb-6">
                Anywhere. Anytime. Hassle-Free.
              </h2>

              <p className="hero-text text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-8">
                Moving to a new city or state? We make your long distance move
                smooth, safe and stress-free. With expert planning, secure
                transportation and on-time delivery, your belongings are in safe
                hands – no matter the distance.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 lg:gap-4 mb-8">
                {heroBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="hero-badge flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/10"
                  >
                    <div className="w-8 h-8 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                      <badge.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">{badge.text}</p>
                      <p className="text-(--blue-200) text-[10px] leading-tight">{badge.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="hero-cta flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors group"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:18001234567"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-5 py-3 rounded-full text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-(--lime-400)" />
                  Call 1800 123 4567
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="hero-image relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <div className="absolute inset-0 bg-(--blue-800)/20" />
                <div className="w-full h-full bg-(--gray-200) flex items-center justify-center">
                  <div className="text-center p-8">
                    <Truck className="w-20 h-20 text-(--gray-400) mx-auto mb-3" />
                    <p className="text-(--gray-500) text-sm">
                      Long distance truck on highway
                    </p>
                    <p className="text-(--gray-400) text-xs mt-1">
                      Replace with actual image
                    </p>
                  </div>
                </div>
              </div>

              {/* We Move You Across India Card */}
              <div className="hero-card absolute bottom-8 left-8 bg-(--blue-900) rounded-xl p-4 shadow-xl border border-(--blue-700) max-w-[160px]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-(--lime-500) rounded-full flex items-center justify-center mb-2">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white font-bold text-sm leading-tight">
                    We Move
                  </p>
                  <p className="text-white font-bold text-sm leading-tight">
                    You Across
                  </p>
                  <p className="text-(--lime-400) font-bold text-sm leading-tight">
                    India
                  </p>
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

      {/* ===== TRUST BAR ===== */}
      <section ref={trustRef} className="relative z-10 -mt-8 lg:-mt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-(--blue-900) rounded-2xl p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {trustItems.map((item, idx) => (
                <div
                  key={idx}
                  className="trust-item flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{item.title}</h3>
                    <p className="text-(--blue-200) text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE OFFER ===== */}
      <section ref={offerRef} className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="offer-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            What We Offer in <span className="text-(--lime-500)">Long Distance Moves</span>
          </h2>
          <div className="w-12 h-1 bg-(--lime-500) mx-auto mb-4" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
            {offers.map((offer, idx) => (
              <div
                key={idx}
                className="offer-card bg-(--gray-50) rounded-2xl p-4 border border-(--gray-100) hover:shadow-xl hover:border-(--blue-200) transition-all group"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-(--blue-50) rounded-lg flex items-center justify-center">
                    <offer.icon className="w-5 h-5 text-(--blue-900)" />
                  </div>
                  <h3 className="text-(--blue-900) font-bold text-sm leading-tight">
                    {offer.title}
                  </h3>
                </div>

                <div className="rounded-xl bg-(--gray-100) aspect-[4/3] flex items-center justify-center mb-4 overflow-hidden">
                  <div className="text-center p-4">
                    <Package className="w-8 h-8 text-(--gray-400) mx-auto mb-1" />
                    <p className="text-(--gray-400) text-[10px]">{offer.imgLabel}</p>
                  </div>
                </div>

                <p className="text-(--blue-900) text-sm leading-tight">
                  {offer.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR LONG DISTANCE MOVING PROCESS ===== */}
      <section ref={processRef} className="py-4 bg-(--gray-50)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="process-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            Our Long Distance <span className="text-(--lime-500)">Moving Process</span>
          </h2>
          <div className="w-12 h-1 bg-(--lime-500) mx-auto mb-4" />

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] border-t-2 border-dashed border-(--gray-300)" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-4">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="process-step relative flex flex-col items-center text-center"
                >
                  {/* Icon Circle */}
                  <div className="relative z-10 w-20 h-20 bg-white rounded-full border-2 border-(--gray-200) flex items-center justify-center mb-4 shadow-sm">
                    <step.icon className="w-8 h-8 text-(--blue-900)" />
                  </div>

                  {/* Number Badge */}
                  <div className="mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-(--lime-500) text-white text-xs font-bold rounded-full">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-(--blue-900) font-bold text-sm mb-2">
                    {step.title}
                  </h3>
                  <p className="text-(--gray-500) text-xs leading-relaxed max-w-[180px]">
                    {step.desc}
                  </p>

                  {/* Arrow for mobile */}
                  {idx < processSteps.length - 1 && (
                    <div className="lg:hidden mt-4">
                      <ArrowRight className="w-5 h-5 text-(--gray-300) rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WE MOVE YOU ACROSS INDIA + WE HANDLE WITH CARE ===== */}
      <section className="py-4 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left - India Map */}
            <div
              ref={indiaRef}
              className="india-content bg-(--blue-900) rounded-2xl p-6 lg:p-8 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-1">
                  We Move You
                </h3>
                <h3 className="text-(--lime-400) font-bold text-xl lg:text-2xl mb-6">
                  Across India
                </h3>

                <ul className="space-y-3 mb-6">
                  {indiaFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-(--lime-400) flex-shrink-0" />
                      <span className="text-(--blue-200) text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="absolute bottom-4 right-4 w-40 h-40 bg-(--blue-800)/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-(--blue-300) mx-auto mb-1" />
                  <p className="text-(--blue-300) text-[10px]">India map with pins</p>
                </div>
              </div>
            </div>

            {/* Right - We Handle With Care */}
            <div
              ref={careRef}
              className="care-content bg-white rounded-2xl p-6 lg:p-8 border border-(--gray-100)"
            >
              <h3 className="text-(--blue-900) font-bold text-xl lg:text-2xl mb-6">
                We Handle With <span className="text-(--lime-500)">Care</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {careItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center p-4 rounded-xl bg-(--gray-50) hover:bg-(--blue-50) transition-colors group"
                  >
                    <item.icon className="w-8 h-8 text-(--blue-900) mb-2 group-hover:text-(--lime-600) transition-colors" />
                    <span className="text-(--blue-900) text-xs font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section ref={statsRef} className="py-4 bg-white border-t border-(--gray-100)">
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
      <section ref={ctaRef} className="py-4 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="cta-content bg-(--blue-900) rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left Image */}
              <div className="hidden lg:block w-40 h-32 bg-(--blue-800)/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <Package className="w-10 h-10 text-(--blue-300) mx-auto mb-1" />
                  <p className="text-(--blue-300) text-[10px]">Stacked boxes</p>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">
                  Planning a <span className="text-(--lime-400)">Long Distance Move?</span>
                </h3>
                <p className="text-(--blue-200) text-sm">
                  Get a free quote today and move with confidence!
                </p>
              </div>

              {/* Right CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
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
                  Call 1800 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}