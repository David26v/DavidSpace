import React from "react";
import {
  RxGithubLogo,
  RxInstagramLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { FaYoutube, FaEnvelope, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="w-full bg-[#050510]/80 text-gray-200 border-t border-[#2A0E61] mt-20"
    >
      <div className="w-full max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-md space-y-3">
            <p className="uppercase text-xs tracking-[0.2em] text-[#b49bff]">
              Let&apos;s collaborate
            </p>
            <h3 className="text-2xl font-semibold">Building meaningful products together</h3>
            <p className="text-sm text-gray-400">
              Open to collaborations, freelance work, and full-time opportunities.
              Drop a message and let&apos;s bring your next idea to life.
            </p>
            <a
              href="mailto:david.fajardo26v@gmail.com"
              className="inline-flex items-center gap-2 text-white underline decoration-[#7042f8]"
            >
              <FaEnvelope /> david.fajardo26v@gmail.com
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
            <div className="space-y-3">
              <p className="font-semibold text-white">Explore</p>
              <a href="#about-me" className="block text-gray-400 hover:text-white">About</a>
              <a href="#skills" className="block text-gray-400 hover:text-white">Skills</a>
              <a href="#projects" className="block text-gray-400 hover:text-white">Projects</a>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-white">Social</p>
              <a href="https://www.facebook.com/LeL0uCh26/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <FaFacebook /> Facebook
              </a>
              <a href="https://www.instagram.com/chinitz_david26/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <RxInstagramLogo /> Instagram
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <RxLinkedinLogo /> LinkedIn
              </a>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-white">Work & Code</p>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <RxGithubLogo /> GitHub
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <FaYoutube /> YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 border-t border-[#2A0E61] pt-6">
          <span>&copy; David Fajardo Dev 2025. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Built with Next.js & Tailwind CSS.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;