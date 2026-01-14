import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/constants/blogs";

export default function Blogs() {
  const posts = [...BLOG_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section className="flex flex-col items-center justify-center py-20" id="blog" aria-label="Blog Section">
      <div className="w-full max-w-7xl px-6 md:px-10">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-[#b49bff] mb-4">Blog</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
            Latest Writing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Notes on Next.js, React, performance, security, and shipping reliable products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group relative rounded-lg border border-[#2A0E61] bg-[#0c0f1a]/70 overflow-hidden shadow-lg shadow-[#2A0E61]/30 hover:border-[#7042f8]/50 hover:shadow-[#7042f8]/20 transition-all duration-300 hover:-translate-y-1"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a] via-[#0c0f1a]/50 to-transparent" />
                </div>
              )}

              <div className="p-6">
                {/* Date and Reading Time */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <time className="text-xs text-gray-500 font-medium" itemProp="datePublished" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  {typeof post.readingTimeMinutes === "number" && (
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTimeMinutes} min
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#b49bff] transition-colors line-clamp-2" itemProp="headline">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2" itemProp="description">
                  {post.description}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#7042f8]/10 border border-[#7042f8]/20 text-[#b49bff]/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-[#b49bff] font-medium group-hover:text-[#7042f8] transition-colors"
                  itemProp="url"
                >
                  Read post
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#7042f8]/50 text-white font-medium hover:bg-[#7042f8]/10 hover:border-[#7042f8] transition-all duration-300 group"
          >
            View all posts
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

