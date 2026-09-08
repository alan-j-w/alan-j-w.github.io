import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">

          {/* Left: name + tagline */}
          <div>
            <Link
              href="/"
              className="text-sm font-semibold text-ink-900 hover:text-ink-600 transition-colors duration-150"
            >
              Alan Joy Wilson
            </Link>
            <p className="text-xs text-ink-400 mt-1">
              Full Stack Engineer — MERN · Python · Security
            </p>
          </div>

          {/* Right: socials */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/alan-j-w"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-400 hover:text-ink-800 transition-colors duration-150 p-1"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/alan-joy-wilson-921053218"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-400 hover:text-ink-800 transition-colors duration-150 p-1"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://x.com/AlanJoyWilson1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-400 hover:text-ink-800 transition-colors duration-150 p-1"
              aria-label="X / Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="mailto:alanjoywilson@gmail.com"
              className="text-ink-400 hover:text-ink-800 transition-colors duration-150 p-1"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink-300">
            © {year} Alan Joy Wilson
          </p>
          {/* Hidden easter egg: a tiny crimson diamond separator */}
          <p className="text-xs text-ink-300 flex items-center gap-2">
            Built with Next.js
            <span
              className="text-[8px]"
              style={{ color: "rgba(200,16,46,0.35)" }}
              aria-hidden="true"
            >
              ◆
            </span>

          </p>
        </div>
      </div>
    </footer>
  );
}
