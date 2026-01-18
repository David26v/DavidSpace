import Image from "next/image";
import Link from "next/link";
import StarsCanvas from "@/components/main/StarBackgroundClient";

export default function AboutPage() {
  const experiences = [
    {
      role: "Software Engineer",
      company: "Rooche Digital",
      period: "Feb 2025 – Present",
      type: "Part-Time",
      description: "Architecting and deploying production-grade web applications using Next.js, React, Laravel, and Ruby on Rails.",
    },
    {
      role: "Full-Stack Developer",
      company: "Quickstore",
      period: "Jul 2024 – Aug 2024",
      type: "Full-Time",
      description: "Single-handedly designed and developed a complete locker management solution with Android app and admin dashboard.",
    },
    {
      role: "Software Developer",
      company: "Jeonsoft Corporation",
      period: "2023 – 2025",
      type: "Full-Time",
      description: "Built and maintained scalable web applications using React.js and Ruby on Rails.",
    },
  ];

  const skills = {
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express", "Ruby on Rails", "Laravel", "Python"],
    database: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"],
    mobile: ["React Native", "Java", "Kotlin"],
    tools: ["Git", "Figma", "Vercel", "Docker", "VS Code"],
  };

  return (
    <div className="relative min-h-screen w-full">
      <StarsCanvas />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="uppercase text-xs tracking-[0.3em] text-[#b49bff] mb-4">
            About Me
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
              David R. Fajardo
            </span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            A Full-Stack Developer and Software Engineer based in Caloocan City, Metro Manila, Philippines.
            I specialize in building modern, fast, and user-friendly web applications.
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#7042f8]/50 shadow-lg shadow-[#7042f8]/20">
              <Image
                src="/Profile.png"
                alt="David R. Fajardo"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/60 to-transparent" />
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Full-Stack Developer & Software Engineer
            </h2>
            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                I&apos;m a passionate developer who loves turning ideas into reality through code.
                My journey in software development started with curiosity about how websites work,
                and it has grown into a fulfilling career building products that make a difference.
              </p>
              <p>
                I specialize in the JavaScript/TypeScript ecosystem, with expertise in React, Next.js,
                and Node.js. I&apos;m equally comfortable working on frontend interfaces and backend systems,
                and I take pride in writing clean, maintainable code.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to
                open-source projects, or sharing what I&apos;ve learned through my blog.
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                <p className="text-white font-medium">Philippines</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Availability</p>
                <p className="text-green-400 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Open to work
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50 hover:border-[#7042f8]/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                    <p className="text-[#b49bff]">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <span className="text-sm text-gray-400">{exp.period}</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-[#7042f8]/20 text-[#b49bff] border border-[#7042f8]/40">
                      {exp.type}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/#experience"
              className="inline-flex items-center gap-2 text-[#b49bff] hover:text-white transition-colors"
            >
              View full experience timeline
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="p-6 rounded-2xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50"
              >
                <h3 className="text-sm uppercase tracking-wider text-[#b49bff] mb-4 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs rounded-full bg-[#0f1220] border border-[#2A0E61]/50 text-gray-300 hover:border-[#7042f8]/50 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What I Do Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            What I Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌐",
                title: "Web Development",
                description: "Building fast, responsive web applications with modern frameworks like Next.js and React.",
              },
              {
                icon: "📱",
                title: "Mobile Development",
                description: "Creating cross-platform mobile apps using React Native, Java, and Kotlin.",
              },
              {
                icon: "🎨",
                title: "UI/UX Design",
                description: "Designing intuitive user interfaces with attention to detail and user experience.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50 text-center hover:border-[#7042f8]/50 transition-colors"
              >
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#7042f8]/10 to-[#b49bff]/5 border border-[#7042f8]/30">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            I&apos;m currently available for freelance projects and open to full-time opportunities.
            If you have a project in mind or just want to chat, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all"
            >
              Get in Touch
            </Link>
            <a
              href="/David Fajarod-Software Engineer-2025.pdf"
              download
              className="w-full sm:w-auto px-8 py-3 rounded-xl border border-[#7042f8]/50 text-white font-medium hover:bg-[#7042f8]/10 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* Connect Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">Connect with me</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/David26v"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50 flex items-center justify-center hover:border-[#7042f8]/50 hover:bg-[#7042f8]/10 transition-all"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/david-rodrigo-fajardo/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50 flex items-center justify-center hover:border-[#7042f8]/50 hover:bg-[#7042f8]/10 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/vid_26.fajardo/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50 flex items-center justify-center hover:border-[#7042f8]/50 hover:bg-[#7042f8]/10 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="mailto:david.fajardo26v@gmail.com"
              className="w-12 h-12 rounded-xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50 flex items-center justify-center hover:border-[#7042f8]/50 hover:bg-[#7042f8]/10 transition-all"
              aria-label="Email"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
