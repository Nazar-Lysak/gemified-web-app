# Widget Gemified Web App

React 19 + TypeScript + Vite boilerplate for an embeddable widget. Single source produces three build flavours: a CDN script (IIFE), a standalone SPA, and a demo SPA.

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646cff?logo=vite)](https://vite.dev/)

## Tech stack

- **React 19** with the React Compiler enabled (no manual `useMemo`/`useCallback` needed in most cases).
- **TypeScript 5.9** in strict mode.
- **Vite 7** with three separate configs (CDN / standalone / demo).
- **styled-components 6** with `StyleSheetManager` injecting styles into the widget's Shadow DOM.
- **react-shadow** for Shadow DOM encapsulation.
- **ESLint 9** + **Prettier 3** + **husky** + **lint-staged** for code quality.

## Build variants

| Build          | Output                            | Usage                                 |
| -------------- | --------------------------------- | ------------------------------------- |
| **CDN (IIFE)** | `dist/cdn/gemifiedWebApp.iife.js` | Embed via `<script>` on any host page |
| **Standalone** | `dist/standalone/index.{html,js}` | Self-contained SPA                    |
| **Demo**       | `dist/demo/index.{html,js}`       | Demo/preview page                     |

## Getting started

Requires Node >= 22 (see `.nvmrc`).

```bash
nvm use            # or any tool that respects .nvmrc
npm install
npm run dev        # http://localhost:5173
```

## Scripts

```bash
npm run dev               # Vite dev server
npm run lint              # ESLint
npm run format            # Prettier (write)
npm run format:check      # Prettier (check only)

npm run build:cdn         # CDN IIFE bundle
npm run build:standalone  # Standalone SPA
npm run build:demo        # Demo SPA
npm run build:all         # All three in parallel (cross-platform)

npm run preview           # Preview SPA build
npm run preview:cdn       # Serve current dir on :3000 (for test-cdn.html)

npm run clean             # Remove dist/
npm run deploy            # build:all + push to gh-pages
```

## Embedding the CDN build

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="gemified-web-app"></div>
    <script
      src="https://your-cdn-host/gemifiedWebApp.iife.js"
      type="text/javascript"
      data-language="en-gb"
      defer
    ></script>
  </body>
</html>
```

The widget mounts into `#gemified-web-app`. Configuration is read from `data-*` attributes on the `<script>` tag (see `src/main.tsx`).

### Supported `data-*` attributes

| Attribute       | Values        | Effect                                                                                           |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| `data-language` | locale string | Sets the widget's language                                                                       |
| `data-debug`    | `"true"`      | Enables `console.log/info/warn/debug` output in production builds. Errors always log regardless. |

## Project structure

```
src/
├── main.tsx                       # Entry: reads script attrs, mounts ErrorBoundary + App
├── App.tsx                        # Shadow DOM root + StyleSheetManager
└── client/
    ├── components/
    │   ├── error-boundary/        # Class-based ErrorBoundary + dev demo
    │   └── widget-entry/          # Widget UI entry point
    ├── styles/                    # Global resets injected into shadow root
    └── types/                     # Shared TS types

vite-config/
├── vite.base.config.ts            # Shared plugins, alias, esbuild drop, react-compiler
├── vite.cdn.config.ts             # CDN IIFE build
├── vite.standalone.config.ts      # Standalone SPA build
└── vite.demo.config.ts            # Demo SPA build
```

## Style isolation

`styled-components` are injected into the widget's Shadow DOM via `StyleSheetManager target={...}` (see `src/App.tsx`), so the widget cannot leak styles into — or be affected by — the host page.

## Production hardening

- `debugger` statements are stripped from production bundles via `esbuild.drop`.
- All app logging goes through `src/client/lib/logger.ts`. In production it is silent unless the host page passes `data-debug="true"` on the `<script>` tag. Use `logger.*` instead of `console.*` everywhere — ESLint's `no-console` rule enforces this (only `console.error` is allowed inline as a hard escape hatch).
- React Compiler is enabled at build time (`babel-plugin-react-compiler`).
- External anchor tags use `rel="noopener noreferrer"`.

## Code quality

A `pre-commit` hook (husky) runs `lint-staged`:

- `*.{ts,tsx,js,jsx}` → `eslint --fix` + `prettier --write`
- `*.{json,css,md}` → `prettier --write`

## Developer

NBS Lviv Team
