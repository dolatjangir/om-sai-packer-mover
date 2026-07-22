"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  Thermometer,
  Calendar,
  DoorOpen,
  Clock,
  Package,
  Building,
  GraduationCap,
  Car,
  ClipboardList,
  Box,
  ShoppingCart,
  CheckCircle,
  Warehouse,
  Star,
  Headphones,
  Users,
  MapPinned,
  ShieldCheck,

  Mail,
  MapPin,
  ArrowRight,
  Home,
  Truck,
  CheckCircle2,
  Banknote,
} from "lucide-react";
import StatsBar from "@/components/statsBar";
import HeroSection from "@/components/services-hero-reusable/heroSection";
import ServicesSection from "@/components/cardSection";
import CTASection from "@/components/ctaBanner";
export const ctaSections = [
  {
    title: "Need Extra Space?",
    highlight: "We've Got You Covered!",
    description:
      "Secure, flexible and affordable storage solutions designed for you.",
    image: "/storage-solution-cta-img.png",

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


gsap.registerPlugin(ScrollTrigger);

export default function StorageSolutions() {
  const heroRef = useRef<HTMLDivElement>(null);
  const secureRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
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
        gsap.fromTo(
          ".hero-badge",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 0.9, ease: "back.out(1.7)" }
        );

        // Secure Storage
        gsap.fromTo(
          ".secure-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: secureRef.current,
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
          ".secure-card",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: secureRef.current,
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

        // How It Works
        gsap.fromTo(
          ".how-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: howRef.current,
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
          ".how-step",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: howRef.current,
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

  const storageTypes = [
    {
      icon: Calendar,
      title: "Short-Term Storage",
      desc: "Ideal for temporary storage during your move, renovation or travel.",
       image: "/shorttrum-storage.png",
    },
    {
      icon: Clock,
      title: "Long-Term Storage",
      desc: "Perfect for storing items you don't need right now, for months or years.",
      image: "/longtrum-storage.png",
    },
    {
      icon: Building,
      title: "Business Storage",
      desc: "Secure space for office equipment, documents, inventory & more.",
       image: "/bussiness-storage.png",
    },
    {
      icon: GraduationCap,
      title: "Student Storage",
      desc: "Safe & affordable storage option for students during holidays or relocation.",
    image: "/student-storage.png",
    },
    {
      icon: Car,
      title: "Vehicle Storage",
      desc: "Safe storage for your car, bike or other vehicles with complete care.",
      image: "/vehicle-storage.png",
    },
  ];

  const whyChoose = [
    {
      icon: Shield,
      title: "Top-notch Security",
      desc: "24/7 CCTV surveillance & security systems",
    },
    {
      icon: Package,
      title: "Clean & Dry Space",
      desc: "Climate-controlled & dust-free units",
    },
    {
      icon: DoorOpen,
      title: "Flexible Access",
      desc: "Access your items easily anytime",
    },
    {
      icon: CheckCircle,
      title: "Affordable Pricing",
      desc: "Best storage solutions within your budget",
    },
    {
      icon: ShieldCheck,
      title: "Insurance Cover",
      desc: "Your belongings are fully insured",
    },
    {
      icon: Warehouse,
      title: "Well-Maintained",
      desc: "Regular cleaning & maintenance",
    },
  ];

  const howSteps = [
    {
      num: "1",
      icon: ClipboardList,
      title: "Request a Quote",
      desc: "Share your storage requirements with us.",
    },
    {
      num: "2",
      icon: Box,
      title: "Choose Your Plan",
      desc: "Select the perfect plan as per your needs.",
    },
    {
      num: "3",
      icon: ShoppingCart,
      title: "Store Your Items",
      desc: "We safely pack & store your belongings.",
    },
    {
      num: "4",
      icon: ShieldCheck,
      title: "Safe & Secure",
      desc: "Your items are protected 24/7 in our facility.",
    },
    {
      num: "5",
      icon: DoorOpen,
      title: "Access Anytime",
      desc: "Access your belongings whenever you need.",
    },
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: MapPinned, value: "200+", label: "Cities Covered" },
    { icon: ShieldCheck, value: "99%", label: "Safe Storage" },
    { icon: Star, value: "4.8/5", label: "Customer Rating" },
    { icon: Headphones, value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ===== HERO SECTION ===== storage-service-hero-img*/}
     <HeroSection
  title="Storage Solutions"
  highlightedTitle=" Safe. Secure. Reliable."
  description=" Whether you need short-term storage during a move or a long-term
                solution for extra space, we keep your belongings safe and
                accessible."
  features={[
                  {
                    icon: Shield,
                    text: "24/7 Security",
                    sub: "CCTV monitored facilities",
                  },
                  {
                    icon: Thermometer,
                    text: "Climate Controlled",
                    sub: "Protects against heat, humidity & dust",
                  },
                  {
                    icon: Calendar,
                    text: "Flexible Plans",
                    sub: "Short & long term storage options",
                  },
                  {
                    icon: DoorOpen,
                    text: "Easy Access",
                    sub: "Access your items whenever you need",
                  },
                ]}
  image={{ src: "/storage-service-hero-img.png", alt: "hero-family-moving-image" }}
/>
      {/* ===== SECURE STORAGE FOR EVERY NEED ===== */}
 <ServicesSection services={storageTypes} title="Secure Storage " highlightTitle="for Every Need" />
      {/* ===== WHY CHOOSE OUR STORAGE SOLUTIONS? ===== */}
      <section ref={whyRef} className="py-4 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="why-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-4">
            Why Choose Our{" "}
            <span className="text-(--lime-500)">Storage Solutions?</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-6">
            {whyChoose.map((item, idx) => (
              <div
                key={idx}
                className="why-card bg-(--gray-50) rounded-xl p-5 lg:p-6 border border-(--gray-100) hover:shadow-lg hover:border-(--blue-200) transition-all text-center group"
              >
                <div className="w-12 h-12 bg-(--lime-50) rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-(--lime-100) transition-colors">
                  <item.icon className="w-6 h-6 text-(--lime-600)" />
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

      {/* ===== HOW IT WORKS ===== */}
      <section ref={howRef} className="py-4 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="how-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            How It <span className="text-(--lime-500)">Works</span>
          </h2>

          <div className="relative mt-4">
            {/* Desktop connecting dotted line */}
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] border-t-2 border-dashed border-(--gray-300)" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {howSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="how-step relative flex flex-col items-center text-center"
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
                  {idx < howSteps.length - 1 && (
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

      {/* ===== CTA BANNER ===== */}
 <CTASection {...ctaSections[0]} />;

      {/* ===== STATS BAR ===== */}
      <StatsBar/>

      
    </div>
  );
}