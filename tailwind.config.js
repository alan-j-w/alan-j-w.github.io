/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral palette — warm whites and rich blacks
        ink: {
          50:  "#f7f7f6",
          100: "#eeeeec",
          200: "#d8d8d4",
          300: "#b4b4ae",
          400: "#8c8c85",
          500: "#6b6b63",
          600: "#52524b",
          700: "#3d3d38",
          800: "#282824",
          900: "#141412",
          950: "#0a0a09",
        },
        // Crimson — Spider-Man accent, used at extreme restraint
        crimson: {
          50:  "#fff1f2",
          100: "#ffd6d9",
          200: "#ffadb3",
          300: "#ff7480",
          400: "#ff3a4b",
          500: "#c8102e",   // primary accent
          600: "#a50d25",
          700: "#870b1e",
          800: "#6e0d1a",
          900: "#5c1019",
        },
        // Cobalt — second hidden accent
        cobalt: {
          50:  "#eff4ff",
          100: "#d9e5ff",
          200: "#bcd0ff",
          300: "#8fb0ff",
          400: "#6189ff",
          500: "#3b63fa",
          600: "#2547ef",
          700: "#1b3a6b",   // primary cobalt
          800: "#1a347a",
          900: "#1c2f66",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:  ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.02em",
        widest:   "0.2em",
      },
      animation: {
        "fade-up":  "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in":  "fadeIn 0.4s ease-out forwards",
        "blink":    "blink 1.2s step-end infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
