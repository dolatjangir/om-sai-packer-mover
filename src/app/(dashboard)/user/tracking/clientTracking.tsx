"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Truck,
  Clock,
  CheckCircle2,
  Package,
  Phone,
  Calendar,
  ArrowRight,
  Search,
  Loader2,
  AlertCircle,
  Home,
  Building2,
  Star,
  Shield,
  Navigation,
} from "lucide-react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────

interface TrackingUpdate {
  id: string;
  status: string;
  description: string;
  location: string | null;
  timestamp: string;
}

interface Driver {
  name: string | null;
  phone: string | null;
}

interface Booking {
  id: string;
  bookingNumber: string;
  serviceType: string;
  status: string;
  fromAddress: string;
  fromCity: string;
  fromPincode: string;
  toAddress: string;
  toCity: string;
  toPincode: string;
  movingDate: string | Date;
  preferredTime: string | null;
  estimatedAmount: number | null;
  trackingCode: string | null;
  itemCount: number;
  driver: Driver | null;
  trackingUpdates: TrackingUpdate[];
}

interface TrackingClientProps {
  initialBookings: Booking[];
}

// ─── Status Configuration ────────────────────────────────────────────

const statusConfig: Record<
  string,
  { label: string; icon: typeof Truck; color: string; bg: string }
