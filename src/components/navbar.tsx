"use client"
import { useEffect, useState } from "react";
import {
  MapPin,
  Truck,
  Package,
  ChevronDown,
  Menu,
  X,
  Phone,
  BookOpen,
  HelpCircle,
  Star,
  FileText,
  Users,
  Briefcase,
  Award,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

interface NavItem {
  label: string;
  menu: "services" | "locations" | "fleet" | "resources" | "company" | null;
  href?: string;
}

const navItems: NavItem[] = [
  { label: "Services", menu: "services" },
  { label: "Locations", menu: "locations" },
  { label: "Fleet", menu: "fleet" },
  { label: "Resources", menu: "resources" },
  { label: "Company", menu: "company" },
  { label: "Pricing", menu: null, href: "/pricing" },
];

const navServices = [
  { title: "Residential Moving", desc: "Full home relocation, packed and protected.",href:"/services/residental-moving" },
  { title: "Office Relocation", desc: "Minimize downtime with scheduled corporate moves.",href:"/services/office-relocation" },
  { title: "Storage Solutions", desc: "Short and long-term secure storage units.",href:"/services/storage-solutions" },
  { title: "Long-Distance Moves", desc: "Coast-to-coast moves with real-time tracking.",href:"/services/long-distance-moves" },
  { title: "Packing Services", desc: "Professional packing with premium materials.",href:"/services/packing-services" },
  { title: "Vehicle Shipping", desc: "Safe transport for cars, bikes, and boats.",href:"/services/vehicle-shipping" },
];

const navLocationGroups: { region: string; cities: string[] }[] = [
  { region: "West", cities: ["Los Angeles", "San Francisco", "Seattle", "Phoenix"] },
  { region: "Central", cities: ["Chicago", "Dallas", "Denver", "Austin"] },
  { region: "East", cities: ["New York", "Boston", "Miami", "Washington DC"] },
];

const navFleet = [
  { title: "Cargo Van", desc: "Best for studios and small apartments.", href: "/fleet/cargo-van" },
  { title: "Box Truck", desc: "Mid-size moves, 2–3 bedroom homes.", href: "/fleet/box-truck"  },
  { title: "Bike Courier", desc: "Fast local drop-offs and small parcels.", href: "/fleet/bike-courier"  },
  { title: "Packer & Mover", desc: "Full-house and long-distance freight.", href: "/fleet/packer-mover"  },
];

const navResources = [
  { title: "Blog", desc: "Moving tips, city guides, and how-tos.", icon: BookOpen,href:"/resources/blogs" },
  { title: "FAQs", desc: "Answers to common moving questions.", icon: HelpCircle,href:"/resources/faq" },
  { title: "Customer Reviews", desc: "Real stories from real customers.", icon: Star,href:"/resources/customer-reviews" },
  { title: "Moving Checklist", desc: "A free printable planning guide.", icon: FileText,href:"/resources/moving-checklist" },
];

const navCompany = [
  { title: "About Us", desc: "Our story, mission, and values.", icon: Users,href:"/company/about-us" },
  { title: "Careers", desc: "Join our growing moving crew.", icon: Briefcase,href:"/company/careers" },
  { title: "Why Choose Us", desc: "What sets our service apart.", icon: Award,href:"/company/why-choose-us" },
  { title: "Contact Us", desc: "Talk to our relocation specialists.", icon: MessageCircle,href:"/company/contact-us" },
];

const greetings = [
  "👋 Welcome! Get a free moving quote in minutes",
  "⭐ Rated 4.9/5 by 12,000+ happy customers",
  "📦 Licensed, bonded & insured movers nationwide",
  "🕑 24/7 dedicated customer support",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{ fontFamily: "sans-serif" }}>
      {/* ===================== RIBBON GREETING LINE ===================== */}
      <div
        className="overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #003f7d 0%, #005bb5 55%, #4d8f00 100%)",
        }}
      >
        <div className="marquee-track flex items-center py-1.5 whitespace-nowrap" style={{ width: "max-content" }}>
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center shrink-0">
              {greetings.map((g, i) => (
                <span key={i} className="flex items-center text-white text-xs font-semibold px-4">
                  {g}
                  <span className="mx-4 text-lime-300">●</span>
                </span>
              ))}
              <span className="flex items-center gap-1.5 text-xs font-extrabold px-4" style={{ color: "#d9f99d" }}>
                <Phone className="w-3.5 h-3.5" />
                Call now: 91-9694666677  OR 91-9314630634
                <span className="mx-4 text-lime-300">●</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== HEAVY MEGA NAVBAR ===================== */}
      <header
        className="transition-all duration-300"
        style={{
          background: scrolled ? "#fff" : "transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.18)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className={`${scrolled ? "flex" : "hidden"} items-center space-x-1 cursor-pointer`}>
              <img src="/omsai-logo.png" className="w-60"/>
            </div>
              <div className={`${scrolled ? "hidden" : "flex"} items-center space-x-1 cursor-pointer`}>
              <img src="/omsai-logo-white.png" className="w-60"/>
            </div>

            {/* Desktop nav with mega menus */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.menu && setOpenMenu(item.menu)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    href={item.href ?? "#"}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold ${scrolled ? "text-blue-900" : "text-white"} hover:text-lime-300 transition-colors cursor-pointer`}
                  >
                    {item.label}
                    {item.menu && (
                      <ChevronDown
                        className="w-3.5 h-3.5 transition-transform duration-200"
                        style={{ transform: openMenu === item.menu ? "rotate(180deg)" : "none" }}
                      />
                    )}
                  </Link>

                  {/* Services mega menu with promo panel */}
                  {item.menu === "services" && openMenu === "services" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2  bg-white rounded-2xl shadow-2xl p-5 flex gap-5" style={{ width: 680 }}>
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        {navServices.map((s) => (
                          <Link key={s.title} href={s.href} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: "rgba(132,204,22,0.15)" }}
                            >
                              <Package className="w-4 h-4" style={{ color: "#3f6212" }} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{s.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div
                        className="w-52 shrink-0 rounded-xl p-2 flex flex-col justify-between"
                        style={{ background: "linear-gradient(160deg, #005bb5, #003f7d)" }}
                      >
                        <div>
                          <p className="text-white font-black text-sm leading-snug">
                            Free moving checklist
                          </p>
                          <p className="text-blue-100 text-xs mt-1.5 leading-snug">
                            Everything you need to plan a stress-free move.
                          </p>
                        </div>
                        <img src="/free-checklist.png" alt="Free Moving Checklist" className="w-full h-auto rounded-lg" />
                        <button
                          className="mt-1 text-black text-[11px] font-extrabold uppercase tracking-wide px-3 py-2 rounded-full cursor-pointer"
                          style={{ background: "#84cc16" }}
                        >
                          Download free
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Locations mega menu grouped by region */}
                  {item.menu === "locations" && openMenu === "locations" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2  bg-white rounded-2xl shadow-2xl p-5 flex gap-6" style={{ width: 480 }}>
                      {navLocationGroups.map((group:any) => (
                        <div key={group.region} className="flex-1">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-lime-700 mb-2">
                            {group.region}
                          </p>
                          <div className="flex flex-col gap-1">
                            {group.cities.map((city:any) => (
                              <Link
                                key={city}
                                href="#"
                                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-700 py-1.5 transition-colors"
                              >
                                <MapPin className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                                {city}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Fleet mega menu */}
                  {item.menu === "fleet" && openMenu === "fleet" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2  w-80 bg-white rounded-2xl shadow-2xl p-3">
                      {navFleet.map((f) => (
                        <Link key={f.title} href={f.href} className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                          <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{f.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Resources mega menu */}
                  {item.menu === "resources" && openMenu === "resources" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2  w-96 bg-white rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2">
                      {navResources.map((r) => {
                        const Icon = r.icon;
                        return (
                          <Link key={r.title} href={r.href} className="flex gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,91,181,0.1)" }}>
                              <Icon className="w-4 h-4 text-blue-700" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{r.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-snug">{r.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Company mega menu */}
                  {item.menu === "company" && openMenu === "company" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2  w-96 bg-white rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2">
                      {navCompany.map((c) => {
                        const Icon = c.icon;
                        return (
                          <Link key={c.title} href={c.href} className="flex gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(132,204,22,0.15)" }}>
                              <Icon className="w-4 h-4" style={{ color: "#3f6212" }} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{c.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-snug">{c.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side: phone + CTA */}
            <div className="hidden lg:flex items-center gap-5">
              <a href="tel:+18005551234" className="flex items-center gap-2 text-sm font-semibold text-white">
                <Phone className="w-4 h-4" style={{ color: "#84cc16" }} />
                <span className={`${scrolled ? 'text-blue-900' : 'text-white'}`}>
                +91 9694666677
 </span>
              </a>
             <Link href="/get-a-quote"> <button
                className="text-black text-xs font-extrabold uppercase tracking-wide px-5 py-2.5 rounded-full transition-colors duration-300 cursor-pointer"
                style={{ background: "#84cc16" }}
              >
                Get a Quote
              </button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden text-white cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="lg:hidden px-6 pb-6 max-h-[70vh] overflow-y-auto" style={{ background: scrolled ? "#005bb5" : "rgba(0,91,181,0.95)" }}>
            <div className="flex flex-col gap-1 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  className="text-white font-semibold text-sm py-3 border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}
              <a href="tel:+18005551234" className="flex items-center gap-2 text-white font-semibold text-sm py-3">
                <Phone className="w-4 h-4" style={{ color: "#84cc16" }} />
                (800) 555-1234
              </a>
              <button
                className="mt-2 text-black text-xs font-extrabold uppercase tracking-wide px-5 py-3 rounded-full cursor-pointer"
                style={{ background: "#84cc16" }}
              >
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </header>

      <style>{`
        .marquee-track {
          animation: marquee 24s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}