"use client";

import { useState, type ChangeEvent  } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Star,
  Truck,
  IndianRupee,
  CheckCircle2,
  MapPin,
  Shield,
  Award,
  Edit3,
  Save,
  X,
  Loader2,
  LogOut,
  Camera,
  AlertCircle,
} from "lucide-react";

interface DriverProfileClientProps {
  driver: {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    image: string | null;
    imagePublicId: string | null;
    createdAt: string;
    totalDeliveries: number;
    completedDeliveries: number;
    totalEarnings: number;
  };
}

export default function DriverProfileClient({ driver }: DriverProfileClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(driver.name || "");
  const [phone, setPhone] = useState(driver.phone || "");
  const [success, setSuccess] = useState("");
const [error, setError] = useState(""); 
const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string | null>(driver.image || null);
const [uploadingImage, setUploadingImage] = useState(false); 





const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    setError("Image must be under 2MB");
    return;
  }
  if (!file.type.startsWith("image/")) {
    setError("Only image files allowed");
    return;
  }

  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));
  setIsEditing(true);  
  setError(""); // clear error
};

const saveProfile = async () => {
  setLoading(true);
  setError("");

  try {
    let imageUrl = driver.image;
    let newPublicId = driver.imagePublicId; // <-- You need to pass this from server

    // Step A: Delete old image from Cloudinary if exists
    if (imageFile && driver.imagePublicId) {
      await fetch("/api/upload/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: driver.imagePublicId }),
      });
      // Don't care if delete fails, just proceed
    }

    // Step B: Upload new image
    if (imageFile) {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("folder", "drivers");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.success) throw new Error(uploadData.message);
      
      imageUrl = uploadData.data.url;
      newPublicId = uploadData.data.publicId; // <-- SAVE THIS
      setUploadingImage(false);
    }

    // Step C: Update profile with new image + publicId
    const res = await fetch("/api/driver/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        image: imageUrl,
        imagePublicId: newPublicId, // <-- SEND THIS
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);

    setSuccess("Profile updated!");
    setIsEditing(false);
    setImageFile(null);
    setTimeout(() => window.location.reload(), 1000);
    
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed");
  } finally {
    setLoading(false);
    setUploadingImage(false);
  }
};

  const rating = 4.8;
  const memberSince = new Date(driver.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" });


  
  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <div className="bg-[var(--blue-600)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-4">
            <Link href="/driver" className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <h1 className="text-xl font-bold text-white">Driver Profile</h1>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-[var(--blue-100)] flex items-center justify-center border-4 border-[var(--blue-50)]">
             {imagePreview ? (
  <img src={imagePreview} alt={driver.name || ""} className="w-full h-full rounded-full object-cover" />
) : (
  <User className="w-12 h-12 text-[var(--blue-600)]" />
)}
            </div>
        <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--lime-500)] flex items-center justify-center border-2 border-white cursor-pointer hover:bg-[var(--lime-600)] transition-colors">
  <Camera className="w-4 h-4 text-white pointer-events-none" />
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
    disabled={uploadingImage}
  />
