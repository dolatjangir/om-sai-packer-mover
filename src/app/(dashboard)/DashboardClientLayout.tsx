"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  User,
  Users,
  Truck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Shield,
  Package,
} from "lucide-react";
import { LayoutGroup } from "framer-motion";
import { blockquote } from "framer-motion/m";

const navigationConfig = {
  USER: [
    { name: "Dashboard", href: "/user", icon: LayoutDashboard },
    { name: "Bookings", href: "/user/booking", icon: Calendar },
    { name: "Tracking", href: "/user/tracking", icon: MapPin },
    { name: "Profile", href: "/user/profile", icon: User },
  ],
  ADMIN: [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Drivers", href: "/admin/drivers", icon: Truck },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
     { name: "Leads", href: "/admin/leads", icon: Users },
     {name:"Seo Manager", href:"/admin/seo-manager", icon:LayoutGroup},
     {name:"Blog Manager", href:"/admin/blogs", icon:blockquote}
  ],
  DRIVER: [
    { name: "Dashboard", href: "/driver", icon: LayoutDashboard },
    { name: "My Deliveries", href: "/driver/deliveries", icon: Package },
    { name: "Tracking", href: "/driver/tracking", icon: MapPin },
    { name: "Profile", href: "/driver/profile", icon: User },
  ],
};

export default function DashboardClientLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userRole = session?.user?.role as "USER" | "ADMIN" | "DRIVER" | undefined;
  const navItems = userRole ? navigationConfig[userRole] : [];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 bg-white h-[100dvh]  border-r  border-slate-200 
          transition-all duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? "w-64" : "w-20"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
          <Link href={userRole === "ADMIN" ? "/admin" : userRole === "DRIVER" ? "/driver" : "/user"} className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0E4995] to-[#2F7359] flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className={`font-bold text-slate-800 whitespace-nowrap transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-0"}`}>
              Om Sai
            </span>
          </Link>

          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex w-6 h-6 rounded-full bg-slate-100 items-center justify-center hover:bg-slate-200 transition-colors">
            {sidebarOpen ? <ChevronLeft className="w-3 h-3 text-slate-500" /> : <ChevronRight className="w-3 h-3 text-slate-500" />}
          </button>

          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                  ${!sidebarOpen && "lg:justify-center lg:px-2"}
                `}
                title={!sidebarOpen ? item.name : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                <span className={`whitespace-nowrap transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
                  {item.name}
                </span>
                {isActive && sidebarOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200 space-y-2">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 ${!sidebarOpen && "lg:justify-center"}`}>
            <Shield className="w-4 h-4 text-slate-400 shrink-0" />
            <span className={`text-xs font-semibold text-slate-500 uppercase tracking-wider transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
              {userRole}
            </span>
          </div>

          <button onClick={handleSignOut} className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 
              hover:bg-red-50 transition-all duration-200
              ${!sidebarOpen && "lg:justify-center lg:px-2"}
            `} title={!sidebarOpen ? "Sign Out" : undefined}>
            <LogOut className="w-5 h-5 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col max-h-dvh overflow-y-auto min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-lg font-bold text-slate-800 capitalize">{pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-800">{session?.user?.name || "User"}</span>
                <span className="text-xs text-slate-500">{session?.user?.email}</span>
              </div>
             {session?.user?.image ? (
  <img
    src={session.user.image}
    alt={session.user.name || "User"}
    className="w-9 h-9 rounded-full object-cover"
    referrerPolicy="no-referrer"
  />
) : (
  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0E4995] to-[#2F7359] flex items-center justify-center text-white text-sm font-bold">
    {(session?.user?.name?.[0] || session?.user?.email?.[0] || "U").toUpperCase()}
  </div>
)}
            </div>
          </div>
        </header>

        <main className="flex-1 h-[calc(100dvh-4rem)] p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
