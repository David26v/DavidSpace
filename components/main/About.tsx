"use client";

import React from "react";

const About = () => {
  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "10+", label: "Projects Delivered" },
    { value: "5+", label: "Happy Clients" },
    { value: "99%", label: "On-Time Delivery" },
  ];

  const skills = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Full-Stack Delivery",
      description: "Next.js, React, Node, SQL/NoSQL",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Systems Thinking",
      description: "Architecture, APIs, and DX tooling",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "UI Polish",
      description: "Accessibility, micro-interactions, design systems",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Collaboration",
      description: "Product alignment, mentoring, docs",
    },
  ];

  const techStack = [
    "Next.js",
    "React",
    "React Native",
    "Lynx Framework",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Supabase",
    "Tailwind CSS",
    "Java",
    "Kotlin",
    "REST APIs",
    "GraphQL",
  ];

  return (
    <section
      id="about-me"
      className="relative z-10 w-full py-20 px-6 lg:px-20"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h1>About David R. Fajardo - Full-Stack Developer & Software Engineer</h1>
        <p>
          David R. Fajardo is a Full-Stack Developer and Software Engineer based in Caloocan City, Metro Manila, Philippines.
          With over 2 years of professional experience, David specializes in building modern web applications using
          Next.js, React, TypeScript, Node.js, and various database technologies including PostgreSQL, MySQL, and MongoDB.
        </p>
        <p>
          David has successfully delivered more than 10 projects for clients worldwide, maintaining a 99% on-time delivery rate.
          He is known for creating fast, secure, and scalable web applications with excellent user experiences.
        </p>
        <p>
          Technical skills include: {techStack.join(", ")}. David is available for freelance projects and full-time opportunities.
        </p>
        <meta itemProp="name" content="David R. Fajardo" />
        <meta itemProp="jobTitle" content="Full-Stack Developer & Software Engineer" />
        <meta itemProp="description" content="Expert Full-Stack Developer specializing in Next.js, React, TypeScript, and modern web development." />
        <link itemProp="url" href="https://www.davidfajardo.space" />
        <meta itemProp="email" content="david.fajardo26v@gmail.com" />
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="addressLocality" content="Caloocan City" />
          <meta itemProp="addressRegion" content="Metro Manila" />
          <meta itemProp="addressCountry" content="Philippines" />
        </span>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7042f8 0%, transparent 70%)" }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #b49bff 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <header className="text-center mb-16">
          <p className="uppercase text-xs tracking-[0.3em] text-[#b49bff] mb-4">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
            Software engineer turning ideas<br />
            <span className="bg-gradient-to-r from-[#7042f8] to-[#b49bff] bg-clip-text text-transparent">
              into reliable products
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Hi, I&apos;m <strong className="text-white">David R. Fajardo</strong>, a full-stack engineer based in the Philippines 
            who loves shaping ideas into shippable, calm, and resilient experiences. I balance UX polish with solid architecture,
            guide teams through delivery, and keep everyone aligned on outcomes—so
            good ideas become products people trust.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16" role="list" aria-label="Professional statistics">
          {stats.map((stat, idx) => (
            <article
              key={idx}
              className="group relative p-6 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur text-center hover:border-[#7042f8]/50 transition-all duration-300"
              role="listitem"
            >
              {/* Hover glow */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(112, 66, 248, 0.1) 0%, transparent 70%)" }}
              />
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7042f8] to-[#b49bff] bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </article>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12" role="list" aria-label="Core competencies">
          {skills.map((skill, idx) => (
            <article
              key={idx}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur hover:border-[#7042f8]/50 transition-all duration-300"
              role="listitem"
            >
              <div 
                className="w-12 h-12 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/30 flex items-center justify-center text-[#b49bff] flex-shrink-0 group-hover:bg-[#7042f8]/20 group-hover:border-[#7042f8]/50 group-hover:scale-110 transition-all duration-300"
                aria-hidden="true"
              >
                {skill.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1 group-hover:text-[#b49bff] transition-colors">
                  {skill.title}
                </h3>
                <p className="text-gray-400 text-sm">{skill.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h3 className="text-center text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#0c0f1a]/80 border border-[#2A0E61]/50 text-gray-300 hover:border-[#7042f8]/50 hover:text-[#b49bff] transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* What I Bring Section */}
        <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            What I Bring to the Table
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Speed & Quality",
                description: "I ship fast without cutting corners. Clean code, tested features, and documentation included.",
                icon: "🚀",
              },
              {
                title: "Clear Communication",
                description: "Regular updates, no surprises. I keep you informed at every step of the development process.",
                icon: "💬",
              },
              {
                title: "Long-term Thinking",
                description: "I build for scale. Your product won't just work today—it'll grow with your business.",
                icon: "🎯",
              },
            ].map((item, idx) => (
              <article key={idx} className="space-y-3">
                <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                <h4 className="text-white font-medium">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Personal Note */}
        <div className="rounded-2xl border border-[#2A0E61]/50 bg-gradient-to-br from-[#7042f8]/5 to-transparent p-6 md:p-8 mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">A Bit More About Me</h3>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              I started my journey in software development driven by curiosity and a passion for building things that matter. 
              Over the years, I&apos;ve had the privilege of working with startups and established companies alike, 
              helping them transform their ideas into functional, beautiful, and performant applications.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, 
              or writing about software development best practices on my blog. I believe in continuous learning and 
              staying updated with the latest trends in the tech industry.
            </p>
            <p>
              I&apos;m particularly passionate about <strong className="text-white">developer experience</strong>, 
              <strong className="text-white"> performance optimization</strong>, and building products that users love. 
              I approach every project with the mindset of creating something I&apos;d be proud to use myself.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contact"
            className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(112,66,248,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Let&apos;s collaborate
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
          <a
            href="/David Fajarod-Software Engineer-2025.pdf"
            download
            className="group px-8 py-3.5 rounded-xl border border-[#7042f8]/50 text-white font-medium hover:bg-[#7042f8]/10 hover:border-[#7042f8] transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-gray-400 italic text-sm max-w-xl mx-auto mb-6">
            &quot;Great software is built by people who care deeply about both the code they write and the users who will use it.&quot;
          </blockquote>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0f1220]/80 border border-[#2A0E61]/30">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75" />
            </div>
            <span className="text-sm text-gray-300">
              Available for freelance & full-time opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
