# bracket-journey — from an Excel attachment to a live app in six days

[![Deploy GitHub Pages](https://github.com/eriic-builds/bracket-journey/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/eriic-builds/bracket-journey/actions/workflows/deploy-pages.yml)

> The build story of how a World Cup 2026 bracket went from an emailed spreadsheet to three
> live, self-updating, zero-backend web apps — told as both a **story** and a **real
> architecture explainer**.

**Live page:** https://eriic-builds.github.io/bracket-journey/

This page walks the whole arc — **Excel → Microsoft Cowork → `wc26-bracket` →
`my-wc26-bracket` → `sled-mywcbracket`** — on two tracks at once:

- a **story track** (the hero's-journey narrative: the spark, the walls, the recoveries), and
- a **build track** (progressive-disclosure "Under the hood" panels with data-flow diagrams and
  real code snippets pulled straight from the repos).

Read it top-to-bottom for the story, or expand the panels for exactly how it works.

## The three repos it's about

| Repo | What it is |
| --- | --- |
| [`wc26-bracket`](https://github.com/eriic-builds/wc26-bracket) | A Python generator + a self-syncing results bot → one live dashboard on Pages. |
| [`my-wc26-bracket`](https://github.com/eriic-builds/my-wc26-bracket) | The engine ported to the browser: drop your Excel bracket, get your own board. |
| [`sled-mywcbracket`](https://github.com/eriic-builds/sled-mywcbracket) | The social edition: share your bracket as a link, compare on a local leaderboard — no backend. |

## Run it locally

No build step, no dependencies:

```bash
cd docs && python3 -m http.server 8000   # then open http://localhost:8000/
```

## How it's built

- `docs/index.html` — the whole page (story + architecture).
- `docs/css/journey.css` — the design system, ported from `sled-mywcbracket` (Segoe UI, the
  blue→teal gradient, glassmorphism, ambient glow, dark/light).
- `docs/js/motion.js` — the scroll/reveal motion, hand-written (no framework), reduced-motion
  aware.
- `docs/assets/shots/` — **real** screenshots of the three dashboards.

## Credits & scope

A fan project by [@eriic-builds](https://github.com/eriic-builds), not affiliated with FIFA,
GitHub, or Microsoft. Built with the GitHub Copilot CLI, guided by the
[`TECHNICAL_TASTE_COUNCIL.md`](TECHNICAL_TASTE_COUNCIL.md) in this repo. MIT licensed.
