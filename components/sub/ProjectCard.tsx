import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
  url?: string;
  techStack?: string[];
}

const ProjectCard = ({ src, title, description, url, techStack }: Props) => {
  const token = process.env.NEXT_PUBLIC_THUMIO_TOKEN;
  const screenshotUrl =
    url && token
      ? `https://image.thum.io/get/raw/${token}/width/1200/crop/800/${encodeURI(
          url
        )}`
      : src;

  const content = (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] cursor-pointer transition-transform transform hover:scale-105 h-full flex flex-col bg-[#0c0f1a]/70">
      <div className="absolute top-3 right-3 z-10">
        <span className="px-3 py-1 text-xs uppercase tracking-wide rounded-full bg-[#2A0E61]/60 text-white border border-[#2A0E61]">
          Live preview
        </span>
      </div>

      <Image
        src={screenshotUrl}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-contain bg-[#0d0f1a]"
      />

      <div className="relative p-4 flex flex-col flex-grow gap-3">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-gray-300 flex-grow text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Tech Stack */}
        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {techStack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-md bg-[#2A0E61]/50 text-[#b49bff] border border-[#2A0E61]"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-md bg-[#2A0E61]/50 text-gray-400 border border-[#2A0E61]">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xs text-[#b49bff] uppercase tracking-wide">
            {url ? "Open live site" : "Preview coming soon"}
          </span>
          {url && (
            <span className="text-sm text-white underline decoration-[#7042f8] hover:decoration-cyan-500 transition-colors">
              View →
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {content}
        </a>
      ) : (
        <div className="block h-full opacity-80 pointer-events-none">
          {content}
        </div>
      )}
    </>
  );
};



export default ProjectCard;
