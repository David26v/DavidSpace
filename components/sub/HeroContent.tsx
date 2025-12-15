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
      className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 mt-32 lg:mt-40 w-full z-[20] gap-10"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            David R. Fajardo
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-5xl lg:text-6xl font-bold text-white max-w-[720px] w-auto h-auto"
        >
          <span>
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
          className="text-lg text-gray-300 my-5 max-w-[720px] leading-relaxed"
        >
          I&apos;m a Full Stack Software Engineer focused on crafting reliable, human-centered products.
          I blend frontend polish with backend rigor to build experiences that feel fast, intuitive,
          and trustworthy. Outside of code, I lead design systems, mentor teammates, and prototype
          ideas that solve real problems for businesses and communities.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="/David Fajarod-Software Engineer-2025.pdf"
            download
            className="py-2 px-6 button-primary text-white rounded-lg"
          >
            Download Resume
          </a>
          <a
            href="mailto:david.fajardo26v@gmail.com"
            className="py-2 px-6 border border-[#7042f88b] text-white rounded-lg hover:bg-[#7042f81a] transition"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={650}
          width={650}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
