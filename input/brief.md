# Brief — `bracket-journey`

> **What this is.** The brief that produced this repo: the original request I gave GitHub
> Copilot CLI, plus every refinement ("tuning") we made together over the session, consolidated
> into one spec. Kept here so I can review and reverse-engineer our own process later. The
> companion `plan.md` in this folder is the execution plan Copilot wrote *from* this brief.
>
> Fittingly, this is the whole point of the story it tells: **the spec is the real product; the
> code is its output.**

---

## The ask, in one line

Document my journey — **Excel → Microsoft Cowork → `wc26-bracket` → `my-wc26-bracket` →
`sled-mywcbracket`** — as a polished, published web page, to present to my team, told as a
hero's-journey story *and* a genuine architecture explainer.

---

## Goal · Context · Source · Expectations (GCSE)

**Goal.** A single, published page (`bracket-journey`) that tells how I took an emailed Excel
bracket and turned it, in one weekend, into three live, self-updating, zero-backend World Cup
dashboards — ending with a leader in my org asking to share it broadly. It should make a reader
feel the excitement *and* be able to learn how it was built. (Quiet second goal: evidence for my
next role — shown through the work, never stated.)

**Context.**
- Audience: my team first; secondarily anyone technical who wants to learn the how.
- Voice: conversational and natural — written the way I'd *speak* it — professional and
  genuinely enthusiastic, **not** jargon-dense. Plain-language first, technical depth on demand.
- It must satisfy **two readers at once**: the story reader (hero's-journey arc, pitfalls,
  recoveries, excitement) and the technical reader (how it works, how it's built, the
  architecture behind it).
- Storytelling influences: **Naval Ravikant** (leverage, specific knowledge, systems over
  outcomes, learning in public) and **Peter Cohan / "Great Demo!"** (lead with the payoff, then
  peel back the layers).
- Everything stays in GitHub (source + GitHub Pages hosting).

**Source (ground truth — reverse-engineer from these, do not invent).**
- `https://github.com/eriic-builds/wc26-bracket` — repo 1 (Python generator → live dashboard).
- `https://github.com/eriic-builds/my-wc26-bracket` — repo 2 (client-side "bring your own bracket").
- `https://github.com/eriic-builds/sled-mywcbracket` — repo 3 (zero-backend social edition).
- `sled-mywcbracket/dev-docs/TECHNICAL_TASTE_COUNCIL.md` — the judgment framework to leverage.
- *(Only these three repos. Do **not** look into `bracket-story`.)*

**Expectations (what "done" looks like).**
- New public repo **`bracket-journey`** under `eriic-builds`, deployed on GitHub Pages.
- **Design UI from `sled-mywcbracket`** (colors, fonts, themes) so the artifact is visually
  consistent with the app it's about.
- **Section/scroll motion** using the format from the provided Mindloop snippet *as a
  reference* (reverse-scroll motion, staggered reveals, scroll word-reveal) — re-skinned into
  sled's palette, **not** Mindloop's monochrome.
- **Real dashboard imagery**: use exact screenshots of what the dashboards actually look like —
  do **not** fabricate examples. Pull other relevant imagery from the web (license-safe).
- Tell the full arc on the **hero's-journey** structure; include the pitfalls and the recoveries.
- Leverage the **Technical Taste Council** while building, and feature it in the story.
- Improve my provided intro (below) while keeping it natural, professional, enthusiastic.

---

## The intro I provided (to be improved, tone preserved — verbatim)

> hello everyone. Welcome. Im eric, a Cloud Solution Architect at Microsoft and what that means
> is i get to help people make progress with AI. i'll tel you the story. so you can build it. it
> started out with a leader in my org starting a world cup bracket predicition challenge in my
> org. he dropped an excel sheet and we would select and fill in our brackets and email it back
> to him. seeing this was an opportunity to take it from an excel to output information into a
> visual way. I used Microsoft Work [Cowork] to design the UI, glassmorphism, designing the
> BracketMap. At first the goal was to just use Cowork as the way to see my dashbaord and
> scheulde sync in Microsoft Cowork to return new data. instead of a prompt I decided to share
> it as a md file so others could replicate the same dashboard i made. i realized i had an
> opportuntiy to one leverage github copilot to host my html dashbaord on github pages. a long
> time project i've been meaning to do. that way i can access this dashboard and keep up to date
> with the information. use the repos to reverse engineer and look back on the build process. I
> started off with this repo: wc26-bracket and this is where GH Copilot and I started to build
> out the architecture and map out the codebase from a hardcoded html to pieces. Eventually, as I
> shared the md file I realized the person i shared it with would not go through all the steps to
> build one out themeselves so I took what i build previous and aske copilot to come up with a
> plan where that end user could just drop their execle bracket and it would populate the
> dashabord with their data and bracket map values in there. the work is done in this repo:
> my-wc26-bracket. and then finally as we finished that end-user client side repo i realized that
> people would love a social aspect of this dashboard by being able to see how they rank against
> their friends while keeping it secure and no back end so i worked with GithubCopilot to build
> out the soical arm. here is where i tarted to research and learn what experts in ai agent
> building are doing and started with a brief, and had copilot come up with plans to execute. i
> would review the plans make adjustments and have copilt build along those plans. that final and
> last iteration is here: sled-mywcbracket. what I loved about this side fan project is that it
> took just a weekend. I was about to build. to execute on an idea and make it a reality. I was
> able to set a vision, understand my outcome, and shape the right outcome based on my minds eye.
> for the 3rd repo I did give Fable a detailed brief and full context and told it to build plan
> for "cheaper" models like opus 4.8 and gpt 5.5 to do the mechanical work. then after I would
> use Fable 5 to revie output. the whole joureny has been an eye opener on using github, git,
> committing, being able to adjust my taste. I even set up a technical taste council to guide on
> architecture, principles, and taste/judgment. Think deeply on this and truly tell a story
> follow the heros journy arc, make it exciting, my pitfalls, where I fell short but overcame it,
> the excitement i had, the goal is to influence and share my excitment from an end to end
> experiene from ideation to a leader in my org asking if he can share broadly. this project was
> for me to learn github copilot, learn ai architecture building, using specs and briefs, but
> also being about to test out features, getting comforatbale in the CLI, im still learning and
> looking to improve, the codebase is public so if there are any suggestions or learning moments
> im all ears to learn and improve.

