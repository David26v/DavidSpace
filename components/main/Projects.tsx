import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/NextWebsite.png"
          title="Space Center Apps"
          description="All in One space app that can use by all users that every tools are needed."
          url=""
        />
        <ProjectCard
          src="/CardImage.png"
          title="Project EclipSys"
          description="A Monitoring tool that built in c++  and react js in web where users can see the monitors of employees ."
          url=""
        />
        <ProjectCard
          src="/SpaceWebsite.png"
          title="Trading Prediction Tool"
          description="this tool will be used by the stock traders or cryto traders that needed an accurate information."
          url=""
        />
      </div>
    </div>
  );
};

export default Projects;
