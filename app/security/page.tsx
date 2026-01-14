import Link from "next/link";
import type { Metadata } from "next";

// SEO Metadata
export const metadata: Metadata = {
  title: "Security & Performance | David Fajardo - Full-Stack Developer",
  description:
    "Learn about enterprise-grade security practices and performance optimization techniques I use to build fast, secure web applications. AES-256 encryption, OAuth 2.0, JWT authentication, and more.",
  keywords: [
    "web security",
    "performance optimization",
    "encryption",
    "OAuth",
    "JWT",
    "OWASP",
    "SSL",
    "CDN",
    "Next.js performance",
    "secure web development",
  ],
  openGraph: {
    title: "Security & Performance | David Fajardo",
    description:
      "Enterprise-grade security and blazing fast performance for modern web applications.",
    type: "article",
    authors: ["David Fajardo"],
  },
};

const securityFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "End-to-End Encryption",
    description:
      "All sensitive data is encrypted using AES-256, the same encryption standard used by governments and financial institutions. Your information remains private and secure during transmission and storage, protecting against unauthorized access and data breaches.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "OAuth 2.0 & JWT Authentication",
    description:
      "Industry-standard authentication protocols protect user accounts with secure token-based sessions. Support for multi-factor authentication (MFA), social logins, and role-based access control ensures only authorized users can access sensitive features.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "OWASP Compliance",
    description:
      "Applications are built following OWASP Top 10 security guidelines, protecting against common vulnerabilities including SQL injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and security misconfigurations.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Secure Code Practices",
    description:
      "Every line of code undergoes security review with input validation, parameterized queries, and proper error handling to prevent data leaks. Dependencies are regularly audited for known vulnerabilities.",
  },
];

const performanceFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning-Fast Load Times",
    description:
      "Optimized builds with code splitting, lazy loading, and tree shaking deliver sub-second page loads. Every application achieves 90+ Lighthouse performance scores, ensuring smooth user experiences across all devices.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    title: "Optimized Database Queries",
    description:
      "Efficient SQL queries with proper indexing, connection pooling, and intelligent caching strategies. Redis and in-memory caching reduce database load by up to 40%, ensuring fast response times even under heavy traffic.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Global CDN Distribution",
    description:
      "Static assets are served from edge locations worldwide through Vercel Edge Network and Cloudflare. Users experience fast delivery regardless of their geographic location, with automatic failover for reliability.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Real-Time Monitoring",
    description:
      "Continuous performance monitoring with automated alerts helps identify and resolve bottlenecks before they impact user experience. Integration with tools like Vercel Analytics and custom dashboards provide actionable insights.",
  },
];

const metrics = [
  { value: "90+", label: "Lighthouse Score", sublabel: "Performance" },
  { value: "<1s", label: "Page Load", sublabel: "Average" },
  { value: "99.9%", label: "Uptime", sublabel: "Guaranteed" },
  { value: "A+", label: "SSL Rating", sublabel: "Security" },
];

const securityChecklist = [
  "HTTPS everywhere with SSL/TLS certificates",
  "Content Security Policy (CSP) headers",
  "Rate limiting and DDoS protection",
  "Input validation and sanitization",
  "Secure session management",
  "Regular security audits and updates",
  "Dependency vulnerability scanning",
  "Secure HTTP headers (HSTS, X-Frame-Options)",
];

