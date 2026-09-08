import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const blogPosts = [
  {
    id: "building-nexcart",
    title: "Building NexCart: Lessons From Creating a Multi-Vendor Marketplace",
    date: "April 2026",
    category: "Architecture",
    readTime: "9 min",
  },
  {
    id: "building-vulnbox",
    title: "Building VulnBox: Teaching Cybersecurity Through Real Vulnerabilities",
    date: "October 2025",
    category: "Engineering",
    readTime: "11 min",
  },
];

export default function BlogPreview() {
  return (
    <section className="bg-white border-t border-ink-100">
      <div className="section-container">

        {/* Section label */}
        <ScrollReveal>
          <p className="section-label">
            <span className="font-mono">04</span>
            <span className="w-6 h-px bg-ink-300" />
            Writing
          </p>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-3 sm:gap-4">
            <h2 className="text-heading">
              Technical writing.
            </h2>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900 transition-colors duration-150"
            >
              All articles
              <ArrowRight
                size={14}
                className="transition-transform duration-200 ease-spring group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>

        {/* Article list */}
        <div className="border-t border-ink-100">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 60}>
              <Link
                href={`/blog/${post.id}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 sm:py-7 border-b border-ink-100 gap-3 sm:gap-6"
              >
                {/* Left: meta */}
                <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
                  <span className="text-xs font-mono text-ink-300 w-auto sm:w-16 sm:text-right">
                    {post.date}
                  </span>
                  <span
                    className="text-2xs font-bold uppercase tracking-widest px-2 py-1 rounded-sm font-mono"
                    style={{
                      backgroundColor: "rgba(27,58,107,0.06)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Center: title — grows */}
                <h3 className="flex-1 text-sm sm:text-base font-semibold text-ink-800 group-hover:text-ink-900 transition-colors duration-150 leading-snug">
                  {post.title}
                </h3>

                {/* Right: read time + arrow */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-ink-300 font-mono hidden md:block">
                    {post.readTime}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-ink-300 group-hover:text-ink-600 transition-all duration-200 ease-spring group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
