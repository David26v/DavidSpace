import React from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="home">
      {/* Background Video - optimized for mobile */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="rotate-180 absolute top-[-200px] sm:top-[-280px] md:top-[-340px] h-full w-full left-0 z-[1] object-cover opacity-60 md:opacity-100"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>
      
      {/* Dark overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-[#030014]/50 md:bg-transparent z-[2] pointer-events-none" />
      
      <HeroContent />
    </div>
  );
};

export default Hero;
