"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LucideIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  image: string;
};

type ServicesSectionProps = {
  services: Service[];
  title: string;
  highlightTitle: string;
};
export default function ServicesSection({
  services,
  title,
  highlightTitle,

}: ServicesSectionProps) {
    const servicesRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        
      

        // Services
        gsap.fromTo(
          ".services-header",
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".service-card",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
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
    <section ref={servicesRef} className="py-10 ">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <h2 className="services-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-8">
          {title} <span className="text-(--lime-500)">{highlightTitle}</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-3">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="service-card bg-(--gray-50) rounded-2xl p-4 border border-(--gray-100) hover:shadow-xl hover:border-(--blue-200) transition-all group"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-(--blue-50) rounded-lg flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-(--blue-900)" />
                  </div>
                  <h3 className="text-(--blue-900) font-bold  text-sm leading-tight">
                    {service.title}
                  </h3>
                </div>

                <div className="rounded-xl bg-(--gray-100) aspect-5/3 flex items-center justify-center mb-4 overflow-hidden">
                   <img
    src={service.image}
    alt={service.title}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
  />
                </div>

                <p className="text-(--blue-900) text-sm ">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
