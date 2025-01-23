import type { Config } from "tailwindcss";

export default {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
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
      },
      backgroundImage: {
        parallax: 'url("../public/static/img/home_hero.png")',
      },
    },
    plugins: [require("flowbite/plugin")],
  },
} satisfies Config;
