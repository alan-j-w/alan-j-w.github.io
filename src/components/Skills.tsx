import ScrollReveal from "./ScrollReveal";

const capabilities = [
  {
    area: "Backend",
    items: ["Django", "Node.js", "REST APIs", "Python", "Authentication & Auth flows"],
  },
  {
    area: "Frontend",
    items: ["React.js", "Next.js", "Angular", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    area: "Data",
    items: ["PostgreSQL", "MySQL", "SQLite", "Schema design", "Query optimization"],
  },
  {
    area: "Engineering",
    items: ["System design", "Secure application development", "Scalable architecture", "Git & version control"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-white border-t border-ink-100">
      <div className="section-container">

        {/* Section label */}
        <ScrollReveal>
          <p className="section-label">
            <span className="font-mono">03</span>
            <span className="w-6 h-px bg-ink-300" />
            Capabilities
          </p>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <h2 className="text-heading mb-10 sm:mb-16">
            What I work with.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-10">
          {capabilities.map((cat, i) => (
            <ScrollReveal key={cat.area} delay={i * 60}>
              <div>
                <h3 className="text-2xs font-bold uppercase tracking-widest text-ink-400 mb-4 sm:mb-5 font-mono">
                  {cat.area}
                </h3>
                <ul className="space-y-2 sm:space-y-2.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs sm:text-sm font-medium text-ink-700 flex items-start gap-2 sm:gap-2.5"
                    >
                      {/* Hidden cobalt dot marker */}
                      <span
                        className="inline-block w-1 h-1 rounded-full flex-shrink-0 opacity-40 mt-1.5"
                        style={{ backgroundColor: "var(--accent-blue)" }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
