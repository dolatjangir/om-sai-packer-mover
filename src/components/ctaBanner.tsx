"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";


interface CTAFeature {
  icon: LucideIcon;
  text: string;
}

interface CTASectionProps {
  title: string;
  highlight: string;
  description: string;
  image: string;

  features: CTAFeature[];

  primaryButton: {
    text: string;
    href: string;
  };

  secondaryButton: {
    text: string;
    href: string;
  };
}
export default function CTASection({
  title,
  highlight,
  description,
  image,
  features,
  primaryButton,
  secondaryButton,
}: CTASectionProps) {
   const ctaRef = useRef<HTMLDivElement>(null);
    
      useEffect(() => {
        const timer = setTimeout(() => {
          const ctx = gsap.context(() => {
               
            // CTA
            gsap.fromTo(
              ".cta-content",
              { opacity: 0, y: 30 },
              {
                scrollTrigger: {
                  trigger: ctaRef.current,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
              }
            );
    
         
            ScrollTrigger.refresh();
          });
    
          return () => ctx.revert();
        }, 100);
    
        return () => clearTimeout(timer);
      }, []);
    
  return (
    <section ref={ctaRef} className="py-4 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-(--blue-900) rounded-2xl lg:rounded-3xl p-2 sm:p-4 lg:p-6 relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-(--lime-500)/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-(--lime-500)/10 rounded-full translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Left Image */}
            <div className="hidden lg:flex w-56 rounded-xl  items-center justify-center shrink-0">
              <img src={image} alt={title} />
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">
                {title}{" "}
                <span className="text-(--lime-400)">{highlight}</span>
              </h3>

              <p className="text-(--blue-200) text-sm mb-5">
                {description}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;

                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Icon className="w-4 h-4 text-(--lime-400)" />
                      <span className="text-white text-xs font-medium">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <a
                href={primaryButton.href}
                className="inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-5 py-3 rounded-full text-sm transition-colors group"
              >
                {primaryButton.text}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={secondaryButton.href}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-5 py-3 rounded-full text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                {secondaryButton.text}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}