import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme.js";
import animatePlugin from "tailwindcss-animate";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        brand: ["var(--font-brand)", ...defaultTheme.fontFamily.sans],
        header: ["var(--font-header)", ...defaultTheme.fontFamily.mono],
        navItem: ["var(--font-nav)", ...defaultTheme.fontFamily.mono],
        anchor: ["var(--font-anchor)", ...defaultTheme.fontFamily.mono],
        text: ["var(--font-text)", ...defaultTheme.fontFamily.mono],
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        serif: [],
      },
      colors: {
        siteBlack: "var(--color-black)",
        siteWhite: "var(--color-white)",
        primary: "var(--color-primary)",
        primaryLight: "var(--color-primary-light)",
        primaryDark: "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        secondaryLight: "var(--color-secondary-light)",
        secondaryDark: "var(--color-secondary-dark)",

        border: "hsl(var(--border))",
        input: {
          DEFAULT: "hsl(var(--input))",
          invalid: "hsl(var(--input-invalid))",
        },
        ring: {
          DEFAULT: "hsl(var(--ring))",
          invalid: "hsl(var(--foreground-destructive))",
        },
        background: "hsl(var(--background))",
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          destructive: "hsl(var(--foreground-destructive))",
        },
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        // 1rem = 16px
        /** 80px size / 84px high / bold */
        mega: ["5rem", { lineHeight: "5.25rem", fontWeight: "100" }],
        /** 56px size / 62px high / bold */
        h1: ["3.5rem", { lineHeight: "3.875rem", fontWeight: "100" }],
        /** 40px size / 48px high / bold */
        h2: ["2.5rem", { lineHeight: "3rem", fontWeight: "300" }],
        /** 32px size / 36px high / bold */
        h3: ["2rem", { lineHeight: "2.25rem", fontWeight: "300" }],
        /** 28px size / 36px high / bold */
        h4: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "300" }],
        /** 24px size / 32px high / bold */
        h5: ["1.5rem", { lineHeight: "2rem", fontWeight: "300" }],
        /** 16px size / 20px high / bold */
        h6: ["1rem", { lineHeight: "1.25rem", fontWeight: "300" }],

        /** 32px size / 36px high / normal */
        "body-2xl": ["2rem", { lineHeight: "2.25rem" }],
        /** 28px size / 36px high / normal */
        "body-xl": ["1.75rem", { lineHeight: "2.25rem" }],
        /** 24px size / 32px high / normal */
        "body-lg": ["1.5rem", { lineHeight: "2rem" }],
        /** 20px size / 28px high / normal */
        "body-md": ["1.25rem", { lineHeight: "1.75rem" }],
        /** 16px size / 20px high / normal */
        "body-sm": ["1rem", { lineHeight: "1.25rem" }],
        /** 14px size / 18px high / normal */
        "body-xs": ["0.875rem", { lineHeight: "1.125rem" }],
        /** 12px size / 16px high / normal */
        "body-2xs": ["0.75rem", { lineHeight: "1rem" }],

        /** 18px size / 24px high / semibold */
        caption: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        /** 12px size / 16px high / bold */
        button: ["0.75rem", { lineHeight: "1rem", fontWeight: "700" }],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "home-hero": "url('/static/img_fullpng/home_hero_2.png')",
        "about-hero": "url('/static/img_fullpng/about-this-site.png')",
        "resume-accordion": "url('/static/img_fullpng/home_hero_2.png')",
        "resume-skills": "url('/static/img_fullpng/home_hero_2.png')",
      },
    },
    plugins: [animatePlugin],
  },
} satisfies Config;
