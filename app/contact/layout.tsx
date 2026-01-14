import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact David Fajardo | Get in Touch",
  description:
    "Contact David R. Fajardo - Full-Stack Developer and Software Engineer from Philippines. Available for freelance projects, full-time opportunities, and consultations. Get in touch to discuss your web development needs.",
  keywords: [
    "Contact David Fajardo",
    "David Fajardo Contact",
    "Hire David Fajardo",
    "David Fajardo Freelance",
    "David Fajardo Email",
    "Contact Full Stack Developer",
    "Contact Software Engineer Philippines",
    "Web Developer Contact",
    "Freelance Developer Contact",
    "David Fajardo Calendly",
    "David Fajardo Schedule",
  ],
  openGraph: {
    title: "Contact David Fajardo | Full-Stack Developer",
    description:
      "Get in touch with David R. Fajardo for web development projects, freelance opportunities, or consultations. Available for new projects.",
    type: "website",
    url: "https://www.davidfajardo.space/contact",
  },
  alternates: {
    canonical: "https://www.davidfajardo.space/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
