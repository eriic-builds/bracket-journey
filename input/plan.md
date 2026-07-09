# bracket-journey — the build story, as a published site

## Problem & goal
Eric built a live World Cup 2026 bracket dashboard in six days, evolving it across three
public repos, and a leader in his org asked to share it broadly. He wants a **new GitHub repo
`bracket-journey`** that tells that end-to-end story as a polished, published web page —
consistent with the **sled-mywcbracket** design system, animated with the section/scroll
**motion patterns** from the provided Mindloop snippet (reused *as reference*, in sled's
palette — not Mindloop's monochrome).

**Two audiences, one page:**
- **Overt:** a team presentation — "here's the amazing thing we built and how."
- **Subtle (never stated):** a hiring showcase — drive to learn, curiosity, tool fluency,
  and a repeatable method (brief/spec → iterate). Shown through the work, not claimed.

**Voice:** conversational and natural — written the way Eric would *speak* it — professional
and genuinely enthusiastic, **not** jargon-dense. Every technical beat has a plain-language
version first, then an optional "under the hood" layer so a reader (and Eric) can actually
*learn how it was built*. Storytelling influences: **Naval Ravikant** (leverage, specific
knowledge, systems over outcomes, learning in public, compounding) and **Peter Cohan / "Great
Demo!"** (lead with the payoff / CTQ, then peel back the layers), told on a **hero's-journey**
arc with real pitfalls, recoveries, and excitement.

## Dual-track structure — a hero's journey *and* a real architecture explainer
The page satisfies two readers at once, and the plan treats **both as first-class**. Each
chapter runs two tracks: a **Story track** everyone reads, and a **Build track** a technical
reader can expand — so someone finishes the page able to explain *how it actually works*.

- **Story track (hero's journey)** — the spine, mapped to the classic arc:
  - *Ordinary world:* the Excel workbook in the inbox.
  - *Call to adventure:* "the data is begging to be visual."
  - *Crossing the threshold:* the long-postponed first push to GitHub / Pages.
  - *Trials & the abyss (the Walls):* Pages won't deploy; the sync bot fights back; tests
    would break every match-day; the demo silently eats user edits; eight blank bracket cells.
  - *Transformation:* the workflow levels up — briefs, staged plans, the Taste Council.
  - *Return with the elixir:* a leader asks to share it broadly; the method is now repeatable.
- **Build track (architecture explainer)** — runs alongside every chapter via **progressive
  disclosure**: "Under the hood" panels, inline **diagrams**, and **real code/JSON snippets
  pulled verbatim from the repos** (never invented). The story reader skims; the technical
  reader expands and learns the system.

### What a technical reader can explain after reading (the architecture, concretely)
- **Data → render → deploy pipeline (repo 1):** `data/{picks,live,topology}.json` →
  `build_dashboard.py` (everything *derived*, nothing hardcoded) → `docs/index.html` → Pages;
  a CI **drift guard** that regenerates and fails on any diff; a **GitHub Action** syncing 3×/day.
- **Sync engine (`fetch_results.py`):** FIFA public feed + football-data.org fallback,
  round-by-round match→bracket-code matching via `KO_FEED`, kickoff-time backfill, idempotency
  (never clobbers), and the penalty-shootout edge case (subtract `score.penalties`).
- **Client-side port (repo 2):** the Python engine re-expressed as a **pure function**
  `renderDashboard(picks, live, topology) → HTML`; in-browser SheetJS workbook parse +
  validation; and the **golden test** byte-locking JS output against the Python original.
- **Zero-backend social layer (repo 3):** the **wire format** —
  `#b=base64url(JSON{v,b,n,t})` in the URL *fragment* (never sent to any server, by HTTP's own
  rules); bit order from `deriveStructure(topology)`; decode → `buildPicks` → validate;
  `localStorage` keys (`wcb.fan.picks.v1`, `wcb.rivals.v1`); leaderboard rank + per-rival diff.
- **A whole-system diagram** synthesizing all three, so the architecture is legible at a glance.

Each "Under the hood" panel = plain-language explanation + a **small verbatim snippet from the
repo** + an **inline SVG/CSS diagram** in sled's palette. No heavy deps; lightweight, no-build
syntax highlighting.

## Devil's-advocate lens — Anthropic/OpenAI "AI Success Engineer" (FDE) hiring manager
A design input, **not** an on-page section (stays subtle). Grounded in what these 2026 roles
actually screen for: shipping production systems (not demos), delivery under ambiguity +
decomposition, customer/stakeholder empathy, measurable adoption/ROI, and AI-reliability
discipline (evals, guardrails, verifying non-deterministic output). Verdict on the current
story:

- **Already strong (amplify):** three *live* shipped systems + a self-updating pipeline;
  the GCSE brief → staged plans → review loop *is* the "decomposition" they interview for;
  "nobody follows instructions → ship the product, not the instructions" is the most
  FDE-relevant lesson (last-mile adoption) — currently buried; six days / one builder = bias
  to action + ownership.
- **Gaps to close (each drives a refinement below):**
  1. *No measured outcome.* "A leader asked to share it" is social proof, not a metric →
     add an honest **impact** beat (qualitative traction + what I'd measure next; no invented
     numbers).
  2. *AI workflow told as craft, not reliability discipline* → reframe lightly: golden test =
     regression **eval**, "Fable 5 reviews output" = second-pass **grader**, Taste Council =
     **rubric**, privacy-by-design = **guardrail**, hermetic fixtures = deterministic evals.
  3. *Breadth over judgment* → elevate **decisions & roads-not-taken** (no backend, no
     re-share, base64 over bit-packing) as tradeoff reasoning.
  4. *No skim path* (a hiring manager gives ~60s) → add a **TL;DR + clickable evidence strip**
     up top (also satisfies Great Demo's lead-with-payoff).
  5. *Resilience hidden* → surface the sync engine (FIFA feed + fallback, penalty-shootout
     edge case, idempotent) as "survives contact with real data."
  6. *Calibrated self-awareness* → a short, specific "what I'd do differently / what's next."
- **Transfer thread (subtle):** the brief→plan→execute→review→approve loop + the Taste Council
  read as a **repeatable playbook for de-risking someone else's AI build** — implied, never
  stated as "hire me."

## Do we need to list all three repos? (deliberate answer)
Yes — but not as "Repo 1/2/3." The three repos are the proof-of-work and the **evolution is the
argument**, so keep all three visible and clickable, but reframe each chapter by its *insight*
(**Make it mine → Make it theirs → Make it social**) with the repo as an evidence chip. Add one
compact **"three repos at a glance"** strip so the enumeration lives in a single scannable place
instead of turning the story into a repo tour.

## Locked decisions (from the brief)
- **Repo:** new public GitHub repo `bracket-journey` under `eriic-builds`. Everything stays in
  GitHub (source + GitHub Pages hosting). Commit identity: name `eriic-builds`,
  email `265623241+eriic-builds@users.noreply.github.com`.
- **Stack:** **vanilla, no build step** (single `docs/index.html` + `docs/css` + `docs/js`),
  matching sled's actual approach and deploying to GitHub Pages with zero config. This keeps
  the artifact consistent with sled and "everything in GitHub."
- **Design system (from sled `docs/css/dashboard.css`):** Segoe UI font stack; signature
  blue→teal gradient (`#0097F4`→`#00B291`); brand colors (blue/purple/pink/orange/yellow/
  green/teal/red); glassmorphism `.glass` (backdrop-blur 14px, gradient fill, soft border +
  shadow); ambient radial-glow background; 18px radius. Default **dark** theme; optional
  light toggle. (We will not port the joke themes — geocities/minecraft/etc. — but may nod to
  them in the story as a taste detail.)
- **Motion (from the Mindloop snippet, re-implemented in vanilla JS):** fixed transparent
  navbar; full-viewport hero; `fadeUp` staggered reveals via IntersectionObserver;
  scroll-driven **word-by-word reveal** (scroll progress → per-word opacity 0.15→1);
  liquid-glass cards; sticky/CTA sections; a **reverse-scroll** signature element (e.g.
  bracket connectors that draw / a strip that moves counter to scroll). `prefers-reduced-motion`
  respected.
- **Taste Council:** copy the council file from its real location
  `sled-mywcbracket/dev-docs/TECHNICAL_TASTE_COUNCIL.md` into the new repo, and add a short
  `.github/copilot-instructions.md` / `AGENTS.md` pointer (per the council's own setup rule);
  channel its 9 voices while building; and **feature** the council as a story element.

## Real assets (no fabricated dashboards)
- **Dashboard screenshots must be real.** No image assets exist in any repo, so capture them
  with **Playwright (headless Chromium via npx)** from the live GitHub Pages sites
  (sled, my-wc26, wc26) — bracket map (my-picks + actual), KPI cards, scorecard, round
  results, the click-to-pick builder, the share popover, and the leaderboard/diff. Fallback:
  serve each repo's `docs/` locally and shoot the same views. Store under
  `docs/assets/shots/`, referenced at their real crops.
- **Web images:** pull only **license-safe** imagery (e.g. Unsplash/Wikimedia public-domain
  or openly licensed) for texture/atmosphere, with attribution. **Avoid copyrighted match
  photography / FIFA marks.** Lean on Eric's own real screenshots as the hero visuals and on
  sled's CSS gradients/glass for decoration. (Copyright guardrail called out explicitly.)

## Page architecture (Mindloop section rhythm → this story; refined by the FDE lens)
1. **Navbar** (fixed, transparent): sled `.orb` gradient mark + "The Bracket Journey"; nav
   dots — Payoff · Spark · Make it mine · Make it theirs · Make it social · Method · Walls ·
   Live; right side links to the live app + GitHub.
2. **Hero** (full viewport): improved intro headline — "From an Excel attachment to a live app
   in six days." Animated glass/gradient backdrop (sled ambient glow; no external video).
   Stat row: **6 days · 3 public repos · ~190 commits · $0/mo · 1 builder**. CTAs: Open the app
   / Read the story.
3. **TL;DR / 30-second skim strip** *(new — for the 60-second reader)*: the payoff + the method
   in three lines, plus **clickable evidence chips** (3 live repos, ~190 commits, $0). Lets a
   busy reader get the whole arc without scrolling the full story.
4. **The Payoff** (Great-Demo cold open): the coworker taps "Add to my leaderboard" and the
   standings reshuffle — no login, no server, no name exposed. Scroll-reveal punch line + real
   leaderboard/share screenshot.
5. **Chapter 1 — The Spark (Excel → Microsoft Cowork):** the emailed workbook; seeing data
   begging to be visual; designing glassmorphism + the BracketMap in Cowork; packaging it as a
   **markdown build kit** (v6→v7) → the dawning idea that *the spec is the product*.
6. **Chapter 2 — Make it mine** (`wc26-bracket`, evidence chip): hardcoded HTML → real
   architecture (data layer / generator `build_dashboard.py` / sync `fetch_results.py` / a
   GitHub Action redeploying 3×/day). "The machine that builds itself." Under-the-hood: JSON
   data layer + CI drift guard.
7. **Chapter 3 — Make it theirs** (`my-wc26-bracket`, evidence chip) — *headline the customer-
   empathy lesson*: nobody follows instructions → **ship the product, not the instructions.**
   Port the Python engine to client-side JS (SheetJS parse in-browser, privacy by design), the
   **golden test** (byte-for-byte parity), the click-to-pick builder. Under-the-hood: pure
   `renderDashboard(picks,live,topology)`.
8. **Chapter 4 — Make it social** (`sled-mywcbracket`, evidence chip): social with **no
   backend** — the bracket rides in the URL fragment (never sent to any server: "privacy isn't
   a policy, it's physics"), local leaderboard, per-rival diff. Under-the-hood: wire format +
   localStorage keys.
9. **Three repos at a glance** *(new — compact evidence strip)*: one scannable row per repo —
   name · one-line purpose · commit count · live link — so the enumeration is skimmable in one
   place, not spread across three heavy headers.
10. **The Method** *(reframed as reliability discipline)*: the **GCSE brief** (Goal / Context /
    Source / Expectations); the division of labor (I brief → Fable 5 plans → I review/adjust →
    cheaper models Opus 4.8 / GPT 5.5 execute → Fable 5 reviews → I approve); the **Technical
    Taste Council** (9 named voices). Explicitly (but lightly) frame the verification stack:
    golden test = regression **eval**, review model = second-pass **grader**, council =
    **rubric**, privacy-by-design = **guardrail**, hermetic fixtures = deterministic evals. Add
    a **"decisions & roads-not-taken"** callout (no backend, no re-share, base64 over
    bit-packing) as evidence of judgment. Subtle transfer line: this is a repeatable playbook.
11. **The Walls** (hero's-journey obstacles, each: what broke → the fix → the lesson): Pages
    refused to deploy; my own sync bot pushed against me; tests would've broken every match-day
    (→ hermetic fixtures); viewing the demo silently deleted user edits; eight blank
    bracket-map cells. Plus a **resilience** beat: the sync survives messy real data (FIFA feed
    + football-data fallback, penalty-shootout edge case, idempotent, never clobbers). Grounded
    in real commits/PRs.
12. **Impact & what's next** *(new — honest, calibrated)*: the traction (a leader asked to
    share it broadly; coworkers added each other); what I'd **measure next** (shares, active
    leaderboards); and a specific "what I'd do differently / still learning" — no invented
    metrics.
13. **The Return / CTA:** set a vision, understand the outcome, build. Links: live app, all 3
    repos, this repo; one honest "the code's public — tell me what to fix" line.
14. **Footer:** fan project; not affiliated with FIFA/GitHub/Microsoft; MIT; built with GitHub
    Copilot CLI.

## Todos (tracked in SQL)
1. `scaffold-repo` — create `bracket-journey/` (docs/, css, js, assets, .github), LICENSE,
   README, `.nojekyll`, copy `sled-mywcbracket/dev-docs/TECHNICAL_TASTE_COUNCIL.md` +
   instruction-file pointer.
2. `port-design-system` — adapt sled's tokens/glass/ambient glow into a reusable stylesheet
   (dark default + light toggle).
3. `build-motion-lib` — vanilla JS: IntersectionObserver `fadeUp`, scroll word-reveal,
   reverse-scroll element, reduced-motion guard, scrollspy nav.
4. `capture-screenshots` — Playwright script; shoot real dashboard views from the three live
   sites (fallback: local serve); crop/optimize into `docs/assets/shots/`.
5. `gather-web-images` — source license-safe atmosphere imagery + attribution (copyright-safe).
6. `reconstruct-timeline` — mine git log / PRs across the 3 repos for exact commits, dates, the
   "walls" citations, and any traction signals that back the story.
7. `write-narrative` — full copy: improved intro + all chapters, dual conversational/technical
   layers, Naval + Cohan framing. **Story track** follows the hero's-journey beat map. **FDE-lens
   refinements:** headline "ship the product, not the instructions"; frame the verification stack
   as evals/grader/rubric/guardrail; add decisions/roads-not-taken; add the resilience beat; add
   honest impact + calibrated "what's next." Grounded in verified repo facts.
8. `build-architecture-explainers` — the **Build track**: per-repo data-flow **diagrams**
   (inline SVG/CSS in sled's palette) + a whole-system diagram, and **"Under the hood" panels**
   pairing plain-language explanations with **verbatim code/JSON snippets pulled from the repos**
   (pipeline, sync engine + penalty edge case, pure `renderDashboard`, golden test, URL wire
   format, localStorage keys, CI drift guard). Lightweight no-build syntax highlighting.
9. `craft-skim-layer` — the TL;DR / 30-second strip, clickable evidence chips, and the "three
   repos at a glance" strip (the skim path for a busy hiring manager).
10. `assemble-page` — compose `index.html` from sections + assets + copy; wire motion, nav, and
    the progressive-disclosure "Under the hood" panels + diagrams (story track + build track).
11. `polish-a11y-perf` — responsive, keyboard/focus, alt text, reduced-motion, Lighthouse pass,
    OG/social preview meta.
12. `verify-review` — cross-check every claim **and every code snippet** against the repos
    (Willison voice: snippets must be verbatim/accurate); test on mobile/desktop; confirm all
    links + images load.
13. `deploy-pages` — init git, commit as `eriic-builds`, `gh repo create`, push, enable Pages
    (Actions), verify the live URL.

## Notes, risks, considerations
- **Copyright guardrail:** no copyrighted match photos or FIFA/Microsoft/GitHub marks; only
  Eric's own screenshots + openly licensed decorative imagery.
- **"Don't be obvious" about the hiring intent:** the page never says "hire me." The method,
  the walls-and-recoveries honesty, and the working links do the persuading.
- **Build-vs-narrative fidelity:** the technical layer must be *accurate* — every mechanism is
  verified against the actual code before it's described (golden test, URL-fragment physics,
  sync bot, hermetic fixtures).
- **Relationship to JOURNEY.html:** this supersedes and elevates it (own repo, richer motion,
  real screenshots, dual-layer teaching), reusing its verified facts and arc.
- **Reduced-motion / performance:** scroll effects must degrade gracefully; no heavy deps
  (Playwright is a dev-only capture tool, not shipped).