> = {
  PENDING: {
    label: "Booking Confirmed",
    icon: CheckCircle2,
    color: "text-[var(--blue-600)]",
    bg: "bg-[var(--blue-50)]",
  },
  CONFIRMED: {
    label: "Confirmed",
    icon: CheckCircle2,
    color: "text-[var(--blue-600)]",
    bg: "bg-[var(--blue-50)]",
  },
  PICKED_UP: {
    label: "Picked Up",
    icon: Package,
    color: "text-[var(--lime-600)]",
    bg: "bg-[var(--lime-50)]",
  },
  IN_TRANSIT: {
    label: "In Transit",
    icon: Truck,
    color: "text-[var(--blue-700)]",
    bg: "bg-[var(--blue-100)]",
  },
  DELIVERED: {
    label: "Delivered",
    icon: CheckCircle2,
    color: "text-[var(--lime-600)]",
    bg: "bg-[var(--lime-50)]",
  },
  COMPLETED: {
    label: "Completed",
    icon: Star,
    color: "text-[var(--lime-600)]",
    bg: "bg-[var(--lime-50)]",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
};

const statusSteps = [
  { key: "PENDING", label: "Confirmed", icon: CheckCircle2 },
  { key: "CONFIRMED", label: "Confirmed", icon: CheckCircle2 },
  { key: "PICKED_UP", label: "Picked Up", icon: Package },
  { key: "IN_TRANSIT", label: "In Transit", icon: Truck },
  { key: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
];

// ─── Main Component ─────────────────────────────────────────────────

export default function TrackingClient({ initialBookings }: TrackingClientProps) {
  const [searchCode, setSearchCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState<"active" | "all">("active");

  const handleSearch = async () => {
    if (!searchCode.trim()) {
      setSearchError("Please enter a tracking code");
      return;
    }
    setIsSearching(true);
    setSearchError("");
    setSearchedBooking(null);

    try {
      const res = await fetch(`/api/tracking?code=${encodeURIComponent(searchCode.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setSearchError(data.message || "Tracking code not found");
        return;
      }

      setSearchedBooking(data.data.booking);
    } catch {
      setSearchError("Network error. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const displayBookings = searchedBooking
    ? [searchedBooking]
    : activeTab === "active"
    ? initialBookings
    : initialBookings; // You can fetch all bookings via separate API if needed

  const hasBookings = displayBookings.length > 0;

  return (
    <div className="min-h-screen bg-(--gray-50)">
      {/* Header */}
      <div className="bg-white border-b border-(--gray-200)">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-(--blue-600) flex items-center justify-center">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-(--gray-900)">
                Track Your Shipment
              </h1>
              <p className="text-sm text-(--gray-500)">
                Monitor your move in real-time
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Search Section */}
        <div className="bg-white rounded-2xl border border-(--gray-200) shadow-sm p-6">
          <label className="block text-sm font-semibold text-(--gray-700) mb-3">
            Enter Tracking Code
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-(--gray-400)" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => {
                  setSearchCode(e.target.value.toUpperCase());
                  setSearchError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="e.g. TRK-A1B2C3D4"
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-(--gray-200) bg-white text-[var(--gray-900)] font-medium placeholder:text-[var(--gray-400)] focus:outline-none focus:border-[var(--blue-500)] transition-colors uppercase tracking-wider"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-6 py-3 bg-(--blue-600) text-white rounded-xl font-semibold hover:bg-(--blue-700) transition-all shadow-lg shadow-[var(--blue-200)] active:scale-95 disabled:opacity-70 flex items-center gap-2"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Track
            </button>
          </div>
          {searchError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-sm text-red-600 font-medium flex items-center gap-1.5"
            >
              <AlertCircle className="w-4 h-4" />
              {searchError}
            </motion.p>
          )}
        </div>

        {/* Tabs */}
        {!searchedBooking && initialBookings.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === "active"
                  ? "bg-(--blue-600) text-white shadow-md"
                  : "bg-white text-(--gray-600) border border-(--gray-200) hover:border-(--blue-300)"
              }`}
            >
              Active Shipments ({initialBookings.length})
            </button>
            <Link
              href="/user/bookings"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-white text-(--gray-600) border border-(--gray-200) hover:border-[var(--blue-300)] transition-all"
            >
              View All Bookings
            </Link>
          </div>
        )}

        {/* Bookings List */}
        <AnimatePresence mode="wait">
          {hasBookings ? (
            <div className="space-y-6">
              {displayBookings.map((booking, index) => (
                <BookingCard key={booking.id} booking={booking} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState searched={!!searchedBooking} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ─── Booking Card ────────────────────────────────────────────────────

function BookingCard({ booking, index }: { booking: Booking; index: number }) {
  const currentStatusIndex = statusSteps.findIndex(
    (s) => s.key === booking.status
  );
  const config = statusConfig[booking.status] || statusConfig.PENDING;
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-(--gray-200) shadow-sm overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-6 border-b border-(--gray-100)">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}
            >
              <StatusIcon className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-(--gray-900)">
                  {booking.bookingNumber}
                </h3>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${config.bg} ${config.color}`}
                >
                  {config.label}
                </span>
              </div>
              <p className="text-sm text-(--gray-500) mt-1">
                {formatServiceType(booking.serviceType)} • {booking.itemCount}{" "}
                item categories
              </p>
            </div>
          </div>

          {booking.estimatedAmount && (
            <div className="text-right">
              <p className="text-xs text-(--gray-400)">Estimated</p>
              <p className="text-xl font-bold text-(--lime-600)">
                ₹{Number(booking.estimatedAmount).toLocaleString("en-IN")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Route Info */}
      <div className="px-6 py-4 bg-(--gray-50) border-b border-(--gray-100)">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Home className="w-4 h-4 text-(--blue-600)" />
              <span className="text-sm font-semibold text-(--gray-800)">
                {booking.fromCity}
              </span>
            </div>
            <p className="text-xs text-(--gray-500) pl-6 line-clamp-1">
              {booking.fromAddress}, {booking.fromPincode}
            </p>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="w-8 h-8 rounded-full bg-(--lime-500) flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-(--gray-400) mt-1">
              {booking.trackingCode}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-[var(--lime-600)]" />
              <span className="text-sm font-semibold text-[var(--gray-800)]">
                {booking.toCity}
              </span>
            </div>
            <p className="text-xs text-[var(--gray-500)] pl-6 line-clamp-1">
              {booking.toAddress}, {booking.toPincode}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-xs text-[var(--gray-500)]">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            {new Date(booking.movingDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          {booking.preferredTime && (
            <>
              <span className="text-[var(--gray-300)]">•</span>
              <Clock className="w-3.5 h-3.5" />
              <span>{booking.preferredTime}</span>
            </>
          )}
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-[var(--gray-700)] mb-4">
          Shipment Progress
        </h4>
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-[var(--gray-200)] rounded-full">
            <motion.div
              className="h-full bg-[var(--lime-500)] rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.max(
                  ((currentStatusIndex + 1) / statusSteps.length) * 100,
                  15
                )}%`,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <div className="relative flex justify-between">
            {statusSteps.map((step, idx) => {
              const isCompleted = idx <= currentStatusIndex;
              const isCurrent = idx === currentStatusIndex;
              const StepIcon = step.icon;

              return (
                <div key={step.key} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.15, type: "spring" }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? "bg-[var(--lime-500)] border-[var(--lime-500)] text-white"
                        : "bg-white border-[var(--gray-300)] text-[var(--gray-400)]"
                    } ${isCurrent ? "ring-4 ring-[var(--lime-500)]/30 shadow-lg" : ""}`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </motion.div>
                  <span
                    className={`text-xs mt-2 font-semibold ${
                      isCompleted
                        ? "text-[var(--gray-900)]"
                        : "text-[var(--gray-400)]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tracking Updates */}
      {booking.trackingUpdates.length > 0 && (
        <div className="px-6 pb-6">
          <h4 className="text-sm font-semibold text-[var(--gray-700)] mb-3">
            Latest Updates
          </h4>
          <div className="space-y-3">
            {booking.trackingUpdates.slice(0, 3).map((update, idx) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-100)]"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-[var(--gray-200)] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-[var(--blue-600)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--gray-800)]">
                    {update.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[var(--gray-400)]">
                    {update.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {update.location}
                      </span>
                    )}
                    <span>
                      {new Date(update.timestamp).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Driver Card */}
      {booking.driver?.name && (
        <div className="mx-6 mb-6 p-4 bg-[var(--blue-50)] rounded-xl border border-[var(--blue-100)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--blue-600)] flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--blue-800)]">
                  Driver Assigned
                </p>
                <p className="text-sm text-[var(--blue-700)]">
                  {booking.driver.name}
                </p>
              </div>
            </div>
            {booking.driver.phone && (
              <a
                href={`tel:${booking.driver.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--blue-600)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--blue-700)] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
            )}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-[var(--gray-50)] border-t border-[var(--gray-100)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[var(--gray-500)]">
          <Shield className="w-4 h-4 text-[var(--lime-500)]" />
          <span>Insured & GPS Tracked</span>
        </div>
        <Link
          href={`/user/booking/${booking.id}`}
          className="text-sm font-semibold text-[var(--blue-600)] hover:text-[var(--blue-700)] transition-colors flex items-center gap-1"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────

function EmptyState({ searched }: { searched: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-[var(--gray-200)] p-12 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-[var(--gray-100)] flex items-center justify-center mx-auto mb-4">
        <MapPin className="w-10 h-10 text-[var(--gray-300)]" />
      </div>
      <h3 className="text-lg font-bold text-[var(--gray-700)] mb-2">
        {searched ? "No Shipment Found" : "No Active Shipments"}
      </h3>
      <p className="text-sm text-[var(--gray-500)] max-w-md mx-auto mb-6">
        {searched
          ? "We couldn't find any booking with that tracking code. Please check and try again."
          : "You don't have any active shipments right now. Create a new booking to get started."}
      </p>
      {!searched && (
        <Link
          href="/user/bookings/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--blue-600)] text-white rounded-xl font-semibold hover:bg-[var(--blue-700)] transition-all shadow-lg shadow-[var(--blue-200)]"
        >
          <Truck className="w-4 h-4" />
          New Booking
        </Link>
      )}
    </motion.div>
  );
}

// ─── Helper ──────────────────────────────────────────────────────────

function formatServiceType(type: string): string {
  const map: Record<string, string> = {
    LOCAL_MOVING: "Local Move",
    INTERCITY_MOVING: "Intercity Move",
    OFFICE_MOVING: "Office Shifting",
    VEHICLE_TRANSPORT: "Vehicle Transport",
    WAREHOUSE_STORAGE: "Warehouse Storage",
    PACKING_ONLY: "Packing Service",
  };
  return map[type] || type.replace(/_/g, " ");
}