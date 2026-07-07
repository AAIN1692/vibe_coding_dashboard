# Sales Dashboard

Interactive sales dashboard built with React 18, TypeScript 5, Vite, Tailwind CSS, and Recharts.

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run lint` | Run ESLint across the project |
| `npm run build` | Type-check (`tsc --noEmit`) then produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally for a final check before deploying |

## Pre-Deploy Checklist

Run these locally before deploying — all should complete with zero errors:

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run preview
```

## Deployment

This is a static single-page app (no backend required in v1 — it runs entirely on mock data). Any static host works.

### Vercel (recommended)
1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the repo at https://vercel.com/new.
3. Vercel auto-detects Vite — no configuration needed. Deploy.

### Netlify
1. Push the repo to your git provider.
2. New site from Git at https://app.netlify.com.
3. Build command: `npm run build`. Publish directory: `dist`.

### GitHub Pages
1. Set `base: '/<your-repo-name>/'` in `vite.config.ts`.
2. `npm run build`, then deploy the `dist/` folder to the `gh-pages` branch (e.g. via the `gh-pages` npm package or a GitHub Actions workflow).

## Future Real-API Swap

`src/services/dataService.ts` currently reads from `src/services/mockData.ts`. To connect a real backend later, replace the body of `getDashboardData()` with an HTTP call to your API (e.g. using a `VITE_API_BASE_URL` environment variable) — no changes are needed in any component, since they all consume data through this same function signature.