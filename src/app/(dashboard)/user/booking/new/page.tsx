"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  MapPin,
  Calendar,
  Package,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Shield,
  Phone,
  Mail,
  User,
  Home,
  Building2,
  ArrowRight,
  Loader2,
  Star,
  FileText,
  MessageSquare,
  CreditCard,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────

interface BookingFormData {
  // Step 1: Move Details
  moveType: "local" | "intercity" | "office" | "vehicle";
  moveDate: string;
  moveTime: string;
  // Step 2: Locations
  fromAddress: string;
  fromCity: string;
  fromPincode: string;
  toAddress: string;
  toCity: string;
  toPincode: string;
  // Step 3: Inventory
  roomCount: string;
  items: string[];
  specialItems: string[];
  notes: string;
  // Step 4: Contact
  fullName: string;
  phone: string;
  email: string;
  altPhone: string;
}

const initialFormData: BookingFormData = {
  moveType: "local",
  moveDate: "",
  moveTime: "",
  fromAddress: "",
  fromCity: "",
  fromPincode: "",
  toAddress: "",
  toCity: "",
  toPincode: "",
  roomCount: "1",
  items: [],
  specialItems: [],
  notes: "",
  fullName: "",
  phone: "",
  email: "",
  altPhone: "",
};

const moveTypes = [
  {
    id: "local" as const,
    label: "Local Move",
    icon: Home,
    desc: "Within same city",
  },
  {
    id: "intercity" as const,
    label: "Intercity Move",
    icon: Truck,
    desc: "City to city relocation",
  },
  {
    id: "office" as const,
    label: "Office Shifting",
    icon: Building2,
    desc: "Commercial relocation",
  },
  {
    id: "vehicle" as const,
    label: "Vehicle Transport",
    icon: MapPin,
    desc: "Car/bike transportation",
  },
];

const inventoryItems = [
  { id: "furniture", label: "Furniture", icon: "🛋️" },
  { id: "appliances", label: "Appliances", icon: "📺" },
  { id: "electronics", label: "Electronics", icon: "💻" },
  { id: "kitchen", label: "Kitchen Items", icon: "🍽️" },
  { id: "clothes", label: "Clothes & Bags", icon: "👕" },
  { id: "books", label: "Books & Documents", icon: "📚" },
  { id: "plants", label: "Plants", icon: "🪴" },
  { id: "gym", label: "Gym Equipment", icon: "🏋️" },
];

const specialItemsList = [
  { id: "piano", label: "Piano / Musical Instruments" },
  { id: "antique", label: "Antique / Fragile Items" },
  { id: "artwork", label: "Artwork / Paintings" },
  { id: "glass", label: "Glass Items / Mirrors" },
  { id: "pets", label: "Pet Relocation" },
  { id: "none", label: "No Special Items" },
];

const timeSlots = [
  "06:00 AM - 08:00 AM",
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
];

// ─── Components ──────────────────────────────────────────────────────

