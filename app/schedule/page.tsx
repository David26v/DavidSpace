"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SchedulePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if Calendly script already exists
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (existingScript) {
      setIsLoading(false);
      return;
    }

    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    
    script.onload = () => {
      setIsLoading(false);
      // Give Calendly a moment to initialize
      setTimeout(() => {
        const widget = document.querySelector('.calendly-inline-widget iframe');
        if (!widget) {
          setHasError(true);
        }
      }, 3000);
    };
    
    script.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    document.head.appendChild(script);

    // Also load Calendly CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount if needed
    };
  }, []);

  return (
    <main className="min-h-screen text-white pt-24 pb-16 px-6" style={{ background: "#030014" }}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4f1cd4]/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7c3aed]/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#a855f7]/10 rounded-full blur-[150px]" />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Back Navigation */}
        <nav className="mb-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#a855f7] transition-all duration-300 group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to contact
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-12 text-center">
          {/* Icon */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-3xl blur-xl opacity-50"
                style={{ background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)" }}
              />
              <div
                className="relative w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ 
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Schedule a Call
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Pick a time that works for you. Book a free 30-minute discovery call to discuss your project, goals, and how I can help.
          </p>

          {/* Quick info badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {[
              { icon: "⏱", text: "30 minutes" },
              { icon: "🎥", text: "Video call" },
              { icon: "✓", text: "Free consultation" },
            ].map((badge, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10"
              >
                <span>{badge.icon}</span>
                <span className="text-sm text-white/50">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendly Widget Container */}
        <div 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(15, 10, 40, 0.6) 0%, rgba(8, 5, 25, 0.8) 100%)",
            boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0520]/90 z-10">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#a855f7]/30 border-t-[#a855f7] animate-spin mx-auto mb-4" />
                <p className="text-white/50 text-sm">Loading calendar...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0520]/90 z-10">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-white/70 mb-2">Unable to load calendar</p>
                <p className="text-white/40 text-sm mb-6">Please try refreshing the page or use the direct link below</p>
                <a 
                  href="https://calendly.com/david-fajardo26v/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                    boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.5)",
                  }}
                >
                  Open Calendly
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* Calendly Inline Widget */}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/david-fajardo26v/30min?hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1&background_color=0a0520&text_color=ffffff&primary_color=a855f7"
            style={{ 
              minWidth: "320px", 
              height: "700px",
              width: "100%",
            }}
          />
        </div>

        {/* Alternative booking option */}
        <div className="mt-12 text-center">
          <div 
            className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(20, 15, 45, 0.5) 0%, rgba(10, 8, 30, 0.7) 100%)",
              boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-white/50 text-sm">Can&apos;t find a suitable time?</span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 border border-white/10 hover:border-[#a855f7]/50 hover:text-[#a855f7] transition-all duration-300"
            >
              Send me a message
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* What to expect section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We'll discuss your project requirements, goals, and timeline",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Strategy",
                description: "I'll share insights and recommendations tailored to your needs",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Next Steps",
                description: "We'll outline a clear path forward with a detailed proposal",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  background: "linear-gradient(135deg, rgba(20, 15, 45, 0.5) 0%, rgba(10, 8, 30, 0.7) 100%)",
                  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#a855f7]">{item.step}</span>
                </div>
                
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white/50 group-hover:text-[#a855f7] group-hover:border-[#a855f7]/30 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-[#a855f7] transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>

      {/* Custom styles for Calendly widget */}
      <style jsx global>{`
        .calendly-inline-widget {
          border-radius: 24px;
          overflow: hidden;
        }
        
        .calendly-inline-widget iframe {
          border-radius: 24px;
        }
        
        /* Override Calendly's default styles if possible */
        .calendly-badge-widget {
          display: none !important;
        }
      `}</style>
    </main>
  );
}