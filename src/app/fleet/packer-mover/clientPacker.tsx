"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Phone,
  Shield,
  Users,
  Clock,
  IndianRupee,
  Home,
  Truck,
  Package,
  Building2,
  MapPin,
  Globe,
  Warehouse,
  Wrench,
  ClipboardList,
  Star,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
  Headphones,
  Quote,
} from "lucide-react";

const heroFeatures = [
  { icon: Shield, title: "Safe & Secure", subtitle: "Your belongings are in safe hands" },
  { icon: Users, title: "Expert Team", subtitle: "Trained & verified professionals" },
  { icon: Clock, title: "On-Time Delivery", subtitle: "Punctual & reliable service" },
  { icon: IndianRupee, title: "Best Price", subtitle: "Affordable pricing with no hidden cost" },
];

const servicePills = [
  { icon: Truck, title: "Door to Door", subtitle: "Relocation" },
  { icon: Package, title: "Packing &", subtitle: "Unpacking" },
  { icon: Users, title: "Loading &", subtitle: "Unloading" },
  { icon: Shield, title: "Transportation", subtitle: "Insurance" },
  { icon: Warehouse, title: "Warehousing &", subtitle: "Storage" },
  { icon: Wrench, title: "Rearranging", subtitle: "& Setup" },
];

