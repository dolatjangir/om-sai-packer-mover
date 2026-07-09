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
} from "lucide-react";

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
      imgLabel: "Boxes with clock",
    },
    {
      icon: Clock,
      title: "Long-Term Storage",
      desc: "Perfect for storing items you don't need right now, for months or years.",
      imgLabel: "Warehouse corridor",
    },
    {
      icon: Building,
      title: "Business Storage",
      desc: "Secure space for office equipment, documents, inventory & more.",
      imgLabel: "Office inventory",
    },
    {
      icon: GraduationCap,
      title: "Student Storage",
      desc: "Safe & affordable storage option for students during holidays or relocation.",
      imgLabel: "Student with boxes",
    },
    {
      icon: Car,
      title: "Vehicle Storage",
      desc: "Safe storage for your car, bike or other vehicles with complete care.",
      imgLabel: "Car and bike",
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
                <ArrowRight className="w-3 h-3 text-(--blue-300) rotate-[-90deg]" />
                <span className="text-(--blue-200) hover:text-white cursor-pointer transition-colors">
                  Services
                </span>
                <ArrowRight className="w-3 h-3 text-(--blue-300) rotate-[-90deg]" />
                <span className="text-white font-medium">Storage Solutions</span>
              </nav>

              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                Storage Solutions
              </h1>
              <h2 className="hero-subtitle text-2xl sm:text-3xl lg:text-4xl font-bold text-(--lime-400) leading-tight mb-6">
                Safe. Secure. Reliable.
              </h2>

              <p className="hero-subtitle text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-8">
                Whether you need short-term storage during a move or a long-term
                solution for extra space, we keep your belongings safe and
                accessible.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 lg:gap-4 mb-8">
                {[
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
                ].map((pill, idx) => (
                  <div
                    key={idx}
                    className="hero-feature-pill flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/10"
                  >
                    <div className="w-8 h-8 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                      <pill.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        {pill.text}
                      </p>
                      <p className="text-(--blue-200) text-[10px] leading-tight">
                        {pill.sub}
                      </p>
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
                    <Warehouse className="w-20 h-20 text-(--gray-400) mx-auto mb-3" />
                    <p className="text-(--gray-500) text-sm">
                      Storage warehouse with boxes
                    </p>
                    <p className="text-(--gray-400) text-xs mt-1">
                      Replace with actual image
                    </p>
                  </div>
                </div>
              </div>

              {/* Responsibility Badge */}
              <div className="hero-badge absolute -bottom-4 -left-4 lg:bottom-4 lg:-left-8 bg-(--blue-900) rounded-xl p-4 shadow-xl border border-(--blue-700) flex items-center gap-3 max-w-[200px]">
                <div className="w-10 h-10 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-xs leading-tight">
                    Your Belongings
                  </p>
                  <p className="text-(--lime-400) font-bold text-xs leading-tight">
                    Our Responsibility
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

      {/* ===== SECURE STORAGE FOR EVERY NEED ===== */}
      <section ref={secureRef} className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="secure-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
            Secure Storage <span className="text-(--lime-500)">for Every Need</span>
          </h2>
          <div className="flex justify-center gap-1 mb-6">
            <div className="w-2 h-2 rounded-full bg-(--lime-500)" />
            <div className="w-2.5 h-2.5 rounded-full bg-(--lime-500)" />
            <div className="w-2 h-2 rounded-full bg-(--lime-500)" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6">
            {storageTypes.map((type, idx) => (
              <div
                key={idx}
                className="secure-card bg-(--gray-200) rounded-2xl p-5 border border-(--gray-100) hover:shadow-xl hover:border-(--blue-200) transition-all group"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-(--blue-50) rounded-lg flex items-center justify-center">
                    <type.icon className="w-5 h-5 text-(--blue-900)" />
                  </div>
                  <h3 className="text-(--blue-900) font-bold text-sm leading-tight">
                    {type.title}
                  </h3>
                </div>

                <div className="rounded-xl bg-(--gray-100) aspect-[4/3] flex items-center justify-center mb-4 overflow-hidden">
                  <div className="text-center p-4">
                    <Package className="w-8 h-8 text-(--gray-400) mx-auto mb-1" />
                    <p className="text-(--gray-400) text-[10px]">{type.imgLabel}</p>
                  </div>
                </div>

                <p className="text-(--gray-500) text-sm ">
                  {type.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <section ref={ctaRef} className="py-4  px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="cta-content bg-(--blue-900) rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-(--lime-500)/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-(--lime-500)/10 rounded-full translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              {/* Left - Image placeholder */}
              <div className="hidden lg:block w-48 h-32 bg-(--blue-800)/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <Package className="w-10 h-10 text-(--blue-300) mx-auto mb-1" />
                  <p className="text-(--blue-300) text-[10px]">Stacked boxes</p>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">
                  Need Extra Space?{" "}
                  <span className="text-(--lime-400)">We&apos;ve Got You Covered!</span>
                </h3>
                <p className="text-(--blue-200) text-sm mb-5">
                  Secure, flexible and affordable storage solutions designed for
                  you.
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

      {/* ===== STATS BAR ===== */}
      <section ref={statsRef} className="py-5 ">
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

      
    </div>
  );
}