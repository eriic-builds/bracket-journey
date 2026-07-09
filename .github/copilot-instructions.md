# Copilot instructions for bracket-journey

## What this repo is

A single, self-contained **build-story page** — the story of how `wc26-bracket` →
`my-wc26-bracket` → `sled-mywcbracket` got built in six days, from an Excel attachment to a
live, self-updating World Cup dashboard. It is **not** an app; it's a narrative + architecture
explainer, published as one static page on GitHub Pages.

```
docs/index.html      (the whole page: story + architecture)
docs/css/journey.css (design system ported from sled-mywcbracket)
docs/js/motion.js     (scroll/reveal motion — no framework)
docs/assets/shots/    (REAL screenshots of the three dashboards)
```

## Architecture — read before changing anything

- **No build step, no dependencies, ever.** `docs/` is the deployed site. Vanilla HTML/CSS/JS
  only. Keep it that way — it matches the sibling repos and deploys to Pages with zero config.
- **`docs/css/journey.css`** carries the sled design system: Segoe UI font stack, the
  blue→teal signature gradient (`#0097F4`→`#00B291`), the `.glass` glassmorphism surface, the
  ambient radial-glow background, brand color tokens, dark default + light toggle.
- **`docs/js/motion.js`** implements the motion vocabulary in plain JS: IntersectionObserver
  `fadeUp` staggers, a scroll-driven word-by-word reveal, a reverse-scroll accent, and
  scrollspy for the nav. Everything must degrade gracefully under `prefers-reduced-motion`.
- **The page has two tracks.** A *story track* (hero's-journey narrative) everyone reads, and a
  *build track* (progressive-disclosure "Under the hood" panels with diagrams + real code
  snippets) a technical reader can expand. Keep both legible.

## Content rules (the point of this repo)

- **Every technical claim and code snippet must be true to the source repos.** Snippets are
  pulled *verbatim* from `wc26-bracket`, `my-wc26-bracket`, `sled-mywcbracket` — never invented.
- **Dashboard imagery must be real screenshots** (in `docs/assets/shots/`), not mockups.
- **Copyright:** no copyrighted match photography or FIFA/Microsoft/GitHub marks; only the
  author's own screenshots and openly licensed decorative imagery.
- **Tone:** conversational and natural, professional but not jargon-dense — plain-language
  first, depth on demand.

## Develop & deploy

```bash
cd docs && python3 -m http.server 8000   # then open http://localhost:8000/
```

`.github/workflows/deploy-pages.yml` uploads `docs/` to Pages (Settings → Pages → Source:
GitHub Actions). `docs/.nojekyll` is a harmless fallback.

Also read TECHNICAL_TASTE_COUNCIL.md for build philosophy and decision-making judgment before making non-trivial changes.
