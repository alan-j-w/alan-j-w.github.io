import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ─────────────────────────────────────────────
   Article data store
───────────────────────────────────────────── */
type Section = { heading?: string; body: string[] };

type Article = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  excerpt: string;
  sections: Section[];
};

const articles: Article[] = [
  {
    id: "building-nexcart",
    title: "Building NexCart: Lessons From Creating a Multi-Vendor Marketplace",
    date: "April 2026",
    readTime: "9 min read",
    author: "Alan Joy Wilson",
    category: "Architecture",
    excerpt:
      "Multi-vendor e-commerce isn't a feature set — it's an architecture problem. Building NexCart meant solving data isolation, dual authentication, payment verification, and a two-service deployment before a single product page could be called production-ready.",
    sections: [
      {
        body: [
          "Multi-vendor e-commerce sounds like a product category. It's actually an architecture problem.",
          "When I started building NexCart, the first question wasn't what features to build. It was: what does the data model look like when three completely different users — customers browsing products, vendors managing storefronts, and administrators overseeing the platform — all interact with the same application?",
          "That question shaped every technical decision that followed.",
        ],
      },
      {
        heading: "Role-Based Access Control as Foundation, Not Afterthought",
        body: [
          "The most important architectural decision in NexCart was designing access control before writing any feature code.",
          "Most applications build features first and add restrictions later. That creates security debt — routes get protected inconsistently, middleware gets bolted on unevenly, edge cases slip through.",
          "In NexCart, every Express route is scoped to a role from the start. Custom middleware verifies the JWT token, decodes the payload, and checks the user's role before any controller logic executes. Admin routes explicitly reject vendor tokens. Vendor routes explicitly reject customer tokens. Authorization is enforced at the middleware layer, not scattered across controllers.",
          "This meant features could be built quickly. The enforcement boundary was already in place — nothing had to be retrofitted.",
        ],
      },
      {
        heading: "The Harder Problem: Vendor Data Isolation",
        body: [
          "Role-based routing solves the wrong problem if you don't also solve data isolation.",
          "A vendor dashboard that correctly blocks admin routes is still broken if one vendor can query another vendor's orders.",
          "Every MongoDB query in the vendor layer is scoped to the authenticated vendor's ID — derived from the verified JWT payload, never from the request body. When a vendor requests their product list, the Mongoose query always includes a `vendorId` filter from the session. The client has no input into whose data is returned.",
          "The design rule was simple: never trust the client to tell you who the data belongs to. Ownership is derived from the authenticated session, verified server-side, on every request.",
          "This also meant the admin layer required its own query patterns. Admins see all vendors' data, which means the same endpoints can't be reused — admin routes omit the vendorId filter entirely, with the admin middleware role check as the only gate.",
        ],
      },
      {
        heading: "JWT and Google OAuth Running Side by Side",
        body: [
          "NexCart supports two authentication strategies: traditional email and password login via JWT, and Google OAuth 2.0. Running both in production is more complex than it appears.",
          "Google OAuth tokens can't be used as application session tokens directly. When a user authenticates through Google, the backend verifies the OAuth credential with Google's API, extracts the user profile, and either creates or updates the corresponding user record in MongoDB. It then issues its own JWT — scoped to NexCart's roles and expiry rules. The client never holds the Google token after that initial exchange.",
          "Both authentication paths produce identical JWT formats. The rest of the application — protected routes, middleware, session handling — never needs to know which authentication method was used. The token looks the same either way.",
          "Helmet middleware, express-rate-limit, bcrypt password hashing, and a restricted CORS policy are applied globally before any authentication logic runs. Security headers are a network-level concern in NexCart, not a per-route afterthought.",
        ],
      },
      {
        heading: "Razorpay: The Edge Cases That Matter",
        body: [
          "Payment integration looks simple from the outside. The actual implementation has more failure modes than the documentation suggests.",
          "Razorpay's integration has three stages: create an order on the backend to obtain an order ID, pass that ID to the Razorpay checkout widget on the frontend, then verify the payment signature on the backend before treating the payment as confirmed.",
          "The verification step is non-negotiable. The signature is an HMAC-SHA256 hash computed from the order ID and payment ID using the Razorpay key secret. A client can send any payment ID to the server. Without cryptographic verification on the backend, nothing prevents a crafted fake success response from creating fraudulent orders.",
          "The harder edge cases are network failures during the confirmation step. If the payment succeeds on Razorpay's side but the subsequent request to our backend fails — due to a timeout, a server error, or a network drop — the money is collected but no order is created. Handling this requires idempotent order creation: detecting duplicate payment IDs before processing and providing a recovery path for transactions stuck in an in-progress state.",
          "A significant portion of the payment integration work went into these failure scenarios, not the happy path.",
        ],
      },
      {
        heading: "Cloudinary and the Product Image Architecture",
        body: [
          "Product images in a multi-vendor marketplace have a specific challenge: images are vendor-owned, need to be served at scale, and can't be stored as binary data in MongoDB without degrading performance significantly.",
          "The upload flow in NexCart goes through the backend. The client sends the image file to the Express server as multipart form data. The backend uploads it to Cloudinary and receives back a secure URL and public ID. Only the URL is stored in MongoDB — the image binary never touches the database.",
          "This keeps image delivery entirely off the application server. Cloudinary's CDN handles transformation, optimization, compression, and global distribution. If a vendor uploads a 4MB product photo, that doesn't affect API response times for anyone else.",
          "Public IDs stored alongside the URL make it possible to delete images from Cloudinary when a product is removed — a detail that's easy to skip and creates orphaned assets at scale.",
        ],
      },
      {
        heading: "Deploying Two Services That Need to Trust Each Other",
        body: [
          "NexCart's production setup separates the Next.js frontend on Vercel and the Express backend on Render. These are two independently deployed services communicating over HTTP.",
          "CORS configuration becomes a first-class concern in this setup. The backend's CORS policy explicitly allows only the production frontend domain — pulled from the `FRONTEND_URL` environment variable on Render. In development, localhost origins are permitted via a separate configuration. The policy is strict by default; relaxing it requires an explicit change.",
          "Environment variables are managed separately on Vercel and Render, which means a misconfiguration on either side can silently break the integration. The discipline required is keeping variable names consistent and documented across both platforms. The backend's `RAZORPAY_KEY_ID` and the frontend's `NEXT_PUBLIC_RAZORPAY_KEY` need to match — and there's no build-time check that they do.",
          "MongoDB Atlas acts as the shared data layer. Neither the Vercel deployment nor the Render deployment runs a database process. Atlas manages connection pooling, network access rules, and backups. Render connects via the `MONGO_URI` connection string with Atlas's IP allowlist configured to permit Render's outbound IPs.",
        ],
      },
      {
        heading: "What Shipping NexCart Actually Taught Me",
        body: [
          "The architecture decisions that mattered most in NexCart weren't the interesting ones. They were the boring ones: consistent middleware ordering, vendor-scoped MongoDB queries, cryptographic payment verification, explicit CORS policies.",
          "Security in a marketplace isn't a feature you implement. It's a property that emerges from hundreds of small, correct decisions made consistently — and it breaks the moment any of those decisions gets skipped.",
          "NexCart is deployed and live. The frontend runs on Vercel, the backend on Render, the database on MongoDB Atlas. It handles real user sessions, real payment flows, and real vendor-to-customer isolation.",
          "Building it gave me a much more concrete understanding of what production-grade multi-tenant architecture actually requires. The gap between 'it works' and 'it works correctly under adversarial conditions' is where most of the engineering effort lives.",
        ],
      },
    ],
  },
  {
    id: "building-vulnbox",
    title: "Building VulnBox: Teaching Cybersecurity Through Real Vulnerabilities",
    date: "October 2025",
    readTime: "11 min read",
    author: "Alan Joy Wilson",
    category: "Engineering",
    excerpt:
      "Building VulnBox required solving a problem that sounds contradictory: write deliberately broken code without breaking anything important. The engineering challenge wasn't the cybersecurity part — it was the isolation architecture.",
    sections: [
      {
        body: [
          "Building VulnBox required solving a problem that sounds contradictory on the surface: write deliberately broken code, without breaking anything important.",
          "The goal was an interactive cybersecurity training platform — a Django application containing labs built around real vulnerability classes. Each lab would expose learners to actual attack techniques in a controlled environment.",
          "The engineering challenge wasn't the cybersecurity part. It was the isolation part.",
        ],
      },
      {
        heading: "The Core Problem: Vulnerable Code in a Secure Application",
        body: [
          "Cybersecurity training platforms have a structural problem most implementations skip over.",
          "The vulnerable code has to actually be vulnerable. But the authentication system, user data, scoring logic, and admin functions cannot be compromised by the same techniques learners are actively practicing against the labs.",
          "In VulnBox, each vulnerability category is implemented as an isolated Django application. The SQLi lab lives in its own app with its own views, its own intentionally weak database query patterns, and its own templates. It cannot import from or interfere with the core authentication app.",
          "The core application — auth, user profiles, scoring, the Gemini integration — uses Django's ORM exclusively. Parameterized queries throughout. The labs use raw SQL in specific, tightly scoped views. The separation is architectural, enforced by Django's app boundary, not just a convention.",
        ],
      },
      {
        heading: "Designing Labs as Isolated Django Applications",
        body: [
          "Django's application system turned out to be the right abstraction for this problem.",
          "Each vulnerability track in VulnBox — web exploitation and AI security — is composed of individual lab apps, each with its own URL namespace, views, templates, and models where needed. The URL routing makes the isolation explicit: lab URLs are prefixed under `/labs/<category>/` and handled entirely by app-specific views. The core application never executes lab logic.",
          "A lab app can be disabled by removing it from `INSTALLED_APPS` without touching anything else in the platform. This made incremental development practical — new labs could be built and tested independently before being added to the platform.",
          "The interface between labs and the core system is the flag. Each lab, when exploited correctly, exposes a flag. The learner submits that flag through the core application's flag endpoint, which validates it against the lab's expected value and updates the score. Labs don't write to the scoring system directly — they expose a flag string and the core handles what happens next.",
        ],
      },
      {
        heading: "The Flag System and Scoring Architecture",
        body: [
          "The scoring system is deliberately simple: each lab has a point value and a flag. Submitting the correct flag awards the points once and marks the lab complete.",
          "Flags are generated deterministically using a combination of the lab identifier and a server-side secret. A learner can't pre-compute a flag without knowing the secret, and reusing a flag from a previous session doesn't work because the validation checks completion state. The flag submission endpoint applies rate limiting to prevent brute-force attempts.",
          "Lab mastery tracking records which labs each user has completed, stored against their user ID. The dashboard aggregates this into per-track progress without exposing any implementation detail of the labs themselves. The learner sees completion status; the labs see nothing about the learner.",
        ],
      },
      {
        heading: "Integrating Gemini as VulnBot",
        body: [
          "VulnBot is VulnBox's AI assistant, powered by Google's Gemini API. The goal was context-aware hints that guide learners toward understanding without handing them the answer.",
          "The prompt engineering for VulnBot required more thought than the API integration itself.",
          "Each hint request includes structured context: the current lab, the vulnerability category being practiced, how many attempts the learner has made, and what hint level they've requested. The system prompt instructs Gemini to respond with questions rather than answers at lower hint levels — guiding the learner to think about what input the vulnerable query processes, not what payload to use.",
          "At higher hint levels, the model explains the underlying vulnerability concept in detail. At the final hint level, a walkthrough is provided. The escalation is explicit and learner-controlled.",
          "Keeping responses on-topic required strict system prompt constraints. Without them, a general model will drift into broad security education. VulnBot is instructed to respond only to what's directly relevant to the current lab context — no general cybersecurity advice, no off-topic responses.",
          "Cloudinary handles profile picture storage for user accounts. Binary data never touches the database. The pattern is the same as in NexCart: the server uploads to Cloudinary, stores the URL, and serves the CDN link.",
        ],
      },
      {
        heading: "The Security Paradox",
        body: [
          "A platform for learning attacks must itself be hardened. The contradiction is real and requires deliberate design.",
          "VulnBox's authentication uses Django's built-in session-based auth. The Django admin interface is restricted to superusers and not exposed in production. The Danger Zone feature — account deletion with full data erasure — required careful cascade logic: profile data, scores, lab completion records, and Cloudinary assets all need to be removed cleanly. Django's `on_delete=CASCADE` handles database relations; Cloudinary assets require an explicit API deletion call that runs in the same transaction as the account removal.",
          "Environment configuration follows a strict pattern throughout: the Django secret key, Cloudinary credentials, and Gemini API key are never hardcoded. python-decouple pulls from a `.env` file in development and reads environment variables in production on Render. The application won't start without the required configuration — which is the correct failure mode.",
          "The test for whether the security paradox is resolved: an attacker actively exploiting the SQLi lab should have no path to the authentication system, admin panel, or another user's data. The app boundary enforced by Django's isolation makes that guarantee structurally sound.",
        ],
      },
      {
        heading: "Why AI Security Labs Belong in the Curriculum",
        body: [
          "The decision to include Prompt Injection, Data Poisoning, and Model Theft labs wasn't about being current. It was about recognizing that the attack surface for modern applications has changed in a specific, concrete way.",
          "Developers building AI-powered features today are introducing new input processing pipelines. Prompts are inputs. They can be manipulated the same way SQL queries can be manipulated when they're constructed with unsanitized user data.",
          "The Prompt Injection lab in VulnBox uses a deliberately vulnerable chatbot endpoint. The endpoint has a system prompt containing simulated sensitive instructions. Learners craft inputs that cause the model to leak or override those instructions — the same category of mistake as a SQL injection vulnerability, expressed through natural language instead of query syntax.",
          "Data Poisoning and Model Theft labs address a different layer: the trustworthiness of training data and the confidentiality of model behavior. These aren't theoretical. Organizations deploying fine-tuned models or RAG systems in production have live exposure to both.",
          "The framing in every lab is the same regardless of vulnerability type: demonstrate the attack, explain why it works, explain the defense. Not just what the payload is, but what assumption it exploits.",
        ],
      },
      {
        heading: "CEH Alignment and the Curriculum Structure",
        body: [
          "The lab tracks in VulnBox are organized around CEH (Certified Ethical Hacker) standards, not arbitrarily.",
          "Structure matters in security education. Learners need a framework for understanding which vulnerabilities belong to which category and why the categorization is meaningful. The CEH domain structure provides that without requiring learners to pursue certification.",
          "The gamification layer — point values, lab mastery indicators, a real-time scoring system — exists to sustain motivation through the harder labs. Security topics that require multiple attempts benefit from visible progress tracking. The score isn't the goal; it's a proxy for how much of the lab curriculum a learner has genuinely worked through.",
        ],
      },
      {
        heading: "What Building VulnBox Taught Me",
        body: [
          "The most useful insight from building VulnBox was how much security work is just careful software engineering.",
          "Parameterized queries, isolated modules, least-privilege access, input validation, environment-based configuration — none of these are advanced techniques. They're disciplined engineering practices applied consistently. The difference between a vulnerable application and a secure one is usually not clever exploitation. It's a missing ORM call, a skipped validation, a hardcoded secret.",
          "Building exploitable systems taught me more about writing secure ones than any amount of reading. The vulnerabilities are clearest when you're the one constructing them.",
          "VulnBox is live, actively maintained, and the curriculum continues to expand. The platform is available at vulnbox.onrender.com.",
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.title} — Alan Joy Wilson`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-white">

      {/* ── Top navigation bar ──────────────────── */}
      <div className="max-w-[880px] mx-auto px-5 sm:px-6 md:px-10 pt-24 sm:pt-28 pb-0">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-400 hover:text-ink-800 transition-colors duration-150 min-h-[44px] sm:min-h-0"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 ease-spring group-hover:-translate-x-1"
            />
            All articles
          </Link>

          {/* Right meta — category + read time */}
          <div className="flex items-center gap-3">
            <span
              className="text-2xs font-bold uppercase tracking-widest font-mono px-2.5 py-1 rounded-sm"
              style={{
                backgroundColor: "rgba(200,16,46,0.06)",
                color: "var(--accent-red)",
              }}
            >
              {article.category}
            </span>
            <span className="text-xs font-mono text-ink-300 hidden sm:block">
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* ── Article ─────────────────────────────── */}
      <article className="max-w-[880px] mx-auto px-5 sm:px-6 md:px-10 pb-20 sm:pb-28">

        {/* Header */}
        <header className="mt-8 sm:mt-12 mb-8 sm:mb-12 pb-8 sm:pb-10 border-b border-ink-100">
          <h1
            className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-ink-900 leading-[1.2] sm:leading-[1.15] tracking-[-0.02em] mb-4 sm:mb-6"
          >
            {article.title}
          </h1>

          {/* Excerpt — acts as a lede / standfirst */}
          <p className="text-base sm:text-[1.125rem] text-ink-500 leading-relaxed sm:leading-[1.75] mb-6 sm:mb-8 max-w-[640px]">
            {article.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2">
            <span className="text-sm font-semibold text-ink-700">
              Alan Joy Wilson
            </span>
            <span className="w-px h-3.5 bg-ink-200 hidden sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-400">
              <Calendar size={12} aria-hidden="true" />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-400">
              <Clock size={12} aria-hidden="true" />
              {article.readTime}
            </span>
          </div>
        </header>

        {/* Body */}
        <div className="space-y-0">
          {article.sections.map((section, i) => (
            <section key={i} className="mb-8 sm:mb-10">

              {/* Section heading — left border accent like Linear/Stripe */}
              {section.heading && (
                <h2
                  className="text-lg sm:text-[1.25rem] md:text-[1.375rem] font-bold text-ink-900 tracking-tight mb-4 sm:mb-5 mt-2 pl-3 sm:pl-4"
                  style={{
                    borderLeft: "2.5px solid var(--accent-red)",
                  }}
                >
                  {section.heading}
                </h2>
              )}

              {/* Paragraphs */}
              <div className="space-y-4 sm:space-y-5">
                {section.body.map((para, j) => (
                  <p
                    key={j}
                    className="text-[15px] sm:text-[17px] text-ink-600 leading-[1.75] sm:leading-[1.9]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Article footer */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-ink-100 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-ink-900 transition-colors duration-150 min-h-[44px] sm:min-h-0"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 ease-spring group-hover:-translate-x-1"
            />
            Back to all articles
          </Link>

          <span className="text-xs font-mono text-ink-300">
            Alan Joy Wilson · {article.date}
          </span>
        </div>

      </article>
    </div>
  );
}
