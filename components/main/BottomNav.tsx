"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  RxHome,
  RxCode,
  RxReader,
  RxArchive,
  RxEnvelopeClosed,
  RxBackpack,
} from "react-icons/rx";

const tabs = [
  { name: "Home", icon: RxHome, section: "home", route: "/" },
  { name: "Projects", icon: RxCode, section: "projects", route: "/#projects" },
  { name: "Experience", icon: RxBackpack, section: "experience", route: "/#experience" },
  { name: "Blog", icon: RxReader, section: "blog", route: "/blog" },
  { name: "Store", icon: RxArchive, section: "store", route: "/store" },
  { name: "Contact", icon: RxEnvelopeClosed, section: "contact", route: "/contact" },
];

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (tab: (typeof tabs)[number]) => {
    if (tab.route === "/" && pathname === "/") return true;
    if (tab.route !== "/" && pathname.startsWith(tab.route.replace("/#", "/")))
      return false;
    if (tab.route !== "/" && pathname === tab.route) return true;
    if (tab.route === "/blog" && pathname.startsWith("/blog")) return true;
    if (tab.route === "/store" && pathname.startsWith("/store")) return true;
    if (tab.route === "/contact" && pathname.startsWith("/contact")) return true;
    return false;
  };

  const handleClick = (tab: (typeof tabs)[number]) => {
    if (tab.route === "/#projects" || tab.route === "/#experience") {
      const sectionId = tab.route.replace("/#", "");
      if (pathname === "/") {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(tab.route);
      }
      return;
    }

    if (tab.route === "/" && pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    router.push(tab.route);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-[#030014]/90 backdrop-blur-xl border-t border-[#2A0E61]/50 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const active = isActive(tab);
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => handleClick(tab)}
                className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-200 ${
                  active
                    ? "text-[#b49bff]"
                    : "text-gray-500 active:text-gray-300"
                }`}
                aria-label={tab.name}
              >
                <div
                  className={`relative ${
                    active ? "scale-110" : ""
                  } transition-transform duration-200`}
                >
                  {active && (
                    <div className="absolute -inset-2 bg-[#7042f8]/15 rounded-full blur-md" />
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    active ? "text-[#b49bff]" : "text-gray-500"
                  }`}
                >
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
