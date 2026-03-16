"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { RxCheck, RxCopy, RxRocket, RxDownload, RxLockOpen2, RxExternalLink } from "react-icons/rx";
import type { LicenseType } from "@/constants/products";

// ─── Tier-specific content ────────────────────────────────────

type TierContent = {
  repoName: string;
  repoUrl: string;
  apps: { name: string; port?: string; description: string }[];
  packages: { name: string; description: string }[];
  deployGuides: string[];
  databases: string;
  databasePorts: string;
  envVars: string;
  cliNote: boolean;
};

const TIER_CONTENT: Record<string, TierContent> = {
  student: {
    repoName: "SDK-Student",
    repoUrl: "https://github.com/David26v/SDK-Student.git",
    apps: [
      { name: "Web App", port: "localhost:3000", description: "Next.js 14 — Main web app" },
      { name: "API Server", port: "localhost:4000", description: "Hono — REST API" },
      { name: "Docs", port: "localhost:3003", description: "Fumadocs — Documentation" },
    ],
    packages: [
      { name: "ui", description: "shadcn/ui + Radix + Tailwind components" },
      { name: "database", description: "Prisma ORM + PostgreSQL" },
      { name: "auth", description: "NextAuth.js (Google, GitHub, credentials)" },
      { name: "shared", description: "Zod types, utilities, constants" },
      { name: "email", description: "Email system (Resend)" },
      { name: "config-eslint", description: "Shared ESLint config" },
      { name: "config-typescript", description: "Shared TypeScript config" },
    ],
    deployGuides: ["Vercel", "Docker"],
    databases: "PostgreSQL",
    databasePorts: "PostgreSQL (5432), pgAdmin (5050), Mailpit (8025)",
    envVars: `DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."`,
    cliNote: false,
  },
  starter: {
    repoName: "SDK-Starter",
    repoUrl: "https://github.com/David26v/SDK-Starter.git",
    apps: [
      { name: "Web App", port: "localhost:3000", description: "Next.js 14 — Main web app" },
      { name: "API Server", port: "localhost:4000", description: "Hono — REST API" },
      { name: "Mobile", port: "localhost:3001", description: "Capacitor.js — iOS & Android" },
      { name: "Docs", port: "localhost:3003", description: "Fumadocs — Documentation" },
    ],
    packages: [
      { name: "ui", description: "shadcn/ui + Radix + Tailwind components" },
      { name: "database", description: "Prisma ORM + PostgreSQL" },
      { name: "auth", description: "NextAuth.js (Google, GitHub, credentials)" },
      { name: "shared", description: "Zod types, utilities, constants" },
      { name: "email", description: "Email system (Resend)" },
      { name: "config-eslint", description: "Shared ESLint config" },
      { name: "config-typescript", description: "Shared TypeScript config" },
      { name: "payments", description: "Stripe subscriptions, checkout, webhooks" },
      { name: "storage", description: "Vercel Blob / S3 / Cloudflare R2" },
      { name: "ai", description: "OpenAI, Anthropic, Google AI" },
      { name: "seo", description: "SEO meta tags, Open Graph, JSON-LD" },
      { name: "sdk-cli", description: "CLI scaffolding tool" },
      { name: "security", description: "Security utilities, rate limiting" },
    ],
    deployGuides: ["Vercel", "Docker", "Railway", "Render"],
    databases: "PostgreSQL, Redis",
    databasePorts: "PostgreSQL (5432), Redis (6379), pgAdmin (5050), Mailpit (8025)",
    envVars: `DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Stripe Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# AI (optional)
OPENAI_API_KEY="..."
ANTHROPIC_API_KEY="..."

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Storage
BLOB_READ_WRITE_TOKEN="..."`,
    cliNote: true,
  },
  pro: {
    repoName: "SDK-Pro",
    repoUrl: "https://github.com/David26v/SDK-Pro.git",
    apps: [
      { name: "Web App", port: "localhost:3000", description: "Next.js 14 — Main web app" },
      { name: "API Server", port: "localhost:4000", description: "Hono — REST API" },
      { name: "Mobile", port: "localhost:3001", description: "Capacitor.js — iOS & Android" },
      { name: "Desktop", description: "Electron — macOS, Windows, Linux" },
      { name: "Admin", port: "localhost:3002", description: "Admin dashboard" },
      { name: "Docs", port: "localhost:3003", description: "Fumadocs — Documentation" },
    ],
    packages: [
      { name: "ui", description: "shadcn/ui + Radix + Tailwind components" },
      { name: "database", description: "Prisma ORM + PostgreSQL" },
      { name: "auth", description: "NextAuth.js (Google, GitHub, credentials)" },
      { name: "shared", description: "Zod types, utilities, constants" },
      { name: "email", description: "Resend, Nodemailer, SendGrid" },
      { name: "config-eslint", description: "Shared ESLint config" },
      { name: "config-typescript", description: "Shared TypeScript config" },
      { name: "payments", description: "Stripe subscriptions, checkout, webhooks" },
      { name: "storage", description: "Vercel Blob / S3 / Cloudflare R2" },
      { name: "ai", description: "OpenAI, Anthropic, Google AI" },
      { name: "seo", description: "SEO meta tags, Open Graph, JSON-LD" },
      { name: "sdk-cli", description: "CLI scaffolding tool" },
      { name: "security", description: "GeoIP, threat detection, brute force" },
      { name: "monitoring", description: "Error tracking & performance" },
      { name: "nosql", description: "MongoDB/Mongoose" },
      { name: "notifications", description: "In-app notification system" },
      { name: "realtime", description: "Socket.io WebSocket support" },
    ],
    deployGuides: ["Vercel", "Docker", "Railway", "Render", "AWS", "GCP", "Kubernetes"],
    databases: "PostgreSQL, MongoDB, Redis",
    databasePorts: "PostgreSQL (5432), MongoDB (27017), Redis (6379), pgAdmin (5050), Mongo Express (8081), Mailpit (8025)",
    envVars: `DATABASE_URL="postgresql://..."
MONGODB_URI="mongodb://localhost:27017/launchkit"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Stripe Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# AI
OPENAI_API_KEY="..."
ANTHROPIC_API_KEY="..."
GOOGLE_AI_API_KEY="..."

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Storage
BLOB_READ_WRITE_TOKEN="..."

# Monitoring (optional)
SENTRY_DSN="..."`,
    cliNote: true,
  },
};

