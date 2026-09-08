"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Github, Linkedin, ArrowRight, Download } from "lucide-react";

const TECH_STACK = [
  "Python",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "React Native",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[100vh] min-h-[100dvh] flex flex-col justify-center bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-32 w-full">

        {/* Two-column layout: Text left, Portrait right */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_1fr] gap-10 sm:gap-12 items-center">

          {/* Left: Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Name and Title */}
            <div className="space-y-3 sm:space-y-4">
              <p
                className="text-sm font-mono text-ink-400 tracking-widest uppercase"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: "80ms",
                }}
              >
                  <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                  style={{ background: "var(--accent-red)", opacity: 0.75 }}
                  aria-hidden="true"
                />
                Hello, I'm
              </p>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-ink-900 leading-tight"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: "140ms",
                }}
              >
                Alan Joy Wilson
              </h1>
              {/* Crimson signature bar — mirrors the blue scroll-cue line */}
              <div
                className="w-8 h-[2px] rounded-full"
                style={{
                  background: "var(--accent-red)",
                  opacity: mounted ? 0.6 : 0,
                  transition: "opacity 0.5s ease",
                  transitionDelay: "220ms",
                }}
                aria-hidden="true"
              />
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-ink-500"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: "200ms",
                }}
              >
                MERN Stack &amp; Python Developer
              </h2>
            </div>

            {/* Value Proposition */}
            <p
              className="text-base sm:text-lg md:text-xl text-ink-500 font-normal max-w-lg leading-relaxed"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: "300ms",
              }}
            >
              I build scalable web applications, APIs that stay secure, and interfaces that get out of the way — crafting modern digital experiences from concept to deployment.
            </p>

            {/* Tech stack pills */}
            <div
              className="flex flex-wrap gap-2"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: "360ms",
              }}
            >
              {TECH_STACK.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>

            {/* Actions row */}
            <div
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: "440ms",
              }}
            >
              {/* Primary CTA */}
              <a
                href="/resume.pdf"
                download
                id="hero-download-resume"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97]"
                style={{ background: "var(--accent-blue)" }}
              >
                <Download size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                Download Resume
              </a>

              {/* Secondary CTA */}
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-900"
              >
                View my work
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 ease-spring group-hover:translate-x-1"
                />
              </Link>

              <span className="w-px h-4 bg-ink-200 hidden sm:block" aria-hidden="true" />

              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/alan-j-w"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-ink-400 hover:text-ink-900 transition-colors duration-150 p-1"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/alan-joy-wilson-921053218"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-ink-400 hover:text-ink-900 transition-colors duration-150 p-1"
                >
                  <Linkedin size={18} />
                </a>
              </div>

              <span className="w-px h-4 bg-ink-200 hidden sm:block" aria-hidden="true" />

              <a
                href="mailto:alanjoywilson@gmail.com"
                className="hidden sm:block text-sm font-mono text-ink-400 hover:text-ink-600 transition-colors duration-150"
              >
                alanjoywilson@gmail.com
              </a>
            </div>
          </div>

          {/* Right: Portrait as primary visual */}
          <div
            className="relative flex justify-center lg:justify-end"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateX(20px)",
              transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "200ms",
            }}
          >
            <div className="relative aspect-square w-[200px] sm:w-[260px] md:w-[320px] lg:w-[380px] rounded-full bg-gradient-to-br from-ink-100 to-ink-200 shadow-xl border-4 sm:border-6 md:border-8 border-white">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src="/images/profile.png"
                  alt="Alan Joy Wilson — Full Stack Developer"
                  fill
                  draggable={false}
                  className="object-cover object-top select-none pointer-events-none"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
                  priority
                />
              </div>
              {/* Invisible overlay for drag protection */}
              <div className="absolute inset-0 z-10 bg-transparent rounded-full" />
              {/* Subtle expanding outline ring — desktop only */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] aspect-square rounded-full border pointer-events-none opacity-0 hover:opacity-100 hover:scale-[1.03] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hidden sm:block"
                style={{ borderColor: "rgba(27,58,107,0.15)" }}
                aria-hidden="true"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue — subtle cobalt chevron */}
      <div
        className="absolute bottom-6 sm:bottom-10 left-6 sm:left-8 md:left-auto md:right-8 flex flex-col items-center gap-1.5"
        style={{
          opacity: mounted ? 0.35 : 0,
          transition: "opacity 0.6s ease",
          transitionDelay: "800ms",
        }}
        aria-hidden="true"
      >
        <span className="text-2xs font-mono font-medium tracking-widest text-ink-400 rotate-90 origin-center mb-1">
          scroll
        </span>
        <div
          className="h-10 sm:h-12 w-px"
          style={{ background: `linear-gradient(to bottom, var(--accent-blue), transparent)` }}
        />
      </div>
    </section>
  );
}
