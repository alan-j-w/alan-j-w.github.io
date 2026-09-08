"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Eye, Maximize2, X } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    index: "01",
    title: "Nexcart",
    role: "Lead Engineer",
    date: "April 2026",
    previewImage: "/images/nexcart-preview.png",
    description:
      "Multi-vendor marketplace with separate vendor and admin systems, role-based access control, and a scalable Next.js + Express architecture. Built to handle independent vendor storefronts under a single platform.",
    outcome: "Shipped a full e-commerce product from schema to deployment.",
    tech: ["Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    link: "https://nexcart-ecommerce-platform.vercel.app/",
    github: "https://github.com/alan-j-w",
  },
  {
    index: "02",
    title: "Trackpi Job Portal",
    role: "Full Stack Engineer",
    date: "2025",
    previewImage: "/images/trackpi-preview.png",
    description:
      "Recruitment workflow platform with applicant tracking, collaborative hiring pipelines, and CRM-style candidate management. Designed around how real hiring teams actually work.",
    outcome: "Reduced manual coordination overhead across the hiring pipeline.",
    tech: ["Angular", "React", "Django REST Framework", "MySQL"],
    link: null,
    github: "https://github.com/alan-j-w/Trackpi_Job_Portal",
  },
  {
    index: "03",
    title: "VulnBox",
    role: "Founder & Engineer",
    date: "October 2025",
    previewImage: "/images/vulnbox-preview.png",
    description:
      "Cybersecurity training platform with interactive hacking labs, sandboxed environments, and AI-powered guidance. Simulates real-world vulnerabilities in a safe, structured learning environment.",
    outcome: "Deployed live. Used for practical security training and research.",
    tech: ["Python", "Django", "PostgreSQL", "Google Gemini API", "JavaScript"],
    link: "https://vulnbox.onrender.com",
    github: "https://github.com/alan-j-w",
  },
  {
    index: "04",
    title: "Cellulogram",
    role: "Full Stack Engineer",
    date: "2026",
    previewImage: "/images/cellulogram-preview.png",
    description:
      "Premium casting workspace and audition pipeline for regional cinema. A native mobile application providing a responsive pipeline for casting calls, self-tapes, and instant swipe-shortlisting review — eliminating messy WhatsApp and Google Drive clutter.",
    outcome: "Built on Expo SDK 55 with React Native, NativeWind, Zustand, and React Query.",
    tech: ["React Native", "Expo SDK 55", "NativeWind", "Zustand", "React Query"],
    link: null,
    github: "https://github.com/alan-j-w/Cellulogram",
  },
];

const ProjectCard = ({ project, i }: { project: any; i: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3D Scroll Effect
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={containerRef} className="py-4 sm:py-8">
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformPerspective: 1200,
        }}
        className="card-minimal group relative bg-white shadow-sm border border-ink-100/50 hover:shadow-md transition-shadow duration-500 rounded-xl sm:rounded-2xl"
      >
        {/* Hidden left accent on hover (alternates red/blue) */}
        <div
          className="absolute left-0 top-10 bottom-10 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full hidden sm:block"
          style={{ backgroundColor: i % 2 === 0 ? "var(--accent-red)" : "var(--accent-blue)" }}
          aria-hidden="true"
        />

        <div className="flex flex-col sm:grid sm:grid-cols-[1fr_2fr] gap-5 sm:gap-8 md:gap-16 p-5 sm:p-8 md:p-12 sm:pl-10">
          {/* Left column: index + meta */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xs text-ink-300 tracking-widest">
                {project.index}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
                {project.title}
              </h3>
            </div>
            <p className="text-xs font-mono font-medium text-ink-400 uppercase tracking-wider">
              {project.role}
              {project.date && (
                <span className="text-ink-300 font-normal ml-2">· {project.date}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((t: string) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right column: description + links */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-body max-w-prose text-sm sm:text-base">{project.description}</p>
            <p className="text-sm font-medium text-ink-700 leading-relaxed">
              <span className="text-ink-300 font-mono text-xs mr-2">→</span>
              {project.outcome}
            </p>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-ink-600 transition-colors duration-150 active:scale-95"
                >
                  Live site
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 ease-spring group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              )}
              {project.previewImage && (
                <div
                  className="relative inline-block"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-accent-blue transition-colors duration-150 active:scale-95 cursor-pointer"
                  >
                    <Eye
                      size={14}
                      className="text-amber-600 transition-transform duration-200 ease-spring group-hover/link:scale-110"
                    />
                    Preview
                  </button>

                  {/* Floating screenshot preview popover — desktop only */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 10 }}
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        className="hidden lg:block absolute bottom-full left-0 mb-3 z-40 w-80 rounded-xl overflow-hidden bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.35)] border border-ink-200/80 cursor-pointer group/popup"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden bg-ink-950">
                          <img
                            src={project.previewImage}
                            alt={`${project.title} interface preview`}
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/popup:scale-105"
                          />
                          <div className="absolute bottom-2 right-2 bg-ink-950/80 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-sm opacity-0 group-hover/popup:opacity-100 transition-opacity flex items-center gap-1">
                            <Eye size={10} />
                            <span>Click to expand</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-400 hover:text-ink-700 transition-colors duration-150 active:scale-95"
              >
                <Github size={14} />
                Source
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal — Fully responsive */}
      <AnimatePresence>
        {isLightboxOpen && project.previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 bg-ink-950/70 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-ink-200"
            >
              {/* Modal Header */}
              <div className="bg-ink-100/90 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-ink-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-ink-600 bg-white px-2 sm:px-3 py-1 rounded-md border border-ink-200/80 flex items-center gap-1.5 sm:gap-2 shadow-2xs max-w-[50%] truncate">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  {project.title} · Interface
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1.5 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-ink-200/60 transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Full Screenshot */}
              <div className="relative max-h-[65vh] sm:max-h-[70vh] md:max-h-[75vh] overflow-y-auto bg-ink-950 flex items-center justify-center lightbox-scroll">
                <img
                  src={project.previewImage}
                  alt={`${project.title} full interface`}
                  className="w-full h-auto object-contain block"
                />
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-ink-50 border-t border-ink-100 flex items-center justify-between text-xs">
                <span className="font-medium text-ink-700 text-[11px] sm:text-xs">
                  {project.title} · Live Interface Screenshot
                </span>
                <span className="font-mono text-ink-400 text-2xs hidden sm:block">
                  Press ESC or click outside to close
                </span>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="sm:hidden text-[11px] font-medium text-ink-500 active:text-ink-800"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-white py-16 sm:py-20 md:py-24 perspective-1000">
      <div className="section-container max-w-5xl mx-auto">
        {/* Section label */}
        <ScrollReveal>
          <p className="section-label">
            <span className="font-mono">02</span>
            <span className="w-6 h-px bg-ink-300" />
            Selected Work
          </p>
        </ScrollReveal>

        {/* Section heading */}
        <ScrollReveal delay={60}>
          <h2 className="text-heading mb-2">
            Projects built for<br />real-world use.
          </h2>
        </ScrollReveal>

        {/* Projects — 3D case study rows */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} i={i} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-ink-900 text-white font-semibold text-sm rounded-full hover:bg-ink-700 transition-colors duration-200 active:scale-95 shadow-lg hover:shadow-xl"
          >
            View All Projects
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
