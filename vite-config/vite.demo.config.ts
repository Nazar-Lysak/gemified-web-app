/**
 * Demo SPA build configuration.
 *
 * Output: dist/demo/index.html + index.js
 * Deployment: GitHub Pages at /gemified-web-app/demo/
 *
 * Preview/demo version for showcasing the widget functionality.
 */

import { getSpaConfig } from "./vite.base.config.js";

export default getSpaConfig("dist/demo", "/gemified-web-app/demo/");
