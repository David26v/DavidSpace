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
          src="/SpaceCenter.png"
          title="Space Center Apps"
          description="All in One space app that can use by all users that every tools are needed."
          url=""
        />
        <ProjectCard
          src="/Student_monitoring.png"
          title="Student Teacher Monitoring"
          description="A system that tracts activity of teachers and Student that monitors Screen activity for more info kindly contact me if you are interested."
          url=""
        />
        {/* <ProjectCard
          src="/SpaceWebsite.png"
          title="Trading Prediction Tool"
          description="this tool will be used by the stock traders or cryto traders that needed an accurate information."
        /> */}
      </div>
    </div>
  );
};

export default Projects;
