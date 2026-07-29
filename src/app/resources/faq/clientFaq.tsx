"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Shield,
  CheckCircle2,
  Menu,
  X,
  Home,
  Truck,
  Plus,
  Minus,
  Users,
  MapPin,
  Star,
  Headphones,
  HelpCircle,
  CalendarDays,
  CreditCard,
  Package,
  MessageSquare,
  Settings,
  Clock,
} from "lucide-react";
import HeroSection from "@/components/services-hero-reusable/heroSection";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Services", href: "#" },
  { name: "Who Choose Us", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "FAQs", href: "#", active: true },
  { name: "Contact Us", href: "#" },
];

const categories = [
  { name: "All Questions", count: "View all", icon: MessageSquare, active: true },
  { name: "Booking & Pricing", count: "10 Questions", icon: CalendarDays },
  { name: "Services", count: "12 Questions", icon: Settings },
  { name: "Moving Process", count: "8 Questions", icon: Package },
  { name: "Payment", count: "6 Questions", icon: CreditCard },
  { name: "Safety & Insurance", count: "7 Questions", icon: Shield },
  { name: "General", count: "5 Questions", icon: HelpCircle },
];

const faqs = [
  {
    id: 1,
    question: "How do I get a quote for my move?",
    answer:
      "You can get a free quote by filling out our online form, calling us at 1800 123 4567, or WhatsApp us your moving details. We'll provide a transparent and competitive quote.",
  },
  {
    id: 2,
    question: "What information do I need to provide for a quote?",
    answer:
      "Please provide your current and destination addresses, the size of your home, list of major items, preferred moving date, and any special requirements like fragile items or storage needs.",
  },
  {
    id: 3,
    question: "Do you charge extra for stairs or long-distance moves?",
    answer:
      "Stair charges may apply for buildings without elevators. Long-distance moves are priced based on distance and volume. We provide all costs upfront with no hidden fees.",
  },
  {
    id: 4,
    question: "How far in advance should I book my move?",
    answer:
      "We recommend booking at least 2-4 weeks in advance for local moves and 4-6 weeks for interstate moves. However, we do accommodate last-minute moves when possible.",
  },
  {
    id: 5,
    question: "Is insurance included in the moving cost?",
    answer:
      "Basic liability coverage is included in all moves. We also offer full-value protection plans for complete peace of mind during your relocation.",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, credit/debit cards, bank transfers, UPI, and digital wallets. Payment can be made in installments for large moves.",
  },
  {
    id: 7,
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Yes, you can reschedule or cancel up to 48 hours before your move without any penalty. Cancellations within 48 hours may incur a small fee.",
  },
  {
    id: 8,
    question: "Do you provide packing materials?",
    answer:
      "Yes, we provide high-quality packing materials including boxes, bubble wrap, tape, and protective covers. These can be included in your quote or purchased separately.",
  },
  {
    id: 9,
    question: "Do you move fragile or valuable items?",
    answer:
      "Absolutely. Our team is specially trained to handle fragile items, antiques, artwork, and electronics with extra care and custom packaging solutions.",
  },
  {
    id: 10,
    question: "What areas do you serve?",
    answer:
      "We serve all major cities and surrounding areas across the country. Contact us to confirm service availability for your specific location.",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers", icon: Users },
  { value: "15,000+", label: "Successful Moves", icon: Truck },
  { value: "200+", label: "Cities Covered", icon: MapPin },
  { value: "99%", label: "On-Time Delivery", icon: CheckCircle2 },
  { value: "4.8/5", label: "Customer Rating", icon: Star },
];

export default function FAQPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState("All Questions");

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
   

      {/* Hero Section */}
     <HeroSection
               title="Frequently Asked "
               highlightedTitle="Questions"
               description="Find answers to common questions about our services, pricing, and moving process."
        
               features={[
                 { icon: Shield, text: "Clear Answers", sub: "Get quick solutions to your queries" },
                 { icon: Clock, text: "Trusted Service", sub: "We prioritize safety and satisfaction" },
                 { icon: Package, text: "24/7 Support", sub: "Still have questions? We are here to help" },
                 
               ]}
               image={{ src: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=700&h=500&fit=crop", alt: "FAQ hero image" }}
             />

      {/* Browse Questions By Category */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--gray-900) text-2xl font-bold text-center mb-6">
            Browse Questions By Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all text-center ${
                    isActive
                      ? "bg-(--blue-900) text-white border-(--blue-900)"
                      : "bg-white text-(--gray-700) border-(--gray-200) hover:border-(--blue-600) hover:text-(--blue-600)"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-(--lime-400)" : "text-(--gray-500)"}`} />
                  <span className="text-sm font-semibold leading-tight">{cat.name}</span>
                  <span className={`text-xs ${isActive ? "text-(--blue-200)" : "text-(--gray-400)"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-(--gray-50) py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-(--gray-200) p-6 sticky top-4">
                <div className="w-16 h-16 bg-(--blue-50) rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-(--blue-600)" />
                </div>
                <h3 className="text-(--gray-900) text-xl font-bold mb-1">
                  Can&apos;t Find
                </h3>
                <h3 className="text-(--gray-900) text-xl font-bold mb-1">
                  What You&apos;re
                </h3>
                <h3 className="text-(--lime-600) text-xl font-bold mb-3">
                  Looking For?
                </h3>
                <p className="text-(--gray-500) text-sm mb-6">
                  Our support team is here to help you with any questions you may have.
                </p>
                <button className="w-full flex items-center justify-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white px-4 py-3 rounded-full font-semibold text-sm transition-colors group mb-6">
                  Contact Support
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="space-y-4 pt-4 border-t border-(--gray-100)">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-(--blue-50) rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-(--blue-600)" />
                    </div>
                    <div>
                      <p className="text-(--gray-900) text-sm font-semibold">1800 123 4567</p>
                      <p className="text-(--gray-400) text-xs">Mon - Sun (8:00 AM - 8:00 PM)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-(--blue-50) rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-(--blue-600)" />
                    </div>
                    <div>
                      <p className="text-(--gray-900) text-sm font-semibold">support@moveeasy.com</p>
                      <p className="text-(--gray-400) text-xs">We reply within 15 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-(--blue-50) rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-(--blue-600)" />
                    </div>
                    <div>
                      <p className="text-(--gray-900) text-sm font-semibold">Chat on WhatsApp</p>
                      <p className="text-(--gray-400) text-xs">Quick response</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-(--gray-200) p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-(--gray-900) text-lg font-bold">All Questions</h3>
                  <span className="text-(--gray-400) text-sm">10+ Questions</span>
                </div>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-(--gray-200) rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center gap-4 p-4 text-left hover:bg-(--gray-50) transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-(--lime-500)">
                          {openFaq === faq.id ? (
                            <Minus className="w-4 h-4 text-white" />
                          ) : (
                            <Plus className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-(--gray-900) text-sm font-semibold flex-1">
                          {faq.question}
                        </span>
                      </button>
                      {openFaq === faq.id && (
                        <div className="px-4 pb-4 pl-16">
                          <p className="text-(--gray-500) text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions Banner */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-(--blue-900) rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-(--blue-800) rounded-xl flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop"
                    alt="Moving box"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">
                    Still Have Questions?
                  </h3>
                  <p className="text-(--blue-200) text-sm max-w-md">
                    We&apos;re here to help you 24/7. Reach out to our friendly team and get all the answers you need.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors group whitespace-nowrap">
                  Talk to Our Expert
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="w-12 h-12 bg-(--blue-800) rounded-full flex items-center justify-center hidden sm:flex">
                  <Headphones className="w-6 h-6 text-(--lime-400)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-(--blue-50) rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-(--blue-600)" />
                  </div>
                  <div>
                    <p className="text-(--gray-900) text-lg font-bold">{stat.value}</p>
                    <p className="text-(--gray-500) text-xs">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Contact Bar */}
      <footer className="bg-(--blue-900) relative py-4">
        <div className="absolute left-4 top-4 bottom-4 w-8 opacity-20 hidden md:block">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`left-${i}`}
                className="w-1.5 h-1.5 rounded-full bg-(--lime-400)"
              ></div>
            ))}
          </div>
        </div>
        <div className="absolute right-4 top-4 bottom-4 w-8 opacity-20 hidden md:block">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`right-${i}`}
                className="w-1.5 h-1.5 rounded-full bg-(--lime-400)"
              ></div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <a
                  href="tel:18001234567"
                  className="text-white font-bold text-lg block"
                >
                  1800 123 4567
                </a>
                <p className="text-(--blue-300) text-xs">
                  Mon - Sun (8:00 AM - 8:00 PM)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:border-l md:border-r border-(--blue-800) md:px-6">
              <div className="w-12 h-12 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <a
                  href="mailto:support@moveeasy.com"
                  className="text-white font-bold text-sm block"
                >
                  support@moveeasy.com
                </a>
                <p className="text-(--blue-300) text-xs">
                  We reply within 15 minutes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Chat on WhatsApp</h4>
                <p className="text-(--blue-300) text-xs">
                  Get quick response
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}