'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, Plus, Edit3, Trash2, CheckCircle, AlertCircle, FileText,
  Layout, Settings, X, Upload, Download, Filter, BarChart3, Users,
  Shield, Zap, Eye, Loader2, Globe, Save, Menu, ChevronDown, ChevronUp,
  Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';



import AIGeneratePanel from './ai-generate-panel';
import { SEOPromptOutput } from '../../../lib/seo-prompts';

// ── Types (untouched) ────────────────────────────────────────────────────────
interface SEOEntry {
  id: string;
  pageName: string;
  slug: string;
  url: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  seoScore: number;
  status: 'published' | 'draft';
  lastModified: string;
  indexable: boolean;
  createdAt?: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface Stats {
  avgScore: number;
  published: number;
  needsAttention: number;
  total: number;
  totalKeywords: number;
}

const canonicalUrl = [
  {pagename:"home",url:`${process.env.NEXT_PUBLIC_APP_URL}`},
 {pagename:"Residental Moving",url:`${process.env.NEXT_PUBLIC_APP_URL}/services/residental-moving`},
 {pagename:"Storage Solutions",url:`${process.env.NEXT_PUBLIC_APP_URL}/services/storage-solutions`},
 {pagename:"Packing Services",url:`${process.env.NEXT_PUBLIC_APP_URL}/services/packing-services`},
 {pagename:"Office Relocation",url:`${process.env.NEXT_PUBLIC_APP_URL}/services/office-relocation`},
 {pagename:"Long Distance Moves",url:`${process.env.NEXT_PUBLIC_APP_URL}/services/long-distance-moves`},
 {pagename:"Vehicle Shipping",url:`${process.env.NEXT_PUBLIC_APP_URL}/services/vehicle-shipping`},
 {pagename:"Cargo Van",url:`${process.env.NEXT_PUBLIC_APP_URL}/fleet/cargo-van`},
 {pagename:"Box Truck",url:`${process.env.NEXT_PUBLIC_APP_URL}/fleet/box-truck`},
 {pagename:"Bike Courier",url:`${process.env.NEXT_PUBLIC_APP_URL}/fleet/bike-courier`},
 {pagename:"Packer Mover",url:`${process.env.NEXT_PUBLIC_APP_URL}/fleet/packer-mover`},
 {pagename:"Blogs",url:`${process.env.NEXT_PUBLIC_APP_URL}/resources/blogs`},
 {pagename:"Customer Reviews",url:`${process.env.NEXT_PUBLIC_APP_URL}/resources/customer-reviews`},
 {pagename:"FAQ",url:`${process.env.NEXT_PUBLIC_APP_URL}/resources/faq`},
 {pagename:"Moving Checklist",url:`${process.env.NEXT_PUBLIC_APP_URL}/resources/moving-checklist`},

 {pagename:"About Us",url:`${process.env.NEXT_PUBLIC_APP_URL}/company/about-us`},
 {pagename:"careers",url:`${process.env.NEXT_PUBLIC_APP_URL}/company/careers`},
 {pagename:"Contact Us",url:`${process.env.NEXT_PUBLIC_APP_URL}/company/contact-us`},
 {pagename:"Gallery",url:`${process.env.NEXT_PUBLIC_APP_URL}/company/gallery`},
 {pagename:"Why Choose Us",url:`${process.env.NEXT_PUBLIC_APP_URL}/company/why-choose-us`},
 {pagename:"Get A Quote",url:`${process.env.NEXT_PUBLIC_APP_URL}/get-a-quote`},

]

// ── API Functions (untouched) ────────────────────────────────────────────────
const api = {
  async getEntries(status?: string, search?: string): Promise<{ entries: SEOEntry[]; stats: Stats }> {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);
    const res = await fetch(`/api/seo?${params}`);
    if (!res.ok) throw new Error('Failed to fetch entries');
    return res.json();
  },
  async getEntry(id: string): Promise<SEOEntry> {
    const res = await fetch(`/api/seo/${id}`);
    if (!res.ok) throw new Error('Failed to fetch entry');
    return res.json();
  },
  async createEntry(data: Partial<SEOEntry>): Promise<SEOEntry> {
    const res = await fetch('/api/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed to create entry'); }
    return res.json();
  },
  async updateEntry(id: string, data: Partial<SEOEntry>): Promise<SEOEntry> {
    const res = await fetch(`/api/seo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed to update entry'); }
    return res.json();
  },
  async deleteEntry(id: string): Promise<void> {
    const res = await fetch(`/api/seo/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete entry');
  },
  async exportData(): Promise<SEOEntry[]> {
    const res = await fetch('/api/seo/export');
    if (!res.ok) throw new Error('Failed to export data');
    return res.json();
  },
  async importData(data: SEOEntry[]): Promise<{ message: string; count: number }> {
    const res = await fetch('/api/seo/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to import data');
    return res.json();
  },
};

