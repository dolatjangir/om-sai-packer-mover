"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Package,
  Phone,
  ArrowLeft,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  IndianRupee,
  Box,
  Star,
  Ban,
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
  paymentStatus: string;
  customer: { name: string | null; phone: string | null };
  trackingUpdates: { status: string; description: string; timestamp: string }[];
}

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: typeof Truck }> = {
  CONFIRMED: { label: "Assigned", icon: Package, color: "text-[var(--blue-700)]", bg: "bg-[var(--blue-50)]", border: "border-[var(--blue-200)]" },
  PICKED_UP: { label: "Picked Up", icon: Box, color: "text-[var(--lime-700)]", bg: "bg-[var(--lime-50)]", border: "border-[var(--lime-200)]" },
  IN_TRANSIT: { label: "In Transit", icon: Truck, color: "text-[var(--blue-800)]", bg: "bg-[var(--blue-100)]", border: "border-[var(--blue-300)]" },
  DELIVERED: { label: "Delivered", icon: CheckCircle2, color: "text-[var(--lime-800)]", bg: "bg-[var(--lime-100)]", border: "border-[var(--lime-300)]" },
  COMPLETED: { label: "Completed", icon: Star, color: "text-[var(--gray-800)]", bg: "bg-[var(--gray-100)]", border: "border-[var(--gray-300)]" },
  CANCELLED: { label: "Cancelled", icon: Ban, color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

const tabs = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export default function DriverDeliveriesClient({ bookings }: { bookings: Booking[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && ["CONFIRMED", "PICKED_UP", "IN_TRANSIT"].includes(b.status)) ||
        (activeTab === "completed" && ["DELIVERED", "COMPLETED"].includes(b.status)) ||
        (activeTab === "cancelled" && b.status === "CANCELLED");

      const matchesSearch =
        !searchQuery ||
        b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.toCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.trackingCode?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/driver" className="w-10 h-10 rounded-xl bg-[var(--gray-100)] flex items-center justify-center hover:bg-[var(--gray-200)] transition-colors">
              <ArrowLeft className="w-5 h-5 text-[var(--gray-600)]" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--gray-900)]">My Deliveries</h1>
              <p className="text-sm text-[var(--gray-500)]">{bookings.length} total deliveries</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by booking #, city, tracking code..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] focus:outline-none focus:border-[var(--blue-500)] transition-colors"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-[var(--blue-600)] text-white shadow-md"
                    : "bg-[var(--gray-100)] text-[var(--gray-600)] hover:bg-[var(--gray-200)]"
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-white/20" : "bg-[var(--gray-200)]"
                }`}>
                  {tab.id === "all" ? bookings.length :
                   tab.id === "active" ? bookings.filter(b => ["CONFIRMED", "PICKED_UP", "IN_TRANSIT"].includes(b.status)).length :
                   tab.id === "completed" ? bookings.filter(b => ["DELIVERED", "COMPLETED"].includes(b.status)).length :
                   bookings.filter(b => b.status === "CANCELLED").length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="space-y-4">
          {filtered.map((booking, idx) => {
            const config = statusConfig[booking.status] || statusConfig.CONFIRMED;
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center border ${config.border}`}>
                      <StatusIcon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-[var(--gray-900)]">{booking.bookingNumber}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${config.bg} ${config.color} border ${config.border}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--gray-500)] mt-0.5">
                        {new Date(booking.movingDate).toLocaleDateString("en-IN", { day: "numeric", month: "long" })} • {booking.preferredTime || "Anytime"}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xl font-bold text-[var(--lime-600)]">
                      ₹{booking.finalAmount?.toLocaleString("en-IN") || booking.estimatedAmount?.toLocaleString("en-IN") || "0"}
                    </p>
                    <p className="text-xs text-[var(--gray-400)]">{booking.paymentStatus}</p>
                  </div>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 bg-[var(--gray-50)] rounded-xl p-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--gray-900)] truncate">{booking.fromCity}</p>
                    <p className="text-xs text-[var(--gray-500)] truncate">{booking.fromAddress}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--lime-500)] flex items-center justify-center flex-shrink-0">
                    <ArrowLeft className="w-4 h-4 text-white rotate-180" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--gray-900)] truncate">{booking.toCity}</p>
                    <p className="text-xs text-[var(--gray-500)] truncate">{booking.toAddress}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/driver/deliveries/${booking.id}`}
                    className="flex-1 py-2.5 bg-[var(--blue-600)] text-white rounded-xl font-semibold text-sm text-center hover:bg-[var(--blue-700)] transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    View Details
                  </Link>
                  {booking.customer.phone && (
                    <a
                      href={`tel:${booking.customer.phone}`}
                      className="py-2.5 px-4 bg-[var(--lime-500)] text-white rounded-xl font-semibold text-sm hover:bg-[var(--lime-600)] transition-colors flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-[var(--gray-300)] mx-auto mb-3" />
              <p className="text-[var(--gray-500)]">No deliveries found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}