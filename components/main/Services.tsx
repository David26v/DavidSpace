import React from "react";
import Link from "next/link";

const Services = () => {
  return (
    <section
      id="freelance"
      className="flex flex-col items-center justify-center py-20 px-6 md:px-12 lg:px-20 gap-8"
    >
      <div className="text-center max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-[#b49bff]">
          Freelance & Consulting
        </p>
        <h2 className="text-[36px] md:text-[42px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Build, launch, and scale your next idea
        </h2>
        <p className="text-gray-300 text-lg">
          I partner with startups, agencies, and founders to ship fast, secure, and
          user-focused web experiences. From design systems to production-grade
          backends, I deliver end-to-end solutions that are measurable and maintainable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {[
          {
            title: "Product Builds",
            desc: "MVPs, dashboards, and marketing sites with modern stacks.",
          },
          {
            title: "Performance & Security",
            desc: "Audits, hardening, and optimization for speed and safety.",
          },
          {
            title: "Design Systems",
            desc: "Reusable UI libraries that scale with your team.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-xl border border-[#2A0E61] bg-[#0c0f1a]/70 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/contact"
          className="py-2 px-6 button-primary text-white rounded-lg"
        >
          Start a project
        </Link>
        <a
          href="#projects"
          className="py-2 px-6 border border-[#7042f8] text-white rounded-lg hover:bg-[#7042f826] transition"
        >
          View recent work
        </a>
      </div>
    </section>
  );
};

export default Services;