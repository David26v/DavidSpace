import React from "react";
import ProjectCard from "../sub/ProjectCard";

const featured = [
  {
    src: "/SpaceWebsite.png",
    title: "C5M World",
    description:
      "Experience hub for creative storytelling and immersive brand journeys, highlighting multimedia work in a sleek, responsive layout.",
    url: "https://c5m.world/",
    badge: "Featured",
  },
  {
    src: "/CardImage.png",
    title: "AMAYA PH",
    description:
      "AI-powered education platform to make learning accessible and affordable with earn-while-you-learn pathways.",
    url: "https://amaya-ph.vercel.app/",
    badge: "Featured",
  },
];

const projects = [
  {
    src: "/Frame 1 (2).png",
    title: "Zentryx Workforce",
    description:
      "Workforce management system focused on scheduling, attendance, and streamlined team coordination for growing organizations.",
    url: "https://zentryx-workforce-management-system.vercel.app/",
  },
  {
    src: "/SpaceCenter.png",
    title: "SupraArc",
    description:
      "Build Your Digital Future with SupraArc Technologies. We craft exceptional digital experiences that transform businesses and delight users worldwide.",
    url: "https://www.supraarc.com/",
  },
  {
    src: "/Space1.png",
    title: "Astraeus Tech",
    description:
      "Philippine-based software partner delivering secure, modern web and SaaS solutions with Next.js and Supabase. Live demos and client work.",
    url: "https://astraeus-tech.vercel.app/",
  },
  {
    src: "/Frame 1.png",
    title: "Paper Jumpsuit",
    description:
      "Book landing page showcasing an unfiltered look into the U.S. federal justice system, focused on clarity and conversion.",
    url: "https://paperjumpsuit.com/",
  },
];

const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="projects">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20 text-center px-6">
        Recent Projects & Live Previews
      </h1>
      <div className="w-full max-w-7xl px-6 md:px-10 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featured.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-[#2A0E61] bg-[#0c0f1a]/70 p-4 md:p-6 shadow-lg shadow-[#2A0E61]/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-[#facc15]/20 border border-[#facc15] text-[#facc15]">
                {item.badge}
              </span>
              <span className="text-sm text-[#b49bff]">{item.title}</span>
            </div>
            <ProjectCard
              src={item.src}
              title={item.title}
              description={item.description}
              url={item.url}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-10 max-w-7xl w-full">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            src={project.src}
            title={project.title}
            description={project.description}
            url={project.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