---

## Tuning log — every refinement we made this session

1. **Scope guardrail.** Analyze only the three repos above; explicitly do **not** open
   `bracket-story`.
2. **Deliverable format.** A brand-new, standalone, published page in its own repo
   (`bracket-journey`) — an elevated successor to `sled`'s existing `JOURNEY.html`, not an edit
   of it.
3. **Design consistency.** Pull the design system (colors, fonts, themes, glassmorphism, ambient
   glow) from `sled-mywcbracket`. Motion comes from the Mindloop snippet *as reference only* —
   re-skinned into sled's palette, never Mindloop's pure-black monochrome or its assets/content.
4. **Stack.** Vanilla, no build step (single `docs/index.html` + css/js), so it matches sled and
   deploys to Pages with zero config — "everything stays in GitHub."
5. **Real assets, not mockups.** Capture actual dashboard screenshots (Playwright over the live
   sites); only license-safe decorative imagery; no copyrighted match photos or FIFA/MS/GitHub
   marks.
6. **Dual-purpose read.** Conversational story **and** a real technical/architecture explainer,
   so a reader (and I) can learn *how it works* — plain-language first, "under the hood" depth
   on demand.
7. **Storytelling lenses.** Naval + Peter Cohan ("Great Demo!"): lead with the payoff, then peel
   back the layers, on a hero's-journey arc.
8. **Leverage the Technical Taste Council** at `dev-docs/TECHNICAL_TASTE_COUNCIL.md` (path
   corrected mid-session); channel its nine voices while building, and feature it in the story.
9. **Re-analyze the technical build** across all three repos with the council lens, so the
   architecture explainer is accurate and grounded.
10. **Devil's-advocate lens (added).** Critique the story as an **Anthropic/OpenAI "AI Success
    Engineer" (Forward-Deployed Engineer) hiring manager** would — what's missing? Fold the
    findings back into the story:
    - add a measured-outcome / impact beat (honest, no invented metrics);
    - reframe the verification stack as reliability discipline (golden test = regression *eval*,
      review model = *grader*, taste council = *rubric*, privacy-by-design = *guardrail*);
    - elevate the decisions & roads-not-taken (no backend, no re-share, base64 over bit-packing)
      as judgment, not just breadth;
    - add a 60-second skim path (TL;DR + evidence chips);
    - surface the sync engine's resilience against messy real data;
    - add a calibrated "what I'd do differently / what's next."
    - Keep the hiring intent **implicit** — never "hire me."
11. **Do we list all three repos?** Yes — they're the proof-of-work and the evolution *is* the
    argument — but reframe each chapter by its **insight** ("Make it mine → Make it theirs →
    Make it social"), with the repo as a clickable evidence chip, plus one compact "three repos
    at a glance" strip. Not a repo tour.
12. **Story + architecture, explicitly both.** Confirm the page reads as a hero's journey **and**
    satisfies a technical audience (how it's built, how it works, the architecture) — delivered
    as two parallel tracks with progressive-disclosure "Under the hood" panels (diagrams +
    verbatim code snippets from the repos).
13. **This folder.** Save the consolidated brief and the execution plan under `input/` for
    later review of the process.

---

## Appendix — motion reference (structure & animation only)

The brief included a full front-end snippet for a dark landing page called **"Mindloop."** We
used it **only** as a reference for *section rhythm and scroll motion* — **not** its content,
its assets/video URLs, or its pure-black monochrome palette (those were replaced with sled's
design system). The parts we borrowed:

- **Reusable `fadeUp` reveal with staggered delays** (opacity 0 → 1, y 20 → 0, triggered in
  view) — re-implemented here in vanilla JS with `IntersectionObserver`.
- **Scroll-driven word-by-word reveal** (each word's opacity ramps 0.16 → 1 with scroll
  progress) — re-implemented with a scroll handler.
- **Liquid-glass surface** (subtle translucent card with an inset gradient border) — mapped onto
  sled's existing `.glass`.
- **Fixed transparent navbar → full-viewport hero → alternating content sections → CTA →
  footer** section order, with a **reverse-scroll** accent element.

The original snippet's exact HSL tokens, video/HLS URLs, avatar/icon assets, and copy were
intentionally discarded — they belonged to a different product. Only the *motion vocabulary and
section cadence* carried over.
