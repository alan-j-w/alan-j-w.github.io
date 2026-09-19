"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAssetPath } from "@/lib/assets";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Work", href: "/#projects" },
  { name: "Writing", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-ink-100"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group"
            aria-label="Alan Joy Wilson — home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 relative rounded-full overflow-hidden border-2 border-ink-200 group-hover:border-ink-400 transition-colors duration-200 shadow-sm">
              <Image
                src={getAssetPath("/images/logo.jpg")}
                alt="Alan Logo"
                width={50}
                height={50}
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-14 ml-auto" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 group"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-5 bg-ink-900 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
            />
            <span
              className={`block h-px bg-ink-900 transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"
                }`}
            />
            <span
              className={`block h-px w-5 bg-ink-900 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col transition-all duration-300 ease-spring md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex-1 flex flex-col justify-center px-8 gap-8 sm:gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl sm:text-4xl font-bold text-ink-900 hover:text-ink-600 transition-colors duration-150"
              style={{
                transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
                transition: menuOpen
                  ? `transform 0.3s ${i * 50}ms cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease`
                  : "transform 0.3s 0ms cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease",
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="px-8 pb-10 sm:pb-12">
          <a
            href="mailto:alanjoywilson@gmail.com"
            className="text-sm font-medium text-ink-400"
          >
            alanjoywilson@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}
