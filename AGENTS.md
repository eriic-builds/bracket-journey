# AGENTS.md — bracket-journey

A single-page, no-build **build-story site** (story + architecture explainer) deployed to
GitHub Pages from `docs/`. Vanilla HTML/CSS/JS, no dependencies. Design system is ported from
`sled-mywcbracket`; motion is hand-written in `docs/js/motion.js`.

- Dev: `cd docs && python3 -m http.server 8000`
- Deploy: push to `main`; `.github/workflows/deploy-pages.yml` publishes `docs/`.
- Content must stay true to the source repos — code snippets are verbatim, dashboard images are
  real screenshots. No invented examples. No copyrighted marks/photos.

See `.github/copilot-instructions.md` for full detail.

Also read TECHNICAL_TASTE_COUNCIL.md for build philosophy and decision-making judgment before making non-trivial changes.
