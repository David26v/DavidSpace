"use client";
import { Socials, nav_links } from "@/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (sectionId: string, route?: string) => {
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
        <div className="hidden md:flex flex-row gap-3 sm:gap-4 items-center">
          <button
            onClick={() => handleNavClick("contact-page", "/contact")}
            className="px-4 py-2 border border-[#7042f8] text-white text-sm rounded-full hover:bg-[#7042f826] transition"
          >
            Let&apos;s Talk
          </button>

          {/* Social Icons */}
          <div className="flex gap-3">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
