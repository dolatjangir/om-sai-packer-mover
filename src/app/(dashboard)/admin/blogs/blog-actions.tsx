
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DeleteDialog from '@/components/blog-delete-dialog';



export function BlogActions({ blogId, slug }: { blogId: string; slug: string }) {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = async () => {
    const res = await fetch(`/api/blogs/${blogId}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
      setShowDelete(false);
    }
  };

  return (
    <>
   
      <div className="flex items-center gap-1">
        <Link
          href={`/blog/${slug}`}
          target="_blank"
          className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-icon-bg-1)] transition-all"
          title="Preview"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </Link>
        <Link
          href={`/admin-dashboard/blogs/${blogId}`}
          className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-icon-bg-1)] transition-all"
          title="Edit"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </Link>
        <button
          onClick={() => setShowDelete(true)}
          className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 transition-all"
          title="Delete"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      <DeleteDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
     
    </>
  );
}