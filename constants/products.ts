// Product Types
export type ProductCategory = "all" | "starter-kits";
export type LicenseType = "student" | "starter" | "pro" | "enterprise" | "custom";

export type Product = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  image: string;
  images?: string[];
  price: {
    student: number;
    starter: number;
    pro: number;
    enterprise: number;
    custom: number;
  };
  originalPrice?: {
    student: number;
    starter: number;
    pro: number;
    enterprise: number;
    custom: number;
  };
  features: string[];
  techStack: string[];
  demoUrl?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviews: number;
  sales: number;
  stripeProductId?: string;
};

/**
 * Add new products by appending to this array.
 * The store page will automatically display them.
 */
export const PRODUCTS: Product[] = [
  {
    id: "sdk-launcher-turborepo",
    name: "SDK-TURBOREPO-STARTUP-EDITION",
    shortDescription:
      "Production-ready Turborepo monorepo for startups: Web, API, Mobile, Desktop, Admin & Docs in one codebase. One-time payment — save $1,000+ in development time.",
    description:
      "The ultimate monorepo boilerplate for startup companies. Ships 6 apps (Next.js web, Hono API, React Native mobile, Electron desktop, Admin dashboard, Docs) with 17 shared packages including Stripe payments, auth, AI integrations, real-time WebSockets, storage, email, security, and monitoring. Built on Turborepo + pnpm workspaces with Docker Compose for PostgreSQL, MongoDB, Redis. Includes free deployment guides, SEO generator, and full documentation. Skip months of boilerplate and thousands in AI token costs — launch your SaaS in days, not months.",
    category: "starter-kits",
    image: "/products/sdk-launcher.png",
    images: [
      "/products/sdk-launcher-1.png",
      "/products/sdk-launcher-2.png",
      "/products/sdk-launcher-3.png",
    ],
    price: { student: 5000, starter: 10000, pro: 12900, enterprise: 200000, custom: 0 },
    features: [
      "6 Apps: Web, API, Mobile, Desktop, Admin, Docs",
      "17 Shared Packages (Auth, Payments, AI, etc.)",
      "Stripe Billing & Enterprise Licensing",
      "NextAuth.js (Google, GitHub, Credentials)",
      "Prisma + PostgreSQL + MongoDB + Redis",
      "OpenAI, Anthropic & Google AI Integration",
      "Socket.io Real-time Support",
      "Vercel Blob / S3 / Cloudflare R2 Storage",
      "Email (Resend, SendGrid, Nodemailer)",
      "Security Suite (GeoIP, Threat Detection, Brute Force)",
      "Monitoring & Error Tracking",
      "Docker Compose Dev Environment",
      "Turborepo Remote Caching & Pipelines",
      "CLI Scaffolding Tool (create-launchkit)",
      "Full TypeScript, Tailwind CSS, shadcn/ui",
      "Built-in SEO Generator",
      "Free Deployment Guides (Vercel, Railway, Docker)",
      "Comprehensive Documentation",
    ],
    techStack: [
      "Turborepo",
      "Next.js 16",
      "Hono",
      "React Native",
      "Electron",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Stripe",
      "NextAuth.js",
      "Socket.io",
      "Tailwind CSS",
      "shadcn/ui",
      "Docker",
      "pnpm",
    ],
    demoUrl: undefined,
    isFeatured: true,
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviews: 0,
    sales: 0,
    stripeProductId: process.env.NEXT_PUBLIC_STRIPE_SDK_LAUNCHER_PRODUCT_ID,
  },
];

export const categories = [
  { id: "all", label: "All Products", icon: "✦" },
  { id: "starter-kits", label: "Starter Kits", icon: "◎" },
];

export const licenseInfo: Record<
  LicenseType,
  { name: string; description: string; features: string[] }
