import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";

const inter = Inter({ subsets: ["latin"] });

// Base URL for your site
const siteUrl = "https://www.davidfajardo.space";

export const metadata: Metadata = {
  // Primary Meta Tags
  title: {
    default: "David R. Fajardo | Full-Stack Developer & Software Engineer",
    template: "%s | David R. Fajardo",
  },
  description:
    "David R. Fajardo - Expert Full-Stack Developer and Software Engineer from Caloocan City, Philippines. Specializing in Next.js, React, TypeScript, Node.js, and modern web development. Building fast, secure, and scalable web applications. Available for freelance and full-time opportunities. Contact for web development services.",
  keywords: [
    "David Fajardo",
    "David R. Fajardo",
    "David R Fajardo",
    "David Rodrigo Fajardo",
    "David Fajardo Developer",
    "David R. Fajardo Developer",
    "David Fajardo Software Engineer",
    "David R. Fajardo Software Engineer",
    "David Fajardo Full Stack Developer",
    "David R. Fajardo Full Stack Developer",
    "David Fajardo Philippines",
    "David R. Fajardo Philippines",
    "David Fajardo Caloocan",
    "David R. Fajardo Caloocan",
    "David Fajardo Portfolio",
    "David R. Fajardo Portfolio",
    "David Fajardo Web Developer",
    "David R. Fajardo Web Developer",
    "David Fajardo React Developer",
    "David R. Fajardo React Developer",
    "David Fajardo Nextjs Developer",
    "David R. Fajardo Nextjs Developer",
    "David Fajardo Freelance",
    "David R. Fajardo Freelance",
    "David Fajardo Contact",
    "David R. Fajardo Contact",
    "David Fajardo Services",
    "David R. Fajardo Services",
    "Full-Stack Developer",
    "Full Stack Developer Philippines",
    "Full Stack Developer Caloocan",
    "Software Engineer",
    "Software Engineer Philippines",
    "Web Developer",
    "Web Developer Philippines",
    "Web Developer Caloocan",
    "React Developer",
    "React Developer Philippines",
    "Nextjs Developer",
    "Nextjs Developer Philippines",
    "TypeScript Developer",
    "Frontend Developer",
    "Frontend Developer Philippines",
    "Backend Developer",
    "Backend Developer Philippines",
    "Philippines Developer",
    "Philippines Software Engineer",
    "Filipino Developer",
    "Filipino Software Engineer",
    "Freelance Developer",
    "Freelance Developer Philippines",
    "Freelance Web Developer",
    "Web Development Services",
    "Custom Web Applications",
    "Custom Software Development",
    "UI/UX Developer",
    "UI/UX Designer Philippines",
    "Nextjs Expert",
    "React Expert",
    "Supabase Developer",
    "PostgreSQL Developer",
    "Node.js Developer",
    "Mobile App Developer",
    "Java Developer",
    "Kotlin Developer",
    "Ruby on Rails Developer",
    "Laravel Developer",
    "Database Developer",
    "API Development",
    "E-commerce Developer",
    "SaaS Developer",
    "Startup Developer",
    "Rooche Digital",
    "Jeonsoft Developer",
    "Quickstore Developer",
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
      "David R. Fajardo - Expert Full-Stack Developer from Philippines specializing in Next.js, React, TypeScript, Node.js, and Supabase. Building modern, fast, and secure web applications. 10+ projects delivered. Available for freelance and full-time opportunities.",
    images: [
      {
        url: `${siteUrl}/logo_version_2.png`,
        width: 1200,
        height: 630,
        alt: "David R. Fajardo - Full-Stack Developer & Software Engineer",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "David R. Fajardo | Full-Stack Developer & Software Engineer",
    description:
      "David R. Fajardo - Full-Stack Developer and Software Engineer from Philippines. Expert in Next.js, React, TypeScript, and modern web development. Building fast, secure applications.",
    images: [`${siteUrl}/logo_version_2.png`],
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
    google: "vUNBAUtbXaVvcLOfBhuxwyDo31OVXyw4E_kMB38Vcig", 
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
    "google-site-verification": "vUNBAUtbXaVvcLOfBhuxwyDo31OVXyw4E_kMB38Vcig",
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
        "David R. Fajardo is an expert Full-Stack Developer and Software Engineer from Caloocan City, Philippines, specializing in Next.js, React, TypeScript, Node.js, Supabase, and modern web development. Building fast, secure, and scalable web applications with 10+ projects delivered.",
      url: siteUrl,
      image: `${siteUrl}/og-image.jpg`,
      email: "david.fajardo26v@gmail.com",
      telephone: "+639762594374",
      jobTitle: ["Full-Stack Developer", "Software Engineer", "Web Developer"],
      worksFor: [
        {
          "@type": "Organization",
          name: "Rooche Digital",
          jobTitle: "Software Engineer",
        },
      ],
      alumniOf: {
        "@type": "Organization",
        name: "Jeonsoft Corporation",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Caloocan City",
        addressRegion: "Metro Manila",
        addressCountry: "Philippines",
      },
      nationality: {
        "@type": "Country",
        name: "Philippines",
      },
      sameAs: [
        "https://github.com/David26v",
        "https://www.linkedin.com/in/david-rodrigo-fajardo/",
        "https://www.instagram.com/vid_26.fajardo/",
      ],
      knowsAbout: [
        "Web Development",
        "Full-Stack Development",
        "Software Engineering",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Supabase",
        "Tailwind CSS",
        "UI/UX Design",
        "Frontend Development",
        "Backend Development",
        "API Development",
        "Database Design",
        "Mobile Development",
        "Java",
        "Kotlin",
        "Ruby on Rails",
        "Laravel",
      ],
      offers: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          serviceType: "Web Development Services",
          areaServed: "Worldwide",
          availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: `${siteUrl}/contact`,
          },
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "David R. Fajardo Portfolio",
      description:
        "Portfolio website of David R. Fajardo - Expert Full-Stack Developer and Software Engineer from Philippines specializing in Next.js, React, TypeScript, and modern web development",
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
        "David R. Fajardo is an expert Full-Stack Developer and Software Engineer from Caloocan City, Philippines, specializing in building modern, fast, and secure web applications with Next.js, React, TypeScript, Node.js, and Supabase.",
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
          description: "Custom web application development with Next.js, React, and TypeScript",
          provider: {
            "@id": `${siteUrl}/#person`,
          },
        },
        {
          "@type": "Service",
          name: "Full-Stack Development",
          description: "End-to-end development from frontend to backend and database with Node.js, PostgreSQL, and Supabase",
          provider: {
            "@id": `${siteUrl}/#person`,
          },
        },
        {
          "@type": "Service",
          name: "UI/UX Design",
          description: "User-centric interface design with modern aesthetics and responsive layouts",
          provider: {
            "@id": `${siteUrl}/#person`,
          },
        },
        {
          "@type": "Service",
          name: "Mobile App Development",
          description: "Cross-platform mobile applications with React Native, Java, and Kotlin",
          provider: {
            "@id": `${siteUrl}/#person`,
          },
        },
        {
          "@type": "Service",
          name: "Consulting",
          description: "Technical consulting, code audits, and architecture reviews",
          provider: {
            "@id": `${siteUrl}/#person`,
          },
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#professional-service`,
      name: "David R. Fajardo - Web Development Services",
      description: "Full-Stack Web Development and Software Engineering Services",
      provider: {
        "@id": `${siteUrl}/#person`,
      },
      areaServed: "Worldwide",
      serviceType: "Web Development",
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