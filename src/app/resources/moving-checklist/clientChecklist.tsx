"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Home,
  Truck,
  Menu,
  X,
  Calendar,
  Shield,
  Clock,
  Package,
  Check,
  Download,
  ClipboardList,
  Tag,
  Trash2,
  MapPin,
  Send,
  FileCheck,
  Printer,
  Settings,
  Share2,
  Banknote,
} from "lucide-react";
import HeroSection from "@/components/services-hero-reusable/heroSection";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Services", href: "#" },
  { name: "Who Choose Us", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Reviews", href: "#" },
  { name: "Moving Checklist", href: "#", active: true },
  { name: "Blogs", href: "#" },
  { name: "Contact Us", href: "#" },
];

const heroFeatures = [
  { icon: Calendar, title: "Step-by-Step", subtitle: "Guide" },
  { icon: Shield, title: "Stay Organized", subtitle: "& Stress-Free" },
  { icon: Clock, title: "Save Time", subtitle: "& Effort" },
  { icon: Package, title: "Nothing", subtitle: "Left Behind" },
];

const floatingFeatures = [
  { icon: FileCheck, title: "Easy to Follow", subtitle: "Simple steps" },
  { icon: Printer, title: "Printable", subtitle: "Download & print" },
  { icon: Settings, title: "Customizable", subtitle: "For your needs" },
  { icon: Share2, title: "Shareable", subtitle: "With family & friends" },
];

const timelineSteps = [
  {
    num: "01",
    icon: Calendar,
    title: "4-6 Weeks",
    subtitle: "Before Moving",
    items: [
      "Create a moving binder",
      "Set your moving budget",
      "Research & hire trusted packers and movers",
      "Declutter and sort items",
      "Notify your landlord (if renting)",
      "Take inventory of valuable items",
    ],
    tip: "Start early to avoid last-minute stress.",
    tipColor: "border-l-(--lime-500) bg-(--lime-50)",
    tipText: "text-(--lime-700)",
    bgColor: "bg-(--stone-50)"
  },
  {
    num: "02",
    icon: Truck,
    title: "2-4 Weeks",
    subtitle: "Before Moving",
    items: [
      "Notify utilities for disconnection",
      "Update your address (bank, mail, subscriptions)",
      "Purchase packing materials",
      "Pack non-essential items",
      "Confirm moving date with movers",
    ],
    tip: "Early planning saves time and money.",
    tipColor: "border-l-(--blue-500) bg-(--blue-50)",
    tipText: "text-(--blue-700)",
     bgColor: "bg-(--blue-50)"
  },
  {
    num: "03",
    icon: Package,
    title: "1 Week",
    subtitle: "Before Moving",
    items: [
      "Pack remaining items",
      "Label all boxes clearly",
      "Confirm moving details with movers",
      "Prepare an essentials box",
      "Check whether appliances need defrosting/draining",
    ],
    tip: "Keep essentials separate and handy.",
    tipColor: "border-l-(--lime-500) bg-(--lime-50)",
    tipText: "text-(--lime-700)",
     bgColor: "bg-(--stone-50)"
  },
  {
    num: "04",
    icon: Truck,
    title: "Moving Day",
    subtitle: "",
    items: [
      "Wake up early and stay organized",
      "Supervise loading",
      "Keep important documents and valuables with you",
      "Do a final walk-through of your old home",
      "Ensure safe unloading at new location",
      "Check all items before signing off",
    ],
    tip: "Stay calm and coordinate with your moving team.",
    tipColor: "border-l-(--blue-500) bg-(--blue-50)",
    tipText: "text-(--blue-700)",
     bgColor: "bg-(--blue-50)"
  },
  {
    num: "05",
    icon: Home,
    title: "After Moving",
    subtitle: "",
    items: [
      "Unpack essentials first",
      "Check and set up utilities",
      "Inspect all items for any damages",
      "Update your address if missed",
      "Explore your new neighborhood",
    ],
    tip: "Take your time and settle in comfortably.",
    tipColor: "border-l-(--lime-500) bg-(--lime-50)",
    tipText: "text-(--lime-700)",
     bgColor: "bg-(--stone-50)"
  },
];

const movingTips = [
  { icon: Trash2, title: "Declutter First", text: "Get rid of what you don't need. Move only what matters." },
  { icon: Tag, title: "Label Everything", text: "Use clear labels for boxes to make unpacking easier." },
  { icon: Package, title: "Pack Smart", text: "Pack heavy items in small boxes and fragile items with care." },
  { icon: ClipboardList, title: "Keep Essentials Handy", text: "Always carry your must-have items separately." },
  { icon: Clock, title: "Plan Ahead", text: "A good plan today makes your move effortless tomorrow." },
];

