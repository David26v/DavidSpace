import type { Metadata } from "next";

const siteUrl = "https://www.davidfajardo.space";

export const metadata: Metadata = {
  title: "SDK-TURBOREPO-STARTUP-EDITION — Ship 6 Apps From One Codebase | David Fajardo",
  description:
    "Production-ready Turborepo monorepo for startups. Ship Web, API, Mobile, Desktop, Admin & Docs from one codebase. One-time payment starting at $50. Save 130–240 hours of development time. Built by David R. Fajardo, Full-Stack Software Engineer.",
  keywords: [
    "SDK Turborepo Startup Edition",
    "Turborepo Monorepo Starter",
    "Next.js Starter Kit",
    "React Native Starter",
    "Electron Starter",
    "Full-Stack Boilerplate",
    "SaaS Starter Kit",
    "Production-Ready Template",
    "David Fajardo",
    "One-Time Payment SDK",
    "Developer Starter Kit",
    "Turborepo Template",
    "startup boilerplate",
    "monorepo starter kit buy",
    "full stack developer kit",
    "Next.js monorepo boilerplate",
    "React monorepo template",
    "pnpm workspace starter",
    "multi-app starter kit",
    "Hono API starter",
    "Capacitor mobile starter",
    "Electron desktop boilerplate",
    "Prisma starter kit",
    "shadcn ui template",
    "save development time",
    "developer productivity tool",
    "ship faster",
    "best monorepo starter 2026",
    "full stack TypeScript starter",
  ],
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
  openGraph: {
    title: "SDK-TURBOREPO-STARTUP-EDITION — Ship 6 Apps From One Codebase",
    description:
      "Production-ready Turborepo monorepo. Web, API, Mobile, Desktop, Admin & Docs. One-time payment from $50. Save $3,250–6,000 in dev time.",
    type: "website",
    url: `${siteUrl}/store`,
    locale: "en_US",
    siteName: "David R. Fajardo",
    images: [
      {
        url: `${siteUrl}/logo_version_2.png`,
        width: 1200,
        height: 630,
        alt: "SDK-TURBOREPO-STARTUP-EDITION — Ship 6 Production-Ready Apps",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SDK-TURBOREPO-STARTUP-EDITION — Ship 6 Apps From One Codebase",
    description:
      "One-time payment from $50. Ship Web, API, Mobile, Desktop, Admin & Docs. Save 130–240 hrs of dev time.",
    images: [`${siteUrl}/logo_version_2.png`],
    creator: "@davidfajardo",
  },
  alternates: {
    canonical: `${siteUrl}/store`,
  },
  other: {
    "product:price:amount": "50.00",
    "product:price:currency": "USD",
  },
};

// JSON-LD: SoftwareApplication with all pricing tiers
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SDK-TURBOREPO-STARTUP-EDITION",
  description:
    "Production-ready Turborepo monorepo for startups. 6 apps, 17 shared packages. Web, API, Mobile, Desktop, Admin & Docs in one codebase.",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Software Development Kit",
  operatingSystem: "Windows, macOS, Linux",
  url: `${siteUrl}/store`,
  image: `${siteUrl}/logo_version_2.png`,
  screenshot: `${siteUrl}/logo_version_2.png`,
  softwareVersion: "1.0",
  datePublished: "2026-01-01",
  inLanguage: "en",
  isAccessibleForFree: false,
  author: {
    "@type": "Person",
    name: "David R. Fajardo",
    url: siteUrl,
    jobTitle: "Full-Stack Software Engineer",
  },
  publisher: {
    "@type": "Person",
    name: "David R. Fajardo",
    url: siteUrl,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Student Plan",
      price: "50.00",
      priceCurrency: "USD",
      url: `${siteUrl}/store/pricing/student`,
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      category: "Student",
    },
    {
      "@type": "Offer",
      name: "Starter Plan",
      price: "100.00",
      priceCurrency: "USD",
      url: `${siteUrl}/store/pricing/starter`,
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      category: "Individual",
    },
    {
      "@type": "Offer",
      name: "Pro Plan",
      price: "129.00",
      priceCurrency: "USD",
      url: `${siteUrl}/store/pricing/pro`,
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      category: "Professional",
    },
    {
      "@type": "Offer",
      name: "Enterprise Plan",
      price: "2000.00",
      priceCurrency: "USD",
      url: `${siteUrl}/store/pricing/enterprise`,
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      category: "Enterprise",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "1",
  },
  featureList: [
    "Turborepo monorepo with 6 apps",
    "Next.js 16 web application",
    "Hono REST API server",
    "React Native mobile app (Capacitor.js)",
    "Electron desktop application",
    "Admin dashboard",
    "Fumadocs documentation site",
    "shadcn/ui + Radix component library",
    "Prisma ORM with PostgreSQL",
    "NextAuth.js authentication",
    "Payment integration",
    "AI integrations (OpenAI, Anthropic, Google AI)",
    "Real-time WebSocket support",
    "SEO generator package",
    "Docker Compose for local development",
    "pnpm workspaces",
    "TypeScript throughout",
    "Tailwind CSS styling",
  ],
};

// JSON-LD: Breadcrumb navigation
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Store",
      item: `${siteUrl}/store`,
    },
  ],
};

// JSON-LD: FAQ Schema for common questions (great for SEO rich snippets)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SDK-TURBOREPO-STARTUP-EDITION?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SDK-TURBOREPO-STARTUP-EDITION is a production-ready Turborepo monorepo that lets you ship 6 apps (Web, API, Mobile, Desktop, Admin, and Docs) from one codebase. It includes 17 shared packages with authentication, payments, database, AI, real-time, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Is this a one-time payment or subscription?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a one-time payment. You pay once and get lifetime access to the codebase. No monthly fees, no recurring charges. Plans start at $50 for students.",
      },
    },
    {
      "@type": "Question",
      name: "How much development time does this save?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Based on industry estimates, building equivalent functionality from scratch would take 130-240 hours and cost $3,250-$6,000 in freelance development time. The SDK provides all of this ready to use.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies are included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SDK includes Next.js, Hono, React Native (Capacitor.js), Electron, Prisma, PostgreSQL, MongoDB, Redis, NextAuth.js, shadcn/ui, Tailwind CSS, TypeScript, Docker, and integrations for AI (OpenAI, Anthropic), payments, email, storage, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for commercial projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! The Starter plan ($100) and above include commercial use rights. The Student plan ($50) is for learning and thesis projects. The Pro plan ($129) includes white-label rights and lifetime updates.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods are accepted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Payments are processed securely through Lemon Squeezy, which accepts all major credit and debit cards worldwide. Lemon Squeezy handles all taxes and provides instant delivery of your purchase.",
      },
    },
  ],
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
