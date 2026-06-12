'use strict';

/* ===== NAV: Scroll-Kompakter + Burger ===== */
(function () {
  const nav = document.getElementById('site-nav');
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('nav-mobile');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    mobileNav.classList.toggle('open', open);
    mobileNav.setAttribute('aria-hidden', !open);
  });

  // Mobile-Nav Links schließen das Menü
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
})();

/* ===== SCROLL-REVEALS (IntersectionObserver) ===== */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      // Stagger: Geschwister-Elemente mit Index
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((s, idx) => { if (s === entry.target) delay = idx * 90; });
      setTimeout(() => entry.target.classList.add('visible'), Math.min(delay, 450));
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach(el => obs.observe(el));
})();

/* ===== MASERUNGS-ANIMATION (stroke-dasharray/dashoffset) ===== */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function animateGrainLines(selector, lineSelector, duration, stagger) {
    const svg = document.querySelector(selector);
    if (!svg) return;
    const lines = svg.querySelectorAll(lineSelector);
    lines.forEach((line, i) => {
      const len = line.getTotalLength ? line.getTotalLength() : 300;
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      line.style.transition = 'none';
      setTimeout(() => {
        line.style.transition = `stroke-dashoffset ${duration}ms ease`;
        line.style.strokeDashoffset = '0';
      }, i * stagger);
    });
  }

  function animateRings(selector) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const svg = document.querySelector(selector);
    if (!svg) return;
    const rings = svg.querySelectorAll('.grain-ring');
    rings.forEach((ring, i) => {
      const len = ring.getTotalLength ? ring.getTotalLength() : 500;
      ring.style.strokeDasharray = len;
      ring.style.strokeDashoffset = len;
      setTimeout(() => {
        ring.style.transition = `stroke-dashoffset ${1800 + i * 300}ms ease`;
        ring.style.strokeDashoffset = '0';
      }, 600 + i * 250);
    });
  }

  // Hero-Animation beim Laden
  window.addEventListener('load', () => {
    animateGrainLines('#grain-hero', '.grain-line', 1400, 100);
    animateRings('#grain-hero');

    // Akzent-Linie
    const acc = document.querySelector('#grain-hero .grain-accent');
    if (acc) {
      const len = acc.getTotalLength ? acc.getTotalLength() : 340;
      acc.style.strokeDasharray = len;
      acc.style.strokeDashoffset = len;
      setTimeout(() => {
        acc.style.transition = 'stroke-dashoffset 1000ms ease';
        acc.style.strokeDashoffset = '0';
      }, 1400);
    }
  });

  // Werkstatt-Animation beim Sichtbarwerden
  const werkstattSvg = document.querySelector('#grain-werkstatt');
  if (werkstattSvg) {
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      animateGrainLines('#grain-werkstatt', '.grain-line-w', 1200, 80);
      obs.disconnect();
    }, { threshold: 0.2 });
    obs.observe(werkstattSvg);
  }
})();

