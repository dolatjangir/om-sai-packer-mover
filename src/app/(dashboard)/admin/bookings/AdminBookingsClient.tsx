"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Filter,
  Search,
  Truck,
  Phone,
  Mail,
  User,
  Calendar,
  MapPin,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Eye,
  Edit3,
  Send,
  Loader2,
  AlertCircle,
  Star,
  Clock,
  Home,
  Building2,
  ArrowRight,
  Download,
  RefreshCw,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────

interface Driver {
  id: string;
  name: string | null;
  phone: string | null;
}

interface TrackingUpdate {
  id: string;
  status: string;
  description: string;
  location: string | null;
  timestamp: string;
}

interface Payment {
  id: string;
  amount: number;
  method: string;
  status: string;
  paidAt: string;
}

interface Booking {
  id: string;
  bookingNumber: string;
  serviceType: string;
  status: string;
  fromCity: string;
  toCity: string;
  fromAddress: string;
  toAddress: string;
  movingDate: string;
  preferredTime: string | null;
  estimatedAmount: number | null;
  finalAmount: number | null;
  discountAmount: number;
  taxAmount: number;
  paymentStatus: string;
  trackingCode: string | null;
  itemCount: number;
  customerNotes: string | null;
  adminNotes: string | null;
  createdAt: string;
  customer: { name: string | null; email: string | null; phone: string | null };
  driver: Driver | null;
  trackingUpdates: TrackingUpdate[];
  payments: Payment[];
}

interface AdminBookingsClientProps {
  initialBookings: Booking[];
  drivers: Driver[];
}

// ─── Status Config ───────────────────────────────────────────────────

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; border: string; icon: typeof Truck }
> = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    color: "text-[var(--blue-700)]",
    bg: "bg-[var(--blue-50)]",
    border: "border-[var(--blue-200)]",
  },
  CONFIRMED: {
    label: "Confirmed",
    icon: CheckCircle2,
    color: "text-[var(--blue-800)]",
    bg: "bg-[var(--blue-100)]",
    border: "border-[var(--blue-300)]",
  },
  PICKED_UP: {
    label: "Picked Up",
    icon: Package,
    color: "text-[var(--lime-700)]",
    bg: "bg-[var(--lime-50)]",
    border: "border-[var(--lime-200)]",
  },
  IN_TRANSIT: {
    label: "In Transit",
    icon: Truck,
    color: "text-[var(--blue-900)]",
    bg: "bg-[var(--blue-100)]",
    border: "border-[var(--blue-300)]",
  },
  DELIVERED: {
    label: "Delivered",
    icon: Home,
    color: "text-[var(--lime-800)]",
    bg: "bg-[var(--lime-100)]",
    border: "border-[var(--lime-300)]",
  },
  COMPLETED: {
    label: "Completed",
    icon: Star,
    color: "text-[var(--gray-800)]",
    bg: "bg-[var(--gray-100)]",
    border: "border-[var(--gray-300)]",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
};

const statusFlow = [
  "PENDING",
  "CONFIRMED",
  "PICKED_UP",
  "IN_TRANSIT",
  "DELIVERED",
  "COMPLETED",
];

// ─── Main Component ─────────────────────────────────────────────────

