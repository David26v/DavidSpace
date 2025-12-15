import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import About from "@/components/main/About";
import Capabilities from "@/components/main/Capabilities";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import Services from "@/components/main/Services";
import StarsCanvas from "@/components/main/StarBackgroundClient";

export default function Home() {
  return (
    <main className="h-full w-full relative">
      <StarsCanvas />
      <div className="flex flex-col gap-20 relative z-10">
        <Hero />
        <About />
        <Skills />
        <Capabilities />
        <Services />
        <Encryption />
        <Projects />  
      </div>
    </main>
  );
}
