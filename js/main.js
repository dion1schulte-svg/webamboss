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

  /* ---- Kontaktformular (Formspree AJAX) ---- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var consent = this.querySelector('[name="Datenschutz"]');
      if (!consent || !consent.checked) {
        alert('Bitte bestätigen Sie die Datenschutzerklärung.');
        return;
      }

      var btn       = this.querySelector('[type="submit"]');
      var origLabel = btn.textContent;
      btn.disabled    = true;
      btn.textContent = 'Wird gesendet…';

      var thisForm = this;
      fetch(this.action, {
        method:  'POST',
        body:    new FormData(this),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        if (res.ok) {
          thisForm.style.display = 'none';
          var success = document.getElementById('form-success');
          if (success) {
            success.removeAttribute('hidden');
            success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          throw new Error('server error');
        }
      })
      .catch(function () {
        var error = document.getElementById('form-error');
        if (error) { error.removeAttribute('hidden'); }
        btn.disabled    = false;
        btn.textContent = origLabel;
      });
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

  /* ---- bfcache-Fix: Animation-Zustand beim Zurück-Navigieren bereinigen ---- */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      document.body.classList.remove('is-page-exiting');
    }
  });

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
