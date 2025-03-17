import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
  url: string;
}

const ProjectCard = ({ src, title, description, url }: Props) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] cursor-pointer transition-transform transform hover:scale-105 h-full flex flex-col">
        <Image
          src={src}
          alt={title}
          width={1000}
          height={1000}
          className="w-full object-contain"
        />

        {/* This div will push everything down equally */}
        <div className="relative p-4 flex flex-col flex-grow">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-gray-300 flex-grow">{description}</p>
        </div>
      </div>
    </a>
  );
};



export default ProjectCard;
