"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type Experience = {
    role: string;
    company: string;
    companyLogo: string; // Path to company logo
    date: string;
    location: string;
    type: string;
    description: string[];
    technologies?: string[];
    projects?: string[];
    highlights?: string[];
    companyDescription?: string;
};

const professionalExperience: Experience[] = [
    {
        role: "Software Engineer",
        company: "Rooche Digital",
        companyLogo: "/companies/rooche-digital.png",
        date: "Feb 2025 – Present",
        location: "Remote",
        type: "Part-Time",
        companyDescription: "A digital agency specializing in modern web solutions, helping businesses establish and grow their online presence through cutting-edge technology.",
        description: [
            "Architected and deployed 10+ responsive, production-grade web applications using Next.js, React.js, Laravel, and Ruby on Rails",
            "Integrated Supabase for real-time data synchronization, authentication, and cloud storage, reducing backend development time by 40%",
            "Optimized database queries across MongoDB, PostgreSQL, and MySQL, improving application performance by 35%",
        ],
        highlights: [
            "Led migration of legacy systems to modern tech stack",
            "Implemented CI/CD workflows using Vercel for automated deployments",
            "Developed Python automation scripts for internal tooling",
            "Designed intuitive user interfaces using Figma with modern UI/UX principles",
            "Executed comprehensive SEO strategies improving search rankings",
            "Increased user engagement by 25% through UI/UX improvements",
        ],
        technologies: ["Next.js", "React", "Laravel", "Ruby on Rails", "Supabase", "PostgreSQL", "MongoDB", "MySQL", "Python", "Figma", "Vercel"],
    },
    {
        role: "Full-Stack Developer",
        company: "Quickstore",
        companyLogo: "/companies/quickstore.png",
        date: "Jul 2024 – Aug 2024",
        location: "Philippines",
        type: "Full-Time",
        companyDescription: "An innovative startup focused on smart locker solutions for modern businesses, providing secure and efficient storage management systems.",
        description: [
            "Single-handedly designed, developed, and deployed complete end-to-end locker management solution as sole developer",
            "Engineered Android mobile application using Java and Kotlin for locker control and user access",
            "Built comprehensive admin dashboard with Next.js integrated with Supabase for authentication and real-time database management",
        ],
        highlights: [
            "Delivered functional MVP within 1-month timeframe",
            "Managed all aspects from design to deployment independently",
            "Implemented real-time features for locker usage tracking and status monitoring",
            "Built secure access control system with role-based permissions",
            "Created mobile-first responsive admin interface",
        ],
        technologies: ["Next.js", "Java", "Kotlin", "Supabase", "Android", "TypeScript", "Tailwind CSS"],
    },
    {
        role: "Software Developer",
        company: "Jeonsoft Corporation",
        companyLogo: "/companies/jeonsoft.png",
        date: "2023 – 2025",
        location: "Philippines",
        type: "Full-Time",
        companyDescription: "A software development company delivering enterprise solutions and custom applications for businesses across various industries.",
        description: [
            "Built and maintained scalable web applications using React.js and Ruby on Rails, ensuring optimal front-end and back-end performance",
            "Optimized complex SQL queries in MySQL and PostgreSQL, enhancing system efficiency and reducing load times by 30%",
            "Applied UI/UX best practices using Figma and Canva to create engaging, user-friendly interfaces",
        ],
        highlights: [
            "Collaborated with product managers and designers to enhance product functionality",
            "Implemented SEO strategies that improved website visibility",
            "Delivered superior user experiences through iterative design improvements",
            "Mentored junior developers on best practices and code quality",
            "Participated in agile development cycles with regular sprint deliveries",
        ],
        technologies: ["React", "Ruby on Rails", "MySQL", "PostgreSQL", "Figma", "Canva", "Git", "Agile"],
    },
];

