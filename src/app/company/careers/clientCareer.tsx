"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  Users,
  Star,
  Target,
  Trophy,
  Shield,
  Banknote,
  Calendar,
  Award,
  Briefcase,
  ArrowRight,
  Home,
  Truck,
  MapPin,
  Clock,
  PartyPopper,
  GraduationCap,
  Gamepad2,
  CheckCircle2,
  Send,
  ChevronRight,
} from "lucide-react";
import { BsBag } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

export default function Careers() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cultureRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const openingsRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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
          ".hero-btn",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.7,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".hero-image",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
        );

        // Culture bar
        gsap.fromTo(
          ".culture-card",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: cultureRef.current,
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

        // Benefits
        gsap.fromTo(
          ".benefit-card",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          }
        );

        // Why section
        gsap.fromTo(
          ".why-image",
          { opacity: 0, x: -40 },
          {
            scrollTrigger: {
              trigger: whyRef.current,
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
          ".why-content",
          { opacity: 0, x: 40 },
          {
            scrollTrigger: {
              trigger: whyRef.current,
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

        // Openings
        gsap.fromTo(
          ".job-card",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: openingsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".life-card",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: openingsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: "power2.out",
          }
        );

        // Resume banner
        gsap.fromTo(
          ".resume-content",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: resumeRef.current,
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
          ".footer-content",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 95%",
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

  const cultureCards = [
    {
      icon: Users,
      title: "Grow With Us",
      desc: "Build skills, gain experience and grow with every opportunity.",
    },
    {
      icon: Star,
      title: "Great Culture",
      desc: "A supportive and inclusive environment that feels like family.",
    },
    {
      icon: Target,
      title: "Make an Impact",
      desc: "Be part of a team that makes a real difference every single day.",
    },
    {
      icon: Trophy,
      title: "Bright Future",
      desc: "We invest in your growth today for a better tomorrow.",
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Grow With Us",
      desc: "Learning & development opportunities and every step.",
      color: "bg-(--blue-900)",
    },
    {
      icon: Star,
      title: "Great Culture",
      desc: "A positive, supportive and inclusive work environment.",
      color: "bg-(--lime-500)",
    },
    {
      icon: Shield,
      title: "Job Security",
      desc: "Be part of a stable and trusted brand.",
      color: "bg-(--blue-900)",
    },
    {
      icon: Banknote,
      title: "Competitive Benefits",
      desc: "Attractive salary, incentives and performance rewards.",
      color: "bg-(--lime-500)",
    },
    {
      icon: Calendar,
      title: "Work-Life Balance",
      desc: "We respect your time and personal life.",
      color: "bg-(--blue-900)",
    },
    {
      icon: Award,
      title: "Recognition",
      desc: "Your hard work doesn't go unnoticed.",
      color: "bg-(--lime-500)",
    },
  ];

  const jobs = [
    {
      title: "Sales & Marketing Executive",
      location: "Jaipur, Rajasthan",
      exp: "1-3 Years Experience",
    },
    {
      title: "Customer Support Executive",
      location: "Jaipur, Rajasthan",
      exp: "0-2 Years Experience",
    },
    {
      title: "Operation Executive",
      location: "Jaipur, Rajasthan",
      exp: "1-3 Years Experience",
    },
    {
      title: "Warehouse Executive",
      location: "Jaipur, Rajasthan",
      exp: "0-2 Years Experience",
    },
  ];

  const lifeActivities = [
    { icon: Users, label: "Team Outings" },
    { icon: PartyPopper, label: "Celebrations" },
    { icon: GraduationCap, label: "Training Sessions" },
    { icon: Gamepad2, label: "Fun Activities" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-(--blue-900) to-(--blue-800) overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="hero-label flex items-center gap-3 mb-6">
                <span className="text-(--lime-400) text-sm font-bold tracking-wider uppercase">
                  Careers
                </span>
                <div className="h-px w-12 bg-(--lime-400) opacity-60" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                <span className="hero-title-line block">Build Your Career.</span>
                <span className="hero-title-line block text-(--lime-400)">
                  Move Lives Forward.
                </span>
              </h1>

              <p className="hero-text text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-8">
                At Om Sai, we don&apos;t just move belongings, we move
                people&apos;s lives and careers forward. If you&apos;re passionate, driven
                and ready to grow, you&apos;re in the right place!
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  className="hero-btn inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors group"
                >
                  View Open Positions
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#"
                  className="hero-btn inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium px-6 py-3 rounded-full text-sm transition-colors group"
                >
                  Life at Om Sai
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                      Team celebrating together
                    </p>
                    <p className="text-(--gray-400) text-xs mt-1">
                      Replace with actual image
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lime Curve Decoration */}
        <div
          className="absolute bottom-0 right-0 w-48 h-24 lg:w-80 lg:h-40 bg-(--lime-500)"
          style={{
            clipPath: "ellipse(90% 100% at 100% 100%)",
          }}
        />
      </section>

      {/* ===== CULTURE BAR ===== */}
      <section ref={cultureRef} className="   ">
        <div className="max-w-7xl mx-auto bg-(--blue-900) rounded-xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {cultureCards.map((card, idx) => (
              <div
                key={idx}
                className="culture-card flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">
                    {card.title}
                  </h3>
                  <p className="text-(--blue-200) text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS GRID ===== */}
      <section ref={benefitsRef} className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="benefit-card text-center p-5 lg:p-6 rounded-xl border border-(--gray-100) hover:shadow-lg hover:border-(--blue-200) transition-all group"
              >
                <div
                  className={`w-12 h-12 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                >
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-(--blue-900) font-bold text-sm mb-2 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-(--gray-500) text-xs leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY BUILD YOUR CAREER WITH US ===== */}
      <section ref={whyRef} className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Image */}
            <div className="why-image">
              <div className="rounded-2xl overflow-hidden bg-(--gray-200) aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <Users className="w-16 h-16 text-(--gray-400) mx-auto mb-3" />
                  <p className="text-(--gray-500) text-sm">
                    Team collaborating on laptop
                  </p>
                  <p className="text-(--gray-400) text-xs mt-1">
                    Replace with actual image
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="why-content">
              <span className="text-(--lime-600) text-xs font-bold tracking-wider uppercase mb-3 block">
                Why Build Your Career With Us?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--blue-900) leading-tight mb-4">
                We Invest in People <br />
                Who <span className="text-(--lime-500)">Move</span> the Future
              </h2>
              <div className="w-12 h-1 bg-(--lime-500) mb-6" />

              <p className="text-(--gray-600) text-sm leading-relaxed mb-8">
                At Om Sai Packers & Movers, our people are our biggest strength.
                We empower our team to learn, grow and take on new challenges.
                Here, your ideas matter and your career truly moves forward.
              </p>

              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                {[
                  { icon: Users, value: "100+", label: "Team Members" },
                  { icon: Shield, value: "10+", label: "Years of Trust" },
                  { icon: MapPin, value: "200+", label: "Cities Covered" },
                ].map((stat, idx, array) => (
                  <div key={idx} className={`flex items-center gap-4  ${ idx !== array.length-1 ? "border-r-2" : ""}`}>
                    <div className="w-10 h-10 bg-(--blue-900) rounded-full flex items-center justify-center   mb-2">
                      <stat.icon className="w-5 h-5 text-white" />
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
          </div>
        </div>
      </section>

      {/* ===== CURRENT OPENINGS + LIFE AT Om Sai ===== */}
      <section ref={openingsRef} className=" bg-white">
        <div className="absolute top-0 right-0 z-20 bg-(--lime-400)">
            <BsBag/>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Current Openings */}
            <div className="bg-(--blue-900) p-6 rounded-xl">
              <div className="mb-6 ">
                <h2 className="text-2xl sm:text-3xl font-bold text-(--gray-50) mb-1">
                  Current <span className="text-(--lime-500)">Openings</span>
                </h2>
                <p className="text-(--gray-50) text-sm">
                  Explore exciting career opportunities and be a part of our
                  journey.
                </p>
              </div>

              <div className="space-y-4">
                {jobs.map((job, idx) => (
                  <div
                    key={idx}
                    className="job-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl border border-(--gray-200) hover:border-(--blue-300) hover:shadow-md transition-all bg-white"
                  >
                    <div>
                      <h3 className="text-(--blue-900) font-bold text-sm mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-(--gray-500)">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {job.exp}
                        </span>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 bg-(--lime-50)  border border-(--lime-500) hover:border-(--lime-600) text-(--lime-500) hover:text-(--lime-600) text-xs font-semibold px-4 py-2 rounded-full transition-colors group flex-shrink-0 self-start sm:self-center"
                    >
                      Apply Now
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 mt-6 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors group"
              >
                View All Openings
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right - Life at Om Sai */}
            <div className="border border-(--stone-100) p-6 rounded-xl">
              <div className="mb-6 ">
                <h2 className="text-2xl sm:text-3xl font-bold text-(--blue-900) mb-1">
                  Life at <span className="text-(--lime-500)">Om Sai</span>
                </h2>
                <p className="text-(--gray-500) text-sm">
                  A team that works together, celebrates together.
                </p>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="life-card rounded-xl bg-(--gray-100) aspect-[2/1] flex items-center justify-center overflow-hidden"
                  >
                    <div className="text-center p-4">
                      <Users className="w-8 h-8 text-(--gray-400) mx-auto mb-1" />
                      <p className="text-(--gray-400) text-[10px]">
                        Team photo {idx + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {lifeActivities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="life-card bg-(--stone-100) flex flex-col items-center text-center p-3 lg:p-4 rounded-lg border border-(--gray-100) hover:border-(--blue-200) hover:shadow-sm transition-all"
                  >
                    <activity.icon className="w-5 h-5 text-(--blue-900) mb-1.5" />
                    <span className="text-(--blue-900) text-xs font-medium">
                      {activity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEND RESUME BANNER ===== */}
      <section ref={resumeRef} className="py-2 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="resume-content bg-(--blue-900) rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-4 right-8 lg:right-16 opacity-10">
              <Send className="w-16 h-16 lg:w-24 lg:h-24 text-(--lime-500) rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">
                    Don&apos;t see the right role?
                  </h3>
                  <p className="text-(--blue-200) text-sm max-w-md">
                    We&apos;re always looking for talented people. Send us your resume
                    and we&apos;ll reach out when the right opportunity comes up.
                  </p>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors group flex-shrink-0"
              >
                Send Your Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER CONTACT BAR ===== */}
      <footer
        ref={footerRef}
        className="bg-(--lime-500) py-4 mb-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="footer-content flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-(--lime-600)" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg lg:text-xl">
                  Have Questions?
                </h3>
                <p className="text-white/80 text-sm">
                  We&apos;re here to help!
                </p>
              </div>
            </div>

            {/* Center */}
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-white" />
              <div>
                <a
                  href="tel:18001234567"
                  className="text-white font-bold text-xl lg:text-2xl hover:text-(--blue-900) transition-colors"
                >
                  1800 123 4567
                </a>
                <p className="text-white/80 text-xs">
                  Mon - Sun (8:00 AM - 8:00 PM)
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-(--lime-600)" />
              </div>
              <div>
                <a
                  href="mailto:careers@omsai.com"
                  className="text-white font-bold text-sm lg:text-base hover:text-(--blue-900) transition-colors"
                >
                  careers@omsai.com
                </a>
                <p className="text-white/80 text-xs">
                  We&apos;d love to hear from you
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}