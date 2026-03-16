import Link from "next/link";
import Image from "next/image";
import { RxRocket, RxLightningBolt, RxTimer, RxCode } from "react-icons/rx";

export default function SdkBanner() {
  return (
    <section
      id="sdk-product"
      aria-label="SDK-TURBOREPO-STARTUP-EDITION Product"
      className="relative w-full px-4 sm:px-6 py-12 overflow-visible"
    >
      {/* Ambient glow behind the whole section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.08] blur-[140px]"
          style={{ background: "radial-gradient(circle, #7042f8 0%, #b49bff 40%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <Link href="/store" className="block group" aria-label="View SDK-TURBOREPO-STARTUP-EDITION details and pricing">
          <div className="relative rounded-3xl border border-[#7042f8]/30 bg-[#0a0d1a]/80 backdrop-blur-xl hover:border-[#7042f8]/60 transition-all duration-500">

            {/* ── Layout: Planet left, Content right ── */}
            <div className="relative flex flex-col lg:flex-row items-center">

              {/* Left: Floating planet image */}
              <div className="relative w-full lg:w-[50%] flex items-center justify-center py-10 sm:py-14 lg:py-16 px-6">
                {/* Orbital rings behind the image */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Outer orbit ring */}
                  <div className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#7042f8]/15 animate-orbit" />
                  {/* Inner orbit ring */}
                  <div className="absolute w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] rounded-full border border-[#b49bff]/10 animate-orbit-reverse" />

                  {/* Orbiting dots — outer ring */}
                  <div className="absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] animate-orbit">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#7042f8] shadow-[0_0_12px_rgba(112,66,248,0.8)]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#b49bff] shadow-[0_0_10px_rgba(180,155,255,0.7)]" />
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#7042f8]/60 shadow-[0_0_8px_rgba(112,66,248,0.5)]" />
                  </div>
                  {/* Orbiting dots — inner ring */}
                  <div className="absolute w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] animate-orbit-reverse">
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#b49bff]/80 shadow-[0_0_10px_rgba(180,155,255,0.6)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#7042f8]/50 shadow-[0_0_8px_rgba(112,66,248,0.4)]" />
                  </div>
                </div>

                {/* Planet glow — behind everything */}
                <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-[#7042f8]/20 blur-[60px] pointer-events-none group-hover:bg-[#7042f8]/30 transition-all duration-700" />

                {/* Float wrapper — only this element floats */}
                <div className="animate-float">
                  {/* Hover scale wrapper — separate from float so transforms don't conflict */}
                  <div className="group-hover:scale-105 transition-transform duration-700">
                    {/* The product image as "planet" */}
                    <div className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 lg:w-[272px] lg:h-[272px] rounded-full overflow-hidden border-2 border-[#7042f8]/40 shadow-[0_0_40px_rgba(112,66,248,0.25)] group-hover:shadow-[0_0_60px_rgba(112,66,248,0.4)] group-hover:border-[#7042f8]/70 transition-all duration-700">
                      <Image
                        src="/products/sdk_turborepo_main_banner.png"
                        alt="SDK-TURBOREPO-STARTUP-EDITION — Full-stack monorepo starter kit"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 208px, (max-width: 1024px) 240px, 272px"
                      />
                      {/* Glossy highlight on planet */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
                      {/* Bottom shadow for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex-1 p-6 sm:p-8 lg:p-10 lg:pl-2 text-center lg:text-left">
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-green-500/15 text-green-400 border border-green-500/25 tracking-wider">
                    New Release
                  </span>
                  <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-[#7042f8]/15 text-[#b49bff] border border-[#7042f8]/25 tracking-wider">
                    One-Time Payment
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
                    SDK-TURBOREPO
                  </span>
                  <br className="hidden sm:block" />
                  <span className="text-white"> STARTUP-EDITION</span>
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5 max-w-md mx-auto lg:mx-0">
                  Ship 6 production-ready apps from one codebase. Save $1,000+ in
                  development time and months of boilerplate setup.
                </p>

                {/* Mini feature pills */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300">
                    <RxCode className="w-3.5 h-3.5 text-[#b49bff]" />
                    <span>6 Apps</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-300">
                    <RxLightningBolt className="w-3.5 h-3.5 text-yellow-400" />
                    <span>17 Packages</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-300">
                    <RxTimer className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Save 100+ Hours</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-300">
                    <RxRocket className="w-3.5 h-3.5 text-orange-400" />
                    <span>Deploy in Hours</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white text-sm font-semibold shadow-lg shadow-[#7042f8]/20 group-hover:shadow-[#7042f8]/40 group-hover:scale-[1.03] transition-all duration-300">
                  <span>Explore &amp; Get Started</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* Price hint */}
                <p className="text-gray-500 text-xs mt-3">
                  Starting at <span className="text-[#b49bff] font-semibold">$29</span> — No subscriptions, own it forever
                </p>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#7042f8]/50 to-transparent" />
          </div>
        </Link>
      </div>
    </section>
  );
}
