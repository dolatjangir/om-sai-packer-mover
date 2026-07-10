"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  Package,
  Users,
  Clock,
  MapPin,
  Headphones,
  Star,
  CheckCircle2,
  ArrowRight,
  Home,
  Truck,
  Building,
  Wine,
  Monitor,
  Sofa,
  Box,
  ClipboardList,
  Tag,
  ShieldCheck,
  Banknote,
  FileCheck,
  ChevronRight,
 
  Mail,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import StatsBar from "@/components/statsBar";

gsap.registerPlugin(ScrollTrigger);

export default function PackingServices() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<HTMLDivElement>(null);
  const relaxRef = useRef<HTMLDivElement>(null);
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

        // Why Choose
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

        // Materials
        gsap.fromTo(
          ".materials-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: materialsRef.current,
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
          ".material-item",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: materialsRef.current,
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

        // Relax
        gsap.fromTo(
          ".relax-content",
          { opacity: 0, x: 40 },
          {
            scrollTrigger: {
              trigger: relaxRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
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

  const services = [
    {
      icon: Home,
      title: "Home Packing",
      desc: "Complete packing for household items with utmost care.",
      imgLabel: "Home packing",
    },
    {
      icon: Building,
      title: "Office Packing",
      desc: "Secure packing of office equipment, documents & furniture.",
      imgLabel: "Office packing",
    },
    {
      icon: Wine,
      title: "Fragile Item Packing",
      desc: "Special care for fragile items like glassware, ceramics & more.",
      imgLabel: "Fragile packing",
    },
    {
      icon: Monitor,
      title: "Electronics Packing",
      desc: "Safe packing for electronic items with anti-static materials.",
      imgLabel: "Electronics packing",
    },
    {
      icon: Sofa,
      title: "Furniture Packing",
      desc: "Strong packing for furniture to prevent scratches & damage.",
      imgLabel: "Furniture packing",
    },
    {
      icon: Box,
      title: "Custom Packing",
      desc: "Tailored packing solutions for unique or valuable items.",
      imgLabel: "Custom packing",
    },
  ];

  const whyChoose = [
    {
      icon: Users,
      title: "Experienced Team",
      desc: "Skilled professionals with years of expertise",
    },
    {
      icon: Package,
      title: "Best Quality Materials",
      desc: "Use of high-grade boxes, bubble wrap & more",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Damage-Free",
      desc: "Extra protection for every single item",
    },
    {
      icon: Clock,
      title: "Time-Saving",
      desc: "Efficient packing saves your valuable time",
    },
    {
      icon: FileCheck,
      title: "Insurance Coverage",
      desc: "Option for complete peace of mind",
    },
    {
      icon: Banknote,
      title: "Affordable Pricing",
      desc: "Premium service at competitive prices",
    },
  ];

  const processSteps = [
    {
      num: "1",
      icon: ClipboardList,
      title: "Assessment",
      desc: "We assess your items and packing needs.",
    },
    {
      num: "2",
      icon: Package,
      title: "Material Selection",
      desc: "We choose the right packing materials.",
    },
    {
      num: "3",
      icon: Users,
      title: "Professional Packing",
      desc: "Our experts pack each item with care.",
    },
    {
      num: "4",
      icon: Tag,
      title: "Labeling",
      desc: "Items are labeled for easy identification.",
    },
    {
      num: "5",
      icon: Truck,
      title: "Loading Ready",
      desc: "Packed items are ready for safe transportation.",
    },
  ];

  const materials = [
    { icon: Box, label: "Corrugated Boxes" },
    { icon: Package, label: "Bubble Wrap" },
    { icon: FileCheck, label: "Stretch Film" },
    { icon: Tag, label: "Packing Tape" },
    { icon: Shield, label: "Foam Sheets" },
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
                <span className="text-white font-medium">Packing Services</span>
              </nav>

              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                Packing Services
              </h1>
              <h2 className="hero-subtitle text-2xl sm:text-3xl lg:text-4xl font-bold text-(--lime-400) leading-tight mb-6">
                Packed to Protect. Delivered with Care.
              </h2>

              <p className="hero-text text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-8">
                Professional packing is the first step to a safe and successful
                move. We use high-quality materials and expert techniques to ensure
                your belongings are packed securely for any journey.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 lg:gap-4 mb-8">
                {[
                  { icon: Users, text: "Expert Packers", sub: "Trained & verified professionals" },
                  { icon: Package, text: "Quality Materials", sub: "Premium packing materials used" },
                  { icon: Shield, text: "Safe & Secure", sub: "Maximum protection for your items" },
                  { icon: MapPin, text: "Doorstep Service", sub: "We come to you anywhere, anytime" },
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
                    <Package className="w-20 h-20 text-(--gray-400) mx-auto mb-3" />
                    <p className="text-(--gray-500) text-sm">
                      Packers wrapping furniture
                    </p>
                    <p className="text-(--gray-400) text-xs mt-1">
                      Replace with actual image
                    </p>
                  </div>
                </div>
              </div>

              {/* Safe Packing Card */}
              <div className="hero-card absolute -bottom-4 right-4 lg:bottom-4 lg:right-4 bg-(--blue-900) rounded-xl p-4 shadow-xl border border-(--blue-700) max-w-[160px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-(--lime-500) rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-white font-bold text-xs leading-tight">
                  Safe Packing.
                </p>
                <p className="text-(--lime-400) font-bold text-xs leading-tight">
                  Zero Worries.
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

      {/* ===== OUR PROFESSIONAL PACKING SERVICES ===== */}
      <section ref={servicesRef} className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="services-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) ">
            Our Professional <span className="text-(--lime-500)">Packing Services</span>
          </h2>
          <div className="w-12 h-1 bg-(--lime-500) mx-auto mb-4" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 lg:gap-2">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="service-card bg-(--gray-50) rounded-2xl p-5 border border-(--gray-100) hover:shadow-xl hover:border-(--blue-200) transition-all group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-(--blue-50) rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-(--blue-900)" />
                  </div>
                  <h3 className="text-(--blue-900) font-bold text-sm leading-tight">
                    {service.title}
                  </h3>
                </div>

                <div className="rounded-xl bg-(--gray-100) aspect-[4/3] flex items-center justify-center mb-4 overflow-hidden">
                  <div className="text-center p-4">
                    <Package className="w-8 h-8 text-(--gray-400) mx-auto mb-1" />
                    <p className="text-(--gray-400) text-[10px]">{service.imgLabel}</p>
                  </div>
                </div>

                <p className="text-(--blue-900) text-sm leading-tight">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE MOVEEASY PACKING SERVICES? ===== */}
      <section ref={whyRef} className="py-4 bg-(--gray-50)">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="why-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-4">
            Why Choose <span className="text-(--lime-500)">Om Sai</span> Packing Services?
          </h2>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
  {whyChoose.map((item, idx) => (
    <div
      key={idx}
      className="why-card group flex items-center justify-center gap-4 rounded-xl border border-(--gray-100) bg-white p-2 transition-all duration-300 hover:border-(--blue-200) hover:shadow-lg"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--blue-50) transition-colors group-hover:bg-(--blue-100)">
        <item.icon className="h-6 w-6 text-(--blue-900)" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-sm font-semibold leading-tight text-(--blue-900)">
          {item.title}
        </h3>

        <p className="text-xs leading-tight text-(--gray-500)">
          {item.desc}
        </p>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* ===== OUR PACKING PROCESS ===== */}
      <section ref={processRef} className="py-2 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="process-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            Our <span className="text-(--lime-500)">Packing Process</span>
          </h2>
          <div className="w-12 h-1 bg-(--lime-500) mx-auto mb-4" />

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] border-t-2 border-dashed border-(--gray-300)" />

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
                  <div className="mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-(--lime-500) text-white text-xs font-bold rounded-full">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-(--blue-900) font-bold text-sm mb-2">
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

      {/* ===== PACKING MATERIALS + RELAX BANNER ===== */}
      <section className="py-4 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left - Materials */}
            <div ref={materialsRef} className="bg-(--gray-100) rounded-2xl p-6 lg:p-8 border border-(--gray-100)">
              <h3 className="text-(--blue-900) font-bold text-lg lg:text-xl mb-2">
                We Use Best Quality Packing Materials
              </h3>
              <div className="w-10 h-1 bg-(--lime-500) mb-6" />

              <div className="grid grid-cols-5 gap-3">
                {materials.map((mat, idx) => (
                  <div
                    key={idx}
                    className="material-item flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-(--gray-100) rounded-xl flex items-center justify-center mb-2">
                      <mat.icon className="w-6 h-6 lg:w-7 lg:h-7 text-(--gray-400)" />
                    </div>
                    <p className="text-(--gray-600) text-[10px] lg:text-xs font-medium leading-tight">
                      {mat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - We Pack Everything */}
            <div ref={relaxRef} className="relax-content bg-(--blue-900) rounded-2xl p-6 lg:p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-1">
                  We Pack Everything,
                </h3>
                <h3 className="text-(--lime-400) font-bold text-xl lg:text-2xl mb-4">
                  You Relax!
                </h3>
                <p className="text-(--blue-200) text-sm leading-relaxed mb-6 max-w-sm">
                  From pin to piano, we pack everything with the same level of care
                  and professionalism.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors group"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Decorative image placeholder */}
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-(--blue-800)/50 rounded-xl hidden lg:flex items-center justify-center">
                <div className="text-center">
                  <Package className="w-8 h-8 text-(--blue-300) mx-auto mb-1" />
                  <p className="text-(--blue-300) text-[10px]">Stacked boxes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
    <StatsBar/>

      {/* ===== CTA BANNER ===== */}
      <section ref={ctaRef} className="py-8 lg:py-12 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="cta-content bg-(--blue-900) rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left Image */}
              <div className="hidden lg:block w-40 h-32 bg-(--blue-800)/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <Package className="w-10 h-10 text-(--blue-300) mx-auto mb-1" />
                  <p className="text-(--blue-300) text-[10px]">Mover with box</p>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">
                  Let Our Experts <span className="text-(--lime-400)">Pack It Right!</span>
                </h3>
                <p className="text-(--blue-200) text-sm">
                  Get professional packing services for a safe and hassle-free move.
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