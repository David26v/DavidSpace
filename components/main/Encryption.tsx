"use client";

import React from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/motion";
import Image from "next/image";
import Link from "next/link";

const Encryption = () => {
  return (
    <div className="flex flex-row relative items-center justify-center min-h-[80vh] sm:min-h-screen w-full h-full px-4">
      {/* Title */}
      <div className="absolute w-auto h-auto top-4 sm:top-0 z-[5] px-4">
        <motion.div
          variants={slideInFromTop}
          className="text-2xl sm:text-3xl md:text-[40px] font-medium text-center text-gray-200"
        >
          Performance
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            &{" "}
          </span>
          Security
        </motion.div>
      </div>

      {/* Lock Icon */}
      <div className="flex flex-col items-center justify-center translate-y-[-30px] sm:translate-y-[-50px] absolute z-[20] w-auto h-auto">
        <Link
          href="/security"
          className="flex flex-col items-center group cursor-pointer w-auto h-auto active:scale-95 transition-transform"
          aria-label="Learn how I handle performance and security"
        >
          <Image
            src="/LockTop.png"
            alt="Lock top"
            width={50}
            height={50}
            className="w-[40px] sm:w-[50px] translate-y-4 sm:translate-y-5 transition-all duration-200 group-hover:translate-y-9 sm:group-hover:translate-y-11"
          />
          <Image
            src="/LockMain.png"
            alt="Lock Main"
            width={70}
            height={70}
            className="z-10 w-[55px] sm:w-[70px]"
          />
        </Link>

        <div className="Welcome-box px-[12px] sm:px-[15px] py-[4px] z-[20] border my-[15px] sm:my-[20px] border-[#7042f88b] opacity-[0.9]">
          <h1 className="Welcome-text text-[10px] sm:text-[12px]">Encryption</h1>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute z-[20] bottom-[50px] sm:bottom-[10px] px-4 sm:px-[5px]">
        <div className="cursive text-base sm:text-[20px] font-medium text-center text-gray-300">
          Secure your data with end-to-end encryption
        </div>
      </div>

      {/* Click Hint */}
      <div className="absolute bottom-16 sm:bottom-20 z-[25]">
        <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-2 animate-pulse">
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span className="hidden sm:inline">Click the lock to learn more</span>
          <span className="sm:hidden">Tap to learn more</span>
        </p>
      </div>

      {/* Background Video */}
      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
          className="w-full h-auto opacity-80 sm:opacity-100"
          poster="/encryption-poster.jpg"
        >
          <source src="/encryption.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default Encryption;