export default function MovingChecklistPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
    

      {/* Hero Section */}
     <HeroSection
               title="Your Complete "
               highlightedTitle="Moving Checklist"
               description="A well-planned move starts with a checklist. Follow our step-by-step guide to stay organized and make your move smooth and stress-free."
        
               features={[
                 { icon: Shield, text: "Step-by-Step Guide", sub: "We move you anywhere in India" },
                 { icon: Clock, text: "Stay Organized & Stress-Free", sub: "Your goods are packed and transported safely" },
                 { icon: Package, text: "Save Time & Effort", sub: "Timely delivery, every time" },
                 { icon: Banknote, text: "Nothing Left Behind", sub: "We're here to help you, always" },
               ]}
               image={{ src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=500&fit=crop", alt: "blog hero image" }}
             />

      {/* Timeline Section */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-(--gray-900) text-2xl md:text-3xl font-bold mb-2">
              Your Moving Journey, <span className="text-(--lime-600)">Simplified</span>
            </h2>
            <p className="text-(--gray-500) text-sm md:text-base">Follow this timeline-based checklist and ensure a smooth moving experience.</p>
          </div>

          {/* Timeline Numbers */}
          <div className="hidden lg:flex items-center justify-between mb-8 px-8">
            {timelineSteps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-(--lime-500) rounded-full flex items-center justify-center text-white text-sm font-bold">{step.num}</div>
                </div>
                {idx < timelineSteps.length - 1 && <div className="flex-1 border-t-2 border-dashed border-(--gray-300) mx-4"></div>}
              </React.Fragment>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {timelineSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className={`${step.bgColor} rounded-xl border border-(--gray-200) p-5 flex flex-col`}>
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-12 h-12 bg-(--blue-50) rounded-full flex items-center justify-center mb-2">
                      <Icon className="w-6 h-6 text-(--blue-600)" />
                    </div>
                    <p className="text-(--gray-900) text-sm font-bold">{step.title}</p>
                    {step.subtitle && <p className="text-(--gray-500) text-xs">{step.subtitle}</p>}
                  </div>
                  <div className="space-y-2.5 flex-1">
                    {step.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 ">
                        <div className="w-4 h-4 border border-(--gray-300) rounded-sm flex-shrink-0 mt-0.5"></div>
                        <span className="text-(--gray-600) text-xs leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-4 p-3 rounded-lg border-l-4 text-xs font-medium ${step.tipColor} ${step.tipText}`}>Tip: {step.tip}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="bg-(--gray-50) py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-(--gray-200) p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-(--blue-50) rounded-xl flex items-center justify-center flex-shrink-0 relative">
                  <ClipboardList className="w-8 h-8 text-(--blue-600)" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-(--lime-500) rounded-full flex items-center justify-center">
                    <Download className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-(--gray-900) text-xl font-bold mb-1">Download Your Free</h3>
                  <h3 className="text-(--lime-600) text-xl font-bold mb-2">Moving Checklist</h3>
                  <p className="text-(--gray-500) text-sm max-w-sm">Get our printable checklist PDF and keep it handy for your big move.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="flex items-center gap-2 bg-(--blue-600) hover:bg-(--blue-700) text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors whitespace-nowrap">
                  Download Checklist <Download className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 text-(--gray-500) text-xs">
                  <Check className="w-4 h-4 text-(--lime-500)" /> 100% Free & Easy to Use
                </div>
              </div>

              <div className="hidden lg:block">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=150&fit=crop" alt="Moving boxes" className="w-32 h-24 object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Moving Tips */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--gray-900) text-2xl font-bold text-center mb-8">
            Helpful <span className="text-(--lime-600)">Moving Tips</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {movingTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.title} className="flex flex-col items-center text-center border p-2 rounded-xl border-(--stone-100)">
                  <div className="w-12 h-12 bg-(--blue-50) rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-(--blue-600)" />
                  </div>
                  <h4 className="text-(--gray-900) text-sm font-bold mb-2">{tip.title}</h4>
                  <p className="text-(--gray-500) text-xs leading-relaxed">{tip.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-(--blue-900) rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
                  <img src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=200&h=200&fit=crop" alt="Professional mover" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                    Let Us Handle the <span className="text-(--lime-400)">Heavy Lifting!</span>
                  </h3>
                  <p className="text-(--blue-200) text-sm max-w-md">Professional movers, timely service and complete care for a stress-free moving experience.</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <button className="flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors group whitespace-nowrap">
                  Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-(--blue-900) bg-(--gray-300)"></div>
                    ))}
                  </div>
                  <span className="text-(--blue-200) text-xs">Trusted by 10,000+ Happy Customers</span>
                </div>
              </div>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
              <Send className="w-32 h-32 text-(--lime-400)" />
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
}