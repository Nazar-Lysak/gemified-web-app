/**
 * CDN build configuration - IIFE bundle for script tag embedding.
 *
 * Output: dist/cdn/gemifiedWebApp.iife.js
 * Usage: <script src=".../gemifiedWebApp.iife.js" defer></script>
 *
 * All dependencies are bundled into a single self-contained file.
 */

import { defineConfig } from "vite";
import path from "node:path";
import { basePlugins, baseResolve, productionEsbuild } from "./vite.base.config.js";

export default defineConfig({
  plugins: basePlugins,
  resolve: baseResolve,
  esbuild: productionEsbuild,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist/cdn",
    lib: {
      entry: path.resolve(__dirname, "../src/main.tsx"),
      name: "gemifiedWebApp", // Global variable name
      fileName: "gemifiedWebApp",
      formats: ["iife"], // Immediately Invoked Function Expression
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // Bundle everything into single file
      },
    },
  },
});
