"use client";

import React from "react";
import Link from "next/link";
import {
  RxDesktop,
  RxMobile,
  RxGlobe,
  RxLayers,
  RxRocket,
  RxLightningBolt,
  RxCheck,
} from "react-icons/rx";

const platforms = [
  {
    icon: RxGlobe,
    title: "Web App",
    tech: "Next.js 15",
    description: "Server-rendered React with app router, API routes, and optimized builds",
  },
  {
    icon: RxMobile,
    title: "Mobile App",
    tech: "React Native",
    description: "Native iOS and Android apps sharing components with the web",
  },
  {
    icon: RxDesktop,
    title: "Desktop App",
    tech: "Electron",
    description: "Cross-platform desktop apps with native system integration",
  },
];

const features = [
  "Turborepo pipeline with remote caching",
  "Shared UI component library",
  "Shared TypeScript types and utilities",
  "Authentication ready (Supabase)",
  "Tailwind CSS with shared theme config",
  "ESLint + Prettier shared config",
  "CI/CD with GitHub Actions",
  "Vercel deployment pre-configured",
  "Database integration (Prisma + PostgreSQL)",
  "Environment variable management",
  "Automated testing setup",
  "Documentation and getting-started guide",
];

const techStack = [
  "Turborepo",
  "Next.js",
  "React Native",
  "Electron",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Prisma",
  "PostgreSQL",
  "Vercel",
  "GitHub Actions",
  "pnpm Workspaces",
];

export default function KitPage() {
  return (
    <div className="relative min-h-screen bg-[#030014] text-white pt-[80px] pb-24 md:pb-12">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #7042f8 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #b49bff 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7042f8]/10 border border-[#7042f8]/30 text-[#b49bff] text-sm mb-6">
            <RxRocket className="w-4 h-4" />
            Production-Ready Boilerplate
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            One Repo.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
              Three Platforms.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            A Turborepo monorepo boilerplate that ships web, mobile, and desktop apps
            from a single codebase. Shared components, shared logic, zero duplication.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300 text-center"
            >
              Contact for Pricing
            </Link>
            <Link
              href="/blog/turborepo-vercel-deployment"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#7042f8]/50 text-white font-medium hover:bg-[#7042f8]/10 hover:border-[#7042f8] transition-all duration-300 text-center"
            >
              Read the Blog Post
            </Link>
          </div>
        </div>

        {/* Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
                <h3 className="text-white font-semibold text-lg mb-1">{platform.title}</h3>
                <p className="text-[#b49bff] text-sm font-medium mb-2">{platform.tech}</p>
                <p className="text-gray-400 text-sm">{platform.description}</p>
              </div>
            );
          })}
        </div>

        {/* Monorepo Structure */}
        <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <RxLayers className="w-6 h-6 text-[#b49bff]" />
            Monorepo Structure
          </h2>
          <pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto">
{`my-turborepo/
├── apps/
│   ├── web/          # Next.js 15 web application
│   ├── mobile/       # React Native mobile app
│   └── desktop/      # Electron desktop app
├── packages/
│   ├── ui/           # Shared React components
│   ├── utils/        # Shared utility functions
│   ├── config/       # Shared ESLint, TS, Tailwind configs
│   ├── types/        # Shared TypeScript types
│   └── db/           # Prisma schema & database client
├── turbo.json
├── pnpm-workspace.yaml
└── package.json`}
          </pre>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center flex items-center justify-center gap-3">
            <RxLightningBolt className="w-6 h-6 text-[#b49bff]" />
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature) => (
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

        {/* Tech Stack */}
        <div className="mb-16">
          <h3 className="text-center text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">
            Built With
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#0c0f1a]/80 border border-[#2A0E61]/50 text-gray-300 hover:border-[#7042f8]/50 hover:text-[#b49bff] transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl border border-[#7042f8]/30 bg-gradient-to-br from-[#7042f8]/10 to-transparent p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Ship Faster?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Stop rebuilding the same boilerplate for every project. Get a production-ready
            monorepo that scales with your ambitions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
