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
  Banknote,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import HeroSection from "@/components/services-hero-reusable/heroSection";
import CTASection from "@/components/ctaBanner";
import StatsBar from "@/components/statsBar";
import ServicesSection from "@/components/cardSection";

gsap.registerPlugin(ScrollTrigger);
const ctaSections = [
  {
    title: "Planning a",
    highlight: "Long Distance Move?",
    description:
      "Get a free quote today and move with confidence!",
    image: "/residential-service-bottom-left.png",

    features: [
      {
        icon: CheckCircle2,
        text: "Free Survey Available",
      },
      {
        icon: CheckCircle2,
        text: "No Hidden Charges",
      },
      {
        icon: CheckCircle2,
        text: "100% Customer Satisfaction",
      },
    ],

    primaryButton: {
      text: "Get a Free Quote",
      href: "/get-a-quote",
    },

    secondaryButton: {
      text: "Call 1800 123 4567",
      href: "tel:18001234567",
    },
  },

  {
    title: "Planning an",
    highlight: "Office Relocation?",
    description:
      "Fast, secure, and hassle-free office shifting services.",

    image: "/office-service-bottom-left.png",

    features: [
      {
        icon: CheckCircle2,
        text: "Professional Team",
      },
      {
        icon: CheckCircle2,
        text: "Safe Transportation",
      },
      {
        icon: CheckCircle2,
        text: "On-Time Delivery",
      },
    ],

    primaryButton: {
      text: "Book Now",
      href: "#",
    },

    secondaryButton: {
      text: "Call 1800 123 4567",
      href: "tel:18001234567",
    },
  },
];
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
      image: "/packing&unpacking.png",
    },
    {
      icon: Truck,
      title: "Secure Transportation",
      desc: "Well-maintained vehicles designed for long distance and safe transit.",
    image: "/packing&unpacking.png",
    },
    {
      icon: Box,
      title: "Loading & Unloading",
      desc: "Trained professionals handle loading and unloading with care.",
      image: "/packing&unpacking.png",
    },
   
    {
      icon: MapPinned,
      title: "Real-Time Tracking",
      desc: "Stay updated with real-time tracking of your shipment in transit.",
       image: "/packing&unpacking.png",
    },
    {
      icon: Home,
      title: "Door-to-Door Service",
      desc: "We pick up from your door and deliver to your new address safely.",
      image: "/packing&unpacking.png",
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
      {/* ===== HERO SECTION =====  */}
     <HeroSection
       title="Long Distance Moves"
       highlightedTitle="Anywhere. Anytime. Hassle-Free."
       description="Moving to a new city or state? We make your long distance move smooth, safe and stress-free. With expert planning, secure transportation and on-time delivery, your belongings are in safe hands – no matter the distance."

       features={[
         { icon: Shield, text: "Pan India Service", sub: "We move you anywhere in India" },
         { icon: Clock, text: "Safe & Secure", sub: "Your goods are packed and transported safely" },
         { icon: Package, text: "On-Time Delivery", sub: "Timely delivery, every time" },
         { icon: Banknote, text: "24/7 Support", sub: "We're here to help you, always" },
       ]}
       image={{ src: "/long-distans-move-hero-img.png", alt: "long-distance-move-image" }}
     />

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
       <ServicesSection services={offers} title="What We Offer in" highlightTitle="Long Distance Moves" />

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
              className="india-content bg-(--blue-900) flex flex-row items-center justify-around rounded-2xl p-6 lg:p-8 relative overflow-hidden"
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
              <div className=" w-[60%] h-full ">
                <img src="/map-img.png" alt="India Map" className="w-full h-full object-cover" />
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
       <StatsBar/>

      {/* ===== CTA BANNER ===== */}
      <CTASection {...ctaSections[0]} />

     
    </div>
  );
}