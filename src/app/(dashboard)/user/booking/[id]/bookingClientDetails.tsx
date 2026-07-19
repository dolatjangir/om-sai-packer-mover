"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
  Download,
  Printer,
  Share2,
  MessageSquare,
  FileText,
  Navigation,
  IndianRupee,
  Box,
  Weight,
} from "lucide-react";

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

interface Payment {
  id: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string | null;
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
  driver: Driver | null;
  customer: { name: string | null; email: string | null; phone: string | null };
  trackingUpdates: TrackingUpdate[];
  payments: Payment[];
  reviews: { id: string; rating: number; comment: string | null }[];
}

// ─── Status Config ───────────────────────────────────────────────────

const statusConfig: Record<
  string,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    icon: typeof Truck;
  }
> = {
  PENDING: {
    label: "Pending Confirmation",
    color: "text-[var(--blue-600)]",
    bg: "bg-[var(--blue-50)]",
    border: "border-[var(--blue-200)]",
    icon: Clock,
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "text-[var(--blue-700)]",
    bg: "bg-[var(--blue-100)]",
    border: "border-[var(--blue-300)]",
    icon: CheckCircle2,
  },
  PICKED_UP: {
    label: "Picked Up",
    color: "text-[var(--lime-600)]",
    bg: "bg-[var(--lime-50)]",
    border: "border-[var(--lime-200)]",
    icon: Package,
  },
  IN_TRANSIT: {
    label: "In Transit",
    color: "text-[var(--blue-800)]",
    bg: "bg-[var(--blue-100)]",
    border: "border-[var(--blue-300)]",
    icon: Truck,
  },
  DELIVERED: {
    label: "Delivered",
    color: "text-[var(--lime-700)]",
    bg: "bg-[var(--lime-100)]",
    border: "border-[var(--lime-300)]",
    icon: CheckCircle2,
  },
  COMPLETED: {
    label: "Completed",
    color: "text-[var(--lime-800)]",
    bg: "bg-[var(--lime-100)]",
    border: "border-[var(--lime-300)]",
    icon: Star,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: AlertCircle,
  },
};

const timelineSteps = [
  { key: "PENDING", label: "Booking Received", desc: "Your request is being processed" },
  { key: "CONFIRMED", label: "Confirmed", desc: "Team assigned & scheduled" },
  { key: "PICKED_UP", label: "Picked Up", desc: "Items collected from source" },
  { key: "IN_TRANSIT", label: "In Transit", desc: "Moving to destination" },
  { key: "DELIVERED", label: "Delivered", desc: "Items reached destination" },
  { key: "COMPLETED", label: "Completed", desc: "Move finished successfully" },
];

// ─── Main Component ─────────────────────────────────────────────────

