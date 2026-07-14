"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  Users, 
  Calendar, 
  Truck, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  Package,
  DollarSign
} from "lucide-react";

// Mock data - replace with your API calls
const adminStats = [
  { label: "Total Customers", value: "1,284", change: "+12%", up: true, icon: Users, color: "bg-blue-50 text-blue-600" },
  { label: "Active Bookings", value: "156", change: "+8%", up: true, icon: Calendar, color: "bg-emerald-50 text-emerald-600" },
  { label: "Available Drivers", value: "42", change: "-3%", up: false, icon: Truck, color: "bg-amber-50 text-amber-600" },
  { label: "Revenue (MTD)", value: "₹4.2L", change: "+24%", up: true, icon: DollarSign, color: "bg-violet-50 text-violet-600" },
];

const recentBookings = [
  { id: "BK-1042", customer: "Rajesh Kumar", from: "Mumbai", to: "Pune", amount: "₹12,500", status: "Pending", date: "Today" },
  { id: "BK-1041", customer: "Priya Sharma", from: "Delhi", to: "Bangalore", amount: "₹45,000", status: "In Transit", date: "Yesterday" },
  { id: "BK-1040", customer: "Amit Patel", from: "Chennai", to: "Hyderabad", amount: "₹18,200", status: "Delivered", date: "2 days ago" },
  { id: "BK-1039", customer: "Sneha Gupta", from: "Kolkata", to: "Mumbai", amount: "₹32,000", status: "Completed", date: "3 days ago" },
];

const topDrivers = [
  { name: "Suresh Yadav", deliveries: 48, rating: 4.9, status: "Active" },
  { name: "Mohammed Ali", deliveries: 42, rating: 4.8, status: "Active" },
  { name: "Ravi Kumar", deliveries: 38, rating: 4.7, status: "On Duty" },
];

export default function AdminDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Admin Dashboard
          </h2>
          <p className="text-slate-500 mt-1">
            Welcome back, {session?.user?.name?.split(" ")[0] || "Admin"} 👋
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E4995] text-white rounded-xl font-semibold text-sm hover:bg-[#0E4995]/90 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Manage Bookings
          </Link>
          <Link
            href="/admin/reports"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            Reports
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                  {stat.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Recent Bookings</h3>
            <Link 
              href="/admin/bookings" 
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="divide-y divide-slate-100">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{booking.id}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{booking.customer}</p>
                  </div>
                </div>
                <div className="hidden sm:block text-xs text-slate-500">
                  {booking.from} → {booking.to}
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden md:block text-sm font-semibold text-slate-700">{booking.amount}</span>
                  <span className={`
                    px-2.5 py-1 rounded-full text-xs font-semibold
                    ${booking.status === "Completed" ? "bg-emerald-50 text-emerald-600" : 
                      booking.status === "In Transit" ? "bg-blue-50 text-blue-600" : 
                      booking.status === "Pending" ? "bg-amber-50 text-amber-600" :
                      "bg-slate-100 text-slate-600"}
                  `}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Drivers */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Top Drivers</h3>
            <Link 
              href="/admin/drivers" 
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Manage
            </Link>
          </div>
          
          <div className="divide-y divide-slate-100">
            {topDrivers.map((driver, i) => (
              <div key={driver.name} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0E4995] to-[#2F7359] flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">{driver.name}</p>
                  <p className="text-xs text-slate-500">{driver.deliveries} deliveries • ⭐ {driver.rating}</p>
                </div>
                <span className={`
                  px-2 py-0.5 rounded-full text-[10px] font-semibold
                  ${driver.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}
                `}>
                  {driver.status}
                </span>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <Link 
              href="/admin/drivers" 
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Truck className="w-4 h-4" />
              View All Drivers
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Customers", desc: "Manage users", href: "/admin/customers", icon: Users },
          { label: "Bookings", desc: "All orders", href: "/admin/bookings", icon: Calendar },
          { label: "Drivers", desc: "Fleet mgmt", href: "/admin/drivers", icon: Truck },
          { label: "Reports", desc: "Analytics", href: "/admin/reports", icon: BarChart3 },
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