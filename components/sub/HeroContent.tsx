"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-20 pt-8 sm:pt-12 lg:pt-20 w-full z-[20] gap-8 lg:gap-10 pb-10 sm:pb-0"
    >
      <div className="h-full w-full flex flex-col gap-4 sm:gap-5 justify-center m-auto text-center lg:text-start bg-[#030014]/40 md:bg-transparent rounded-2xl p-4 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[10px] sm:px-[7px] border border-[#7042f88b] opacity-[0.9] mx-auto lg:mx-0"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-4 w-4 sm:h-5 sm:w-5" />
          <h1 className="Welcome-text text-[11px] sm:text-[13px]">
            David R. Fajardo
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-[720px] w-auto h-auto drop-shadow-lg"
        >
          <span className="leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.8)]">
            Providing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              the best{" "}
            </span>
            project experience
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-sm sm:text-base lg:text-lg text-gray-200 my-3 sm:my-5 max-w-[720px] leading-relaxed px-2 sm:px-0 [text-shadow:_0_1px_10px_rgba(0,0,0,0.9)]"
        >
          I&apos;m a Full Stack Software Engineer focused on crafting reliable, human-centered products.
          I blend frontend polish with backend rigor to build experiences that feel fast, intuitive,
          and trustworthy. Outside of code, I lead design systems, mentor teammates, and prototype
          ideas that solve real problems for businesses and communities.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
        >
          <a
            href="/David Fajarod-Software Engineer-2025.pdf"
            download
            className="w-full sm:w-auto py-3 sm:py-2 px-6 button-primary text-white rounded-lg text-center text-sm sm:text-base font-medium"
          >
            Download Resume
          </a>
          <a
            href="/contact"
            className="w-full sm:w-auto py-3 sm:py-2 px-6 border border-[#7042f88b] text-white rounded-lg hover:bg-[#7042f81a] transition text-center text-sm sm:text-base font-medium"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden sm:flex w-full h-full justify-center items-center mt-6 lg:mt-0"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={650}
          width={650}
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px]"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
