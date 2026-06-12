(function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Sticky Header ─────────────────────────────────────── */
    function initStickyHeader() {
        const header = document.getElementById('site-header');
        if (!header) return;
        window.addEventListener('scroll', function () {
            header.classList.toggle('site-header--scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    /* ── Mobile Burger ─────────────────────────────────────── */
    function initMobileMenu() {
        const burger = document.getElementById('nav-burger');
        const links  = document.getElementById('nav-links');
        if (!burger || !links) return;

        burger.addEventListener('click', function () {
            const open = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', String(!open));
            burger.classList.toggle('is-open', !open);
            links.classList.toggle('is-open', !open);
            burger.setAttribute('aria-label', open ? 'Menü öffnen' : 'Menü schließen');
        });

        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                burger.setAttribute('aria-expanded', 'false');
                burger.classList.remove('is-open');
                links.classList.remove('is-open');
                burger.setAttribute('aria-label', 'Menü öffnen');
            });
        });
    }

    /* ── Scroll Reveals ────────────────────────────────────── */
    function initReveal() {
        if (reduced) {
            document.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                const el    = entry.target;
                const delay = (parseFloat(el.style.getPropertyValue('--i')) || 0) * 80;
                setTimeout(function () {
                    el.classList.add('revealed');
                }, delay);
                observer.unobserve(el);
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ── Pipe Flow Animation ───────────────────────────────── */
    function initPipe() {
        const flowPath = document.getElementById('pipe-flow-path');
        if (!flowPath || reduced) return;

        // getTotalLength gibt die exakte Pfadlänge zurück
        var len = flowPath.getTotalLength ? flowPath.getTotalLength() : 2200;
        var dash = 260; // Länge des Highlights

        flowPath.style.strokeDasharray  = dash + ' ' + len;
        flowPath.style.strokeDashoffset = '0';
        flowPath.style.setProperty('--pipe-travel', '-' + (len + dash) + 'px');

        flowPath.animate(
            [{ strokeDashoffset: 0 }, { strokeDashoffset: -(len + dash) }],
            { duration: 9000, iterations: Infinity, easing: 'linear' }
        );
    }

    /* ── Count-up ──────────────────────────────────────────── */
    function animateCount(numEl, target, duration) {
        var start = performance.now();
        var useLocale = numEl.closest('[data-locale]') !== null;

        function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            var ease     = 1 - Math.pow(1 - progress, 3);
            var value    = Math.round(ease * target);
            numEl.textContent = useLocale ? value.toLocaleString('de-DE') : String(value);
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    function initCountUp() {
        if (reduced) {
            document.querySelectorAll('.stat[data-target]').forEach(function (stat) {
                var numEl  = stat.querySelector('.stat__num');
                var target = parseInt(stat.dataset.target, 10);
                var useLocale = stat.dataset.locale !== undefined;
                if (numEl) numEl.textContent = useLocale ? target.toLocaleString('de-DE') : String(target);
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var stat   = entry.target;
                var numEl  = stat.querySelector('.stat__num');
                var target = parseInt(stat.dataset.target, 10);
                if (numEl && !stat.dataset.counted) {
                    stat.dataset.counted = 'true';
                    animateCount(numEl, target, 1800);
                }
                observer.unobserve(stat);
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat[data-target]').forEach(function (stat) {
            observer.observe(stat);
        });
    }

    /* ── Before/After Slider ───────────────────────────────── */
    function initSlider() {
        var container = document.getElementById('before-after');
        var handle    = document.getElementById('slider-handle');
        if (!container || !handle) return;

        var afterImg = container.querySelector('.before-after__img--after');
        var pos = 50;
        var dragging = false;

        function setPos(clientX) {
            var rect = container.getBoundingClientRect();
            pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
            afterImg.style.clipPath = 'inset(0 ' + (100 - pos).toFixed(2) + '% 0 0)';
            handle.style.left      = pos.toFixed(2) + '%';
            handle.setAttribute('aria-valuenow', Math.round(pos));
        }

        // Mouse
        handle.addEventListener('mousedown', function (e) {
            dragging = true;
            e.preventDefault();
        });
        document.addEventListener('mousemove', function (e) {
            if (dragging) setPos(e.clientX);
        });
        document.addEventListener('mouseup', function () { dragging = false; });

        // Touch
        handle.addEventListener('touchstart', function (e) {
            dragging = true;
            e.preventDefault();
        }, { passive: false });
        document.addEventListener('touchmove', function (e) {
            if (dragging) setPos(e.touches[0].clientX);
        }, { passive: true });
        document.addEventListener('touchend', function () { dragging = false; });

        // Keyboard (Pfeiltasten)
        handle.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft')  { pos = Math.max(0,   pos - 5); }
            else if (e.key === 'ArrowRight') { pos = Math.min(100, pos + 5); }
            else return;
            afterImg.style.clipPath = 'inset(0 ' + (100 - pos).toFixed(2) + '% 0 0)';
            handle.style.left       = pos.toFixed(2) + '%';
            handle.setAttribute('aria-valuenow', Math.round(pos));
        });

        // Initialisieren
        setPos(container.getBoundingClientRect().left + container.getBoundingClientRect().width * 0.5);
    }

    /* ── FAQ Accordion ─────────────────────────────────────── */
    function initAccordion() {
        document.querySelectorAll('.accordion__btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var panel   = btn.nextElementSibling;
                var isOpen  = btn.getAttribute('aria-expanded') === 'true';

                // Alle anderen schließen
                btn.closest('.accordion').querySelectorAll('.accordion__btn').forEach(function (b) {
                    b.setAttribute('aria-expanded', 'false');
                    var p = b.nextElementSibling;
                    if (p) p.hidden = true;
                });

                if (!isOpen) {
                    btn.setAttribute('aria-expanded', 'true');
                    if (panel) panel.hidden = false;
                }
            });
        });
    }

    /* ── Form ──────────────────────────────────────────────── */
    function initForm() {
        var form    = document.getElementById('contact-form');
        var success = document.getElementById('form-success');
        if (!form || !success) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.querySelector('.btn[type="submit"]').disabled = true;
            success.hidden = false;
        });
    }

    /* ── Boot ──────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initStickyHeader();
        initMobileMenu();
        initReveal();
        initPipe();
        initCountUp();
        initSlider();
        initAccordion();
        initForm();
    });

}());
