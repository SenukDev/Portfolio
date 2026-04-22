// =============================================
// NAV: scroll shadow
// =============================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// =============================================
// NAV: mobile toggle
// =============================================
const navToggle = document.getElementById('nav-toggle');
const navRight = document.getElementById('nav-right');

navToggle.addEventListener('click', () => {
  const isOpen = navRight.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav when any link is clicked
navRight.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navRight.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && navRight.classList.contains('open')) {
    navRight.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// =============================================
// FADE-IN: Intersection Observer
// =============================================
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// =============================================
// NAV: active link highlighting
// =============================================
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-35% 0px -35% 0px' }
);

sections.forEach(section => activeObserver.observe(section));
