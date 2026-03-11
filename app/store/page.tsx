"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  RxRocket,
  RxLightningBolt,
  RxLayers,
  RxGlobe,
  RxCode,
  RxMobile,
} from "react-icons/rx";

// ─── Types ready for database integration ───
// These types will be used when fetching from your database (Prisma/Supabase)
// and processing payments via Stripe/PayMongo

export type ProductCategory =
  | "all"
  | "dashboards"
  | "ui-kits"
  | "templates"
  | "starter-kits";

export type LicenseType = "basic" | "pro" | "extended";

export type Product = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  image: string;
  images?: string[];
  price: {
    basic: number;
    pro: number;
    extended: number;
  };
  originalPrice?: {
    basic: number;
    pro: number;
    extended: number;
  };
  features: string[];
  techStack: string[];
  demoUrl?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviews: number;
  sales: number;
  stripeProductId?: string;
  paymongoProductId?: string;
};

// ─── Data fetching stub ───
// Replace with actual API calls when backend is ready
// Example: const products = await fetch('/api/products').then(r => r.json())
// Example: const products = await prisma.product.findMany()

const categories = [
  { id: "dashboards", label: "Dashboards", icon: RxLayers, description: "Admin panels & analytics dashboards" },
  { id: "ui-kits", label: "UI Kits", icon: RxCode, description: "React component libraries" },
  { id: "templates", label: "Templates", icon: RxGlobe, description: "Landing pages & portfolios" },
  { id: "starter-kits", label: "Starter Kits", icon: RxRocket, description: "Full-stack boilerplates" },
];

const upcomingFeatures = [
  {
    icon: RxLightningBolt,
    title: "Stripe Integration",
    description: "Secure payments with Stripe checkout and webhooks",
  },
  {
    icon: RxMobile,
    title: "PayMongo Support",
    description: "Local payment methods for Philippine customers",
  },
  {
    icon: RxLayers,
    title: "License Management",
    description: "Basic, Pro, and Extended license tiers with download access",
  },
  {
    icon: RxCode,
    title: "Admin Dashboard",
    description: "Manage products, orders, and customers from a custom admin panel",
  },
];

// Animated pulsing dot
const PulsingDot = () => (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7042f8] opacity-75" />
    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#b49bff]" />
  </span>
);

export default function StorePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO: Wire to database or email service (e.g., Resend, Mailchimp)
      // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
      setSubscribed(true);
      setEmail("");
    }
  };

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
            <PulsingDot />
            Coming Soon
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
              Store
            </span>{" "}
            is Getting Ready
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
            Premium templates, UI kits, dashboards, and starter kits — all built with
            production-grade code. Payments via Stripe and PayMongo coming soon.
          </p>
          <p className="text-sm text-gray-500">
            I&apos;m building the admin panel, payment integrations, and database layer.
            Products will be available for purchase shortly.
          </p>
        </div>

        {/* Product Categories Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group p-5 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur hover:border-[#7042f8]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/20 flex items-center justify-center text-[#b49bff] flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{cat.label}</h3>
                    <p className="text-gray-500 text-xs">{cat.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* What's Coming */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            What&apos;s Being Built
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/20 flex items-center justify-center text-[#b49bff] flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notify Form */}
        <div className="text-center rounded-2xl border border-[#7042f8]/30 bg-gradient-to-br from-[#7042f8]/10 to-transparent p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get Notified When We Launch
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-sm">
            Be the first to know when the store goes live. No spam — just a single email
            when products are available for purchase.
          </p>

          {mounted && subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              You&apos;ll be notified when the store launches!
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#7042f8]/50 transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300 whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>

        {/* Meanwhile CTA */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            In the meantime, check out the Turborepo Kit or get in touch directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/kit"
              className="px-6 py-3 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/30 text-[#b49bff] font-medium text-sm hover:bg-[#7042f8]/20 transition-all"
            >
              View Turborepo Kit
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl border border-[#2A0E61]/50 text-gray-300 font-medium text-sm hover:border-[#7042f8]/30 hover:text-white transition-all"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
