"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Eye, Maximize2, X } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { getAssetPath } from "@/lib/assets";
import ProjectLightbox from "./ProjectLightbox";

const projects = [
  {
    index: "01",
    title: "Nexcart",
    role: "Full Stack Engineer",
    date: "April 2026",
    previewImage: getAssetPath("/images/nexcart-preview.png"),
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
    previewImage: getAssetPath("/images/trackpi-preview.png"),
    description:
      "TrackPi Job Portal is a modern full-stack web application collaboratively developed for TrackPi Private Limited. It serves as a comprehensive recruitment workflow platform with applicant tracking and CRM-style candidate management. Designed around how real hiring teams actually work.",
    outcome: "Reduced manual coordination overhead across the hiring pipeline.",
    tech: ["MERN", "PostgreSQL", "REST API", "Tailwind CSS"],
    link: null,
    github: "https://github.com/alan-j-w/Trackpi_Job_Portal",
  },
  {
    index: "03",
    title: "VulnBox",
    role: "Founder & Engineer",
    date: "October 2025",
    previewImage: getAssetPath("/images/vulnbox-preview.png"),
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
    previewImage: getAssetPath("/images/cellulogram-preview.png"),
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3D Scroll Effect
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Red/blue line 3D scroll animation (mobile)
  const lineScaleY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.15, 1, 1, 1, 0.15]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);

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
        {/* Desktop: original hover-only accent line (hidden on mobile) */}
        <div
          className="absolute left-0 top-10 bottom-10 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full hidden sm:block"
          style={{ backgroundColor: i % 2 === 0 ? "var(--accent-red)" : "var(--accent-blue)" }}
          aria-hidden="true"
        />

        {/* Mobile: scroll-animated accent line (visible only on mobile) */}
        <motion.div
          className="absolute left-0 top-10 bottom-10 w-[2px] rounded-full pointer-events-none sm:hidden"
          style={{
            backgroundColor: i % 2 === 0 ? "var(--accent-red)" : "var(--accent-blue)",
            scaleY: lineScaleY,
            opacity: lineOpacity,
            transformOrigin: "center",
          }}
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
                  onMouseEnter={() => !isMobile && setIsHovered(true)}
                  onMouseLeave={() => !isMobile && setIsHovered(false)}
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
                    {isHovered && !isMobile && (
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

      {/* Lightbox Modal — Portal based, perfectly centered on mobile & desktop */}
      {project.previewImage && (
        <ProjectLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          title={project.title}
          imageSrc={project.previewImage}
          liveLink={project.link}
          githubLink={project.github}
        />
      )}
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