// ── Utility Functions (untouched) ────────────────────────────────────────────
const generateSlug = (name: string) =>
  name.toLowerCase()
  .trim()
  .replace(/[^\w\s/-]/g, "") // ✅ allow slash
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-");;

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  return 'Needs Work';
};

// ── SVG Icon components (untouched) ─────────────────────────────────────────
const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const TwitterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// ── Preview Panel (extracted to share between mobile & desktop) ──────────────
function PreviewPanel({
  formData,
  previewMode,
  setPreviewMode,
  calculatePreviewScore,
}: {
  formData: Partial<SEOEntry>;
  previewMode: 'google' | 'facebook' | 'twitter';
  setPreviewMode: (m: 'google' | 'facebook' | 'twitter') => void;
  calculatePreviewScore: (e: Partial<SEOEntry>) => number;
}) {
  const score = calculatePreviewScore(formData);
  return (
    <>
      <div>
        <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-3">Live Preview</h4>
        {/* Preview tabs */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {(['google', 'facebook', 'twitter'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setPreviewMode(mode)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                previewMode === mode
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-card-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)] border border-[var(--color-border)]'
              }`}
            >
              {mode === 'google' && <Search className="w-3 h-3" />}
              {mode === 'facebook' && <FacebookIcon className="w-3 h-3" />}
              {mode === 'twitter' && <TwitterIcon className="w-3 h-3" />}
              {mode}
            </button>
          ))}
        </div>

        {previewMode === 'google' && (
          <div className="bg-[var(--color-card-bg)] rounded-lg p-4 shadow-sm border border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-border-light)] flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 text-[var(--color-text-faint)]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[var(--color-text-primary)] font-medium">CreatikAI</p>
                <p className="text-xs text-green-700 truncate">{formData.canonicalUrl || 'https://creatikai.com'}{formData.url}</p>
              </div>
            </div>
            <h5 className="text-[#1a0dab] text-base font-medium mb-1 hover:underline cursor-pointer line-clamp-1">
              {formData.metaTitle || 'Page Title'}
            </h5>
            <p className="text-sm text-[#4d5156] line-clamp-2">
              {formData.metaDescription || 'Meta description will appear here...'}
            </p>
          </div>
        )}

        {previewMode === 'facebook' && (
          <div className="bg-[var(--color-card-bg)] rounded-lg overflow-hidden shadow-sm border border-[var(--color-border)]">
            <div className="aspect-[1.91/1] bg-[var(--color-border-light)] flex items-center justify-center">
              {formData.ogImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={formData.ogImage} alt="OG" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <FacebookIcon className="w-10 h-10 text-[var(--color-text-faint)] mx-auto mb-1" />
                  <p className="text-xs text-[var(--color-text-faint)]">No image selected</p>
                </div>
              )}
            </div>
            <div className="p-3 bg-[#f0f2f5]">
              <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">OmSaiPackersMovers.COM</p>
              <h5 className="text-sm font-semibold text-[var(--color-text-primary)] line-clamp-1 mb-1">
                {formData.ogTitle || formData.metaTitle || 'Page Title'}
              </h5>
              <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">
                {formData.ogDescription || formData.metaDescription || 'Description will appear here...'}
              </p>
            </div>
          </div>
        )}

        {previewMode === 'twitter' && (
          <div className="bg-[var(--color-card-bg)] rounded-lg overflow-hidden shadow-sm border border-[var(--color-border)]">
            <div className="aspect-[2/1] bg-[var(--color-border-light)] flex items-center justify-center">
              {formData.twitterImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={formData.twitterImage} alt="Twitter" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <TwitterIcon className="w-10 h-10 text-[var(--color-text-faint)] mx-auto mb-1" />
                  <p className="text-xs text-[var(--color-text-faint)]">No image selected</p>
                </div>
              )}
            </div>
            <div className="p-3">
              <h5 className="text-sm font-semibold text-[var(--color-text-primary)] line-clamp-1 mb-1">
                {formData.twitterTitle || formData.metaTitle || 'Page Title'}
              </h5>
              <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-2">
                {formData.twitterDescription || formData.metaDescription || 'Description will appear here...'}
              </p>
              <p className="text-xs text-[var(--color-text-faint)] flex items-center gap-1">
                <Globe className="w-3 h-3" /> creatikai.com
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SEO Score */}
      <div className="bg-[var(--color-card-bg)] rounded-xl p-4 border border-[var(--color-border-hover)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">SEO Score</span>
          <span className={`text-lg font-bold ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
            {score}%
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--color-border-light)] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-2">
          {score >= 80 ? 'Excellent! Your SEO is optimized.' :
           score >= 60 ? "Good, but there's room for improvement." :
           'Needs work. Check recommendations below.'}
        </p>
      </div>

      {/* Recommendations */}
      <div className="space-y-2">
        <h5 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Recommendations</h5>
        <div className="space-y-2">
          {(formData.metaTitle?.length || 0) < 50 && (
            <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Title is too short. Aim for 50-60 characters.</span>
            </div>
          )}
          {(formData.metaTitle?.length || 0) > 60 && (
            <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Title is too long. Keep it under 60 characters.</span>
            </div>
          )}
          {(formData.metaDescription?.length || 0) < 150 && (
            <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Description is too short. Aim for 150-160 characters.</span>
            </div>
          )}
          {(formData.metaDescription?.length || 0) > 160 && (
            <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Description is too long. Keep it under 160 characters.</span>
            </div>
          )}
          {!(formData.keywords || []).length && (
            <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Add keywords to improve search relevance.</span>
            </div>
          )}
          {(formData.metaTitle?.length || 0) >= 50 && (formData.metaTitle?.length || 0) <= 60 &&
           (formData.metaDescription?.length || 0) >= 150 && (formData.metaDescription?.length || 0) <= 160 &&
           (formData.keywords || []).length > 0 && (
            <div className="flex items-start gap-2 text-xs text-green-600 bg-green-50 p-2 rounded-lg">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>All basic SEO fields are properly optimized!</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

type HeaderProp = {
showlogout? : boolean;
}
// ── Main Component ────────────────────────────────────────────────────────────
export default function SEODashboard({showlogout = false}:HeaderProp) {
  const [entries, setEntries] = useState<SEOEntry[]>([]);
  const [stats, setStats] = useState<Stats>({ avgScore: 0, published: 0, needsAttention: 0, total: 0, totalKeywords: 0 });
 const [brokerCount, setBrokerCount] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<SEOEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeSidebarItem, setActiveSidebarItem] = useState('seo');
  const [previewMode, setPreviewMode] = useState<'google' | 'facebook' | 'twitter'>('google');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);
  // Responsive-only state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
const [keywordInput, setKeywordInput] = useState('');
  const [formData, setFormData] = useState<Partial<SEOEntry>>({});
  const [isDirty, setIsDirty] = useState(false);
  const router = useRouter();
   const handleLogout = () => {
    // Clear cookie
    document.cookie = 'seo-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/seo-login');
    router.refresh();
  };
  // Close mobile sidebar on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsMobileSidebarOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
const selectedLabel =
  canonicalUrl.find((v) => v.url === formData.canonicalUrl)?.pagename ||
  "Select Canonical URL";

  const handleSelect = (selectedUrl: string) => {
  handleInputChange("canonicalUrl", selectedUrl);

  try {
    const url = new URL(selectedUrl);

    const path = url.pathname; // "/resources/about"
    const slug = path.replace(/^\/+/, ""); // "resources/about"

    const pageName = path.split("/").filter(Boolean).pop() || "home";

    setFormData((prev) => ({
      ...prev,
      canonicalUrl: selectedUrl,
      pageName,
      slug: slug,
      url: slug,
    }));
  } catch (error) {
    console.error("Invalid URL");
  }

  setIsOpen(false);
};

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getEntries(activeTab, searchQuery);
      setEntries(data.entries);
      setStats(data.stats);
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchQuery]);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => {
    const t = setTimeout(() => loadData(), 300);
    return () => clearTimeout(t);
  }, [searchQuery, loadData]);

  const showNotification = (message: string, type: Notification['type'] = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const handleCreate = () => {
    setIsCreateMode(true);
    setFormData({ pageName:'', slug:'', url:'', metaTitle:'', metaDescription:'', keywords:[],
      canonicalUrl:'', ogTitle:'', ogDescription:'', ogImage:'', twitterTitle:'',
      twitterDescription:'', twitterImage:'', indexable: true, status: 'published' });
    setIsModalOpen(true);
    setIsDirty(false);
    setIsPreviewOpen(false);
  };

  const handleEdit = async (entry: SEOEntry) => {
    setIsCreateMode(false);
    setSelectedEntry(entry);
    setFormData({ ...entry });
    setIsModalOpen(true);
    setIsDirty(false);
    setIsPreviewOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SEO entry?')) return;
    try {
      await api.deleteEntry(id);
      showNotification('SEO entry deleted successfully');
      loadData();
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    }
  };

  const handleSave = async () => {
    if (!formData.pageName || !formData.metaTitle) {
      showNotification('Please fill in required fields', 'error');
      return;
    }
    setIsSaving(true);
    try {
      if (isCreateMode) {
        await api.createEntry({
          ...formData,
          slug: formData.slug || generateSlug(formData.pageName || ''),
          url: formData.url || `/${generateSlug(formData.pageName || '')}`,
        });
        showNotification('New SEO entry created successfully');
      } else {
        await api.updateEntry(selectedEntry!.id, formData);
        showNotification('SEO entry updated successfully');
      }
      setIsModalOpen(false);
      setIsDirty(false);
      loadData();
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof SEOEntry, value: unknown) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'pageName' && isCreateMode && typeof value === 'string') {
        updated.slug = generateSlug(value);
        updated.url = `/${generateSlug(value)}`;
      }
      return updated;
    });
    setIsDirty(true);
  };

