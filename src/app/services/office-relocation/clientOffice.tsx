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
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import StatsBar from "@/components/statsBar";
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

  const solutions = [
    {
      icon: Calendar,
      title: "Pre-Move Planning",
      desc: "Detailed assessment & customized moving plan for your office.",
      imgLabel: "Planning clipboard",
    },
    {
      icon: Package,
      title: "Packing & Labeling",
      desc: "Safe packing of office equipment, documents and furniture.",
      imgLabel: "Packing boxes",
    },
    {
      icon: Wrench,
      title: "Dismantling & Handling",
      desc: "Expert dismantling of workstations, cabins and office furniture.",
      imgLabel: "Dismantling furniture",
    },
    {
      icon: Truck,
      title: "Transportation",
      desc: "Well-maintained vehicles for safe and timely transport.",
      imgLabel: "Moving truck",
    },
    {
      icon: Monitor,
      title: "Unpacking & Setup",
      desc: "Unpacking and setting up your office at the new location.",
      imgLabel: "Setting up office",
    },
    {
      icon: Sparkles,
      title: "Clean-Up Support",
      desc: "We leave your old or new office clean and ready to use.",
      imgLabel: "Clean office",
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
                <span className="text-white font-medium">Office Relocation</span>
              </nav>

              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                Office Relocation
              </h1>
              <h2 className="hero-subtitle text-2xl sm:text-3xl lg:text-4xl font-bold text-(--lime-400) leading-tight mb-6">
                Move Your Business Forward
              </h2>

              <p className="hero-text text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-8">
                We make your office relocation smooth, efficient and stress-free
                with minimal downtime. From packing to setup, we handle everything
                so you can focus on what matters most – your business.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 lg:gap-4 mb-8">
                {[
                  { icon: Calendar, text: "Planned & Organized", sub: "Detailed planning for a seamless move" },
                  { icon: Shield, text: "Safe & Secure", sub: "Your office assets are in safe hands" },
                  { icon: Clock, text: "Min. Downtime", sub: "Quick & efficient move to reduce disruption" },
                  { icon: Users, text: "Expert Team", sub: "Trained professionals for a hassle-free move" },
                ].map((badge, idx) => (
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
                    <Users className="w-20 h-20 text-(--gray-400) mx-auto mb-3" />
                    <p className="text-(--gray-500) text-sm">
                      Office movers at work
                    </p>
                    <p className="text-(--gray-400) text-xs mt-1">
                      Replace with actual image
                    </p>
                  </div>
                </div>
              </div>

              {/* Seamless Moves Card */}
              <div className="hero-card absolute -bottom-4 right-4 lg:bottom-4 lg:right-4 bg-(--blue-900) rounded-xl p-4 shadow-xl border border-(--blue-700) max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-(--lime-500) rounded-full flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-white font-bold text-xs leading-tight">
                  Seamless Moves.
                </p>
                <p className="text-(--lime-400) font-bold text-xs leading-tight">
                  Stronger Business.
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

      {/* ===== COMPLETE OFFICE RELOCATION SOLUTIONS ===== */}
      <section ref={solutionsRef} className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="solutions-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            Complete Office Relocation <span className="text-(--lime-500)">Solutions</span>
          </h2>
          <div className="w-12 h-1 bg-(--lime-500) mx-auto mb-4" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
            {solutions.map((sol, idx) => (
              <div
                key={idx}
                className="solution-card bg-(--gray-50) rounded-2xl p-4 border border-(--gray-100) hover:shadow-xl hover:border-(--blue-200) transition-all group"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-(--blue-50) rounded-lg flex items-center justify-center">
                    <sol.icon className="w-6 h-6 text-(--blue-900)" />
                  </div>
                  <h3 className="text-(--blue-900) font-bold text-sm leading-tight">
                    {sol.title}
                  </h3>
                </div>

                <div className="rounded-xl bg-(--gray-100) aspect-[4/3] flex items-center justify-center mb-4 overflow-hidden">
                  <div className="text-center p-4">
                    <Package className="w-8 h-8 text-(--gray-400) mx-auto mb-1" />
                    <p className="text-(--gray-400) text-[10px]">{sol.imgLabel}</p>
                  </div>
                </div>

                <p className="text-(--blue-900) text-sm leading-tight">
                  {sol.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <section ref={ctaRef} className="py-4 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="cta-content bg-(--blue-900) rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left Image */}
              <div className="hidden lg:block w-40 h-32 bg-(--blue-800)/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <Monitor className="w-10 h-10 text-(--blue-300) mx-auto mb-1" />
                  <p className="text-(--blue-300) text-[10px]">Office setup</p>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">
                  Planning to <span className="text-(--lime-400)">Relocate Your Office?</span>
                </h3>
                <p className="text-(--blue-200) text-sm mb-5">
                  Let us handle your move while you focus on growing your business.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6">
                  {[
                    { icon: CheckCircle2, text: "No Hidden Charges" },
                    { icon: Clock, text: "On-Time Delivery" },
                    { icon: Shield, text: "100% Safe & Secure" },
                    { icon: Headphones, text: "24/7 Support" },
                  ].map((check, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <check.icon className="w-4 h-4 text-(--lime-400)" />
                      <span className="text-white text-xs font-medium">{check.text}</span>
                    </div>
                  ))}
                </div>
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

      {/* ===== STATS BAR ===== */}
     <StatsBar/>

    
    </div>
  );
}