import { Github, Linkedin, Mail } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-white border-t border-ink-100">
      <div className="section-container-sm">

        {/* Section label */}
        <ScrollReveal>
          <p className="section-label">
            <span className="font-mono">05</span>
            <span className="w-6 h-px bg-ink-300" />
            Contact
          </p>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <h2 className="text-display text-ink-900 mb-6 sm:mb-8 leading-none">
            Let&rsquo;s work<br />
            <span className="text-ink-300">together.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <p className="text-body max-w-md mb-10 sm:mb-14">
            I'm open to interesting projects, collaborations, and full-time roles.
            If you're building something meaningful, I'd like to hear about it.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="space-y-5 sm:space-y-6">
            {/* Primary email CTA — link-underline style */}
            <a
              href="mailto:alanjoywilson@gmail.com"
              className="block text-lg sm:text-xl font-semibold text-ink-900 link-underline w-fit pb-0.5 break-all sm:break-normal"
            >
              alanjoywilson@gmail.com
            </a>

            {/* Social row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
              <a
                href="https://github.com/alan-j-w"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-ink-400 hover:text-ink-800 transition-colors duration-150 py-1"
                aria-label="GitHub"
              >
                <Github size={16} />
                GitHub
              </a>
              <span className="w-px h-4 bg-ink-200" aria-hidden="true" />
              <a
                href="https://www.linkedin.com/in/alan-joy-wilson-921053218"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-ink-400 hover:text-ink-800 transition-colors duration-150 py-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <span className="w-px h-4 bg-ink-200" aria-hidden="true" />
              <a
                href="mailto:alanjoywilson@gmail.com"
                className="flex items-center gap-2 text-sm font-medium text-ink-400 hover:text-ink-800 transition-colors duration-150 py-1"
                aria-label="Email"
              >
                <Mail size={16} />
                Email
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
