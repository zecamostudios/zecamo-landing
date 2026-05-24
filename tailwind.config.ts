import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zecamo design system — referenciando las CSS variables de variables.css
        brand: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          accent: "var(--color-accent)",
        },
        bg: {
          base: "var(--color-bg-base)",
          surface: "var(--color-bg-surface)",
          elevated: "var(--color-bg-elevated)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        border: {
          subtle: "var(--color-border-subtle)",
          default: "var(--color-border-default)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["var(--text-display-xl)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["var(--text-display-lg)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-md": ["var(--text-display-md)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "heading-xl": ["var(--text-heading-xl)", { lineHeight: "1.2" }],
        "heading-lg": ["var(--text-heading-lg)", { lineHeight: "1.25" }],
        "heading-md": ["var(--text-heading-md)", { lineHeight: "1.3" }],
        "body-lg": ["var(--text-body-lg)", { lineHeight: "1.6" }],
        "body-md": ["var(--text-body-md)", { lineHeight: "1.6" }],
        "body-sm": ["var(--text-body-sm)", { lineHeight: "1.5" }],
        "label-lg": ["var(--text-label-lg)", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        "label-md": ["var(--text-label-md)", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        "label-sm": ["var(--text-label-sm)", { lineHeight: "1.4", letterSpacing: "0.06em" }],
      },
      spacing: {
        "section-y": "var(--spacing-section-y)",
        "section-x": "var(--spacing-section-x)",
        "container-max": "var(--spacing-container-max)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },
      boxShadow: {
        "glow-primary": "var(--shadow-glow-primary)",
        "glow-subtle": "var(--shadow-glow-subtle)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
      },
    },
  },
  plugins: [],
};

export default config;
