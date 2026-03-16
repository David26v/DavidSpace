"use client";

import Link from "next/link";
import Image from "next/image";
import { RxCheck, RxCross2, RxLightningBolt } from "react-icons/rx";
import {
  PRODUCTS,
  licenseInfo,
  type LicenseType,
} from "@/constants/products";

const planImages: Record<LicenseType, string> = {
  student: "/products/student_plan.png",
  starter: "/products/starter_plan.png",
  pro: "/products/pro_plan.png",
  enterprise: "/products/enterprise_plan.png",
  custom: "/products/custom_plan.png",
};

const product = PRODUCTS[0];

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

// ─── Tier display config ───
const tiers: {
  id: LicenseType;
  highlight?: boolean;
  badge?: string;
}[] = [
  { id: "student" },
  { id: "starter", highlight: true, badge: "Most Popular" },
  { id: "pro" },
  { id: "enterprise", badge: "Best Value" },
  { id: "custom" },
];

// ─── Savings comparison ───
const savingsData = [
  { item: "Setting up Turborepo + monorepo structure", hours: "20–40 hrs", cost: "$500–1,000" },
  { item: "Auth system (OAuth, credentials, sessions)", hours: "30–50 hrs", cost: "$750–1,250" },
  { item: "Payment billing & licensing integration", hours: "20–40 hrs", cost: "$500–1,000" },
  { item: "AI integrations (OpenAI, Anthropic, Google)", hours: "15–30 hrs", cost: "$375–750" },
  { item: "Real-time WebSocket support", hours: "10–20 hrs", cost: "$250–500" },
  { item: "Email system (templates, transactional)", hours: "10–15 hrs", cost: "$250–375" },
  { item: "Docker dev environment + CI/CD", hours: "10–20 hrs", cost: "$250–500" },
  { item: "Security suite (GeoIP, brute force, etc.)", hours: "15–25 hrs", cost: "$375–625" },
];

