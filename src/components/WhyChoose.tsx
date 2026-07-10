// import React, { useEffect, useRef } from 'react'
// interface Props {
//     arraydata:[]
// }
// export default function WhyChoose({
//   arraydata
// }: Props) {
//       const whyRef = useRef<HTMLDivElement>(null);
//        useEffect(() => {
//           const timer = setTimeout(() => {
//             const ctx = gsap.context(() => {
           
      
//               // Why Choose
//               gsap.fromTo(
//                 ".why-header",
//                 { opacity: 0, y: 20 },
//                 {
//                   scrollTrigger: {
//                     trigger: whyRef.current,
//                     start: "top 85%",
//                     toggleActions: "play none none reverse",
//                   },
//                   opacity: 1,
//                   y: 0,
//                   duration: 0.6,
//                   ease: "power2.out",
//                 }
//               );
//               gsap.fromTo(
//                 ".why-card",
//                 { opacity: 0, y: 30 },
//                 {
//                   scrollTrigger: {
//                     trigger: whyRef.current,
//                     start: "top 80%",
//                     toggleActions: "play none none reverse",
//                   },
//                   opacity: 1,
//                   y: 0,
//                   duration: 0.5,
//                   stagger: 0.1,
//                   ease: "power2.out",
//                 }
//               );
      
             
           
             
      
//               ScrollTrigger.refresh();
//             });
      
//             return () => ctx.revert();
//           }, 100);
      
//           return () => clearTimeout(timer);
//         }, []);
//   return (
//     <section ref={whyRef} className="py-6 ">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="why-header text-center text-2xl sm:text-3xl font-bold text-(--blue-900) mb-6">
//             Why Choose <span className="text-(--lime-500)">OM SAI?</span>
//           </h2>
// <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
//   {whyChoose.map((item, idx) => (
//     <div
//       key={idx}
//       className="why-card bg-white flex items-center gap-4 rounded-xl p-3 border border-(--gray-100) shadow-2xl shadow-stone-300/40 hover:shadow-lg hover:border-(--blue-200) transition-all group"
//     >
//       <div className="w-14 h-14 shrink-0 bg-(--blue-50) rounded-full flex items-center justify-center group-hover:bg-(--blue-100) transition-colors">
//         <item.icon className="w-8 h-8 text-(--blue-900)" />
//       </div>

//       <div className="flex flex-col">
//         <h3 className="text-(--blue-900) font-bold text-sm leading-tight">
//           {item.title}
//         </h3>

//         <p className="text-(--gray-500) text-xs leading-relaxed mt-1">
//           {item.desc}
//         </p>
//       </div>
//     </div>
//   ))}
// </div>
//         </div>
//       </section>
//   )
// }
