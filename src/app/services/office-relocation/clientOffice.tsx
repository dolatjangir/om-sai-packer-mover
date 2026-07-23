"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  Calendar,
  Clock,
  Users,
  MapPin,
  Headphones,
  Star,
  CheckCircle2,
  ArrowRight,
  Home,
  Truck,
  ClipboardList,
  Package,
  Wrench,
  Monitor,
  Sparkles,
  FileCheck,
  Box,
  Car,
  ShieldCheck,
  Tag,
  FileText,
  ChevronRight,
 
  Mail,
  Building,
  Check,
  Banknote,
  Warehouse,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import StatsBar from "@/components/statsBar";
import HeroSection from "@/components/services-hero-reusable/heroSection";
import ServicesSection from "@/components/cardSection";
import CTASection from "@/components/ctaBanner";
gsap.registerPlugin(ScrollTrigger);
  
export default function OfficeRelocation() {
  const heroRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
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

        // Solutions
        gsap.fromTo(
          ".solutions-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: solutionsRef.current,
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
          ".solution-card",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: solutionsRef.current,
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

const ctaSections = [
  {
    title: "Ready for a",
    highlight: "Smooth Home Move?",
    description:
      "Let our experts handle your move with care and professionalism.",
    image: "/office-relocation-cta-img.png",

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
    title: "Planning to ",
    highlight: " Relocate Your Office?",
    description:
      "Let us handle your move while you focus on growing your business.",

    image: "/office-relocation-hero-img.png",

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

  const solutions = [
    {
      icon: Calendar,
      title: "Pre-Move Planning",
      desc: "Detailed assessment & customized moving plan for your office.",
       image: "/packing&unpacking.png",
    },
    {
      icon: Package,
      title: "Packing & Labeling",
      desc: "Safe packing of office equipment, documents and furniture.",
       image: "/packing&unpacking.png",
    },
   
    {
      icon: Truck,
      title: "Transportation",
      desc: "Well-maintained vehicles for safe and timely transport.",
       image: "/packing&unpacking.png",
    },
    {
      icon: Monitor,
      title: "Unpacking & Setup",
      desc: "Unpacking and setting up your office at the new location.",
        image: "/packing&unpacking.png",
    },
    {
      icon: Sparkles,
      title: "Clean-Up Support",
      desc: "We leave your old or new office clean and ready to use.",
       image: "/packing&unpacking.png",
    },
  ];

  const processSteps = [
    {
      num: "1",
      icon: ClipboardList,
      title: "Survey & Assessment",
      desc: "We understand your requirements and plan every detail.",
    },
    {
      num: "2",
      icon: FileText,
      title: "Plan & Schedule",
      desc: "We create a customized plan and schedule the move.",
    },
    {
      num: "3",
      icon: Box,
      title: "Packing & Preparation",
      desc: "We pack, label and prepare every item for safe moving.",
    },
    {
      num: "4",
      icon: Car,
      title: "Transport & Move",
      desc: "Safe loading, transportation and timely delivery to your new office.",
    },
    {
      num: "5",
      icon: Monitor,
      title: "Setup & Installation",
      desc: "We unpack, reassemble and set up your office as per your layout.",
    },
    {
      num: "6",
      icon: CheckCircle2,
      title: "Final Check",
      desc: "We ensure everything is in place for a smooth start.",
    },
  ];

  const whyTrust = [
    {
      icon: Users,
      title: "Experienced Professionals",
      desc: "Trained team with years of relocation expertise",
    },
    {
      icon: FileCheck,
      title: "End-to-End Service",
      desc: "We handle everything from start to finish",
    },
    {
      icon: ShieldCheck,
      title: "Secure Transport",
      desc: "GPS-enabled vehicles & safe handling",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      desc: "Move over weekends or after office hours",
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      desc: "Comprehensive insurance for complete peace of mind",
    },
    {
      icon: MapPin,
      title: "Pan India Presence",
      desc: "Office relocation services across 200+ cities",
    },
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
      <HeroSection
        title="Office Relocation"
        highlightedTitle="Move Your Business Forward"
        description="We make your office relocation smooth, efficient and stress-free with minimal downtime. From packing to setup, we handle everything so you can focus on what matters most – your business."
        features={[
          { icon: Shield, text: "Planned & Organized", sub: "Detailed planning for a seamless move" },
          { icon: Clock, text: "Safe & Secure", sub: "Your office assets are in safe hands" },
          { icon: Package, text: "Min. Downtime", sub: "Quick & efficient move to reduce disruption" },
          { icon: Banknote, text: "Expert Team", sub: "Trained professionals for a hassle-free move" },
        ]}
        image={{ src: "/office-relocation-hero-img.png", alt: "office-relocation-image" }}
      />

      {/* ===== COMPLETE OFFICE RELOCATION SOLUTIONS ===== */}
    <ServicesSection services={solutions} title="Complete Office Relocation" highlightTitle="Solutions" />

      {/* ===== OUR OFFICE RELOCATION PROCESS ===== */}
      <section ref={processRef} className="py-4 bg-(--gray-50)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="process-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            Our Office Relocation <span className="text-(--lime-500)">Process</span>
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

      {/* ===== WHY BUSINESSES TRUST MOVEEASY? ===== */}
      <section ref={whyRef} className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="why-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-10 lg:mb-14">
            Why Businesses Trust <span className="text-(--lime-500)">Om Sai?</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-6">
            {whyTrust.map((item, idx) => (
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

      {/* ===== CTA BANNER ===== */}
     <CTASection {...ctaSections[0]} /> 
      {/* ===== STATS BAR ===== */}
     <StatsBar/>

    
    </div>
  );
}