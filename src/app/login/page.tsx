"use client"
import React from 'react';
import Image from 'next/image';
import { ImGlass } from 'react-icons/im';

export default function LoginPage() {
  return (
    <main className="relative  w-full  h-screen flex flex-row justify-around  items-center-safe overflow-x-hidden  font-sans select-none">
      {/* Background Image Container */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/login-bg-img.png" // Replace with your actual background image path
          alt="Om Sai Packers & Movers Background"
          className="object-cover object-center w-full h-screen"
        />
        {/* Dark Blue-ish Overlay for Left Content Readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-900/40 to-transparent pointer-events-none" /> */}
      </div>

      {/* LEFT CONTENT AREA */}
      <div className="hidden  w-full md:w-1/2 lg:flex flex-col justify-between text-white z-10 h-full max-w-xl self-start md:self-stretch py-4">
        {/* Top Branding Logo */}
        <div className="flex items-center gap-3 mb-12 md:mb-0">
          <div className="relative w-1/2 shrink-0  rounded-lg p-1">
            <img
              src="/omsai-logo-white.png" // Replace with your actual logo icon path
              alt="Logo Icon"
              className="object-contain"
            />
          </div>
        
        </div>

        {/* Hero Copy */}
        <div className="my-auto py-8 md:py-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            We Move <br />
            Your World <br />
            <span className="text-[#CADB2A]">with Care</span>
          </h2>
          <div className="h-1 w-16 bg-[#CADB2A] my-6 rounded-full" />
          <p className="text-lg text-slate-200 font-medium max-w-md leading-relaxed">
            Reliable packing. Safe handling. <br />
            On-time delivery. Every time.
          </p>
        </div>

      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="w-full h-fit md:w-110 bg-transparent backdrop-blur-sm lg:bg-(--stone-100)  rounded-3xl shadow-(--stone-400) p-4 lg:p-8 z-10 flex flex-col items-center border border-slate-100  mx-6 lg:mx-0">
        {/* Lock Icon Emblem */}
        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner mb-4 text-blue-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Card Header */}
        <h3 className="text-2xl font-black text-blue-950 tracking-tight">Welcome Back!</h3>
        <p className="text-xs text-slate-300 lg:text-slate-500 font-medium text-center mt-1 mb-3">
          Login to your Om Sai Packers & Movers <br /> dashboard
        </p>

        {/* Form Elements */}
        <form className="w-full space-y-3" onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-blue-950 tracking-wide block">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 bg-(--stone-50) border border-(--stone-200) rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-blue-950 tracking-wide block">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-11 pr-11 py-3 bg-(--stone-50) border border-(--stone-200) rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
              >
                {/* Obscured/Eye-off Icon matching the graphic */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded text-[#a2bd1b] border-slate-300 focus:ring-[#a2bd1b] accent-[#a2bd1b]"
              />
              <span className="text-xs font-semibold text-slate-600">Remember me</span>
            </label>
            <a href="#" className="text-xs font-bold text-blue-900 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Custom Dual-Gradient Login Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.99] bg-gradient-to-r from-[#0E4995] via-[#2F7359] to-[#a2bd1b]"
          >
            <span>Login</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-4 text-[11px] font-bold text-slate-400 tracking-wider whitespace-nowrap">
            or continue with
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* OAuth Buttons */}
        <div className="w-full grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
            <Image src="https://authjs.dev/img/providers/google.svg" alt="Google Logo" width={16} height={16} />
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
            <Image src="https://authjs.dev/img/providers/azure.svg" alt="Microsoft Logo" width={16} height={16} />
            <span>Microsoft</span>
          </button>
        </div>
      </div>

     
    </main>
  );
}