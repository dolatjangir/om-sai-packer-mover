"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  User,
  ChevronDown,
  ChevronRight,
  Loader2,
  Star,
  AlertCircle,
  Eye,
  Edit3,
  Send,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  PhoneCall,
  Check,
  Ban,
  DollarSign,
  Truck,
  ArrowRight,
  X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  serviceType: string | null;
  fromCity: string | null;
  toCity: string | null;
  fromAddress: string | null;
  toAddress: string | null;
  movingDate: string | null;
  budget: number | null;
  message: string | null;
  status: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  assignedUser: { name: string | null; email: string | null } | null;
}

interface AdminLeadsClientProps {
  initialLeads: Lead[];
  stats: {
    total: number;
    new: number;
    contacted: number;
    converted: number;
    lost: number;
  };
}

// ─── Status Config ───────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: typeof CheckCircle2 }> = {
  NEW: { label: "New", icon: Star, color: "text-[var(--blue-700)]", bg: "bg-[var(--blue-50)]", border: "border-[var(--blue-200)]" },
  CONTACTED: { label: "Contacted", icon: PhoneCall, color: "text-[var(--lime-700)]", bg: "bg-[var(--lime-50)]", border: "border-[var(--lime-200)]" },
  QUOTED: { label: "Quoted", icon: MessageSquare, color: "text-[var(--blue-800)]", bg: "bg-[var(--blue-100)]", border: "border-[var(--blue-300)]" },
  CONVERTED: { label: "Converted", icon: CheckCircle2, color: "text-[var(--lime-800)]", bg: "bg-[var(--lime-100)]", border: "border-[var(--lime-300)]" },
  LOST: { label: "Lost", icon: Ban, color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

const statusFlow = ["NEW", "CONTACTED", "QUOTED", "CONVERTED"];

// ─── Helper Functions ────────────────────────────────────────────────

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function formatCurrency(amount: number | null) {
  if (!amount) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

// ─── Main Component ───────────────────────────────────────────────────

export default function AdminLeadsClient({ initialLeads, stats }: AdminLeadsClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "budget">("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredLeads = useMemo(() => {
    let result = leads.filter((l) => {
      const matchesSearch =
        !searchQuery ||
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone.includes(searchQuery) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.fromCity?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.toCity?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || l.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "budget") return (b.budget || 0) - (a.budget || 0);
      return 0;
    });

    return result;
  }, [leads, searchQuery, statusFilter, sortBy]);

  const updateStatus = async (leadId: string, newStatus: string) => {
    setLoadingId(leadId);
    setError("");

    try {
      const res = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to update status");

      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus, updatedAt: new Date().toISOString() } : l)));
      setSuccess(`Status updated to ${statusConfig[newStatus]?.label || newStatus}`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
      setTimeout(() => setError(""), 5000);
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

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortBy("newest");
  };

  const statsCards = [
    { label: "Total", value: stats.total, color: "text-[var(--gray-900)]", bg: "bg-[var(--gray-100)]", icon: Users },
    { label: "New", value: stats.new, color: "text-[var(--blue-700)]", bg: "bg-[var(--blue-50)]", icon: Star },
    { label: "Contacted", value: stats.contacted, color: "text-[var(--lime-700)]", bg: "bg-[var(--lime-50)]", icon: PhoneCall },
    { label: "Converted", value: stats.converted, color: "text-[var(--lime-800)]", bg: "bg-[var(--lime-100)]", icon: CheckCircle2 },
    { label: "Lost", value: stats.lost, color: "text-red-700", bg: "bg-red-50", icon: Ban },
  ];

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* ─── Header ─────────────────────────────────────────────── */}
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
              <h1 className="text-2xl font-bold text-[var(--gray-900)]">Quote Requests</h1>
              <p className="text-sm text-[var(--gray-500)]">Manage all customer quote requests</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {statsCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${stat.bg} rounded-xl border border-[var(--gray-200)] p-4`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[var(--gray-500)]">{stat.label}</span>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Alerts ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
              <button onClick={() => setError("")} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 rounded-xl bg-[var(--lime-50)] border border-[var(--lime-200)] flex items-center gap-3 text-[var(--lime-800)]"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{success}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Filters & Search ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-400)]" />
              <input
                type="text"
                placeholder="Search by name, phone, email, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--gray-200)] bg-[var(--gray-50)] text-sm text-[var(--gray-900)] placeholder:text-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-[var(--gray-400)] hover:text-[var(--gray-600)]" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-[var(--gray-200)] bg-[var(--gray-50)] text-sm text-[var(--gray-700)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] cursor-pointer"
              >
                <option value="all">All Status</option>
                {Object.entries(statusConfig).map(([key, cfg]) => (
                  <option key={key} value={key}>{cfg.label}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "budget")}
                className="px-4 py-2.5 rounded-lg border border-[var(--gray-200)] bg-[var(--gray-50)] text-sm text-[var(--gray-700)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budget">Highest Budget</option>
              </select>

              {(searchQuery || statusFilter !== "all" || sortBy !== "newest") && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 rounded-lg border border-[var(--gray-200)] text-sm text-[var(--gray-600)] hover:bg-[var(--gray-100)] transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-3 pt-3 border-t border-[var(--gray-100)] flex items-center justify-between">
            <p className="text-sm text-[var(--gray-500)]">
              Showing <span className="font-semibold text-[var(--gray-900)]">{filteredLeads.length}</span> of{" "}
              <span className="font-semibold text-[var(--gray-900)]">{leads.length}</span> leads
            </p>
            {(searchQuery || statusFilter !== "all") && (
              <div className="flex gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--blue-50)] text-xs font-medium text-[var(--blue-700)]">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {statusFilter !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--gray-100)] text-xs font-medium text-[var(--gray-700)]">
                    Status: {statusConfig[statusFilter]?.label}
                    <button onClick={() => setStatusFilter("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Leads List ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {filteredLeads.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border border-[var(--gray-200)] p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--gray-100)] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[var(--gray-400)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-1">No leads found</h3>
            <p className="text-sm text-[var(--gray-500)] mb-4">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No quote requests have been submitted yet"}
            </p>
            {(searchQuery || statusFilter !== "all") && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg bg-[var(--blue-600)] text-white text-sm font-medium hover:bg-[var(--blue-700)] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((lead, index) => {
              const config = statusConfig[lead.status] || statusConfig.NEW;
              const StatusIcon = config.icon;
              const isExpanded = expandedId === lead.id;
              const nextStatus = getNextStatus(lead.status);
              const prevStatus = getPrevStatus(lead.status);
              const isLoading = loadingId === lead.id;

              return (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Lead Header Row */}
                  <div
                    onClick={() => toggleExpand(lead.id)}
                    className="p-4 sm:p-5 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      {/* Expand Toggle */}
                      <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--gray-100)] hover:bg-[var(--gray-200)] transition-colors shrink-0">
                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                          <ChevronRight className="w-4 h-4 text-[var(--gray-500)]" />
                        </motion.div>
                      </button>

                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${config.bg} ${config.border} border shrink-0`}>
                        <StatusIcon className={`w-3.5 h-3.5 ${config.color}`} />
                        <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>
                      </div>

                      {/* Name & Contact */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-[var(--gray-900)]">{lead.name}</h3>
                          <span className="text-xs text-[var(--gray-400)]">•</span>
                          <span className="text-xs text-[var(--gray-500)]">{lead.source}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="inline-flex items-center gap-1 text-xs text-[var(--gray-500)]">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-[var(--gray-500)]">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </span>
                        </div>
                      </div>

                      {/* Route Info */}
                      {(lead.fromCity || lead.toCity) && (
                        <div className="hidden md:flex items-center gap-2 text-xs text-[var(--gray-500)] shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{lead.fromCity || "—"}</span>
                          <ArrowRight className="w-3 h-3 text-[var(--gray-400)]" />
                          <span>{lead.toCity || "—"}</span>
                        </div>
                      )}

                      {/* Budget */}
                      {lead.budget && (
                        <div className="hidden lg:flex items-center gap-1 text-sm font-semibold text-[var(--gray-900)] shrink-0">
                          <DollarSign className="w-4 h-4 text-[var(--blue-600)]" />
                          {formatCurrency(lead.budget)}
                        </div>
                      )}

                      {/* Date */}
                      <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--gray-500)] shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(lead.createdAt)}
                      </div>

                      {/* Mobile Expand Chevron */}
                      <div className="sm:hidden ml-auto">
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                          <ChevronDown className="w-5 h-5 text-[var(--gray-400)]" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-[var(--gray-100)]"
                      >
                        <div className="p-4 sm:p-5">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column - Details */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold text-[var(--gray-900)] flex items-center gap-2">
                                <Eye className="w-4 h-4 text-[var(--blue-600)]" />
                                Lead Details
                              </h4>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <DetailItem icon={User} label="Name" value={lead.name} />
                                <DetailItem icon={Mail} label="Email" value={lead.email} />
                                <DetailItem icon={Phone} label="Phone" value={lead.phone} />
                                <DetailItem icon={Truck} label="Service Type" value={lead.serviceType || "—"} />
                                <DetailItem icon={MapPin} label="From City" value={lead.fromCity || "—"} />
                                <DetailItem icon={MapPin} label="To City" value={lead.toCity || "—"} />
                                <DetailItem icon={Calendar} label="Moving Date" value={lead.movingDate ? formatDate(lead.movingDate) : "—"} />
                                <DetailItem icon={DollarSign} label="Budget" value={formatCurrency(lead.budget)} />
                              </div>

                              {lead.fromAddress && (
                                <DetailItem icon={MapPin} label="From Address" value={lead.fromAddress} fullWidth />
                              )}
                              {lead.toAddress && (
                                <DetailItem icon={MapPin} label="To Address" value={lead.toAddress} fullWidth />
                              )}

                              {lead.message && (
                                <div className="bg-[var(--gray-50)] rounded-lg p-3 border border-[var(--gray-100)]">
                                  <p className="text-xs font-medium text-[var(--gray-500)] mb-1">Message</p>
                                  <p className="text-sm text-[var(--gray-700)] leading-relaxed">{lead.message}</p>
                                </div>
                              )}

                              <div className="flex items-center gap-4 text-xs text-[var(--gray-400)] pt-2">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Created: {formatDate(lead.createdAt)} at {formatTime(lead.createdAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <RefreshCw className="w-3 h-3" />
                                  Updated: {formatDate(lead.updatedAt)} at {formatTime(lead.updatedAt)}
                                </span>
                              </div>
                            </div>

                            {/* Right Column - Actions */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold text-[var(--gray-900)] flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-[var(--blue-600)]" />
                                Status Pipeline
                              </h4>

                              {/* Status Flow Visualization */}
                              <div className="flex items-center gap-1">
                                {statusFlow.map((status, idx) => {
                                  const sConfig = statusConfig[status];
                                  const isActive = statusFlow.indexOf(lead.status) >= idx;
                                  const isCurrent = lead.status === status;
                                  const SIcon = sConfig.icon;

                                  return (
                                    <div key={status} className="flex items-center">
                                      <div
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                          isCurrent
                                            ? `${sConfig.bg} ${sConfig.color} ${sConfig.border} border shadow-sm`
                                            : isActive
                                            ? `${sConfig.bg} ${sConfig.color} opacity-70`
                                            : "bg-[var(--gray-50)] text-[var(--gray-400)]"
                                        }`}
                                      >
                                        <SIcon className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">{sConfig.label}</span>
                                      </div>
                                      {idx < statusFlow.length - 1 && (
                                        <div className={`w-4 h-0.5 mx-1 ${isActive && statusFlow.indexOf(lead.status) > idx ? "bg-[var(--lime-400)]" : "bg-[var(--gray-200)]"}`} />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Quick Actions */}
                              <div className="space-y-3">
                                <p className="text-xs font-medium text-[var(--gray-500)] uppercase tracking-wider">Quick Actions</p>

                                <div className="flex flex-wrap gap-2">
                                  {nextStatus && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateStatus(lead.id, nextStatus);
                                      }}
                                      disabled={isLoading}
                                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--blue-600)] text-white text-sm font-medium hover:bg-[var(--blue-700)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <>
                                          <ArrowRight className="w-4 h-4" />
                                          Move to {statusConfig[nextStatus]?.label}
                                        </>
                                      )}
                                    </button>
                                  )}

                                  {prevStatus && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateStatus(lead.id, prevStatus);
                                      }}
                                      disabled={isLoading}
                                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--gray-200)] text-sm font-medium text-[var(--gray-700)] hover:bg-[var(--gray-50)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <ArrowLeft className="w-4 h-4" />
                                      Back to {statusConfig[prevStatus]?.label}
                                    </button>
                                  )}

                                  {lead.status !== "LOST" && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateStatus(lead.id, "LOST");
                                      }}
                                      disabled={isLoading}
                                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <Ban className="w-4 h-4" />
                                      Mark Lost
                                    </button>
                                  )}

                                  {lead.status === "LOST" && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateStatus(lead.id, "NEW");
                                      }}
                                      disabled={isLoading}
                                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--gray-200)] text-sm font-medium text-[var(--gray-700)] hover:bg-[var(--gray-50)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <RefreshCw className="w-4 h-4" />
                                      Reopen Lead
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Contact Actions */}
                              <div className="space-y-3">
                                <p className="text-xs font-medium text-[var(--gray-500)] uppercase tracking-wider">Contact</p>
                                <div className="flex flex-wrap gap-2">
                                  <a
                                    href={`tel:${lead.phone}`}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--lime-50)] border border-[var(--lime-200)] text-sm font-medium text-[var(--lime-800)] hover:bg-[var(--lime-100)] transition-colors"
                                  >
                                    <Phone className="w-4 h-4" />
                                    Call
                                  </a>
                                  <a
                                    href={`mailto:${lead.email}`}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--blue-50)] border border-[var(--blue-200)] text-sm font-medium text-[var(--blue-800)] hover:bg-[var(--blue-100)] transition-colors"
                                  >
                                    <Mail className="w-4 h-4" />
                                    Email
                                  </a>
                                  <a
                                    href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-50 border border-green-200 text-sm font-medium text-green-800 hover:bg-green-100 transition-colors"
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                    WhatsApp
                                  </a>
                                </div>
                              </div>

                              {/* Assigned User */}
                              {lead.assignedUser && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--gray-50)] border border-[var(--gray-100)]">
                                  <User className="w-4 h-4 text-[var(--gray-400)]" />
                                  <div>
                                    <p className="text-xs text-[var(--gray-500)]">Assigned to</p>
                                    <p className="text-sm font-medium text-[var(--gray-900)]">
                                      {lead.assignedUser.name || lead.assignedUser.email}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Detail Item Subcomponent ────────────────────────────────────────

function DetailItem({
  icon: Icon,
  label,
  value,
  fullWidth = false,
}: {
  icon: typeof User;
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={`flex items-start gap-2.5 ${fullWidth ? "col-span-full" : ""}`}>
      <div className="w-8 h-8 rounded-lg bg-[var(--gray-100)] flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-[var(--gray-500)]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[var(--gray-400)]">{label}</p>
        <p className="text-sm font-medium text-[var(--gray-900)] truncate">{value}</p>
      </div>
    </div>
  );
}