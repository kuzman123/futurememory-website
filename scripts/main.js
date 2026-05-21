(function () {
  'use strict';

  /* ── 1. Navbar scroll state ─────────────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  let rafId = null;
  let isScrolled = false;

  window.addEventListener('scroll', function () {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      var scrolled = window.scrollY > 40;
      if (scrolled !== isScrolled) {
        isScrolled = scrolled;
        nav.classList.toggle('is-scrolled', scrolled);
      }
      rafId = null;
    });
  }, { passive: true });

  /* ── 2. Mobile menu ─────────────────────────────────────────────────────────── */
  var hamburger = document.querySelector('.nav__hamburger');
  var hamburgerOpen = document.querySelector('.nav__hamburger-icon-open');
  var hamburgerClose = document.querySelector('.nav__hamburger-icon-close');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? 'Zatvori meni' : 'Otvori meni');
      if (hamburgerOpen) hamburgerOpen.style.display = isOpen ? 'none' : 'block';
      if (hamburgerClose) hamburgerClose.style.display = isOpen ? 'block' : 'none';
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav__mobile-links a, .nav__mobile-cta').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Otvori meni');
        if (hamburgerOpen) hamburgerOpen.style.display = 'block';
        if (hamburgerClose) hamburgerClose.style.display = 'none';
      });
    });
  }

  /* ── 3. Smooth scroll for anchor links ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── 4. Modal system ────────────────────────────────────────────────────────── */
  var backdrop = document.getElementById('modal-root');
  var modalEl = document.getElementById('modal-container');
  var lastFocusedCard = null;

  function openModal(cardId) {
    var template = document.getElementById('modal-' + cardId);
    if (!template) return;

    // Clone template content into modal container
    modalEl.innerHTML = '';
    var content = template.content.cloneNode(true);
    modalEl.appendChild(content);

    // Set modal ARIA attributes
    modalEl.setAttribute('aria-labelledby', 'modal-title-' + cardId);
    backdrop.setAttribute('aria-hidden', 'false');

    // Show backdrop
    backdrop.classList.add('is-open');
    document.body.classList.add('is-modal-open');

    // Wire close button
    var closeBtn = modalEl.querySelector('.modal__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Wire CTA that closes modal before navigating
    modalEl.querySelectorAll('a[href="#kontakt"]').forEach(function (a) {
      a.addEventListener('click', closeModal);
    });

    // Focus first focusable element
    requestAnimationFrame(function () {
      var focusable = getFocusable(modalEl);
      if (focusable.length > 0) focusable[0].focus();
    });

    // Set up focus trap
    backdrop.addEventListener('keydown', trapFocusHandler);
  }

  function closeModal() {
    backdrop.classList.remove('is-open');
    document.body.classList.remove('is-modal-open');
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.removeEventListener('keydown', trapFocusHandler);
    // Restore focus to card that opened modal
    if (lastFocusedCard) {
      lastFocusedCard.focus();
      lastFocusedCard = null;
    }
    // Clear modal after transition
    setTimeout(function () { modalEl.innerHTML = ''; }, 300);
  }

  function getFocusable(container) {
    return Array.from(container.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )).filter(function (el) {
      return !el.closest('[hidden]') && el.offsetParent !== null;
    });
  }

  function trapFocusHandler(e) {
    if (e.key !== 'Tab') return;
    var focusable = getFocusable(modalEl);
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Backdrop click closes (not modal body)
  if (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });
  }

  // ESC closes
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && backdrop && backdrop.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Card click and keyboard activation
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
      lastFocusedCard = card;
      openModal(card.dataset.cardId);
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        lastFocusedCard = card;
        openModal(card.dataset.cardId);
      }
    });
  });

  /* ── 5. Scroll-triggered reveal ─────────────────────────────────────────────── */
  var revealTargets = document.querySelectorAll('.section__header, .explainer__body > p, .explainer__caveat, .card, .process__step, .about__body p, .about__panel, .contact__lede');
  revealTargets.forEach(function (el) {
    el.classList.add('reveal-target');
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: reveal immediately
    revealTargets.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  /* ── 6. Hero entrance animation ─────────────────────────────────────────────── */
  var heroElements = [
    '.hero__eyebrow',
    '.hero__title',
    '.hero__lede',
    '.hero__actions',
    '.hero__meta'
  ];

  heroElements.forEach(function (sel) {
    var el = document.querySelector(sel);
    if (el) el.classList.add('hero-animate');
  });

  document.addEventListener('DOMContentLoaded', function () {
    heroElements.forEach(function (sel, i) {
      var el = document.querySelector(sel);
      if (!el) return;
      setTimeout(function () {
        el.classList.add('hero-revealed');
      }, i * 80);
    });
  });

  // Immediate trigger if DOMContentLoaded already fired
  if (document.readyState !== 'loading') {
    heroElements.forEach(function (sel, i) {
      var el = document.querySelector(sel);
      if (!el) return;
      setTimeout(function () {
        el.classList.add('hero-revealed');
      }, i * 80);
    });
  }

})();
