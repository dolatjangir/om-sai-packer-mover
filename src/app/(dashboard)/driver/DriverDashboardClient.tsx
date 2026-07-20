"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Package,
  Phone,
  ArrowRight,
  Star,
  TrendingUp,
  Calendar,
  Navigation,
  User,
  IndianRupee,
  AlertCircle,
  ChevronRight,
  Box,
  Route,
  Timer,
} from "lucide-react";

interface Booking {
  id: string;
  bookingNumber: string;
  status: string;
  fromCity: string;
  toCity: string;
  fromAddress: string;
  toAddress: string;
  movingDate: string;
  preferredTime: string | null;
  estimatedAmount: number | null;
  finalAmount: number | null;
  itemCount: number;
  trackingCode: string | null;
  customer: { name: string | null; phone: string | null; address: string | null };
  trackingUpdates: { status: string; description: string; timestamp: string; location: string | null }[];
}

interface DriverDashboardClientProps {
  bookings: Booking[];
  completedToday: number;
  totalEarnings: number;
  driver: { name: string | null; email: string | null; phone: string | null; image: string | null; createdAt: Date } | null;
}

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof Truck }> = {
  CONFIRMED: { label: "Assigned", icon: Package, color: "text-[var(--blue-700)]", bg: "bg-[var(--blue-50)]" },
  PICKED_UP: { label: "Picked Up", icon: Box, color: "text-[var(--lime-700)]", bg: "bg-[var(--lime-50)]" },
  IN_TRANSIT: { label: "In Transit", icon: Truck, color: "text-[var(--blue-800)]", bg: "bg-[var(--blue-100)]" },
};