const freelanceExperience: Experience[] = [
    {
        role: "Freelance Full-Stack Developer",
        company: "Michael Schulze",
        companyLogo: "/companies/michael-schulze.png",
        date: "May 2025 – Present",
        location: "Remote",
        type: "Freelance",
        companyDescription: "Independent client partnership delivering multiple web projects across different business verticals including carpentry services, architecture, creative storytelling, and publishing.",
        description: [
            "Delivering end-to-end web solutions for multiple business verticals including e-commerce, portfolios, and creative platforms",
            "Designed and developed responsive, SEO-optimized websites with modern UI/UX principles",
            "Implemented performance optimizations achieving 90+ Lighthouse scores across all projects",
        ],
        highlights: [
            "Managing complete project lifecycle from consultation to deployment",
            "Carpenter Mike - Portfolio website for carpentry services with SEO optimization",
            "Supra Arc - Professional architecture firm website with image galleries",
            "C5M World - Creative storytelling and immersive brand experience hub",
            "Paper Jumpsuit - Book landing page focused on clarity and conversion",
            "Providing ongoing maintenance and support for all delivered projects",
        ],
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "SEO", "Figma"],
        projects: ["Carpenter Mike", "Supra Arc", "C5M World", "Paper Jumpsuit"],
    },
];

const CompanyAvatar = ({
    logo,
    company,
    size = "md",
}: {
    logo: string;
    company: string;
    size?: "sm" | "md" | "lg";
}) => {
    const [imageError, setImageError] = useState(false);

    const sizeClasses = {
        sm: "w-12 h-12 rounded-xl text-lg",
        md: "w-14 h-14 rounded-xl text-xl",
        lg: "w-16 h-16 md:w-20 md:h-20 rounded-2xl text-2xl md:text-3xl",
    };

    const imageSizes = {
        sm: 48,
        md: 56,
        lg: 80,
    };

    if (imageError) {
        // Fallback to letter avatar
        return (
            <div
                className={`${sizeClasses[size]} bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center text-white font-bold flex-shrink-0`}
                style={{ boxShadow: "0 4px 15px rgba(112, 66, 248, 0.3)" }}
            >
                {company.charAt(0)}
            </div>
        );
    }

    return (
        <div
            className={`${sizeClasses[size]} relative overflow-hidden flex-shrink-0 bg-[#0f1220] border border-[#2A0E61]/50`}
            style={{ boxShadow: "0 4px 15px rgba(112, 66, 248, 0.2)" }}
        >
            <Image
                src={logo}
                alt={`${company} logo`}
                width={imageSizes[size]}
                height={imageSizes[size]}
                className="object-cover w-full h-full"
                onError={() => setImageError(true)}
            />
        </div>
    );
};

