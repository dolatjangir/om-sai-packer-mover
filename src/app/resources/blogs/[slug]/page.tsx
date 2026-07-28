// app/blog/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '../../../../../lib/prisma';



export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) return { title: 'Blog Not Found' };

    return {
      title: blog.title,
      description: blog.excerpt || blog.title,
    };
  } catch {
    return { title: 'Blog' };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let blog;

  try {
    blog = await prisma.blog.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error('Prisma error:', error);
    notFound();
  }

  if (!blog || !blog.isPublished) {
    notFound();
  }

  // Fetch other blogs for sidebar (latest news)
  let otherBlogs: any[] = [];
  try {
    otherBlogs = await prisma.blog.findMany({
      where: {
        isPublished: true,
        NOT: { id: blog.id },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        slug: true,
        featuredImg: true,
        createdAt: true,
      },
    });
  } catch (e) {
    console.error('Failed to fetch other blogs:', e);
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[var(--color-section-alt)]">
      <div className="max-w-[1400px] mx-auto px-[var(--container-padding)] py-12 lg:py-20">
        
        {/* Back Link */}
        <div className="mt-12 pb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to all blogs
          </Link>
        </div>

        {/* Main Layout: 70 / 30 Split */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 h-[calc(100vh-140px)]">
          
          {/* LEFT COLUMN — 70% Blog Article (UNCHANGED) */}
          <article className="w-full lg:w-[70%] h-full pr-4 overflow-y-auto hide-scrollbar">
            <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
              
              {/* Featured Image — Edge to Edge */}
              {blog.featuredImg && (
                <div className="w-full aspect-[21/9] overflow-hidden bg-[var(--color-section-alt)]">
                  <img
                    src={blog.featuredImg}
                    alt={blog.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Article Body */}
              <div className="p-8 lg:p-12">
                {/* Header */}
                <header className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] border border-[var(--color-badge-border)] text-[var(--color-badge-text)] text-xs font-semibold uppercase tracking-wider">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      {blog.pageName}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-text-faint)]" />
                    <span className="text-sm text-[var(--color-text-faint)] font-medium">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>

                  <h1 className="text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-[var(--color-text-primary)] leading-[1.15] mb-6">
                    {blog.title}
                  </h1>

                  {blog.excerpt && (
                    <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                      {blog.excerpt}
                    </p>
                  )}
                </header>

                {/* Divider */}
                <div className="w-full h-px bg-[var(--color-border)] mb-10" />

                {/* Prose Content */}
                <div
                  className="prose prose-lg max-w-none 
                    prose-headings:text-[var(--color-text-primary)] 
                    prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-[var(--color-text-secondary)] 
                    prose-p:leading-[1.8] prose-p:mb-6
                    prose-a:text-[var(--color-primary)] 
                    prose-a:no-underline 
                    hover:prose-a:underline 
                    prose-a:font-medium
                    prose-strong:text-[var(--color-text-primary)] 
                    prose-strong:font-semibold
                    prose-blockquote:border-l-4 
                    prose-blockquote:border-[var(--color-primary)] 
                    prose-blockquote:bg-[var(--color-section-alt)] 
                    prose-blockquote:py-5 
                    prose-blockquote:px-6 
                    prose-blockquote:rounded-r-xl 
                    prose-blockquote:not-italic 
                    prose-blockquote:text-[var(--color-text-secondary)]
                    prose-blockquote:font-normal
                    prose-code:text-[var(--color-primary)] 
                    prose-code:bg-[var(--color-badge-bg)] 
                    prose-code:px-1.5 
                    prose-code:py-0.5 
                    prose-code:rounded 
                    prose-code:text-sm 
                    prose-code:font-medium
                    prose-pre:bg-[var(--color-section-alt)] 
                    prose-pre:border 
                    prose-pre:border-[var(--color-border)] 
                    prose-pre:rounded-xl 
                    prose-pre:p-5
                    prose-pre:shadow-sm
                    prose-img:rounded-xl 
                    prose-img:border 
                    prose-img:border-[var(--color-border)] 
                    prose-img:shadow-sm
                    prose-ul:my-6 
                    prose-li:marker:text-[var(--color-primary)]
                    prose-li:mb-2
                    prose-table:border-collapse
                    prose-th:bg-[var(--color-section-alt)]
                    prose-th:p-3
                    prose-th:text-left
                    prose-th:text-sm
                    prose-th:font-semibold
                    prose-th:text-[var(--color-text-primary)]
                    prose-th:border
                    prose-th:border-[var(--color-border)]
                    prose-td:p-3
                    prose-td:text-sm
                    prose-td:text-[var(--color-text-secondary)]
                    prose-td:border
                    prose-td:border-[var(--color-border)]
                    prose-tr:nth-child(even):bg-[var(--color-section-alt)]"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>
          </article>

          {/* RIGHT COLUMN — 30% Sidebar */}
          <aside className="w-full lg:w-[30%] h-full shrink-0">
            <div className="flex flex-col gap-5 h-full">
              
              {/* NEWS SECTION — Scrollable, fills available space */}
              <div className="flex-1 min-h-0 bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-section-alt)] shrink-0 flex items-center justify-between">
                  <h3 className="font-bold text-[var(--color-text-primary)] text-sm flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    Latest News
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-faint)] font-semibold">Live</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3">
                  {otherBlogs.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {otherBlogs.map((b) => (
                        <Link
                          key={b.id}
                          href={`/blog/${b.slug}`}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--color-section-alt)] transition-all duration-200 group"
                        >
                          {b.featuredImg ? (
                            <img
                              src={b.featuredImg}
                              alt={b.title}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[var(--color-border)]"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-[var(--color-icon-bg-1)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                              {b.title}
                            </h4>
                            <span className="text-[11px] text-[var(--color-text-faint)] mt-0.5 block">
                              {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(b.createdAt))}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-icon-bg-1)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)] font-medium">No news yet</p>
                      <p className="text-xs text-[var(--color-text-faint)] mt-0.5">Check back later</p>
                    </div>
                  )}
                </div>
              </div>

              {/* TAGS SECTION — Auto height, no scroll, grows with content */}
              <div className="shrink-0 bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                <div className="px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-section-alt)]">
                  <h3 className="font-bold text-[var(--color-text-primary)] text-sm flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                    Tags
                  </h3>
                </div>
                <div className="p-5">
                  {blog.tags ? (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.split(',').map((tag:any) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[var(--color-badge-bg)] border border-[var(--color-badge-border)] text-[var(--color-badge-text)] text-xs font-semibold hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200 cursor-default"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--color-text-muted)]">No tags added</p>
                  )}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}