/* ============================================================
   DACHDECKEREI BERG — Haupt-JavaScript
   Vanilla JS, keine Abhängigkeiten
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     HILFSFUNKTIONEN
  ---------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  /* ----------------------------------------------------------
     1. STICKY HEADER
  ---------------------------------------------------------- */
  const header = document.getElementById("site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        header.classList.toggle("scrolled", window.scrollY > 20);
      },
      { passive: true }
    );
  }

  /* ----------------------------------------------------------
     2. BURGER MENU
  ---------------------------------------------------------- */
  const burger = document.querySelector(".burger");
  const mainNav = document.querySelector(".main-nav");

  if (burger && mainNav) {
    burger.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      burger.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Menü öffnen");
      });
    });

    document.addEventListener("click", (e) => {
      if (!mainNav.contains(e.target) && !burger.contains(e.target)) {
        mainNav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----------------------------------------------------------
     3. SCROLL REVEAL (IntersectionObserver)
  ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  /* ----------------------------------------------------------
     4. HERO — Ziegel-Wand aufbauen
  ---------------------------------------------------------- */
  function buildTileField() {
    const field = document.getElementById("tile-field");
    if (!field) return;

    const ROWS = 7;
    const COLS_BASE = 9;

    field.innerHTML = "";

    for (let r = 0; r < ROWS; r++) {
      const row = document.createElement("div");
      row.className = "tile-row";

      const cols = r % 2 === 0 ? COLS_BASE : COLS_BASE - 1;
      for (let c = 0; c < cols; c++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.setAttribute("aria-hidden", "true");

        if (!prefersReducedMotion) {
          /* Reihen von unten nach oben: höchster delay bei Reihe 0 (oben) */
          const rowFromBottom = ROWS - 1 - r;
          const baseDelay = rowFromBottom * 140 + c * 35;
          tile.style.transitionDelay = baseDelay + "ms";
        } else {
          tile.style.opacity = "1";
          tile.style.transform = "none";
        }

        /* Klick-zum-Fallen */
        tile.addEventListener("click", handleTileClick);
        tile.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTileClick.call(tile);
          }
        });

        row.appendChild(tile);
      }
      field.appendChild(row);
    }

    /* Verzögerter Start der Eindeckungs-Animation */
    if (!prefersReducedMotion) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          field.querySelectorAll(".tile").forEach((t) => t.classList.add("is-in"));
        });
      });
    }

    /* Dachsilhouette starten */
    const heroSection = document.querySelector(".hero");
    if (heroSection) heroSection.classList.add("visible");
  }

  function handleTileClick() {
    if (this.classList.contains("falling")) return;
    this.classList.remove("is-in");
    this.classList.add("falling");

    setTimeout(() => {
      this.classList.remove("falling");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.classList.add("is-in");
        });
      });
    }, 900);
  }

  buildTileField();

  /* ----------------------------------------------------------
     5. VORHER / NACHHER SLIDER
  ---------------------------------------------------------- */
  const slider = document.getElementById("ba-slider");
  const beforeEl = document.getElementById("ba-before");
  const handle = document.getElementById("ba-handle");

  if (slider && beforeEl && handle) {
    let pct = 50;
    let dragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      pct = clamp(((x - rect.left) / rect.width) * 100, 0, 100);
      beforeEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + "%";
      slider.setAttribute("aria-valuenow", Math.round(pct));
    }

    /* Mouse */
    slider.addEventListener("mousedown", (e) => {
      dragging = true;
      setPosition(e.clientX);
      e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
      if (dragging) setPosition(e.clientX);
    });
    window.addEventListener("mouseup", () => { dragging = false; });

    /* Touch */
    slider.addEventListener(
      "touchstart",
      (e) => {
        dragging = true;
        setPosition(e.touches[0].clientX);
      },
      { passive: true }
    );
    window.addEventListener(
      "touchmove",
      (e) => {
        if (dragging) setPosition(e.touches[0].clientX);
      },
      { passive: true }
    );
    window.addEventListener("touchend", () => { dragging = false; });

    /* Keyboard */
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        pct = clamp(pct - 2, 0, 100);
        beforeEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        handle.style.left = pct + "%";
        slider.setAttribute("aria-valuenow", Math.round(pct));
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        pct = clamp(pct + 2, 0, 100);
        beforeEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        handle.style.left = pct + "%";
        slider.setAttribute("aria-valuenow", Math.round(pct));
        e.preventDefault();
      }
    });
  }

  /* ----------------------------------------------------------
     6. REGEN-ABPERL-EFFEKT
  ---------------------------------------------------------- */
  function createRain() {
    if (prefersReducedMotion) return;
    const container = document.getElementById("rain-container");
    if (!container) return;

    const DROPS = 22;
    for (let i = 0; i < DROPS; i++) {
      const drop = document.createElement("div");
      drop.className = "raindrop";

      const h = 12 + Math.random() * 18;
      const dur = 1.4 + Math.random() * 1.2;
      const delay = Math.random() * 4;
      const dist = 180 + Math.random() * 200;
      const slideX = -(20 + Math.random() * 40);

      drop.style.cssText = `
        left: ${Math.random() * 105}%;
        top: ${-h}px;
        height: ${h}px;
        animation-duration: ${dur}s;
        animation-delay: ${delay}s;
        --rain-dist: ${dist}px;
        --rain-slide: ${slideX}px;
        opacity: 0;
      `;
      container.appendChild(drop);
    }

    /* Observer: nur animieren wenn Section sichtbar */
    const section = document.querySelector(".section-warum");
    if (section) {
      const rainObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            container.querySelectorAll(".raindrop").forEach((d) => {
              d.style.animationPlayState = entry.isIntersecting
                ? "running"
                : "paused";
            });
          });
        },
        { threshold: 0.1 }
      );
      rainObs.observe(section);
    }
  }

  createRain();

  /* ----------------------------------------------------------
     7. ABLAUF-LINIE wächst beim Scroll mit
  ---------------------------------------------------------- */
  function initStepsLine() {
    const lineFill = document.getElementById("steps-line-fill");
    const stepsSection = document.getElementById("ablauf");
    if (!lineFill || !stepsSection || prefersReducedMotion) {
      if (lineFill) lineFill.style.height = "100%";
      return;
    }

    const lineObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            lineFill.style.height = "100%";
            lineObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    lineObs.observe(stepsSection);
  }

  initStepsLine();

  /* ----------------------------------------------------------
     8. COUNT-UPS
  ---------------------------------------------------------- */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = clamp(elapsed / duration, 0, 1);
      const value = Math.round(easeOutQuart(progress) * target);

      const formatted =
        target >= 1000
          ? value.toLocaleString("de-DE")
          : value.toString();

      el.textContent = prefix + formatted + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (!prefersReducedMotion) {
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll(".zahl-number").forEach((el) => {
      countObs.observe(el);
    });
  } else {
    document.querySelectorAll(".zahl-number").forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      const formatted =
        target >= 1000 ? target.toLocaleString("de-DE") : target.toString();
      el.textContent = prefix + formatted + suffix;
    });
  }

  /* ----------------------------------------------------------
     9. KONTAKT-FORMULAR (Frontend-Validierung + Erfolgs-State)
  ---------------------------------------------------------- */
  const form = document.getElementById("kontakt-form");
  const formSuccess = document.getElementById("form-success");

  if (form && formSuccess) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let valid = true;

      form.querySelectorAll("[required]").forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add("invalid");
          valid = false;
        } else {
          field.classList.remove("invalid");
        }
      });

      if (!valid) {
        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      /* Erfolgs-State anzeigen */
      form.hidden = true;
      formSuccess.hidden = false;
      formSuccess.focus();

      /* TODO: Hier echtes Backend / Mailversand anbinden
         (z.B. Formspree, eigener SMTP-Handler, Netlify Forms) */
    });

    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => field.classList.remove("invalid"));
    });
  }

  /* ----------------------------------------------------------
     10. SMOOTH SCROLL für Anker-Links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"), 10) -
        16;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

})();
