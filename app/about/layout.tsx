import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | David R. Fajardo - Full-Stack Developer",
  description:
    "Learn more about David R. Fajardo, a Full-Stack Developer and Software Engineer from Caloocan City, Philippines. With 2+ years of experience building modern web applications using Next.js, React, TypeScript, and Node.js. Available for freelance and full-time opportunities.",
  keywords: [
    "David Fajardo About",
    "David R. Fajardo Biography",
    "David Fajardo Background",
    "David Fajardo Experience",
    "David Fajardo Skills",
    "Full-Stack Developer Philippines",
    "Software Engineer Philippines",
    "Web Developer Caloocan",
    "React Developer Philippines",
    "Next.js Developer Philippines",
    "Filipino Developer",
    "Freelance Developer Philippines",
    "David Fajardo Portfolio",
    "David Fajardo Resume",
    "David Fajardo Career",
    "David Fajardo Education",
    "Hire David Fajardo",
  ],
  alternates: {
    canonical: "https://www.davidfajardo.space/about",
  },
  openGraph: {
    title: "About David R. Fajardo | Full-Stack Developer & Software Engineer",
    description:
      "Full-Stack Developer from the Philippines with 2+ years of experience. Specializing in Next.js, React, TypeScript, and building scalable web applications.",
    type: "profile",
    url: "https://www.davidfajardo.space/about",
    siteName: "David R. Fajardo",
    locale: "en_US",
    images: [
      {
        url: "https://www.davidfajardo.space/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "David R. Fajardo - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About David R. Fajardo | Full-Stack Developer",
    description:
      "Full-Stack Developer from the Philippines specializing in Next.js, React, and modern web development.",
    images: ["https://www.davidfajardo.space/og-image.jpg"],
  },
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
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // About page JSON-LD
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About David R. Fajardo",
    description:
      "Learn more about David R. Fajardo, a Full-Stack Developer and Software Engineer from the Philippines.",
    url: "https://www.davidfajardo.space/about",
    mainEntity: {
      "@type": "Person",
      "@id": "https://www.davidfajardo.space/#person",
      name: "David R. Fajardo",
      givenName: "David",
      familyName: "Fajardo",
      additionalName: "R.",
      jobTitle: "Full-Stack Developer",
      description:
        "Expert Full-Stack Developer and Software Engineer specializing in Next.js, React, TypeScript, and modern web development.",
      url: "https://www.davidfajardo.space",
      email: "david.fajardo26v@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Caloocan City",
        addressRegion: "Metro Manila",
        addressCountry: "Philippines",
      },
      sameAs: [
        "https://github.com/David26v",
        "https://www.linkedin.com/in/david-rodrigo-fajardo/",
        "https://www.instagram.com/vid_26.fajardo/",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {children}
    </>
  );
}
