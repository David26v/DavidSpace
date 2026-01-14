// Project Types
export type ProjectCategory = "all" | "web-app" | "landing-page" | "saas" | "portfolio";

export type Project = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: ProjectCategory;
  image: string;
  url: string;
  techStack: string[];
  featured?: boolean;
  year: number;
  status: "live" | "development" | "archived";
  client?: string;
  role?: string;
};

/**
 * Add new projects by appending to this array.
 * The projects section will automatically display them.
 */
export const PROJECTS: Project[] = [
  {
    id: "c5m-world",
    title: "C5M World",
    shortDescription: "Experience hub for creative storytelling and immersive brand journeys",
    description:
      "Experience hub for creative storytelling and immersive brand journeys, highlighting multimedia work in a sleek, responsive layout. Built with modern web technologies to deliver exceptional user experiences.",
    category: "web-app",
    image: "/SpaceWebsite.png",
    url: "https://c5m.world/",
    techStack: ["Next.js", "Prisma", "GCP", "Stripe", "LULU API"],
    featured: true,
    year: 2024,
    status: "live",
    role: "Full-Stack Developer",
  },
  {
    id: "amaya-ph",
    title: "AMAYA PH",
    shortDescription: "AI-powered education platform with earn-while-you-learn pathways",
    description:
      "AI-powered education platform to make learning accessible and affordable with earn-while-you-learn pathways. Revolutionizing education through technology and innovative learning models.",
    category: "landing-page",
    image: "/CardImage.png",
    url: "https://amaya-ph.vercel.app/",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    featured: true,
    year: 2024,
    status: "live",
    role: "Full-Stack Developer",
  },
  {
    id: "zentryx-workforce",
    title: "Zentryx Workforce",
    shortDescription: "Workforce management system for scheduling, attendance, and team coordination",
    description:
      "Workforce management system focused on scheduling, attendance, and streamlined team coordination for growing organizations. Comprehensive HR solution with real-time tracking and analytics.",
    category: "saas",
    image: "/Frame 1 (2).png",
    url: "https://zentryx-workforce-management-system.vercel.app/",
    techStack: ["Next.js", "JavaScript", "Supabase", "Shadcn"],
    year: 2024,
    status: "live",
    role: "Full-Stack Developer",
  },
  {
    id: "supraarc",
    title: "SupraArc",
    shortDescription: "Digital transformation agency crafting exceptional digital experiences",
    description:
      "Build Your Digital Future with SupraArc Technologies. We craft exceptional digital experiences that transform businesses and delight users worldwide. Modern web solutions with cutting-edge technology.",
    category: "landing-page",
    image: "/SpaceCenter.png",
    url: "https://www.supraarc.com/",
    techStack: ["Next.js", "JavaScript"],
    year: 2024,
    status: "live",
    role: "Web Developer",
  },
  {
    id: "astraeus-tech",
    title: "Astraeus Tech",
    shortDescription: "Philippine-based software partner delivering secure web and SaaS solutions",
    description:
      "Philippine-based software partner delivering secure, modern web and SaaS solutions with Next.js and Supabase. Live demos and client work showcasing cutting-edge development practices.",
    category: "web-app",
    image: "/Space1.png",
    url: "https://astraeus-tech.vercel.app/",
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    year: 2024,
    status: "live",
    role: "Full-Stack Developer",
  },
  {
    id: "paper-jumpsuit",
    title: "Paper Jumpsuit",
    shortDescription: "Book landing page showcasing insights into the U.S. federal justice system",
    description:
      "Book landing page showcasing an unfiltered look into the U.S. federal justice system, focused on clarity and conversion. Clean, modern design optimized for engagement and readability.",
    category: "landing-page",
    image: "/Frame 1.png",
    url: "https://paperjumpsuit.com/",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    year: 2024,
    status: "live",
    role: "Frontend Developer",
  },
  {
    id: "carpenter-mike",
    title: "Carpenter Mike",
    shortDescription: "Professional remodeling and renovation services portfolio website",
    description:
      "Complete remodeling, renovations & makeovers for residential and commercial interiors. Professional portfolio website showcasing 30+ years of experience in kitchen renovations, bathroom updates, custom woodwork, and commercial interior projects in Kelowna, BC.",
    category: "portfolio",
    image: "/carpenter-mike.png",
    url: "https://carpentermike.com/",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    year: 2024,
    status: "live",
    role: "Web Developer",
  },
];

export const projectCategories = [
  { id: "all", label: "All Projects", icon: "✦" },
  { id: "web-app", label: "Web Apps", icon: "◈" },
  { id: "landing-page", label: "Landing Pages", icon: "◇" },
  { id: "saas", label: "SaaS", icon: "▢" },
  { id: "portfolio", label: "Portfolios", icon: "◆" },
];

// Get featured projects
export const getFeaturedProjects = () => PROJECTS.filter((p) => p.featured);

// Get projects by category
export const getProjectsByCategory = (category: ProjectCategory) => {
  if (category === "all") return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
};
