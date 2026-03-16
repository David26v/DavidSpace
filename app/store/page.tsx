"use client";

import Link from "next/link";
import Image from "next/image";
import {
  RxRocket,
  RxCheck,
  RxGlobe,
  RxMobile,
  RxDesktop,
  RxLayers,
  RxLightningBolt,
  RxTimer,
  RxCode,
  RxExternalLink,
} from "react-icons/rx";
import { PRODUCTS } from "@/constants/products";
import { PROJECTS } from "@/constants/projects";

const product = PRODUCTS[0];

// ─── Platform data (merged from kit page) ───
const platforms = [
  {
    icon: RxGlobe,
    title: "Web App",
    tech: "Next.js 16",
    description:
      "Server-rendered React with app router, API routes, and optimized builds",
  },
  {
    icon: RxMobile,
    title: "Mobile App",
    tech: "React Native",
    description:
      "Native iOS and Android apps sharing components with the web",
  },
  {
    icon: RxDesktop,
    title: "Desktop App",
    tech: "Electron",
    description:
      "Cross-platform desktop apps with native system integration",
  },
];

// ─── Value props ───
const valueProps = [
  {
    icon: RxTimer,
    title: "Save 100+ Hours",
    description:
      "Skip months of boilerplate setup. Everything is pre-configured and ready to deploy.",
  },
  {
    icon: RxLightningBolt,
    title: "Save $1,000+ in AI Tokens",
    description:
      "Stop burning money prompting AI to scaffold your project. Get it all in one package.",
  },
  {
    icon: RxCode,
    title: "Production-Ready Code",
    description:
      "Battle-tested architecture used in real-world apps. Not a tutorial project.",
  },
  {
    icon: RxRocket,
    title: "Launch in Days, Not Months",
    description:
      "From git clone to production deployment in hours. Free deployment guides included.",
  },
];

// ─── Deployment guides ───
const deploymentGuides = [
  { app: "Web App", platform: "Vercel", description: "One-click deploy with automatic previews" },
  { app: "API Server", platform: "Railway / Render", description: "Hono API with auto-scaling" },
  { app: "Mobile App", platform: "Expo / App Store", description: "Build and publish to iOS & Android" },
  { app: "Desktop App", platform: "Electron Builder", description: "Package for Windows, Mac & Linux" },
  { app: "Admin Panel", platform: "Vercel", description: "Separate deploy with auth protection" },
  { app: "Documentation", platform: "Vercel / Netlify", description: "Static docs site with search" },
];

// ─── Format cents to dollars ───
function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

// ─── Showcase projects (real-world apps built with this stack) ───
const showcaseProjects = PROJECTS.filter((p) =>
  ["c5m-world", "zentryx-workforce", "amaya-ph", "astraeus-tech", "supraarc"].includes(p.id)
);

