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
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

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
      imgLabel: "Car",
    },
    {
      icon: Bike,
      title: "Bikes",
      desc: "All types of motorcycles and scooters",
      imgLabel: "Bike",
    },
    {
      icon: Truck,
      title: "Commercial Vehicles",
      desc: "Trucks, Tempo, Pickup, LCV & HCV",
      imgLabel: "Commercial vehicle",
    },
    {
      icon: Construction,
      title: "Heavy Machinery",
      desc: "Construction equipment and industrial vehicles",
      imgLabel: "Heavy machinery",
    },
    {
      icon: Tractor,
      title: "Tractors",
      desc: "Agricultural tractors and farm equipment",
      imgLabel: "Tractor",
    },
    {
      icon: Ship,
      title: "Boats",
      desc: "Boats, Yachts and water vehicles",
      imgLabel: "Boat",
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
                <span className="text-(--blue-200) hover:text-white cursor-pointer transition-colors">
                  Services
                </span>
                <ChevronRight className="w-3 h-3 text-(--blue-300)" />
                <span className="text-white font-medium">Vehicle Shipping</span>
              </nav>

              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                Vehicle Shipping
              </h1>
              <h2 className="hero-subtitle text-2xl sm:text-3xl lg:text-4xl font-bold text-(--lime-400) leading-tight mb-6">
                Safe Transport. Zero Worries.
              </h2>

              <p className="hero-text text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-8">
                We provide safe, secure and reliable vehicle shipping services
                across India. Whether it's your car, bike or any other vehicle,
                we ensure it reaches your destination in perfect condition.
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
                      Car carrier truck
                    </p>
                    <p className="text-(--gray-400) text-xs mt-1">
                      Replace with actual image
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Vehicle Card */}
              <div className="hero-card absolute -bottom-4 right-4 lg:bottom-4 lg:right-4 bg-(--blue-900) rounded-xl p-4 shadow-xl border border-(--blue-700) max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-(--lime-500) rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-white font-bold text-xs leading-tight">
                  Your Vehicle,
                </p>
                <p className="text-(--lime-400) font-bold text-xs leading-tight">
                  Our Responsibility
                </p>
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

      {/* ===== VEHICLES WE SHIP ===== */}
      <section ref={vehiclesRef} className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="vehicles-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            Vehicles We <span className="text-(--lime-500)">Ship</span>
          </h2>
          <div className="w-12 h-1 bg-(--lime-500) mx-auto mb-4" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
            {vehicles.map((vehicle, idx) => (
              <div
                key={idx}
                className="vehicle-card bg-(--gray-50) rounded-2xl p-3 border border-(--gray-100) hover:shadow-xl hover:border-(--blue-200) transition-all group"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-(--blue-50) rounded-lg flex items-center justify-center">
                    <vehicle.icon className="w-5 h-5 text-(--blue-900)" />
                  </div>
                  <h3 className="text-(--blue-900) font-bold text-sm leading-tight">
                    {vehicle.title}
                  </h3>
                </div>

                <div className="rounded-xl bg-(--gray-100) aspect-[4/3] flex items-center justify-center mb-4 overflow-hidden">
                  <div className="text-center p-4">
                    <Car className="w-8 h-8 text-(--gray-400) mx-auto mb-1" />
                    <p className="text-(--gray-400) text-[10px]">{vehicle.imgLabel}</p>
                  </div>
                </div>

                <p className="text-(--blue-900) text-sm leading-tight">
                  {vehicle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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