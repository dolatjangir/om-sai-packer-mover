
'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/uploadblogImage', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setPreview(data.url);
        onChange(data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-[#e2e8f0] bg-[#f8fafc]">
          <img
            src={preview}
            alt="Featured"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-[#0f172a] rounded-lg text-sm font-medium hover:bg-[#f8fafc] transition-colors"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => {
                setPreview('');
                onChange('');
              }}
              className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="w-full h-48 rounded-xl border-2 border-dashed border-[#e2e8f0] hover:border-[#2563eb] hover:bg-[#eff6ff] transition-all flex flex-col items-center justify-center gap-2 text-[#64748b] hover:text-[#2563eb]"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#2563eb] border-t-transparent" />
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-sm font-medium">Click to upload featured image</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}