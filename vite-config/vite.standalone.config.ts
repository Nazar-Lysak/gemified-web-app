/**
 * Standalone SPA build configuration.
 *
 * Output: dist/standalone/index.html + index.js
 * Deployment: GitHub Pages at /gemified-web-app/standalone/
 *
 * Self-contained single-page application version of the widget.
 */

import { getSpaConfig } from "./vite.base.config.js";

export default getSpaConfig("dist/standalone", "/gemified-web-app/standalone/");
