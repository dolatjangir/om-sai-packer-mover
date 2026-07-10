"use client"

import { Headphones, MapPinned, ShieldCheck, Star, Users } from "lucide-react";
import { useEffect, useRef } from "react";

 const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: MapPinned, value: "200+", label: "Cities Covered" },
    { icon: ShieldCheck, value: "99%", label: "On-Time Delivery" },
    { icon: Star, value: "4.8/5", label: "Customer Rating" },
    { icon: Headphones, value: "24/7", label: "Customer Support" },
  ];

export default function StatsBar() {
      const statsRef = useRef<HTMLDivElement>(null);
       useEffect(() => {
          const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
            
              // Stats
              gsap.fromTo(
                ".stat-item",
                { opacity: 0, y: 20 },
                {
                  scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.08,
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
      <section ref={statsRef} className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 rounded-md shadow-xl shadow-stone-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="stat-item flex items-center gap-3 justify-center lg:justify-start"
              >
                <div className="w-10 h-10 bg-(--blue-50) rounded-lg flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5 text-(--blue-900)" />
                </div>
                <div>
                  <p className="text-(--blue-900) font-bold text-lg lg:text-xl">
                    {stat.value}
                  </p>
                  <p className="text-(--gray-500) text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
