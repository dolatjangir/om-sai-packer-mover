"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  Calendar, 
  MapPin, 
  Package, 
  Clock, 
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

interface DashboardData {
  stats: {
    totalBookings: number;
    activeMoves: number;
    delivered: number;
  };
  recentBookings: Array<{
    id: string;
    from: string;
    to: string;
    date: string;
    status: string;
    items: string;
  }>;
}

export default function UserDashboardPage() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/userdashdata");
        const json = await res.json();
        if (json.success) {
          setDashboardData(json.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const stats = [
    { label: "Total Bookings", value: String(dashboardData?.stats.totalBookings ?? 0), icon: Calendar, color: "bg-blue-50 text-blue-600" },
    { label: "Active Moves", value: String(dashboardData?.stats.activeMoves ?? 0), icon: Package, color: "bg-amber-50 text-amber-600" },
    { label: "Delivered", value: String(dashboardData?.stats.delivered ?? 0), icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
  ];

  const recentBookings = dashboardData?.recentBookings ?? [];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0E4995] to-[#2F7359] rounded-2xl p-6 lg:p-8 text-white">
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">
          Welcome back, {session?.user?.name?.split(" ")[0] || "User"}! 👋
        </h2>
        <p className="text-white/80 max-w-lg">
          Track your moves, manage bookings, and stay updated on your deliveries all in one place.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/user/booking"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0E4995] rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            New Booking
          </Link>
          <Link
            href="/user/tracking"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 text-white rounded-xl font-semibold text-sm hover:bg-white/25 transition-colors border border-white/20"
          >
            <MapPin className="w-4 h-4" />
            Track Shipment
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <TrendingUp className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Recent Bookings</h3>
          <Link 
            href="/user/booking" 
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="px-6 py-8 text-center text-slate-400 text-sm">Loading bookings...</div>
        ) : recentBookings.length === 0 ? (
          <div className="px-6 py-8 text-center text-slate-400 text-sm">No bookings yet</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{booking.id}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {booking.from} → {booking.to} • {booking.items}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    {booking.date}
                  </div>
                  <span className={`
                    px-2.5 py-1 rounded-full text-xs font-semibold
                    ${booking.status === "Delivered" ? "bg-emerald-50 text-emerald-600" : 
                      booking.status === "In Transit" ? "bg-amber-50 text-amber-600" : 
                      "bg-slate-100 text-slate-600"}
                  `}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Track Shipment", desc: "Real-time location", href: "/user/tracking", icon: MapPin },
          { label: "Book a Move", desc: "Schedule pickup", href: "/user/booking", icon: Calendar },
          { label: "Edit Profile", desc: "Update details", href: "/user/profile", icon: Package },
          { label: "Support", desc: "Get help", href: "#", icon: CheckCircle2 },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <p className="font-semibold text-slate-800 text-sm">{action.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}