import Image from "next/image";
import React from "react";

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
    description:
      "Modern web apps with cutting-edge UX and performance.",
    image: "/Space1.png",
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
    image: "/Frame 1 (2).png",
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
    image: "/Frame 1.png",
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
    image: "/SpaceWebsite.png",
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
    image: "/Central-hub.png",
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
    image: "/SpaceCenter.png",
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
    image: "/Frame 1 (1).png",
    icon: "🖥️",
    items: [{ name: "Basic computer building & repair" }],
  },
];

const capabilities = [
  "Web Development",
  "Mobile Apps",
  "Digital Marketing",
  "Cloud Infrastructure",
  "UI & UX Design",
  "API Integrations",
  "DevOps & CI/CD",
  "Security & Auth",
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative z-10 w-full py-20 px-6 lg:px-20 flex flex-col items-center gap-10 text-center"
    >
      <div className="flex flex-col gap-3 max-w-4xl items-center">
        <p className="uppercase text-xs tracking-[0.3em] text-[#b49bff]">
          Skills & Tools
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
          Practical stack for shipping fast, stable, and polished experiences
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          From ideas to production, here’s the stack I reach for to move quickly,
          keep quality high, and deploy with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-[#2A0E61] bg-[#0c0f1a]/80 backdrop-blur shadow-lg shadow-[#2A0E61]/30 overflow-hidden flex flex-col"
          >
            <div className="relative h-48 w-full">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a] via-transparent to-transparent" />
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">{card.icon}</span>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {card.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-xl border border-[#2A0E61]/60 bg-[#0f1220]/80 px-3 py-2"
                  >
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#2A0E61]/50 flex items-center justify-center text-[10px] text-white">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm text-gray-200">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;
