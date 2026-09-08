import ScrollReveal from "./ScrollReveal";

const focusItems = [
  "System design & distributed architecture",
  "Secure application development",
  "Scalable backend systems",
];

export default function About() {
  return (
    <section id="about" className="bg-white border-t border-ink-100">
      <div className="section-container">

        {/* Section label */}
        <ScrollReveal>
          <p className="section-label">
            <span className="font-mono">01</span>
            <span className="w-6 h-px bg-ink-300" />
            About
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          {/* Left: text only */}
          <div className="space-y-10">
            <ScrollReveal delay={60}>
              <h2 className="text-heading">
                Engineer by training.<br />Builder by instinct.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="space-y-5 text-body max-w-prose">
                <p>
                  I'm Alan — a full stack developer based in India. I focus on
                  building real systems: marketplaces, recruitment tools, security
                  platforms. Products that handle real users and real data.
                </p>
                <p>
                  My approach is straightforward: understand the problem deeply,
                  design a clean architecture, then build and ship it. I care about
                  security at every layer, not as an afterthought.
                </p>
                <p>
                  I work across the stack — Django and Node on the backend,
                  React and Angular on the frontend, with relational databases
                  and clean API design in between.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div className="pt-2">
                <h3 className="text-2xs font-bold uppercase tracking-widest text-ink-400 font-mono mb-5">
                  Currently deepening
                </h3>
                <ul className="space-y-3">
                  {focusItems.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink-700">
                      {/* Hidden cobalt accent */}
                      <span
                        className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--accent-blue)" }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
