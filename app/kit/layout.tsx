import type { Metadata } from "next";

const siteUrl = "https://www.davidfajardo.space";

export const metadata: Metadata = {
  title: "Turborepo Boilerplate Kit | Web + Mobile + Desktop in One Repo",
  description:
    "A production-ready Turborepo monorepo boilerplate that handles Next.js web apps, React Native mobile apps, and Electron desktop apps in a single repository. Shared UI, shared logic, one codebase.",
  keywords: [
    "Turborepo boilerplate",
    "monorepo starter kit",
    "Next.js React Native Electron",
    "cross-platform development",
    "full-stack monorepo",
    "Turborepo template",
    "monorepo boilerplate",
    "shared UI components",
    "pnpm workspaces",
    "React Native monorepo",
    "Electron monorepo",
    "Next.js monorepo",
    "David Fajardo Kit",
    "production-ready boilerplate",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Turborepo Boilerplate Kit | Web + Mobile + Desktop",
    description:
      "Ship web, mobile, and desktop apps from a single codebase. Production-ready Turborepo monorepo with shared components, shared logic, zero duplication.",
    type: "website",
    url: `${siteUrl}/kit`,
    locale: "en_US",
    siteName: "David R. Fajardo Portfolio",
    images: [
      {
        url: `${siteUrl}/logo_version_2.png`,
        width: 1200,
        height: 630,
        alt: "Turborepo Boilerplate Kit - Web, Mobile & Desktop in One Repo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turborepo Boilerplate Kit | Web + Mobile + Desktop",
    description:
      "Ship web, mobile, and desktop apps from a single codebase with this production-ready Turborepo monorepo.",
    images: [`${siteUrl}/logo_version_2.png`],
  },
  alternates: {
    canonical: `${siteUrl}/kit`,
  },
};

export default function KitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