export default function NewBookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
const [bookingResult, setBookingResult] = useState<{
  bookingNumber: string;
  trackingCode: string;
  estimatedAmount: number;
} | null>(null);
  const totalSteps = 4;

  const updateField = useCallback(
    <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const toggleItem = (itemId: string) => {
    setFormData((prev) => {
      const current = prev.items;
      const next = current.includes(itemId)
        ? current.filter((i) => i !== itemId)
        : [...current, itemId];
      return { ...prev, items: next };
    });
  };

  const toggleSpecialItem = (itemId: string) => {
    if (itemId === "none") {
      setFormData((prev) => ({ ...prev, specialItems: ["none"] }));
      return;
    }
    setFormData((prev) => {
      const filtered = prev.specialItems.filter((i) => i !== "none");
      const next = filtered.includes(itemId)
        ? filtered.filter((i) => i !== itemId)
        : [...filtered, itemId];
      return { ...prev, specialItems: next };
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.moveDate) newErrors.moveDate = "Please select a move date";
      if (!formData.moveTime) newErrors.moveTime = "Please select a time slot";
    }

    if (step === 2) {
      if (!formData.fromAddress.trim())
        newErrors.fromAddress = "Source address is required";
      if (!formData.fromCity.trim())
        newErrors.fromCity = "Source city is required";
      if (!formData.fromPincode.trim())
        newErrors.fromPincode = "Source pincode is required";
      if (!formData.toAddress.trim())
        newErrors.toAddress = "Destination address is required";
      if (!formData.toCity.trim())
        newErrors.toCity = "Destination city is required";
      if (!formData.toPincode.trim())
        newErrors.toPincode = "Destination pincode is required";
    }

    if (step === 3) {
      if (formData.items.length === 0)
        newErrors.items = "Please select at least one item category";
    }

    if (step === 4) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Valid 10-digit phone number is required";
      if (
        !formData.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      )
        newErrors.email = "Valid email address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

 const handleSubmit = async () => {
  if (!validateStep(currentStep)) return;

  setIsSubmitting(true);
  setErrors({}); // Clear previous errors

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API errors (400, 401, 404, 500)
      if (data.errors) {
        // Zod validation errors — map to form fields
        const fieldErrors: Record<string, string> = {};
        Object.entries(data.errors).forEach(([field, messages]) => {
          fieldErrors[field] = Array.isArray(messages) ? messages[0] : String(messages);
        });
        setErrors(fieldErrors);
      } else {
        // Generic error message
        setErrors({ submit: data.message || "Something went wrong. Please try again." });
      }
      return;
    }

    // Success — store booking data and show success screen
    if (data.success && data.data?.booking) {
      setBookingResult({
        bookingNumber: data.data.booking.bookingNumber,
        trackingCode: data.data.booking.trackingCode,
        estimatedAmount: Number(data.data.booking.estimatedAmount) || 0,
      });
      setShowSuccess(true);
      
      // Optional: Auto-redirect after delay
      setTimeout(() => {
        router.push("/user/booking");
      }, 4000);
    } else {
      setErrors({ submit: "Invalid response from server." });
    }
  } catch (error) {
    console.error("[BOOKING_SUBMIT_ERROR]", error);
    setErrors({ submit: "Network error. Please check your connection and try again." });
  } finally {
    setIsSubmitting(false);
  }
};


  // ─── Render ─────────────────────────────────────────────────────────

  if (showSuccess) {
     return <SuccessScreen booking={bookingResult} />;
  }

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--gray-200)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--blue-600)] flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--gray-900)]">
                Om Sai Packers & Movers
              </h1>
              <p className="text-xs text-[var(--gray-500)]">
                New Booking Request
              </p>
            </div>
          </div>
          <Link
            href="/user/booking"
            className="text-sm font-medium text-[var(--gray-600)] hover:text-[var(--blue-600)] transition-colors"
          >
            Back to Bookings
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <div className="bg-white rounded-2xl p-6 border border-[var(--gray-200)] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[var(--gray-900)]">
                  Booking Progress
                </h2>
                <span className="text-sm font-medium text-[var(--blue-600)]">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <div className="relative">
                <div className="h-2 bg-[var(--gray-200)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--lime-500)] rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(currentStep / totalSteps) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  {["Move Details", "Locations", "Inventory", "Contact"].map(
                    (label, idx) => (
                      <div
                        key={label}
                        className={`flex flex-col items-center gap-1 ${
                          idx + 1 <= currentStep
                            ? "text-[var(--blue-600)]"
                            : "text-[var(--gray-400)]"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                            idx + 1 < currentStep
                              ? "bg-[var(--lime-500)] text-white"
                              : idx + 1 === currentStep
                              ? "bg-[var(--blue-600)] text-white ring-4 ring-[var(--blue-100)]"
                              : "bg-[var(--gray-200)] text-[var(--gray-500)]"
                          }`}
                        >
                          {idx + 1 < currentStep ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span className="text-xs font-medium hidden sm:block">
                          {label}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8"
                >
                  {currentStep === 1 && (
                    <Step1MoveDetails
                      formData={formData}
                      updateField={updateField}
                      errors={errors}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2Locations
                      formData={formData}
                      updateField={updateField}
                      errors={errors}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3Inventory
                      formData={formData}
                      toggleItem={toggleItem}
                      toggleSpecialItem={toggleSpecialItem}
                      updateField={updateField}
                      errors={errors}
                    />
                  )}
                  {currentStep === 4 && (
                    <Step4Contact
                      formData={formData}
                      updateField={updateField}
                      errors={errors}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="px-6 sm:px-8 pb-8 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    currentStep === 1
                      ? "opacity-0 pointer-events-none"
                      : "bg-[var(--gray-100)] text-[var(--gray-700)] hover:bg-[var(--gray-200)]"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-[var(--blue-600)] text-white rounded-xl font-semibold hover:bg-[var(--blue-700)] transition-all shadow-lg shadow-[var(--blue-200)] hover:shadow-[var(--blue-300)] active:scale-95"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 bg-[var(--lime-500)] text-white rounded-xl font-semibold hover:bg-[var(--lime-600)] transition-all shadow-lg shadow-[var(--lime-200)] hover:shadow-[var(--lime-300)] active:scale-95 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                )}
              </div>

              {errors.submit && (
                <div className="px-6 sm:px-8 pb-6">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                    {errors.submit}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <BookingSummary formData={formData} />
              <TrustBadges />
              <NeedHelp />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Step 1: Move Details ────────────────────────────────────────────

function Step1MoveDetails({
  formData,
  updateField,
  errors,
}: {
  formData: BookingFormData;
  updateField: <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K]
  ) => void;
  errors: Record<string, string>;
}) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--gray-900)] mb-1">
          What type of move?
        </h3>
        <p className="text-sm text-[var(--gray-500)]">
          Select the service that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {moveTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = formData.moveType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => updateField("moveType", type.id)}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 group ${
                isSelected
                  ? "border-[var(--blue-600)] bg-[var(--blue-50)] shadow-md"
                  : "border-[var(--gray-200)] bg-white hover:border-[var(--blue-300)] hover:shadow-sm"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--lime-500)] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected
                    ? "bg-[var(--blue-600)] text-white"
                    : "bg-[var(--gray-100)] text-[var(--gray-600)] group-hover:bg-[var(--blue-100)] group-hover:text-[var(--blue-600)]"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-[var(--gray-900)] mb-1">
                {type.label}
              </h4>
              <p className="text-xs text-[var(--gray-500)]">{type.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
        <div>
          <label className="block text-sm font-semibold text-[var(--gray-700)] mb-2">
            Move Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <input
              type="date"
              min={today}
              value={formData.moveDate}
              onChange={(e) => updateField("moveDate", e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] font-medium focus:outline-none focus:ring-0 transition-colors ${
                errors.moveDate
                  ? "border-red-300 focus:border-red-500"
                  : "border-[var(--gray-200)] focus:border-[var(--blue-500)]"
              }`}
            />
          </div>
          {errors.moveDate && (
            <p className="mt-1.5 text-sm text-red-500 font-medium">
              {errors.moveDate}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--gray-700)] mb-2">
            Preferred Time <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <select
              value={formData.moveTime}
              onChange={(e) => updateField("moveTime", e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] font-medium focus:outline-none focus:ring-0 transition-colors appearance-none ${
                errors.moveTime
                  ? "border-red-300 focus:border-red-500"
                  : "border-[var(--gray-200)] focus:border-[var(--blue-500)]"
              }`}
            >
              <option value="">Select time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-400)] rotate-90 pointer-events-none" />
          </div>
          {errors.moveTime && (
            <p className="mt-1.5 text-sm text-red-500 font-medium">
              {errors.moveTime}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Locations ───────────────────────────────────────────────

function Step2Locations({
  formData,
  updateField,
  errors,
}: {
  formData: BookingFormData;
  updateField: <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K]
  ) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--gray-900)] mb-1">
          Where are you moving?
        </h3>
        <p className="text-sm text-[var(--gray-500)]">
          Enter your current and destination addresses
        </p>
      </div>

      {/* From Address */}
      <div className="bg-[var(--blue-50)] rounded-2xl p-6 border border-[var(--blue-100)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[var(--blue-600)] flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <h4 className="font-semibold text-[var(--blue-800)]">
            Moving From (Source)
          </h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.fromAddress}
              onChange={(e) => updateField("fromAddress", e.target.value)}
              placeholder="Enter complete address with landmark"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] focus:outline-none focus:ring-0 transition-colors resize-none ${
                errors.fromAddress
                  ? "border-red-300 focus:border-red-500"
                  : "border-[var(--gray-200)] focus:border-[var(--blue-500)]"
              }`}
            />
            {errors.fromAddress && (
              <p className="mt-1 text-sm text-red-500">{errors.fromAddress}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fromCity}
                onChange={(e) => updateField("fromCity", e.target.value)}
                placeholder="e.g. Mumbai"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] focus:outline-none focus:ring-0 transition-colors ${
                  errors.fromCity
                    ? "border-red-300 focus:border-red-500"
                    : "border-[var(--gray-200)] focus:border-[var(--blue-500)]"
                }`}
              />
              {errors.fromCity && (
                <p className="mt-1 text-sm text-red-500">{errors.fromCity}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={6}
                value={formData.fromPincode}
                onChange={(e) =>
                  updateField(
                    "fromPincode",
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                placeholder="400001"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] focus:outline-none focus:ring-0 transition-colors ${
                  errors.fromPincode
                    ? "border-red-300 focus:border-red-500"
                    : "border-[var(--gray-200)] focus:border-[var(--blue-500)]"
                }`}
              />
              {errors.fromPincode && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fromPincode}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Arrow Divider */}
      <div className="flex justify-center">
        <div className="w-10 h-10 rounded-full bg-[var(--lime-500)] flex items-center justify-center shadow-lg">
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* To Address */}
      <div className="bg-[var(--lime-50)] rounded-2xl p-6 border border-[var(--lime-200)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[var(--lime-600)] flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <h4 className="font-semibold text-[var(--lime-800)]">
            Moving To (Destination)
          </h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.toAddress}
              onChange={(e) => updateField("toAddress", e.target.value)}
              placeholder="Enter complete destination address"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] focus:outline-none focus:ring-0 transition-colors resize-none ${
                errors.toAddress
                  ? "border-red-300 focus:border-red-500"
                  : "border-[var(--gray-200)] focus:border-[var(--lime-500)]"
              }`}
            />
            {errors.toAddress && (
              <p className="mt-1 text-sm text-red-500">{errors.toAddress}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.toCity}
                onChange={(e) => updateField("toCity", e.target.value)}
                placeholder="e.g. Pune"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] focus:outline-none focus:ring-0 transition-colors ${
                  errors.toCity
                    ? "border-red-300 focus:border-red-500"
                    : "border-[var(--gray-200)] focus:border-[var(--lime-500)]"
                }`}
              />
              {errors.toCity && (
                <p className="mt-1 text-sm text-red-500">{errors.toCity}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={6}
                value={formData.toPincode}
                onChange={(e) =>
                  updateField(
                    "toPincode",
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                placeholder="411001"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] focus:outline-none focus:ring-0 transition-colors ${
                  errors.toPincode
                    ? "border-red-300 focus:border-red-500"
                    : "border-[var(--gray-200)] focus:border-[var(--lime-500)]"
                }`}
              />
              {errors.toPincode && (
                <p className="mt-1 text-sm text-red-500">{errors.toPincode}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Inventory ───────────────────────────────────────────────

function Step3Inventory({
  formData,
  toggleItem,
  toggleSpecialItem,
  updateField,
  errors,
}: {
  formData: BookingFormData;
  toggleItem: (id: string) => void;
  toggleSpecialItem: (id: string) => void;
  updateField: <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K]
  ) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--gray-900)] mb-1">
          What are you moving?
        </h3>
        <p className="text-sm text-[var(--gray-500)]">
          Select the items you need to relocate
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--gray-700)] mb-3">
          Number of Rooms
        </label>
        <div className="flex gap-3">
          {["1", "2", "3", "4", "5+"].map((count) => (
            <button
              key={count}
              onClick={() => updateField("roomCount", count)}
              className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                formData.roomCount === count
                  ? "border-[var(--blue-600)] bg-[var(--blue-50)] text-[var(--blue-700)]"
                  : "border-[var(--gray-200)] text-[var(--gray-600)] hover:border-[var(--blue-300)]"
              }`}
            >
              {count} {count === "5+" ? "Rooms" : "Room"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--gray-700)] mb-3">
          Item Categories <span className="text-red-500">*</span>
        </label>
        {errors.items && (
          <p className="mb-2 text-sm text-red-500 font-medium">{errors.items}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {inventoryItems.map((item) => {
            const isSelected = formData.items.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                  isSelected
                    ? "border-[var(--lime-500)] bg-[var(--lime-50)] shadow-sm"
                    : "border-[var(--gray-200)] bg-white hover:border-[var(--lime-300)]"
                }`}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs font-semibold text-[var(--gray-700)]">
                  {item.label}
                </div>
                {isSelected && (
                  <div className="mt-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--lime-600)] mx-auto" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--gray-700)] mb-3">
          Special Items (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {specialItemsList.map((item) => {
            const isSelected = formData.specialItems.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleSpecialItem(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  isSelected
                    ? "border-[var(--blue-600)] bg-[var(--blue-50)] text-[var(--blue-700)]"
                    : "border-[var(--gray-200)] text-[var(--gray-600)] hover:border-[var(--blue-300)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--gray-700)] mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          rows={3}
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          placeholder="Any specific requirements, fragile items, or special instructions..."
          className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] focus:outline-none focus:border-[var(--blue-500)] transition-colors resize-none"
        />
      </div>
    </div>
  );
}

// ─── Step 4: Contact ─────────────────────────────────────────────────

function Step4Contact({
  formData,
  updateField,
  errors,
}: {
  formData: BookingFormData;
  updateField: <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K]
  ) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--gray-900)] mb-1">
          Your Contact Details
        </h3>
        <p className="text-sm text-[var(--gray-500)]">
          We will use this to confirm your booking and send updates
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[var(--gray-700)] mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="Enter your full name"
              className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] focus:outline-none focus:ring-0 transition-colors ${
                errors.fullName
                  ? "border-red-300 focus:border-red-500"
                  : "border-[var(--gray-200)] focus:border-[var(--blue-500)]"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-[var(--gray-700)] mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
              <input
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                placeholder="10-digit mobile number"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] focus:outline-none focus:ring-0 transition-colors ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500"
                    : "border-[var(--gray-200)] focus:border-[var(--blue-500)]"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--gray-700)] mb-2">
              Alternate Phone (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
              <input
                type="tel"
                maxLength={10}
                value={formData.altPhone}
                onChange={(e) =>
                  updateField(
                    "altPhone",
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                placeholder="Alternate contact"
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] focus:outline-none focus:border-[var(--blue-500)] transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--gray-700)] mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="your@email.com"
              className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-white text-[var(--gray-900)] focus:outline-none focus:ring-0 transition-colors ${
                errors.email
                  ? "border-red-300 focus:border-red-500"
                  : "border-[var(--gray-200)] focus:border-[var(--blue-500)]"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="bg-[var(--blue-50)] rounded-xl p-4 border border-[var(--blue-100)] flex items-start gap-3">
        <Shield className="w-5 h-5 text-[var(--blue-600)] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-[var(--blue-800)]">
            Your information is secure
          </p>
          <p className="text-xs text-[var(--blue-600)] mt-1">
            We never share your personal details with third parties. Your data is
            encrypted and protected.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Booking Summary Sidebar ─────────────────────────────────────────

function BookingSummary({ formData }: { formData: BookingFormData }) {
  const moveTypeLabel =
    moveTypes.find((t) => t.id === formData.moveType)?.label || "Local Move";

  const hasData =
    formData.moveDate ||
    formData.fromCity ||
    formData.toCity ||
    formData.items.length > 0;

  if (!hasData) {
    return (
      <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-[var(--gray-300)] mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-[var(--gray-600)]">
            Booking Summary
          </h3>
          <p className="text-sm text-[var(--gray-400)] mt-1">
            Fill in the details to see your estimate
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm overflow-hidden">
      <div className="bg-[var(--blue-600)] px-6 py-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Booking Summary
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {formData.moveType && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--gray-500)]">Move Type</span>
            <span className="text-sm font-semibold text-[var(--gray-900)]">
              {moveTypeLabel}
            </span>
          </div>
        )}

        {formData.moveDate && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--gray-500)]">Move Date</span>
            <span className="text-sm font-semibold text-[var(--gray-900)]">
              {new Date(formData.moveDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}

        {formData.moveTime && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--gray-500)]">Time Slot</span>
            <span className="text-sm font-semibold text-[var(--gray-900)]">
              {formData.moveTime}
            </span>
          </div>
        )}

        {formData.fromCity && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--gray-500)]">From</span>
            <span className="text-sm font-semibold text-[var(--gray-900)]">
              {formData.fromCity}
            </span>
          </div>
        )}

        {formData.toCity && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--gray-500)]">To</span>
            <span className="text-sm font-semibold text-[var(--gray-900)]">
              {formData.toCity}
            </span>
          </div>
        )}

        {formData.items.length > 0 && (
          <div className="flex justify-between items-start">
            <span className="text-sm text-[var(--gray-500)]">Items</span>
            <span className="text-sm font-semibold text-[var(--gray-900)] text-right">
              {formData.items.length} categories
            </span>
          </div>
        )}

        {formData.roomCount && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--gray-500)]">Rooms</span>
            <span className="text-sm font-semibold text-[var(--gray-900)]">
              {formData.roomCount}
            </span>
          </div>
        )}

        <div className="border-t border-[var(--gray-200)] pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-[var(--gray-700)]">
              Estimated Price
            </span>
            <span className="text-2xl font-bold text-[var(--lime-600)]">
              ₹{getEstimatedPrice().toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-xs text-[var(--gray-400)] mt-1 text-right">
            Final price may vary after survey
          </p>
        </div>
      </div>
    </div>
  );

  function getEstimatedPrice() {
    let base = 0;
    switch (formData.moveType) {
      case "local":
        base = 3000;
        break;
      case "intercity":
        base = 8000;
        break;
      case "office":
        base = 15000;
        break;
      case "vehicle":
        base = 5000;
        break;
    }
    const itemMultiplier = 1 + formData.items.length * 0.15;
    const roomMultiplier = parseInt(formData.roomCount) * 0.5;
    const specialMultiplier =
      formData.specialItems.length > 0 &&
      !formData.specialItems.includes("none")
        ? 1.3
        : 1;
    return Math.round(base * itemMultiplier * roomMultiplier * specialMultiplier);
  }
}

