import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./app/__tests__/setup.tsx"],

    include: [
      "app/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
    exclude: ["node_modules", "dist", "build", "coverage", ".react-router"],
  },

  // ✅ Path resolution for AI Agent layered architecture
  resolve: {
    alias: {
      "~": resolve(__dirname, "./app"),
    },
  },

  // ✅ Modern target for performance
  esbuild: {
    target: "ES2022",
  },
});
