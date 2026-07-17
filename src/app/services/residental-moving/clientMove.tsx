"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  Clock,
  Banknote,
  ChevronRight,
  Home,
  Building2,
  Building,
  Fence,
  MapPin,
  Package,
  Truck,
  Car,
  ClipboardList,
  Calendar,
  Box,
  Warehouse,
  Star,
  Headphones,
  Users,
  ShieldCheck,
  MapPinned,
  FileCheck,
 
  Mail,
  CheckCircle2,
  ArrowRight,
  LucideIcon,
  CheckCircle,
  Award,
 
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import StatsBar from "@/components/statsBar";
import CTASection from "@/components/ctaBanner";
import ServicesSection from "@/components/cardSection";
import HeroSection from "@/components/HeroSection";
type HomeType = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};
gsap.registerPlugin(ScrollTrigger);
export const ctaSections = [
  {
    title: "Ready for a",
    highlight: "Smooth Home Move?",
    description:
      "Let our experts handle your move with care and professionalism.",
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
      href: "#",
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

export default function ResidentialMoving() {
  const heroRef = useRef<HTMLDivElement>(null);
  const perfectRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

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
          ".hero-feature-pill",
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.5,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-image",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
        );

        // Perfect For
        gsap.fromTo(
          ".perfect-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: perfectRef.current,
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
          ".perfect-card",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: perfectRef.current,
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

        // Services
        gsap.fromTo(
          ".services-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: servicesRef.current,
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
          ".service-card",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: servicesRef.current,
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
            stagger: 0.12,
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
              start: "top 85%",
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

  const homeTypes: HomeType[] = [
    { icon: Building2, title: "1 BHK / 2 BHK", subtitle: "Apartments" },
    { icon: Home, title: "Villas &", subtitle: "Independent Homes" },
    { icon: Building, title: "High-Rise", subtitle: "Apartments" },
    { icon: Fence, title: "Gated Communities", subtitle: "& Townships" },
    { icon: MapPin, title: "Local &", subtitle: "Inter-City Moves" },
  ];

  const services = [
    {
      icon: Package,
      title: "Packing & Unpacking",
      desc: "High-quality packing materials and expert packing to keep your items safe.",
      image: "/packing&unpacking.png",
    },
    {
      icon: Truck,
      title: "Loading & Unloading",
      desc: "Trained professionals for careful loading and unloading.",
       image: "/Loading&Unloading.png",
    },
    {
      icon: Car,
      title: "Safe Transportation",
      desc: "Well-maintained vehicles ensure your belongings reach safely.",
       image: "/truck-transport.png",
    },
    {
      icon: Warehouse,
      title: "Unpacking & Setup",
      desc: "We unpack and help set up your home as per your convenience.",
       image: "/Unpacking&Setup.png",
    },
    {
      icon: Shield,
      title: "Care for Special Items",
      desc: "Special care for fragile, valuable and bulky items like TVs, mirrors, antiques, etc.",
       image: "/Care-for-Special-Items.png",
    },
  ];

  const processSteps = [
    {
      num: "1",
      icon: ClipboardList,
      title: "Request a Quote",
      desc: "Share your move details you get a free estimate.",
    },
    {
      num: "2",
      icon: Calendar,
      title: "Plan Your Move",
      desc: "We plan, schedule and assign the right team.",
    },
    {
      num: "3",
      icon: Box,
      title: "Pack & Load",
      desc: "We pack your items and load them safely.",
    },
    {
      num: "4",
      icon: Truck,
      title: "Transport",
      desc: "Your belongings are transported securely.",
    },
    {
      num: "5",
      icon: Home,
      title: "Unload & Settle",
      desc: "We unload, unpack and help you settle in.",
    },
  ];

  const whyChoose = [
    {
      icon: Users,
      title: "Experienced & Verified Staff",
      desc: "Trained professionals you can trust.",
    },
    {
      icon: Package,
      title: "Premium Packing Materials",
      desc: "Strong boxes, bubble wrap, and more.",
    },
    {
      icon: Clock,
      title: "Timely & Reliable Service",
      desc: "We value your time and commitments.",
    },
    {
      icon: FileCheck,
      title: "Transparent Pricing",
      desc: "No hidden charges, no last-minute surprises.",
    },
    {
      icon: MapPinned,
      title: "Pan India Presence",
      desc: "Service available in 200+ cities.",
    },
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
                <span className="text-white font-medium">Residential Moving</span>
              </nav>

              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Residential Moving
              </h1>
              <h2 className="hero-title text-2xl sm:text-3xl lg:text-4xl font-bold text-(--lime-400) leading-tight mb-6">
                Made Easy, Stress-Free
              </h2>

              <p className="hero-subtitle text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-8">
                Moving to a new home? We make your residential move safe, smooth
                and hassle-free. From careful packing to on-time delivery, we
                handle everything with care.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 lg:gap-4 mb-8">
                {[
                  { icon: Shield, text: "100% Safe", sub: "Your belongings are in safe hands" },
                  { icon: Clock, text: "On-Time Delivery", sub: "Punctual & reliable moving service" },
                  { icon: Package, text: "Careful Handling", sub: "We treat your items like our own" },
                  { icon: Banknote, text: "Affordable Pricing", sub: "Best quality service at fair prices" },
                ].map((pill, idx) => (
                  <div
                    key={idx}
                    className="hero-feature-pill flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/10"
                  >
                    <div className="w-8 h-8 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                      <pill.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">{pill.text}</p>
                      <p className="text-(--blue-200) text-[10px] leading-tight">{pill.sub}</p>
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
                <div className="absolute inset-0 bg-(--blue-800)/30" />
                <div className="w-full h-full bg-(--gray-200) flex items-center justify-center">
                  <div className="text-center p-8">
                    <Home className="w-20 h-20 text-(--gray-400) mx-auto mb-3" />
                    <p className="text-(--gray-500) text-sm">Happy family with boxes</p>
                    <p className="text-(--gray-400) text-xs mt-1">Replace with actual image</p>
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
<HeroSection
        imageUrl="/healthcareimg.png"
        leftContent={
          <>
            <h1 className="text-4xl md:text-5xl font-black text-[var(--blue-950)] italic leading-tight">
              Get a Quote <br />
              <span className="text-[var(--lime-600)]">Fast. Free. No Obligation.</span>
            </h1>
            <p className="text-[var(--gray-600)] text-base max-w-xl leading-relaxed">
              Tell us about your moving requirement and we'll provide you with the best possible quote tailored to your needs.
            </p>

            {/* USP Checklist grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[var(--lime-50)] rounded-lg text-[var(--lime-600)] shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--blue-950)]">100% Free</h4>
                  <p className="text-xs text-[var(--gray-500)]">No hidden charges</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[var(--lime-50)] rounded-lg text-[var(--lime-600)] shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--blue-950)]">Quick Response</h4>
                  <p className="text-xs text-[var(--gray-500)]">We'll get back in minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[var(--lime-50)] rounded-lg text-[var(--lime-600)] shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--blue-950)]">Best Prices</h4>
                  <p className="text-xs text-[var(--gray-500)]">Competitive pricing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[var(--lime-50)] rounded-lg text-[var(--lime-600)] shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--blue-950)]">Secure & Reliable</h4>
                  <p className="text-xs text-[var(--gray-500)]">Your info is safe</p>
                </div>
              </div>
            </div>
          </>
        }
      />
      {/* ===== PERFECT FOR EVERY HOME MOVE ===== */}
      <section ref={perfectRef} className="py-2 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="perfect-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-6">
            Perfect For <span className="text-(--lime-500)">Every Home Move</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 border-b-2">
            {homeTypes.map((type, idx, array) => (
              <div
                key={idx}
                className={`perfect-card flex flex-row items-center justify-center gap-3 ${idx !== array.length-1 ? "border-r-2" : ""} my-2 text-start p-1   transition-all group cursor-pointer`}
              >
                <div className="w-12 h-12 bg-(--blue-50) rounded-xl flex  items-center justify-center mb-3 group-hover:bg-(--blue-100) transition-colors">
                  <type.icon className="w-6 h-6 text-(--blue-900)" />
                </div>
                <div>
                <p className="text-(--blue-900) font-semibold text-sm leading-tight">
                  {type.title}
                </p>
                <p className="text-(--gray-500) text-xs mt-0.5">{type.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR RESIDENTIAL MOVING SERVICES ===== */}
    <ServicesSection services={services}/>
      {/* ===== HOW WE MAKE YOUR MOVE EASY ===== */}
      <section ref={processRef} className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="process-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-6">
            How We Make Your <span className="text-(--lime-500)">Move Easy</span>
          </h2>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-(--gray-200)" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
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
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:static lg:mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-(--lime-500) text-white text-xs font-bold rounded-full">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-(--blue-900) font-bold text-sm mb-2 mt-1">
                    {step.title}
                  </h3>
                  <p className="text-(--gray-500) text-xs leading-relaxed max-w-[200px]">
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

      {/* ===== WHY CHOOSE omsai? ===== */}


      {/* ===== CTA BANNER ===== */}
     <CTASection {...ctaSections[0]} />;

      {/* ===== STATS BAR ===== */}
    <StatsBar/>

   
    </div>
  );
}