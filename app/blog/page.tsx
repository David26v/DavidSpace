// app/blog/page.tsx
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/constants/blogs";

type SortOrder = "newest" | "oldest";

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    BLOG_POSTS.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter suggestions based on search query
  const suggestions = useMemo(() => {
    if (!searchQuery) return allTags.slice(0, 6);
    const query = searchQuery.toLowerCase();
    return allTags.filter((tag) => tag.toLowerCase().includes(query)).slice(0, 6);
  }, [searchQuery, allTags]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...BLOG_POSTS];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort by date
    if (sortOrder === "newest") {
      return filtered.sort((a, b) => b.date.localeCompare(a.date));
    } else {
      return filtered.sort((a, b) => a.date.localeCompare(b.date));
    }
  }, [searchQuery, sortOrder]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setShowSuggestions(false);
  };

  return (
    <main className="min-h-screen bg-[#030014] text-white pt-28 pb-16 px-6">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#7042f8]/5 via-transparent to-transparent pointer-events-none" />

      <section className="relative max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-4 text-center animate-fade-in">
          <p className="text-sm uppercase tracking-[0.25em] text-[#b49bff] font-medium">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-[#b49bff] to-[#7042f8] bg-clip-text text-transparent">
            Writing & Notes
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Short, practical posts about Next.js, React, performance, security,
            and shipping reliable products.
          </p>
        </header>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            {/* Search Bar */}
            <div ref={searchRef} className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search posts or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="w-full px-4 py-3 pl-12 pr-10 rounded-lg bg-[#0c0f1a]/80 border border-[#2A0E61]/50 text-white placeholder-gray-500 focus:outline-none focus:border-[#7042f8]/50 focus:ring-2 focus:ring-[#7042f8]/20 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              
              {/* Clear button */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-lg bg-[#0c0f1a] border border-[#2A0E61]/50 shadow-xl shadow-black/50 z-50">
                  <p className="px-4 py-1 text-xs text-gray-500 uppercase tracking-wide">
                    {searchQuery ? "Matching topics" : "Popular topics"}
                  </p>
                  {suggestions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#7042f8]/10 hover:text-[#b49bff] transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Sort Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#0c0f1a]/80 border border-[#2A0E61]/50 text-gray-400 hover:text-white hover:border-[#7042f8]/50 transition-all whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
              <svg 
                className={`w-3 h-3 transition-transform ${sortOrder === "oldest" ? "rotate-180" : ""}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Posts count */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="w-8 h-px bg-gray-700" />
            <span>
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
              {searchQuery ? " found" : ""}
            </span>
            <span className="w-8 h-px bg-gray-700" />
          </div>
        </div>

        {/* Blog posts feed - Social Media Style */}
        <div className="max-w-2xl mx-auto space-y-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-[#2A0E61]/30 bg-[#0c0f1a]/60 hover:border-[#7042f8]/40 hover:bg-[#0c0f1a]/80 transition-all duration-300"
            >
              {/* Post Header - Author Info */}
              <div className="flex items-center gap-3 p-4 pb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  DR
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">David R. Fajardo</span>
                    <span className="text-gray-500 text-xs">•</span>
                    <time className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: new Date(post.date).getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
                      })}
                    </time>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[#b49bff] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-3">
                  {post.description}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-[#7042f8]/10 text-[#b49bff]/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
              )}

              {/* Post Footer - Engagement */}
              <div className="px-4 py-3 border-t border-[#2A0E61]/20 flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  {typeof post.readingTimeMinutes === "number" && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTimeMinutes} min read
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600 group-hover:text-[#b49bff] transition-colors">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 mx-auto text-gray-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">No posts found</p>
            <p className="text-gray-600 text-sm">
              {searchQuery
                ? "Try adjusting your search"
                : "Stay tuned for new posts!"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 rounded-lg bg-[#7042f8]/10 border border-[#7042f8]/30 text-[#b49bff] hover:bg-[#7042f8]/20 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Back to home */}
        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#b49bff] transition-colors group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