export default function BookingDetailClient({ booking }: { booking: Booking }) {
  const [activeTab, setActiveTab] = useState<"timeline" | "details" | "payment">("timeline");
  const config = statusConfig[booking.status] || statusConfig.PENDING;
  const StatusIcon = config.icon;

  const currentStepIndex = timelineSteps.findIndex((s) => s.key === booking.status);
  const progressPercent = Math.max(((currentStepIndex + 1) / timelineSteps.length) * 100, 10);

  const totalAmount =
    (booking.finalAmount || booking.estimatedAmount || 0) +
    booking.taxAmount -
    booking.discountAmount;

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--gray-200)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/user/bookings"
              className="w-10 h-10 rounded-xl bg-[var(--gray-100)] flex items-center justify-center hover:bg-[var(--gray-200)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--gray-600)]" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--gray-900)]">
                Booking Details
              </h1>
              <p className="text-sm text-[var(--gray-500)]">
                {booking.bookingNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border-2 p-6 ${config.bg} ${config.border}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <StatusIcon className={`w-7 h-7 ${config.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className={`text-lg font-bold ${config.color}`}>
                    {config.label}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-white text-xs font-bold text-[var(--gray-600)] border border-[var(--gray-200)]">
                    {booking.trackingCode}
                  </span>
                </div>
                <p className="text-sm text-[var(--gray-600)] mt-1">
                  {formatServiceType(booking.serviceType)} • {booking.itemCount} items •{" "}
                  {new Date(booking.movingDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl bg-white border border-[var(--gray-200)] hover:border-[var(--blue-300)] transition-colors">
                <Share2 className="w-4 h-4 text-[var(--gray-600)]" />
              </button>
              <button className="p-2.5 rounded-xl bg-white border border-[var(--gray-200)] hover:border-[var(--blue-300)] transition-colors">
                <Printer className="w-4 h-4 text-[var(--gray-600)]" />
              </button>
              <button className="p-2.5 rounded-xl bg-white border border-[var(--gray-200)] hover:border-[var(--blue-300)] transition-colors">
                <Download className="w-4 h-4 text-[var(--gray-600)]" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs font-medium text-[var(--gray-500)] mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden border border-[var(--gray-200)]">
              <motion.div
                className="h-full bg-[var(--lime-500)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white p-2 rounded-xl border border-[var(--gray-200)] shadow-sm">
          {[
            { id: "timeline" as const, label: "Timeline", icon: Navigation },
            { id: "details" as const, label: "Details", icon: FileText },
            { id: "payment" as const, label: "Payment", icon: CreditCard },
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-[var(--blue-600)] text-white shadow-md"
                    : "text-[var(--gray-600)] hover:bg-[var(--gray-100)]"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "timeline" && <TimelineTab booking={booking} currentStepIndex={currentStepIndex} />}
            {activeTab === "details" && <DetailsTab booking={booking} />}
            {activeTab === "payment" && <PaymentTab booking={booking} totalAmount={totalAmount} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RouteCard booking={booking} />
            <CustomerCard booking={booking} />
            {booking.driver && <DriverCard driver={booking.driver} />}
            <SupportCard />
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Timeline Tab ────────────────────────────────────────────────────

function TimelineTab({ booking, currentStepIndex }: { booking: Booking; currentStepIndex: number }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
      <h3 className="text-lg font-bold text-[var(--gray-900)] mb-6">
        Shipment Timeline
      </h3>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[var(--gray-200)]">
          <motion.div
            className="w-full bg-[var(--lime-500)]"
            initial={{ height: 0 }}
            animate={{
              height: `${Math.max(
                ((currentStepIndex + 1) / timelineSteps.length) * 100,
                5
              )}%`,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        <div className="space-y-6">
          {timelineSteps.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const update = booking.trackingUpdates.find((u) => u.status === step.key);

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex items-start gap-4"
              >
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                    isCompleted
                      ? "bg-[var(--lime-500)] border-[var(--lime-500)] text-white"
                      : "bg-white border-[var(--gray-300)] text-[var(--gray-400)]"
                  } ${isCurrent ? "ring-4 ring-[var(--lime-500)]/30 shadow-lg" : ""}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-bold">{idx + 1}</span>
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <h4
                    className={`font-semibold ${
                      isCompleted ? "text-[var(--gray-900)]" : "text-[var(--gray-400)]"
                    }`}
                  >
                    {step.label}
                  </h4>
                  <p className="text-sm text-[var(--gray-500)] mt-0.5">
                    {step.desc}
                  </p>

                  {update && (
                    <div className="mt-2 p-3 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-100)]">
                      <p className="text-sm text-[var(--gray-700)]">
                        {update.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--gray-400)]">
                        {update.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {update.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(update.timestamp).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Details Tab ─────────────────────────────────────────────────────

function DetailsTab({ booking }: { booking: Booking }) {
  const inventory = booking.inventory as {
    roomCount?: string;
    items?: string[];
    specialItems?: string[];
    notes?: string;
  } | null;

  return (
    <div className="space-y-6">
      {/* Locations */}
      <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
        <h3 className="text-lg font-bold text-[var(--gray-900)] mb-4">
          Move Route
        </h3>
        <div className="flex items-start gap-4">
          <div className="flex-1 bg-[var(--blue-50)] rounded-xl p-4 border border-[var(--blue-100)]">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-4 h-4 text-[var(--blue-600)]" />
              <span className="text-xs font-bold text-[var(--blue-700)] uppercase">
                From
              </span>
            </div>
            <p className="font-semibold text-[var(--gray-900)]">{booking.fromCity}</p>
            <p className="text-sm text-[var(--gray-600)] mt-1">{booking.fromAddress}</p>
            <p className="text-xs text-[var(--gray-500)] mt-1">
              {booking.fromState} - {booking.fromPincode}
            </p>
          </div>

          <div className="pt-8">
            <div className="w-10 h-10 rounded-full bg-[var(--lime-500)] flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-white rotate-180" />
            </div>
          </div>

          <div className="flex-1 bg-[var(--lime-50)] rounded-xl p-4 border border-[var(--lime-200)]">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-[var(--lime-600)]" />
              <span className="text-xs font-bold text-[var(--lime-700)] uppercase">
                To
              </span>
            </div>
            <p className="font-semibold text-[var(--gray-900)]">{booking.toCity}</p>
            <p className="text-sm text-[var(--gray-600)] mt-1">{booking.toAddress}</p>
            <p className="text-xs text-[var(--gray-500)] mt-1">
              {booking.toState} - {booking.toPincode}
            </p>
          </div>
        </div>
      </div>

      {/* Inventory */}
      {inventory && (
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <h3 className="text-lg font-bold text-[var(--gray-900)] mb-4">
            Inventory Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-[var(--gray-50)] rounded-xl text-center">
              <Box className="w-5 h-5 text-[var(--blue-600)] mx-auto mb-1" />
              <p className="text-xs text-[var(--gray-500)]">Rooms</p>
              <p className="font-bold text-[var(--gray-900)]">
                {inventory.roomCount || "1"}
              </p>
            </div>
            <div className="p-3 bg-[var(--gray-50)] rounded-xl text-center">
              <Package className="w-5 h-5 text-[var(--lime-600)] mx-auto mb-1" />
              <p className="text-xs text-[var(--gray-500)]">Categories</p>
              <p className="font-bold text-[var(--gray-900)]">
                {inventory.items?.length || 0}
              </p>
            </div>
            <div className="p-3 bg-[var(--gray-50)] rounded-xl text-center">
              <Weight className="w-5 h-5 text-[var(--blue-600)] mx-auto mb-1" />
              <p className="text-xs text-[var(--gray-500)]">Special Items</p>
              <p className="font-bold text-[var(--gray-900)]">
                {inventory.specialItems?.filter((i) => i !== "none").length || 0}
              </p>
            </div>
            <div className="p-3 bg-[var(--gray-50)] rounded-xl text-center">
              <Star className="w-5 h-5 text-[var(--lime-600)] mx-auto mb-1" />
              <p className="text-xs text-[var(--gray-500)]">Total Items</p>
              <p className="font-bold text-[var(--gray-900)]">{booking.itemCount}</p>
            </div>
          </div>

          {inventory.items && inventory.items.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {inventory.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 bg-[var(--blue-50)] text-[var(--blue-700)] rounded-full text-xs font-semibold border border-[var(--blue-100)]"
                >
                  {formatItemLabel(item)}
                </span>
              ))}
            </div>
          )}

          {inventory.notes && (
            <div className="mt-4 p-3 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-100)]">
              <p className="text-xs font-semibold text-[var(--gray-600)] mb-1">
                Special Instructions
              </p>
              <p className="text-sm text-[var(--gray-700)]">{inventory.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Booking Info */}
      <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
        <h3 className="text-lg font-bold text-[var(--gray-900)] mb-4">
          Booking Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Booking Date" value={new Date(booking.createdAt).toLocaleDateString("en-IN")} />
          <InfoRow label="Move Date" value={new Date(booking.movingDate).toLocaleDateString("en-IN")} />
          <InfoRow label="Preferred Time" value={booking.preferredTime || "Not specified"} />
          <InfoRow label="Service Type" value={formatServiceType(booking.serviceType)} />
          <InfoRow label="Tracking Code" value={booking.trackingCode || "N/A"} />
          <InfoRow label="Payment Status" value={booking.paymentStatus} />
        </div>
      </div>
    </div>
  );
}

// ─── Payment Tab ─────────────────────────────────────────────────────

function PaymentTab({ booking, totalAmount }: { booking: Booking; totalAmount: number }) {
  return (
    <div className="space-y-6">
      {/* Price Breakdown */}
      <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
        <h3 className="text-lg font-bold text-[var(--gray-900)] mb-4">
          Price Breakdown
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-[var(--gray-600)]">Estimated Amount</span>
            <span className="font-semibold text-[var(--gray-900)]">
              ₹{(booking.estimatedAmount || 0).toLocaleString("en-IN")}
            </span>
          </div>
          {booking.discountAmount > 0 && (
            <div className="flex justify-between items-center py-2 text-[var(--lime-600)]">
              <span className="text-sm">Discount</span>
              <span className="font-semibold">
                -₹{booking.discountAmount.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-[var(--gray-600)]">GST (18%)</span>
            <span className="font-semibold text-[var(--gray-900)]">
              ₹{booking.taxAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="border-t border-[var(--gray-200)] pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-[var(--gray-900)]">
                Total Amount
              </span>
              <span className="text-2xl font-bold text-[var(--lime-600)]">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
        <h3 className="text-lg font-bold text-[var(--gray-900)] mb-4">
          Payment History
        </h3>
        {booking.payments.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-[var(--gray-300)] mx-auto mb-3" />
            <p className="text-sm text-[var(--gray-500)]">No payments made yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {booking.payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-100)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--blue-100)] flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-[var(--blue-600)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--gray-900)]">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-[var(--gray-500)]">
                      {payment.method} • {new Date(payment.paidAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    payment.status === "PAID"
                      ? "bg-[var(--lime-100)] text-[var(--lime-700)]"
                      : "bg-[var(--blue-100)] text-[var(--blue-700)]"
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar Cards ───────────────────────────────────────────────────

function RouteCard({ booking }: { booking: Booking }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-5">
      <h4 className="text-sm font-bold text-[var(--gray-700)] mb-3 uppercase tracking-wider">
        Route Summary
      </h4>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--blue-100)] flex items-center justify-center">
            <Home className="w-4 h-4 text-[var(--blue-600)]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[var(--gray-400)]">From</p>
            <p className="text-sm font-semibold text-[var(--gray-900)] truncate">
              {booking.fromCity}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--lime-100)] flex items-center justify-center">
            <Building2 className="w-4 h-4 text-[var(--lime-600)]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[var(--gray-400)]">To</p>
            <p className="text-sm font-semibold text-[var(--gray-900)] truncate">
              {booking.toCity}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--gray-100)] flex items-center justify-center">
            <Calendar className="w-4 h-4 text-[var(--gray-600)]" />
          </div>
          <div>
            <p className="text-xs text-[var(--gray-400)]">Moving Date</p>
            <p className="text-sm font-semibold text-[var(--gray-900)]">
              {new Date(booking.movingDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerCard({ booking }: { booking: Booking }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-5">
      <h4 className="text-sm font-bold text-[var(--gray-700)] mb-3 uppercase tracking-wider">
        Customer Details
      </h4>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-[var(--gray-400)]" />
          <span className="text-sm text-[var(--gray-700)]">
            {booking.customer.name || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-[var(--gray-400)]" />
          <span className="text-sm text-[var(--gray-700)]">
            {booking.customer.email || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-[var(--gray-400)]" />
          <span className="text-sm text-[var(--gray-700)]">
            {booking.customer.phone || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

function DriverCard({ driver }: { driver: Driver }) {
  return (
    <div className="bg-[var(--blue-50)] rounded-2xl border border-[var(--blue-100)] p-5">
      <h4 className="text-sm font-bold text-[var(--blue-800)] mb-3 uppercase tracking-wider">
        Assigned Driver
      </h4>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-[var(--blue-600)] flex items-center justify-center">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-semibold text-[var(--blue-900)]">{driver.name}</p>
          <p className="text-xs text-[var(--blue-600)]">Om Sai Packers Driver</p>
        </div>
      </div>
      {driver.phone && (
        <a
          href={`tel:${driver.phone}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-[var(--blue-600)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--blue-700)] transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call Driver
        </a>
      )}
    </div>
  );
}

