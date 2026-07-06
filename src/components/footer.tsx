"use client"
import React from 'react';

export default function PackersMoversFooter() {
  return (
    <div className=" bg-white  flex items-center justify-center font-sans overflow-hidden">
      {/* Footer Wrapper with Glow Effect and Complex Background Patterns */}
      <footer className="relative w-full max-w-screen  bg-[#0A1628] rounded-xl border border-[#9bf00b]/30 shadow-[0_0_60px_rgba(155,240,11,0.2)] overflow-hidden text-slate-300">
        
        {/*
          BACKGROUND EFFECTS LAYER
          These layers reproduce the subtle patterns and particles from the reference image.
        */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {/* Subtle Hexagonal Tech Grid */}
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern id="hexagons" width="30" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <path d="M15 0 L30 8.66 L30 26 L15 34.66 L0 26 L0 8.66 Z" fill="none" stroke="#1c2b42" strokeWidth="0.5"/>
              <path d="M15 26 L30 34.66 L30 52 L15 60.66 L0 52 L0 34.66 Z" fill="none" stroke="#1c2b42" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
          
          {/* Faint Scattered Particle Dots */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1c2b42_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>

        {/* Diagonal Light Trails (Teal Streaks) — repositioned to read clearly like the reference */}
        <div className="absolute -top-10 right-10 w-[420px] h-px bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent rotate-[-35deg] opacity-40 pointer-events-none"></div>
        <div className="absolute top-[38%] right-[6%] w-[520px] h-px bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent rotate-[-35deg] opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[18%] w-[460px] h-px bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent rotate-[-35deg] opacity-25 pointer-events-none"></div>

        {/* Existing Radial Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#9bf00b]/8 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        {/* Corner Dot-Grid Clusters (matches the small square dot patterns tucked in the card corners) */}
        <div className="absolute top-6 right-6 grid grid-cols-4 gap-1.5 opacity-70 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={`tr-${i}`} className="w-1 h-1 rounded-full bg-[#3a4d68]"></span>
          ))}
        </div>
        <div className="absolute bottom-6 right-24 grid grid-cols-4 gap-1.5 opacity-60 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={`br-${i}`} className="w-1 h-1 rounded-full bg-[#3a4d68]"></span>
          ))}
        </div>
        <div className="absolute top-1/2 left-6 grid grid-cols-3 gap-1.5 opacity-50 pointer-events-none">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={`ml-${i}`} className="w-1 h-1 rounded-full bg-[#3a4d68]"></span>
          ))}
        </div>

        {/* Sparkle / Four-Pointed Star Accent (bottom-right decorative flourish) */}
        <svg
          className="absolute bottom-8 right-8 w-8 h-8 text-slate-500 opacity-60 pointer-events-none"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0 C12.8 6.2 13.5 10.8 17.5 12 C13.5 13.2 12.8 17.8 12 24 C11.2 17.8 10.5 13.2 6.5 12 C10.5 10.8 11.2 6.2 12 0 Z" />
        </svg>
        <svg
          className="absolute top-10 left-1/2 w-3 h-3 text-slate-500 opacity-40 pointer-events-none"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0 C12.8 6.2 13.5 10.8 17.5 12 C13.5 13.2 12.8 17.8 12 24 C11.2 17.8 10.5 13.2 6.5 12 C10.5 10.8 11.2 6.2 12 0 Z" />
        </svg>
        
        {/* Main Content (Restored and Structured) */}
        <div className="relative z-10 px-8 py-4 lg:px-12 lg:py-6">
          
          {/* Top Section: Logo & Tagline */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-white/10  mb-6 gap-6">
            <div className="flex items-center gap-3 shrink-0">
              {/* Truck Logo Icon */}
              <div className="text-[#9bf00b]">
                <img src="/omsai-logo-white.png" alt='om-sai-packer-mover-logo' className='w-[16em] h-[4em]'/>
              </div>
              {/* <div>
                <h2 className="text-2xl font-bold text-white tracking-wide">Move<span className="text-white">Swiftly</span></h2>
                <p className="text-[#9bf00b] text-sm font-medium tracking-wide">Packers & Movers</p>
              </div> */}
            </div>
            <p className="text-sm lg:text-base max-w-xl text-slate-400">
              Your trusted partner for seamless packing, moving, and delivery services across India. We deliver with care and efficiency.
            </p>
          </div>

          {/* Middle Section: Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-8 lg:gap-12 mb-4">
            
            {/* 1. QUICK LINKS */}
            <div>
              <h3 className="text-[#9bf00b] font-bold text-lg mb-5">1. QUICK LINKS</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: 'Home', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
                  { name: 'About Us', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4 M12 16h.01' },
                  { name: 'Our Services', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
                  { name: 'Tracking', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
                  { name: 'Contact', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' },
                  { name: 'FAQs', icon: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z' },
                  { name: 'Blog', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="flex items-center gap-2 hover:text-[#9bf00b] transition-colors group">
                      <svg className="w-4 h-4 text-[#9bf00b] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={link.icon}></path>
                      </svg>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. OUR SERVICES */}
            <div>
              <h3 className="text-[#9bf00b] font-bold text-lg mb-5">2. OUR SERVICES</h3>
              <ul className="space-y-3 text-sm">
                {['Home Shifting', 'Office Relocation', 'Local Moving', 'International Moving', 'Car Transportation', 'Storage Solutions', 'Warehouse Services'].map((service, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:text-[#9bf00b] transition-colors block">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. OUR NETWORK */}
            <div>
              <h3 className="text-[#9bf00b] font-bold text-lg mb-5">3. OUR NETWORK</h3>
              <ul className="space-y-3 text-sm">
                {['New Delhi', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'].map((city, idx) => (
                  <li key={idx}>
                    <a href="#" className="flex items-center gap-2 hover:text-[#9bf00b] transition-colors group">
                      {/* Cyan/Teal Pinned Location Icon */}
                      <svg className="w-4 h-4 text-[#14b8a6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {city}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. CONTACT US */}
            <div>
              <h3 className="text-[#9bf00b] font-bold text-lg mb-5">4. CONTACT US</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#9bf00b] mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <div>
                    <strong className="block text-white">Head Office:</strong>
                    <span className="text-slate-400">456, Transit Tower,<br />Sector 18, Gurugram, HR</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#9bf00b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <div>
                    <strong className="block text-white">Call Us:</strong>
                    <span className="text-slate-400">+91 9876543210</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#9bf00b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <div>
                    <strong className="block text-white">Email:</strong>
                    <span className="text-slate-400">info@moveswiftly.in</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#9bf00b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <div>
                    <strong className="block text-white">Hours:</strong>
                    <span className="text-slate-400">Mon-Sat 9AM-8PM</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Socials & Newsletter Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-2 border-t border-white/10 pt-2">
            
            {/* Social Icons */}
            <div>
              <h4 className="text-[#9bf00b] font-bold mb-3 uppercase tracking-wider text-sm">Follow Us:</h4>
              <div className="flex gap-4 text-[#9bf00b]">
                {/* Facebook */}
                <a href="#" className="hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4H14V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                {/* Instagram */}
                <a href="#" className="hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                {/* Twitter (Old Bird Icon) */}
                <a href="#" className="hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="w-full md:w-auto flex flex-col items-start md:items-end">
              <h4 className="font-bold text-white mb-3 text-sm md:text-base">Newsletter Sign-up: <span className="font-normal text-slate-300">Stay Updated!</span></h4>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter Email" 
                  className="bg-[#0f213a] border border-slate-600 focus:border-[#9bf00b] text-white px-4 py-2 rounded-md outline-none transition-colors w-full sm:w-[250px]"
                />
                <button className="bg-[#9bf00b] hover:bg-[#8ade0a] text-[#0A1628] font-bold px-6 py-2 rounded-md transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(155,240,11,0.3)]">
                  SUBSCRIBE
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="pt-6 mt-2 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <p>© 2024 <span className='font-extrabold'>OM SAI PACKER & MOVER</span> Relocations. All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#9bf00b] transition-colors">Terms of Service</a>
              <span>|</span>
              <a href="#" className="hover:text-[#9bf00b] transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-[#9bf00b] transition-colors">Sitemap</a>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

