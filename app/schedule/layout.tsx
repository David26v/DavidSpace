import type { Metadata } from "next";

const siteUrl = "https://www.davidfajardo.space";

export const metadata: Metadata = {
  title: "Schedule a Call | David R. Fajardo",
  description:
    "Book a free 30-minute discovery call with David R. Fajardo to discuss your project, goals, and how I can help. Pick a time that works for you.",
  keywords: [
    "Schedule Call",
    "Book Consultation",
    "David Fajardo Schedule",
    "Free Consultation",
    "Discovery Call",
    "Project Discussion",
    "Web Development Consultation",
    "Hire Developer Philippines",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Schedule a Call | David R. Fajardo",
    description:
      "Book a free 30-minute discovery call to discuss your project and goals.",
    type: "website",
    url: `${siteUrl}/schedule`,
    locale: "en_US",
    siteName: "David R. Fajardo Portfolio",
    images: [
      {
        url: `${siteUrl}/logo_version_2.png`,
        width: 1200,
        height: 630,
        alt: "Schedule a Call with David R. Fajardo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule a Call | David R. Fajardo",
    description:
      "Book a free 30-minute discovery call to discuss your project and goals.",
    images: [`${siteUrl}/logo_version_2.png`],
  },
  alternates: {
    canonical: `${siteUrl}/schedule`,
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