const ExperienceModal = ({
    experience,
    onClose,
}: {
    experience: Experience;
    onClose: () => void;
}) => {
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

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            onClick={onClose}
            style={{ animation: "fadeIn 0.2s ease-out forwards" }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group"
            >
                <svg
                    className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Modal Content */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl max-h-[85vh] bg-[#0c0f1a] rounded-2xl overflow-hidden flex flex-col"
                style={{
                    animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    boxShadow: "0 25px 80px -12px rgba(112, 66, 248, 0.3)",
                    border: "1px solid rgba(112, 66, 248, 0.2)",
                }}
            >
                {/* Header */}
                <div
                    className="relative p-6 md:p-8"
                    style={{
                        background: "linear-gradient(135deg, rgba(112, 66, 248, 0.15) 0%, rgba(112, 66, 248, 0.05) 100%)",
                        borderBottom: "1px solid rgba(112, 66, 248, 0.2)",
                    }}
                >
                    {/* Background decoration */}
                    <div
                        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
                        style={{ background: "radial-gradient(circle, #7042f8 0%, transparent 70%)" }}
                    />

                    <div className="relative flex items-start gap-4">
                        <CompanyAvatar logo={experience.companyLogo} company={experience.company} size="lg" />
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{experience.role}</h2>
                            <p className="text-[#b49bff] font-medium text-lg">{experience.company}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                <span className="px-3 py-1 rounded-full text-sm bg-[#7042f8]/20 text-[#b49bff] border border-[#7042f8]/40">
                                    {experience.type}
                                </span>
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {experience.location}
                                </span>
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {experience.date}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    {/* Company Description */}
                    {experience.companyDescription && (
                        <div className="mb-6">
                            <p className="text-gray-300 leading-relaxed">{experience.companyDescription}</p>
                        </div>
                    )}

                    {/* Key Responsibilities */}
                    <div className="mb-6">
                        <h3 className="text-sm uppercase tracking-wider text-[#b49bff] mb-4 font-medium flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Key Responsibilities
                        </h3>
                        <ul className="space-y-3">
                            {experience.description.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 text-gray-300"
                                    style={{ animation: `slideIn 0.3s ease-out forwards`, animationDelay: `${i * 50}ms`, opacity: 0 }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7042f8] mt-2 flex-shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Highlights & Achievements */}
                    {experience.highlights && (
                        <div className="mb-6">
                            <h3 className="text-sm uppercase tracking-wider text-[#b49bff] mb-4 font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                Highlights & Achievements
                            </h3>
                            <ul className="space-y-3">
                                {experience.highlights.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-gray-300"
                                        style={{ animation: `slideIn 0.3s ease-out forwards`, animationDelay: `${(i + experience.description.length) * 50}ms`, opacity: 0 }}
                                    >
                                        <span className="text-[#7042f8] mt-0.5">▹</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Projects */}
                    {experience.projects && (
                        <div className="mb-6">
                            <h3 className="text-sm uppercase tracking-wider text-[#b49bff] mb-4 font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                Projects Delivered
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {experience.projects.map((project, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-[#7042f8]/20 to-[#b49bff]/20 text-[#b49bff] border border-[#7042f8]/40 hover:border-[#7042f8]/70 transition-colors duration-300"
                                        style={{ animation: `slideIn 0.3s ease-out forwards`, animationDelay: `${i * 80}ms`, opacity: 0 }}
                                    >
                                        {project}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Technologies */}
                    {experience.technologies && (
                        <div>
                            <h3 className="text-sm uppercase tracking-wider text-[#b49bff] mb-4 font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 rounded-lg text-sm bg-[#0f1220] text-gray-300 border border-[#2A0E61]/50 hover:border-[#7042f8]/50 hover:text-white transition-colors duration-300"
                                        style={{ animation: `slideIn 0.3s ease-out forwards`, animationDelay: `${i * 30}ms`, opacity: 0 }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="p-4 md:p-6 flex items-center justify-between"
                    style={{
                        background: "#080a10",
                        borderTop: "1px solid rgba(112, 66, 248, 0.15)",
                    }}
                >
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <svg className="w-4 h-4 text-[#7042f8]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        {experience.technologies?.length || 0} technologies
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-[#7042f8]/20 text-[#b49bff] border border-[#7042f8]/40 hover:bg-[#7042f8]/30 hover:border-[#7042f8]/60 transition-all duration-300 text-sm font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(112, 66, 248, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(112, 66, 248, 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(112, 66, 248, 0.6);
        }
      `}</style>
        </div>
    );
};

const Experience = () => {
    const [activeTab, setActiveTab] = useState<"professional" | "freelance">("professional");
    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const experiences = activeTab === "professional" ? professionalExperience : freelanceExperience;

    return (
        <>
            <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(112, 66, 248, 0.6), 0 0 20px rgba(112, 66, 248, 0.4); }
          50% { box-shadow: 0 0 20px rgba(112, 66, 248, 0.8), 0 0 40px rgba(112, 66, 248, 0.5); }
        }
        .timeline-item { opacity: 0; animation: fadeInUp 0.5s ease-out forwards; }
        .node-pulse { animation: pulse-glow 2.5s ease-in-out infinite; }
      `}</style>

            <section
                id="experience"
                className="relative z-10 w-full py-20 px-6 lg:px-20 flex flex-col items-center gap-10"
            >
                {/* Section Header */}
                <div className="flex flex-col gap-3 max-w-4xl items-center text-center">
                    <p className="uppercase text-xs tracking-[0.3em] text-[#b49bff]">
                        Experience
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                        My Professional Journey
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        Building products, solving problems, and growing as a developer through diverse opportunities.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 p-1.5 rounded-2xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50 backdrop-blur">
                    <button
                        onClick={() => setActiveTab("professional")}
                        className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === "professional" ? "text-white" : "text-gray-400 hover:text-gray-200"
                            }`}
                    >
                        {activeTab === "professional" && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff]"
                                style={{ boxShadow: "0 4px 20px rgba(112, 66, 248, 0.4)" }} />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Professional
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("freelance")}
                        className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === "freelance" ? "text-white" : "text-gray-400 hover:text-gray-200"
                            }`}
                    >
                        {activeTab === "freelance" && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff]"
                                style={{ boxShadow: "0 4px 20px rgba(112, 66, 248, 0.4)" }} />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Freelance
                        </span>
                    </button>
                </div>

                {/* Timeline Container */}
                <div className="relative w-full max-w-6xl">
                    {/* Central Vertical Line - Desktop */}
                    {mounted && (
                        <div
                            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
                            style={{
                                background: "linear-gradient(to bottom, rgba(112, 66, 248, 0.8), rgba(112, 66, 248, 0.2))",
                                boxShadow: "0 0 15px rgba(112, 66, 248, 0.4)",
                            }}
                        />
                    )}

                    {/* Central Vertical Line - Mobile */}
                    {mounted && (
                        <div
                            className="md:hidden absolute left-4 top-0 bottom-0 w-[2px]"
                            style={{
                                background: "linear-gradient(to bottom, rgba(112, 66, 248, 0.8), rgba(112, 66, 248, 0.2))",
                                boxShadow: "0 0 15px rgba(112, 66, 248, 0.4)",
                            }}
                        />
                    )}

                    {/* Timeline Items */}
                    <div className="flex flex-col gap-12 md:gap-16">
                        {experiences.map((exp, idx) => {
                            const isLeft = idx % 2 === 0;

                            return (
                                <div
                                    key={`${activeTab}-${idx}`}
                                    className="timeline-item relative"
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    {/* Desktop Layout */}
                                    <div className="hidden md:flex items-center">
                                        {/* Left Side */}
                                        <div className="w-[calc(50%-40px)] pr-8">
                                            {isLeft ? (
                                                <ExperienceCard exp={exp} align="right" onClick={() => setSelectedExperience(exp)} />
                                            ) : (
                                                <DateBadge date={exp.date} location={exp.location} type={exp.type} align="right" />
                                            )}
                                        </div>

                                        {/* Center - Node with branches */}
                                        <div className="relative w-[80px] flex items-center justify-center">
                                            {/* Left Branch */}
                                            <div
                                                className="absolute right-1/2 h-[2px] w-[35px] mr-2"
                                                style={{
                                                    background: "linear-gradient(to left, rgba(112, 66, 248, 0.9), rgba(112, 66, 248, 0.2))",
                                                    boxShadow: "0 0 8px rgba(112, 66, 248, 0.3)",
                                                }}
                                            />
                                            {/* Right Branch */}
                                            <div
                                                className="absolute left-1/2 h-[2px] w-[35px] ml-2"
                                                style={{
                                                    background: "linear-gradient(to right, rgba(112, 66, 248, 0.9), rgba(112, 66, 248, 0.2))",
                                                    boxShadow: "0 0 8px rgba(112, 66, 248, 0.3)",
                                                }}
                                            />
                                            {/* Node */}
                                            <div
                                                className="relative z-10 w-4 h-4 rounded-full bg-[#7042f8] node-pulse"
                                                style={{ border: "3px solid #0c0f1a" }}
                                            />
                                        </div>

                                        {/* Right Side */}
                                        <div className="w-[calc(50%-40px)] pl-8">
                                            {isLeft ? (
                                                <DateBadge date={exp.date} location={exp.location} type={exp.type} align="left" />
                                            ) : (
                                                <ExperienceCard exp={exp} align="left" onClick={() => setSelectedExperience(exp)} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden relative pl-12">
                                        {/* Node */}
                                        <div className="absolute left-4 -translate-x-1/2 top-0 z-10">
                                            <div
                                                className="w-3 h-3 rounded-full bg-[#7042f8] node-pulse"
                                                style={{ border: "2px solid #0c0f1a" }}
                                            />
                                        </div>
                                        {/* Branch */}
                                        <div
                                            className="absolute left-[18px] top-[5px] h-[2px] w-6"
                                            style={{
                                                background: "linear-gradient(to right, rgba(112, 66, 248, 0.9), rgba(112, 66, 248, 0.2))",
                                            }}
                                        />

                                        {/* Date */}
                                        <div className="mb-3">
                                            <span className="text-[#b49bff] font-semibold text-sm">{exp.date}</span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-gray-400 text-xs">{exp.location}</span>
                                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#7042f8]/20 text-[#b49bff] border border-[#7042f8]/30">
                                                    {exp.type}
                                                </span>
                                            </div>
                                        </div>

                                        <ExperienceCard exp={exp} align="left" mobile onClick={() => setSelectedExperience(exp)} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* End dot */}
                    {mounted && (
                        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -bottom-6">
                            <div
                                className="w-2 h-2 rounded-full bg-[#7042f8]/40"
                                style={{ boxShadow: "0 0 10px rgba(112, 66, 248, 0.3)" }}
                            />
                        </div>
                    )}
                </div>

                {/* Bottom text */}
                <div className="flex items-center gap-3 mt-8">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#7042f8]/50" />
                    <span className="text-gray-500 text-sm">Click on any card to see details</span>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#7042f8]/50" />
                </div>
            </section>

            {/* Modal */}
            {mounted && selectedExperience && (
                <ExperienceModal
                    experience={selectedExperience}
                    onClose={() => setSelectedExperience(null)}
                />
            )}
        </>
    );
};

const DateBadge = ({
    date,
    location,
    type,
    align,
}: {
    date: string;
    location: string;
    type: string;
    align: "left" | "right";
}) => (
    <div className={`${align === "right" ? "text-right" : "text-left"}`}>
        <p className="text-[#b49bff] font-bold text-2xl mb-2">{date}</p>
        <div className={`flex items-center gap-3 ${align === "right" ? "justify-end" : "justify-start"}`}>
            <span className="text-gray-400">{location}</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#7042f8]/20 text-[#b49bff] border border-[#7042f8]/40">
                {type}
            </span>
        </div>
    </div>
);

const ExperienceCard = ({
    exp,
    align,
    mobile = false,
    onClick,
}: {
    exp: Experience;
    align: "left" | "right";
    mobile?: boolean;
    onClick: () => void;
}) => (
    <div
        onClick={onClick}
        className={`group p-5 md:p-6 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/90 backdrop-blur-sm 
                transition-all duration-300 hover:border-[#7042f8]/50 hover:shadow-[0_0_30px_rgba(112,66,248,0.15)]
                cursor-pointer hover:-translate-y-1 active:scale-[0.98]
                ${mobile ? "w-full" : "max-w-md"}`}
    >
        {/* Header */}
        <div className={`flex items-start gap-3 mb-4 ${align === "right" && !mobile ? "flex-row-reverse" : ""}`}>
            <div className="group-hover:scale-110 transition-transform duration-300">
                <CompanyAvatar logo={exp.companyLogo} company={exp.company} size="sm" />
            </div>
            <div className={`${align === "right" && !mobile ? "text-right" : ""}`}>
                <h3 className="text-lg font-bold text-white group-hover:text-[#b49bff] transition-colors">
                    {exp.role}
                </h3>
                <p className="text-[#b49bff]/60 text-sm">{exp.company}</p>
            </div>
        </div>

        {/* Description */}
        <ul className={`space-y-2 mb-4 ${align === "right" && !mobile ? "text-right" : ""}`}>
            {exp.description.slice(0, 2).map((item, i) => (
                <li
                    key={i}
                    className={`flex items-start gap-2 text-gray-300 text-sm leading-relaxed ${align === "right" && !mobile ? "flex-row-reverse" : ""}`}
                >
                    <span className="text-[#7042f8] mt-0.5 flex-shrink-0">▹</span>
                    <span className="line-clamp-2">{item}</span>
                </li>
            ))}
        </ul>

        {/* Projects */}
        {exp.projects && (
            <div className="mb-4">
                <div className={`flex flex-wrap gap-2 ${align === "right" && !mobile ? "justify-end" : ""}`}>
                    {exp.projects.slice(0, 3).map((project, i) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#7042f8]/15 text-[#b49bff] border border-[#7042f8]/30"
                        >
                            {project}
                        </span>
                    ))}
                    {exp.projects.length > 3 && (
                        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#7042f8]/15 text-[#b49bff] border border-[#7042f8]/30">
                            +{exp.projects.length - 3}
                        </span>
                    )}
                </div>
            </div>
        )}

        {/* Tech Stack */}
        {exp.technologies && (
            <div className="mb-4">
                <div className={`flex flex-wrap gap-1.5 ${align === "right" && !mobile ? "justify-end" : ""}`}>
                    {exp.technologies.slice(0, 5).map((tech, i) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-xs bg-[#0f1220] text-gray-400 border border-[#2A0E61]/40"
                        >
                            {tech}
                        </span>
                    ))}
                    {exp.technologies.length > 5 && (
                        <span className="px-2.5 py-1 rounded-md text-xs bg-[#0f1220] text-gray-400 border border-[#2A0E61]/40">
                            +{exp.technologies.length - 5}
                        </span>
                    )}
                </div>
            </div>
        )}

        {/* Click hint */}
        <div className={`flex items-center gap-2 text-[#7042f8] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${align === "right" && !mobile ? "justify-end" : ""}`}>
            <span>View details</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
        </div>
    </div>
);

export default Experience;