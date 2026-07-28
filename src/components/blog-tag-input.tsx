
'use client';

import { useState, useRef } from 'react';

interface TagInputProps {
  value?: string;
  onChange: (tags: string) => void;
}

export default function TagInput({ value, onChange }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(value ? value.split(',').filter(Boolean) : []);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      onChange(newTags.join(','));
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((t) => t !== tagToRemove);
    setTags(newTags);
    onChange(newTags.join(','));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div
      className="min-h-[44px] flex flex-wrap gap-2 p-2 border border-[#e2e8f0] rounded-xl bg-white focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#dbeafe] transition-all cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eff6ff] border border-[#dbeafe] text-[#1d4ed8] text-sm font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(tag);
            }}
            className="hover:text-[#1e40af] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? 'Add tags...' : ''}
        className="flex-1 min-w-[80px] outline-none text-sm text-[#0f172a] placeholder:text-[#94a3b8] bg-transparent"
      />
    </div>
  );
}