> = {
  student: {
    name: "Student",
    description: "For students & learners",
    features: [
      "Perfect for thesis & capstone",
      "6 months of saving time on setup",
      "Personal & educational use",
      "Community support",
      "Full documentation access",
      "Deployment guide included",
    ],
  },
  starter: {
    name: "Starter",
    description: "For solo devs & freelancers",
    features: [
      "Everything in Student",
      "Commercial use license",
      "Save 100+ hours of boilerplate",
      "SEO generator included",
      "1 year of updates",
      "Email support",
    ],
  },
  pro: {
    name: "Pro",
    description: "For teams & agencies",
    features: [
      "Everything in Starter",
      "Lifetime updates",
      "Priority support",
      "White-label rights",
      "SaaS & resale allowed",
      "Architecture guidance",
    ],
  },
  enterprise: {
    name: "Enterprise",
    description: "For companies & startups scaling fast",
    features: [
      "Everything in Pro",
      "Dedicated onboarding session",
      "1-on-1 architecture review with David",
      "Custom feature development (up to 20 hrs)",
      "Priority bug fixes & patches",
      "Dedicated Slack/Discord channel",
      "White-label & resale rights",
      "Production deployment assistance",
    ],
  },
  custom: {
    name: "Custom",
    description: "Custom software development",
    features: [
      "Tailored to your business",
      "Free consultation with David",
      "Custom feature development",
      "Full-stack engineering",
      "Dedicated support channel",
      "Project architecture review",
    ],
  },
};

/**
 * Detailed plan information for individual plan pages.
 * Each plan has extended descriptions, use cases, and feature breakdowns.
 */
export const planDetails: Record<
  LicenseType,
  {
    headline: string;
    subtitle: string;
    idealFor: string[];
    whyThisPlan: string;
    featuresDetailed: { title: string; description: string }[];
    included: string[];
    notIncluded: string[];
  }
