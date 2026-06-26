import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      screens: {
        xs: "390px",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        // Editorial serif scale — line-heights tuned for Cormorant Garamond
        "display-xl": ["clamp(2.75rem, 6vw, 5.25rem)", { lineHeight: "1.04", letterSpacing: "-0.02em", fontWeight: "500" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.018em", fontWeight: "500" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.012em", fontWeight: "500" }],
        "display-sm": ["clamp(1.375rem, 2.2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.008em", fontWeight: "500" }],
        "pull-quote": ["clamp(1.625rem, 3vw, 2.25rem)", { lineHeight: "1.3", fontWeight: "400" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body": ["1rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55", fontWeight: "400" }],
        "eyebrow": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.22em", fontWeight: "500" }],
        "caption": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.04em", fontWeight: "400" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // ── Cochrane Master Builders brand tokens ─────────────────────
        bone: "hsl(var(--bone))",
        paper: "hsl(var(--paper))",
        seam: "hsl(var(--seam))",
        charcoal: "hsl(var(--charcoal))",
        graphite: "hsl(var(--graphite))",
        mist: "hsl(var(--mist))",
        forest: {
          DEFAULT: "hsl(var(--forest))",
          deep: "hsl(var(--forest-deep))",
        },
        clay: "hsl(var(--clay))",
        sage: "hsl(var(--sage))",
        // ── Heirloom tokens — bespoke moments only ─────────────────────
        copper: {
          DEFAULT: "hsl(var(--copper))",
          glow:    "hsl(var(--copper) / 0.30)",
        },
        "ink-blueprint": "hsl(var(--ink-blueprint))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "calc(var(--radius) - 2px)",
      },
      boxShadow: {
        subtle: "0 1px 3px hsl(25 8% 25% / 0.04)",
        editorial: "0 8px 32px -12px hsl(178 14% 28% / 0.12)",
        forest: "0 6px 24px hsl(178 14% 28% / 0.18)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
