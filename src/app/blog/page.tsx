import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

const blogPosts = [
  {
    id: "building-nexcart",
    title: "Building NexCart: Lessons From Creating a Multi-Vendor Marketplace",
    excerpt:
      "Multi-vendor e-commerce isn't a feature set — it's an architecture problem. Building NexCart meant solving data isolation, dual authentication, payment verification, and a two-service deployment before a single product page could be called production-ready.",
    date: "April 2026",
    readTime: "9 min read",
    category: "Architecture",
  },
  {
    id: "building-vulnbox",
    title: "Building VulnBox: Teaching Cybersecurity Through Real Vulnerabilities",
    excerpt:
      "Building VulnBox required solving a problem that sounds contradictory: write deliberately broken code without breaking anything important. The engineering challenge wasn't the cybersecurity part — it was the isolation architecture.",
    date: "October 2025",
    readTime: "11 min read",
    category: "Engineering",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">

        {/* Back link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink-400 hover:text-ink-800 transition-colors duration-150 mb-10 sm:mb-16"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-200 ease-spring group-hover:-translate-x-1"
          />
          Home
        </Link>

        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <p className="section-label">
            <span className="font-mono">Writing</span>
          </p>
          <h1 className="text-heading mt-2">
            Technical articles.
          </h1>
          <p className="text-body mt-4 sm:mt-5 max-w-lg">
            Practical case studies, engineering decisions, and hard-won lessons
            from building production software.
          </p>
        </div>

        {/* Article list */}
        <div className="border-t border-ink-100">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group block border-b border-ink-100 py-7 sm:py-10 transition-colors duration-150"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6">

                {/* Left meta */}
                <div className="flex flex-row md:flex-col gap-3 md:w-44 flex-shrink-0 items-center md:items-start">
                  <span
                    className="text-2xs font-bold uppercase tracking-widest font-mono px-2 py-1 rounded-sm w-fit"
                    style={{
                      backgroundColor: "rgba(200,16,46,0.06)",
                      color: "var(--accent-red)",
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs font-mono text-ink-300">
                    {post.date} · {post.readTime}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-ink-900 leading-snug tracking-tight group-hover:text-ink-600 transition-colors duration-150">
                    {post.title}
                  </h2>
                  <p className="text-body text-sm leading-relaxed max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 flex items-start pt-1 hidden md:flex">
                  <ArrowRight
                    size={18}
                    className="text-ink-300 group-hover:text-ink-600 transition-all duration-200 ease-spring group-hover:translate-x-1"
                  />
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
