"use client";

import React, { useState } from "react";
import ProjectCard from "../sub/ProjectCard";
import { PROJECTS, projectCategories, getFeaturedProjects, getProjectsByCategory, type ProjectCategory } from "@/constants/projects";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const featuredProjects = getFeaturedProjects();
  const filteredProjects = getProjectsByCategory(selectedCategory);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  // SEO Structured Data for Projects
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "David R. Fajardo - Portfolio Projects",
    description: "A collection of web development projects by David R. Fajardo, showcasing expertise in Next.js, React, TypeScript, and modern web technologies.",
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      description: project.description,
      url: project.url,
      image: `https://www.davidfajardo.space${project.image}`,
      creator: {
        "@type": "Person",
        name: "David R. Fajardo",
      },
      datePublished: `${project.year}-01-01`,
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
    })),
  };

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />

      <section
        className="flex flex-col items-center justify-center py-20"
        id="projects"
        aria-label="Projects Portfolio"
      >
        {/* Header */}
        <div className="text-center mb-12 px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-6 mb-4">
            Recent Projects & Live Previews
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my portfolio of web applications, SaaS platforms, and landing pages built with modern technologies like Next.js, React, and TypeScript.
          </p>
        </div>

        {/* Category Filter */}
        <div className="w-full max-w-7xl px-6 md:px-10 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as ProjectCategory)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30"
                    : "bg-[#0c0f1a]/70 text-gray-400 border border-[#2A0E61] hover:border-purple-500/50 hover:text-white"
                }`}
                aria-label={`Filter projects by ${category.label}`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        {selectedCategory === "all" && featuredProjects.length > 0 && (
          <div className="w-full max-w-7xl px-6 md:px-10 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                Featured Projects
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-3xl border border-[#2A0E61] bg-[#0c0f1a]/70 p-4 md:p-6 shadow-lg shadow-[#2A0E61]/30 hover:shadow-purple-500/20 transition-all duration-300"
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  <meta itemProp="name" content={project.title} />
                  <meta itemProp="description" content={project.description} />
                  <meta itemProp="url" content={project.url} />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-[#facc15]/20 border border-[#facc15] text-[#facc15]">
                      Featured
                    </span>
                    <span className="text-sm text-[#b49bff]">{project.title}</span>
                    <span className="ml-auto text-xs text-gray-500">{project.year}</span>
                  </div>
                  <ProjectCard
                    src={project.image}
                    title={project.title}
                    description={project.description}
                    url={project.url}
                    techStack={project.techStack}
                  />
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <div className="w-full max-w-7xl px-6 md:px-10">
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                <h2 className="text-xl font-semibold text-white">
                  {projectCategories.find((c) => c.id === selectedCategory)?.label || "Projects"}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {regularProjects.map((project) => (
                <article
                  key={project.id}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  <meta itemProp="name" content={project.title} />
                  <meta itemProp="description" content={project.description} />
                  <meta itemProp="url" content={project.url} />
                  <ProjectCard
                    src={project.image}
                    title={project.title}
                    description={project.description}
                    url={project.url}
                    techStack={project.techStack}
                  />
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {regularProjects.length === 0 && selectedCategory !== "all" && (
          <div className="text-center py-12 px-6">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}

      </section>
    </>
  );
};

export default Projects;