export default function AdminBookingsClient({
  initialBookings,
  drivers,
}: AdminBookingsClientProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string>("");
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);

  // Filter & Search
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        !searchQuery ||
        b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.toCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.trackingCode?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || b.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "PENDING").length,
      active: bookings.filter((b) =>
        ["CONFIRMED", "PICKED_UP", "IN_TRANSIT"].includes(b.status)
      ).length,
      completed: bookings.filter((b) => b.status === "COMPLETED").length,
      revenue: bookings.reduce(
        (sum, b) => sum + (b.finalAmount || b.estimatedAmount || 0),
        0
      ),
    };
  }, [bookings]);

  // Actions
  const updateStatus = async (bookingId: string, newStatus: string) => {
    setLoadingId(bookingId);
    setActionError("");

    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setActionError(data.message || "Failed to update status");
        return;
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch {
      setActionError("Network error");
    } finally {
      setLoadingId(null);
    }
  };

  const assignDriver = async (bookingId: string, driverId: string) => {
    setLoadingId(bookingId);
    setActionError("");

    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setActionError(data.message || "Failed to assign driver");
        return;
      }

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, driver: data.data.driver, status: "CONFIRMED" }
            : b
        )
      );
      setShowAssignModal(null);
    } catch {
      setActionError("Network error");
    } finally {
      setLoadingId(null);
    }
  };

  const getNextStatus = (current: string) => {
    const idx = statusFlow.indexOf(current);
    return idx >= 0 && idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
  };

  const getPrevStatus = (current: string) => {
    const idx = statusFlow.indexOf(current);
    return idx > 0 ? statusFlow[idx - 1] : null;
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--gray-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin"
              className="w-10 h-10 rounded-xl bg-[var(--gray-100)] flex items-center justify-center hover:bg-[var(--gray-200)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--gray-600)]" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[var(--gray-900)]">
                All Bookings
              </h1>
              <p className="text-sm text-[var(--gray-500)]">
                Manage and track all customer moves
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: "Total", value: stats.total, color: "text-[var(--gray-900)]", bg: "bg-[var(--gray-100)]" },
              { label: "Pending", value: stats.pending, color: "text-[var(--blue-700)]", bg: "bg-[var(--blue-50)]" },
              { label: "Active", value: stats.active, color: "text-[var(--lime-700)]", bg: "bg-[var(--lime-50)]" },
              { label: "Completed", value: stats.completed, color: "text-[var(--gray-700)]", bg: "bg-[var(--gray-100)]" },
              { label: "Revenue", value: `₹${(stats.revenue / 1000).toFixed(0)}K`, color: "text-[var(--lime-700)]", bg: "bg-[var(--lime-50)]" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`${stat.bg} rounded-xl p-3 border border-[var(--gray-200)]`}
              >
                <p className="text-xs text-[var(--gray-500)] font-medium">
                  {stat.label}
                </p>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by booking #, customer, city, tracking code..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] focus:outline-none focus:border-[var(--blue-500)] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-700)] font-medium focus:outline-none focus:border-[var(--blue-500)]"
            >
              <option value="all">All Status</option>
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <option key={key} value={key}>
                  {cfg.label}
                </option>
              ))}
            </select>
            <button className="px-4 py-3 bg-white border-2 border-[var(--gray-200)] rounded-xl hover:border-[var(--blue-300)] transition-colors">
              <Filter className="w-5 h-5 text-[var(--gray-600)]" />
            </button>
            <button className="px-4 py-3 bg-[var(--blue-600)] text-white rounded-xl hover:bg-[var(--blue-700)] transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error */}
        {actionError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {actionError}
          </motion.div>
        )}

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                <tr>
                  {["Booking #", "Customer", "Route", "Date", "Status", "Amount", "Driver", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-bold text-[var(--gray-500)] uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--gray-100)]">
                {filteredBookings.map((booking) => {
                  const config = statusConfig[booking.status] || statusConfig.PENDING;
                  const StatusIcon = config.icon;
                  const isExpanded = expandedId === booking.id;
                  const nextStatus = getNextStatus(booking.status);
                  const prevStatus = getPrevStatus(booking.status);

                  return (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`hover:bg-[var(--gray-50)] transition-colors ${
                        isExpanded ? "bg-[var(--blue-50)]/30" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-bold text-[var(--blue-600)]">
                            {booking.bookingNumber}
                          </p>
                          <p className="text-xs text-[var(--gray-400)]">
                            {booking.trackingCode}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                            <User className="w-4 h-4 text-[var(--blue-600)]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[var(--gray-900)]">
                              {booking.customer.name || "N/A"}
                            </p>
                            <p className="text-xs text-[var(--gray-500)]">
                              {booking.customer.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-[var(--gray-700)]">
                          <span>{booking.fromCity}</span>
                          <ArrowRight className="w-3 h-3 text-[var(--gray-400)]" />
                          <span>{booking.toCity}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-[var(--gray-700)]">
                          {new Date(booking.movingDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                        <p className="text-xs text-[var(--gray-400)]">
                          {booking.preferredTime}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${config.bg} ${config.color} border ${config.border}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold text-[var(--gray-900)]">
                          ₹
                          {(booking.finalAmount || booking.estimatedAmount || 0).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                        <p className="text-xs text-[var(--gray-400)]">
                          {booking.paymentStatus}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        {booking.driver ? (
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[var(--lime-100)] flex items-center justify-center">
                              <Truck className="w-3.5 h-3.5 text-[var(--lime-600)]" />
                            </div>
                            <span className="text-sm text-[var(--gray-700)]">
                              {booking.driver.name}
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowAssignModal(booking.id)}
                            className="text-xs font-semibold text-[var(--blue-600)] hover:text-[var(--blue-700)] px-2 py-1 bg-[var(--blue-50)] rounded-lg border border-[var(--blue-200)]"
                          >
                            + Assign
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {prevStatus && booking.status !== "CANCELLED" && (
                            <button
                              onClick={() => updateStatus(booking.id, prevStatus)}
                              disabled={loadingId === booking.id}
                              className="p-1.5 rounded-lg hover:bg-[var(--gray-100)] text-[var(--gray-400)]"
                              title="Previous status"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                          )}
                          {nextStatus && booking.status !== "CANCELLED" && (
                            <button
                              onClick={() => updateStatus(booking.id, nextStatus)}
                              disabled={loadingId === booking.id}
                              className="p-1.5 rounded-lg hover:bg-[var(--lime-100)] text-[var(--lime-600)]"
                              title={`Mark as ${statusConfig[nextStatus]?.label}`}
                            >
                              {loadingId === booking.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4" />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : booking.id)
                            }
                            className="p-1.5 rounded-lg hover:bg-[var(--blue-100)] text-[var(--blue-600)]"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          {booking.status !== "CANCELLED" && (
                            <button
                              onClick={() => updateStatus(booking.id, "CANCELLED")}
                              disabled={loadingId === booking.id}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"
                              title="Cancel booking"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-[var(--gray-300)] mx-auto mb-3" />
              <p className="text-[var(--gray-500)]">No bookings found</p>
            </div>
          )}
        </div>
      </main>

      {/* Expanded Detail Panel */}
      <AnimatePresence>
        {expandedId && (
          <ExpandedPanel
            booking={bookings.find((b) => b.id === expandedId)!}
            onClose={() => setExpandedId(null)}
          />
        )}
      </AnimatePresence>

      {/* Assign Driver Modal */}
      <AnimatePresence>
        {showAssignModal && (
          <AssignDriverModal
            bookingId={showAssignModal}
            drivers={drivers}
            onAssign={assignDriver}
            onClose={() => setShowAssignModal(null)}
            loading={loadingId === showAssignModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Expanded Panel ────────────────────────────────────────────────

function ExpandedPanel({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-[var(--gray-200)] p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--gray-900)]">
            {booking.bookingNumber}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--gray-100)] rounded-lg"
          >
            <XCircle className="w-5 h-5 text-[var(--gray-400)]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
              <User className="w-6 h-6 text-[var(--blue-600)]" />
            </div>
            <div>
              <p className="font-bold text-[var(--gray-900)]">
                {booking.customer.name || "N/A"}
              </p>
              <p className="text-sm text-[var(--gray-500)] flex items-center gap-2">
                <Mail className="w-3 h-3" /> {booking.customer.email}
              </p>
              <p className="text-sm text-[var(--gray-500)] flex items-center gap-2">
                <Phone className="w-3 h-3" /> {booking.customer.phone}
              </p>
            </div>
          </div>

          {/* Route */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--blue-50)] rounded-xl border border-[var(--blue-100)]">
              <p className="text-xs font-bold text-[var(--blue-700)] uppercase mb-1">
                From
              </p>
              <p className="font-semibold text-[var(--gray-900)]">
                {booking.fromCity}
              </p>
              <p className="text-sm text-[var(--gray-600)] mt-1">
                {booking.fromAddress}
              </p>
            </div>
            <div className="p-4 bg-[var(--lime-50)] rounded-xl border border-[var(--lime-200)]">
              <p className="text-xs font-bold text-[var(--lime-700)] uppercase mb-1">
                To
              </p>
              <p className="font-semibold text-[var(--gray-900)]">
                {booking.toCity}
              </p>
              <p className="text-sm text-[var(--gray-600)] mt-1">
                {booking.toAddress}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <InfoBox label="Service" value={formatServiceType(booking.serviceType)} />
            <InfoBox label="Items" value={`${booking.itemCount} categories`} />
            <InfoBox
              label="Move Date"
              value={new Date(booking.movingDate).toLocaleDateString("en-IN")}
            />
            <InfoBox label="Time" value={booking.preferredTime || "Anytime"} />
          </div>

          {/* Notes */}
          {booking.customerNotes && (
            <div className="p-4 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-100)]">
              <p className="text-xs font-bold text-[var(--gray-500)] uppercase mb-1">
                Customer Notes
              </p>
              <p className="text-sm text-[var(--gray-700)]">
                {booking.customerNotes}
              </p>
            </div>
          )}

          {/* Latest Update */}
          {booking.trackingUpdates[0] && (
            <div className="p-4 bg-[var(--blue-50)] rounded-xl border border-[var(--blue-100)]">
              <p className="text-xs font-bold text-[var(--blue-700)] uppercase mb-1">
                Latest Update
              </p>
              <p className="text-sm text-[var(--gray-700)]">
                {booking.trackingUpdates[0].description}
              </p>
              <p className="text-xs text-[var(--blue-500)] mt-1">
                {booking.trackingUpdates[0].location} •{" "}
                {new Date(booking.trackingUpdates[0].timestamp).toLocaleString("en-IN")}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href={`/admin/bookings/${booking.id}`}
              className="flex-1 py-3 bg-[var(--blue-600)] text-white rounded-xl font-semibold text-center hover:bg-[var(--blue-700)] transition-colors"
            >
              Full Details
            </Link>
            <a
              href={`tel:${booking.customer.phone}`}
              className="flex-1 py-3 bg-[var(--lime-500)] text-white rounded-xl font-semibold text-center hover:bg-[var(--lime-600)] transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Customer
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Assign Driver Modal ─────────────────────────────────────────────

function AssignDriverModal({
  bookingId,
  drivers,
  onAssign,
  onClose,
  loading,
}: {
  bookingId: string;
  drivers: Driver[];
  onAssign: (id: string, driverId: string) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [selectedDriver, setSelectedDriver] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[var(--gray-200)]">
          <h3 className="text-lg font-bold text-[var(--gray-900)]">
            Assign Driver
          </h3>
          <p className="text-sm text-[var(--gray-500)]">
            Select a driver for this booking
          </p>
        </div>

        <div className="p-6 space-y-3 max-h-80 overflow-y-auto">
          {drivers.map((driver) => (
            <button
              key={driver.id}
              onClick={() => setSelectedDriver(driver.id)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedDriver === driver.id
                  ? "border-[var(--blue-600)] bg-[var(--blue-50)]"
                  : "border-[var(--gray-200)] hover:border-[var(--blue-300)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--lime-100)] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[var(--lime-600)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--gray-900)]">
                    {driver.name}
                  </p>
                  <p className="text-sm text-[var(--gray-500)]">
                    {driver.phone}
                  </p>
                </div>
                {selectedDriver === driver.id && (
                  <CheckCircle2 className="w-5 h-5 text-[var(--blue-600)] ml-auto" />
                )}
              </div>
            </button>
          ))}

          {drivers.length === 0 && (
            <p className="text-center text-[var(--gray-500)] py-4">
              No active drivers available
            </p>
          )}
        </div>

        <div className="p-6 border-t border-[var(--gray-200)] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border-2 border-[var(--gray-200)] rounded-xl font-semibold text-[var(--gray-700)] hover:bg-[var(--gray-50)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => selectedDriver && onAssign(bookingId, selectedDriver)}
            disabled={!selectedDriver || loading}
            className="flex-1 py-3 bg-[var(--blue-600)] text-white rounded-xl font-semibold hover:bg-[var(--blue-700)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Assign
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Helper Components ───────────────────────────────────────────────

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-[var(--gray-50)] rounded-xl text-center">
      <p className="text-xs text-[var(--gray-400)] mb-1">{label}</p>
      <p className="text-sm font-bold text-[var(--gray-900)]">{value}</p>
    </div>
  );
}

// ─── Helper Functions ────────────────────────────────────────────────

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