"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  RxCheck,
  RxCross2,
  RxRocket,
  RxArrowLeft,
  RxCheckCircled,
  RxCode,
  RxFile,
  RxGlobe,
  RxTimer,
  RxLockClosed,
  RxMagnifyingGlass,
  RxChatBubble,
  RxStar,
  RxLightningBolt,
  RxPerson,
  RxGear,
  RxLayers,
  RxMix,
  RxUpdate,
  RxEnvelopeClosed,
  RxDesktop,
} from "react-icons/rx";
import {
  PRODUCTS,
  licenseInfo,
  planDetails,
  planQA,
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

const validPlans: LicenseType[] = ["student", "starter", "pro", "enterprise", "custom"];

// Feature icon mapping — maps keywords in feature titles to icons + colors
const featureIconMap: { keywords: string[]; icon: React.ReactNode; color: string; bg: string }[] = [
  { keywords: ["monorepo", "architecture", "codebase", "structure"], icon: <RxLayers className="w-6 h-6" />, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { keywords: ["documentation", "docs", "guide"], icon: <RxFile className="w-6 h-6" />, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { keywords: ["deploy", "production", "hosting"], icon: <RxGlobe className="w-6 h-6" />, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { keywords: ["update", "lifetime", "months"], icon: <RxUpdate className="w-6 h-6" />, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { keywords: ["commercial", "license", "white-label", "resale", "saas"], icon: <RxStar className="w-6 h-6" />, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { keywords: ["seo", "search", "meta", "sitemap"], icon: <RxMagnifyingGlass className="w-6 h-6" />, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { keywords: ["payment", "stripe", "billing", "checkout"], icon: <RxLightningBolt className="w-6 h-6" />, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { keywords: ["auth", "login", "session", "security"], icon: <RxLockClosed className="w-6 h-6" />, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { keywords: ["email", "notification", "send"], icon: <RxEnvelopeClosed className="w-6 h-6" />, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  { keywords: ["support", "priority", "dedicated", "onboarding"], icon: <RxChatBubble className="w-6 h-6" />, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { keywords: ["custom", "development", "feature", "engineering"], icon: <RxCode className="w-6 h-6" />, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { keywords: ["review", "consultation", "consult", "advice"], icon: <RxPerson className="w-6 h-6" />, color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
  { keywords: ["bug", "fix", "patch", "issue"], icon: <RxGear className="w-6 h-6" />, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
  { keywords: ["infrastructure", "scaling", "server", "cloud"], icon: <RxDesktop className="w-6 h-6" />, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" },
  { keywords: ["database", "ai", "integration", "real-time", "websocket"], icon: <RxMix className="w-6 h-6" />, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10 border-fuchsia-500/20" },
];

function getFeatureIcon(title: string) {
  const lower = title.toLowerCase();
  const match = featureIconMap.find((f) =>
    f.keywords.some((kw) => lower.includes(kw))
  );
  return match || { icon: <RxRocket className="w-6 h-6" />, color: "text-[#b49bff]", bg: "bg-[#7042f8]/10 border-[#7042f8]/20" };
}

function QAItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#2A0E61]/30 rounded-xl overflow-hidden transition-colors hover:border-[#7042f8]/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-medium text-white">{question}</span>
        <svg
          className={`w-5 h-5 text-[#b49bff] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export default function PlanDetailPage() {
  const params = useParams();
  const plan = params.plan as string;

  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!validPlans.includes(plan as LicenseType)) {
    return (
      <div className="relative min-h-screen bg-[#030014] text-white pt-[80px] pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
          <Link href="/store/pricing" className="text-[#b49bff] hover:text-white transition-colors">
            ← Back to Pricing
          </Link>
        </div>
      </div>
    );
  }

  const planId = plan as LicenseType;
  const info = licenseInfo[planId];
  const details = planDetails[planId];
  const price = product.price[planId];
  const isCustom = planId === "custom";
  const isEnterprise = planId === "enterprise";

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (isCustom) {
      window.location.href = "/contact?ref=custom";
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          license: planId,
          customerEmail: email,
          githubUsername: githubUsername.trim().replace(/^@/, "") || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Failed to start checkout. Please try again.");
    } finally {
      setLoading(false);
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

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/store/pricing"
          className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors mb-8"
        >
          <RxArrowLeft className="w-4 h-4" />
          Back to All Plans
        </Link>

        {/* ═══════════ Hero with Thumbnail ═══════════ */}
        <div className="mb-12">
          {/* Plan Banner Image */}
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-8 border border-[#2A0E61]/40">
            <Image
              src={planImages[planId]}
              alt={`${info.name} Plan — SDK-TURBOREPO-STARTUP-EDITION`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-[#7042f8]/20 text-[#b49bff] border border-[#7042f8]/30">
              {info.name} Plan
            </span>
            {isEnterprise && (
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                Best Value
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {details.headline}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            {details.subtitle}
          </p>
        </div>

        {/* ═══════════ Price + Quick CTA ═══════════ */}
        <div className="rounded-2xl border border-[#7042f8]/40 bg-gradient-to-r from-[#7042f8]/10 via-[#0c0f1a]/80 to-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              {isCustom ? (
                <>
                  <p className="text-3xl font-bold text-white">Let&apos;s Talk</p>
                  <p className="text-gray-400 text-sm">Free consultation — no obligation</p>
                </>
              ) : (
                <>
                  <p className="text-4xl font-bold text-white">{formatPrice(price)}</p>
                  <p className="text-gray-400 text-sm">One-time payment — {info.description.toLowerCase()}</p>
                </>
              )}
            </div>
            <a
              href="#get-started"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300"
            >
              {isCustom ? "Book Free Consultation" : "Get This Plan"}
            </a>
          </div>
        </div>

        {/* ═══════════ Ideal For ═══════════ */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-5">
            Ideal For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {details.idealFor.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#0c0f1a]/60 border border-[#2A0E61]/30"
              >
                <RxCheckCircled className="w-5 h-5 text-[#b49bff] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ Why This Plan ═══════════ */}
        <div className="mb-12">
          <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">
              Why the {info.name} Plan?
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              {details.whyThisPlan}
            </p>
          </div>
        </div>

        {/* ═══════════ What You Get — Visual Feature Cards ═══════════ */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-2">
            What You Get
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Everything included in your {info.name} plan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {details.featuresDetailed.map((feature, i) => {
              const iconData = getFeatureIcon(feature.title);
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-[#2A0E61]/30 bg-[#0c0f1a]/60 p-6 hover:border-[#7042f8]/40 transition-all duration-300 hover:bg-[#0c0f1a]/80"
                >
                  {/* Feature number badge */}
                  <span className="absolute top-4 right-4 text-xs font-mono text-gray-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${iconData.bg} ${iconData.color} group-hover:scale-110 transition-transform duration-300`}>
                    {iconData.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-base mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-current to-transparent ${iconData.color}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════════ Included / Not Included ═══════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Included */}
          <div className="rounded-xl border border-green-500/20 bg-[#0c0f1a]/60 p-5">
            <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <RxCheck className="w-4 h-4 text-green-400" />
              Included
            </h3>
            <ul className="space-y-2">
              {details.included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                  <RxCheck className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Not Included */}
          {details.notIncluded.length > 0 && (
            <div className="rounded-xl border border-[#2A0E61]/30 bg-[#0c0f1a]/60 p-5">
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <RxCross2 className="w-4 h-4 text-gray-500" />
                Not Included
              </h3>
              <ul className="space-y-2">
                {details.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    <RxCross2 className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-600 mt-3">
                Available in higher-tier plans →{" "}
                <Link href="/store/pricing#compare" className="text-[#b49bff] hover:text-white transition-colors">
                  Compare plans
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* ═══════════ Q&A ═══════════ */}
        {planQA[planId] && planQA[planId].length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-2">
              Questions & Answers
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Common questions about the {info.name} plan
            </p>
            <div className="space-y-3">
              {planQA[planId].map((qa) => (
                <QAItem
                  key={qa.question}
                  question={qa.question}
                  answer={qa.answer}
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ Get Started / Checkout ═══════════ */}
        <div id="get-started" className="mb-12">
          <div className="max-w-lg mx-auto rounded-2xl border border-[#7042f8]/40 bg-gradient-to-b from-[#7042f8]/10 to-[#0c0f1a]/80 backdrop-blur p-6 md:p-8">
            <div className="text-center mb-6">
              <RxRocket className="w-8 h-8 text-[#b49bff] mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white mb-1">
                {isCustom ? "Book Your Free Consultation" : `Get the ${info.name} Plan`}
              </h2>
              {!isCustom && (
                <p className="text-2xl font-bold text-[#b49bff]">
                  {formatPrice(price)}{" "}
                  <span className="text-sm font-normal text-gray-400">one-time</span>
                </p>
              )}
            </div>

            {isCustom ? (
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-6">
                  Tell me about your project and I&apos;ll get back to you within 24 hours with a plan and estimate.
                </p>
                <Link
                  href="/contact?ref=custom"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300"
                >
                  Contact David
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleCheckout}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email for delivery"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0d1a] border border-[#2A0E61]/50 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#7042f8]/50 transition-colors mb-3"
                />
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="GitHub username (for repo access)"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0d1a] border border-[#2A0E61]/50 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#7042f8]/50 transition-colors mb-3"
                />

                {error && (
                  <p className="text-sm text-red-400 mb-3">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Redirecting to checkout..."
                    : `Purchase ${info.name} Plan — ${formatPrice(price)}`}
                </button>

                <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-gray-500">
                  <span>🔒 Secure payment via Lemon Squeezy</span>
                  <span>⚡ Instant delivery</span>
                  <span>🌍 All taxes handled</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ═══════════ Compare Plans CTA ═══════════ */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-3">Not sure this is the right plan?</p>
          <Link
            href="/store/pricing#compare"
            className="text-[#b49bff] text-sm font-medium hover:text-white transition-colors"
          >
            Compare all plans →
          </Link>
        </div>
      </div>
    </div>
  );
}
