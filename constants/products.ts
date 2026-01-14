// Product Types
export type ProductCategory = "all" | "dashboards" | "ui-kits" | "templates" | "starter-kits";
export type LicenseType = "basic" | "pro" | "extended";

export type Product = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  image: string;
  images?: string[];
  price: {
    basic: number;
    pro: number;
    extended: number;
  };
  originalPrice?: {
    basic: number;
    pro: number;
    extended: number;
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
};

/**
 * Add new products by appending to this array.
 * The store page will automatically display them.
 */
export const PRODUCTS: Product[] = [
  {
    id: "zentryx-dashboard",
    name: "Zentryx Dashboard Pro",
    shortDescription: "Complete workforce management dashboard with HR, payroll, and analytics",
    description: "A comprehensive workforce management dashboard built with Next.js and Supabase. Includes employee management, payroll processing, attendance tracking, performance analytics, and real-time monitoring. Perfect for HR teams and growing businesses.",
    category: "dashboards",
    image: "/products/zentryx-dashboard.png",
    images: ["/products/zentryx-1.png", "/products/zentryx-2.png", "/products/zentryx-3.png"],
    price: { basic: 2999, pro: 4999, extended: 9999 },
    originalPrice: { basic: 4999, pro: 7999, extended: 14999 },
    features: [
      "Employee Management System",
      "Automated Payroll Processing",
      "Attendance & Time Tracking",
      "Performance Analytics Dashboard",
      "Role-Based Access Control",
      "Real-time Notifications",
      "Dark/Light Mode",
      "Fully Responsive Design",
      "Supabase Integration",
      "Authentication Ready",
    ],
    techStack: ["Next.js 15", "TypeScript", "Supabase", "Tailwind CSS", "ShadCN UI"],
    demoUrl: "https://zentryx-workforce-management-system.vercel.app/",
    isFeatured: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 24,
    sales: 156,
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard Kit",
    shortDescription: "Modern analytics dashboard with charts, graphs, and data visualization",
    description: "A sleek analytics dashboard template featuring interactive charts, real-time data visualization, and customizable widgets. Built with performance in mind, perfect for SaaS products and data-driven applications.",
    category: "dashboards",
    image: "/products/analytics-dashboard.png",
    price: { basic: 1999, pro: 3499, extended: 5999 },
    features: [
      "Interactive Charts & Graphs",
      "Real-time Data Updates",
      "Customizable Widgets",
      "Export to PDF/CSV",
      "Date Range Filters",
      "Multiple Chart Types",
      "Responsive Tables",
      "Dark/Light Mode",
    ],
    techStack: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS"],
    isNew: true,
    rating: 4.8,
    reviews: 12,
    sales: 89,
  },
  {
    id: "ecommerce-dashboard",
    name: "E-Commerce Admin Panel",
    shortDescription: "Full-featured admin dashboard for online stores and marketplaces",
    description: "Complete e-commerce admin solution with product management, order tracking, customer insights, and sales analytics. Integrates seamlessly with popular payment gateways and shipping providers.",
    category: "dashboards",
    image: "/products/ecommerce-dashboard.png",
    price: { basic: 2499, pro: 4499, extended: 7999 },
    features: [
      "Product Management",
      "Order Tracking System",
      "Customer Management",
      "Sales Analytics",
      "Inventory Management",
      "Payment Integration Ready",
      "Multi-vendor Support",
      "SEO Tools",
    ],
    techStack: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    rating: 4.7,
    reviews: 18,
    sales: 112,
  },
  {
    id: "nova-ui-kit",
    name: "Nova UI Component Kit",
    shortDescription: "50+ beautifully crafted React components for modern web apps",
    description: "A comprehensive UI kit featuring over 50 meticulously designed React components. From buttons to complex data tables, everything you need to build stunning interfaces. Fully typed with TypeScript and styled with Tailwind CSS.",
    category: "ui-kits",
    image: "/products/nova-ui-kit.png",
    price: { basic: 999, pro: 1999, extended: 3499 },
    features: [
      "50+ React Components",
      "Fully TypeScript",
      "Tailwind CSS Styling",
      "Dark/Light Variants",
      "Accessible (WCAG 2.1)",
      "Copy-Paste Ready",
      "Figma File Included",
      "Regular Updates",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviews: 31,
    sales: 245,
  },
  {
    id: "glassmorphism-kit",
    name: "Glassmorphism UI Kit",
    shortDescription: "Stunning glass-effect components with blur and transparency",
    description: "Create beautiful, modern interfaces with our glassmorphism UI kit. Features frosted glass effects, smooth gradients, and elegant animations. Perfect for landing pages, portfolios, and creative projects.",
    category: "ui-kits",
    image: "/products/glassmorphism-kit.png",
    price: { basic: 799, pro: 1499, extended: 2499 },
    features: [
      "30+ Glass Components",
      "Blur & Transparency Effects",
      "Gradient Backgrounds",
      "Smooth Animations",
      "CSS Variables",
      "Easy Customization",
      "Browser Compatible",
      "Performance Optimized",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
    rating: 4.8,
    reviews: 15,
    sales: 98,
  },
  {
    id: "developer-portfolio",
    name: "Developer Portfolio Template",
    shortDescription: "Stunning portfolio template for developers and designers",
    description: "Stand out with this modern, space-themed portfolio template. Features smooth animations, project showcases, testimonials, and contact forms. Perfect for developers, designers, and creative professionals.",
    category: "templates",
    image: "/products/developer-portfolio.png",
    price: { basic: 499, pro: 999, extended: 1999 },
    features: [
      "Modern Design",
      "Smooth Animations",
      "Project Showcase",
      "Testimonials Section",
      "Contact Form",
      "Blog Ready",
      "SEO Optimized",
      "Fast Loading",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
    isBestseller: true,
    rating: 4.9,
    reviews: 42,
    sales: 312,
  },
  {
    id: "saas-landing",
    name: "SaaS Landing Page",
    shortDescription: "High-converting landing page template for SaaS products",
    description: "Maximize conversions with this professionally designed SaaS landing page. Includes hero sections, feature grids, pricing tables, testimonials, and FAQ accordions. Optimized for speed and SEO.",
    category: "templates",
    image: "/products/saas-landing.png",
    price: { basic: 599, pro: 1199, extended: 2299 },
    features: [
      "Conversion Optimized",
      "Pricing Table",
      "Feature Sections",
      "Testimonials",
      "FAQ Accordion",
      "CTA Sections",
      "Mobile First",
      "A/B Test Ready",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
    isNew: true,
    rating: 4.7,
    reviews: 8,
    sales: 67,
  },
  {
    id: "nextjs-supabase-starter",
    name: "Next.js + Supabase Starter",
    shortDescription: "Production-ready starter kit with auth, database, and payments",
    description: "Skip weeks of boilerplate setup. This starter kit includes authentication, database integration, Stripe payments, email templates, and admin dashboard. Everything you need to launch your SaaS product.",
    category: "starter-kits",
    image: "/products/nextjs-starter.png",
    price: { basic: 2999, pro: 5999, extended: 11999 },
    features: [
      "Authentication (Email, OAuth)",
      "Supabase Database",
      "Stripe Payments",
      "Email Templates",
      "Admin Dashboard",
      "User Management",
      "API Routes",
      "TypeScript",
      "Tailwind CSS",
      "Documentation",
    ],
    techStack: ["Next.js 15", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    isFeatured: true,
    rating: 4.9,
    reviews: 19,
    sales: 134,
  },
];

export const categories = [
  { id: "all", label: "All Products", icon: "✦" },
  { id: "dashboards", label: "Dashboards", icon: "◈" },
  { id: "ui-kits", label: "UI Kits", icon: "◇" },
  { id: "templates", label: "Templates", icon: "▢" },
  { id: "starter-kits", label: "Starter Kits", icon: "◎" },
];

export const licenseInfo = {
  basic: {
    name: "Basic License",
    description: "For personal projects",
    features: ["Single project use", "No commercial use", "6 months updates", "Community support"],
  },
  pro: {
    name: "Pro License",
    description: "For commercial projects",
    features: ["Unlimited projects", "Commercial use", "1 year updates", "Priority support", "Source files"],
  },
  extended: {
    name: "Extended License",
    description: "For SaaS & resale",
    features: ["Unlimited projects", "SaaS/Resale allowed", "Lifetime updates", "24/7 support", "White-label rights", "Custom integration help"],
  },
};
