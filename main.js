// ── Elements ─────────────────────────────────────────────
const nav        = document.getElementById('site-nav');
const burger     = document.getElementById('nav-burger');
const links      = document.getElementById('nav-links');
const scrollHint = document.querySelector('.scroll-hint');
const heroBg     = document.querySelector('.hero__bg');

const lang = new URLSearchParams(window.location.search).get('lang') || 'es';
document.querySelector(`.lang-switcher a[href*="lang=${lang}"]`)
  ?.classList.add('lang-active');

// translate
document.querySelectorAll('[data-es]').forEach(el => {
  if (el.children.length === 0) {
    el.textContent = el.dataset[lang] ?? el.dataset.es;
  }
});

// form
const formLink = document.getElementById('form-id');
if (formLink) {
  formLink.href = lang === 'en' ? 'https://forms.gle/6D8Ed7yhX8CST3w77' : 'https://forms.gle/FxMDPfv6jdc24VwZA';
}

// https://forms.gle/uAHfKH5pxSCR4PcV7

// ── Burger menu ──────────────────────────────────────────
burger.addEventListener('click', () => {
  const isOpening = !links.classList.contains('nav-links--open');
  links.classList.toggle('nav-links--open');
  burger.classList.toggle('nav-burger--open');
  if (isOpening) window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('nav-links--open');
    burger.classList.remove('nav-burger--open');
    // Reset parallax immediately before scroll animation starts
    if (heroBg) heroBg.style.transform = 'translateY(0px) scale(1)';
  });
});

// ── Scroll: nav + scrollhint + parallax ──────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  nav.classList.toggle('nav--scrolled', scrollY > 60);
  if (scrollHint) scrollHint.classList.toggle('scroll-hint--hidden', scrollY > 60);
  if (heroBg) heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
}, { passive: true });

// ── Countdown ────────────────────────────────────────────
const weddingDate = new Date('2026-09-19T12:30:00');

function updateCountdown() {
  const diff = weddingDate - new Date();
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p class="countdown__done">¡Hoy es el gran día! 🥂</p>';
    return;
  }
  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000)  / 60000);
  const seconds = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent    = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── Scroll reveal ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.section-title, .section-rule, .section-place, .section-time, .section-body, .card, .bus-row, .gift-option, .contact-item, .map-wrapper'
);
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});