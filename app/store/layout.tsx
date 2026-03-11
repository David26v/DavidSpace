import type { Metadata } from "next";

const siteUrl = "https://www.davidfajardo.space";

export const metadata: Metadata = {
  title: "Store | Premium Templates & Developer Kits by David Fajardo",
  description:
    "Browse premium Next.js templates, UI kits, dashboards, and starter kits by David R. Fajardo. Production-ready code for React, Next.js, and modern web development. Save weeks of development time.",
  keywords: [
    "David Fajardo Store",
    "Next.js Templates",
    "React Templates",
    "Web Development Templates",
    "Dashboard Templates",
    "UI Kits",
    "Starter Kits",
    "Premium Templates",
    "Next.js Starter",
    "React Dashboard",
    "Software Templates",
    "David Fajardo Products",
    "Buy Web Templates",
    "Developer Tools",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Store | Premium Templates by David Fajardo",
    description:
      "Production-ready Next.js templates, dashboards, UI kits, and starter kits. Built by an experienced full-stack developer.",
    type: "website",
    url: `${siteUrl}/store`,
    locale: "en_US",
    siteName: "David R. Fajardo Portfolio",
    images: [
      {
        url: `${siteUrl}/logo_version_2.png`,
        width: 1200,
        height: 630,
        alt: "David Fajardo Store - Premium Templates & Developer Kits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Store | Premium Templates by David Fajardo",
    description:
      "Production-ready Next.js templates, dashboards, UI kits, and starter kits.",
    images: [`${siteUrl}/logo_version_2.png`],
  },
  alternates: {
    canonical: `${siteUrl}/store`,
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