> = {
  student: {
    headline: "Start Building Your Future",
    subtitle:
      "The perfect foundation for students, thesis projects, and anyone learning full-stack development. Save months of setup time and focus on what matters — learning and building.",
    idealFor: [
      "Computer science students working on thesis or capstone projects",
      "Self-taught developers learning full-stack architecture",
      "Bootcamp graduates building portfolio projects",
      "Hobbyists exploring modern web, mobile & desktop development",
    ],
    whyThisPlan:
      "Setting up a production-grade monorepo from scratch takes weeks of research and configuration. The Student plan gives you a battle-tested architecture so you can focus on learning how real-world apps are built — not fighting with tooling. Your thesis advisor will be impressed.",
    featuresDetailed: [
      {
        title: "Complete Monorepo Architecture",
        description:
          "6 pre-configured apps (Web, API, Mobile, Desktop, Admin, Docs) with shared packages. Understand how professional teams structure large codebases.",
      },
      {
        title: "Full Documentation",
        description:
          "Step-by-step guides explaining every package, every configuration, and every design decision. Learn by reading real production code.",
      },
      {
        title: "Deployment Guides",
        description:
          "Deploy your project to Vercel, Railway, Expo, and Electron Builder. Perfect for presenting a live demo of your thesis.",
      },
      {
        title: "6 Months of Updates",
        description:
          "Receive updates and improvements for 6 months. Enough time to complete your project with the latest best practices.",
      },
      {
        title: "Community Support",
        description:
          "Access to the community Discord where you can ask questions, share progress, and get help from other developers.",
      },
      {
        title: "Modern Tech Stack",
        description:
          "Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL — the exact technologies employers are looking for on your resume.",
      },
    ],
    included: [
      "Full source code (6 apps + 17 packages)",
      "Documentation & learning guides",
      "Deployment guides for all platforms",
      "6 months of updates",
      "Community Discord access",
      "Personal & educational use license",
    ],
    notIncluded: [
      "Commercial use",
      "SEO generator tool",
      "Priority support",
      "White-label rights",
    ],
  },
  starter: {
    headline: "Ship Your First Product Faster",
    subtitle:
      "Everything you need to go from idea to launched product. Stop wasting weeks on boilerplate and start building features that matter to your clients.",
    idealFor: [
      "Solo developers launching their first SaaS or product",
      "Freelancers building client projects faster",
      "Indie hackers who want to ship quickly",
      "Small teams starting a new venture",
    ],
    whyThisPlan:
      "As a solo dev or freelancer, your time is literally money. Every hour spent configuring auth, payments, or database schemas is an hour not spent on features your customers want. The Starter plan saves you 100+ hours of setup — that's $2,500+ at a $25/hr rate — for a fraction of the cost.",
    featuresDetailed: [
      {
        title: "Commercial Use License",
        description:
          "Build and deploy commercial products for yourself or your clients. Use it for unlimited personal commercial projects.",
      },
      {
        title: "Built-in SEO Generator",
        description:
          "Automatically generate meta tags, Open Graph data, structured data (JSON-LD), and sitemaps. Rank higher without the SEO headache.",
      },
      {
        title: "Stripe Payments Ready",
        description:
          "Accept payments from day one. Stripe Checkout, subscriptions, invoicing, and webhook handling — all pre-configured and tested.",
      },
      {
        title: "Authentication System",
        description:
          "NextAuth.js with Google, GitHub, and email/password providers. Session management, protected routes, and role-based access control.",
      },
      {
        title: "1 Year of Updates",
        description:
          "Stay current with framework updates, security patches, and new features for a full year. Never fall behind on dependencies.",
      },
      {
        title: "Email Support",
        description:
          "Stuck on something? Get direct email support with typical response times under 24 hours on business days.",
      },
    ],
    included: [
      "Everything in Student plan",
      "Commercial use license",
      "SEO generator tool",
      "1 year of updates",
      "Email support",
      "All deployment guides",
    ],
    notIncluded: [
      "Lifetime updates",
      "Priority support",
      "White-label rights",
      "SaaS resale rights",
    ],
  },
  pro: {
    headline: "Scale Without Limits",
    subtitle:
      "For teams and agencies building multiple products. Get lifetime updates, priority support, and the freedom to white-label and resell.",
    idealFor: [
      "Development agencies building products for clients",
      "Startup teams scaling their tech stack",
      "CTOs establishing their company's architecture foundation",
      "Experienced developers building multiple SaaS products",
    ],
    whyThisPlan:
      "When you're building for clients or scaling a startup, you need a foundation that won't hold you back. The Pro plan gives you lifetime updates so your stack never gets stale, white-label rights so you can rebrand for clients, and architecture guidance to make the right decisions from day one.",
    featuresDetailed: [
      {
        title: "Lifetime Updates",
        description:
          "Every update, every new feature, every security patch — forever. As Next.js, React, and the ecosystem evolve, your codebase stays current.",
      },
      {
        title: "Priority Support",
        description:
          "Jump to the front of the queue. Get responses within hours, not days. Includes code review and debugging assistance.",
      },
      {
        title: "White-Label Rights",
        description:
          "Rebrand the entire codebase for your clients. Remove all original branding and present it as your own work.",
      },
      {
        title: "SaaS & Resale Allowed",
        description:
          "Build SaaS products on top of this kit and charge your own customers. Create and sell templates or themes built on this foundation.",
      },
      {
        title: "Architecture Guidance",
        description:
          "Get advice on structuring your specific project. David will review your architecture decisions and suggest improvements.",
      },
      {
        title: "Multi-Project License",
        description:
          "Use it for unlimited projects — client work, personal products, internal tools. One purchase, unlimited value.",
      },
    ],
    included: [
      "Everything in Starter plan",
      "Lifetime updates",
      "Priority support (hours, not days)",
      "White-label rights",
      "SaaS & resale license",
      "Architecture guidance",
      "Multi-project use",
    ],
    notIncluded: [
      "Dedicated onboarding session",
      "Custom feature development",
      "Dedicated support channel",
    ],
  },
  enterprise: {
    headline: "Your Dedicated Development Partner",
    subtitle:
      "More than a boilerplate — a partnership. Get hands-on support from David, custom feature development, and a dedicated channel for your team. Built for companies that want to move fast and ship with confidence.",
    idealFor: [
      "Funded startups building their MVP or v2",
      "Companies migrating to a monorepo architecture",
      "Teams that need hands-on onboarding and guidance",
      "Businesses requiring custom integrations or features",
    ],
    whyThisPlan:
      "Hiring a senior full-stack engineer to set up your entire architecture costs $15,000–$30,000+ in salary alone — and takes months. The Enterprise plan gives you a production-ready foundation PLUS 20 hours of custom development from the engineer who built it. That's a $2,000 investment vs. months of hiring and onboarding. You're not buying a template — you're buying a head start with expert guidance.",
    featuresDetailed: [
      {
        title: "Dedicated Onboarding Session",
        description:
          "A live 1-on-1 video call where David walks your team through the entire codebase, architecture decisions, and best practices. Get your team productive in hours, not weeks.",
      },
      {
        title: "1-on-1 Architecture Review",
        description:
          "David reviews your specific business requirements and recommends how to adapt the codebase. Database schema design, API structure, deployment strategy — tailored to your needs.",
      },
      {
        title: "Custom Feature Development (Up to 20 Hours)",
        description:
          "Need a specific integration, custom API endpoint, or unique feature? Get up to 20 hours of development work from David to customize the kit for your exact use case.",
      },
      {
        title: "Priority Bug Fixes & Patches",
        description:
          "Found an issue? It goes to the top of the fix queue. Your production environment is treated with urgency.",
      },
      {
        title: "Dedicated Slack/Discord Channel",
        description:
          "A private channel for your team to ask questions, share code, and get real-time feedback. No waiting in public queues.",
      },
      {
        title: "Production Deployment Assistance",
        description:
          "David helps your team deploy to production. CI/CD pipeline setup, environment configuration, domain setup, SSL, monitoring — hands-on assistance until you're live.",
      },
    ],
    included: [
      "Everything in Pro plan",
      "Dedicated onboarding video call",
      "1-on-1 architecture review",
      "Up to 20 hours custom development",
      "Priority bug fixes",
      "Dedicated Slack/Discord channel",
      "Production deployment assistance",
      "Lifetime updates & priority support",
    ],
    notIncluded: [
      "Ongoing retainer (available separately)",
      "Full custom application development (see Custom plan)",
    ],
  },
  custom: {
    headline: "Built Exactly For You",
    subtitle:
      "Need something completely tailored? Let's talk. David is a full-stack software engineer available for custom projects — from MVPs to full-scale applications.",
    idealFor: [
      "Businesses needing a fully custom application",
      "Companies wanting ongoing development support",
      "Startups that need an extended technical partner",
      "Organizations with unique requirements beyond the SDK",
    ],
    whyThisPlan:
      "Sometimes a boilerplate isn't enough — you need a dedicated engineer who understands your vision. David brings years of full-stack experience building production apps for startups and enterprises. From initial consultation to deployed product, get a partner who treats your project like his own.",
    featuresDetailed: [
      {
        title: "Free Initial Consultation",
        description:
          "A no-obligation call to discuss your project, requirements, timeline, and budget. Get honest advice on the best path forward.",
      },
      {
        title: "Custom Application Development",
        description:
          "Full-stack development from scratch or building on top of the SDK. Web apps, APIs, mobile apps, desktop apps — whatever your project needs.",
      },
      {
        title: "Full-Stack Engineering",
        description:
          "Frontend, backend, database design, API architecture, DevOps, deployment — one engineer handling your entire technical stack.",
      },
      {
        title: "Project Architecture Review",
        description:
          "Already have a codebase? Get a thorough review with actionable recommendations for performance, security, and scalability.",
      },
      {
        title: "Dedicated Support Channel",
        description:
          "Direct line of communication throughout the project. Regular updates, code reviews, and milestone demos.",
      },
      {
        title: "Flexible Engagement",
        description:
          "Hourly, project-based, or retainer — choose the engagement model that works for your budget and timeline.",
      },
    ],
    included: [
      "Free consultation call",
      "Custom scope & timeline",
      "Full-stack development",
      "Architecture review",
      "Dedicated communication channel",
      "Flexible engagement models",
    ],
    notIncluded: [],
  },
};
