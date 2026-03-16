import type { Metadata } from "next";

const siteUrl = "https://www.davidfajardo.space";

export const metadata: Metadata = {
  title: "Pricing Plans — SDK-TURBOREPO-STARTUP-EDITION | From $50",
  description:
    "Choose the plan that fits your needs. Student ($50), Starter ($100), Pro ($129), Enterprise ($2,000), or Custom. One-time payment, lifetime access. Save 130–240 hours and $3,250–6,000 in development costs.",
  keywords: [
    "SDK Turborepo Pricing",
    "Monorepo Starter Kit Pricing",
    "Next.js Boilerplate Price",
    "SaaS Starter Kit Buy",
    "One-Time Payment Developer Kit",
    "Turborepo Template Pricing",
    "Full-Stack Starter Kit Cost",
    "cheap developer starter kit",
    "affordable monorepo template",
    "student developer kit discount",
    "enterprise SDK pricing",
    "buy Turborepo template",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pricing Plans — SDK-TURBOREPO-STARTUP-EDITION | From $50",
    description:
      "One-time payment. 5 plans from $50 to Enterprise. Ship 6 production-ready apps from one Turborepo monorepo. Save $3,250–6,000.",
    type: "website",
    url: `${siteUrl}/store/pricing`,
    locale: "en_US",
    siteName: "David R. Fajardo",
    images: [
      {
        url: `${siteUrl}/logo_version_2.png`,
        width: 1200,
        height: 630,
        alt: "SDK-TURBOREPO-STARTUP-EDITION Pricing Plans — From $50",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — SDK-TURBOREPO-STARTUP-EDITION | From $50",
    description:
      "One-time payment. 5 plans from $50. Ship 6 apps from one codebase.",
    images: [`${siteUrl}/logo_version_2.png`],
  },
  alternates: {
    canonical: `${siteUrl}/store/pricing`,
  },
};

// Pricing table JSON-LD
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "SDK-TURBOREPO-STARTUP-EDITION Pricing",
  description: "Compare pricing plans for the SDK-TURBOREPO-STARTUP-EDITION developer toolkit.",
  url: `${siteUrl}/store/pricing`,
  mainEntity: {
    "@type": "ItemList",
    name: "Pricing Plans",
    numberOfItems: 5,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Offer",
          name: "Student Plan",
          price: "50.00",
          priceCurrency: "USD",
          description: "For students and learners. Perfect for thesis projects and learning full-stack development.",
          url: `${siteUrl}/store/pricing/student`,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Offer",
          name: "Starter Plan",
          price: "100.00",
          priceCurrency: "USD",
          description: "For solo developers and freelancers. Includes 1 year updates and commercial use.",
          url: `${siteUrl}/store/pricing/starter`,
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Offer",
          name: "Pro Plan",
          price: "129.00",
          priceCurrency: "USD",
          description: "For teams and agencies. Lifetime updates, white-label rights, and priority support.",
          url: `${siteUrl}/store/pricing/pro`,
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Offer",
          name: "Enterprise Plan",
          price: "2000.00",
          priceCurrency: "USD",
          description: "For large teams. Includes 20 hours custom development and dedicated support.",
          url: `${siteUrl}/store/pricing/enterprise`,
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Offer",
          name: "Custom Plan",
          price: "0",
          priceCurrency: "USD",
          description: "Free consultation for custom full-stack development projects.",
          url: `${siteUrl}/store/pricing/custom`,
        },
      },
    ],
  },
};

// Breadcrumb for pricing page
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Store", item: `${siteUrl}/store` },
    { "@type": "ListItem", position: 3, name: "Pricing", item: `${siteUrl}/store/pricing` },
  ],
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
