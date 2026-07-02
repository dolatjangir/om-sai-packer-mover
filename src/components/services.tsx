import React from 'react';
import { Home, Warehouse, Truck, MapPin, Zap } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-[#FAF9F5] shadow-md border-b-4 border-lime-400 group transition-all duration-300 hover:shadow-lg">
      {/* Icon with thick dark blue outlines mirroring the image style */}
      <div className="text-blue-800 group-hover:text-lime-500 transition-colors duration-300 mb-4">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-black text-blue-900 text-center uppercase tracking-wide mb-3">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-xs text-slate-700 text-center font-medium leading-relaxed max-w-[200px]">
        {description}
      </p>
    </div>
  );
};

export default function MoverPackerServices() {
  const services = [
    {
      icon: <Home className="w-16 h-16 stroke-[1.5]" />,
      title: "Home & Office Shifting",
      description: "Expert moving for homes and corporate spaces with care.",
    },
    {
      icon: <Warehouse className="w-16 h-16 stroke-[1.5]" />,
      title: "Warehousing & Storage",
      description: "Secure and structured storage solutions for your goods.",
    },
    {
      icon: <Truck className="w-16 h-16 stroke-[1.5]" />,
      title: "Transportation",
      description: "Efficient and timely logistics across roads.",
    },
    {
      icon: <MapPin className="w-16 h-16 stroke-[1.5]" />,
      title: "Pan India Services",
      description: "Comprehensive relocations across the nation.",
    },
    {
      icon: <Zap className="w-16 h-16 stroke-[1.5]" />,
      title: "Express Moving",
      description: "Rapid transit for time-critical shipments.",
    },
  ];

  return (
    <section className="relative w-full py-12 px-8 bg-[#F4F3EE] overflow-hidden select-none">
      
      {/* LEFT SIDE GEOMETRIC ACCENTS (From the image) */}
      <div className="absolute top-0 left-0 w-6 h-full bg-blue-800 skew-x-[-15deg] origin-top-left -translate-x-2" />
      <div className="absolute top-0 left-4 w-2 h-full bg-lime-400 skew-x-[-15deg] origin-top-left -translate-x-2" />

      {/* RIGHT SIDE GEOMETRIC ACCENTS (From the image) */}
      <div className="absolute top-0 right-0 w-6 h-full bg-blue-800 skew-x-[-15deg] origin-top-right translate-x-2" />
      <div className="absolute top-0 right-4 w-2 h-full bg-lime-400 skew-x-[-15deg] origin-top-right translate-x-2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black text-blue-900 uppercase tracking-tight">
            OM SAI MOVER PACKER: <span className="text-blue-700">Professional Logistics Solutions</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        
        {/* Bottom Framing Line & Logos placed exactly like the image */}
        <div className="mt-12 relative flex items-center justify-end h-16 border-b-2 border-blue-800">
          
          {/* Bottom Right Logos Row */}
          <div className="flex items-center gap-6 bg-[#F4F3EE] pl-4 absolute right-0 bottom-[-2px] h-12 z-20">
            
            {/* First Logo Set */}
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg text-blue-900 tracking-tighter">OM SAI</span>
              {/* Decorative Lime Emblem acting as the Ganesha graphic placeholder */}
              <div className="w-5 h-6 bg-lime-400 rounded-t-full rounded-b-md opacity-80" />
            </div>

            {/* Middle Badge Placeholder (ISO Circle Graphic) */}
            <div className="w-9 h-9 rounded-full border-2 border-blue-800 flex items-center justify-center p-0.5 bg-white">
              <div className="w-full h-full rounded-full border border-dashed border-blue-800 flex items-center justify-center">
                <span className="text-[7px] font-bold text-blue-900 scale-90">ISO</span>
              </div>
            </div>

            {/* Second Logo Set */}
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg text-blue-900 tracking-tighter">OM SAI</span>
              <div className="w-5 h-6 bg-lime-400 rounded-t-full rounded-b-md opacity-80" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

  // second design
    // <div className="relative w-full min-h-screen bg-white font-sans antialiased text-black overflow-hidden selection:bg-orange-500 selection:text-white">
      
    //   {/* 1. HEADER / NAVIGATION */}
    //   <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-gray-100 relative z-20">
    //     {/* Logo */}
    //     <div className="flex items-center space-x-2 cursor-pointer">
    //       {/* Orange Wings/Arrow Icon */}
    //       <div className="flex flex-col justify-center items-center w-8 h-8 bg-linear-to-br from-orange-400 to-orange-600 text-white rounded-lg shadow-sm font-black text-xs italic">
    //         F
    //       </div>
    //       <span className="text-xl font-black tracking-tight uppercase">
    //         Fast <span className="text-gray-900">Move</span>
    //       </span>
    //     </div>

    //     {/* Navigation Menu */}
    //     <nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest uppercase">
    //       <a href="#home" className="text-orange-500 transition-colors">Home</a>
    //       <a href="#services" className="text-gray-900 hover:text-orange-500 transition-colors">Services</a>
    //       <a href="#pricing" className="text-gray-900 hover:text-orange-500 transition-colors">Pricing</a>
    //       <a href="#about" className="text-gray-900 hover:text-orange-500 transition-colors">About</a>
    //       <a href="#contact" className="text-gray-900 hover:text-orange-500 transition-colors">Contact</a>
    //     </nav>
    //   </header>

    //   {/* 2. MAIN HERO HERO BODY */}
    //   <main className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
    //     {/* Left Side: Content Column */}
    //     <div className="lg:col-span-6 flex flex-col space-y-6 max-w-xl relative z-20">
          
    //       {/* Main Title */}
    //       <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 uppercase leading-[1.05]">
    //         Your Move, Our Care. <br />
    //         <span className="text-gray-900">Stress-Free Moving <br />Guaranteed.</span>
    //       </h1>

    //       {/* Subtitle description */}
    //       <p className="text-base md:text-lg font-medium text-gray-600 leading-relaxed">
    //         Insured, licensed, and on time. We handle your belongings like our own.
    //       </p>

    //       {/* Call To Actions */}
    //       <div className="flex flex-wrap items-center gap-3 pt-2">
    //         <button className="bg-[#e06b24] hover:bg-[#c95a1a] text-white font-extrabold text-xs tracking-wider uppercase px-6 py-3.5 rounded-lg shadow-md transition-all cursor-pointer">
    //           Get a Free Instant Quote
    //         </button>
    //         <button className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900 font-extrabold text-xs tracking-wider uppercase px-6 py-3.5 rounded-lg transition-all cursor-pointer">
    //           Check Prices
    //         </button>
    //       </div>

    //       {/* Trust Badges Row */}
    //       <div className="flex flex-wrap items-center gap-3 pt-6">
    //         {/* Google Rating */}
    //         <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full shadow-xs">
    //           <span className="text-amber-500 text-sm">★</span>
    //           <span className="text-xs font-bold text-gray-800">4.9/5 Google Rating</span>
    //         </div>
            
    //         {/* Insured Badge */}
    //         <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full shadow-xs">
    //           <span className="text-orange-500 text-xs">✔</span>
    //           <span className="text-xs font-bold text-gray-800">100% Insured</span>
    //         </div>

    //         {/* Happy Moves Badge */}
    //         <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full shadow-xs">
    //           <span className="text-orange-500 text-xs">✔</span>
    //           <span className="text-xs font-bold text-gray-800">10k+ Happy Moves</span>
    //         </div>
    //       </div>

    //     </div>

    //     {/* Right Side: Graphic/Movers Column */}
    //     {/* Absolute-to-fixed layout structure on desktop matching your layout bleed */}
    //     <div className="lg:col-span-6 w-full h-[320px] sm:h-[400px] lg:h-[520px] lg:absolute lg:right-0 lg:w-[52%] relative">
          
    //       {/* Subtle blend overlay effect from white background to image */}
    //       <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10 hidden lg:block" />

    //       {/* Replace with your specific high-quality moving crew asset */}
    //       <img 
    //         src="/images.jfif" 
    //         alt="Professional movers unloading a sofa from a truck" 
    //         className="w-full h-full object-cover object-center lg:rounded-l-2xl shadow-sm"
    //       />
    //     </div>

    //   </main>
    // </div>