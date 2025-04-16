import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="projects">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
        <ProjectCard
          src="/SpaceCenter.png"
          title="Space Center Apps"
          description="All in One space app that can be used by all users with necessary tools."
          url=""
        />
        <ProjectCard
          src="Central-hub.png"
          title="Central Hub"
          description="A system that has feature of chat,email call and sms for later it will become payroll system that are belong to ZenithOs Suite that iam currently working on ."
          url="https://centralhub-seven.vercel.app/"
        />
        <ProjectCard
          src="/multi-activity.png"
          title="Multi Activity App"
          description="A mini system created for fun, built with Next.js and Tailwind CSS. Uses Supabase for database management, supporting picture uploads and CRUD operations."
          url="https://multi-activity-app.vercel.app/"
        />
      </div>
    </div>
  );
};



export default Projects;
