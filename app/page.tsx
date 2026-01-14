import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import About from "@/components/main/About";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import StarsCanvas from "@/components/main/StarBackgroundClient";
import Experience from "@/components/main/Experience";
import Blogs from "@/components/main/Blogs";

export default function Home() {
  return (
    <main className="h-full w-full relative">
      <StarsCanvas />
      <div className="flex flex-col gap-20 relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience/>
        <Encryption />
        <Projects />  
        <Blogs />
      </div>
    </main>
  );
}
