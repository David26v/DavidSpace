"use client";

import React from "react";
import Link from "next/link";
import {
  RxGithubLogo,
  RxInstagramLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#030014] text-gray-200 border-t border-[#2A0E61]/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#7042f8]/5 via-transparent to-transparent pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top Section - CTA */}
        <div className="py-12 md:py-16 border-b border-[#2A0E61]/30">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-400">Available for new projects</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Let&apos;s Build Something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
                  Amazing
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Have a project in mind? I&apos;m always open to discussing new opportunities,
                creative ideas, or partnerships. Let&apos;s turn your vision into reality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:shadow-lg hover:shadow-[#7042f8]/30 transition-all duration-300 flex items-center gap-2"
              >
                <FaEnvelope className="group-hover:rotate-12 transition-transform" />
                Get in Touch
              </Link>
              <a
                href="/David Fajarod-Software Engineer-2025.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-xl border border-[#7042f8]/50 text-white font-semibold hover:bg-[#7042f8]/10 hover:border-[#7042f8] transition-all duration-300 text-center"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">David Fajardo</h3>
              <p className="text-sm text-[#b49bff]">Full-Stack Developer</p>
            </div>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:david.fajardo26v@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <FaEnvelope className="text-[#7042f8] group-hover:scale-110 transition-transform" />
                david.fajardo26v@gmail.com
              </a>
              <a
                href="tel:+639762594374"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <FaPhone className="text-[#7042f8] group-hover:scale-110 transition-transform" />
                +63 976 259 4374
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-[#7042f8] mt-1 flex-shrink-0" />
                <span>Caloocan City, Metro Manila, Philippines</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="#about-me" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">
                About Me
              </a>
              <a href="#skills" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">
                Skills
              </a>
              <a href="#experience" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">
                Experience
              </a>
              <a href="#projects" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">
                Projects
              </a>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Resources
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/blog" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">
                Blog
              </Link>
              <Link href="/store" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">
                Store
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">
                Contact
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">
                Full Bio
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Connect
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                href="https://github.com/David26v"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group text-sm"
              >
                <RxGithubLogo className="text-lg group-hover:scale-110 transition-transform" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/david-rodrigo-fajardo/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group text-sm"
              >
                <RxLinkedinLogo className="text-lg group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/vid_26.fajardo/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group text-sm"
              >
                <RxInstagramLogo className="text-lg group-hover:scale-110 transition-transform" />
                Instagram
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-[#2A0E61]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-500">
            <span>&copy; {currentYear} David Fajardo. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Crafted with Next.js & Tailwind CSS</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/security" className="text-sm text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm text-gray-400 hover:text-[#b49bff] transition-colors"
            >
              Back to Top
              <span className="p-2 rounded-full bg-[#7042f8]/10 group-hover:bg-[#7042f8]/20 transition-colors">
                <FaArrowUp className="text-[#7042f8] group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
