"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

type Item = { name: string; icon?: string };
type Card = {
  title: string;
  description: string;
  image: string;
  icon: string;
  items: Item[];
};

const cards: Card[] = [
  {
    title: "Frontend",
    description: "Modern web apps with cutting-edge UX and performance.",
    image: "/skills/frontend-services.png",
    icon: "🌐",
    items: [
      { name: "Next.js 15", icon: "/next.png" },
      { name: "Next.js 16", icon: "/next.png" },
      { name: "React", icon: "/react.png" },
      { name: "TypeScript", icon: "/ts.png" },
      { name: "Tailwind", icon: "/tailwind.png" },
      { name: "Framer Motion", icon: "/framer.png" },
      { name: "Material UI", icon: "/mui.png" },
      { name: "Web Development" },
    ],
  },
  {
    title: "Backend",
    description: "APIs with clean architecture, auth, and reliability.",
    image: "/skills/backend-services.png",
    icon: "🛠️",
    items: [
      { name: "Node.js", icon: "/node-js.png" },
      { name: "Express", icon: "/express.png" },
      { name: "Python" },
      { name: "Prisma", icon: "/prisma.webp" },
    ],
  },
  {
    title: "Databases",
    description: "Scalable data with SQL-first discipline.",
    image: "/skills/database-services.jpg",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL 16", icon: "/postger.png" },
      { name: "PostgreSQL 17", icon: "/postger.png" },
      { name: "Supabase", icon: "/supabase.webp" },
    ],
  },
  {
    title: "Cloud Services",
    description: "Deployments, observability, and payment rails.",
    image: "/skills/cloud-services.png",
    icon: "☁️",
    items: [
      { name: "Google Cloud", icon: "/google.png" },
      { name: "Vercel", icon: "/vercel.svg" },
      { name: "Stripe", icon: "/stripe.webp" },
      { name: "Cloud Infrastructure" },
    ],
  },
  {
    title: "Mobile",
    description: "Cross-platform apps with native polish.",
    image: "/skills/mobile-developement.jpg",
    icon: "📱",
    items: [
      { name: "React Native", icon: "/ReactNative .png" },
      { name: "Lynx Framework" },
      { name: "Java / Kotlin" },
      { name: "Mobile Apps" },
    ],
  },
  {
    title: "Designing Tools",
    description: "User-centric flows and brand-consistent visuals.",
    image: "/skills/design-tools.png",
    icon: "🎨",
    items: [
      { name: "Figma", icon: "/figma.png" },
      { name: "UI & UX Design" },
      { name: "Digital Marketing" },
    ],
  },
  {
    title: "Hardware",
    description: "Hands-on fundamentals to keep devices healthy.",
    image: "/skills/hardware-services.jpg",
    icon: "🖥️",
    items: [{ name: "Basic computer building & repair" }],
  },
];

