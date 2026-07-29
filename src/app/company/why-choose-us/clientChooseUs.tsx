"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  Users,
  Truck,
  MapPin,
  ShieldCheck,
  Clock,
  Tag,
  Headphones,
  Package,
  Star,
  ChevronRight,
  Home,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);
  const trustedRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hero entrance
        gsap.fromTo(
          ".hero-label",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out" }
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
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-image-area",
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-curve",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "power2.out" }
        );

        // Stats bar
        gsap.fromTo(
          ".stat-item",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: statsRef.current,
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

        // Promise section
        gsap.fromTo(
          ".promise-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: promiseRef.current,
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
          ".reason-card",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: promiseRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
          }
        );

        // Trusted section
        gsap.fromTo(
          ".trusted-content",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: trustedRef.current,
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
          ".footer-content",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }
        );

        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Happy Customers",
      color: "bg-[var(--blue-900)]",
    },
    {
      icon: Truck,
      value: "15,000+",
      label: "Successful Moves",
      color: "bg-[var(--lime-500)]",
    },
    {
      icon: MapPin,
      value: "200+",
      label: "Cities Covered",
      color: "bg-[var(--blue-900)]",
    },
    {
      icon: ShieldCheck,
      value: "99%",
      label: "On-Time Delivery",
      color: "bg-[var(--lime-500)]",
    },
  ];

  const reasons = [
    {
      icon: Shield,
      title: "Safety First",
      desc: "We use high-quality packing materials and secure handling techniques to ensure the safety of your belongings.",
      color: "bg-[var(--blue-900)]",
      imgLabel: "Mover packing boxes",
      image:"/why-choose-us-bottom-1-img.png"
    },
    {
      icon: Users,
      title: "Experienced Team",
      desc: "Our trained and verified professionals handle your move with skill, care and complete responsibility.",
      color: "bg-[var(--lime-500)]",
      imgLabel: "Movers carrying furniture",
       image:"/why-choose-us-bottom-4-img.png"
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      desc: "We value your time and ensure timely pickup and delivery, every time.",
      color: "bg-[var(--lime-500)]",
      imgLabel: "MoveEasy truck",
       image:"/why-choose-us-bottom-2-img.png"
    },
    {
      icon: Tag,
      title: "Transparent Pricing",
      desc: "No hidden charges. Get upfront, honest and competitive quotes for a worry-free move.",
      color: "bg-[var(--blue-900)]",
      imgLabel: "Piggy bank with coins",
       image:"/why-choose-us-bottom-5-img.png"
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      desc: "Our support team is always available to assist you before, during and after your move.",
      color: "bg-[var(--blue-900)]",
      imgLabel: "Support representative",
       image:"/why-choose-us-bottom-3-img.png"
    },
    {
      icon: Package,
      title: "End-to-End Solutions",
      desc: "From packing, loading, transportation to unpacking and setup – we handle everything for you.",
      color: "bg-[var(--lime-500)]",
      imgLabel: "Packed boxes in room",
       image:"/why-choose-us-bottom-6-img.png"
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-[var(--blue-900)] to-[var(--blue-800)] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pb-12 pt-24 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
            

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                <span className="hero-title-line block">Safe Moves.</span>
                <span className="hero-title-line block">Happy Customer.</span>
                <span className="hero-title-line block text-[var(--lime-400)]">
                  Every Time.
                </span>
              </h1>

              <p className="hero-subtitle text-[var(--blue-200)] text-sm lg:text-base leading-relaxed max-w-md">
                At MoveEasy Packers & Movers, we go the extra mile to deliver a
                moving experience that is safe, smooth and completely
                stress-free. Here&apos;s why thousands of customers trust us with
                their move.
              </p>
            </div>

            {/* Right Image */}
            <div className="hero-image-area relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden bg-[var(--blue-800)] bg-opacity-40  flex items-center justify-center">
              <img src="/why-coose-us-hero-img.png" alt="Team work"/>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={statsRef} className=" my-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-[var(--gray-100)] p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`stat-item flex items-center gap-4 ${idx !== stats.length-1 ? "sm:border-r" : ""} justify-center lg:justify-start`}
                >
                  <div
                    className={`w-8 h-8 sm:w-12 sm:h-12 ${stat.color} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[var(--blue-900)] font-bold text-sm sm:text-lg lg:text-xl">
                      {stat.value}
                    </p>
                    <p className="text-[var(--gray-500)] text-xs lg:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise / Top Reasons */}
      <section ref={promiseRef} className="py-3 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="promise-header text-center mb-12 lg:mb-16">
            <span className="text-[var(--lime-600)] text-sm font-bold tracking-wider uppercase mb-3 block">
              Our Promise
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--blue-900)]">
              Top Reasons To Choose{" "}
              <span className="text-[var(--lime-500)]">MoveEasy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2 lg:gap-y-4">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="reason-card flex flex-col sm:flex-row gap-5 lg:gap-6 items-start"
              >
                {/* Text Content */}
                <div className="sm:w-[40%] lg:w-[38%] flex flex-col">
                  <div
                    className={`w-11 h-11 ${reason.color} rounded-full flex items-center justify-center mb-3`}
                  >
                    <reason.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[var(--blue-900)] font-bold text-base lg:text-lg mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-[var(--gray-500)] text-xs lg:text-sm leading-relaxed">
                    {reason.desc}
                  </p>
                </div>

                {/* Image */}
                <div className="sm:w-[38%] lg:w-[52%] w-full">
                  <div className="rounded-xl lg:rounded-2xl bg-[var(--gray-100)] aspect-[4/3] flex items-center justify-center overflow-hidden">
                   <img src={reason.image} alt={reason.imgLabel} className="object-cover w-full h-auto"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Thousands */}
      <section ref={trustedRef} className="py-2 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="trusted-content bg-[var(--blue-900)] rounded-2xl lg:rounded-3xl p-4">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Left */}
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 bg-[var(--blue-800)] rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[var(--lime-500)]">
                  <Users className="w-6 h-6 text-white" />
                  <div className="absolute -bottom-1 -right-1 flex">
                    <Star className="w-3 h-3 text-[var(--lime-400)] fill-[var(--lime-400)]" />
                    <Star className="w-3 h-3 text-[var(--lime-400)] fill-[var(--lime-400)] -ml-0.5" />
                    <Star className="w-3 h-3 text-[var(--lime-400)] fill-[var(--lime-400)] -ml-0.5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">
                    Trusted By Thousands
                  </h3>
                  <p className="text-[var(--blue-200)] text-xs lg:text-sm leading-relaxed">
                    Our commitment to quality service, customer satisfaction and
                    careful handling has earned us trust and loyalty across the
                    country.
                  </p>
                </div>
              </div>

              {/* Center */}
              <div className="text-center lg:border-x lg:border-[var(--blue-700)] lg:px-8 py-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-white font-bold text-3xl lg:text-4xl">
                    4.8
                  </span>
                  <span className="text-[var(--blue-300)] text-lg font-medium">
                    /5
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 lg:w-5 lg:h-5 text-[var(--lime-400)] fill-[var(--lime-400)]"
                    />
                  ))}
                </div>
                <p className="text-[var(--blue-200)] text-xs">
                  Based on 2,500+ Reviews
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--blue-700)] border-2 border-[var(--blue-900)] flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 lg:w-5 lg:h-5 text-[var(--blue-300)]" />
                    </div>
                  ))}
                </div>
                <p className="text-[var(--blue-200)] text-xs lg:text-sm leading-relaxed max-w-[180px]">
                  Join thousands of happy customers who moved with ease!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        ref={footerRef}
        className="bg-[var(--lime-500)] my-3"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="footer-content flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[var(--lime-600)]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg lg:text-xl">
                  Ready For A Hassle-Free Move?
                </h3>
                <p className="text-white/80 text-sm">
                  Let our experts take care of everything.
                </p>
              </div>
            </div>

            {/* Center */}
            <Link
              href="/get-a-quote"
              className="bg-[var(--blue-900)] hover:bg-[var(--blue-800)] text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-colors group flex-shrink-0"
            >
              Get a Free Quote
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Right */}
            <div className="text-center lg:text-right flex-shrink-0">
              <div className="flex items-center justify-center lg:justify-end gap-2 mb-1">
                <Phone className="w-4 h-4 text-white" />
                <a
                  href="tel:18001234567"
                  className="text-white font-bold text-xl lg:text-2xl hover:text-[var(--blue-900)] transition-colors"
                >
                  1800 123 4567
                </a>
              </div>
              <p className="text-white/80 text-sm">support@moveeasy.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}