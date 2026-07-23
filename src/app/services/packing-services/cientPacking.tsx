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
import HeroSection from "@/components/services-hero-reusable/heroSection";
import ServicesSection from "@/components/cardSection";
import Link from "next/link";
import CTASection from "@/components/ctaBanner";

gsap.registerPlugin(ScrollTrigger);
export const ctaSections = [
  {
    title: "Let Our Experts",
    highlight: "Pack It Right!",
    description:
      "Get professional packing services for a safe and hassle-free move.",
    image: "/packing-service-cta-img.png",

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
      image: "/packing&unpacking.png",
    },
    {
      icon: Building,
      title: "Office Packing",
      desc: "Secure packing of office equipment, documents & furniture.",
       image: "/packing&unpacking.png",
    },
    {
      icon: Wine,
      title: "Fragile Item Packing",
      desc: "Special care for fragile items like glassware, ceramics & more.",
       image: "/packing&unpacking.png",
    },
    {
      icon: Monitor,
      title: "Electronics Packing",
      desc: "Safe packing for electronic items with anti-static materials.",
       image: "/packing&unpacking.png",
    },
    {
      icon: Sofa,
      title: "Furniture Packing",
      desc: "Strong packing for furniture to prevent scratches & damage.",
      image: "/packing&unpacking.png",
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
    { image: "/box-img.png", label: "Corrugated Boxes" },
    { image: "/pop-polithin.png", label: "Bubble Wrap" },
    { image: "/wrap-polithin.png", label: "Stretch Film" },
    { image: "/tape.png", label: "Packing Tape" },
    { image: "/plasitic-foam.png", label: "Foam Sheets" },
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
        title="Packing Services"
        highlightedTitle="Packed to Protect. Delivered with Care."
        description="Professional packing is the first step to a safe and successful move. We use high-quality materials and expert techniques to ensure your belongings are packed securely for any journey."
        features={[
          { icon: Shield, text: "Expert Packers", sub: "Trained & verified professionals" },
          { icon: Clock, text: "Quality Materials", sub: "Premium packing materials used" },
          { icon: Package, text: "Safe & Secure", sub: "Maximum protection for your items" },
          { icon: Banknote, text: "Doorstep Service", sub: "We come to you anywhere, anytime" },
        ]}
        image={{ src: "/packing-services-hero--img.png", alt: "packing-services-image" }}
      />

      {/* ===== OUR PROFESSIONAL PACKING SERVICES ===== */}
    
 <ServicesSection services={services} title="Our Professional" highlightTitle="Packing Services" />
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
                    <div className="w-14 h-14 lg:w-26 lg:h-26 bg-(--gray-100) rounded-xl flex items-center justify-center mb-2">
                      <img src={mat.image} alt={mat.label} className="w-14 h-14 lg:w-24 lg:h-24 text-(--gray-400)" />
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
                <Link
                  href="/get-a-quote"
                  className="inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors group"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Decorative image placeholder */}
              <div className="absolute bottom-4 right-4 w-[50%] h-[90%] hidden sm:flex items-center justify-center">
              <img src="/storage-solution-cta-img.png" alt="Relax Banner" className="w-full h-full object-cover" />
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