// Skill Modal Component - Mobile Optimized
const SkillModal = ({
  card,
  onClose,
}: {
  card: Card;
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Close button - Fixed position for mobile */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] w-10 h-10 rounded-full bg-black/50 sm:bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group border border-white/20"
      >
        <svg
          className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-5xl h-[92vh] sm:h-[85vh] bg-[#0c0f1a] sm:rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 border-t sm:border border-[#2A0E61]/50 flex flex-col animate-slideUp sm:animate-scaleIn"
      >
        {/* Mobile Header - Sticky */}
        <div className="sm:hidden sticky top-0 z-10 flex items-center gap-3 p-4 bg-[#0c0f1a]/95 backdrop-blur-lg border-b border-[#2A0E61]/30">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
            {card.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white truncate">{card.title}</h3>
            <p className="text-xs text-gray-400">Skills & Technologies</p>
          </div>
          <div className="flex items-center gap-1 text-[#b49bff] bg-[#7042f8]/10 px-2 py-1 rounded-full">
            <span className="text-xs font-medium">{card.items.length}</span>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex flex-row h-full">
          {/* Left Side - Image */}
          <div className="relative w-[55%] h-full bg-black flex items-center justify-center">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c0f1a]/50" />
          </div>

          {/* Right Side - Skills Info */}
          <div className="w-[45%] h-full flex flex-col bg-[#0c0f1a] border-l border-[#2A0E61]/30">
            {/* Header */}
            <div className="flex items-center gap-4 p-5 border-b border-[#2A0E61]/30">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="text-sm text-gray-400">Skills & Technologies</p>
              </div>
            </div>

            {/* Description */}
            <div className="px-5 py-4 border-b border-[#2A0E61]/20">
              <p className="text-gray-300 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Skills List - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <p className="text-xs uppercase tracking-widest text-[#b49bff] mb-4 font-medium">
                Technologies
              </p>
              <div className="flex flex-col gap-3">
                {card.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 p-3 rounded-xl bg-[#0f1220]/80 border border-[#2A0E61]/40 hover:border-[#7042f8]/60 hover:bg-[#7042f8]/10 transition-all duration-300 cursor-default animate-slideIn"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="relative w-10 h-10 rounded-lg bg-[#1a1f35] flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      {item.icon ? (
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#7042f8]/30 to-[#b49bff]/30 flex items-center justify-center">
                          <span className="text-sm font-bold text-[#b49bff]">
                            {item.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-medium text-sm group-hover:text-[#b49bff] transition-colors duration-300">
                        {item.name}
                      </span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#7042f8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Stats */}
            <div className="p-5 border-t border-[#2A0E61]/30 bg-[#0a0d16]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7042f8] to-[#b49bff] border-2 border-[#0c0f1a]"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {card.items.length} technologies
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#b49bff]">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">Proficient</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden flex flex-col h-full overflow-hidden">
          {/* Image - Smaller on mobile */}
          <div className="relative w-full h-48 flex-shrink-0">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a] via-[#0c0f1a]/50 to-transparent" />
            
            {/* Floating description on image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-gray-200 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>

          {/* Skills List - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <p className="text-xs uppercase tracking-widest text-[#b49bff] mb-3 font-medium sticky top-0 bg-[#0c0f1a] py-2">
              Technologies ({card.items.length})
            </p>
            
            {/* Grid layout for mobile */}
            <div className="grid grid-cols-1 gap-2">
              {card.items.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-[#0f1220]/80 border border-[#2A0E61]/40 active:border-[#7042f8]/60 active:bg-[#7042f8]/10 transition-all duration-200 animate-slideIn"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <div className="relative w-10 h-10 rounded-lg bg-[#1a1f35] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={26}
                        height={26}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#7042f8]/30 to-[#b49bff]/30 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#b49bff]">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-white font-medium text-sm flex-1">
                    {item.name}
                  </span>
                  <svg className="w-4 h-4 text-[#7042f8]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-[#2A0E61]/30 bg-[#0a0d16] flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300 font-medium">Proficient</span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#7042f8]/20 text-[#b49bff] border border-[#7042f8]/40 text-sm font-medium active:bg-[#7042f8]/30 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(42, 14, 97, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(112, 66, 248, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(112, 66, 248, 0.8);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slideIn {
          opacity: 0;
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Skill Card Component
const SkillCard = ({
  card,
  onClick,
}: {
  card: Card;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl sm:rounded-3xl border border-[#2A0E61] bg-[#0c0f1a]/80 backdrop-blur shadow-lg shadow-[#2A0E61]/30 overflow-hidden flex flex-col cursor-pointer group hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-36 sm:h-48 w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a] via-[#0c0f1a]/20 to-transparent" />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#7042f8]/0 group-hover:bg-[#7042f8]/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile tap indicator */}
        <div className="sm:hidden absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm flex items-center gap-1">
          <span className="text-[10px] text-white/80">Tap to view</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
        {/* Title row */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">
            {card.icon}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#b49bff] transition-colors duration-300 truncate">
              {card.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">
              {card.description}
            </p>
          </div>
        </div>

        {/* Skills preview */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {card.items.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-[#2A0E61]/60 bg-[#0f1220]/80 px-2 sm:px-3 py-1.5 sm:py-2 group-hover:border-[#7042f8]/40 transition-colors duration-300"
            >
              {item.icon ? (
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={18}
                  height={18}
                  className="sm:w-6 sm:h-6"
                />
              ) : (
                <div className="w-[18px] h-[18px] sm:w-6 sm:h-6 rounded-full bg-[#2A0E61]/50 flex items-center justify-center text-[8px] sm:text-[10px] text-white">
                  {item.name.charAt(0)}
                </div>
              )}
              <span className="text-xs sm:text-sm text-gray-200 hidden xs:inline">
                {item.name.length > 10 ? item.name.slice(0, 10) + "..." : item.name}
              </span>
            </div>
          ))}
          {card.items.length > 3 && (
            <div className="flex items-center gap-1 rounded-lg sm:rounded-xl border border-[#7042f8]/40 bg-[#7042f8]/10 px-2 sm:px-3 py-1.5 sm:py-2">
              <span className="text-xs sm:text-sm text-[#b49bff] font-medium">
                +{card.items.length - 3}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <section
        id="skills"
        className="relative z-10 w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-20 flex flex-col items-center gap-8 sm:gap-10 text-center"
      >
        {/* Header */}
        <div className="flex flex-col gap-2 sm:gap-3 max-w-4xl items-center px-2">
          <p className="uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-[#b49bff]">
            Skills & Tools
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
            Practical stack for shipping fast, stable, and polished experiences
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
            From ideas to production, here&apos;s the stack I reach for to move
            quickly, keep quality high, and deploy with confidence.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl">
          {cards.map((card) => (
            <SkillCard
              key={card.title}
              card={card}
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>

        {/* Bottom hint - Mobile only */}
        <p className="sm:hidden text-xs text-gray-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tap any card to see all technologies
        </p>
      </section>

      {/* Modal */}
      {mounted && selectedCard && (
        <SkillModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
};

export default Skills;