"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Shield,
  Clock,
  Banknote,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ChevronRight,
  ShieldCheck,
  Users,
  Truck,
  Tag,
  Headphones,
  Menu,
  X,
  Home,
  Briefcase,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered before calculating positions
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hero entrance animations (no ScrollTrigger - immediate)
        gsap.fromTo(
          ".hero-label",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-feature",
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
          ".hero-image-area",
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          ".hero-curve",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "power2.out" }
        );

        // Contact section - FROMTO with explicit visibility
        gsap.fromTo(
          ".contact-form-card",
          { opacity: 0, x: -60 },
          {
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".contact-info-panel",
          { opacity: 0, x: 60 },
          {
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".info-card",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: "power2.out",
          }
        );

        // Map section
        gsap.fromTo(
          ".map-left-panel",
          { opacity: 0, x: -40 },
          {
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".map-right-area",
          { opacity: 0, x: 40 },
          {
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
          }
        );

        // Trust badges - FROMTO ensures visibility
        gsap.fromTo(
          ".trust-badge",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: trustRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
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

        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully! Our team will contact you shortly.");
  };

  const navLinks = [
    { name: "Home", active: false },
    { name: "About Us", active: false },
    { name: "Services", active: false },
    { name: "Why Us", active: false },
    { name: "Gallery", active: false },
    { name: "Blog", active: false },
    { name: "Contact Us", active: true },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
    

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-4 bg-gradient-to-br from-[var(--blue-900)] to-[var(--blue-800)] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-white rounded-full" />
          <div className="absolute top-1/3 right-1/3 w-16 h-16 border border-white rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <span className="hero-label inline-block text-[var(--lime-400)] text-sm font-bold tracking-wider uppercase mb-4">
                Contact Us
              </span>
              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                We&apos;re Here to Help <br />
                <span className="text-[var(--lime-400)]">You Move,</span>{" "}
                Stress-Free!
              </h1>
              <p className="hero-subtitle text-[var(--blue-200)] text-base lg:text-lg mb-10 max-w-lg">
                Have questions or need help with your move? Get in touch with our
                expert team — we&apos;re just a call or message away!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
                {[
                  {
                    icon: Phone,
                    title: "Quick Response",
                    desc: "We reply within minutes",
                  },
                  {
                    icon: Shield,
                    title: "Trusted Support",
                    desc: "100% reliable and friendly team",
                  },
                  {
                    icon: Clock,
                    title: "24/7 Assistance",
                    desc: "We are always here for you",
                  },
                  {
                    icon: Banknote,
                    title: "Best Solutions",
                    desc: "Customized moving solutions for you",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="hero-feature text-center sm:text-left"
                  >
                    <div className="w-12 h-12 mx-auto sm:mx-0 bg-[var(--lime-500)] rounded-full flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--blue-200)] text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-image-area relative hidden lg:block">
              <div className="relative z-10">
                <div className="relative rounded-2xl overflow-hidden bg-[var(--blue-800)] bg-opacity-50 aspect-[4/3] flex items-center justify-center">
                  <div className="text-center p-8">
                    <Truck className="w-24 h-24 text-[var(--blue-300)] mx-auto mb-4" />
                    <p className="text-[var(--blue-200)] text-sm">
                      Movers with Truck Image
                    </p>
                    <p className="text-[var(--blue-300)] text-xs mt-2">
                      Replace with your actual image
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[var(--lime-400)]" />
                      <span className="text-white font-bold text-sm">
                        MoveEasy
                      </span>
                    </div>
                    <span className="text-[var(--blue-200)] text-[10px]">
                      PACKERS & MOVERS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hero-curve absolute bottom-0 right-0 w-64 h-32 lg:w-96 lg:h-48 bg-[var(--lime-500)]"
          style={{
            clipPath: "ellipse(90% 100% at 100% 100%)",
          }}
        />
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-4  bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="contact-form-card lg:col-span-3">
              <div className="bg-[var(--blue-900)] rounded-2xl p-6 sm:p-8 lg:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Send Us a{" "}
                  <span className="text-[var(--lime-400)]">Message</span>
                </h2>
                <p className="text-[var(--blue-200)] text-sm mb-8">
                  Fill out the form and our team will get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-400)]" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-[var(--gray-200)] text-[var(--gray-800)] placeholder-[var(--gray-400)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--lime-500)]"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-400)]" />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-[var(--gray-200)] text-[var(--gray-800)] placeholder-[var(--gray-400)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--lime-500)]"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-400)]" />
                    <input
                      type="tel"
                      placeholder="Your Phone Number"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-[var(--gray-200)] text-[var(--gray-800)] placeholder-[var(--gray-400)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--lime-500)]"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-400)]" />
                    <select
                      className="w-full pl-10 pr-10 py-3 rounded-lg bg-white border border-[var(--gray-200)] text-[var(--gray-600)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--lime-500)] appearance-none cursor-pointer"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                    >
                      <option value="">Service You Need</option>
                      <option value="home">Home Shifting</option>
                      <option value="office">Office Relocation</option>
                      <option value="vehicle">Vehicle Transport</option>
                      <option value="packing">Packing & Unpacking</option>
                      <option value="storage">Storage Services</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronRight className="w-4 h-4 text-[var(--gray-400)] rotate-90" />
                    </div>
                  </div>

                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-[var(--gray-400)]" />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-[var(--gray-200)] text-[var(--gray-800)] placeholder-[var(--gray-400)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--lime-500)] resize-none"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--lime-500)] hover:bg-[var(--lime-600)] text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors group"
                  >
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            {/* Get In Touch */}
            <div className="contact-info-panel lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--blue-900)] mb-2">
                Get In Touch
              </h2>
              <p className="text-[var(--gray-500)] text-sm mb-8">
                We&apos;re available through multiple channels.
              </p>

              <div className="space-y-4">
                <div className="info-card flex items-start gap-4 p-4 rounded-xl border border-[var(--gray-200)] hover:border-[var(--blue-300)] hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-[var(--blue-900)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[var(--lime-600)] text-xs font-semibold mb-0.5">
                      Call Us
                    </p>
                    <a
                      href="tel:18001234567"
                      className="text-[var(--blue-900)] font-bold text-lg hover:text-[var(--blue-700)] transition-colors"
                    >
                      1800 123 4567
                    </a>
                    <p className="text-[var(--gray-500)] text-xs mt-0.5">
                      Mon - Sun (8:00 AM - 8:00 PM)
                    </p>
                  </div>
                </div>

                <div className="info-card flex items-start gap-4 p-4 rounded-xl border border-[var(--gray-200)] hover:border-[var(--lime-400)] hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-[var(--lime-500)] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[var(--lime-600)] text-xs font-semibold mb-0.5">
                      WhatsApp Us
                    </p>
                    <a
                      href="https://wa.me/9876543210"
                      className="text-[var(--blue-900)] font-bold text-lg hover:text-[var(--blue-700)] transition-colors"
                    >
                      98765 43210
                    </a>
                    <p className="text-[var(--gray-500)] text-xs mt-0.5">
                      Chat with us on WhatsApp
                    </p>
                  </div>
                </div>

                <div className="info-card flex items-start gap-4 p-4 rounded-xl border border-[var(--gray-200)] hover:border-[var(--blue-300)] hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-[var(--blue-900)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[var(--lime-600)] text-xs font-semibold mb-0.5">
                      Email Us
                    </p>
                    <a
                      href="mailto:support@moveeasy.com"
                      className="text-[var(--blue-900)] font-bold text-lg hover:text-[var(--blue-700)] transition-colors"
                    >
                      support@moveeasy.com
                    </a>
                    <p className="text-[var(--gray-500)] text-xs mt-0.5">
                      We reply within 15 minutes
                    </p>
                  </div>
                </div>

                <div className="info-card flex items-start gap-4 p-4 rounded-xl border border-[var(--gray-200)] hover:border-[var(--blue-300)] hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-[var(--lime-500)] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[var(--lime-600)] text-xs font-semibold mb-0.5">
                      Our Office
                    </p>
                    <p className="text-[var(--blue-900)] font-semibold text-sm">
                      123, MoveEasy Tower, Transport Nagar,
                    </p>
                    <p className="text-[var(--blue-900)] font-semibold text-sm">
                      Jaipur, Rajasthan - 302018
                    </p>
                    <p className="text-[var(--gray-500)] text-xs mt-0.5">
                      Visit us anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-2 lg:py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-[var(--gray-200)]">
            <div className="grid lg:grid-cols-3">
              <div className="map-left-panel bg-[var(--blue-900)] p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-10 left-8 opacity-20">
                  <MapPin className="w-8 h-8 text-[var(--lime-500)]" />
                </div>
                <div className="absolute bottom-16 left-16 opacity-20">
                  <MapPin className="w-6 h-6 text-[var(--lime-500)]" />
                </div>
                <div className="absolute top-1/2 right-8 opacity-20">
                  <MapPin className="w-10 h-10 text-[var(--lime-500)]" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    We Serve Across
                  </h3>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[var(--lime-400)] mb-6">
                    200+ Cities
                  </h3>
                  <p className="text-[var(--blue-200)] text-sm mb-8">
                    Wherever you are, we&apos;ll be there.
                  </p>

                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 60, 30, 80, 50, 70, 45, 55].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 bg-[var(--lime-500)] rounded-full opacity-60"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="map-right-area lg:col-span-2 relative bg-[var(--gray-100)] min-h-[300px] lg:min-h-[400px]">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=75.78%2C26.87%2C75.82%2C26.91&layer=mapnik&marker=26.89%2C75.80"
                  className="absolute inset-0 w-full h-full border-0"
                  title="MoveEasy Office Location"
                />
                <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-4 max-w-[220px]">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-[var(--blue-900)] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[var(--lime-400)]" />
                    </div>
                    <div>
                      <p className="text-[var(--blue-900)] font-bold text-xs">
                        MoveEasy Packers & Movers
                      </p>
                      <p className="text-[var(--gray-500)] text-[10px] mt-1 leading-relaxed">
                        123, MoveEasy Tower, Transport Nagar, Jaipur, Rajasthan -
                        302018
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section ref={trustRef} className="py-3 lg:py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Safe & Secure",
                desc: "Your belongings are in safe hands.",
                color: "bg-[var(--blue-900)]",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "Trained professionals for a smooth move.",
                color: "bg-[var(--lime-500)]",
              },
              {
                icon: Truck,
                title: "Timely Delivery",
                desc: "On-time pickup and delivery, always.",
                color: "bg-[var(--blue-900)]",
              },
              {
                icon: Tag,
                title: "Affordable Pricing",
                desc: "Best rates with no hidden charges.",
                color: "bg-[var(--lime-500)]",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Round-the-clock customer support.",
                color: "bg-[var(--blue-900)]",
              },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="trust-badge text-center p-6 rounded-xl border border-[var(--gray-200)] hover:shadow-lg hover:border-[var(--blue-200)] transition-all group"
              >
                <div
                  className={`w-14 h-14 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <badge.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[var(--blue-900)] font-bold text-sm mb-2">
                  {badge.title}
                </h3>
                <p className="text-[var(--gray-500)] text-xs leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        ref={footerRef}
        className="bg-[var(--blue-900)] mb-4 relative overflow-hidden"
      >
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-2">
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="w-1.5 h-1.5 rounded-full bg-[var(--lime-500)] opacity-40"
                />
              ))}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="footer-content flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--lime-500)] rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg lg:text-xl">
                  Ready to Move?
                </h3>
                <p className="text-[var(--blue-200)] text-sm">
                  Let&apos;s make your move easy and hassle-free!
                </p>
              </div>
            </div>

            <a
              href="#"
              className="bg-[var(--lime-500)] hover:bg-[var(--lime-600)] text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-colors group"
            >
              Get a Free Quote
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="text-center lg:text-right">
              <a
                href="tel:18001234567"
                className="text-white font-bold text-xl lg:text-2xl hover:text-[var(--lime-400)] transition-colors"
              >
                1800 123 4567
              </a>
              <p className="text-[var(--blue-200)] text-sm mt-1">
                support@moveeasy.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}