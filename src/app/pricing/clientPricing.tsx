"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  Tag,
  Clock,
  Headphones,
  Check,
  ChevronRight,
  ChevronDown,
  Truck,
  Home,
  Star,
  Building,
  Diamond,
  Package,
  ArrowRight,
  Users,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Calendar,
  Banknote,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<"local" | "intercity">("local");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const customRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hero
        gsap.fromTo(
          ".hero-label",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-title-line",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            delay: 0.2,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".hero-text",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-badge",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.6,
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

        // Plans
        gsap.fromTo(
          ".plans-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: plansRef.current,
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
          ".plan-card",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: plansRef.current,
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

        // FAQ
        gsap.fromTo(
          ".faq-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: faqRef.current,
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
          ".faq-item",
          { opacity: 0, y: 15 },
          {
            scrollTrigger: {
              trigger: faqRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          }
        );

        // Custom plan
        gsap.fromTo(
          ".custom-content",
          { opacity: 0, x: 40 },
          {
            scrollTrigger: {
              trigger: customRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
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
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          }
        );

        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      icon: Package,
      name: "Basic Move",
      tagline: "Small moves, big value",
      price: "₹2,499",
      features: [
        "1 BHK Home",
        "Packing of Household Items",
        "Loading & Unloading",
        "Transportation",
        "Basic Insurance",
      ],
      highlighted: false,
    },
    {
      icon: Home,
      name: "Standard Move",
      tagline: "Perfect for medium moves",
      price: "₹4,999",
      features: [
        "1-2 BHK Home",
        "Packing of Household Items",
        "Loading & Unloading",
        "Transportation",
        "Transit Insurance",
        "Dismantling & Reassembling",
      ],
      highlighted: true,
    },
    {
      icon: Building,
      name: "Premium Move",
      tagline: "Complete moving solution",
      price: "₹7,999",
      features: [
        "2-3 BHK Home",
        "Premium Packing Materials",
        "Loading & Unloading",
        "Transportation",
        "Transit Insurance",
        "Dismantling & Reassembling",
        "Unpacking & Placement",
      ],
      highlighted: false,
    },
    {
      icon: Diamond,
      name: "Luxury Move",
      tagline: "For a worry-free experience",
      price: "Custom",
      customLabel: "Get Custom Quote",
      features: [
        "3+ BHK Home / Villa",
        "Premium Packing Materials",
        "Loading & Unloading",
        "Transportation",
        "Transit Insurance",
        "Dismantling & Reassembling",
        "Unpacking & Placement",
        "Dedicated Move Manager",
      ],
      highlighted: false,
    },
  ];

  const trustItems = [
    {
      icon: ShieldCheck,
      title: "No Hidden Charges",
      desc: "What you see is what you pay",
    },
    {
      icon: Banknote,
      title: "Affordable Pricing",
      desc: "Best prices with top quality service",
    },
    {
      icon: Calendar,
      title: "On-Time Delivery",
      desc: "We value your time and deadlines",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Support available anytime you need",
    },
  ];

  const faqs = [
    "What factors affect the moving cost?",
    "Do you charge extra for stairs or long distance?",
    "Is insurance included in the price?",
    "How can I get an exact quote?",
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden overflow-y-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-(--blue-900) to-(--blue-800) overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16  pb-20 lg:pt-28 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="hero-label flex items-center gap-3 mb-6">
                <span className="text-(--lime-400) text-sm font-bold tracking-wider uppercase">
                  Pricing Plans
                </span>
                <div className="h-px w-12 bg-(--lime-400) opacity-60" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                <span className="hero-title-line block">Transparent Pricing.</span>
                <span className="hero-title-line block text-(--lime-400)">
                  Hassle-Free Moving.
                </span>
              </h1>

              <p className="hero-text text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-8">
                Choose a plan that suits your move and budget. No hidden charges,
                no last-minute surprises.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 lg:gap-6 mb-8">
                {[
                  { icon: ShieldCheck, text: "100% Transparent", sub: "No hidden charges" },
                  { icon: Tag, text: "Best Price Guarantee", sub: "Get the most value" },
                  { icon: Headphones, text: "24/7 Support", sub: "We're always here" },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="hero-badge flex items-center gap-2.5"
                  >
                    <div className="w-10 h-10 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                      <badge.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        {badge.text}
                      </p>
                      <p className="text-(--blue-200) text-[10px]">
                        {badge.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="hero-image relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                
                
                 <img src="/pricing-hero-img.png" className=" w-full h-full flex items-center justify-center"/>
               
              </div>

              {/* Smart Moving Card */}
              <div className="hero-card absolute -bottom-4 right-4 lg:bottom-4 lg:right-4 bg-(--lime-500) rounded-xl p-4 shadow-xl max-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-(--lime-600)" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs leading-tight">
                      Save More with
                    </p>
                    <p className="text-(--blue-900) font-bold text-xs leading-tight">
                      Smart Moving
                    </p>
                  </div>
                </div>
                <p className="text-white/90 text-[10px] leading-relaxed">
                  Flexible plans for every need & budget
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

      {/* ===== PRICING PLANS ===== */}
      <section ref={plansRef} className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="plans-header text-center mb-8">
            <span className="text-(--lime-600) text-xs font-bold tracking-wider uppercase mb-3 block">
              Choose Your Plan
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--blue-900)">
              Flexible Plans For <span className="text-(--lime-500)">Every Move</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-(--gray-100) rounded-full p-1">
              <button
                onClick={() => setActiveTab("local")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "local"
                    ? "bg-(--lime-500) text-white"
                    : "text-(--gray-600) hover:text-(--blue-900)"
                }`}
              >
                Local Move
              </button>
              <button
                onClick={() => setActiveTab("intercity")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "intercity"
                    ? "bg-(--lime-500) text-white"
                    : "text-(--gray-600) hover:text-(--blue-900)"
                }`}
              >
                Intercity Move
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`plan-card relative rounded-2xl p-5 lg:p-6 border transition-all ${
                  plan.highlighted
                    ? "border-(--lime-500) bg-(--lime-50) shadow-lg scale-105 z-10"
                    : "border-(--gray-200) bg-white hover:shadow-md hover:border-(--blue-200)"
                }`}
              >
                {/* Most Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-(--lime-500) text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    plan.highlighted ? "bg-(--lime-500)" : "bg-(--blue-900)"
                  }`}
                >
                  <plan.icon className="w-7 h-7 text-white" />
                </div>

                {/* Name */}
                <h3 className="text-(--blue-900) font-bold text-lg text-center mb-1">
                  {plan.name}
                </h3>
                <p className="text-(--gray-500) text-xs text-center mb-4">
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="text-center mb-5">
                  {plan.price === "Custom" ? (
                    <>
                      <p className="text-(--blue-900) font-bold text-2xl mb-1">
                        Custom
                      </p>
                      <p className="text-(--gray-500) text-xs">
                        {plan.customLabel}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-(--blue-900) font-bold text-2xl mb-1">
                        {plan.price}
                      </p>
                      <p className="text-(--gray-500) text-xs">Starting From</p>
                    </>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-(--gray-200) my-4" />

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-(--lime-500) flex-shrink-0 mt-0.5" />
                      <span className="text-(--gray-600) text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-(--lime-500) hover:bg-(--lime-600) text-white"
                      : "bg-transparent border-2 border-(--blue-900) text-(--blue-900) hover:bg-(--blue-900) hover:text-white"
                  }`}
                >
                  Get Free Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section ref={trustRef} className="py-4 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-(--blue-900) rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {trustItems.map((item, idx) => (
                <div
                  key={idx}
                  className="trust-item flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-7 h-7 text-(--lime-400)" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-(--blue-200) text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ + CUSTOM PLAN ===== */}
      <section ref={faqRef} className="py-4 bg-(--gray-50)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - FAQ */}
            <div>
              <span className="faq-header text-(--lime-600) text-xs font-bold tracking-wider uppercase mb-2 block">
                Common Questions
              </span>
              <h2 className="faq-header text-2xl sm:text-3xl font-bold text-(--blue-900) mb-2">
                Have Questions?
              </h2>
              <h2 className="faq-header text-2xl sm:text-3xl font-bold mb-8">
                <span className="text-(--blue-900)">We Have </span>
                <span className="text-(--lime-500)">Answers.</span>
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="faq-item bg-white rounded-xl border border-(--gray-200) overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="text-(--blue-900) text-sm font-medium">
                        {faq}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-(--gray-400) transition-transform ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4">
                        <p className="text-(--gray-500) text-xs leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Custom Plan */}
            <div ref={customRef} className="flex items-center">
              <div className="custom-content bg-white rounded-2xl p-4 border border-(--gray-200) w-full">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-48 h-48 rounded-xl flex items-center justify-center flex-shrink-0">
                   
                     <img src="/slate-shield-img.png"/>
                   
                  </div>
                  <div>
                    <h3 className="text-(--blue-900) font-bold text-xl mb-2">
                      Need a Custom Plan?
                    </h3>
                    <p className="text-(--gray-500) text-sm leading-relaxed mb-4">
                      We understand every move is unique. Contact us for a
                      personalized quote based on your specific needs.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors group"
                    >
                      Get Custom Quote
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section ref={ctaRef} className="py-4 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="cta-content bg-(--blue-900) rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-(--blue-900)" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg lg:text-xl">
                    Ready To Move?
                  </h3>
                  <p className="text-(--blue-200) text-sm">
                    Get a free quote today and make your move easy with Om Sai!
                  </p>
                </div>
              </div>

              {/* Center */}
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors group"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Right */}
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-end gap-2 mb-1">
                  <Phone className="w-4 h-4 text-(--lime-400)" />
                  <a
                    href="tel:18001234567"
                    className="text-white font-bold text-xl lg:text-2xl hover:text-(--lime-400) transition-colors"
                  >
                    1800 123 4567
                  </a>
                </div>
                <p className="text-(--blue-200) text-xs">
                  Mon - Sun (8:00 AM - 8:00 PM)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS + REVIEWS BAR ===== */}
      <section ref={statsRef} className="py-4 bg-white border-t border-(--gray-100)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-8">
            {/* Stats */}
            {[
              { icon: Users, value: "10,000+", label: "Happy Customers" },
              { icon: MapPin, value: "200+", label: "Cities Covered" },
              { icon: ShieldCheck, value: "99%", label: "On-Time Delivery" },
              { icon: TrendingUp, value: "10+", label: "Years of Trust" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="stat-item flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-(--blue-50) rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-(--blue-900)" />
                </div>
                <div>
                  <p className="text-(--blue-900) font-bold text-lg">
                    {stat.value}
                  </p>
                  <p className="text-(--gray-500) text-xs">{stat.label}</p>
                </div>
              </div>
            ))}

            {/* Google Rating */}
            <div className="stat-item flex items-center gap-3 bg-(--gray-50) rounded-xl px-4 py-2 border border-(--gray-200)">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-(--blue-500) font-bold text-xs">G</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-(--blue-900) font-bold text-sm">4.8</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-(--lime-500) fill-(--lime-500)"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-(--gray-500) text-[10px]">Google Reviews</p>
              </div>
            </div>

            {/* Trusted Badge */}
            <div className="stat-item flex items-center gap-2 bg-(--gray-50) rounded-xl px-4 py-2 border border-(--gray-200)">
              <ShieldCheck className="w-5 h-5 text-(--lime-500)" />
              <div>
                <p className="text-(--blue-900) font-bold text-xs">Trusted by</p>
                <p className="text-(--gray-500) text-[10px]">Thousands</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}