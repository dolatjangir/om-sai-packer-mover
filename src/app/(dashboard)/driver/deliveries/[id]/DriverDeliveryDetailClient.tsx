"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Truck,
  MapPin,
  Phone,
  CheckCircle2,
  Package,
  Box,
  Home,
  Star,
  Loader2,
  AlertCircle,
  Navigation,
  Clock,
  Calendar,
  User,
  Mail,
  IndianRupee,
  MessageSquare,
  Send,
  ChevronRight,
  Copy,
} from "lucide-react";

interface Booking {
  id: string;
  bookingNumber: string;
  status: string;
  serviceType: string;
  fromAddress: string;
  fromCity: string;
  fromPincode: string;
  toAddress: string;
  toCity: string;
  toPincode: string;
  movingDate: string;
  preferredTime: string | null;
  estimatedAmount: number | null;
  finalAmount: number | null;
  trackingCode: string | null;
  itemCount: number;
  paymentStatus: string;
  customerNotes: string | null;
  customer: { name: string | null; phone: string | null; email: string | null };
  trackingUpdates: { id: string; status: string; description: string; location: string | null; timestamp: string }[];
}

const statusFlow = ["CONFIRMED", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "COMPLETED"];
const statusLabels: Record<string, string> = {
  CONFIRMED: "Mark Picked Up",
  PICKED_UP: "Start Transit",
  IN_TRANSIT: "Mark Delivered",
  DELIVERED: "Complete Delivery",
};

