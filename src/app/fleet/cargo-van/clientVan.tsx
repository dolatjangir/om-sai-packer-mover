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
  Shield,
  Clock,
  IndianRupee,
  CheckCircle2,
  Building2,
  Briefcase,
  GraduationCap,
  Store,
  Sofa,
  ChevronDown,
  Star,
  MapPin,
  Headphones,
  Users,
  Send,
  Ruler,
  Box,
  DoorOpen,
  Fuel,
  Check,
  DollarSign,
  Wrench,
  Globe,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import StatsBar from "@/components/statsBar";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Services", href: "#", hasDropdown: true },
  { name: "Fleet", href: "#", active: true, hasDropdown: true },
  { name: "Who Choose Us", href: "#" },
  { name: "Reviews", href: "#" },
  { name: "Blogs", href: "#" },
  { name: "Contact Us", href: "#" },
];

const heroFeatures = [
  { icon: Shield, title: "Safe & Secure", subtitle: "Your items are in safe hands" },
  { icon: Clock, title: "On-Time Delivery", subtitle: "Always on time, every time" },
  { icon: IndianRupee, title: "Affordable Rates", subtitle: "Best prices for quality service" },
];

const specs = [
  { icon: Truck, label: "Vehicle Type", value: "Cargo Van" },
  { icon: Ruler, label: "Load Capacity", value: "Up to 1.5 Ton" },
  { icon: Box, label: "Volume Capacity", value: "Up to 250 cu ft" },
  { icon: DoorOpen, label: "Door Type", value: "Rear Door" },
  { icon: Fuel, label: "Fuel Type", value: "Diesel" },
];

const useCases = [
  { icon: Building2, title: "Home Shifting", subtitle: "1 BHK / Small Homes" },
  { icon: Briefcase, title: "Office Shifting", subtitle: "Small Offices" },
  { icon: GraduationCap, title: "Student Relocation", subtitle: "Hostel / PG Moves" },
  { icon: Store, title: "Shop & Business", subtitle: "Deliveries & Supplies" },
  { icon: Sofa, title: "Furniture Delivery", subtitle: "Safe & Secure Delivery" },
];

const whyChoose = [
  { icon: CheckCircle2, title: "Right Size", subtitle: "Ideal for small to medium moves" },
  { icon: DollarSign, title: "Cost Effective", subtitle: "Pay only for the space you need" },
  { icon: DoorOpen, title: "Easy Access", subtitle: "Rear door for quick loading & unloading" },
  { icon: Wrench, title: "Well Maintained", subtitle: "Clean, reliable & regularly serviced" },
  { icon: Globe, title: "Pan India Service", subtitle: "Available in 200+ cities across India" },
];

const stats = [
  { value: "10,000+", label: "Happy Customers", icon: Users },
  { value: "200+", label: "Cities Covered", icon: MapPin },
  { value: "99%", label: "On-Time Delivery", icon: CheckCircle2 },
  { value: "4.8/5", label: "Customer Rating", icon: Star },
  { value: "24/7", label: "Customer Support", icon: Headphones },
];

const quickLinks = ["Home", "About Us", "Services", "Fleet", "Who Choose Us", "Contact Us"];
const ourServices = ["Home Shifting", "Office Shifting", "Car Transportation", "Packing & Unpacking", "Storage Solutions"];
const ourFleet = ["Cargo Van", "Pickup Truck", "Tata 407", "Eicher 17 Feet", "22 Feet Container"];

