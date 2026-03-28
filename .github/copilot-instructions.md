# Mona Mayhem

A retro arcade-themed GitHub Contribution Battle Arena built with Astro v5 (SSR). Users enter two GitHub usernames and the app compares their contribution graphs in a game-style UI.

## Build & Dev

```bash
npm run dev       # start dev server (localhost:4321)
npm run build     # production build
npm run preview   # preview the production build
```

## Architecture

- **SSR-only** — `output: 'server'` with `@astrojs/node` standalone adapter; all routes are server-rendered by default
- `src/pages/` — Astro page components (`.astro`)
- `src/pages/api/` — API routes (`.ts`), dynamic segments via `[param].ts`
- `public/` — static assets served as-is

## Astro Conventions

- **Frontmatter** (between `---`) runs server-side only; keep data-fetching and logic here
- **Static opt-in**: add `export const prerender = true` to a page to pre-render it at build time; add `export const prerender = false` to API routes to keep them server-side (already the default in SSR mode, but explicit is preferred)
- **API routes**: type handlers as `APIRoute` from `'astro'`; access dynamic params via `params.username`
- **TypeScript**: strict mode (`astro/tsconfigs/strict`); define component props with a `Props` interface and type `Astro.props` accordingly
- **Styles**: use `<style>` in `.astro` files for component-scoped CSS; global styles go in `public/` or imported via a layout
- **No framework components needed** unless interactivity requires it; prefer Astro components and server logic first