const handleKeywordsChange = (value: string) => {
  setKeywordInput(value);

  const keywords = value
    .split(',')
    .map(k => k.trim())
    .filter(k => k);

  handleInputChange('keywords', keywords);
};

  const handleExport = async () => {
    try {
      const data = await api.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seo-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification('Data exported successfully');
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text()) as SEOEntry[];
      await api.importData(data);
      showNotification('Data imported successfully');
      loadData();
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    }
    e.target.value = '';
  };

  const loadBrokerStats = async () => {
  try {
    const res = await fetch("/api/brokers"); //  broker API
    const data = await res.json();

    setBrokerCount(data.length); // or data.total if you return it
  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  loadBrokerStats();
}, []);
  const calculatePreviewScore = (entry: Partial<SEOEntry>): number => {
    let score = 0;
    if (entry.metaTitle && entry.metaTitle.length >= 50 && entry.metaTitle.length <= 60) score += 25;
    else if (entry.metaTitle && entry.metaTitle.length > 0) score += 15;
    if (entry.metaDescription && entry.metaDescription.length >= 150 && entry.metaDescription.length <= 160) score += 25;
    else if (entry.metaDescription && entry.metaDescription.length > 0) score += 15;
    if (entry.keywords && entry.keywords.length > 0) score += 15;
    if (entry.ogTitle && entry.ogDescription) score += 15;
    if (entry.twitterTitle && entry.twitterDescription) score += 15;
    if (entry.metaTitle && entry.metaTitle.length > 70) score -= 10;
    if (entry.metaDescription && entry.metaDescription.length > 170) score -= 10;
    return Math.max(0, Math.min(100, score));
  };

  const navItems = [
    { id: 'dashboard', icon: Layout, label: 'Dashboard' },
    { id: 'seo',       icon: Search, label: 'SEO Manager', badge: stats.total },
    
    // { id: 'explore',       icon: Search, label: 'Broker Manager', badge: brokerCount },
    //  { id: 'properties',     icon: Users,  label: 'Property Manager' },
    // { id: 'requirement',     icon: Users,  label: 'Added Requirements' },
    // { id: 'joinNetwork',     icon: Users,  label: 'Broker Request Manager' },

    { id: 'settings',  icon: Settings, label: 'Settings' },
  ];

  const SidebarNav = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navItems.map(({ id, icon: Icon, label, badge }) => (
        <button
          key={id}
          onClick={() => { setActiveSidebarItem(id); onItemClick?.(); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            activeSidebarItem === id
              ? 'bg-[var(--color-badge-bg)] text-[var(--color-primary-hover)] shadow-sm border border-[var(--color-border-hover)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-section-alt)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span className="truncate">{label}</span>
          {badge !== undefined && (
            <span className="ml-auto bg-[var(--color-primary)] text-white text-xs px-2 py-0.5 rounded-full shrink-0">
              {badge}
            </span>
          )}
        </button>
      ))}
    </>
  );

  const AdminBadge = () => (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--color-badge-bg)] to-[var(--color-card-bg)] border border-[var(--color-border-hover)]">
      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0">
        <Shield className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-primary-dark)] truncate">Admin User</p>
        <p className="text-xs text-[var(--color-primary)] truncate">admin@creatikai.com</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-section-alt)]  flex">

      {/* Mobile sidebar overlay */}
    {showlogout &&  isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--color-text-primary)]/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
        {showlogout && (
      <aside className={`fixed top-0 left-0 h-full w-72 bg-[var(--color-card-bg)] border-r border-[var(--color-border-hover)] z-50 flex flex-col
        transform transition-transform duration-300 ease-in-out lg:hidden
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-5 border-b border-[var(--color-border-hover)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
           <img src="/creatikai-logo.png"/>
            <div>
              <h1 className="font-bold text-lg text-[var(--color-primary-dark)]">CreatikAi</h1>
              <p className="text-xs text-[var(--color-primary)]">Admin Dashboard</p>
            </div>
          </div>
          <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 text-[var(--color-text-faint)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <SidebarNav onItemClick={() => setIsMobileSidebarOpen(false)} />
        </nav>
        <div className="p-4 border-t border-[var(--color-border-hover)] shrink-0">
          <AdminBadge />
        </div>
      </aside>)}

      {/* Desktop sidebar */}
     {showlogout && (
         <aside className="w-64 bg-[var(--color-card-bg)] border-r border-[var(--color-border-hover)] fixed h-full z-10 hidden lg:flex lg:flex-col">
        <div className="p-6 border-b border-[var(--color-border-hover)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-glow-strong)]">
               <img src="/creatikai-logo.png"/>
            </div>
            <div>
              <h1 className="font-bold text-xl text-[var(--color-primary-dark)]">CreatikAI</h1>
              <p className="text-xs text-[var(--color-primary)]">Admin Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <SidebarNav />
        </nav>
        <div className="p-4 border-t border-[var(--color-border-hover)] shrink-0">
          <AdminBadge />
        </div>
      </aside>)}

      {/* Main */}
     <main className={`flex-1  min-w-0 
      ${showlogout ? "lg:ml-64" : "lg:ml-0"}
     `}>
       {activeSidebarItem === "seo" &&  <div className=" ">
        {/* Header */}
        <header className="bg-[var(--color-card-bg)] rounded-2xl border-b border-[var(--color-border-hover)] ">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)] rounded-lg transition-colors lg:hidden shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-[var(--color-text-primary)] leading-tight truncate">SEO Manager</h2>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] hidden sm:block mt-0.5">Manage meta tags and optimize your site for search engines</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {showlogout &&  <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-secondary)] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>}
              <button onClick={handleExport} className="p-2 text-[var(--color-text-faint)] hover:text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border-light)] transition-colors hidden sm:flex" title="Export">
                <Download className="w-5 h-5" />
              </button>
              <label className="p-2 text-[var(--color-text-faint)] hover:text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border-light)] transition-colors cursor-pointer hidden sm:flex" title="Import">
                <Upload className="w-5 h-5" />
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <button
                onClick={handleCreate}
                disabled={isLoading}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm shadow-lg shadow-[var(--color-glow-strong)] transition-all hover:shadow-xl active:scale-95"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
                <span className="hidden sm:inline">Add Page SEO</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              label: 'Avg SEO Score', value: `${stats.avgScore}%`,
              icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)]" />,
              iconBg: 'bg-gradient-to-br from-[var(--color-border-hover)] to-[var(--color-badge-bg)]',
              sub: <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getScoreColor(stats.avgScore)}`}>{getScoreLabel(stats.avgScore)}</span>,
              valueClass: 'text-[var(--color-primary-dark)]',
            },
            {
              label: 'Published', value: stats.published,
              icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
              iconBg: 'bg-green-50',
              sub: <p className="text-xs text-[var(--color-text-muted)]">of {stats.total} total pages</p>,
              valueClass: 'text-[var(--color-primary-dark)]',
            },
            {
              label: 'Needs Attention', value: stats.needsAttention,
              icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />,
              iconBg: 'bg-red-50',
              sub: <p className="text-xs text-[var(--color-text-muted)] hidden sm:block">Pages with SEO score &lt; 60</p>,
              valueClass: 'text-red-600',
            },
            {
              label: 'Total Keywords', value: stats.totalKeywords,
              icon: <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-text-secondary)]" />,
              iconBg: 'bg-[var(--color-border-light)]',
              sub: <p className="text-xs text-[var(--color-text-muted)]">Across all pages</p>,
              valueClass: 'text-[var(--color-primary-dark)]',
            },
          ].map(card => (
            <div key={card.label} className="bg-[var(--color-card-bg)] rounded-2xl p-4 sm:p-5 border border-[var(--color-border-hover)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-[var(--color-text-muted)] truncate">{card.label}</p>
                  <p className={`text-2xl sm:text-3xl font-bold mt-1 ${card.valueClass}`}>{card.value}</p>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-2 sm:mt-3">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Table area */}
        <div className="px-4 sm:px-6 pb-6">
          <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border-hover)] shadow-sm overflow-hidden">

            {/* Toolbar */}
            <div className="p-3 sm:p-4 border-b border-[var(--color-border-hover)] space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 bg-[var(--color-border-light)] p-1 rounded-xl">
                  {(['all', 'published', 'draft'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      disabled={isLoading}
                      className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-all disabled:opacity-50 ${
                        activeTab === tab ? 'bg-[var(--color-card-bg)] text-[var(--color-primary-hover)] shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex flex-row gap-3">
                 <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)]" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:max-w-xs bg-[var(--color-section-alt)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                />
              </div>
                <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)] rounded-xl transition-colors shrink-0">
                  <Filter className="min-w-4 min-h-4 sm:min-w-5 sm:min-h-5" />
                </button>
                </div>
              </div>
             
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-section-alt)] border-b border-[var(--color-border-hover)]">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Page</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">SEO Score</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hidden md:table-cell">Last Modified</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-light)]">
                  {isLoading ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--color-primary)]" />
                      <p className="text-[var(--color-text-muted)] mt-2">Loading...</p>
                    </td></tr>
                  ) : entries.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-border-light)] flex items-center justify-center">
                        <Search className="w-8 h-8 text-[var(--color-text-faint)]" />
                      </div>
                      <p className="text-[var(--color-text-muted)] font-medium">No pages found</p>
                      <p className="text-sm text-[var(--color-text-faint)] mt-1">Try adjusting your search or filters</p>
                    </td></tr>
                  ) : entries.map(entry => (
                    <tr key={entry.id} className="hover:bg-[var(--color-section-alt)] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-badge-bg)] flex items-center justify-center border border-[var(--color-border-hover)] shrink-0">
                            <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-hover)] transition-colors truncate">{entry.pageName}</p>
                            <p className="text-sm text-[var(--color-text-muted)] truncate">{entry.url}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${entry.seoScore >= 80 ? 'bg-green-500' : entry.seoScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${entry.seoScore}%` }} />
                          </div>
                          <span className={`text-sm font-medium ${entry.seoScore >= 80 ? 'text-green-600' : entry.seoScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{entry.seoScore}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${entry.status === 'published' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${entry.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}`} />
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--color-text-muted)] hidden md:table-cell">{new Date(entry.lastModified).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(entry)} className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-badge-bg)] rounded-lg transition-all">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(entry.id)} className="p-2 text-[var(--color-text-secondary)] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="sm:hidden">
              {isLoading ? (
                <div className="py-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--color-primary)]" />
                  <p className="text-[var(--color-text-muted)] mt-2 text-sm">Loading...</p>
                </div>
              ) : entries.length === 0 ? (
                <div className="py-12 text-center px-6">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[var(--color-border-light)] flex items-center justify-center">
                    <Search className="w-7 h-7 text-[var(--color-text-faint)]" />
                  </div>
                  <p className="text-[var(--color-text-muted)] font-medium text-sm">No pages found</p>
                  <p className="text-xs text-[var(--color-text-faint)] mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border-light)]">
                  {entries.map(entry => (
                    <div key={entry.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[var(--color-badge-bg)] border border-[var(--color-border-hover)] flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-4 h-4 text-[var(--color-primary)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-medium text-[var(--color-text-primary)] text-sm truncate">{entry.pageName}</p>
                              <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">{entry.url}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button onClick={() => handleEdit(entry)} className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-badge-bg)] rounded-lg transition-all">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(entry.id)} className="p-1.5 text-[var(--color-text-muted)] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2.5 flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-1.5">
                              <div className="w-12 h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${entry.seoScore >= 80 ? 'bg-green-500' : entry.seoScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${entry.seoScore}%` }} />
                              </div>
                              <span className={`text-xs font-semibold ${entry.seoScore >= 80 ? 'text-green-600' : entry.seoScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{entry.seoScore}</span>
                            </div>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${entry.status === 'published' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${entry.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}`} />
                              {entry.status}
                            </span>
                            <span className="text-xs text-[var(--color-text-faint)] ml-auto">{new Date(entry.lastModified).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
        </div>}
        {/* {activeSidebarItem === "explore" && <BrokersPage/>}
        {activeSidebarItem === "requirement" && <RequirementsPage/>}
        {activeSidebarItem === "properties" && <AdminPropertiesPage/>}
        {activeSidebarItem === "joinNetwork" && <JoinBrokerApplicationsAdmin/>} */}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-[var(--color-text-primary)]/50 backdrop-blur-sm">
          <div className="relative bg-[var(--color-card-bg)] w-full sm:max-w-6xl rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">

            {/* Drag pill – mobile */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-[var(--color-text-faint)] rounded-full sm:hidden" />

            {/* Modal header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--color-border-hover)] flex items-center justify-between bg-gradient-to-r from-[var(--color-card-bg)] to-[var(--color-badge-bg)] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg font-bold text-[var(--color-text-primary)] truncate">
                    {isCreateMode ? 'Create New SEO Entry' : 'Edit SEO Settings'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] truncate">{formData.pageName || 'Untitled Page'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {isDirty && (
                  <>
                    <span className="hidden sm:flex text-sm text-amber-600 items-center gap-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      Unsaved changes
                    </span>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse sm:hidden" />
                  </>
                )}
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-[var(--color-text-faint)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)] rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-3">

                {/* Form */}
                <div className="lg:col-span-2 p-4 sm:p-6 space-y-5 sm:space-y-6 lg:border-r border-[var(--color-border-hover)]">

                 
                  {/* Basic Info */}
<div className="space-y-4">
  <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-2">
    <Globe className="w-4 h-4 text-[var(--color-primary)]" /> Basic Information
  </h4>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
        Page Name <span className="text-red-500">*</span>
      </label>
      <input 
        type="text" 
        value={formData.pageName || ''} 
        onChange={(e) => handleInputChange('pageName', e.target.value)}
        className="w-full px-4 py-2.5 text-(--color-text-secondary) bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
        placeholder="e.g., Home, About Us" 
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Slug</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] text-sm">/</span>
        <input 
          type="text" 
          value={formData.slug || ''} 
          onChange={(e) => handleInputChange('slug', e.target.value)}
          className={`w-full pl-7 pr-4 py-2.5 border text-(--color-text-secondary) rounded-xl text-sm ${isCreateMode ? 'bg-[var(--color-card-bg)] focus:ring-2 focus:ring-[var(--color-primary)]' : 'bg-[var(--color-section-alt)] border-[var(--color-border)] text-[var(--color-text-secondary)]'}`}
          readOnly={!isCreateMode} 
        />
      </div>
    </div>
  </div>
  
  <div>
    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Canonical URL</label>
    <div className="relative" ref={dropdownRef}>
  {/* Trigger */}
  <button
    type="button"
    onClick={() => setIsOpen((prev) => !prev)}
    className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-xl text-sm text-left transition-all duration-150
      ${isOpen
        ? "border-blue-500 ring-2 ring-blue-100"
        : "border-slate-200 hover:border-blue-300"
      }
      ${!formData.canonicalUrl ? "text-slate-400" : "text-slate-700"}
    `}
  >
    <span className="truncate">{selectedLabel}</span>
    <ChevronDown
      size={16}
      className={`ml-2 shrink-0 text-blue-500 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {/* Dropdown panel */}
  {isOpen && (
    <div
      className="absolute z-20 mt-2 w-full bg-white border border-blue-100 rounded-xl shadow-lg shadow-blue-900/5 py-1.5 h-64 overflow-y-auto
                 animate-in fade-in slide-in-from-top-1 duration-150"
    >
      {canonicalUrl.length === 0 && (
        <div className="px-4 py-2.5 text-sm text-slate-400">No options available</div>
      )}

      {canonicalUrl.map((value, index) => {
        const isSelected = formData.canonicalUrl === value.url;
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleSelect(value.url)}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors
              ${isSelected
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-slate-700 hover:bg-blue-50/60"
              }
            `}
          >
            <span className="truncate">{value.pagename}</span>
            {isSelected && <Check size={15} className="text-blue-600 shrink-0 ml-2" />}
          </button>
        );
      })}
    </div>
  )}
</div>
  </div>

  {/* === AI GENERATE PANEL — INSERTED HERE === */}
  <AIGeneratePanel
    pageName={formData.pageName || ''}
    canonicalUrl={formData.canonicalUrl || 'https://creatikai.com'}
    onGenerated={(data: SEOPromptOutput) => {
      setFormData(prev => ({
        ...prev,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        ogTitle: data.ogTitle,
        ogDescription: data.ogDescription,
        ogImage: data.ogImage,
        twitterTitle: data.twitterTitle,
        twitterDescription: data.twitterDescription,
        twitterImage: data.twitterImage,
      }));
      setKeywordInput(data.keywords.join(', '));
      setIsDirty(true);
      showNotification('AI generated SEO metadata!', 'success');
    }}
  />
  {/* === END AI PANEL === */}
</div>

                  {/* Meta Tags */}
                  <div className="space-y-4 pt-4 border-t border-[var(--color-border-light)]">
                    <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-2">
                      <Search className="w-4 h-4 text-[var(--color-primary)]" /> Meta Tags
                    </h4>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Meta Title <span className="text-red-500">*</span></label>
                        <span className={`text-xs font-medium ${(formData.metaTitle?.length || 0) >= 50 && (formData.metaTitle?.length || 0) <= 60 ? 'text-green-600' : 'text-amber-600'}`}>{formData.metaTitle?.length || 0}/60</span>
                      </div>
                      <input type="text" value={formData.metaTitle || ''} onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                        className="w-full px-4 py-2.5 text-(--color-text-secondary) bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                        placeholder="Page title for search results" />
                      <p className="text-xs text-[var(--color-text-muted)] mt-1.5">Recommended: 50-60 characters for optimal display</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Meta Description <span className="text-red-500">*</span></label>
                        <span className={`text-xs font-medium ${(formData.metaDescription?.length || 0) >= 150 && (formData.metaDescription?.length || 0) <= 160 ? 'text-green-600' : 'text-amber-600'}`}>{formData.metaDescription?.length || 0}/160</span>
                      </div>
                      <textarea value={formData.metaDescription || ''} onChange={(e) => handleInputChange('metaDescription', e.target.value)} rows={3}
                        className="w-full px-4 py-2.5 bg-[var(--color-card-bg)] text-(--color-text-secondary)  border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all resize-none"
                        placeholder="Brief description of the page content" />
                      <p className="text-xs text-[var(--color-text-muted)] mt-1.5">Recommended: 150-160 characters for optimal display</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Keywords</label>
                      <input type="text" value={keywordInput} onChange={(e) => handleKeywordsChange(e.target.value)}
                        className="w-full px-4 py-2.5 text-(--color-text-secondary) bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                        placeholder="real estate, property, AI, automation" />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(formData.keywords || []).map((keyword, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-[var(--color-badge-bg)] text-[var(--color-primary-hover)] text-xs rounded-lg border border-[var(--color-border-hover)]">{keyword}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Open Graph */}
                  <div className="space-y-4 pt-4 border-t border-[var(--color-border-light)]">
                    <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-2">
                      <FacebookIcon className="w-4 h-4 text-[var(--color-primary)]" /> Open Graph (Facebook)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">OG Title</label>
                        <input type="text" value={formData.ogTitle || ''} onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                          className="w-full px-4 py-2.5 text-(--color-text-secondary) bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                          placeholder="Title for social sharing" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">OG Image URL</label>
                        <div className="relative">
                          <input type="text" value={formData.ogImage || ''} onChange={(e) => handleInputChange('ogImage', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-(--color-text-secondary) bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                            placeholder="https://..." />
                          <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)]" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">OG Description</label>
                      <textarea value={formData.ogDescription || ''} onChange={(e) => handleInputChange('ogDescription', e.target.value)} rows={2}
                        className="w-full px-4 py-2.5 text-(--color-text-secondary) bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all resize-none"
                        placeholder="Description for Facebook sharing" />
                    </div>
                  </div>

                  {/* Twitter Card */}
                  <div className="space-y-4 pt-4 border-t border-[var(--color-border-light)]">
                    <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-2">
                      <TwitterIcon className="w-4 h-4 text-[var(--color-primary)]" /> Twitter Card
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Twitter Title</label>
                        <input type="text" value={formData.twitterTitle || ''} onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                          className="w-full px-4 py-2.5 text-(--color-text-secondary) bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                          placeholder="Title for Twitter cards" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Twitter Image URL</label>
                        <div className="relative">
                          <input type="text" value={formData.twitterImage || ''} onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-(--color-text-secondary) bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                            placeholder="https://..." />
                          <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)]" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Twitter Description</label>
                      <textarea value={formData.twitterDescription || ''} onChange={(e) => handleInputChange('twitterDescription', e.target.value)} rows={2}
                        className="w-full px-4 py-2.5 text-(--color-text-secondary) bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all resize-none"
                        placeholder="Description for Twitter cards" />
                    </div>
                  </div>

                  {/* Page Settings */}
                  <div className="space-y-4 pt-4 border-t border-[var(--color-border-light)]">
                    <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[var(--color-primary)]" /> Page Settings
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.indexable} onChange={(e) => handleInputChange('indexable', e.target.checked)}
                          className="w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                        <span className="text-sm text-[var(--color-text-secondary)]">Allow search engine indexing</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.status === 'draft'} onChange={(e) => handleInputChange('status', e.target.checked ? 'draft' : 'published')}
                          className="w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                        <span className="text-sm text-[var(--color-text-secondary)]">draft</span>
                      </label>
                    </div>
                  </div>

                  {/* Preview toggle – mobile only, inside form */}
                  <div className="pt-2 lg:hidden border-t border-[var(--color-border-light)]">
                    <button
                      onClick={() => setIsPreviewOpen(v => !v)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-section-alt)] border border-[var(--color-border)] rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[var(--color-primary)]" />
                        Live Preview &amp; SEO Score
                      </span>
                      {isPreviewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {isPreviewOpen && (
                      <div className="mt-3 bg-[var(--color-section-alt)] rounded-2xl border border-[var(--color-border)] p-4 space-y-5">
                        <PreviewPanel formData={formData} previewMode={previewMode} setPreviewMode={setPreviewMode} calculatePreviewScore={calculatePreviewScore} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview sidebar – desktop only */}
                <div className="hidden lg:block bg-[var(--color-section-alt)] p-6 space-y-6">
                  <PreviewPanel formData={formData} previewMode={previewMode} setPreviewMode={setPreviewMode} calculatePreviewScore={calculatePreviewScore} />
                </div>

              </div>
            </div>

            {/* Modal footer */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[var(--color-border-hover)] bg-[var(--color-section-alt)] flex items-center justify-between gap-3 shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm text-[var(--color-text-secondary)] font-medium hover:text-[var(--color-text-primary)] transition-colors">
                Cancel
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={() => showNotification('Draft saved automatically', 'info')}
                  className="hidden sm:block px-5 py-2.5 text-sm text-[var(--color-primary-hover)] font-medium hover:bg-[var(--color-badge-bg)] rounded-xl transition-all">
                  Save as Draft
                </button>
                <button onClick={handleSave} disabled={isSaving}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl shadow-lg shadow-[var(--color-glow-strong)] transition-all hover:shadow-xl active:scale-95">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isCreateMode ? 'Create Entry' : 'Save Changes'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 space-y-2 max-w-xs w-full pointer-events-none">
        {notifications.map(notification => (
          <div key={notification.id} className={`pointer-events-auto flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl shadow-lg transition-all text-sm ${
            notification.type === 'success' ? 'bg-green-600 text-white' :
            notification.type === 'error' ? 'bg-red-600 text-white' :
            'bg-[var(--color-primary)] text-white'
          }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0" />}
            {notification.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