/* ===== HOLZARTEN-WÄHLER ===== */
(function () {
  const holzData = {
    eiche: {
      name: 'Eiche',
      desc: 'Robust und zeitlos, mit ruhiger Maserung. Eiche ist die beliebteste Wahl für Möbel, die Generationen überdauern sollen – warm, charaktervoll und pflegeleicht.',
      bg: '#C8A97A',
      grainColor: 'rgba(120,70,20,0.18)',
    },
    nussbaum: {
      name: 'Nussbaum',
      desc: 'Dunkel, warm und edel – der Klassiker für besondere Stücke. Nussbaum bringt Tiefe und Würde in jeden Raum.',
      bg: '#5C3A22',
      grainColor: 'rgba(255,200,120,0.12)',
    },
    esche: {
      name: 'Esche',
      desc: 'Hell und elastisch, mit lebendiger Struktur. Esche wirkt leicht und frisch – ideal für moderne, helle Einrichtungen.',
      bg: '#D8C9A8',
      grainColor: 'rgba(100,60,10,0.15)',
    },
    geraeuchert: {
      name: 'Eiche geräuchert',
      desc: 'Tief und charaktervoll, für markante Akzente. Das Räucherverfahren gibt der Eiche eine dramatische, dunkle Tiefe mit warmem Unterton.',
      bg: '#3E2B1A',
      grainColor: 'rgba(210,160,80,0.14)',
    },
  };

  const tabs = document.querySelectorAll('.holz-tab');
  const bg = document.getElementById('holz-bg');
  const grain = document.getElementById('holz-grain');
  const nameEl = document.getElementById('holz-name');
  const descEl = document.getElementById('holz-desc');
  const info = document.getElementById('holz-info');

  if (!tabs.length) return;

  function switchHolz(key) {
    const d = holzData[key];
    if (!d) return;

    info.style.opacity = '0';
    info.style.transform = 'translateY(6px)';

    setTimeout(() => {
      bg.setAttribute('fill', d.bg);
      grain.querySelectorAll('path').forEach(p => p.setAttribute('stroke', d.grainColor));
      nameEl.textContent = d.name;
      descEl.textContent = d.desc;
      info.style.opacity = '1';
      info.style.transform = 'none';
    }, 220);
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); t.setAttribute('tabindex', '-1'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      switchHolz(tab.dataset.holz);
    });

    // Tastatur: Arrow-Keys für Tab-Navigation
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        next = tabs[idx + 1] || tabs[0];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        next = tabs[idx - 1] || tabs[tabs.length - 1];
      } else if (e.key === 'Home') {
        next = tabs[0];
      } else if (e.key === 'End') {
        next = tabs[tabs.length - 1];
      }
      if (next) { next.focus(); next.click(); e.preventDefault(); }
    });
  });
})();

/* ===== VORHER/NACHHER-SLIDER ===== */
(function () {
  const wrap = document.getElementById('vn-slider');
  const after = document.getElementById('vn-after');
  const handle = document.getElementById('vn-handle');
  if (!wrap || !after || !handle) return;

  let dragging = false;
  let pos = 50; // percent

  function setPos(pct) {
    pos = Math.min(95, Math.max(5, pct));
    after.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    handle.style.left = pos + '%';
    handle.setAttribute('aria-valuenow', Math.round(pos));
  }

  function pctFromEvent(e) {
    const rect = wrap.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    return (x / rect.width) * 100;
  }

  handle.addEventListener('mousedown', () => { dragging = true; });
  window.addEventListener('mousemove', (e) => { if (dragging) { setPos(pctFromEvent(e)); e.preventDefault(); } });
  window.addEventListener('mouseup', () => { dragging = false; });

  handle.addEventListener('touchstart', (e) => { dragging = true; e.preventDefault(); }, { passive: false });
  window.addEventListener('touchmove', (e) => { if (dragging) { setPos(pctFromEvent(e)); e.preventDefault(); } }, { passive: false });
  window.addEventListener('touchend', () => { dragging = false; });

  // Click auf den Wrapper
  wrap.addEventListener('click', (e) => { if (!dragging) setPos(pctFromEvent(e)); });

  // Tastatur-Steuerung
  handle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { setPos(pos - 5); e.preventDefault(); }
    if (e.key === 'ArrowRight') { setPos(pos + 5); e.preventDefault(); }
    if (e.key === 'Home')       { setPos(5); e.preventDefault(); }
    if (e.key === 'End')        { setPos(95); e.preventDefault(); }
  });

  setPos(50);
})();

/* ===== FAQ-ACCORDION ===== */
(function () {
  const btns = document.querySelectorAll('.accordion-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Alle schließen
      btns.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const body = document.getElementById(b.getAttribute('aria-controls'));
        if (body) body.style.maxHeight = '0';
      });
      // Diesen öffnen/schließen
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        const body = document.getElementById(btn.getAttribute('aria-controls'));
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
})();

/* ===== KONTAKTFORMULAR (Demo) ===== */
function handleFormSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.textContent = '✓ Vielen Dank – Ihre Nachricht wurde simuliert. In der Live-Version würde sie jetzt an info@tischlerei-esche.de weitergeleitet.';
  msg.style.display = 'block';
  e.target.reset();
  msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