export default function CargoVanPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
     

      {/* Hero Section */}
      <section className="bg-(--blue-900) relative overflow-hidden pb-4 pt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="py-10">
             
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">Cargo Van</h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--lime-400) mb-4 leading-tight">For Every Move</h1>
              <p className="text-(--blue-200) text-base md:text-lg mb-6 max-w-lg">
                Our Cargo Vans are perfect for small to medium moves. Safe, reliable and on-time delivery for your valuable belongings.
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
                <img src="/cargo-van-hero-img.png" alt="Cargo Van" className="w-full h-auto rounded-xl object-contain" />
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

      {/* Perfect For Your Needs */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--blue-900) text-2xl md:text-3xl font-bold text-center mb-8">
            Perfect For <span className="text-(--lime-600)">Your Needs</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {useCases.map((use) => {
              const Icon = use.icon;
              return (
                <div key={use.title} className="flex flex-col items-center text-center p-5 border border-(--gray-200) rounded-xl hover:shadow-md transition-shadow">
                  <Icon className="w-10 h-10 text-(--lime-600) mb-3" />
                  <h4 className="text-(--blue-900) text-sm font-bold mb-1">{use.title}</h4>
                  <p className="text-(--blue-500) text-xs">{use.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dimensions & Gallery */}
      <section className="bg-(--gray-50) py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Dimensions */}
            <div className="bg-white rounded-2xl border border-(--blue-200) p-6">
              <h3 className="text-(--blue-900) text-lg font-bold mb-4">Cargo Van Dimensions</h3>
              <div className="relative mb-4">
                <img src="/cargo-van-h-w-img.png" alt="Cargo Van Side View" className="w-full h-54 object-contain" />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-(--blue-600) text-xs font-medium">
                  {/* <div className="flex flex-col items-center"><span>Height</span><span>4.5 ft</span></div> */}
                </div>
                {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-(--blue-600) text-xs font-medium">
                  <span>Length 8.5 ft</span>
                </div> */}
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center p-3 bg-(--gray-50) rounded-lg"><p className="text-(--blue-500) text-xs">Width</p><p className="text-(--gray-900) text-sm font-bold">5.5 ft</p></div>
                <div className="text-center p-3 bg-(--gray-50) rounded-lg"><p className="text-(--blue-500) text-xs">Load Length</p><p className="text-(--gray-900) text-sm font-bold">8.5 ft</p></div>
                <div className="text-center p-3 bg-(--gray-50) rounded-lg"><p className="text-(--blue-500) text-xs">Load Width</p><p className="text-(--gray-900) text-sm font-bold">5.5 ft</p></div>
                <div className="text-center p-3 bg-(--gray-50) rounded-lg"><p className="text-(--blue-500) text-xs">Load Height</p><p className="text-(--gray-900) text-sm font-bold">4.5 ft</p></div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl border border-(--gray-200) p-6">
              <h3 className="text-(--blue-900) text-lg font-bold mb-2">Spacious & Secure</h3>
              <p className="text-(--blue-500) text-sm mb-4">Our cargo vans are well-maintained and equipped to handle your goods with utmost care.</p>
              <div className="grid grid-cols-2 gap-3">
                <img src="/cargo-van-storage-image-1.png" alt="Van interior" className="w-full h-32 object-cover rounded-lg" />
                <img src="/cargo-van-storage-image-2.png" alt="Van loaded" className="w-full h-32 object-cover rounded-lg" />
                <img src="/cargo-van-storage-image-3.png" alt="Van side" className="w-full h-32 object-cover rounded-lg" />
                <img src="/cargo-van-storage-image-4.png" alt="Van boxes" className="w-full h-32 object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--blue-900) text-2xl md:text-3xl font-bold text-center mb-8">
            Why Choose Our <span className="text-(--lime-600)">Cargo Van?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChoose.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-(--lime-50) rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-(--lime-600)" />
                  </div>
                  <div>
                    <h4 className="text-(--blue-900) text-sm font-bold mb-1">{item.title}</h4>
                    <p className="text-(--blue-500) text-xs leading-relaxed">{item.subtitle}</p>
                  </div>
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
                <div className="w-20 h-20 bg-(--blue-800) rounded-xl flex items-center justify-center flex-shrink-0 relative hidden sm:flex">
                  <img src="/cargo-van-storage-image-4.png" alt="Box" className="w-18 h-18 object-cover rounded-lg" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-(--lime-500) rounded-full flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                    Book <span className="text-(--lime-400)">Cargo Van</span> for Your Next Move
                  </h3>
                  <p className="text-(--blue-200) text-sm">Get reliable, affordable and hassle-free moving services.</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <button className="flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors group whitespace-nowrap">
                  Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-(--blue-200) text-xs">
                  <Phone className="w-3.5 h-3.5" /> or Call 1800 123 4567
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
    <StatsBar/>

      
    </div>
  );
}