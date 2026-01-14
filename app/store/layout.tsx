import type { Metadata } from "next";

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
  ],
  openGraph: {
    title: "Store | Premium Templates by David Fajardo",
    description:
      "Production-ready Next.js templates, dashboards, UI kits, and starter kits. Built by an experienced full-stack developer.",
    type: "website",
    url: "https://www.davidfajardo.space/store",
  },
  alternates: {
    canonical: "https://www.davidfajardo.space/store",
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
