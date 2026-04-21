# aktienpost.ch

Landing page for **aktienpost.ch** — Börsensignale für Schweizer Privatanleger.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with a Swiss-private-banking palette (navy / gold / cream)
- **Recharts** for the hero equity-curve chart
- **Google Fonts**: Source Serif 4 (display) + Inter (body)

## Getting started

```bash
npm install
npm run dev
```

Opens on http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Deployment

Deployed on Vercel. Connect the `owiCH-Ro/aktienpost` repository in Vercel and set the custom domain `aktienpost.ch`.

## Structure

- `app/layout.tsx` — root layout with fonts + SEO metadata
- `app/page.tsx` — single-page landing composing every section (Hero, Metrics,
  Strategies, Performance, How-it-works, Bank comparison, Pricing, FAQ, Final
  CTA, Footer)
- `components/` — `nav`, `hero-chart`, `sparkline`, `faq`

All copy is in German; all performance numbers are hardcoded from the
10-year backtests of the underlying strategies (SPI Breakout, SPI Defensiv,
US Tech Growth, Europa Breakout).
