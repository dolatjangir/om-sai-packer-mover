"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Truck,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Package,
  Phone,
  Mail,
  User,
  Home,
  Building2,
  CreditCard,
  Star,
  Shield,
  AlertCircle,
  Edit3,
  Save,
  X,
  Loader2,
  ChevronDown,
  Send,
  IndianRupee,
  FileText,
  MessageSquare,
  Navigation,
  Printer,
  Download,
  Ban,
  RotateCcw,
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
  fromAddress: string;
  fromCity: string;
  fromState: string;
  fromPincode: string;
  toAddress: string;
  toCity: string;
  toState: string;
  toPincode: string;
  movingDate: string;
  preferredTime: string | null;
  estimatedAmount: number | null;
  finalAmount: number | null;
  discountAmount: number;
  taxAmount: number;
  paymentStatus: string;
  trackingCode: string | null;
  itemCount: number;
  inventory: unknown;
  customerNotes: string | null;
  adminNotes: string | null;
  createdAt: string;
  customer: { id: string; name: string | null; email: string | null; phone: string | null };
  driver: Driver | null;
  trackingUpdates: TrackingUpdate[];
  payments: Payment[];
  reviews: { id: string; rating: number; comment: string | null }[];
}

interface Props {
  booking: Booking;
  drivers: Driver[];
}

