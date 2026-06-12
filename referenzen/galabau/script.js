/* GaLaBau Linde – script.js
   Vanilla JS, kein Framework, defer geladen */

'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════════════════════════════════════════
   HILFSFUNKTIONEN
═══════════════════════════════════════════════ */
function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)); }

/* ═══════════════════════════════════════════════
   STICKY NAV – Klasse bei Scroll
═══════════════════════════════════════════════ */
function initStickyNav() {
  const nav = qs('#site-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ═══════════════════════════════════════════════
   BURGER-MENÜ
═══════════════════════════════════════════════ */
function initBurger() {
  const burger = qs('.nav-burger');
  const mobileNav = qs('#mobile-nav');
  if (!burger || !mobileNav) return;

  function toggleMenu(open) {
    burger.setAttribute('aria-expanded', open);
    mobileNav.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isOpen);
  });

  // Schließen bei Link-Klick
  qsa('.mobile-nav__link, .mobile-nav .btn', mobileNav).forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Schließen bei Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      burger.focus();
    }
  });
}

/* ═══════════════════════════════════════════════
   SCROLL-REVEALS (IntersectionObserver)
═══════════════════════════════════════════════ */
function initScrollReveals() {
  if (reducedMotion) {
    qsa('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  qsa('.reveal').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════
   PFLANZANIMATION
   Stängel zeichnet sich ein, Blätter erscheinen gestaffelt
═══════════════════════════════════════════════ */
function initPlantAnimation() {
  // Alle Pflanzen-SVGs auf der Seite vorbereiten
  qsa('.plant-svg').forEach(svg => {
    const stem = qs('.plant-stem', svg);
    if (!stem) return;
    const len = stem.getTotalLength();
    stem.style.strokeDasharray = len;
    stem.style.strokeDashoffset = len;
  });

  if (reducedMotion) {
    qsa('.plant-stem').forEach(s => { s.style.strokeDashoffset = 0; });
    qsa('.plant-leaf').forEach(l => { l.style.opacity = 1; l.style.transform = 'scale(1)'; });
    return;
  }

  // Hero-Pflanze: startet automatisch kurz nach Seitenload
  const heroSvg = qs('.hero-plant');
  if (heroSvg) {
    setTimeout(() => animatePlant(heroSvg, 0), 600);
  }

  // Signatur-Pflanze: startet wenn sichtbar
  const signaturSvg = qs('.signatur-plant-svg');
  if (signaturSvg) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animatePlant(signaturSvg, 0);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(signaturSvg);
  }
}

function animatePlant(svg, baseDelay) {
  const stem = qs('.plant-stem', svg);
  const leaves = qsa('.plant-leaf', svg);
  if (!stem) return;

  const len = stem.getTotalLength();
  stem.style.strokeDasharray = len;
  stem.style.strokeDashoffset = len;

  // Stängel einzeichnen
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      stem.style.strokeDashoffset = 0;
    });
  });

  // Blätter gestaffelt einblenden
  const stemDuration = 2600; // ms – entspricht CSS-Transition
  leaves.forEach((leaf, i) => {
    const delay = baseDelay + stemDuration * 0.4 + i * 220;
    setTimeout(() => {
      leaf.classList.add('animated');
    }, delay);
  });
}

