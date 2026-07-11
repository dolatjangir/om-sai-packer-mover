"use client";

import React from "react";
import {
  ArrowRight,
  Phone,
  Shield,
  Zap,
  MapPin,
  Bike,
  Package,
  Clock,
  Weight,
  FileText,
  ShoppingBag,
  Stethoscope,
  Gift,
  Wrench,
  ClipboardList,
  IndianRupee,
  Users,
  Headphones,
  Star,
  CheckCircle2,
  LocateFixed,
  Globe,
} from "lucide-react";
import StatsBar from "@/components/statsBar";

const heroFeatures = [
  { icon: Zap, title: "Super Fast", subtitle: "Quick pickup & delivery" },
  { icon: Shield, title: "Safe & Secure", subtitle: "Your items are in safe hands" },
  { icon: MapPin, title: "Live Tracking", subtitle: "Track your order in real-time" },
];

const specs = [
  { icon: Bike, label: "Vehicle Type", value: "Bike" },
  { icon: Package, label: "Ideal For", value: "Small Parcels, Documents" },
  { icon: Clock, label: "Delivery Time", value: "Same Day / Express" },
  { icon: MapPin, label: "Service Area", value: "200+ Cities in India" },
  { icon: Weight, label: "Max Weight", value: "Up to 15 KG" },
];

const useCases = [
  { icon: FileText, title: "Documents", subtitle: "Important papers & legal documents" },
  { icon: Package, title: "Small Parcels", subtitle: "Small packages & shipments" },
  { icon: ShoppingBag, title: "E-commerce Orders", subtitle: "Online orders & COD shipments" },
  { icon: Stethoscope, title: "Medical Supplies", subtitle: "Medicine & lab sample deliveries" },
  { icon: Gift, title: "Gifts & Flowers", subtitle: "Send gifts, flowers & surprises" },
  { icon: Wrench, title: "Spare Parts", subtitle: "Auto parts & small machine parts" },
];

const howItWorks = [
  { num: "1", icon: ClipboardList, title: "Book Your Order", text: "Provide pickup & delivery details online or via call." },
  { num: "2", icon: Bike, title: "We Pickup", text: "Our rider picks up your parcel from your location." },
  { num: "3", icon: LocateFixed, title: "On The Way", text: "Real-time tracking to monitor your parcel on the go." },
  { num: "4", icon: Package, title: "Safe Delivery", text: "We deliver your parcel safely & on time." },
];

const whyChoose = [
  { icon: Zap, title: "Lightning Fast", subtitle: "Quick delivery for your urgent shipments" },
  { icon: IndianRupee, title: "Affordable Pricing", subtitle: "Best rates for short distance deliveries" },
  { icon: MapPin, title: "Live Tracking", subtitle: "Track your parcel in real-time" },
  { icon: Users, title: "Trained Riders", subtitle: "Verified & experienced delivery partners" },
  { icon: Shield, title: "Safe Handling", subtitle: "Your parcels are in safe hands" },
  { icon: Globe, title: "Wide Coverage", subtitle: "Service available in 200+ cities" },
];

const stats = [
  { value: "10,000+", label: "Happy Customers", icon: Users },
  { value: "200+", label: "Cities Covered", icon: MapPin },
  { value: "99%", label: "On-Time Delivery", icon: CheckCircle2 },
  { value: "4.8/5", label: "Customer Rating", icon: Star },
  { value: "24/7", label: "Customer Support", icon: Headphones },
];

export default function BikeCourierPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-(--blue-900) relative overflow-hidden py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="py-4">
              <div className="flex items-center gap-2 text-(--blue-300) text-sm mb-4">
                <span>Home</span><span>&gt;</span><span>Fleet</span><span>&gt;</span><span className="text-white">Bike Courier</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">Bike Courier</h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--lime-400) mb-4 leading-tight">Fast. Reliable. Always On Time.</h1>
              <p className="text-(--blue-200) text-base md:text-lg mb-6 max-w-lg">
                Our Bike Courier service is perfect for small parcels, documents and urgent deliveries. Quick pickup, safe delivery and real-time tracking – right to your doorstep.
              </p>
              <div className="flex flex-wrap gap-4">
                {heroFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div key={feat.title} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{feat.title}</p>
                        <p className="text-(--blue-300) text-xs">{feat.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=700&h=450&fit=crop" alt="Bike Courier" className="w-full h-auto object-contain" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-[16px] border-(--lime-500) rounded-full opacity-80"></div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 border-[8px] border-(--lime-400) rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Bar */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {specs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div key={spec.label} className="flex items-center gap-3 p-4 border border-(--gray-200) rounded-xl">
                  <Icon className="w-6 h-6 text-(--blue-600) flex-shrink-0" />
                  <div>
                    <p className="text-(--blue-500) text-xs">{spec.label}</p>
                    <p className="text-(--blue-900) text-sm font-semibold">{spec.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--blue-900) text-2xl md:text-3xl font-bold text-center mb-8">
            Perfect For <span className="text-(--lime-600)">Your Everyday Deliveries</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {useCases.map((use) => {
              const Icon = use.icon;
              return (
                <div key={use.title} className="flex flex-col items-center text-center p-5 border border-(--gray-200) rounded-xl hover:shadow-md transition-shadow">
                  <Icon className="w-10 h-10 text-(--blue-600) mb-3" />
                  <h4 className="text-(--blue-900) text-sm font-bold mb-1">{use.title}</h4>
                  <p className="text-(--blue-500) text-xs">{use.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-(--gray-50) py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--blue-900) text-2xl md:text-3xl font-bold text-center mb-8">
            How Our <span className="text-(--lime-600)">Bike Courier</span> Service Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center text-center relative">
                  {idx < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px border-t-2 border-dashed border-(--gray-300)"></div>
                  )}
                  <div className="w-16 h-16 bg-white border-2 border-(--gray-200) rounded-full flex items-center justify-center mb-4 relative z-10">
                    <Icon className="w-7 h-7 text-(--blue-600)" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-(--lime-500) rounded-full flex items-center justify-center text-white text-xs font-bold">{step.num}</span>
                    <h4 className="text-(--blue-900) text-sm font-bold">{step.title}</h4>
                  </div>
                  <p className="text-(--gray-500) text-xs max-w-[200px]">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--blue-900) text-2xl md:text-3xl font-bold text-center mb-8">
            Why Choose Our <span className="text-(--lime-600)">Bike Courier?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {whyChoose.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-(--lime-50) rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-(--lime-600)" />
                  </div>
                  <h4 className="text-(--blue-900) text-sm font-bold mb-1">{item.title}</h4>
                  <p className="text-(--blue-500) text-xs leading-relaxed">{item.subtitle}</p>
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
                <div className="w-16 h-16 bg-(--blue-800) rounded-xl flex items-center justify-center flex-shrink-0 relative hidden sm:flex">
                  <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop" alt="Box" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-(--lime-500) rounded-full flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                    Need a <span className="text-(--lime-400)">Fast Delivery?</span>
                  </h3>
                  <p className="text-(--blue-200) text-sm">Book our Bike Courier service and get your parcel delivered safely & on time.</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <button className="flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors group whitespace-nowrap">
                  Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-(--blue-200) text-xs">
                  <Phone className="w-3.5 h-3.5" /> or Call 1800 123 4567
                </div>
              </div>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
              <MapPin className="w-32 h-32 text-(--lime-400)" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
     <StatsBar/>
    </div>
  );
}