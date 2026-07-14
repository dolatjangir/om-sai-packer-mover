"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck,
  ArrowRight
} from "lucide-react";

const todayDeliveries = [
  { id: "DL-501", from: "Mumbai Central", to: "Andheri West", status: "Pending", time: "10:00 AM" },
  { id: "DL-502", from: "Bandra East", to: "Juhu", status: "In Progress", time: "11:30 AM" },
  { id: "DL-503", from: "Dadar", to: "Thane", status: "Completed", time: "9:00 AM" },
];

const stats = [
  { label: "Today's Deliveries", value: "8", icon: Package },
  { label: "Completed", value: "5", icon: CheckCircle2 },
  { label: "In Progress", value: "2", icon: Truck },
  { label: "Earnings Today", value: "₹2,400", icon: Clock },
];

export default function DriverDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#0E4995] to-[#2F7359] rounded-2xl p-6 lg:p-8 text-white">
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">
          Good Day, {session?.user?.name?.split(" ")[0] || "Driver"}! 🚚
        </h2>
        <p className="text-white/80">
          You have 3 deliveries scheduled for today. Stay safe on the road!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Today's Deliveries */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Today's Deliveries</h3>
          <Link 
            href="/driver/deliveries" 
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="divide-y divide-slate-100">
          {todayDeliveries.map((delivery) => (
            <div key={delivery.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{delivery.id}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {delivery.from} → {delivery.to}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  {delivery.time}
                </span>
                <span className={`
                  px-2.5 py-1 rounded-full text-xs font-semibold
                  ${delivery.status === "Completed" ? "bg-emerald-50 text-emerald-600" : 
                    delivery.status === "In Progress" ? "bg-blue-50 text-blue-600" : 
                    "bg-amber-50 text-amber-600"}
                `}>
                  {delivery.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/driver/tracking"
          className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <p className="font-semibold text-slate-800 text-sm">Update Location</p>
          <p className="text-xs text-slate-500 mt-0.5">Share real-time tracking</p>
        </Link>
        <Link
          href="/driver/profile"
          className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Package className="w-5 h-5" />
          </div>
          <p className="font-semibold text-slate-800 text-sm">Driver Profile</p>
          <p className="text-xs text-slate-500 mt-0.5">View performance stats</p>
        </Link>
      </div>
    </div>
  );
}