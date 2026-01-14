import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | David R. Fajardo - Web Developer & Software Engineer",
  description:
    "Developer blog by David R. Fajardo covering clean code practices, debugging workflows, AI-assisted development, QA-developer collaboration, team leadership, employee compensation, and practical programming tips for building quality software.",
  keywords: [
    "David Fajardo Blog",
    "David R. Fajardo Blog",
    "David Fajardo Developer",
    "Web Development Blog",
    "Programming Blog",
    "Software Engineering Blog",
    "Clean Code Tips",
    "Debugging Techniques",
    "AI Coding Tools",
    "Developer Productivity",
    "Next.js Tutorial",
    "React Best Practices",
    "Full Stack Developer Blog",
    "Code Quality",
    "Software Development",
    "Tech Blog Philippines",
    "Filipino Developer",
    "QA Developer Collaboration",
    "Software Quality Assurance",
    "Team Building",
    "Tech Leadership",
    "Employee Compensation",
    "Developer Career Growth",
    "Software Team Management",
  ],
  alternates: {
    canonical: "https://www.davidfajardo.space/blog",
  },
  openGraph: {
    title: "Blog | David R. Fajardo - Web Developer",
    description:
      "Practical articles on clean code, debugging, AI tools for developers, and web performance by David R. Fajardo.",
    type: "website",
    url: "https://www.davidfajardo.space/blog",
    siteName: "David R. Fajardo",
    locale: "en_US",
    images: [
      {
        url: "https://www.davidfajardo.space/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "David R. Fajardo Blog - Web Development & Programming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | David R. Fajardo - Web Developer",
    description:
      "Practical articles on clean code, debugging, AI tools for developers, and web performance.",
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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  // Blog listing JSON-LD structured data
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "David R. Fajardo Blog",
    description:
      "Developer blog covering clean code, debugging, AI-assisted development, QA-developer collaboration, tech leadership, employee compensation, and building quality software.",
    url: "https://www.davidfajardo.space/blog",
    author: {
      "@type": "Person",
      name: "David R. Fajardo",
      url: "https://www.davidfajardo.space",
      jobTitle: "Full-Stack Web Developer",
      sameAs: [
        "https://github.com/David26v",
        "https://www.linkedin.com/in/david-rodrigo-fajardo/",
        "https://www.instagram.com/vid_26.fajardo/",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "David R. Fajardo",
    },
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      {children}
    </>
  );
}

