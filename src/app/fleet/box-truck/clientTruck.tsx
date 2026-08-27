"use client";

import {
  ArrowRight,
  Phone,
  Shield,
  Clock,
  IndianRupee,
  CheckCircle2,
  Building2,
  Briefcase,
  Factory,
  Store,
  CalendarDays,
  Star,
  MapPin,
  Headphones,
  Users,
  Ruler,
  Box,
  DoorOpen,
  Fuel,
  DollarSign,
  Lock,
  CloudRain,
  Zap,
  Globe,
} from "lucide-react";
import StatsBar from "@/components/statsBar";

const heroFeatures = [
  { icon: Shield, title: "Safe & Secure", subtitle: "Your items are in safe hands" },
  { icon: Clock, title: "On-Time Delivery", subtitle: "Always on time, every time" },
  { icon: IndianRupee, title: "Affordable Rates", subtitle: "Best prices for quality service" },
];

const specs = [
  { icon: Box, label: "Vehicle Type", value: "Box Truck" },
  { icon: Ruler, label: "Load Capacity", value: "Up to 5 Ton" },
  { icon: Box, label: "Volume Capacity", value: "Up to 1000 cu ft" },
  { icon: DoorOpen, label: "Door Type", value: "Rear Roll-Up Door" },
  { icon: Fuel, label: "Fuel Type", value: "Diesel" },
];

const useCases = [
  { icon: Building2, title: "Household Shifting", subtitle: "2 BHK to 4 BHK Homes" },
  { icon: Briefcase, title: "Office Relocation", subtitle: "Offices & Workspaces" },
  { icon: Factory, title: "Industrial Goods", subtitle: "Machines & Equipment" },
  { icon: Store, title: "Retail & Wholesale", subtitle: "Bulk Deliveries" },
  { icon: CalendarDays, title: "Event & Exhibition", subtitle: "Event Materials" },
];

const galleryFeatures = [
  { icon: Box, title: "Heavy Load", subtitle: "Capacity" },
  { icon: Lock, title: "Secure", subtitle: "Strapping Points" },
  { icon: CloudRain, title: "Weather", subtitle: "Protected" },
  { icon: Zap, title: "Smooth Loading", subtitle: "Experience" },
];

const whyChoose = [
  { icon: CheckCircle2, title: "Large Capacity", subtitle: "Perfect for bulky and heavy items" },
  { icon: Shield, title: "Safe & Secure", subtitle: "Well-maintained trucks with secure doors" },
  { icon: DollarSign, title: "Cost Effective", subtitle: "Get more space at best prices" },
  { icon: Users, title: "Professional Team", subtitle: "Experienced staff for loading & unloading" },
  { icon: Globe, title: "Pan India Service", subtitle: "Available in 200+ cities across India" },
];

const stats = [
  { value: "10,000+", label: "Happy Customers", icon: Users },
  { value: "200+", label: "Cities Covered", icon: MapPin },
  { value: "99%", label: "On-Time Delivery", icon: CheckCircle2 },
  { value: "4.8/5", label: "Customer Rating", icon: Star },
  { value: "24/7", label: "Customer Support", icon: Headphones },
];

export default function BoxTruckPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-(--blue-900) relative overflow-hidden pb-4 pt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="py-4">
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">Box Truck</h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--lime-400) mb-4 leading-tight">Big Space. Bigger Moves.</h1>
              <p className="text-(--blue-200) text-base md:text-lg mb-6 max-w-lg">
                Our Box Trucks are ideal for large moves, heavy furniture, office relocations and bulk deliveries. Built for safety, capacity and reliability.
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
                <img src="/truck-hero-img.png" alt="Box Truck" className="w-full h-auto rounded-xl object-contain" />
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
            Perfect For <span className="text-(--lime-600)">Large Moves & Deliveries</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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

      {/* Dimensions & Gallery */}
      <section className="bg-(--gray-50) py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Dimensions */}
            <div className="bg-white rounded-2xl border border-(--gray-200) p-6">
              <h3 className="text-(--blue-900) text-lg font-bold mb-4">Box Truck Dimensions</h3>
              <div className="relative mb-4">
                <img src="/box-truck-h-w-img.png" alt="Box Truck Side View" className="w-full h-48 object-contain" />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-(--blue-600) text-xs font-medium">
                  {/* <div className="flex flex-col items-center"><span>Height</span><span>7.5 ft</span></div> */}
                </div>
                {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-(--blue-600) text-xs font-medium">
                  <span>Length 16 ft</span>
                </div> */}
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center p-3 bg-(--gray-50) rounded-lg"><p className="text-(--blue-500) text-xs">Width</p><p className="text-(--gray-900) text-sm font-bold">7.5 ft</p></div>
                <div className="text-center p-3 bg-(--gray-50) rounded-lg"><p className="text-(--blue-500) text-xs">Load Length</p><p className="text-(--gray-900) text-sm font-bold">16 ft</p></div>
                <div className="text-center p-3 bg-(--gray-50) rounded-lg"><p className="text-(--blue-500) text-xs">Load Width</p><p className="text-(--gray-900) text-sm font-bold">7.5 ft</p></div>
                <div className="text-center p-3 bg-(--gray-50) rounded-lg"><p className="text-(--blue-500) text-xs">Load Height</p><p className="text-(--gray-900) text-sm font-bold">7.5 ft</p></div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl border border-(--gray-200) p-6">
              <h3 className="text-(--blue-900) text-lg font-bold mb-2">Spacious & Built for Heavy Loads</h3>
              <p className="text-(--blue-500) text-sm mb-4">Our box trucks are designed to handle large volumes and heavy items with maximum safety and efficiency.</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <img src="/box-truck-storage-img-1.png" alt="Truck interior" className="w-full h-32 object-cover rounded-lg" />
                <img src="/box-truck-storage-img-2.png" alt="Truck loaded" className="w-full h-32 object-cover rounded-lg" />
                <img src="/box-truck-storage-img-3.png" alt="Truck side" className="w-full h-32 object-cover rounded-lg" />
                <img src="/box-truck-storage-img-4.png" alt="Truck boxes" className="w-full h-32 object-cover rounded-lg" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {galleryFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div key={feat.title} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-(--blue-50) rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-(--blue-600)" />
                      </div>
                      <div>
                        <p className="text-(--blue-900) text-xs font-semibold">{feat.title}</p>
                        <p className="text-(--blue-500) text-[10px]">{feat.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--blue-900) text-2xl md:text-3xl font-bold text-center mb-8">
            Why Choose Our <span className="text-(--lime-600)">Box Truck?</span>
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
                <div className="w-16 h-16 bg-(--blue-800) rounded-xl flex items-center justify-center flex-shrink-0 relative hidden sm:flex">
                  <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop" alt="Box" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-(--lime-500) rounded-full flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                    Need a <span className="text-(--lime-400)">Box Truck</span> for Your Move?
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