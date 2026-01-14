// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/constants/blogs";
import BackToTopButton from "@/components/sub/BackToTopButton";
import CodeBlock from "@/components/sub/CodeBlock";
// import CommentSection from "@/components/sub/CommentSection"; // Disabled for now

type Params = { slug: string };

function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

function getRelatedPosts(currentSlug: string, tags: string[] = []) {
  return BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.tags?.some((tag) => tags.includes(tag))
  ).slice(0, 2);
}

export function generateStaticParams(): Params[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  const url = `https://www.davidfajardo.space/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const imageUrl = post.coverImage
    ? `https://www.davidfajardo.space${post.coverImage}`
    : "https://www.davidfajardo.space/og-image.jpg";

  // Build rich keywords based on post content
  const baseKeywords = [
    "David Fajardo",
    "David R. Fajardo",
    "David Fajardo Blog",
    "Web Developer",
    "Full-Stack Developer",
    "Software Engineer",
    "Programming Tutorial",
    "Developer Tips",
  ];

  // Add contextual keywords based on tags
  const contextualKeywords: string[] = [];
  if (post.tags?.includes("Clean Code")) {
    contextualKeywords.push("clean code practices", "code quality", "refactoring tips", "readable code");
  }
  if (post.tags?.includes("Debugging")) {
    contextualKeywords.push("debugging techniques", "bug fixing", "troubleshooting code", "developer workflow");
  }
  if (post.tags?.includes("AI")) {
    contextualKeywords.push("AI coding tools", "ChatGPT for developers", "AI programming", "AI code review");
  }
  if (post.tags?.includes("Performance") || post.tags?.includes("Next.js")) {
    contextualKeywords.push("web performance", "Core Web Vitals", "page speed optimization", "Next.js optimization");
  }
  if (post.tags?.includes("QA") || post.tags?.includes("Software Quality")) {
    contextualKeywords.push("QA best practices", "software testing", "quality assurance", "developer QA collaboration", "bug prevention");
  }
  if (post.tags?.includes("Teamwork") || post.tags?.includes("Collaboration")) {
    contextualKeywords.push("team collaboration", "agile teamwork", "cross-functional teams", "software team dynamics");
  }
  if (post.tags?.includes("Management") || post.tags?.includes("Leadership")) {
    contextualKeywords.push("tech leadership", "engineering management", "team management", "tech team building");
  }
  if (post.tags?.includes("Compensation") || post.tags?.includes("Career")) {
    contextualKeywords.push("developer salary", "tech compensation", "employee retention", "career growth in tech", "software engineer benefits");
  }

  return {
    title: `${post.title} | David R. Fajardo - Developer Blog`,
    description: post.description,
    keywords: [...baseKeywords, ...(post.tags ?? []), ...contextualKeywords],
    authors: [{ name: "David R. Fajardo", url: "https://www.davidfajardo.space" }],
    creator: "David R. Fajardo",
    publisher: "David R. Fajardo",
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | David R. Fajardo`,
      description: post.description,
      type: "article",
      url,
      publishedTime,
      modifiedTime: publishedTime,
      authors: ["David R. Fajardo"],
      tags: post.tags,
      section: "Technology",
      siteName: "David R. Fajardo",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} - David R. Fajardo Blog`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | David R. Fajardo`,
      description: post.description,
      images: [imageUrl],
      creator: "@davidfajardo",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, post.tags);

  // SEO Structured Data - Enhanced for better search visibility
  const imageUrl = post.coverImage
    ? `https://www.davidfajardo.space${post.coverImage}`
    : "https://www.davidfajardo.space/og-image.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.davidfajardo.space/blog/${post.slug}#article`,
    headline: post.title,
    name: post.title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      "@id": "https://www.davidfajardo.space/#person",
      name: "David R. Fajardo",
      url: "https://www.davidfajardo.space",
      jobTitle: "Full-Stack Web Developer",
      sameAs: [
        "https://github.com/David26v",
        "https://www.linkedin.com/in/david-rodrigo-fajardo/",
        "https://www.instagram.com/vid_26.fajardo/",
      ],
    },
    publisher: {
      "@type": "Person",
      "@id": "https://www.davidfajardo.space/#person",
      name: "David R. Fajardo",
      url: "https://www.davidfajardo.space",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.davidfajardo.space/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
    articleSection: "Technology",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    wordCount: post.content.reduce((acc, block) => {
      if ("text" in block) return acc + block.text.split(" ").length;
      if ("items" in block) return acc + block.items.join(" ").split(" ").length;
      return acc;
    }, 0),
    timeRequired: `PT${post.readingTimeMinutes || 5}M`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.davidfajardo.space",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.davidfajardo.space/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.davidfajardo.space/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {/* SEO Structured Data - BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* SEO Structured Data - Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-[#030014] text-white pt-28 pb-16 px-6">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-[#7042f8]/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-2xl mx-auto space-y-6">
          {/* Back navigation */}
          <nav className="mb-6">
            <Link
              href="/blog"
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
              Back to blog
            </Link>
          </nav>

          {/* Social Media Style Post Card */}
          <article className="rounded-lg border border-[#2A0E61]/30 bg-[#0c0f1a]/60" itemScope itemType="https://schema.org/BlogPosting">
            {/* Post Header - Author Info */}
            <header className="p-4 pb-3 border-b border-[#2A0E61]/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-semibold shrink-0">
                  DR
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white">David R. Fajardo</span>
                    <span className="text-gray-500 text-sm">•</span>
                    <time className="text-sm text-gray-500" itemProp="datePublished" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: new Date(post.date).getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
                      })}
                    </time>
                    {typeof post.readingTimeMinutes === "number" && (
                      <>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-sm text-gray-500">{post.readingTimeMinutes} min read</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Post Content */}
            <div className="p-4 space-y-4">
              {/* Title */}
              <h1 className="text-2xl font-bold leading-tight text-white" itemProp="headline">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed" itemProp="description">
                {post.description}
              </p>

              {/* Tags */}
              {post.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-[#7042f8]/10 border border-[#7042f8]/30 text-[#b49bff]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Cover image */}
            {post.coverImage && (
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            )}

            {/* Article content */}
            <div className="p-4 pt-6 space-y-6">
              {post.content.map((block, idx) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl md:text-3xl font-semibold pt-6 text-white border-l-4 border-[#7042f8] pl-4"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "h3") {
                  return (
                    <h3
                      key={idx}
                      className="text-xl md:text-2xl font-medium pt-4 text-gray-200"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "ul") {
                  return (
                    <ul
                      key={idx}
                      className="space-y-3 text-gray-300 pl-2"
                    >
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#7042f8] shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "ol") {
                  return (
                    <ol
                      key={idx}
                      className="space-y-3 text-gray-300 pl-2 counter-reset-item"
                    >
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <span className="mt-0.5 w-6 h-6 rounded-full bg-[#7042f8]/20 text-[#b49bff] text-sm flex items-center justify-center shrink-0 font-medium">
                            {itemIdx + 1}
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ol>
                  );
                }

                if (block.type === "code") {
                  return <CodeBlock key={idx} code={block.text} />;
                }

                if (block.type === "blockquote") {
                  return (
                    <blockquote
                      key={idx}
                      className="border-l-4 border-[#7042f8]/50 pl-6 py-2 italic text-gray-400 bg-[#7042f8]/5 rounded-r-md"
                    >
                      {block.text}
                    </blockquote>
                  );
                }

                return (
                  <p
                    key={idx}
                    className="text-gray-300 leading-relaxed text-lg"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* Comments Section - Disabled for now */}
            {/* <div className="border-t border-[#2A0E61]/20">
              <CommentSection postSlug={post.slug} />
            </div> */}
          </article>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300 px-2">
                Related Posts
              </h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="block rounded-lg border border-[#2A0E61]/50 bg-[#0c0f1a]/50 p-4 hover:border-[#7042f8]/50 transition-all duration-300"
                  >
                    <p className="text-xs text-gray-500 mb-2">{relatedPost.date}</p>
                    <h4 className="font-medium text-white hover:text-[#b49bff] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Footer navigation */}
          <div className="pt-4 flex justify-between items-center">
            <Link
              href="/blog"
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
              All posts
            </Link>

            <BackToTopButton />
          </div>
        </div>
      </main>
    </>
  );
}