// ─── Status Config ───────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: typeof Truck }> = {
  PENDING: { label: "Pending", icon: Clock, color: "text-[var(--blue-700)]", bg: "bg-[var(--blue-50)]", border: "border-[var(--blue-200)]" },
  CONFIRMED: { label: "Confirmed", icon: CheckCircle2, color: "text-[var(--blue-800)]", bg: "bg-[var(--blue-100)]", border: "border-[var(--blue-300)]" },
  PICKED_UP: { label: "Picked Up", icon: Package, color: "text-[var(--lime-700)]", bg: "bg-[var(--lime-50)]", border: "border-[var(--lime-200)]" },
  IN_TRANSIT: { label: "In Transit", icon: Truck, color: "text-[var(--blue-900)]", bg: "bg-[var(--blue-100)]", border: "border-[var(--blue-300)]" },
  DELIVERED: { label: "Delivered", icon: Home, color: "text-[var(--lime-800)]", bg: "bg-[var(--lime-100)]", border: "border-[var(--lime-300)]" },
  COMPLETED: { label: "Completed", icon: Star, color: "text-[var(--gray-800)]", bg: "bg-[var(--gray-100)]", border: "border-[var(--gray-300)]" },
  CANCELLED: { label: "Cancelled", icon: Ban, color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

const statusFlow = ["PENDING", "CONFIRMED", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "COMPLETED"];

// ─── Main Component ─────────────────────────────────────────────────

export default function AdminBookingDetailClient({ booking: initialBooking, drivers }: Props) {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking>(initialBooking);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Edit states
  const [editStatus, setEditStatus] = useState(booking.status);
  const [editDriver, setEditDriver] = useState(booking.driver?.id || "");
  const [editEstimated, setEditEstimated] = useState(booking.estimatedAmount?.toString() || "");
  const [editFinal, setEditFinal] = useState(booking.finalAmount?.toString() || "");
  const [editDiscount, setEditDiscount] = useState(booking.discountAmount.toString());
  const [editAdminNotes, setEditAdminNotes] = useState(booking.adminNotes || "");
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [newUpdateDesc, setNewUpdateDesc] = useState("");
  const [newUpdateLocation, setNewUpdateLocation] = useState("");

  const config = statusConfig[booking.status] || statusConfig.PENDING;
  const StatusIcon = config.icon;
  const currentStepIndex = statusFlow.indexOf(booking.status);
  const progressPercent = Math.max(((currentStepIndex + 1) / statusFlow.length) * 100, 10);

  const totalAmount = (booking.finalAmount || booking.estimatedAmount || 0) + booking.taxAmount - booking.discountAmount;

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    if (type === "success") {
      setSuccess(msg);
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(msg);
      setTimeout(() => setError(""), 5000);
    }
  };

  const saveChanges = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          driverId: editDriver || null,
          estimatedAmount: editEstimated ? parseFloat(editEstimated) : null,
          finalAmount: editFinal ? parseFloat(editFinal) : null,
          discountAmount: parseFloat(editDiscount) || 0,
          adminNotes: editAdminNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      setBooking((prev) => ({
        ...prev,
        status: editStatus,
        driver: drivers.find((d) => d.id === editDriver) || null,
        estimatedAmount: editEstimated ? parseFloat(editEstimated) : null,
        finalAmount: editFinal ? parseFloat(editFinal) : null,
        discountAmount: parseFloat(editDiscount) || 0,
        adminNotes: editAdminNotes,
      }));

      setIsEditing(false);
      showToast("Booking updated successfully");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const addTrackingUpdate = async () => {
    if (!newUpdateDesc.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}/tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: newUpdateDesc,
          location: newUpdateLocation,
          status: booking.status,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      setBooking((prev) => ({
        ...prev,
        trackingUpdates: [data.data.update, ...prev.trackingUpdates],
      }));

      setShowAddUpdate(false);
      setNewUpdateDesc("");
      setNewUpdateLocation("");
      showToast("Update added");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to add update", "error");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      setBooking((prev) => ({ ...prev, status: "CANCELLED" }));
      setEditStatus("CANCELLED");
      showToast("Booking cancelled");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Cancel failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const inventory = booking.inventory as {
    roomCount?: string;
    items?: string[];
    specialItems?: string[];
    notes?: string;
  } | null;

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/bookings" className="w-10 h-10 rounded-xl bg-[var(--gray-100)] flex items-center justify-center hover:bg-[var(--gray-200)] transition-colors">
                <ArrowLeft className="w-5 h-5 text-[var(--gray-600)]" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-[var(--gray-900)]">{booking.bookingNumber}</h1>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${config.bg} ${config.color} border ${config.border} flex items-center gap-1`}>
                    <StatusIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                </div>
                <p className="text-sm text-[var(--gray-500)] mt-0.5">
                  Created {new Date(booking.createdAt).toLocaleDateString("en-IN")} • Tracking: {booking.trackingCode}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl bg-[var(--gray-100)] hover:bg-[var(--gray-200)] transition-colors">
                <Printer className="w-4 h-4 text-[var(--gray-600)]" />
              </button>
              <button className="p-2.5 rounded-xl bg-[var(--gray-100)] hover:bg-[var(--gray-200)] transition-colors">
                <Download className="w-4 h-4 text-[var(--gray-600)]" />
              </button>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[var(--blue-600)] text-white rounded-xl font-semibold hover:bg-[var(--blue-700)] transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditStatus(booking.status);
                      setEditDriver(booking.driver?.id || "");
                      setEditEstimated(booking.estimatedAmount?.toString() || "");
                      setEditFinal(booking.finalAmount?.toString() || "");
                      setEditDiscount(booking.discountAmount.toString());
                      setEditAdminNotes(booking.adminNotes || "");
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 border-2 border-[var(--gray-200)] text-[var(--gray-700)] rounded-xl font-semibold hover:bg-[var(--gray-100)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={saveChanges}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[var(--lime-500)] text-white rounded-xl font-semibold hover:bg-[var(--lime-600)] transition-colors disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-medium text-[var(--gray-500)] mb-1.5">
              <span>Shipment Progress</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2.5 bg-[var(--gray-200)] rounded-full overflow-hidden">
              <motion.div className="h-full bg-[var(--lime-500)] rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1 }} />
            </div>
            <div className="flex justify-between mt-2">
              {statusFlow.map((s, i) => (
                <div key={s} className={`text-[10px] font-bold uppercase ${i <= currentStepIndex ? "text-[var(--lime-600)]" : "text-[var(--gray-300)]"}`}>
                  {statusConfig[s]?.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toasts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-[var(--lime-50)] border border-[var(--lime-200)] rounded-xl text-[var(--lime-700)] text-sm font-medium flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4" /> {success}
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status & Actions Card */}
          <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
            <h3 className="text-lg font-bold text-[var(--gray-900)] mb-4">Booking Management</h3>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-500)] uppercase mb-1.5">Status</label>
                    <div className="relative">
                      <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] font-medium focus:outline-none focus:border-[var(--blue-500)] appearance-none">
                        {Object.entries(statusConfig).map(([key, cfg]) => (
                          <option key={key} value={key}>{cfg.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-400)] pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-500)] uppercase mb-1.5">Assign Driver</label>
                    <div className="relative">
                      <select value={editDriver} onChange={(e) => setEditDriver(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] font-medium focus:outline-none focus:border-[var(--blue-500)] appearance-none">
                        <option value="">No Driver</option>
                        {drivers.map((d) => (
                          <option key={d.id} value={d.id}>{d.name} ({d.phone})</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-400)] pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-500)] uppercase mb-1.5">Estimated (₹)</label>
                    <input type="number" value={editEstimated} onChange={(e) => setEditEstimated(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] font-medium focus:outline-none focus:border-[var(--blue-500)]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-500)] uppercase mb-1.5">Final (₹)</label>
                    <input type="number" value={editFinal} onChange={(e) => setEditFinal(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] font-medium focus:outline-none focus:border-[var(--blue-500)]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-500)] uppercase mb-1.5">Discount (₹)</label>
                    <input type="number" value={editDiscount} onChange={(e) => setEditDiscount(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] font-medium focus:outline-none focus:border-[var(--blue-500)]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--gray-500)] uppercase mb-1.5">Admin Notes</label>
                  <textarea rows={3} value={editAdminNotes} onChange={(e) => setEditAdminNotes(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] focus:outline-none focus:border-[var(--blue-500)] resize-none" placeholder="Internal notes about this booking..." />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <InfoDisplay label="Current Status" value={statusConfig[booking.status]?.label || booking.status} highlight />
                  <InfoDisplay label="Assigned Driver" value={booking.driver?.name || "Unassigned"} />
                  <InfoDisplay label="Payment Status" value={booking.paymentStatus} />
                  <InfoDisplay label="Service Type" value={formatServiceType(booking.serviceType)} />
                </div>

                {booking.adminNotes && (
                  <div className="p-4 bg-[var(--blue-50)] rounded-xl border border-[var(--blue-100)]">
                    <p className="text-xs font-bold text-[var(--blue-700)] uppercase mb-1">Admin Notes</p>
                    <p className="text-sm text-[var(--blue-800)]">{booking.adminNotes}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
                    <>
                      <button onClick={() => { setIsEditing(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--blue-600)] text-white rounded-xl font-semibold hover:bg-[var(--blue-700)] transition-colors">
                        <Edit3 className="w-4 h-4" /> Edit Details
                      </button>
                      <button onClick={() => setShowAddUpdate(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--lime-500)] text-white rounded-xl font-semibold hover:bg-[var(--lime-600)] transition-colors">
                        <Send className="w-4 h-4" /> Add Update
                      </button>
                      <button onClick={cancelBooking} disabled={loading} className="flex items-center gap-2 px-4 py-2.5 border-2 border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors">
                        <Ban className="w-4 h-4" /> Cancel
                      </button>
                    </>
                  )}
                  {booking.status === "CANCELLED" && (
                    <button onClick={() => { setEditStatus("PENDING"); setIsEditing(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--gray-100)] text-[var(--gray-700)] rounded-xl font-semibold hover:bg-[var(--gray-200)] transition-colors">
                      <RotateCcw className="w-4 h-4" /> Reactivate
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Route Card */}
          <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
            <h3 className="text-lg font-bold text-[var(--gray-900)] mb-4">Move Route</h3>
            <div className="flex items-start gap-4">
              <div className="flex-1 p-4 bg-[var(--blue-50)] rounded-xl border border-[var(--blue-100)]">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-[var(--blue-600)]" />
                  <span className="text-xs font-bold text-[var(--blue-700)] uppercase">Source</span>
                </div>
                <p className="font-semibold text-[var(--gray-900)]">{booking.fromCity}, {booking.fromState}</p>
                <p className="text-sm text-[var(--gray-600)] mt-1">{booking.fromAddress}</p>
                <p className="text-xs text-[var(--gray-400)] mt-1">PIN: {booking.fromPincode}</p>
              </div>
              <div className="pt-8">
                <div className="w-10 h-10 rounded-full bg-[var(--lime-500)] flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 p-4 bg-[var(--lime-50)] rounded-xl border border-[var(--lime-200)]">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-[var(--lime-600)]" />
                  <span className="text-xs font-bold text-[var(--lime-700)] uppercase">Destination</span>
                </div>
                <p className="font-semibold text-[var(--gray-900)]">{booking.toCity}, {booking.toState}</p>
                <p className="text-sm text-[var(--gray-600)] mt-1">{booking.toAddress}</p>
                <p className="text-xs text-[var(--gray-400)] mt-1">PIN: {booking.toPincode}</p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[var(--gray-900)]">Tracking Timeline</h3>
              <button onClick={() => setShowAddUpdate(true)} className="text-sm font-semibold text-[var(--blue-600)] hover:text-[var(--blue-700)] flex items-center gap-1">
                <Send className="w-3.5 h-3.5" /> Add Update
              </button>
            </div>

            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[var(--gray-200)]" />
              <div className="space-y-6">
                {booking.trackingUpdates.map((update, idx) => (
                  <motion.div key={update.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="relative flex items-start gap-4">
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 ${idx === 0 ? "bg-[var(--lime-500)] border-[var(--lime-500)] text-white" : "bg-white border-[var(--gray-300)] text-[var(--gray-400)]"}`}>
                      {idx === 0 ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold text-[var(--gray-900)]">{update.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[var(--gray-400)]">
                        {update.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {update.location}</span>}
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(update.timestamp).toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Inventory */}
          {inventory && (
            <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
              <h3 className="text-lg font-bold text-[var(--gray-900)] mb-4">Inventory Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="p-3 bg-[var(--gray-50)] rounded-xl text-center">
                  <p className="text-xs text-[var(--gray-400)]">Rooms</p>
                  <p className="font-bold text-[var(--gray-900)]">{inventory.roomCount || "1"}</p>
                </div>
                <div className="p-3 bg-[var(--gray-50)] rounded-xl text-center">
                  <p className="text-xs text-[var(--gray-400)]">Categories</p>
                  <p className="font-bold text-[var(--gray-900)]">{inventory.items?.length || 0}</p>
                </div>
                <div className="p-3 bg-[var(--gray-50)] rounded-xl text-center">
                  <p className="text-xs text-[var(--gray-400)]">Special Items</p>
                  <p className="font-bold text-[var(--gray-900)]">{inventory.specialItems?.filter((i: string) => i !== "none").length || 0}</p>
                </div>
                <div className="p-3 bg-[var(--gray-50)] rounded-xl text-center">
                  <p className="text-xs text-[var(--gray-400)]">Total Items</p>
                  <p className="font-bold text-[var(--gray-900)]">{booking.itemCount}</p>
                </div>
              </div>
              {inventory.items && inventory.items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {inventory.items.map((item: string) => (
                    <span key={item} className="px-3 py-1.5 bg-[var(--blue-50)] text-[var(--blue-700)] rounded-full text-xs font-semibold border border-[var(--blue-100)]">{formatItemLabel(item)}</span>
                  ))}
                </div>
              )}
              {inventory.notes && (
                <div className="mt-4 p-3 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-100)]">
                  <p className="text-xs font-bold text-[var(--gray-500)] uppercase mb-1">Customer Notes</p>
                  <p className="text-sm text-[var(--gray-700)]">{inventory.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
            <h3 className="text-sm font-bold text-[var(--gray-700)] uppercase tracking-wider mb-4">Price Breakdown</h3>
            <div className="space-y-3">
              <PriceRow label="Estimated" value={booking.estimatedAmount} />
              {booking.discountAmount > 0 && <PriceRow label="Discount" value={-booking.discountAmount} highlight />}
              <PriceRow label="GST (18%)" value={booking.taxAmount} />
              {booking.finalAmount && <PriceRow label="Final Amount" value={booking.finalAmount} bold />}
              <div className="border-t border-[var(--gray-200)] pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-[var(--gray-900)]">Total</span>
                  <span className="text-2xl font-bold text-[var(--lime-600)]">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Card */}
          <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
            <h3 className="text-sm font-bold text-[var(--gray-700)] uppercase tracking-wider mb-4">Customer</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                <User className="w-6 h-6 text-[var(--blue-600)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--gray-900)]">{booking.customer.name || "N/A"}</p>
                <p className="text-xs text-[var(--gray-500)]">ID: {booking.customer.id.slice(0, 8)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <a href={`mailto:${booking.customer.email}`} className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--gray-50)] hover:bg-[var(--gray-100)] transition-colors text-sm text-[var(--gray-700)]">
                <Mail className="w-4 h-4 text-[var(--blue-600)]" /> {booking.customer.email}
              </a>
              <a href={`tel:${booking.customer.phone}`} className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--gray-50)] hover:bg-[var(--gray-100)] transition-colors text-sm text-[var(--gray-700)]">
                <Phone className="w-4 h-4 text-[var(--lime-600)]" /> {booking.customer.phone}
              </a>
            </div>
          </div>

          {/* Driver Card */}
          {booking.driver ? (
            <div className="bg-[var(--blue-50)] rounded-2xl border border-[var(--blue-100)] p-6">
              <h3 className="text-sm font-bold text-[var(--blue-800)] uppercase tracking-wider mb-4">Assigned Driver</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--blue-600)] flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--blue-900)]">{booking.driver.name}</p>
                  <p className="text-xs text-[var(--blue-600)]">Om Sai Packers Driver</p>
                </div>
              </div>
              {booking.driver.phone && (
                <a href={`tel:${booking.driver.phone}`} className="flex items-center justify-center gap-2 w-full py-2.5 bg-[var(--blue-600)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--blue-700)] transition-colors">
                  <Phone className="w-4 h-4" /> Call Driver
                </a>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6 text-center">
              <Truck className="w-10 h-10 text-[var(--gray-300)] mx-auto mb-2" />
              <p className="text-sm text-[var(--gray-500)]">No driver assigned</p>
              <button onClick={() => { setIsEditing(true); }} className="mt-3 text-sm font-semibold text-[var(--blue-600)] hover:text-[var(--blue-700)]">Assign Now</button>
            </div>
          )}

          {/* Payment History */}
          <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
            <h3 className="text-sm font-bold text-[var(--gray-700)] uppercase tracking-wider mb-4">Payments</h3>
            {booking.payments.length === 0 ? (
              <p className="text-sm text-[var(--gray-500)] text-center py-4">No payments yet</p>
            ) : (
              <div className="space-y-3">
                {booking.payments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-[var(--gray-50)] rounded-xl">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="w-4 h-4 text-[var(--blue-600)]" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--gray-900)]">₹{p.amount.toLocaleString("en-IN")}</p>
                        <p className="text-xs text-[var(--gray-400)]">{p.method}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.status === "PAID" ? "bg-[var(--lime-100)] text-[var(--lime-700)]" : "bg-[var(--blue-100)] text-[var(--blue-700)]"}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
            <h3 className="text-sm font-bold text-[var(--gray-700)] uppercase tracking-wider mb-4">Quick Info</h3>
            <div className="space-y-3">
              <InfoRow label="Booking Date" value={new Date(booking.createdAt).toLocaleDateString("en-IN")} />
              <InfoRow label="Move Date" value={new Date(booking.movingDate).toLocaleDateString("en-IN")} />
              <InfoRow label="Time Slot" value={booking.preferredTime || "Anytime"} />
              <InfoRow label="Tracking Code" value={booking.trackingCode || "N/A"} />
              <InfoRow label="Item Count" value={`${booking.itemCount} categories`} />
            </div>
          </div>
        </div>
      </main>

      {/* Add Update Modal */}
      <AnimatePresence>
        {showAddUpdate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAddUpdate(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-[var(--gray-200)]">
                <h3 className="text-lg font-bold text-[var(--gray-900)]">Add Tracking Update</h3>
                <p className="text-sm text-[var(--gray-500)]">Notify customer about progress</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--gray-500)] uppercase mb-1.5">Update Description</label>
                  <textarea rows={3} value={newUpdateDesc} onChange={(e) => setNewUpdateDesc(e.target.value)} placeholder="e.g. Goods loaded, departing Mumbai hub" className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] focus:outline-none focus:border-[var(--blue-500)] resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--gray-500)] uppercase mb-1.5">Location (Optional)</label>
                  <input type="text" value={newUpdateLocation} onChange={(e) => setNewUpdateLocation(e.target.value)} placeholder="e.g. Mumbai Highway" className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] focus:outline-none focus:border-[var(--blue-500)]" />
                </div>
              </div>
              <div className="p-6 border-t border-[var(--gray-200)] flex gap-3">
                <button onClick={() => setShowAddUpdate(false)} className="flex-1 py-3 border-2 border-[var(--gray-200)] rounded-xl font-semibold text-[var(--gray-700)] hover:bg-[var(--gray-50)]">Cancel</button>
                <button onClick={addTrackingUpdate} disabled={loading || !newUpdateDesc.trim()} className="flex-1 py-3 bg-[var(--lime-500)] text-white rounded-xl font-semibold hover:bg-[var(--lime-600)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Add Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Helper Components ───────────────────────────────────────────────

function InfoDisplay({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-xl ${highlight ? "bg-[var(--blue-50)] border border-[var(--blue-100)]" : "bg-[var(--gray-50)]"}`}>
      <p className="text-xs text-[var(--gray-400)] mb-1">{label}</p>
      <p className={`text-sm font-bold ${highlight ? "text-[var(--blue-700)]" : "text-[var(--gray-900)]"}`}>{value}</p>
    </div>
  );
}

function PriceRow({ label, value, highlight, bold }: { label: string; value: number | null; highlight?: boolean; bold?: boolean }) {
  if (value === null || value === 0) return null;
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${bold ? "font-bold text-[var(--gray-900)]" : "text-[var(--gray-600)]"}`}>{label}</span>
      <span className={`font-semibold ${highlight ? "text-[var(--lime-600)]" : bold ? "text-[var(--gray-900)]" : "text-[var(--gray-900)]"}`}>
        {highlight && "-"}₹{Math.abs(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[var(--gray-100)] last:border-0">
      <span className="text-xs text-[var(--gray-500)]">{label}</span>
      <span className="text-sm font-semibold text-[var(--gray-900)]">{value}</span>
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

function formatItemLabel(item: string): string {
  const map: Record<string, string> = {
    furniture: "Furniture", appliances: "Appliances", electronics: "Electronics",
    kitchen: "Kitchen Items", clothes: "Clothes & Bags", books: "Books & Documents",
    plants: "Plants", gym: "Gym Equipment",
  };
  return map[item] || item;
}