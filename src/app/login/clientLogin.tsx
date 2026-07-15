"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      
      });

      if (result?.error) {
        setLoginError("Invalid email or password");
         setIsLoading(false);
        return;
      }
           if (result?.ok) {
        // Fetch session to get user role
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        const userRole = session?.user?.role;

        // Decide where to redirect
        let redirectTo = "/user"; // default

        // If there's a valid callbackUrl from URL (and it's not login page), use it
        if (callbackUrl && !callbackUrl.includes("/login")) {
          redirectTo = callbackUrl;
        } else if (userRole === "ADMIN") {
          redirectTo = "/admin";
        } else if (userRole === "DRIVER") {
          redirectTo = "/driver";
        }

        window.location.href = redirectTo;
      }
    } catch {
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl : callbackUrl || undefined });
  };

  const errorMessages: Record<string, string> = {
    AccountSuspended: "Your account has been suspended. Please contact support.",
    AccessDenied: "Access denied. You do not have permission.",
    Configuration: "Authentication configuration error.",
    Default: "An error occurred during sign in.",
  };

  return (
    <main className="relative w-full h-screen flex flex-row justify-around items-center-safe overflow-x-hidden font-sans select-none">
      {/* Background Image Container */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/login-bg-img.png"
          alt="Om Sai Packers & Movers Background"
          className="object-cover object-center w-full h-screen"
        />
      </div>

      {/* LEFT CONTENT AREA */}
      <div className="hidden w-full md:w-1/2 lg:flex flex-col justify-between text-white z-10 h-full max-w-xl self-start md:self-stretch py-4">
        {/* Top Branding Logo */}
        <div className="flex items-center gap-3 mb-12 md:mb-0">
          <div className="relative w-1/2 shrink-0 rounded-lg p-1">
            <img
              src="/omsai-logo-white.png"
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

        {/* Feature Icons Row */}
        <div className="flex gap-8 mb-8">
          {[
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Safe & Secure", sub: "Your belongings are 100% safe with us." },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "On-Time Delivery", sub: "We value your time and deliver on time." },
            { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", label: "24/7 Support", sub: "Our support team is always here to help." },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full border border-[#CADB2A]/60 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-[#CADB2A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                </svg>
              </div>
              <h3 className="text-xs font-bold text-white mb-0.5">{item.label}</h3>
              <p className="text-[10px] text-white/50 leading-tight">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="w-full h-fit md:w-110 bg-transparent backdrop-blur-sm lg:bg-(--stone-100) rounded-3xl shadow-(--stone-400) p-4 lg:p-8 z-10 flex flex-col items-center border border-slate-100 mx-6 lg:mx-0">
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

        {/* Error Display */}
        {(error || loginError) && (
          <div className="w-full mb-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessages[error || ""] || loginError}</span>
          </div>
        )}

        {/* Form Elements */}
        <form className="w-full space-y-3" onSubmit={handleLogin}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 text-(--blue-800) bg-(--stone-50) border border-(--stone-200) rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                required
                disabled={isLoading}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-11 py-3 bg-(--stone-50) text-(--blue-800) border border-(--stone-200) rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#a2bd1b] border-slate-300 focus:ring-[#a2bd1b] accent-[#a2bd1b]"
                disabled={isLoading}
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
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.99] bg-gradient-to-r from-[#0E4995] via-[#2F7359] to-[#a2bd1b] disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Login</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
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
          <button
            onClick={() => handleOAuthLogin("google")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Image src="https://authjs.dev/img/providers/google.svg" alt="Google Logo" width={16} height={16} />
            <span>Google</span>
          </button>
          <button
            onClick={() => handleOAuthLogin("azure-ad")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Image src="https://authjs.dev/img/providers/azure.svg" alt="Microsoft Logo" width={16} height={16} />
            <span>Microsoft</span>
          </button>
        </div>
      </div>
    </main>
  );
}