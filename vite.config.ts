import { basePlugins, baseResolve } from './vite-config/vite.base.config.js';
import { defineConfig } from 'vite';

// Default config for development
export default defineConfig({
  plugins: basePlugins,
  resolve: baseResolve,
});