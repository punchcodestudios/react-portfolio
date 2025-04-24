import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    outDir: "/dist",
  },
  plugins: [commonjs(), react(), reactRouter(), tsconfigPaths()],
});
