"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Home,
  Truck,
  Car,
  Bike,
  Ship,
  Tractor,
  Construction,
  ClipboardList,
  Calendar,
  Package,
  MapPinned,
  FileCheck,
  Users,
  Star,
  Headphones,
  ChevronRight,

  Mail,
  Check,
  Monitor,
  Warehouse,
  ShieldCheck,
  Banknote,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import HeroSection from "@/components/services-hero-reusable/heroSection";
import ServicesSection from "@/components/cardSection";

gsap.registerPlugin(ScrollTrigger);

export default function VehicleShipping() {
  const heroRef = useRef<HTMLDivElement>(null);
  const vehiclesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const safetyRef = useRef<HTMLDivElement>(null);
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

        // Vehicles
        gsap.fromTo(
          ".vehicles-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: vehiclesRef.current,
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
          ".vehicle-card",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: vehiclesRef.current,
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

        // Why
        gsap.fromTo(
          ".why-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: whyRef.current,
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
          ".why-card",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: whyRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          }
        );

        // Safety + Ship Across
        gsap.fromTo(
          ".safety-content",
          { opacity: 0, x: -40 },
          {
            scrollTrigger: {
              trigger: safetyRef.current,
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
          ".ship-content",
          { opacity: 0, x: 40 },
          {
            scrollTrigger: {
              trigger: safetyRef.current,
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
    { icon: MapPin, text: "Pan India Service", sub: "Delivering vehicles to every corner" },
    { icon: Shield, text: "Safe & Secure", sub: "Advanced equipment & handling" },
    { icon: Clock, text: "On-Time Delivery", sub: "Timely and reliable transport" },
    { icon: CheckCircle2, text: "Fully Insured", sub: "Complete insurance for your peace of mind" },
  ];

  const vehicles = [
    {
      icon: Car,
      title: "Cars",
      desc: "Hatchback, Sedan, SUV, Luxury & Premium Cars",
      image: "/packing&unpacking.png",
    },
    {
      icon: Bike,
      title: "Bikes",
      desc: "All types of motorcycles and scooters",
      image: "/packing&unpacking.png",
    },
    {
      icon: Truck,
      title: "Commercial Vehicles",
      desc: "Trucks, Tempo, Pickup, LCV & HCV",
      image: "/packing&unpacking.png",
    },
    {
      icon: Construction,
      title: "Heavy Machinery",
      desc: "Construction equipment and industrial vehicles",
      image: "/packing&unpacking.png",
    },
    {
      icon: Tractor,
      title: "Tractors",
      desc: "Agricultural tractors and farm equipment",
      image: "/packing&unpacking.png",
    },
   
  ];

  const processSteps = [
    {
      num: "1",
      icon: ClipboardList,
       
      title: "Request a Quote",
      desc: "Share details about your vehicle and route.",
    },
    {
      num: "2",
      icon: Calendar,
      title: "Booking Confirmation",
      desc: "We confirm your booking and schedule pickup.",
    },
    {
      num: "3",
      icon: Package,
      title: "Vehicle Pickup",
      desc: "Our team picks up your vehicle safely.",
    },
    {
      num: "4",
      icon: Truck,
      title: "Safe Transportation",
      desc: "Your vehicle is transported with utmost care.",
    },
    {
      num: "5",
      icon: MapPinned,
      title: "Delivery",
      desc: "On-time delivery at your doorstep.",
    },
    {
      num: "6",
      icon: FileCheck,
      title: "Inspection & Handover",
      desc: "Vehicle inspection and safe handover.",
    },
  ];

  const whyChoose = [
    {
      icon: Users,
      title: "Experienced Team",
      desc: "Skilled professionals with proven expertise",
    },
    {
      icon: Truck,
      title: "Specialized Car Carriers",
      desc: "Modern carriers for safe and damage-free transport",
    },
    {
      icon: Monitor,
      title: "Real-Time Tracking",
      desc: "Track your vehicle anytime during transit",
    },
    {
      icon: Home,
      title: "Door-to-Door Delivery",
      desc: "Convenient pickup and delivery at your location",
    },
    {
      icon: Shield,
      title: "Comprehensive Insurance",
      desc: "Full insurance coverage for total peace of mind",
    },
    {
      icon: CheckCircle2,
      title: "Affordable Pricing",
      desc: "Best prices with no hidden charges",
    },
  ];

  const safetyFeatures = [
    "Enclosed & open car carriers",
    "Secure tie-downs & fasteners",
    "Trained drivers & handlers",
    "Damage-free loading & unloading",
  ];

  const shipFeatures = [
    "All Major Cities",
    "Inter-State & Inter-City",
    "Fast & Reliable Service",
    "On-Time Delivery",
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: MapPin, value: "200+", label: "Cities Covered" },
    { icon: ShieldCheck, value: "99%", label: "Damage-Free Delivery" },
    { icon: Star, value: "4.8/5", label: "Customer Rating" },
    { icon: Headphones, value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
    <HeroSection
      title="Vehicle Shipping"
      highlightedTitle="Safe Transport. Zero Worries."
      description="We provide safe, secure and reliable vehicle shipping services across India. Whether it's your car, bike or any other vehicle, we ensure it reaches your destination in perfect condition."
      features={[
        { icon: Shield, text: "Pan India Service", sub: "Delivering vehicles to every corner" },
        { icon: Clock, text: "Safe & Secure", sub: "Advanced equipment & handling" },
        { icon: Package, text: "On-Time Delivery", sub: "Timely and reliable transport" },
        { icon: Banknote, text: "Fully Insured", sub: "Complete insurance for your peace of mind" },
      ]}
      image={{ src: "/residential-moving-hero-img.png", alt: "hero-family-moving-image" }}
    />

      {/* ===== VEHICLES WE SHIP ===== */}
      <ServicesSection services={vehicles} title="Our Residential" highlightTitle="Moving Services" />

      {/* ===== OUR VEHICLE SHIPPING PROCESS ===== */}
      <section ref={processRef} className="py-4 bg-(--gray-50)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="process-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            Our Vehicle <span className="text-(--lime-500)">Shipping Process</span>
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

      {/* ===== WHY CHOOSE MOVEEASY FOR VEHICLE SHIPPING? ===== */}
      <section ref={whyRef} className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="why-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-10 lg:mb-14">
            Why Choose <span className="text-(--lime-500)">Om Sai</span> for Vehicle Shipping?
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-6">
            {whyChoose.map((item, idx) => (
              <div
                key={idx}
                className="why-card bg-white rounded-xl p-5 lg:p-6 border border-(--gray-100) hover:shadow-lg hover:border-(--blue-200) transition-all text-center group"
              >
                <div className="w-12 h-12 bg-(--blue-50) rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-(--blue-100) transition-colors">
                  <item.icon className="w-6 h-6 text-(--blue-900)" />
                </div>
                <h3 className="text-(--blue-900) font-bold text-sm mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-(--gray-500) text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SAFETY + SHIP ACROSS INDIA ===== */}
      <section ref={safetyRef} className="py-4 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left - Safety */}
            <div className="safety-content bg-(--blue-900) rounded-2xl p-6 lg:p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-1">
                  We Ensure <span className="text-(--lime-400)">Complete Safety</span>
                </h3>

                <ul className="space-y-3 mt-6">
                  {safetyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-(--lime-400) flex-shrink-0" />
                      <span className="text-(--blue-200) text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image placeholder */}
              <div className="absolute bottom-4 right-4 w-48 h-32 bg-(--blue-800)/50 rounded-xl hidden lg:flex items-center justify-center">
                <div className="text-center">
                  <Car className="w-10 h-10 text-(--blue-300) mx-auto mb-1" />
                  <p className="text-(--blue-300) text-[10px]">Car on carrier</p>
                </div>
              </div>
            </div>

            {/* Right - Ship Across India */}
            <div className="ship-content bg-white rounded-2xl p-6 lg:p-8 border border-(--gray-100)">
              <h3 className="text-(--blue-900) font-bold text-xl lg:text-2xl mb-6">
                We Ship <span className="text-(--lime-500)">Across India</span>
              </h3>

              <div className="flex flex-col sm:flex-row gap-6">
                <ul className="space-y-3 flex-1">
                  {shipFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-(--lime-500) flex-shrink-0" />
                      <span className="text-(--gray-600) text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Map placeholder */}
                <div className="w-32 h-32 bg-(--gray-100) rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-(--gray-400) mx-auto mb-1" />
                    <p className="text-(--gray-400) text-[10px]">India map</p>
                  </div>
                </div>
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
                  <Car className="w-10 h-10 text-(--blue-300) mx-auto mb-1" />
                  <p className="text-(--blue-300) text-[10px]">Car and bike</p>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">
                  Need to Ship <span className="text-(--lime-400)">Your Vehicle?</span>
                </h3>
                <p className="text-(--blue-200) text-sm">
                  Get a free quote today and experience hassle-free vehicle shipping.
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