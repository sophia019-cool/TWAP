/* ─────────────────────────────────────────────────────
   TWAP — script.js
   Premium Editorial Storytelling Mechanics
   ───────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initScrollObserver();
  initActiveSectionObserver();
  initTeamCardToggles();
  initHeaderScrollShadow();
});

// ── 1. Scroll-Based Reveals ──────────────────────────
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        // Unobserve after revealing to prevent repeated triggering
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });
}

// ── 2. Section Emphasis Scaling ──────────────────────
function initActiveSectionObserver() {
  const sections = document.querySelectorAll('section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section--active');
      } else {
        // Only remove active state if not hero or first section (keeps landing clean)
        if (entry.target.id !== 'hero' && entry.target.id !== 'team-hero') {
          entry.target.classList.remove('section--active');
        }
      }
    });
  }, {
    root: null,
    threshold: 0, // Triggers immediately upon crossing the trigger line
    rootMargin: '-45% 0px -45% 0px' // Represents the middle 10% vertical zone of the viewport
  });

  sections.forEach(sec => {
    sectionObserver.observe(sec);
  });
}

// ── 3. Click-to-Expand Team Bios ─────────────────────
function initTeamCardToggles() {
  const teamCards = document.querySelectorAll('.team-card');

  teamCards.forEach(card => {
    // Append expansion prompt label dynamically
    const body = card.querySelector('.card-body');
    if (body && !card.querySelector('.bio-expand-trigger')) {
      const trigger = document.createElement('span');
      trigger.className = 'bio-expand-trigger';
      trigger.textContent = 'Read Bio';
      body.appendChild(trigger);
    }

    card.addEventListener('click', (e) => {
      const isExpanded = card.classList.toggle('expanded');
      const trigger = card.querySelector('.bio-expand-trigger');
      
      if (trigger) {
        trigger.textContent = isExpanded ? 'Close Bio' : 'Read Bio';
      }
    });
  });
}

// ── 4. Minimalist Header Scroll Shadow ───────────────
function initHeaderScrollShadow() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
      header.style.boxShadow = '0 4px 20px rgba(107, 31, 63, 0.04)';
    } else {
      header.classList.remove('scrolled');
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}