export default function DriverDashboardClient({ bookings, completedToday, totalEarnings, driver }: DriverDashboardClientProps) {
  const activeDeliveries = bookings.filter((b) => b.status !== "COMPLETED");
  const pendingPickups = bookings.filter((b) => b.status === "CONFIRMED");
  const inTransit = bookings.filter((b) => b.status === "IN_TRANSIT");

  const nextDelivery = activeDeliveries[0];

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Welcome Header */}
      <div className="bg-[var(--blue-600)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Good Day, {driver?.name?.split(" ")[0] || "Driver"}!
                </h1>
                <p className="text-[var(--blue-100)] text-sm mt-0.5">
                  {activeDeliveries.length > 0
                    ? `You have ${activeDeliveries.length} active delivery${activeDeliveries.length > 1 ? "ies" : "y"} today`
                    : "No active deliveries. Great job!"}
                </p>
              </div>
            </div>
            <Link
              href="/driver/profile"
              className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
            >
              <User className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Deliveries", value: activeDeliveries.length, icon: Truck, color: "text-[var(--blue-600)]", bg: "bg-[var(--blue-50)]", border: "border-[var(--blue-200)]" },
            { label: "Pending Pickup", value: pendingPickups.length, icon: Package, color: "text-[var(--lime-600)]", bg: "bg-[var(--lime-50)]", border: "border-[var(--lime-200)]" },
            { label: "Completed Today", value: completedToday, icon: CheckCircle2, color: "text-[var(--blue-700)]", bg: "bg-[var(--blue-100)]", border: "border-[var(--blue-200)]" },
            { label: "Total Earnings", value: `₹${(totalEarnings / 1000).toFixed(1)}K`, icon: IndianRupee, color: "text-[var(--lime-700)]", bg: "bg-[var(--lime-100)]", border: "border-[var(--lime-200)]" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${stat.bg} rounded-2xl p-5 border-2 ${stat.border}`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-[var(--gray-900)]">{stat.value}</p>
                <p className="text-xs font-medium text-[var(--gray-500)] mt-0.5">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Next Delivery - Priority Card */}
        {nextDelivery && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border-2 border-[var(--lime-300)] shadow-lg overflow-hidden"
          >
            <div className="bg-[var(--lime-500)] px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Next Delivery</span>
              </div>
              <span className="text-xs font-bold text-white bg-white/20 px-2 py-1 rounded-lg">
                {nextDelivery.preferredTime || "Anytime"}
              </span>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--gray-900)]">{nextDelivery.bookingNumber}</h3>
                  <p className="text-sm text-[var(--gray-500)] mt-1">
                    {nextDelivery.itemCount} item categories • {nextDelivery.trackingCode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[var(--lime-600)]">
                    ₹{nextDelivery.estimatedAmount?.toLocaleString("en-IN") || "0"}
                  </p>
                  <p className="text-xs text-[var(--gray-400)]">Estimated payout</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[var(--gray-50)] rounded-xl p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-[var(--blue-600)]" />
                    <span className="text-xs font-bold text-[var(--blue-700)] uppercase">Pickup</span>
                  </div>
                  <p className="font-semibold text-[var(--gray-900)]">{nextDelivery.fromCity}</p>
                  <p className="text-sm text-[var(--gray-600)] line-clamp-1">{nextDelivery.fromAddress}</p>
                </div>
                <div className="pt-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--lime-500)] flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-[var(--lime-600)]" />
                    <span className="text-xs font-bold text-[var(--lime-700)] uppercase">Drop</span>
                  </div>
                  <p className="font-semibold text-[var(--gray-900)]">{nextDelivery.toCity}</p>
                  <p className="text-sm text-[var(--gray-600)] line-clamp-1">{nextDelivery.toAddress}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/driver/deliveries/${nextDelivery.id}`}
                  className="flex-1 py-3 bg-[var(--blue-600)] text-white rounded-xl font-semibold text-center hover:bg-[var(--blue-700)] transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Start Navigation
                </Link>
                <a
                  href={`tel:${nextDelivery.customer.phone}`}
                  className="flex-1 py-3 bg-[var(--lime-500)] text-white rounded-xl font-semibold text-center hover:bg-[var(--lime-600)] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Customer
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Deliveries List */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--gray-100)] flex items-center justify-between">
            <h3 className="font-bold text-[var(--gray-900)]">Active Deliveries</h3>
            <Link
              href="/driver/deliveries"
              className="text-sm font-semibold text-[var(--blue-600)] hover:text-[var(--blue-700)] flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {activeDeliveries.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-[var(--gray-300)] mx-auto mb-3" />
              <p className="text-[var(--gray-500)]">No active deliveries</p>
              <p className="text-sm text-[var(--gray-400)] mt-1">All caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--gray-100)]">
              {activeDeliveries.map((delivery, idx) => {
                const config = statusConfig[delivery.status] || statusConfig.CONFIRMED;
                const StatusIcon = config.icon;
                return (
                  <motion.div
                    key={delivery.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-6 py-4 hover:bg-[var(--gray-50)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                          <StatusIcon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-[var(--gray-900)] text-sm">{delivery.bookingNumber}</p>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${config.bg} ${config.color}`}>
                              {config.label}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--gray-500)] mt-0.5">
                            {delivery.fromCity} → {delivery.toCity} • {delivery.itemCount} items
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[var(--gray-900)]">
                          ₹{delivery.estimatedAmount?.toLocaleString("en-IN") || "0"}
                        </span>
                        <Link
                          href={`/driver/deliveries/${delivery.id}`}
                          className="p-2 rounded-lg bg-[var(--blue-50)] hover:bg-[var(--blue-100)] transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-[var(--blue-600)]" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "My Deliveries", href: "/driver/deliveries", icon: Route, color: "bg-[var(--blue-600)]", text: "text-white" },
            { label: "Update Location", href: "/driver/tracking", icon: MapPin, color: "bg-[var(--lime-500)]", text: "text-white" },
            { label: "Earnings", href: "/driver/earnings", icon: TrendingUp, color: "bg-[var(--gray-100)]", text: "text-[var(--gray-700)]" },
            { label: "Profile", href: "/driver/profile", icon: User, color: "bg-[var(--gray-100)]", text: "text-[var(--gray-700)]" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className={`${action.color} ${action.text} rounded-2xl p-5 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-semibold">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}