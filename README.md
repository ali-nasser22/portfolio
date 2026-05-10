# AliOS 95 — Next.js port

A drop-in Next.js 15 (App Router) version of the AliOS 95 portfolio.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's included

- `app/` — Next.js App Router entry (`layout.tsx`, `page.tsx`)
- `components/os/` — all desktop OS components (Desktop, Window, Taskbar, StartMenu, apps…)
- `styles/globals.css` — Tailwind v4 + Win95 design tokens
- `public/Ali-Nasser-Temraz-Resume.pdf` — downloadable resume

## Notes

- Every os/* component is plain React — no router coupling.
- The home page uses `"use client"` because the desktop relies on drag/state/effects.
- Contact form posts to FormSubmit.co (no backend needed).
- Tailwind v4 is wired via `@tailwindcss/postcss`. If you prefer v3, swap the PostCSS plugin and add a `tailwind.config.js`.
- If you'd rather use plain Vite + React: copy `components/os/` and `styles/globals.css` into a Vite app, import the CSS in `main.tsx`, and render `<Desktop />`.

## File map

```
app/layout.tsx        ← root layout, imports globals.css
app/page.tsx          ← renders <Desktop />
components/os/…       ← unchanged from the Lovable project
public/…              ← static assets (resume PDF)
styles/globals.css    ← Tailwind v4 + tokens
```
