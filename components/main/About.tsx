import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section
      id="about-me"
      className="relative z-10 w-full py-20 px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12"
    >
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-[32px] overflow-hidden border border-[#2A0E61] shadow-xl shadow-[#2A0E61]/40 bg-[#0c0f1a]">
          <div className="absolute inset-0 -skew-x-6 bg-gradient-to-br from-[#7042f8]/25 via-transparent to-[#00e0ff]/20 pointer-events-none" />
          <Image
            src="/Profile.png"
            alt="Portrait of David Fajardo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a] via-transparent to-transparent" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-5 text-gray-200">
        <p className="uppercase text-xs tracking-[0.3em] text-[#b49bff]">
          About Me
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
          Software engineer turning ideas into reliable products
        </h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          I’m a full-stack engineer who loves shaping ideas into shippable, calm,
          and resilient experiences. I balance UX polish with solid architecture,
          guide teams through delivery, and keep everyone aligned on outcomes—so
          good ideas become products people trust.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Full-stack delivery: Next.js, React, Node, SQL/NoSQL",
            "Systems thinking: architecture, APIs, and DX tooling",
            "UI polish: accessibility, micro-interactions, design systems",
            "Collaboration: product alignment, mentoring, docs",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[#2A0E61] bg-[#0c0f1a]/70 px-4 py-3 text-sm text-gray-200"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          <a
            href="mailto:david.fajardo26v@gmail.com"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium"
          >
            Let’s collaborate
          </a>
          <a
            href="/David Fajarod-Software Engineer-2025.pdf"
            download
            className="px-5 py-2 rounded-lg border border-[#7042f88b] text-white hover:bg-[#7042f81a] transition"
          >
            View resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;

