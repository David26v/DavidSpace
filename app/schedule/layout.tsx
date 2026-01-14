import type { Metadata } from "next";

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
  ],
  alternates: {
    canonical: "https://www.davidfajardo.space/schedule",
  },
  openGraph: {
    title: "Schedule a Call | David R. Fajardo",
    description:
      "Book a free 30-minute discovery call to discuss your project and goals.",
    type: "website",
    url: "https://www.davidfajardo.space/schedule",
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
