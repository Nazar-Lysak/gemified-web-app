/**
 * Shared Vite configuration for all build variants.
 * Provides common plugins, aliases, and build settings.
 */

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";

/**
 * React plugin with compiler enabled for automatic memoization.
 * Targets React 19 - no manual useMemo/useCallback needed in most cases.
 */
export const basePlugins = [
  react({
    babel: {
      plugins: [["babel-plugin-react-compiler", { target: "19" }]],
    },
  }),
];

/**
 * Path alias configuration.
 * Allows importing from '@/' instead of relative paths.
 */
export const baseResolve = {
  alias: {
    "@": path.resolve(__dirname, "../src"),
  },
};

/**
 * Production build optimizations.
 * Strips debugger statements but keeps console.* for runtime logger control.
 * Logger is gated at runtime via data-debug="true" attribute.
 */
export const productionEsbuild = {
  drop: ["debugger"] as "debugger"[],
};

/**
 * Shared configuration factory for SPA builds (standalone/demo).
 * @param outDir - Output directory for built files
 * @param basePath - Base URL path for assets (GitHub Pages compatible)
 */
export const getSpaConfig = (outDir: string, basePath = "/") =>
  defineConfig({
    base: basePath,
    plugins: basePlugins,
    resolve: baseResolve,
    esbuild: productionEsbuild,
    build: {
      outDir,
      rollupOptions: {
        input: path.resolve(__dirname, "../index.html"),
        output: {
          entryFileNames: "index.js",
          chunkFileNames: "index.js",
          assetFileNames: "[name][extname]",
        },
      },
    },
  });
