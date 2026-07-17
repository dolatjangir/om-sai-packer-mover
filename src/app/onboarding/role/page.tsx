"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, User, Truck, CheckCircle2 } from "lucide-react";

export default function OnboardingRolePage() {
  const router = useRouter();
  const { update } = useSession();
  const [selectedRole, setSelectedRole] = useState<"USER" | "DRIVER" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    {
      id: "USER" as const,
      title: "I am a Customer",
      description: "Book moving services and track your shipments easily",
      icon: User,
      cardBg: "bg-white/95",
      hoverBorder: "hover:border-[#0E4995]",
      activeRing: "ring-[#0E4995]",
      iconBg: "bg-[#0E4995]/10",
      iconColor: "text-[#0E4995]",
      checkBg: "bg-[#0E4995]",
    },
    {
      id: "DRIVER" as const,
      title: "I am a Driver",
      description: "Join our fleet and earn with every delivery you make",
      icon: Truck,
      cardBg: "bg-white/95",
      hoverBorder: "hover:border-[#a2bd1b]",
      activeRing: "ring-[#CADB2A]",
      iconBg: "bg-[#CADB2A]/15",
      iconColor: "text-[#a2bd1b]",
      checkBg: "bg-[#a2bd1b]",
    },
  ];

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError("Please select a role to continue");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save your choice");
      }

      await update();
      router.replace(selectedRole === "DRIVER" ? "/driver" : "/user");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E4995] via-[#1a5ca8] to-[#2F7359] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#CADB2A]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#0E4995]/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-6 shadow-xl">
            <CheckCircle2 className="w-10 h-10 text-[#CADB2A]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Welcome to Om Sai Packers
          </h1>
          <p className="text-blue-100/90 text-lg max-w-md mx-auto leading-relaxed">
            Choose how you want to use our platform
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setError("");
                }}
                className={`relative group p-8 rounded-2xl border-2 backdrop-blur-sm text-left transition-all duration-300
                  ${role.cardBg}
                  ${isSelected 
                    ? `border-transparent ring-[3px] ${role.activeRing} shadow-2xl scale-[1.02]` 
                    : `border-white/20 ${role.hoverBorder} shadow-lg hover:shadow-xl hover:bg-white`}
                `}
              >
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl ${role.iconBg} ${role.iconColor} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}>
                    <Icon className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0E4995] mb-2">
                    {role.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {role.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                      ${isSelected ? `${role.checkBg} border-transparent` : "border-slate-300 bg-white"}
                    `}>
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm font-semibold ${isSelected ? "text-[#0E4995]" : "text-slate-400"}`}>
                      {isSelected ? "Selected" : "Click to select"}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-4 bg-red-50/95 backdrop-blur-sm border border-red-200 rounded-xl text-red-700 text-sm text-center font-semibold">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !selectedRole}
          className="w-full py-4 bg-gradient-to-r from-[#CADB2A] to-[#a2bd1b] hover:from-[#b8c625] hover:to-[#90a818]
            disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed
            text-[#0E4995] font-extrabold text-lg rounded-xl transition-all duration-200
            flex items-center justify-center gap-3 shadow-xl shadow-[#CADB2A]/25
            disabled:shadow-none active:scale-[0.99]"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Setting up your account...
            </>
          ) : (
            <>
              Continue
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>

        <p className="text-center text-white/50 text-sm mt-5 font-medium">
          You can change this later in your profile settings
        </p>
      </div>
    </div>
  );
}