const movingSolutions = [
  { icon: Home, title: "Home Shifting", subtitle: "1 BHK to Villa shifting services", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=180&fit=crop" },
  { icon: Building2, title: "Office Shifting", subtitle: "Safe & efficient office relocation", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=180&fit=crop" },
  { icon: MapPin, title: "Local Shifting", subtitle: "Within city quick moves", image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=300&h=180&fit=crop" },
  { icon: Globe, title: "Domestic Shifting", subtitle: "Inter-city moving across India", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=180&fit=crop" },
  { icon: Warehouse, title: "Storage Solution", subtitle: "Secure storage for your goods", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=180&fit=crop" },
  { icon: Wrench, title: "Furniture Dismantle", subtitle: "Dismantling & reassembling", image: "https://images.unsplash.com/photo-1600585154526-8d8c0b5c0b0c?w=300&h=180&fit=crop" },
];

const howItWorks = [
  { num: "1", icon: ClipboardList, title: "Request a Quote", text: "Share your moving details with us" },
  { num: "2", icon: Users, title: "We Plan Your Move", text: "Our team analyzes and plans the best solution" },
  { num: "3", icon: Package, title: "Packing & Loading", text: "We pack your items carefully & load safely" },
  { num: "4", icon: Truck, title: "Safe Transportation", text: "Your goods are transported securely & on time" },
  { num: "5", icon: Home, title: "Unloading & Setup", text: "We unload, unpack & rearrange at your place" },
];

const whyChoose = [
  { icon: Users, title: "Experienced Professionals", subtitle: "Skilled, trained & background verified staff" },
  { icon: Package, title: "Quality Packing Material", subtitle: "High-quality packing material for complete safety" },
  { icon: Shield, title: "Insurance Coverage", subtitle: "Transit insurance for your peace of mind" },
  { icon: IndianRupee, title: "Transparent Pricing", subtitle: "No hidden charges. 100% transparent pricing" },
  { icon: Globe, title: "Pan India Network", subtitle: "Service available in 200+ cities across India" },
];

const testimonials = [
  { id: 1, name: "Rahul Sharma", location: "Jaipur, Rajasthan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", text: "MoveEasy made my home shifting so easy! The team was professional, on time and handled everything with care.", rating: 5 },
  { id: 2, name: "Priya Mehta", location: "Bengaluru, Karnataka", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", text: "Excellent service and very cooperative staff. They packed everything perfectly and delivered on time.", rating: 5 },
  { id: 3, name: "Amit Verma", location: "Pune, Maharashtra", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", text: "Very reliable and affordable packers & movers. Highly recommended for hassle-free relocation.", rating: 5 },
];

const stats = [
  { value: "10,000+", label: "Happy Customers", icon: Users },
  { value: "200+", label: "Cities Covered", icon: MapPin },
  { value: "99%", label: "On-Time Delivery", icon: CheckCircle2 },
  { value: "4.8/5", label: "Customer Rating", icon: Star },
  { value: "24/7", label: "Customer Support", icon: Headphones },
];

export default function PackerMoverPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-(--blue-900) relative overflow-hidden pb-4 pt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="py-6">
             
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">Packer & Mover</h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--lime-400) mb-4 leading-tight">Hassle-Free. Stress-Free.</h1>
              <p className="text-(--blue-200) text-base md:text-lg mb-6 max-w-lg">
                From packing to unpacking, we handle everything with care and professionalism. Your move, our responsibility.
              </p>
              <div className="grid grid-cols-2 gap-4">
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
                <img src="/packing-services-hero-img.png" alt="Packers and Movers" className="w-full h-auto rounded-xl object-contain" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-[16px] border-(--lime-500) rounded-full opacity-80"></div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 border-[8px] border-(--lime-400) rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pills */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {servicePills.map((pill) => {
              const Icon = pill.icon;
              return (
                <div key={pill.title} className="flex items-center gap-3 p-4 border border-(--gray-200) rounded-xl hover:shadow-md transition-shadow">
                  <Icon className="w-8 h-8 text-(--blue-600) flex-shrink-0" />
                  <div>
                    <p className="text-(--blue-900) text-sm font-semibold leading-tight">{pill.title}</p>
                    <p className="text-(--blue-500) text-xs">{pill.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

     {/* Complete Moving Solutions Section - Replace this in your page */}
<section className="bg-white py-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-(--gray-900) text-2xl md:text-3xl font-bold text-center mb-8">
      Complete <span className="text-(--lime-600)">Moving Solutions</span> for You
    </h2>
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  {/* Home Shifting */}
  <div className="flex flex-col items-center text-center bg-(--stone-50) p-2 rounded-xl">
    <Home className="w-6 h-6 text-(--blue-600) mb-1" />
    <h4 className="text-(--gray-900) text-sm font-bold">Home Shifting</h4>
    <p className="text-(--gray-500) text-xs mb-3">1 BHK to Villa shifting services</p>
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative">
      <img
        src="/home-shifting.jfif"
        alt="Home Shifting"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Office Shifting */}
  <div className="flex flex-col items-center text-center bg-(--stone-50) p-2 rounded-xl">
    <Building2 className="w-6 h-6 text-(--blue-600) mb-1" />
    <h4 className="text-(--gray-900) text-sm font-bold">Office Shifting</h4>
    <p className="text-(--gray-500) text-xs mb-3">Safe & efficient office relocation</p>
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative">
      <img
        src="/office-relocation-packer-mover.jfif"
        alt="Office Shifting"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Local Shifting */}
  <div className="flex flex-col items-center text-center bg-(--stone-50) p-2 rounded-xl">
    <MapPin className="w-6 h-6 text-(--blue-600) mb-1" />
    <h4 className="text-(--gray-900) text-sm font-bold">Local Shifting</h4>
    <p className="text-(--gray-500) text-xs mb-3">Within city quick moves</p>
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative">
      <img
        src="/local-shifting.jfif"
        alt="Local Shifting"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Domestic Shifting */}
  <div className="flex flex-col items-center text-center bg-(--stone-50) p-2 rounded-xl">
    <Globe className="w-6 h-6 text-(--blue-600) mb-1" />
    <h4 className="text-(--gray-900) text-sm font-bold">Domestic Shifting</h4>
    <p className="text-(--gray-500) text-xs mb-3">Inter-city moving across India</p>
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative">
      <img
        src="/domestic-moving.jfif"
        alt="Domestic Shifting"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Storage Solution */}
  <div className="flex flex-col items-center text-center  bg-(--stone-50) p-2 rounded-xl">
    <Warehouse className="w-6 h-6 text-(--blue-600) mb-1" />
    <h4 className="text-(--gray-900) text-sm font-bold">Storage Solution</h4>
    <p className="text-(--gray-500) text-xs mb-3">Secure storage for your goods</p>
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative">
      <img
        src="/storage-solution-packer-mover.jfif"
        alt="Storage Solution"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Furniture Dismantle */}
  <div className="flex flex-col items-center text-center  bg-(--stone-50) p-2 rounded-xl">
    <Wrench className="w-6 h-6 text-(--blue-600) mb-1" />
    <h4 className="text-(--gray-900) text-sm font-bold">Furniture Dismantle</h4>
    <p className="text-(--gray-500) text-xs mb-3">Dismantling & reassembling</p>
    <div className="w-full aspect-4/3 rounded-xl overflow-hidden relative">
      <img
        src="/furniture-dismental.jfif"
        alt="Furniture Dismantle"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>
  </div>
</section>

      {/* How We Make Your Move Easy */}
      <section className="bg-(--gray-50) py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--blue-900) text-2xl md:text-3xl font-bold text-center mb-8">
            How We Make Your Move <span className="text-(--lime-600)">Easy</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
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
                  <p className="text-(--blue-500) text-xs max-w-[180px]">{step.text}</p>
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
            Why Choose <span className="text-(--lime-600)">OM Sai</span> Packers & Movers?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChoose.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-center text-center p-5 border border-(--gray-200) rounded-xl">
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
                    Planning a Move? <span className="text-(--lime-400)">We're Here to Help!</span>
                  </h3>
                  <p className="text-(--blue-200) text-sm">Get a free quote today and experience a smooth, safe and hassle-free moving experience.</p>
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
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
              <Send className="w-32 h-32 text-(--lime-400)" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-(--blue-50) rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-(--blue-600)" />
                  </div>
                  <div>
                    <p className="text-(--blue-900) text-base font-bold">{stat.value}</p>
                    <p className="text-(--blue-500) text-xs">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-(--gray-50) py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--blue-900) text-2xl md:text-3xl font-bold text-center mb-8">
            What Our <span className="text-(--lime-600)">Customers</span> Say
          </h2>
          <div className="relative">
            <div className="flex gap-6 overflow-hidden">
              {testimonials.map((review) => (
                <div key={review.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 bg-white rounded-xl border border-(--gray-200) p-6">
                  <div className="text-(--lime-500) text-2xl mb-3">
                    <Quote className="w-6 h-6 fill-(--lime-500)" />
                  </div>
                  <p className="text-(--blue-600) text-sm leading-relaxed mb-4">{review.text}</p>
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-(--blue-900) text-sm font-semibold">{review.name}</p>
                      <p className="text-(--blue-400) text-xs">{review.location}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-(--lime-500) text-(--lime-500)" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-(--gray-200) rounded-full flex items-center justify-center shadow-md hover:bg-(--gray-50) transition-colors hidden lg:flex">
              <ChevronLeft className="w-5 h-5 text-(--blue-600)" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-(--gray-200) rounded-full flex items-center justify-center shadow-md hover:bg-(--gray-50) transition-colors hidden lg:flex">
              <ChevronRight className="w-5 h-5 text-(--blue-600)" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((dot) => (
              <button key={dot} onClick={() => setActiveSlide(dot)} className={`w-2.5 h-2.5 rounded-full transition-colors ${dot === activeSlide ? "bg-(--lime-500)" : "bg-(--gray-300)"}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}