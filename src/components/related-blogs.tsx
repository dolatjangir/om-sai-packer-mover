// components/related-blogs.tsx
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImg: string | null;
  tags: string | null;
  createdAt: Date;
}

interface RelatedBlogsProps {
  blogs: Blog[];
  title?: string;
}

export default function RelatedBlogs({ blogs, title = 'Latest Insights' }: RelatedBlogsProps) {
  if (blogs.length === 0) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <section className="py-20 lg:py-28 bg-[var(--color-section-alt)] border-t border-[var(--color-border)]">
      <div className="max-w-[1280px] mx-auto px-[var(--container-padding)]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] border border-[var(--color-badge-border)] text-[var(--color-badge-text)] text-xs font-semibold tracking-wide uppercase mb-4">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              From the Blog
            </span>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] leading-tight">
              {title}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-icon-bg-1)] transition-all duration-300 shrink-0"
          >
            View all articles
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-[var(--shadow-xl)] hover:border-[var(--color-border-hover)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-section-alt)]">
                {blog.featuredImg ? (
                  <>
                    <img
                      src={blog.featuredImg}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="w-full h-full bg-[var(--color-icon-bg-1)] flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Tags overlay */}
                {blog.tags && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    {blog.tags.split(',').slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[var(--color-text-secondary)] text-[11px] font-semibold uppercase tracking-wider shadow-sm"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 mb-3 text-[var(--color-text-faint)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-xs font-medium">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>

                <h3 className="font-bold text-[var(--color-text-primary)] text-lg leading-snug mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-200 line-clamp-2">
                  {blog.title}
                </h3>

                {blog.excerpt && (
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-4 flex-1">
                    {blog.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-semibold text-sm mt-auto pt-4 border-t border-[var(--color-border-light)] group-hover:gap-3 transition-all duration-300">
                  Read article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-icon-bg-1)] transition-all duration-300"
          >
            View all articles
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
















