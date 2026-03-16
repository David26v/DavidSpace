import type { Metadata } from "next";
import { licenseInfo, planDetails, PRODUCTS, type LicenseType } from "@/constants/products";

const siteUrl = "https://www.davidfajardo.space";
const product = PRODUCTS[0];
const validPlans: LicenseType[] = ["student", "starter", "pro", "enterprise", "custom"];

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plan: string }>;
}): Promise<Metadata> {
  const { plan } = await params;

  if (!validPlans.includes(plan as LicenseType)) {
    return { title: "Plan Not Found" };
  }

  const planId = plan as LicenseType;
  const info = licenseInfo[planId];
  const details = planDetails[planId];
  const price = product.price[planId];
  const isCustom = planId === "custom";

  const priceText = isCustom ? "Free Consultation" : formatPrice(price);
  const title = `${info.name} Plan (${priceText}) — SDK-TURBOREPO-STARTUP-EDITION`;
  const description = `${details.headline}. ${details.subtitle.slice(0, 140)}. One-time payment, ${isCustom ? "free consultation" : `only ${priceText}`}. Ship 6 production-ready apps.`;

  return {
    title,
    description,
    keywords: [
      `SDK Turborepo ${info.name} Plan`,
      `${info.name} Developer Kit`,
      `buy ${info.name.toLowerCase()} developer kit`,
      "Turborepo Starter Kit",
      "Next.js Monorepo Boilerplate",
      "Full-Stack Starter Kit",
      "One-Time Payment SDK",
      `${priceText} developer kit`,
      "monorepo template purchase",
    ],
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteUrl}/store/pricing/${plan}`,
      locale: "en_US",
      siteName: "David R. Fajardo",
      images: [
        {
          url: `${siteUrl}/logo_version_2.png`,
          width: 1200,
          height: 630,
          alt: `${info.name} Plan — SDK-TURBOREPO-STARTUP-EDITION`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${info.name} Plan (${priceText}) — SDK-TURBOREPO-STARTUP-EDITION`,
      description,
      images: [`${siteUrl}/logo_version_2.png`],
    },
    alternates: {
      canonical: `${siteUrl}/store/pricing/${plan}`,
    },
  };
}

// Generate JSON-LD for each plan page (runs server-side)
function generatePlanJsonLd(plan: string) {
  if (!validPlans.includes(plan as LicenseType)) return null;

  const planId = plan as LicenseType;
  const info = licenseInfo[planId];
  const details = planDetails[planId];
  const price = product.price[planId];
  const isCustom = planId === "custom";

  // Product offer schema
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `SDK-TURBOREPO-STARTUP-EDITION — ${info.name} Plan`,
    description: details.headline,
    image: `${siteUrl}/logo_version_2.png`,
    url: `${siteUrl}/store/pricing/${plan}`,
    brand: {
      "@type": "Person",
      name: "David R. Fajardo",
    },
    offers: isCustom
      ? {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Free consultation for custom projects",
          url: `${siteUrl}/contact?ref=custom`,
        }
      : {
          "@type": "Offer",
          price: (price / 100).toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2027-12-31",
          url: `${siteUrl}/store/pricing/${plan}`,
          seller: {
            "@type": "Person",
            name: "David R. Fajardo",
          },
        },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      reviewCount: "1",
    },
  };

  // Breadcrumb
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Store", item: `${siteUrl}/store` },
      { "@type": "ListItem", position: 3, name: "Pricing", item: `${siteUrl}/store/pricing` },
      { "@type": "ListItem", position: 4, name: `${info.name} Plan`, item: `${siteUrl}/store/pricing/${plan}` },
    ],
  };

  return { offerJsonLd, breadcrumbJsonLd };
}

export default async function PlanLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ plan: string }>;
}) {
  const { plan } = await params;
  const jsonLd = generatePlanJsonLd(plan);

  if (!jsonLd) return children;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.offerJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
