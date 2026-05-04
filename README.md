# The Tarnished's Ledger

A quest tracker for Elden Ring that follows every questline, NPC interaction, and missable event across all regions — in the correct order. Based on the video series by [ItsShatter](https://www.youtube.com/@ItsShatter).

## Features

- **Step-by-step tracking** across all base game and DLC regions
- **Progress persistence** via localStorage — picks up where you left off
- **Auto-advance** — completing a section automatically opens the next one
- **MapGenie integration** — jump straight to a location on the interactive map
- **YouTube timestamps** — watch the exact moment in ItsShatter's guide for any step
- **Overall progress** tracking across all regions from the landing page

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for bundling
- [Zustand](https://zustand-demo.pmnd.rs) for state management
- [Tailwind CSS v4](https://tailwindcss.com) for styling
- [Lucide React](https://lucide.dev) for icons

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
