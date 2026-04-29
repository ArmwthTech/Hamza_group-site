import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--bg)",
        panel: "var(--panel)",
        line: "var(--line)",
        muted: "var(--muted)",
        accent: "var(--accent)"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Montserrat", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      },
      boxShadow: {
        red: "0 20px 60px rgba(230, 0, 18, 0.18)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.38)"
      }
    }
  },
  plugins: []
};

export default config;