// ─── Main Store Page ───
export default function StorePage() {
  return (
    <div className="relative min-h-screen bg-[#030014] text-white pt-[80px] pb-24 md:pb-12">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #7042f8 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #b49bff 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full opacity-5 blur-3xl"
          style={{
            background: "radial-gradient(circle, #7042f8 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ═══════════ SECTION 1: Hero ═══════════ */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7042f8]/10 border border-[#7042f8]/30 text-[#b49bff] text-sm mb-6">
            <RxRocket className="w-4 h-4" />
            One-Time Payment — Lifetime Access
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
              SDK-TURBOREPO
            </span>
            <br />
            <span className="text-white">STARTUP-EDITION</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            Ship 6 production-ready apps from one codebase. Save $1,000+ in
            development time and months of AI token costs. One-time payment,
            forever yours.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Web • API • Mobile • Desktop • Admin • Docs — all from a single
            Turborepo monorepo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/store/pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300 text-center"
            >
              View Pricing — Starting at {formatPrice(product.price.student)}
            </Link>
            <a
              href="#whats-included"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#7042f8]/50 text-white font-medium hover:bg-[#7042f8]/10 hover:border-[#7042f8] transition-all duration-300 text-center"
            >
              Learn More
            </a>
          </div>

          {/* Hero Banner Image */}
          <div className="relative mt-12 rounded-2xl overflow-hidden border border-[#7042f8]/30 shadow-2xl shadow-[#7042f8]/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10 pointer-events-none opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#7042f8]/5 via-transparent to-[#b49bff]/5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src="/products/sdk_turborepo_main_banner.png"
              alt="SDK-TURBOREPO-STARTUP-EDITION — Full-stack monorepo with 6 apps and 17 packages"
              width={1200}
              height={630}
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              priority
            />
          </div>
        </div>

        {/* ═══════════ SECTION 2: The Problem / Value Props ═══════════ */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Stop Wasting Time &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
                Money
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Most developers spend weeks scaffolding projects and thousands on
              AI tokens just to set up the basics. We already did it for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valueProps.map((prop) => {
              const Icon = prop.icon;
              return (
                <div
                  key={prop.title}
                  className="p-5 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur hover:border-[#7042f8]/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/30 flex items-center justify-center text-[#b49bff] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {prop.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════════ SECTION 3: Platform Cards ═══════════ */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              One Repo.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
                Three Platforms.
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Web, mobile, and desktop — all sharing the same components, logic,
              and types. Zero duplication.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div
                  key={platform.title}
                  className="group p-6 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur hover:border-[#7042f8]/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/30 flex items-center justify-center text-[#b49bff] mb-4 group-hover:bg-[#7042f8]/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {platform.title}
                  </h3>
                  <p className="text-[#b49bff] text-sm font-medium mb-2">
                    {platform.tech}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {platform.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════════ SECTION 4: What's Included ═══════════ */}
        <div id="whats-included" className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <RxLightningBolt className="w-6 h-6 text-[#b49bff]" />
              What&apos;s Included
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Everything you need to build, deploy, and scale — out of the box.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0c0f1a]/60 border border-[#2A0E61]/30"
              >
                <RxCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ SECTION 5: Monorepo Structure ═══════════ */}
        <div className="mb-20">
          <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <RxLayers className="w-6 h-6 text-[#b49bff]" />
              Monorepo Structure
            </h2>
            <pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto">
              {`sdk-turborepo/
├── apps/
│   ├── web/          # Next.js 16 web application
│   ├── api/          # Hono API server
│   ├── mobile/       # React Native mobile app
│   ├── desktop/      # Electron desktop app
│   ├── admin/        # Admin dashboard
│   └── docs/         # Documentation site
├── packages/
│   ├── ui/           # Shared React components (shadcn/ui)
│   ├── auth/         # NextAuth.js authentication
│   ├── payments/     # Lemon Squeezy / Stripe billing
│   ├── ai/           # OpenAI, Anthropic, Google AI
│   ├── realtime/     # Socket.io WebSockets
│   ├── storage/      # Vercel Blob / S3 / R2
│   ├── email/        # Resend, SendGrid, Nodemailer
│   ├── security/     # GeoIP, threat detection
│   ├── monitoring/   # Error tracking & analytics
│   ├── seo/          # SEO generator & meta tags
│   ├── db/           # Prisma + PostgreSQL + MongoDB
│   ├── config/       # Shared ESLint, TS, Tailwind configs
│   ├── types/        # Shared TypeScript types
│   └── utils/        # Shared utility functions
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json`}
            </pre>
          </div>
        </div>

        {/* ═══════════ SECTION 6: Tech Stack ═══════════ */}
        <div className="mb-20">
          <h3 className="text-center text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">
            Built With
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {product.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#0c0f1a]/80 border border-[#2A0E61]/50 text-gray-300 hover:border-[#7042f8]/50 hover:text-[#b49bff] transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════ SECTION 7: Free Deployment Guides ═══════════ */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Free{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
                Deployment Guides
              </span>{" "}
              Included
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Step-by-step guides to deploy every app in the monorepo. From
              local development to production.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deploymentGuides.map((guide) => (
              <div
                key={guide.app}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#0c0f1a]/60 border border-[#2A0E61]/30"
              >
                <RxRocket className="w-5 h-5 text-[#b49bff] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">
                    {guide.app}{" "}
                    <span className="text-[#b49bff]">→ {guide.platform}</span>
                  </p>
                  <p className="text-gray-500 text-xs">{guide.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ SECTION 8: Real-World Showcase ═══════════ */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Built With This{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
                Stack
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Real-world applications built using the same technologies and
              architecture powering this SDK.
            </p>
          </div>

          {/* Hero showcase: C5M World */}
          {(() => {
            const hero = PROJECTS.find((p) => p.id === "c5m-world");
            if (!hero) return null;
            return (
              <div className="rounded-2xl border border-[#7042f8]/40 bg-gradient-to-br from-[#7042f8]/10 via-[#0c0f1a]/80 to-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 mb-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-green-500/20 text-green-400 border border-green-500/30 mb-3 inline-block">
                      Live Production App
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {hero.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {hero.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hero.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[#0a0d1a]/80 border border-[#7042f8]/20 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={hero.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#b49bff] text-sm hover:text-white transition-colors"
                    >
                      Visit Live Site
                      <RxExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Other showcase projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {showcaseProjects
              .filter((p) => p.id !== "c5m-world")
              .map((proj) => (
                <a
                  key={proj.id}
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur hover:border-[#7042f8]/40 transition-all duration-300"
                >
                  <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#b49bff] transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                    {proj.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[#0a0d1a] border border-[#2A0E61]/30 text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
          </div>
        </div>

        {/* ═══════════ SECTION 9: Pricing Preview ═══════════ */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Simple,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
                One-Time
              </span>{" "}
              Pricing
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              No subscriptions. No hidden fees. Pay once, own it forever.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {/* Student */}
            <div className="p-4 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur text-center">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-2">
                Student
              </p>
              <p className="text-2xl font-bold text-white mb-1">
                {formatPrice(product.price.student)}
              </p>
              <p className="text-gray-500 text-[10px]">one-time</p>
            </div>
            {/* Starter */}
            <div className="p-4 rounded-2xl border border-[#7042f8]/50 bg-gradient-to-b from-[#7042f8]/10 to-[#0c0f1a]/80 backdrop-blur text-center relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[9px] font-bold uppercase rounded-full bg-[#7042f8] text-white">
                Popular
              </span>
              <p className="text-[#b49bff] text-[10px] uppercase tracking-wider mb-2">
                Starter
              </p>
              <p className="text-2xl font-bold text-white mb-1">
                {formatPrice(product.price.starter)}
              </p>
              <p className="text-gray-500 text-[10px]">one-time</p>
            </div>
            {/* Pro */}
            <div className="p-4 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur text-center">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-2">
                Pro
              </p>
              <p className="text-2xl font-bold text-white mb-1">
                {formatPrice(product.price.pro)}
              </p>
              <p className="text-gray-500 text-[10px]">one-time</p>
            </div>
            {/* Enterprise */}
            <div className="p-4 rounded-2xl border border-orange-500/30 bg-gradient-to-b from-orange-500/5 to-[#0c0f1a]/80 backdrop-blur text-center">
              <p className="text-orange-400 text-[10px] uppercase tracking-wider mb-2">
                Enterprise
              </p>
              <p className="text-2xl font-bold text-white mb-1">
                {formatPrice(product.price.enterprise)}
              </p>
              <p className="text-gray-500 text-[10px]">one-time</p>
            </div>
            {/* Custom */}
            <div className="p-4 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur text-center col-span-2 sm:col-span-1">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-2">
                Custom
              </p>
              <p className="text-xl font-bold text-white mb-1">
                Let&apos;s Talk
              </p>
              <p className="text-gray-500 text-[10px]">consultation</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/store/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300"
            >
              View Full Pricing & Get Started
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* ═══════════ SECTION 10: Bottom CTA ═══════════ */}
        <div className="text-center rounded-2xl border border-[#7042f8]/30 bg-gradient-to-br from-[#7042f8]/10 to-transparent p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Ship Faster?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Stop rebuilding the same boilerplate for every project. Get a
            production-ready monorepo that scales with your ambitions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/store/pricing"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300"
            >
              Get Started Today
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl border border-[#7042f8]/50 text-white font-medium hover:bg-[#7042f8]/10 transition-all duration-300"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