</label>
{uploadingImage && (
  <div className="flex items-center gap-2 text-sm text-[var(--blue-600)] mb-3">
    <Loader2 className="w-4 h-4 animate-spin" /> Uploading to Cloudinary...
  </div>
)}
          </div>
          <h2 className="text-xl font-bold text-[var(--gray-900)]">{driver.name || "Driver"}</h2>
          <p className="text-sm text-[var(--gray-500)]">{driver.email}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Star className="w-4 h-4 text-[var(--lime-500)] fill-[var(--lime-500)]" />
            <span className="font-bold text-[var(--gray-900)]">{rating}</span>
            <span className="text-sm text-[var(--gray-400)]">(124 reviews)</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Deliveries", value: driver.totalDeliveries, icon: Truck, color: "text-[var(--blue-600)]", bg: "bg-[var(--blue-50)]" },
            { label: "Completed", value: driver.completedDeliveries, icon: CheckCircle2, color: "text-[var(--lime-600)]", bg: "bg-[var(--lime-50)]" },
            { label: "Earnings", value: `₹${(driver.totalEarnings / 1000).toFixed(1)}K`, icon: IndianRupee, color: "text-[var(--blue-700)]", bg: "bg-[var(--blue-100)]" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center border border-[var(--gray-200)]`}>
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-xl font-bold text-[var(--gray-900)]">{stat.value}</p>
                <p className="text-xs text-[var(--gray-500)]">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <h3 className="font-bold text-[var(--gray-900)] mb-4">Achievements</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Top Driver", icon: Award, color: "bg-[var(--lime-50)] text-[var(--lime-700)] border-[var(--lime-200)]" },
              { label: "100+ Deliveries", icon: Truck, color: "bg-[var(--blue-50)] text-[var(--blue-700)] border-[var(--blue-200)]" },
              { label: "5-Star Rating", icon: Star, color: "bg-[var(--blue-100)] text-[var(--blue-800)] border-[var(--blue-300)]" },
              { label: "Verified", icon: Shield, color: "bg-[var(--gray-100)] text-[var(--gray-700)] border-[var(--gray-200)]" },
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <span key={badge.label} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold ${badge.color}`}>
                  <Icon className="w-3.5 h-3.5" /> {badge.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[var(--gray-900)]">Personal Information</h3>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="p-2 rounded-lg bg-[var(--blue-50)] hover:bg-[var(--blue-100)] transition-colors">
                <Edit3 className="w-4 h-4 text-[var(--blue-600)]" />
              </button>
            ) : (
              <div className="flex gap-2">
              <button onClick={() => {
  setIsEditing(false);
  setName(driver.name || "");
  setPhone(driver.phone || "");
  setImageFile(null);
  setImagePreview(driver.image || null);
}} className="p-2 rounded-lg bg-[var(--gray-100)] hover:bg-[var(--gray-200)] transition-colors">
                  <X className="w-4 h-4 text-[var(--gray-600)]" />
                </button>
                <button onClick={saveProfile} disabled={loading} className="p-2 rounded-lg bg-[var(--lime-50)] hover:bg-[var(--lime-100)] transition-colors">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin text-[var(--lime-600)]" /> : <Save className="w-4 h-4 text-[var(--lime-600)]" />}
                </button>
              </div>
            )}
          </div>

          {success && (
            <div className="p-3 bg-[var(--lime-50)] border border-[var(--lime-200)] rounded-xl text-[var(--lime-700)] text-sm font-medium mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {success}
            </div>
          )}
{error && (
  <motion.div 
    initial={{ opacity: 0, y: -10 }} 
    animate={{ opacity: 1, y: 0 }}
    className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium mb-4 flex items-center gap-2"
  >
    <AlertCircle className="w-4 h-4" /> {error}
  </motion.div>
)}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--gray-100)] flex items-center justify-center">
                <User className="w-5 h-5 text-[var(--gray-500)]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[var(--gray-400)]">Full Name</p>
                {isEditing ? (
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[var(--gray-200)] focus:outline-none focus:border-[var(--blue-500)] text-sm" />
                ) : (
                  <p className="font-semibold text-[var(--gray-900)]">{driver.name || "N/A"}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--gray-100)] flex items-center justify-center">
                <Mail className="w-5 h-5 text-[var(--gray-500)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--gray-400)]">Email</p>
                <p className="font-semibold text-[var(--gray-900)]">{driver.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--gray-100)] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[var(--gray-500)]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[var(--gray-400)]">Phone</p>
                {isEditing ? (
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[var(--gray-200)] focus:outline-none focus:border-[var(--blue-500)] text-sm" />
                ) : (
                  <p className="font-semibold text-[var(--gray-900)]">{driver.phone || "N/A"}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--gray-100)] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[var(--gray-500)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--gray-400)]">Member Since</p>
                <p className="font-semibold text-[var(--gray-900)]">{memberSince}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full py-3 border-2 border-red-200 text-red-600 rounded-2xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </main>
    </div>
  );
}