// ─── Trust Badges ────────────────────────────────────────────────────

function TrustBadges() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
      <h4 className="text-sm font-semibold text-[var(--gray-700)] mb-4">
        Why Choose Om Sai Packers?
      </h4>
      <div className="space-y-4">
        {[
          {
            icon: Shield,
            title: "Insured & Safe",
            desc: "Full insurance coverage for your goods",
            color: "text-[var(--blue-600)]",
            bg: "bg-[var(--blue-50)]",
          },
          {
            icon: Clock,
            title: "On-Time Delivery",
            desc: "99% on-time delivery guarantee",
            color: "text-[var(--lime-600)]",
            bg: "bg-[var(--lime-50)]",
          },
          {
            icon: Star,
            title: "4.9/5 Rating",
            desc: "Trusted by 10,000+ happy customers",
            color: "text-[var(--blue-600)]",
            bg: "bg-[var(--blue-50)]",
          },
          {
            icon: CreditCard,
            title: "Best Price Guarantee",
            desc: "No hidden charges, transparent pricing",
            color: "text-[var(--lime-600)]",
            bg: "bg-[var(--lime-50)]",
          },
        ].map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.title} className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-lg ${badge.bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`w-4 h-4 ${badge.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--gray-800)]">
                  {badge.title}
                </p>
                <p className="text-xs text-[var(--gray-500)]">{badge.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Need Help ───────────────────────────────────────────────────────

function NeedHelp() {
  return (
    <div className="bg-[var(--blue-600)] rounded-2xl p-6 text-white">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-5 h-5" />
        <h4 className="font-semibold">Need Help?</h4>
      </div>
      <p className="text-sm text-[var(--blue-100)] mb-4">
        Our moving experts are available 24/7 to assist you with your booking.
      </p>
      <a
        href="tel:+919876543210"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[var(--blue-700)] rounded-xl font-semibold text-sm hover:bg-[var(--blue-50)] transition-colors"
      >
        <Phone className="w-4 h-4" />
        Call Now: +91 98765 43210
      </a>
    </div>
  );
}

// ─── Success Screen ──────────────────────────────────────────────────

function SuccessScreen({booking}:{ 
  booking: { bookingNumber: string; trackingCode: string; estimatedAmount: number } | null 
}) {
  return (
    <div className="min-h-screen bg-[var(--gray-50)] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white rounded-3xl shadow-xl border border-[var(--gray-200)] p-8 sm:p-12 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-[var(--lime-500)] flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-[var(--gray-500)] mb-6">
          Thank you for choosing <strong>Om Sai Packers & Movers</strong>. Our
          team will contact you within 2 hours to confirm the details and
          schedule a pre-move survey.
        </p>

        <div className="bg-[var(--blue-50)] rounded-xl p-4 mb-6 border border-[var(--blue-100)]">
          <p className="text-sm text-[var(--blue-700)] font-medium">
            Booking Reference:{" "}
            <span className="font-bold">
             
               {booking?.bookingNumber || "OSPM-XXXXXX"}
            </span>
          </p>
          <p className="text-xs text-[var(--blue-600)] mt-1">
            Check your email for confirmation details
          </p>
        </div>
        {/* tracking */}
<div className="bg-[var(--lime-50)] rounded-xl p-4 mb-6 border border-[var(--lime-200)]">
  <p className="text-sm text-[var(--lime-800)] font-medium flex items-center gap-2">
    <Truck className="w-4 h-4" />
    Tracking Code:{" "}
    <span className="font-bold text-lg">
      {booking?.trackingCode || "TRK-XXXX"}
    </span>
  </p>
  <p className="text-xs text-[var(--lime-600)] mt-1">
    Use this code to track your shipment status
  </p>
</div>
{/* estimated price */}
<div className="flex justify-between items-center bg-[var(--gray-50)] rounded-xl p-4 mb-6">
  <span className="text-sm font-semibold text-[var(--gray-700)]">
    Estimated Price
  </span>
  <span className="text-xl font-bold text-[var(--lime-600)]">
    ₹{booking?.estimatedAmount?.toLocaleString("en-IN") || "0"}
  </span>
</div>
<Link
  href={`/track?code=${booking?.trackingCode || ""}`}
  className="w-full py-3 bg-[var(--lime-500)] text-white rounded-xl font-semibold hover:bg-[var(--lime-600)] transition-colors flex items-center justify-center gap-2"
>
  <Truck className="w-4 h-4" />
  Track My Shipment
</Link>
        <div className="flex flex-col gap-3">
          <Link
            href="/user/bookings"
            className="w-full py-3 bg-[var(--blue-600)] text-white rounded-xl font-semibold hover:bg-[var(--blue-700)] transition-colors"
          >
            View My Bookings
          </Link>
          <Link
            href="/user/dashboard"
            className="w-full py-3 bg-[var(--gray-100)] text-[var(--gray-700)] rounded-xl font-semibold hover:bg-[var(--gray-200)] transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>

        <p className="text-xs text-[var(--gray-400)] mt-6">
          Redirecting to your bookings in a few seconds...
        </p>
      </motion.div>
    </div>
  );
}