export default function PricingPage() {
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

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ═══════════ Header ═══════════ */}
        <div className="text-center mb-12">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors mb-6"
          >
            ← Back to SDK Overview
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
              One-Time Payment.
            </span>
            <br />
            Lifetime Access.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            No subscriptions. No hidden fees. Choose the plan that fits you and
            start building today.
          </p>
        </div>

        {/* ═══════════ Pricing Cards ═══════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {tiers.slice(0, 3).map((tier) => {
            const info = licenseInfo[tier.id];
            const price = product.price[tier.id];

            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 ${
                  tier.highlight
                    ? "border-2 border-[#7042f8] bg-gradient-to-b from-[#7042f8]/15 via-[#0c0f1a]/90 to-[#0c0f1a]/90 shadow-lg shadow-[#7042f8]/10"
                    : "border border-[#2A0E61]/50 bg-[#0c0f1a]/80 hover:border-[#7042f8]/30"
                } backdrop-blur`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold uppercase rounded-full bg-[#7042f8] text-white whitespace-nowrap z-10">
                    {tier.badge}
                  </span>
                )}

                {/* Thumbnail */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 -mt-1">
                  <Image
                    src={planImages[tier.id]}
                    alt={`${info.name} Plan`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <h3 className="text-white font-bold text-lg mb-1">
                  {info.name}
                </h3>
                <p className="text-gray-400 text-xs mb-4">{info.description}</p>

                <div className="mb-5">
                  <p className="text-3xl font-bold text-white">
                    {formatPrice(price)}
                  </p>
                  <p className="text-gray-500 text-xs">one-time payment</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {info.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-gray-300"
                    >
                      <RxCheck className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/store/pricing/${tier.id}`}
                  className={`block w-full py-3 rounded-xl font-semibold text-sm text-center transition-all duration-300 ${
                    tier.highlight
                      ? "bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white hover:shadow-lg hover:shadow-[#7042f8]/30"
                      : "border border-[#7042f8]/50 text-white hover:bg-[#7042f8]/10"
                  }`}
                >
                  View Details
                </Link>
              </div>
            );
          })}
        </div>

        {/* Enterprise + Custom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16">
          {/* Enterprise */}
          {(() => {
            const tier = tiers[3];
            const info = licenseInfo[tier.id];
            const price = product.price[tier.id];
            return (
              <div className="relative rounded-2xl p-6 border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-[#0c0f1a]/90 to-[#0c0f1a]/90 backdrop-blur transition-all duration-300 hover:border-orange-500/50">
                {tier.badge && (
                  <span className="absolute -top-3 left-6 px-4 py-1 text-[10px] font-bold uppercase rounded-full bg-orange-500 text-white whitespace-nowrap z-10">
                    {tier.badge}
                  </span>
                )}
                {/* Enterprise Thumbnail */}
                <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-5">
                  <Image
                    src={planImages.enterprise}
                    alt="Enterprise Plan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {info.name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-3">
                      {info.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-white">
                        {formatPrice(price)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        one-time payment — includes 20 hrs custom development
                      </p>
                    </div>
                    <Link
                      href="/store/pricing/enterprise"
                      className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                  <div className="sm:w-56">
                    <ul className="space-y-2">
                      {info.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs text-gray-300"
                        >
                          <RxCheck className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Custom */}
          {(() => {
            const info = licenseInfo.custom;
            return (
              <div className="relative rounded-2xl p-6 border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur transition-all duration-300 hover:border-[#7042f8]/30">
                {/* Custom Thumbnail */}
                <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-5">
                  <Image
                    src={planImages.custom}
                    alt="Custom Plan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {info.name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-3">
                      {info.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-white">
                        Let&apos;s Talk
                      </p>
                      <p className="text-gray-500 text-xs">
                        free consultation — no obligation
                      </p>
                    </div>
                    <Link
                      href="/store/pricing/custom"
                      className="inline-block px-6 py-3 rounded-xl border border-[#7042f8]/50 text-white font-semibold text-sm hover:bg-[#7042f8]/10 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                  <div className="sm:w-56">
                    <ul className="space-y-2">
                      {info.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs text-gray-300"
                        >
                          <RxCheck className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ═══════════ What You Save ═══════════ */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <RxLightningBolt className="w-5 h-5 text-[#b49bff]" />
              What You Save
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Building all of this from scratch (or prompting AI to do it) costs
              thousands in developer time and AI tokens.
            </p>
          </div>
          <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-xs">
              <div className="px-4 py-3 border-b border-[#2A0E61]/30 text-gray-500 font-medium">
                What you&apos;d build manually
              </div>
              <div className="px-4 py-3 border-b border-[#2A0E61]/30 text-gray-500 font-medium text-right">
                Time
              </div>
              <div className="px-4 py-3 border-b border-[#2A0E61]/30 text-gray-500 font-medium text-right">
                Cost*
              </div>
              {savingsData.map((row) => (
                <div key={row.item} className="contents">
                  <div className="px-4 py-2.5 border-b border-[#2A0E61]/20 text-gray-300">
                    {row.item}
                  </div>
                  <div className="px-4 py-2.5 border-b border-[#2A0E61]/20 text-gray-400 text-right whitespace-nowrap">
                    {row.hours}
                  </div>
                  <div className="px-4 py-2.5 border-b border-[#2A0E61]/20 text-gray-400 text-right whitespace-nowrap">
                    {row.cost}
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 text-white font-semibold">Total</div>
              <div className="px-4 py-3 text-white font-semibold text-right">130–240 hrs</div>
              <div className="px-4 py-3 text-white font-semibold text-right">$3,250–6,000</div>
            </div>
            <div className="px-4 py-3 bg-[#7042f8]/10 border-t border-[#7042f8]/30">
              <p className="text-center text-sm">
                <span className="text-[#b49bff] font-semibold">
                  With this SDK: Starting at {formatPrice(product.price.student)}
                </span>
                <span className="text-gray-400 ml-2">— one-time payment</span>
              </p>
            </div>
            <p className="px-4 py-2 text-[10px] text-gray-600 text-right">
              *Estimated at $25/hr freelance rate
            </p>
          </div>
        </div>

        {/* ═══════════ Compare Plans Table ═══════════ */}
        <div id="compare" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">
              Compare All Plans
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              See exactly what&apos;s included in each tier
            </p>
          </div>

          <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#2A0E61]/30">
                  <th className="text-left px-4 py-4 text-gray-500 font-medium min-w-[180px]">Feature</th>
                  <th className="px-3 py-4 text-center text-gray-300 font-semibold min-w-[80px]">
                    Student
                    <span className="block text-gray-500 font-normal mt-0.5">{formatPrice(product.price.student)}</span>
                  </th>
                  <th className="px-3 py-4 text-center font-semibold min-w-[80px]">
                    <span className="text-[#b49bff]">Starter</span>
                    <span className="block text-gray-500 font-normal mt-0.5">{formatPrice(product.price.starter)}</span>
                  </th>
                  <th className="px-3 py-4 text-center text-gray-300 font-semibold min-w-[80px]">
                    Pro
                    <span className="block text-gray-500 font-normal mt-0.5">{formatPrice(product.price.pro)}</span>
                  </th>
                  <th className="px-3 py-4 text-center text-orange-400 font-semibold min-w-[90px]">
                    Enterprise
                    <span className="block text-gray-500 font-normal mt-0.5">{formatPrice(product.price.enterprise)}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Full source code access", student: true, starter: true, pro: true, enterprise: true },
                  { feature: "6 apps (Web, API, Mobile, Desktop, Admin, Docs)", student: true, starter: true, pro: true, enterprise: true },
                  { feature: "17 shared packages", student: true, starter: true, pro: true, enterprise: true },
                  { feature: "Docker dev environment", student: true, starter: true, pro: true, enterprise: true },
                  { feature: "Deployment guides", student: true, starter: true, pro: true, enterprise: true },
                  { feature: "Documentation & code comments", student: true, starter: true, pro: true, enterprise: true },
                  { feature: "Authentication (OAuth + credentials)", student: true, starter: true, pro: true, enterprise: true },
                  { feature: "Database setup (Prisma + PostgreSQL)", student: true, starter: true, pro: true, enterprise: true },
                  { feature: "Commercial use license", student: false, starter: true, pro: true, enterprise: true },
                  { feature: "SEO generator package", student: false, starter: true, pro: true, enterprise: true },
                  { feature: "Payment integration", student: false, starter: true, pro: true, enterprise: true },
                  { feature: "Email support", student: false, starter: true, pro: true, enterprise: true },
                  { feature: "AI integrations (OpenAI, Anthropic, Google)", student: false, starter: true, pro: true, enterprise: true },
                  { feature: "Priority support", student: false, starter: false, pro: true, enterprise: true },
                  { feature: "White-label rights", student: false, starter: false, pro: true, enterprise: true },
                  { feature: "Unlimited projects", student: false, starter: false, pro: true, enterprise: true },
                  { feature: "SaaS & resale allowed", student: false, starter: false, pro: true, enterprise: true },
                  { feature: "Custom feature development", student: false, starter: false, pro: false, enterprise: "20 hrs" },
                  { feature: "1-on-1 architecture review", student: false, starter: false, pro: false, enterprise: true },
                  { feature: "Dedicated onboarding session", student: false, starter: false, pro: false, enterprise: true },
                  { feature: "Priority bug fixes", student: false, starter: false, pro: false, enterprise: true },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-[#2A0E61]/15 hover:bg-[#7042f8]/5 transition-colors">
                    <td className="px-4 py-3 text-gray-300">{row.feature}</td>
                    {[row.student, row.starter, row.pro, row.enterprise].map((val, i) => (
                      <td key={i} className="px-3 py-3 text-center">
                        {val === true ? (
                          <RxCheck className="w-4 h-4 text-green-400 mx-auto" />
                        ) : val === false ? (
                          <RxCross2 className="w-4 h-4 text-gray-700 mx-auto" />
                        ) : (
                          <span className="text-orange-400 font-medium">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Updates row */}
                <tr className="border-b border-[#2A0E61]/15 hover:bg-[#7042f8]/5 transition-colors">
                  <td className="px-4 py-3 text-gray-300">Updates</td>
                  <td className="px-3 py-3 text-center text-gray-400">6 months</td>
                  <td className="px-3 py-3 text-center text-[#b49bff]">1 year</td>
                  <td className="px-3 py-3 text-center text-green-400 font-medium">Lifetime</td>
                  <td className="px-3 py-3 text-center text-green-400 font-medium">Lifetime</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA row under table */}
          <div className="grid grid-cols-4 gap-3 mt-4 pl-[180px]">
            {(["student", "starter", "pro", "enterprise"] as const).map((plan) => (
              <Link
                key={plan}
                href={`/store/pricing/${plan}`}
                className={`py-2.5 rounded-xl text-center text-xs font-semibold transition-all duration-300 ${
                  plan === "starter"
                    ? "bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white hover:shadow-lg hover:shadow-[#7042f8]/30"
                    : plan === "enterprise"
                      ? "bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                      : "border border-[#7042f8]/30 text-gray-300 hover:bg-[#7042f8]/10"
                }`}
              >
                Get {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {/* ═══════════ Footer CTA ═══════════ */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            Questions? Need help choosing the right plan?
          </p>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl border border-[#2A0E61]/50 text-gray-300 font-medium text-sm hover:border-[#7042f8]/30 hover:text-white transition-all"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
