"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";

// Product Types
type ProductCategory = "all" | "dashboards" | "ui-kits" | "templates" | "starter-kits";
type LicenseType = "basic" | "pro" | "extended";

type Product = {
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

const products: Product[] = [
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

const categories = [
  { id: "all", label: "All Products", icon: "🛍️" },
  { id: "dashboards", label: "Dashboards", icon: "📊" },
  { id: "ui-kits", label: "UI Kits", icon: "🎨" },
  { id: "templates", label: "Templates", icon: "📄" },
  { id: "starter-kits", label: "Starter Kits", icon: "🚀" },
];

const licenseInfo = {
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

// Format price to Philippine Peso
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(price);
};

// Product Modal Component
const ProductModal = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>("pro");
  const [activeImage, setActiveImage] = useState(0);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [handleEscape]);

  const allImages = [product.image, ...(product.images || [])];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ animation: "fadeIn 0.2s ease-out forwards" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 group"
      >
        <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0f1a] rounded-2xl overflow-hidden flex flex-col lg:flex-row"
        style={{
          animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          boxShadow: "0 25px 80px -12px rgba(112, 66, 248, 0.3)",
          border: "1px solid rgba(112, 66, 248, 0.2)",
        }}
      >
        {/* Left - Images */}
        <div className="lg:w-[55%] bg-[#080a10]">
          {/* Main Image */}
          <div className="relative aspect-video lg:aspect-auto lg:h-[400px]">
            <Image
              src={allImages[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isNew && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-500/90 text-white">NEW</span>
              )}
              {product.isBestseller && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-[#7042f8]/90 text-white">BESTSELLER</span>
              )}
            </div>
          </div>
          
          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImage === idx ? "border-[#7042f8]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="p-4 border-t border-[#2A0E61]/30">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Built with</p>
            <div className="flex flex-wrap gap-2">
              {product.techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 rounded-md text-xs bg-[#0f1220] text-gray-300 border border-[#2A0E61]/50">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Info */}
        <div className="lg:w-[45%] flex flex-col max-h-[90vh] lg:max-h-none overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-[#2A0E61]/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-400">{product.sales} sales</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
            <p className="text-gray-400 text-sm">{product.description}</p>
          </div>

          {/* License Selection */}
          <div className="p-6 border-b border-[#2A0E61]/30">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">Select License</p>
            <div className="grid grid-cols-3 gap-2">
              {(["basic", "pro", "extended"] as LicenseType[]).map((license) => (
                <button
                  key={license}
                  onClick={() => setSelectedLicense(license)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedLicense === license
                      ? "border-[#7042f8] bg-[#7042f8]/20"
                      : "border-[#2A0E61]/50 bg-[#0f1220] hover:border-[#7042f8]/50"
                  }`}
                >
                  <span className="block text-xs text-gray-500 uppercase">{license}</span>
                  <span className="block text-lg font-bold text-white mt-1">
                    {formatPrice(product.price[license])}
                  </span>
                  {product.originalPrice && (
                    <span className="block text-xs text-gray-500 line-through">
                      {formatPrice(product.originalPrice[license])}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* License Features */}
            <div className="mt-4 p-3 rounded-lg bg-[#0f1220] border border-[#2A0E61]/30">
              <p className="text-sm font-medium text-[#b49bff] mb-2">{licenseInfo[selectedLicense].name}</p>
              <ul className="space-y-1">
                {licenseInfo[selectedLicense].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="p-6 flex-1 overflow-y-auto">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">What&apos;s Included</p>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 text-[#7042f8] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Footer - CTA */}
          <div className="p-6 border-t border-[#2A0E61]/30 bg-[#080a10]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-sm text-gray-500">Total</span>
                <p className="text-2xl font-bold text-white">{formatPrice(product.price[selectedLicense])}</p>
              </div>
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-[#2A0E61] text-gray-300 hover:border-[#7042f8] hover:text-white transition-all text-sm"
                >
                  Live Preview ↗
                </a>
              )}
            </div>
            <button
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              style={{ boxShadow: "0 4px 20px rgba(112, 66, 248, 0.4)" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Buy Now
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Secure payment via Stripe • Instant download
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

// Product Card Component
const ProductCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="group rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 overflow-hidden cursor-pointer hover:border-[#7042f8]/50 transition-all duration-300 hover:-translate-y-1"
    style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}
  >
    {/* Image */}
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a] via-transparent to-transparent opacity-60" />
      
      {/* Badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        {product.isNew && (
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-500/90 text-white">NEW</span>
        )}
        {product.isBestseller && (
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-[#7042f8]/90 text-white">BESTSELLER</span>
        )}
        {product.isFeatured && !product.isBestseller && (
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-orange-500/90 text-white">FEATURED</span>
        )}
      </div>

      {/* Quick View */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
        <span className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
          Quick View
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      {/* Rating & Sales */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-gray-400">{product.rating}</span>
        </div>
        <span className="text-xs text-gray-500">({product.sales} sales)</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#b49bff] transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.shortDescription}</p>

      {/* Tech Stack Preview */}
      <div className="flex flex-wrap gap-1 mb-4">
        {product.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="px-2 py-0.5 rounded text-xs bg-[#0f1220] text-gray-400 border border-[#2A0E61]/30">
            {tech}
          </span>
        ))}
        {product.techStack.length > 3 && (
          <span className="px-2 py-0.5 rounded text-xs bg-[#0f1220] text-gray-400 border border-[#2A0E61]/30">
            +{product.techStack.length - 3}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500">From</span>
          <p className="text-xl font-bold text-white">{formatPrice(product.price.basic)}</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-[#7042f8]/20 text-[#b49bff] border border-[#7042f8]/40 hover:bg-[#7042f8]/30 transition-all text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <main className="min-h-screen bg-[#030014] text-white pt-28 pb-16">
      {/* Hero Section */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#b49bff] mb-4">Digital Products</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Premium Templates &<br />
            <span className="bg-gradient-to-r from-[#7042f8] to-[#b49bff] bg-clip-text text-transparent">
              Developer Kits
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Production-ready templates, UI kits, and starter kits built by a developer who ships real products daily. Save weeks of development time.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Production-Ready Code
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Regular Updates
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Developer Support
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Instant Download
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0c0f1a] border border-[#2A0E61]/50 text-white placeholder-gray-500 focus:outline-none focus:border-[#7042f8] transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ProductCategory)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-[#7042f8] text-white"
                    : "bg-[#0c0f1a] text-gray-400 border border-[#2A0E61]/50 hover:border-[#7042f8]/50 hover:text-white"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Buy From Me */}
      <section className="px-6 py-16 bg-[#0c0f1a]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why Buy From Me?</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Unlike marketplace templates, my products are built from real-world project experience and maintained with care.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🚀",
                title: "Production-Ready",
                description: "Not just demos—these templates are used in real client projects",
              },
              {
                icon: "📝",
                title: "Clean Code",
                description: "Well-organized, documented, and following best practices",
              },
              {
                icon: "🔄",
                title: "Regular Updates",
                description: "Bug fixes, new features, and compatibility updates",
              },
              {
                icon: "💬",
                title: "Direct Support",
                description: "Get help from the developer who built it—not a support team",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c0f1a] border border-[#2A0E61]/50 hover:border-[#7042f8]/50 transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: "What's included in the download?",
                a: "You'll receive the complete source code, documentation, and any design files (Figma) if included. Everything is organized and ready to use.",
              },
              {
                q: "Can I use this for client projects?",
                a: "Yes! With the Pro or Extended license, you can use the templates for unlimited client projects. The Basic license is for personal use only.",
              },
              {
                q: "Do you offer refunds?",
                a: "Due to the digital nature of the products, refunds are handled case-by-case. If there's a technical issue I can't resolve, I'll gladly refund your purchase.",
              },
              {
                q: "How do I get support?",
                a: "Pro and Extended license holders get priority email support. Basic license holders can access community support through GitHub discussions.",
              },
              {
                q: "Are updates free?",
                a: "Yes, updates are free for the duration of your license (6 months for Basic, 1 year for Pro, lifetime for Extended).",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group p-5 rounded-xl bg-[#0c0f1a] border border-[#2A0E61]/50 hover:border-[#7042f8]/50 transition-all duration-300"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-white">{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#7042f8]/20 to-[#0c0f1a] border border-[#7042f8]/30">
            <h2 className="text-3xl font-bold mb-4">Need Something Custom?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Can&apos;t find exactly what you need? I also offer custom development services. Let&apos;s discuss your project requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Back to home */}
      <div className="text-center px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#b49bff] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Link>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </main>
  );
}