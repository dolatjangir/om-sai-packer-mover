'use client';

import React, { useState } from 'react';
import { Zap, Loader2, Sparkles } from 'lucide-react';

import { useSEOAI } from '../../../hooks/use-seo-ai';
import { SEOPromptOutput } from '../../../lib/seo-prompts';
interface AIGeneratePanelProps {
  pageName: string;
  canonicalUrl: string;
  onGenerated: (data: SEOPromptOutput) => void;
}

export default function AIGeneratePanel({ pageName, canonicalUrl, onGenerated }: AIGeneratePanelProps) {
  const [content, setContent] = useState('');
  const { generate, isGenerating, error } = useSEOAI();

  const handleGenerate = async () => {
    if (!content.trim()) return;

    const result = await generate({
      pageName,
      canonicalUrl,
      pageContent: content,
    });

    if (result) {
      onGenerated(result);
    }
  };

  const isReady = pageName.trim().length > 0 && content.trim().length > 50;

  return (
    <div className="rounded-2xl border border-[var(--color-border-hover)] bg-gradient-to-br from-violet-50/50 to-[var(--color-badge-bg)] p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-violet-600" />
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">AI SEO Generator</h4>
      </div>

      <div>
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
          Paste your page content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none"
          placeholder="Paste the full page content here. The AI will analyze it to generate all SEO fields automatically..."
        />
        <p className="text-xs text-[var(--color-text-muted)] mt-1.5">
          {content.length} characters · Minimum 50 recommended
        </p>
      </div>

      {error && (
        <div className="text-xs text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={!isReady || isGenerating}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r  from-[var(--color-primary)] to-violet-600 hover:from-violet-700 hover:to-[var(--color-primary-hover)] cursor-pointer
         disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl shadow-lg transition-all active:scale-95"
      > 
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            AI is writing your SEO...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            Generate SEO with AI
          </>
        )}
      </button>
    </div>
  );
}