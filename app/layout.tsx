import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";

const inter = Inter({ subsets: ["latin"] });

// Base URL for your site
const siteUrl = "https://david-space--gules.vercel.app";

export const metadata: Metadata = {
  // Primary Meta Tags
  title: {
    default: "David R. Fajardo | Full-Stack Developer & Software Engineer",
    template: "%s | David R. Fajardo",
  },
  description:
    "David R. Fajardo is a Full-Stack Developer and Software Engineer from the Philippines specializing in Next.js, React, TypeScript, and modern web development. Building fast, secure, and scalable web applications.",
  keywords: [
    "David Fajardo",
    "David R. Fajardo",
    "David Fajardo Developer",
    "David Fajardo Software Engineer",
    "David Fajardo Philippines",
    "Full-Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Philippines Developer",
    "Freelance Developer",
    "Web Development Services",
    "Custom Web Applications",
    "UI/UX Developer",
  ],
  authors: [
    {
      name: "David R. Fajardo",
      url: siteUrl,
    },
  ],
  creator: "David R. Fajardo",
  publisher: "David R. Fajardo",
  
  // Favicon & Icons
  icons: {
    icon: [
      { url: "/NavLogo.png" },
      { url: "/NavLogo.png", sizes: "16x16", type: "image/png" },
      { url: "/NavLogo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/NavLogo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/NavLogo.png",
  },

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "David R. Fajardo Portfolio",
    title: "David R. Fajardo | Full-Stack Developer & Software Engineer",
    description:
      "Full-Stack Developer specializing in Next.js, React, and TypeScript. Building modern, fast, and secure web applications. Available for freelance and full-time opportunities.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // Create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "David R. Fajardo - Full-Stack Developer",
        type: "image/jpg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "David R. Fajardo | Full-Stack Developer & Software Engineer",
    description:
      "Full-Stack Developer specializing in Next.js, React, and TypeScript. Building modern web applications.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@davidfajardo", // Update with your Twitter handle
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your verification codes)
  verification: {
    google: "lB_JOawyvW4AZ88lXaHszxq493_pQO5xEbvcAQ3CdBA", 
  },

  // Canonical URL
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },

  // App-specific
  applicationName: "David R. Fajardo Portfolio",
  referrer: "origin-when-cross-origin",
  
  // Category
  category: "technology",

  // Other
  other: {
    "google-site-verification": "lB_JOawyvW4AZ88lXaHszxq493_pQO5xEbvcAQ3CdBA",
  },
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#030014" },
    { media: "(prefers-color-scheme: dark)", color: "#030014" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "David R. Fajardo",
      givenName: "David",
      familyName: "Fajardo",
      alternateName: ["David Fajardo", "David R Fajardo"],
      description:
        "Full-Stack Developer and Software Engineer specializing in Next.js, React, TypeScript, and modern web development.",
      url: siteUrl,
      image: `${siteUrl}/Profile.png`,
      email: "david.fajardo26v@gmail.com",
      telephone: "+639762594374",
      jobTitle: "Full-Stack Developer",
      worksFor: {
        "@type": "Organization",
        name: "Rooche Digital",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Caloocan City",
        addressCountry: "Philippines",
      },
      sameAs: [
        "https://github.com/David26v",
        "https://www.linkedin.com/in/david-fajardo",
        "https://www.facebook.com/LeL0uCh26/",
        "https://www.instagram.com/chinitz_david26/",
      ],
      knowsAbout: [
        "Web Development",
        "Software Engineering",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Supabase",
        "Tailwind CSS",
        "UI/UX Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "David R. Fajardo Portfolio",
      description:
        "Portfolio website of David R. Fajardo, Full-Stack Developer and Software Engineer",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "David R. Fajardo | Full-Stack Developer & Software Engineer",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      description:
        "David R. Fajardo is a Full-Stack Developer from the Philippines specializing in building modern web applications with Next.js, React, and TypeScript.",
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "David R. Fajardo Portfolio",
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#services`,
      name: "Services",
      itemListElement: [
        {
          "@type": "Service",
          name: "Web Development",
          description: "Custom web application development with Next.js and React",
        },
        {
          "@type": "Service",
          name: "Full-Stack Development",
          description: "End-to-end development from frontend to backend and database",
        },
        {
          "@type": "Service",
          name: "UI/UX Design",
          description: "User-centric interface design with modern aesthetics",
        },
        {
          "@type": "Service",
          name: "Consulting",
          description: "Technical consulting and code audits",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}