export default function DriverDeliveryDetailClient({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateDesc, setUpdateDesc] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");

  const currentIdx = statusFlow.indexOf(booking.status);
  const nextStatus = currentIdx >= 0 && currentIdx < statusFlow.length - 1 ? statusFlow[currentIdx + 1] : null;
  const progressPercent = Math.max(((currentIdx + 1) / statusFlow.length) * 100, 10);

  const updateStatus = async (newStatus: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/driver/deliveries/${booking.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const addUpdate = async () => {
    if (!updateDesc.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/driver/deliveries/${booking.id}/tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: updateDesc, location: updateLocation, status: booking.status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      setShowUpdateModal(false);
      setUpdateDesc("");
      setUpdateLocation("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--gray-200)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/driver/deliveries" className="w-10 h-10 rounded-xl bg-[var(--gray-100)] flex items-center justify-center hover:bg-[var(--gray-200)] transition-colors">
              <ArrowLeft className="w-5 h-5 text-[var(--gray-600)]" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--gray-900)]">{booking.bookingNumber}</h1>
              <p className="text-sm text-[var(--gray-500)]">{booking.trackingCode}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <div className="flex justify-between text-xs font-medium text-[var(--gray-500)] mb-2">
            <span>Delivery Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-3 bg-[var(--gray-200)] rounded-full overflow-hidden mb-4">
            <motion.div className="h-full bg-[var(--lime-500)] rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1 }} />
          </div>
          <div className="flex justify-between">
            {["Assigned", "Picked Up", "In Transit", "Delivered", "Completed"].map((label, i) => (
              <div key={label} className={`text-[10px] font-bold ${i <= currentIdx ? "text-[var(--lime-600)]" : "text-[var(--gray-300)]"}`}>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {nextStatus && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => updateStatus(nextStatus)}
            disabled={loading}
            className="w-full py-4 bg-[var(--lime-500)] text-white rounded-2xl font-bold text-lg hover:bg-[var(--lime-600)] transition-colors shadow-lg shadow-[var(--lime-200)] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />}
            {statusLabels[booking.status] || "Update Status"}
          </motion.button>
        )}

        {booking.status === "COMPLETED" && (
          <div className="p-4 bg-[var(--lime-50)] border border-[var(--lime-200)] rounded-2xl text-center">
            <Star className="w-8 h-8 text-[var(--lime-500)] mx-auto mb-2" />
            <p className="font-bold text-[var(--lime-700)]">Delivery Completed!</p>
            <p className="text-sm text-[var(--lime-600)]">Great job on this delivery</p>
          </div>
        )}

        {/* Route Card */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <h3 className="font-bold text-[var(--gray-900)] mb-4">Delivery Route</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--blue-100)] flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-[var(--blue-600)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--gray-900)]">{booking.fromCity}</p>
                <p className="text-sm text-[var(--gray-600)]">{booking.fromAddress}</p>
                <p className="text-xs text-[var(--gray-400)]">PIN: {booking.fromPincode}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--lime-100)] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[var(--lime-600)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--gray-900)]">{booking.toCity}</p>
                <p className="text-sm text-[var(--gray-600)]">{booking.toAddress}</p>
                <p className="text-xs text-[var(--gray-400)]">PIN: {booking.toPincode}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(booking.fromAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 bg-[var(--blue-600)] text-white rounded-xl font-semibold text-sm text-center hover:bg-[var(--blue-700)] transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" /> Navigate to Pickup
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(booking.toAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 bg-[var(--lime-500)] text-white rounded-xl font-semibold text-sm text-center hover:bg-[var(--lime-600)] transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" /> Navigate to Drop
            </a>
          </div>
        </div>

        {/* Customer */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <h3 className="font-bold text-[var(--gray-900)] mb-4">Customer</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
              <User className="w-6 h-6 text-[var(--blue-600)]" />
            </div>
            <div>
              <p className="font-bold text-[var(--gray-900)]">{booking.customer.name || "N/A"}</p>
              <p className="text-sm text-[var(--gray-500)]">{booking.customer.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href={`tel:${booking.customer.phone}`} className="flex-1 py-2.5 bg-[var(--blue-600)] text-white rounded-xl font-semibold text-sm text-center hover:bg-[var(--blue-700)] transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call
            </a>
            <a href={`mailto:${booking.customer.email}`} className="flex-1 py-2.5 bg-[var(--gray-100)] text-[var(--gray-700)] rounded-xl font-semibold text-sm text-center hover:bg-[var(--gray-200)] transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <h3 className="font-bold text-[var(--gray-900)] mb-4">Delivery Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <DetailItem icon={Calendar} label="Date" value={new Date(booking.movingDate).toLocaleDateString("en-IN")} />
            <DetailItem icon={Clock} label="Time" value={booking.preferredTime || "Anytime"} />
            <DetailItem icon={Package} label="Items" value={`${booking.itemCount} categories`} />
            <DetailItem icon={IndianRupee} label="Amount" value={`₹${booking.finalAmount?.toLocaleString("en-IN") || booking.estimatedAmount?.toLocaleString("en-IN") || "0"}`} />
          </div>
          {booking.customerNotes && (
            <div className="mt-4 p-3 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-100)]">
              <p className="text-xs font-bold text-[var(--gray-500)] uppercase mb-1">Customer Notes</p>
              <p className="text-sm text-[var(--gray-700)]">{booking.customerNotes}</p>
            </div>
          )}
        </div>

        {/* Updates */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[var(--gray-900)]">Tracking Updates</h3>
            <button onClick={() => setShowUpdateModal(true)} className="text-sm font-semibold text-[var(--blue-600)] hover:text-[var(--blue-700)] flex items-center gap-1">
              <MessageSquare className="w-4 h-4" /> Add Update
            </button>
          </div>
          <div className="space-y-3">
            {booking.trackingUpdates.map((update, i) => (
              <div key={update.id} className={`flex items-start gap-3 p-3 rounded-xl ${i === 0 ? "bg-[var(--blue-50)] border border-[var(--blue-100)]" : "bg-[var(--gray-50)]"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${i === 0 ? "bg-[var(--blue-600)]" : "bg-[var(--gray-200)]"}`}>
                  <Clock className={`w-4 h-4 ${i === 0 ? "text-white" : "text-[var(--gray-500)]"}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--gray-800)]">{update.description}</p>
                  <p className="text-xs text-[var(--gray-400)] mt-0.5">
                    {update.location && <span className="mr-2">{update.location} •</span>}
                    {new Date(update.timestamp).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4" onClick={() => setShowUpdateModal(false)}>
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-[var(--gray-900)] mb-4">Add Update</h3>
            <textarea rows={3} value={updateDesc} onChange={(e) => setUpdateDesc(e.target.value)} placeholder="e.g. Reached pickup location" className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] mb-3 focus:outline-none focus:border-[var(--blue-500)] resize-none" />
            <input type="text" value={updateLocation} onChange={(e) => setUpdateLocation(e.target.value)} placeholder="Location (optional)" className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] mb-4 focus:outline-none focus:border-[var(--blue-500)]" />
            <div className="flex gap-3">
              <button onClick={() => setShowUpdateModal(false)} className="flex-1 py-3 border-2 border-[var(--gray-200)] rounded-xl font-semibold text-[var(--gray-700)]">Cancel</button>
              <button onClick={addUpdate} disabled={loading || !updateDesc.trim()} className="flex-1 py-3 bg-[var(--lime-500)] text-white rounded-xl font-semibold hover:bg-[var(--lime-600)] disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Send
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: typeof Truck; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-[var(--gray-100)] flex items-center justify-center">
        <Icon className="w-4 h-4 text-[var(--gray-500)]" />
      </div>
      <div>
        <p className="text-xs text-[var(--gray-400)]">{label}</p>
        <p className="text-sm font-semibold text-[var(--gray-900)]">{value}</p>
      </div>
    </div>
  );
}