/* ─────────────────────────────────────────────────────
   TWAP — The Whole Athlete Project
   script.js: mobile menu + navbar scroll shadow
   ───────────────────────────────────────────────────── */

// ── Mobile menu toggle ──────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

// Close mobile menu when any link inside it is clicked
mobileMenu.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ── Navbar shadow on scroll ─────────────────────────
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  // Add a subtle shadow when user scrolls below the fold
  header.style.boxShadow = window.scrollY > 10
    ? '0 1px 12px rgba(0,0,0,0.07)'
    : 'none';
}, { passive: true });