/* ═══════════════════════════════════════════════
   VORHER / NACHHER SLIDER
═══════════════════════════════════════════════ */
function initSlider() {
  const container = qs('.slider-container');
  if (!container) return;

  const afterLayer    = qs('.slider-layer--after', container);
  const divider       = qs('.slider-divider', container);
  const handleWrap    = qs('.slider-handle-wrap', container);
  const handleBtn     = qs('.slider-handle', container);

  let position = 50; // Prozent
  let dragging = false;

  function setPosition(pct) {
    position = Math.max(1, Math.min(99, pct));
    const pctStr = position.toFixed(1);
    afterLayer.style.clipPath    = `inset(0 ${(100 - position).toFixed(1)}% 0 0)`;
    divider.style.left           = `${pctStr}%`;
    handleWrap.style.left        = `${pctStr}%`;
    handleBtn.setAttribute('aria-valuenow', Math.round(position));
  }

  function getPctFromEvent(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : (e.clientX ?? rect.left + rect.width * position / 100);
    return ((clientX - rect.left) / rect.width) * 100;
  }

  // Pointer Events (Maus + Touch + Stift)
  handleBtn.addEventListener('pointerdown', e => {
    dragging = true;
    handleBtn.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  handleBtn.addEventListener('pointermove', e => {
    if (!dragging) return;
    setPosition(getPctFromEvent(e));
  });

  handleBtn.addEventListener('pointerup', () => { dragging = false; });
  handleBtn.addEventListener('pointercancel', () => { dragging = false; });

  // Direkt auf Container klicken / ziehen (Klick außerhalb Handle)
  container.addEventListener('pointerdown', e => {
    if (e.target === handleBtn || handleBtn.contains(e.target)) return;
    setPosition(getPctFromEvent(e));
  });

  // Tastatursteuerung
  handleBtn.addEventListener('keydown', e => {
    const step = e.shiftKey ? 10 : 5;
    if      (e.key === 'ArrowLeft')  { setPosition(position - step); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { setPosition(position + step); e.preventDefault(); }
    else if (e.key === 'Home')       { setPosition(0);               e.preventDefault(); }
    else if (e.key === 'End')        { setPosition(100);             e.preventDefault(); }
  });

  setPosition(50);
}

/* ═══════════════════════════════════════════════
   SAISON-WÄHLER (ARIA Tablist)
═══════════════════════════════════════════════ */
function initSeasonTabs() {
  const tablist = qs('.season-tabs');
  const tabs    = qsa('.season-tab', tablist);
  const panels  = qsa('.season-panel');
  if (!tabs.length) return;

  function activateTab(tab) {
    // Alle deaktivieren
    tabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.classList.remove('season-tab--active');
      t.removeAttribute('tabindex');
    });
    panels.forEach(p => {
      p.hidden = true;
      p.classList.remove('season-panel--active');
    });

    // Neuen aktivieren
    tab.setAttribute('aria-selected', 'true');
    tab.classList.add('season-tab--active');
    const panel = qs(`#${tab.getAttribute('aria-controls')}`);
    if (panel) {
      panel.hidden = false;
      panel.classList.add('season-panel--active');
    }
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(tab));

    // Pfeiltasten-Navigation
    tab.addEventListener('keydown', e => {
      let target = null;
      if      (e.key === 'ArrowRight') target = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft')  target = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home')       target = tabs[0];
      else if (e.key === 'End')        target = tabs[tabs.length - 1];
      if (target) { e.preventDefault(); target.focus(); activateTab(target); }
    });
  });
}

/* ═══════════════════════════════════════════════
   FAQ ACCORDION
═══════════════════════════════════════════════ */
function initFAQ() {
  qsa('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer   = qs(`#${answerId}`);
      if (!answer) return;

      btn.setAttribute('aria-expanded', !expanded);
      answer.hidden = expanded;
    });
  });
}

/* ═══════════════════════════════════════════════
   KONTAKTFORMULAR – Demo-Hinweis
═══════════════════════════════════════════════ */
function initContactForm() {
  const form    = qs('#contact-form');
  const success = qs('#form-success');
  if (!form || !success) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    success.hidden = false;
    success.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    // Demo: Felder nach kurzer Zeit zurücksetzen
    setTimeout(() => { form.reset(); }, 100);
  });
}

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL FÜR ANKER-LINKS
   (ergänzt CSS scroll-behavior für alle Browser)
═══════════════════════════════════════════════ */
function initAnchorScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = qs(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    // Fokus auf Target setzen (Barrierefreiheit)
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initBurger();
  initScrollReveals();
  initPlantAnimation();
  initSlider();
  initSeasonTabs();
  initFAQ();
  initContactForm();
  initAnchorScroll();
});