const performanceChecklist = [
  "Image optimization and lazy loading",
  "Code minification and compression",
  "Browser caching strategies",
  "Server-side rendering (SSR) where needed",
  "Database query optimization",
  "Automated performance monitoring",
  "Critical CSS inlining",
  "Resource prefetching and preloading",
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#030014] text-white pt-28 pb-16 px-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #7042f8 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #00e0ff 0%, transparent 70%)" }}
        />
      </div>

      <article className="max-w-4xl mx-auto relative">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#b49bff] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#b49bff]">Security & Performance</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <p className="uppercase text-xs tracking-[0.3em] text-[#b49bff] mb-4">
            Security & Performance
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Building Fast, Secure Web Applications{" "}
            <span className="bg-gradient-to-r from-[#7042f8] to-[#00e0ff] bg-clip-text text-transparent">
              That Users Trust
            </span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            In today&apos;s digital landscape, security and performance aren&apos;t optional—they&apos;re
            essential. I build applications with enterprise-grade security practices and
            optimizations that deliver exceptional user experiences while protecting sensitive
            data.
          </p>

          {/* Author & Date */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#2A0E61]/30">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center text-white font-bold">
              D
            </div>
            <div>
              <p className="text-white font-medium">David Fajardo</p>
              <p className="text-gray-500 text-sm">Full-Stack Developer • Security Enthusiast</p>
            </div>
          </div>
        </header>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="group relative p-5 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur text-center hover:border-[#7042f8]/50 transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7042f8] to-[#00e0ff] bg-clip-text text-transparent">
                {metric.value}
              </p>
              <p className="text-white font-medium text-sm mt-1">{metric.label}</p>
              <p className="text-gray-500 text-xs">{metric.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Security Section */}
        <section className="mb-16" aria-labelledby="security-heading">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center"
              style={{ boxShadow: "0 8px 30px rgba(112, 66, 248, 0.3)" }}
            >
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 id="security-heading" className="text-2xl md:text-3xl font-bold text-white">
                Enterprise-Grade Security
              </h2>
              <p className="text-gray-400">Protecting your data at every layer</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-gray-300 leading-relaxed text-lg">
              Security isn&apos;t just a feature—it&apos;s a foundation. Every application I build
              follows security-first principles, implementing multiple layers of protection from
              the database to the user interface. Whether you&apos;re handling customer data,
              processing payments, or managing sensitive business information, your application
              needs robust security measures that meet industry standards and regulatory
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur hover:border-[#7042f8]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/30 flex items-center justify-center text-[#b49bff] flex-shrink-0 group-hover:bg-[#7042f8]/20 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-[#b49bff] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Section */}
        <section className="mb-16" aria-labelledby="performance-heading">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00e0ff] to-[#7042f8] flex items-center justify-center"
              style={{ boxShadow: "0 8px 30px rgba(0, 224, 255, 0.3)" }}
            >
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 id="performance-heading" className="text-2xl md:text-3xl font-bold text-white">
                Blazing Fast Performance
              </h2>
              <p className="text-gray-400">Speed that keeps users engaged</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-gray-300 leading-relaxed text-lg">
              Website speed directly impacts user experience, conversion rates, and SEO rankings.
              Studies show that a 1-second delay in page load time can reduce conversions by 7%.
              That&apos;s why I obsess over performance optimization—from server response times to
              client-side rendering. Every millisecond matters when building products that compete
              in today&apos;s fast-paced digital market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur hover:border-[#00e0ff]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00e0ff]/10 border border-[#00e0ff]/30 flex items-center justify-center text-[#00e0ff] flex-shrink-0 group-hover:bg-[#00e0ff]/20 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-[#00e0ff] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Checklists */}
        <section className="mb-16">
          <div className="rounded-2xl border border-[#2A0E61]/50 bg-gradient-to-br from-[#7042f8]/10 to-[#0c0f1a] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              My Security & Performance Checklist
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Security Checklist */}
              <div>
                <h3 className="text-lg font-semibold text-[#b49bff] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Security
                </h3>
                <ul className="space-y-2">
                  {securityChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Performance Checklist */}
              <div>
                <h3 className="text-lg font-semibold text-[#00e0ff] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Performance
                </h3>
                <ul className="space-y-2">
                  {performanceChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tools & Technologies */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">Tools & Technologies I Use</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Supabase",
              "PostgreSQL",
              "Redis",
              "Vercel",
              "Cloudflare",
              "SSL/TLS",
              "OAuth 2.0",
              "JWT",
              "bcrypt",
              "Helmet.js",
              "ESLint Security",
              "OWASP ZAP",
              "Lighthouse",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl text-sm bg-[#0c0f1a] text-gray-300 border border-[#2A0E61]/50 hover:border-[#7042f8]/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Build Something Secure & Fast?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Whether you need a security audit for your existing application or want to build a
              new product with performance and security baked in from day one, I&apos;m here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:shadow-[0_0_30px_rgba(112,66,248,0.4)] transition-all duration-300 flex items-center gap-2"
              >
                Get a Free Consultation
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/#projects"
                className="px-8 py-3.5 rounded-xl border border-[#7042f8]/50 text-white font-medium hover:bg-[#7042f8]/10 hover:border-[#7042f8] transition-all duration-300"
              >
                View My Work
              </Link>
            </div>
          </div>
        </section>

        {/* Back to home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#b49bff] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </article>

      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Building Fast, Secure Web Applications That Users Trust",
            description:
              "Learn about enterprise-grade security practices and performance optimization techniques for modern web applications.",
            author: {
              "@type": "Person",
              name: "David R. Fajardo",
              url: "https://www.davidfajardo.space",
            },
            publisher: {
              "@type": "Person",
              name: "David R. Fajardo",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.davidfajardo.space/security",
            },
            keywords: [
              "web security",
              "performance optimization",
              "encryption",
              "OAuth",
              "JWT",
              "OWASP",
            ],
          }),
        }}
      />
    </main>
  );
}