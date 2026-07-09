/* ============================================================================
   bracket-journey — motion.js
   The motion vocabulary from the Mindloop reference, re-implemented in plain JS
   (no framework): staggered fade-up reveals, a scroll-driven word reveal, a
   reverse-scroll accent, scrollspy nav, a sticky-nav shade, and a theme toggle.
   Everything is a no-op / instant under prefers-reduced-motion.
   ============================================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- theme toggle (dark default, remembers choice) -------------------- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("bj.theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}
  function wireTheme() {
    var btn = document.getElementById("themeBtn");
    if (!btn) return;
    var sync = function () {
      var dark = root.getAttribute("data-theme") !== "light";
      btn.textContent = dark ? "☀️" : "🌙";
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    };
    sync();
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("bj.theme", next); } catch (e) {}
      sync();
    });
  }

  /* ---- staggered fade-up reveals --------------------------------------- */
  function wireReveals() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- scroll-driven word-by-word reveal -------------------------------- */
  var wordBlocks = [];
  function buildWordReveal() {
    Array.prototype.slice.call(document.querySelectorAll(".wordreveal")).forEach(function (block) {
      if (block.dataset.split) return;
      var words = block.textContent.trim().split(/\s+/);
      block.textContent = "";
      words.forEach(function (w, i) {
        var span = document.createElement("span");
        span.className = "w";
        span.textContent = w;
        block.appendChild(span);
        if (i < words.length - 1) block.appendChild(document.createTextNode(" "));
      });
      block.dataset.split = "1";
      if (reduce) {
        Array.prototype.slice.call(block.querySelectorAll(".w")).forEach(function (s) { s.classList.add("lit"); });
      } else {
        wordBlocks.push(block);
      }
    });
  }
  function paintWordReveal() {
    var vh = window.innerHeight;
    wordBlocks.forEach(function (block) {
      var r = block.getBoundingClientRect();
      // progress: 0 when block top enters lower third, 1 when it reaches upper third
      var start = vh * 0.82, end = vh * 0.32;
      var p = (start - r.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      var spans = block.querySelectorAll(".w");
      var lit = Math.round(p * spans.length);
      for (var i = 0; i < spans.length; i++) spans[i].classList.toggle("lit", i < lit);
    });
  }

  /* ---- reverse-scroll accent strip ------------------------------------- */
  var strips = [];
  function wireStrips() {
    strips = Array.prototype.slice.call(document.querySelectorAll(".reverse-strip .track"));
  }
  function paintStrips() {
    if (reduce) return;
    var y = window.pageYOffset;
    strips.forEach(function (t) {
      var speed = parseFloat(t.dataset.speed || "0.15");
      t.style.transform = "translateX(" + (-((y * speed) % 600)) + "px)";
    });
  }

  /* ---- sticky-nav shade + scrollspy ------------------------------------ */
  var nav, spyLinks = [], spyTargets = [];
  function wireNav() {
    nav = document.querySelector(".nav");
    spyLinks = Array.prototype.slice.call(document.querySelectorAll(".nav .dots a"));
    spyTargets = spyLinks.map(function (a) {
      var id = a.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    });
  }
  function paintNav() {
    if (nav) nav.classList.toggle("scrolled", window.pageYOffset > 24);
    var pos = window.pageYOffset + window.innerHeight * 0.32;
    var activeIdx = -1;
    for (var i = 0; i < spyTargets.length; i++) {
      var t = spyTargets[i];
      if (t && t.offsetTop <= pos) activeIdx = i;
    }
    spyLinks.forEach(function (a, i) { a.classList.toggle("active", i === activeIdx); });
  }

  /* ---- image fallback (so a missing shot never looks broken) ------------ */
  function wireImgFallback() {
    Array.prototype.slice.call(document.querySelectorAll("img[data-shot]")).forEach(function (img) {
      img.addEventListener("error", function () {
        var fig = img.closest(".shot") || img.parentElement;
        if (!fig || fig.dataset.fallback) return;
        fig.dataset.fallback = "1";
        var ph = document.createElement("div");
        ph.style.cssText = "aspect-ratio:16/10;display:grid;place-items:center;padding:24px;text-align:center;color:var(--muted);font-size:.86rem;background:var(--panel2);gap:8px";
        ph.innerHTML = "<div style='font-size:1.6rem'>🖼️</div><div><b style='color:var(--text2)'>" +
          (img.getAttribute("alt") || "Dashboard screenshot") +
          "</b><br><span style='font-family:var(--mono)'>" + (img.dataset.shot || "") + "</span></div>";
        img.replaceWith(ph);
      });
    });
  }

  /* ---- rAF-batched scroll loop ----------------------------------------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      paintNav(); paintWordReveal(); paintStrips();
      ticking = false;
    });
  }

  function init() {
    wireTheme();
    wireReveals();
    buildWordReveal();
    wireStrips();
    wireNav();
    wireImgFallback();
    paintNav(); paintWordReveal(); paintStrips();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // smooth-scroll for in-page nav that also respects reduced-motion
    Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (a) {
      a.addEventListener("click", function (e) {
        var t = document.querySelector(a.getAttribute("href"));
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
