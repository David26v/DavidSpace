"use client";
import { Socials, nav_links } from "@/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string, route?: string) => {
    setIsMenuOpen(false);
    
    if (route) {
      router.push(route);
      return;
    }

    if (sectionId === "home") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }

    if (pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <>
      <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-4 sm:px-6 lg:px-10">
        <div className="w-full h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="h-auto w-auto flex flex-row items-center">
              <Image
                src="/main_logo-removebg.png"
                alt="David Fajardo Logo"
                width={64}
                height={64}
                className="cursor-pointer hover:animate-slowspin w-12 h-12 sm:w-16 sm:h-16"
                priority
              />
              <span className="font-bold ml-2 hidden sm:block text-gray-200 tracking-wide text-sm sm:text-base">
                David Fajardo Space
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center justify-center border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200 gap-6">
              {nav_links.map((navItem) => (
                <a
                  key={navItem.section}
                  onClick={() => handleNavClick(navItem.section, navItem.route)}
                  className="cursor-pointer hover:text-white transition text-sm"
                >
                  {navItem.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Desktop */}
          <div className="flex flex-row gap-3 sm:gap-4 items-center">
            <button
              onClick={() => handleNavClick("contact-page", "/contact")}
              className="hidden md:inline-flex px-4 py-2 border border-[#7042f8] text-white text-sm rounded-full hover:bg-[#7042f826] transition"
            >
              Let&apos;s Talk
            </button>
            
            {/* Social Icons - Hidden on very small screens */}
            <div className="hidden sm:flex gap-3">
              {Socials.map((social) =>
                social.link ? (
                  <a
                    href={social.link}
                    key={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <Image
                      src={social.src}
                      alt={social.name}
                      width={24}
                      height={24}
                    />
                  </a>
                ) : (
                  <Image
                    src={social.src}
                    alt={social.name}
                    key={social.name}
                    width={24}
                    height={24}
                  />
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg border border-[#7042f861] bg-[#0300145e] transition-colors hover:bg-[#7042f826]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white my-1 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-[65px] right-0 w-full max-w-sm h-[calc(100vh-65px)] bg-[#030014]/95 backdrop-blur-xl z-40 md:hidden transition-transform duration-300 ease-out border-l border-[#2A0E61]/50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {nav_links.map((navItem, index) => (
              <a
                key={navItem.section}
                onClick={() => handleNavClick(navItem.section, navItem.route)}
                className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-200 hover:text-white hover:bg-[#7042f8]/10 transition-all cursor-pointer group"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#7042f8]/50 group-hover:bg-[#7042f8] transition-colors" />
                <span className="text-lg font-medium">{navItem.name}</span>
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#7042f8]/30 to-transparent" />

          {/* CTA Button */}
          <button
            onClick={() => handleNavClick("contact-page", "/contact")}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold shadow-lg shadow-[#7042f8]/30 hover:shadow-[#7042f8]/50 transition-shadow"
          >
            Let&apos;s Talk
          </button>

          {/* Social Links */}
          <div className="mt-auto">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
              Connect with me
            </p>
            <div className="flex gap-4">
              {Socials.map((social) =>
                social.link ? (
                  <a
                    href={social.link}
                    key={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#0c0f1a]/80 border border-[#2A0E61]/50 flex items-center justify-center hover:border-[#7042f8]/50 hover:bg-[#7042f8]/10 transition-all"
                  >
                    <Image
                      src={social.src}
                      alt={social.name}
                      width={24}
                      height={24}
                    />
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-6 pt-4 border-t border-[#2A0E61]/30">
            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} David Fajardo
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
