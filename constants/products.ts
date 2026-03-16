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
      "The perfect foundation for students, thesis projects, and anyone learning full-stack development. Get 3 production-ready apps and 7 shared packages to skip weeks of setup.",
    idealFor: [
      "Computer science students working on thesis or capstone projects",
      "Self-taught developers learning full-stack architecture",
      "Bootcamp graduates building portfolio projects",
      "Hobbyists exploring modern web development",
    ],
    whyThisPlan:
      "Setting up a production-grade monorepo from scratch takes weeks of research and configuration. The Student plan gives you a battle-tested architecture so you can focus on learning how real-world apps are built — not fighting with tooling. Your thesis advisor will be impressed.",
    featuresDetailed: [
      {
        title: "3 Production-Ready Apps",
        description:
          "Next.js web app, Hono REST API server, and Fumadocs documentation site — all pre-configured in a Turborepo monorepo with shared dependencies.",
      },
      {
        title: "7 Shared Packages",
        description:
          "UI components (shadcn/ui + Radix), Prisma database layer, NextAuth.js authentication, shared TypeScript utilities, email system, plus ESLint and TypeScript configs.",
      },
      {
        title: "Full Documentation Site",
        description:
          "A Fumadocs-powered documentation site (apps/docs) that you can customize for your own project. Includes step-by-step setup guides.",
      },
      {
        title: "Authentication System",
        description:
          "NextAuth.js with Google, GitHub, and email/password providers. Session management, protected routes, and role-based access control — ready out of the box.",
      },
      {
        title: "Prisma + PostgreSQL Database",
        description:
          "Complete database layer with Prisma ORM, PostgreSQL schema, migrations, seed data, and Docker Compose for local development.",
      },
      {
        title: "Vercel & Docker Deployment",
        description:
          "Deployment guides for Vercel (web + docs) and Docker (API server). Perfect for presenting a live demo of your thesis or portfolio project.",
      },
    ],
    included: [
      "3 apps: Web (Next.js), API (Hono), Docs (Fumadocs)",
      "7 packages: UI, Database, Auth, Shared, Email, ESLint config, TypeScript config",
      "Docker Compose for local PostgreSQL",
      "Deployment guides: Vercel + Docker",
      "Full documentation & setup guides",
      "Personal & educational use license",
    ],
    notIncluded: [
      "Mobile app (Capacitor.js)",
      "Desktop app (Electron)",
      "Admin dashboard",
      "Payments package (Stripe)",
      "AI integration package",
      "SEO package",
      "Commercial use",
    ],
  },
  starter: {
    headline: "Ship Your First Product Faster",
    subtitle:
      "4 apps, 13 packages, and everything you need to go from idea to launched product — including mobile. Stop wasting weeks on boilerplate.",
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
        title: "4 Production-Ready Apps",
        description:
          "Everything in Student plus a Capacitor.js mobile app (iOS & Android). Build web, API, mobile, and docs from one codebase.",
      },
      {
        title: "13 Shared Packages",
        description:
          "Everything in Student plus Stripe payments, file storage (Vercel Blob/S3/R2), AI integrations (OpenAI, Anthropic), SEO tools, CLI scaffolding, and security utilities.",
      },
      {
        title: "Stripe Payments Ready",
        description:
          "Accept payments from day one. Stripe Checkout, subscriptions, invoicing, and webhook handling — all pre-configured and tested in the payments package.",
      },
      {
        title: "Built-in SEO Package",
        description:
          "The @launchkit/seo package auto-generates meta tags, Open Graph data, structured data (JSON-LD), and sitemaps. Rank higher without the SEO headache.",
      },
      {
        title: "AI Integration Package",
        description:
          "Pre-configured AI package with OpenAI, Anthropic (Claude), and Google AI providers. Add AI features to your app in minutes, not days.",
      },
      {
        title: "4 Deployment Guides",
        description:
          "Step-by-step deployment configs for Vercel, Docker, Railway, and Render. Each guide includes environment setup, CI/CD, and production-ready configs.",
      },
    ],
    included: [
      "4 apps: Web, API, Mobile (Capacitor.js), Docs",
      "13 packages: Student + Payments, Storage, AI, SEO, Security, CLI",
      "Stripe billing & subscription system",
      "AI integration (OpenAI, Anthropic, Google)",
      "File storage (Vercel Blob, S3, Cloudflare R2)",
      "4 deployment guides: Vercel, Docker, Railway, Render",
      "Commercial use license",
      "Email support",
    ],
    notIncluded: [
      "Desktop app (Electron)",
      "Admin dashboard",
      "Real-time WebSockets (Socket.io)",
      "MongoDB/NoSQL package",
      "Monitoring & error tracking",
      "Notification system",
      "White-label rights",
    ],
  },
  pro: {
    headline: "The Complete SDK — Everything Included",
    subtitle:
      "All 6 apps, all 18 packages, all 7 deployment guides. The full monorepo with desktop, admin dashboard, real-time, monitoring, and everything else.",
    idealFor: [
      "Development agencies building products for clients",
      "Startup teams scaling their tech stack",
      "CTOs establishing their company's architecture foundation",
      "Experienced developers building multiple SaaS products",
    ],
    whyThisPlan:
      "When you're building for clients or scaling a startup, you need a foundation that won't hold you back. The Pro plan gives you the complete SDK — every app, every package, every deployment guide. White-label it for clients, build SaaS products on top, or use it as the foundation for your next startup.",
    featuresDetailed: [
      {
        title: "All 6 Apps",
        description:
          "Web (Next.js), API (Hono), Mobile (Capacitor.js), Desktop (Electron), Admin Dashboard, and Docs (Fumadocs). Every platform covered in one monorepo.",
      },
      {
        title: "All 18 Packages",
        description:
          "Everything in Starter plus real-time WebSockets (Socket.io), MongoDB/NoSQL, monitoring & error tracking, notification system, and more. Every package the SDK offers.",
      },
      {
        title: "Electron Desktop App",
        description:
          "A pre-configured Electron app for macOS, Windows, and Linux. Auto-updates, native menus, system tray, and IPC communication — all wired up.",
      },
      {
        title: "Admin Dashboard",
        description:
          "A full admin panel with user management, analytics, content moderation, system logs, and role-based access control. Ready for production.",
      },
      {
        title: "Real-time & Monitoring",
        description:
          "Socket.io WebSocket package for live features (chat, notifications, dashboards) plus monitoring package for error tracking and performance metrics.",
      },
      {
        title: "All 7 Deployment Guides",
        description:
          "Vercel, Docker, Railway, Render, AWS, GCP, and Kubernetes. Full production configs including CI/CD pipelines, auto-scaling, and security headers.",
      },
    ],
    included: [
      "All 6 apps: Web, API, Mobile, Desktop, Admin, Docs",
      "All 18 packages: UI, Database, Auth, Payments, Storage, AI, SEO, Email, Security, Monitoring, Real-time, Notifications, NoSQL, Shared, CLI, ESLint, TypeScript configs",
      "All 7 deployment guides: Vercel, Docker, Railway, Render, AWS, GCP, Kubernetes",
      "White-label rights — rebrand for clients",
      "SaaS & resale license",
      "Commercial use for unlimited projects",
      "Priority support",
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
      "The complete SDK plus hands-on support from David. Get all 6 apps, all 18 packages, custom development hours, and a dedicated channel for your team.",
    idealFor: [
      "Funded startups building their MVP or v2",
      "Companies migrating to a monorepo architecture",
      "Teams that need hands-on onboarding and guidance",
      "Businesses requiring custom integrations or features",
    ],
    whyThisPlan:
      "Hiring a senior full-stack engineer to set up your entire architecture costs $15,000–$30,000+ in salary alone — and takes months. The Enterprise plan gives you the complete SDK PLUS 20 hours of custom development from the engineer who built it. You're not buying a template — you're buying a head start with expert guidance.",
    featuresDetailed: [
      {
        title: "Complete SDK (Same as Pro)",
        description:
          "All 6 apps (Web, API, Mobile, Desktop, Admin, Docs), all 18 packages, and all 7 deployment guides. The full monorepo — everything the SDK offers.",
      },
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
      "Everything in Pro plan (all 6 apps, all 18 packages, all 7 deploy guides)",
      "Dedicated onboarding video call",
      "1-on-1 architecture review with David",
      "Up to 20 hours custom development",
      "Priority bug fixes & patches",
      "Dedicated Slack/Discord channel",
      "Production deployment assistance",
      "White-label & resale rights",
    ],
    notIncluded: [
      "Ongoing retainer (available separately)",
      "Full custom application development (see Custom plan)",
    ],
  },
  custom: {
    headline: "Built Exactly for You",
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

/**
 * Q&A for each plan detail page.
 * Tier-specific questions buyers commonly ask.
 */
export const planQA: Record<
  LicenseType,
  { question: string; answer: string }[]
> = {
  student: [
    {
      question: "Can I use this for my thesis or capstone project?",
      answer:
        "Yes! The Student plan is designed exactly for this. You get a Next.js web app, Hono API server, and a Fumadocs documentation site — perfect for demonstrating a full-stack architecture in your thesis defense.",
    },
    {
      question: "Which apps and packages do I get?",
      answer:
        "You get 3 apps (Web, API, Docs) and 7 packages (UI components, Database/Prisma, Auth/NextAuth.js, Shared utilities, Email, ESLint config, TypeScript config). This covers everything needed for a production-grade web application.",
    },
    {
      question: "Can I deploy my project for free?",
      answer:
        "Yes. The Student plan includes deployment guides for Vercel (free tier available) and Docker. You can deploy your web app and docs to Vercel for free, and run your API server in a Docker container.",
    },
    {
      question: "Can I use this commercially or for freelance work?",
      answer:
        "No. The Student plan is for personal and educational use only. If you need to build commercial products or client work, upgrade to the Starter or Pro plan.",
    },
    {
      question: "Do I get the mobile, desktop, or admin apps?",
      answer:
        "No. The Student plan includes the Web, API, and Docs apps. Mobile (Capacitor.js), Desktop (Electron), and Admin Dashboard are available in higher tiers.",
    },
    {
      question: "What happens after I purchase?",
      answer:
        "You'll receive a GitHub invitation to a private repository containing your SDK code. Accept the invite, clone the repo, and follow the setup guide. The entire process takes about 15 minutes.",
    },
  ],
  starter: [
    {
      question: "Which apps and packages do I get?",
      answer:
        "You get 4 apps (Web, API, Mobile, Docs) and 13 packages including everything in Student plus Stripe payments, file storage (Vercel Blob/S3/R2), AI integrations (OpenAI, Anthropic, Google), SEO tools, CLI scaffolding tool, and security utilities.",
    },
    {
      question: "Can I build commercial products with this?",
      answer:
        "Yes. The Starter plan includes a commercial use license. You can build and deploy products for yourself or your clients. Use it for unlimited personal commercial projects.",
    },
    {
      question: "Does the mobile app work on both iOS and Android?",
      answer:
        "Yes. The mobile app uses Capacitor.js which compiles to native iOS and Android apps from a single codebase. It shares UI components and API logic with your web app.",
    },
    {
      question: "What payment system is included?",
      answer:
        "The @launchkit/payments package includes Stripe Checkout, subscriptions, invoicing, webhook handling, and customer portal — all pre-configured and tested. Just add your Stripe keys.",
    },
    {
      question: "What AI integrations are included?",
      answer:
        "The @launchkit/ai package supports OpenAI (GPT-4, DALL-E), Anthropic (Claude), and Google AI. It includes chat completions, embeddings, and image generation with provider switching.",
    },
    {
      question: "Do I get the Desktop app or Admin dashboard?",
      answer:
        "No. The Starter plan focuses on web and mobile. Desktop (Electron) and Admin Dashboard are available in the Pro plan. You also don't get real-time WebSockets, MongoDB, monitoring, or notifications packages.",
    },
    {
      question: "Can I white-label or resell this?",
      answer:
        "No. White-label and resale rights are only available in the Pro plan. The Starter plan is for your own commercial projects.",
    },
  ],
  pro: [
    {
      question: "What exactly do I get with the Pro plan?",
      answer:
        "Everything. All 6 apps (Web, API, Mobile, Desktop, Admin, Docs), all 18 packages, and all 7 deployment guides (Vercel, Docker, Railway, Render, AWS, GCP, Kubernetes). This is the complete SDK.",
    },
    {
      question: "Can I rebrand this for my clients?",
      answer:
        "Yes. The Pro plan includes full white-label rights. Remove all original branding, add your own, and deliver it to clients as your own work.",
    },
    {
      question: "Can I build SaaS products and charge customers?",
      answer:
        "Yes. The Pro plan includes SaaS and resale rights. Build subscription products, sell templates, or create services on top of this foundation.",
    },
    {
      question: "What deployment options do I get?",
      answer:
        "All 7: Vercel (web + docs), Docker (any server), Railway (managed hosting), Render (managed hosting), AWS (CloudBuild), GCP (Cloud Build), and Kubernetes (full manifests with auto-scaling, HPA, ingress).",
    },
    {
      question: "What's the difference between Pro and Enterprise?",
      answer:
        "Pro and Enterprise include the exact same source code — all 6 apps and all 18 packages. Enterprise adds hands-on services: a dedicated onboarding call, architecture review, up to 20 hours of custom development, and a private Slack/Discord channel with David.",
    },
    {
      question: "How does the Electron desktop app work?",
      answer:
        "The desktop app uses Electron to create native macOS, Windows, and Linux apps. It includes auto-updates, native menus, system tray integration, and IPC communication with your web app. Build and distribute via Electron Builder.",
    },
    {
      question: "What monitoring and real-time features are included?",
      answer:
        "The @launchkit/monitoring package handles error tracking and performance metrics. The @launchkit/realtime package uses Socket.io for WebSocket connections — perfect for live chat, notifications, dashboards, and collaborative features.",
    },
  ],
  enterprise: [
    {
      question: "What's included beyond the Pro plan code?",
      answer:
        "You get the exact same SDK as Pro (all 6 apps, all 18 packages, all 7 deploy guides) PLUS: a dedicated onboarding video call, 1-on-1 architecture review, up to 20 hours of custom feature development, priority bug fixes, a dedicated Slack/Discord channel, and production deployment assistance.",
    },
    {
      question: "What can the 20 hours of custom development cover?",
      answer:
        "Anything you need: custom API endpoints, third-party integrations, database schema modifications, custom UI components, authentication flows, payment logic, deployment automation, or any feature specific to your business.",
    },
    {
      question: "How does the onboarding session work?",
      answer:
        "David schedules a 1-on-1 video call with your team (1-2 hours). He walks through the entire codebase, explains architecture decisions, answers questions, and helps your team understand how to modify the code for your specific needs.",
    },
    {
      question: "How long is the dedicated support channel active?",
      answer:
        "The Slack/Discord channel stays active for 90 days after purchase. During this time, your team can ask questions, share code, and get real-time feedback from David. After 90 days, you can extend support separately.",
    },
    {
      question: "Can I use Enterprise for multiple projects?",
      answer:
        "Yes. Like Pro, Enterprise includes white-label and resale rights for unlimited projects. The custom development hours are scoped to one project, but the code itself can be reused across all your work.",
    },
    {
      question: "Is this worth it vs. hiring a developer?",
      answer:
        "A senior full-stack engineer costs $15,000–$30,000+ per month. The Enterprise plan gives you a production-ready foundation plus 20 hours of expert customization. You're getting months of architecture work for a fraction of the cost of one hire.",
    },
  ],
  custom: [
    {
      question: "How does the free consultation work?",
      answer:
        "Book a call through the contact form. David will discuss your project requirements, timeline, and budget. You'll receive an honest assessment of the best approach — whether that's the SDK, custom development, or a combination.",
    },
    {
      question: "What types of projects do you take on?",
      answer:
        "Full-stack web applications, mobile apps, desktop apps, API servers, SaaS platforms, internal tools, and database-heavy systems. If it involves TypeScript, React, Next.js, Node.js, or the technologies in the SDK — David can build it.",
    },
    {
      question: "What are the engagement options?",
      answer:
        "Hourly (for small tasks or consulting), project-based (fixed scope and price), or retainer (ongoing monthly hours). Most clients start with a project-based engagement and move to retainer for ongoing support.",
    },
    {
      question: "How quickly can you start?",
      answer:
        "Typically within 1-2 weeks of signing the agreement. For urgent projects, faster timelines may be available. The consultation call will clarify availability and start dates.",
    },
  ],
};