function SupportCard() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-5">
      <h4 className="text-sm font-bold text-[var(--gray-700)] mb-3 uppercase tracking-wider">
        Need Help?
      </h4>
      <p className="text-sm text-[var(--gray-500)] mb-4">
        Have questions about your move? Our support team is here 24/7.
      </p>
      <div className="space-y-2">
        <a
          href="tel:+919876543210"
          className="flex items-center gap-2 p-3 rounded-xl bg-[var(--gray-50)] hover:bg-[var(--gray-100)] transition-colors text-sm font-medium text-[var(--gray-700)]"
        >
          <Phone className="w-4 h-4 text-[var(--blue-600)]" />
          +91 98765 43210
        </a>
        <a
          href="mailto:support@omsaipackers.com"
          className="flex items-center gap-2 p-3 rounded-xl bg-[var(--gray-50)] hover:bg-[var(--gray-100)] transition-colors text-sm font-medium text-[var(--gray-700)]"
        >
          <Mail className="w-4 h-4 text-[var(--blue-600)]" />
          support@omsaipackers.com
        </a>
        <button className="flex items-center gap-2 p-3 rounded-xl bg-[var(--gray-50)] hover:bg-[var(--gray-100)] transition-colors text-sm font-medium text-[var(--gray-700)] w-full">
          <MessageSquare className="w-4 h-4 text-[var(--blue-600)]" />
          Live Chat
        </button>
      </div>
    </div>
  );
}

// ─── Helper Components ───────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-[var(--gray-50)] rounded-xl">
      <p className="text-xs text-[var(--gray-400)] mb-1">{label}</p>
      <p className="text-sm font-semibold text-[var(--gray-900)]">{value}</p>
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
    furniture: "Furniture",
    appliances: "Appliances",
    electronics: "Electronics",
    kitchen: "Kitchen Items",
    clothes: "Clothes & Bags",
    books: "Books & Documents",
    plants: "Plants",
    gym: "Gym Equipment",
  };
  return map[item] || item;
}