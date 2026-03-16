"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { RxCheck, RxCopy, RxRocket, RxDownload, RxLockOpen2 } from "react-icons/rx";

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
            Thank you for your purchase! Follow the instructions below to get started with your SDK-TURBOREPO-STARTUP-EDITION template.
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
                You&apos;ll receive a GitHub invitation to the private SDK repo within minutes.
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

            <div className="bg-[#7042f8]/5 border border-[#7042f8]/20 rounded-xl p-4 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <RxDownload className="w-4 h-4 text-[#b49bff] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white text-sm mb-1">Why GitHub?</p>
                  <p className="text-xs text-gray-400">
                    You get automatic access to all future updates — every time we push improvements, you&apos;ll have them instantly. No need to re-download ZIP files.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Instructions */}
        <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/20 flex items-center justify-center text-[#b49bff]">
              <RxRocket className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              Getting Started — SDK-TURBOREPO-STARTUP-EDITION
            </h2>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                Prerequisites
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Make sure you have these installed on your machine:
              </p>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <RxCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Node.js 18+</strong> — <code className="text-[#b49bff] text-xs bg-[#7042f8]/10 px-1.5 py-0.5 rounded">node -v</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <RxCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>pnpm 9+</strong> — <code className="text-[#b49bff] text-xs bg-[#7042f8]/10 px-1.5 py-0.5 rounded">npm install -g pnpm</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <RxCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Docker & Docker Compose</strong> — for local databases (PostgreSQL, MongoDB, Redis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <RxCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Git</strong> — for version control</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                Clone & Install
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                After accepting the GitHub invitation, clone the repo and install dependencies:
              </p>
              <div className="space-y-2">
                <CopyBlock code="git clone https://github.com/David26v/TurboRepoSDKSale.git" label="Clone the repo" />
                <CopyBlock code="cd TurboRepoSDKSale" label="Enter the project" />
                <CopyBlock code="pnpm install" label="Install all dependencies" />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                Environment Variables
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Copy the example env file and fill in your keys:
              </p>
              <CopyBlock code="cp .env.example .env" />
              <div className="mt-3 bg-[#0a0d1a] border border-[#2A0E61]/50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-2">Key variables to configure:</p>
                <pre className="text-xs text-gray-400 font-mono leading-relaxed">{`DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Payments (from lemonsqueezy.com or stripe.com)
PAYMENT_SECRET_KEY="..."
PAYMENT_WEBHOOK_SECRET="..."

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# AI (optional)
OPENAI_API_KEY="..."
ANTHROPIC_API_KEY="..."`}</pre>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">
                  4
                </span>
                Start Databases
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Spin up PostgreSQL, MongoDB, and Redis with Docker:
              </p>
              <CopyBlock code="docker compose up -d" />
              <p className="text-xs text-gray-500 mt-2">
                This starts: PostgreSQL (5432), MongoDB (27017), Redis (6379), pgAdmin (5050), Mongo Express (8081), Mailpit (8025)
              </p>
            </div>

            {/* Step 5 */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">
                  5
                </span>
                Set Up the Database
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Generate the Prisma client and push the schema:
              </p>
              <div className="space-y-2">
                <CopyBlock code="pnpm db:generate" label="Generate Prisma client" />
                <CopyBlock code="pnpm db:push" label="Push schema to database" />
                <CopyBlock code="pnpm db:seed" label="Seed sample data (optional)" />
              </div>
            </div>

            {/* Step 6 */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">
                  6
                </span>
                Launch the Dev Server
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Start all apps in development mode with Turborepo:
              </p>
              <CopyBlock code="pnpm dev" />
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-lg px-3 py-2">
                  <span className="text-[#b49bff] font-medium">Web App</span>
                  <span className="text-gray-500 ml-2">localhost:3000</span>
                </div>
                <div className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-lg px-3 py-2">
                  <span className="text-[#b49bff] font-medium">API Server</span>
                  <span className="text-gray-500 ml-2">localhost:4000</span>
                </div>
                <div className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-lg px-3 py-2">
                  <span className="text-[#b49bff] font-medium">Mobile</span>
                  <span className="text-gray-500 ml-2">localhost:3001</span>
                </div>
                <div className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-lg px-3 py-2">
                  <span className="text-[#b49bff] font-medium">Admin</span>
                  <span className="text-gray-500 ml-2">localhost:3002</span>
                </div>
                <div className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-lg px-3 py-2">
                  <span className="text-[#b49bff] font-medium">Docs</span>
                  <span className="text-gray-500 ml-2">localhost:3003</span>
                </div>
                <div className="bg-[#0a0d1a] border border-[#2A0E61]/30 rounded-lg px-3 py-2">
                  <span className="text-[#b49bff] font-medium">Mailpit</span>
                  <span className="text-gray-500 ml-2">localhost:8025</span>
                </div>
              </div>
            </div>

            {/* Step 7 */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">
                  7
                </span>
                Using the CLI Scaffolding Tool
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Use the included CLI to scaffold new features interactively:
              </p>
              <CopyBlock code="npx create-launchkit" />
              <p className="text-xs text-gray-500 mt-2">
                Choose your platforms (Web, API, Mobile, Desktop, Admin), pricing tier, features (Auth, Payments, Storage, Email, Analytics), database provider, and deployment target.
              </p>
            </div>

            {/* Step 8 */}
            <div>
              <h3 className="text-sm font-semibold text-[#b49bff] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7042f8]/20 border border-[#7042f8]/40 flex items-center justify-center text-xs font-bold">
                  8
                </span>
                Deploy to Production
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Build and deploy to Vercel, Railway, or your own infrastructure:
              </p>
              <CopyBlock code="pnpm build" label="Build all apps" />
              <p className="text-xs text-gray-500 mt-2">
                Each app can be deployed independently. The web app and docs are pre-configured for Vercel. The API server supports Vercel, Railway, Render, Cloudflare Workers, or self-hosting.
              </p>
            </div>
          </div>
        </div>

        {/* Monorepo Structure Reference */}
        <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Project Structure</h2>
          <pre className="text-xs text-gray-400 font-mono leading-relaxed overflow-x-auto">{`launchkit/
├── apps/
│   ├── web/         # Next.js 16 — Main SaaS web app
│   ├── api/         # Hono — REST API server
│   ├── admin/       # Admin dashboard
│   ├── mobile/      # Capacitor.js — iOS & Android
│   ├── desktop/     # Electron — Desktop app
│   └── docs/        # Fumadocs — Documentation site
├── packages/
│   ├── ui/          # shadcn/ui + Radix + Tailwind components
│   ├── database/    # Prisma ORM + PostgreSQL schema
│   ├── auth/        # NextAuth.js (Google, GitHub, credentials)
│   ├── payments/    # Lemon Squeezy / Stripe billing & licensing
│   ├── storage/     # Vercel Blob / S3 / Cloudflare R2
│   ├── email/       # Resend, Nodemailer, SendGrid
│   ├── ai/          # OpenAI, Anthropic, Google AI
│   ├── realtime/    # Socket.io WebSocket support
│   ├── security/    # GeoIP, threat detection, brute force
│   ├── monitoring/  # Error tracking & performance
│   ├── notifications/ # In-app notification system
│   ├── nosql/       # MongoDB/Mongoose
│   ├── shared/      # Zod types, utilities, constants
│   └── sdk-cli/     # create-launchkit CLI tool
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml`}</pre>
        </div>

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