// Enterprise uses the same repo as Pro
TIER_CONTENT.enterprise = { ...TIER_CONTENT.pro, repoName: "SDK-Pro", repoUrl: "https://github.com/David26v/SDK-Pro.git" };

function getTierContent(tier: string | null): TierContent {
  if (tier && TIER_CONTENT[tier]) return TIER_CONTENT[tier];
  return TIER_CONTENT.pro; // fallback
}

function getTierLabel(tier: string | null): string {
  const labels: Record<string, string> = {
    student: "Student",
    starter: "Starter",
    pro: "Pro",
    enterprise: "Enterprise",
  };
  return tier && labels[tier] ? labels[tier] : "Pro";
}

// ─── Components ────────────────────────────────────────────

function CopyBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {label && (
        <span className="text-xs text-gray-500 mb-1 block">{label}</span>
      )}
      <div className="flex items-center gap-2 bg-[#0a0d1a] border border-[#2A0E61]/50 rounded-lg px-4 py-3 font-mono text-sm text-gray-300 overflow-x-auto">
        <code className="flex-1 whitespace-pre">{code}</code>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-1.5 rounded-md hover:bg-[#7042f8]/20 text-gray-500 hover:text-[#b49bff] transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <RxCheck className="w-4 h-4 text-green-400" />
          ) : (
            <RxCopy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") || params.get("order_id");
  const tier = params.get("tier") as LicenseType | null;

  const content = getTierContent(tier);
  const tierLabel = getTierLabel(tier);

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

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <RxCheck className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Purchase{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Successful!
            </span>
          </h1>
          <p className="text-gray-300 max-w-lg mx-auto">
            Thank you for purchasing the <strong className="text-white">{tierLabel} Plan</strong>! Follow the instructions below to get started with your SDK.
          </p>
          {sessionId && (
            <p className="text-xs text-gray-600 mt-2">
              Order ID: {sessionId}
            </p>
          )}
        </div>

        {/* Delivery Info — GitHub Repo Access */}
        <div className="rounded-2xl border border-[#7042f8]/30 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <RxLockOpen2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">GitHub Repository Access</h2>
              <p className="text-xs text-gray-400">
                You&apos;ll receive a GitHub invitation to the <strong className="text-[#b49bff]">{content.repoName}</strong> repo within minutes.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Step-by-step delivery */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">📧</div>
                <p className="text-xs font-semibold text-white mb-1">Step 1</p>
                <p className="text-[11px] text-gray-400">Check your email for a GitHub invitation</p>
              </div>
              <div className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">✅</div>
                <p className="text-xs font-semibold text-white mb-1">Step 2</p>
                <p className="text-[11px] text-gray-400">Accept the invite to get repo access</p>
              </div>
              <div className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🚀</div>
                <p className="text-xs font-semibold text-white mb-1">Step 3</p>
                <p className="text-[11px] text-gray-400">Clone the repo and start building</p>
              </div>
            </div>

            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 text-sm text-yellow-200/80">
              <strong className="text-yellow-300">Check your email!</strong> Look for a GitHub invitation from{" "}
              <span className="font-medium text-yellow-300">David26v</span>.
              Also check your spam folder. The invite expires in 7 days.
            </div>

            {/* Direct repo link */}
            <a
              href={`https://github.com/David26v/${content.repoName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 bg-[#7042f8]/10 border border-[#7042f8]/30 rounded-xl p-4 hover:bg-[#7042f8]/20 transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-white">Your Repository</p>
                <p className="text-xs text-gray-400 font-mono">github.com/David26v/{content.repoName}</p>
              </div>
              <RxExternalLink className="w-5 h-5 text-[#b49bff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Getting Started Instructions */}
        <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/20 flex items-center justify-center text-[#b49bff]">
              <RxRocket className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              Getting Started — {tierLabel} Plan
            </h2>
          </div>

          <div className="space-y-8">
            {/* Step 1 — Prerequisites */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">1</span>
                Prerequisites
              </h3>
              <p className="text-sm text-gray-400 mb-3">Make sure you have these installed:</p>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <RxCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Node.js 20+</strong> — <code className="text-[#b49bff] text-xs bg-[#7042f8]/10 px-1.5 py-0.5 rounded">node -v</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <RxCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>pnpm 9+</strong> — <code className="text-[#b49bff] text-xs bg-[#7042f8]/10 px-1.5 py-0.5 rounded">npm install -g pnpm</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <RxCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Docker & Docker Compose</strong> — for local {content.databases}</span>
                </li>
                <li className="flex items-start gap-2">
                  <RxCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Git</strong> — for version control</span>
                </li>
              </ul>
            </div>

            {/* Step 2 — Clone & Install */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">2</span>
                Clone & Install
              </h3>
              <p className="text-sm text-gray-400 mb-3">After accepting the GitHub invitation:</p>
              <div className="space-y-2">
                <CopyBlock code={`git clone ${content.repoUrl}`} label="Clone the repo" />
                <CopyBlock code={`cd ${content.repoName}`} label="Enter the project" />
                <CopyBlock code="pnpm install" label="Install all dependencies" />
              </div>
            </div>

            {/* Step 3 — Environment Variables */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">3</span>
                Environment Variables
              </h3>
              <p className="text-sm text-gray-400 mb-3">Copy the example env file and fill in your keys:</p>
              <CopyBlock code="cp .env.example .env" />
              <div className="mt-3 bg-[#0a0d1a] border border-[#2A0E61]/50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-2">Key variables to configure:</p>
                <pre className="text-xs text-gray-400 font-mono leading-relaxed">{content.envVars}</pre>
              </div>
            </div>

            {/* Step 4 — Start Databases */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">4</span>
                Start Databases
              </h3>
              <p className="text-sm text-gray-400 mb-3">Spin up {content.databases} with Docker:</p>
              <CopyBlock code="docker compose up -d" />
              <p className="text-xs text-gray-500 mt-2">This starts: {content.databasePorts}</p>
            </div>

            {/* Step 5 — Set Up Database */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">5</span>
                Set Up the Database
              </h3>
              <p className="text-sm text-gray-400 mb-3">Generate the Prisma client and push the schema:</p>
              <div className="space-y-2">
                <CopyBlock code="pnpm db:generate" label="Generate Prisma client" />
                <CopyBlock code="pnpm db:push" label="Push schema to database" />
                <CopyBlock code="pnpm db:seed" label="Seed sample data (optional)" />
              </div>
            </div>

            {/* Step 6 — Launch Dev Server */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">6</span>
                Launch the Dev Server
              </h3>
              <p className="text-sm text-gray-400 mb-3">Start all apps in development mode:</p>
              <CopyBlock code="pnpm dev" />
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {content.apps.map((app) => (
                  <div key={app.name} className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-lg px-3 py-2">
                    <span className="text-[#b49bff] font-medium">{app.name}</span>
                    {app.port ? (
                      <span className="text-gray-500 ml-2">{app.port}</span>
                    ) : (
                      <span className="text-gray-600 ml-2">native</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 7 — CLI (only for starter/pro/enterprise) */}
            {content.cliNote && (
              <div>
                <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">7</span>
                  Using the CLI Scaffolding Tool
                </h3>
                <p className="text-sm text-gray-400 mb-3">Use the included CLI to scaffold new features:</p>
                <CopyBlock code="npx create-launchkit" />
              </div>
            )}

            {/* Deploy step */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">
                  {content.cliNote ? "8" : "7"}
                </span>
                Deploy to Production
              </h3>
              <p className="text-sm text-gray-400 mb-3">Build and deploy:</p>
              <CopyBlock code="pnpm build" label="Build all apps" />
              <p className="text-xs text-gray-500 mt-2">
                Deployment guides included: {content.deployGuides.join(", ")}.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Project Structure */}
        <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Project Structure</h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#7042f8]/10 border border-[#7042f8]/30 text-[#b49bff]">
              {tierLabel} Plan
            </span>
          </div>
          <pre className="text-xs text-gray-400 font-mono leading-relaxed overflow-x-auto">
{`${content.repoName}/
├── apps/
${content.apps.map((app, i) => {
  const prefix = i === content.apps.length - 1 ? "│   └──" : "│   ├──";
  const dirName = app.name.toLowerCase().replace(/ /g, "").replace("webapp", "web").replace("apiserver", "api");
  const nameMap: Record<string, string> = { "Web App": "web", "API Server": "api", Mobile: "mobile", Desktop: "desktop", Admin: "admin", Docs: "docs" };
  const dir = nameMap[app.name] || dirName;
  return `${prefix} ${dir.padEnd(14)} # ${app.description}`;
}).join("\n")}
├── packages/
${content.packages.map((pkg, i) => {
  const prefix = i === content.packages.length - 1 ? "│   └──" : "│   ├──";
  return `${prefix} ${pkg.name.padEnd(18)} # ${pkg.description}`;
}).join("\n")}
├── deploy/
${content.deployGuides.map((guide, i) => {
  const prefix = i === content.deployGuides.length - 1 ? "│   └──" : "│   ├──";
  return `${prefix} ${guide.toLowerCase().padEnd(14)} # ${guide} deployment`;
}).join("\n")}
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml`}
          </pre>
        </div>

        {/* Enterprise-specific note */}
        {tier === "enterprise" && (
          <div className="rounded-2xl border border-[#7042f8]/30 bg-gradient-to-br from-[#7042f8]/10 to-transparent p-6 mb-8">
            <h3 className="text-white font-semibold mb-2">🎯 Enterprise — What&apos;s Next</h3>
            <p className="text-sm text-gray-400 mb-3">
              Your Enterprise plan includes hands-on services in addition to the full SDK:
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <RxCheck className="w-4 h-4 text-[#b49bff] mt-0.5 flex-shrink-0" />
                <span><strong>Onboarding call</strong> — David will reach out within 24 hours to schedule your session</span>
              </li>
              <li className="flex items-start gap-2">
                <RxCheck className="w-4 h-4 text-[#b49bff] mt-0.5 flex-shrink-0" />
                <span><strong>Architecture review</strong> — Share your requirements and get a tailored plan</span>
              </li>
              <li className="flex items-start gap-2">
                <RxCheck className="w-4 h-4 text-[#b49bff] mt-0.5 flex-shrink-0" />
                <span><strong>20 hrs custom development</strong> — Starts after your onboarding call</span>
              </li>
              <li className="flex items-start gap-2">
                <RxCheck className="w-4 h-4 text-[#b49bff] mt-0.5 flex-shrink-0" />
                <span><strong>Dedicated Slack/Discord channel</strong> — Active for 90 days</span>
              </li>
            </ul>
          </div>
        )}

        {/* Support */}
        <div className="rounded-2xl border border-[#7042f8]/20 bg-gradient-to-br from-[#7042f8]/5 to-transparent p-6 text-center mb-8">
          <h3 className="text-white font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-gray-400 mb-4">
            If you run into any issues during setup, reach out and I&apos;ll help you get up and running.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/30 text-[#b49bff] font-medium text-sm hover:bg-[#7042f8]/20 transition-all"
          >
            Contact Support
          </Link>
        </div>

        {/* Back to Store */}
        <div className="text-center">
          <Link
            href="/store"
            className="text-sm text-gray-500 hover:text-[#b49bff] transition-colors"
          >
            &larr; Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030014] flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
