"use client";

import React from "react";

interface HeroSectionProps {
  /** URL of the hero image (shown as a right-side panel on desktop, full-bleed background on mobile) */
  imageUrl: string;
  /** Optional alt text for the hero image */
  imageAlt?: string;
  /** The entire left-side content — pass any JSX (heading, copy, checklist, buttons, etc.) */
  leftContent: React.ReactNode;
  /** Optional extra classes for the outer <section>, e.g. to override height */
  className?: string;
}

export default function HeroSection({
  imageUrl,
  imageAlt = "",
  leftContent,
  className = "",
}: HeroSectionProps) {
  return (
    <section
      className={`relative overflow-hidden h-[100vh] md:h-[90vh] md:pb-16 pt-38 ${className}`}
    >
      {/* Desktop image: right-aligned panel */}
    <img
  src={imageUrl}
  className="hidden md:block absolute inset-0 w-[60%] ml-auto h-full z-0"
  alt={imageAlt}
/>
      {/* Mobile image: full-bleed background */}
      <img
        src={imageUrl}
        className="block lg:hidden absolute inset-0 object-cover w-full h-full z-0"
        alt={imageAlt}
      />

      {/* Gradient overlays */}
      {/*desktop overlay */}

<div className="max-lg:hidden absolute inset-0 w-full h-full z-10 bg-linear-to-r from-[var(--blue-50)] from-0% via-[var(--blue-50)] via-40% to-transparent to-70%" />
      {/*mobile overlay*/}
      <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-linear-to-b bg-[var(--blue-50)]/80" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">{leftContent}</div>
        </div>
      </div>
    </section>
  );
}