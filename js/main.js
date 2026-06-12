/* ============================================================
   WEBAMBOSS — main.js
   Mobile Nav, Scroll-Reveals, aktive Nav-Links
   ============================================================ */

(function () {
  'use strict';

  /* ---- Mobile Navigation ---- */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    /* Schließen bei Klick auf Nav-Link (Mobile) */
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });

    /* Schließen bei Klick außerhalb */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  /* ---- Aktiver Nav-Link ---- */
  (function markActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(function (link) {
      const href = link.getAttribute('href') || '';
      if (href === current || (current === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  })();

  /* ---- Scroll-Reveal via IntersectionObserver ---- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

    if (revealEls.length) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach(function (el) { observer.observe(el); });
    }
  } else {
    /* Motion deaktiviert: alle sofort sichtbar */
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---- Kontaktformular (einfache Validierung) ---- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const consent = form.querySelector('[name="datenschutz"]');
      if (!consent || !consent.checked) {
        alert('Bitte bestätigen Sie die Datenschutzerklärung.');
        return;
      }
      /* TODO: Hier echten Submit (fetch / Formspree / eigene API) einbauen */
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Nachricht gesendet ✓';
      btn.disabled = true;
    });
  }

  /* ---- Weitere Beispiele Toggle ---- */
  var moreToggle = document.querySelector('.ref-more-toggle');
  var moreWrap   = document.getElementById('more-examples');

  if (moreToggle && moreWrap) {
    moreToggle.addEventListener('click', function () {
      var open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!open));
      moreWrap.classList.toggle('is-open', !open);
      moreWrap.setAttribute('aria-hidden', String(open));
      this.querySelector('.ref-more-label').textContent =
        open ? 'Weitere Beispiele ansehen' : 'Weniger anzeigen';
    });
  }

  /* ---- Ref-Card Seitenübergang ---- */
  document.querySelectorAll('.ref-card[href]').forEach(function (card) {
    card.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href.charAt(0) === '#' || e.ctrlKey || e.metaKey || e.shiftKey) return;
      e.preventDefault();
      if (prefersReduced) {
        window.location.href = href;
        return;
      }
      document.body.classList.add('is-page-exiting');
      setTimeout(function () { window.location.href = href; }, 340);
    });
  });

})();
