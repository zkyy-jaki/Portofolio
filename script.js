/* script.js - Portfolio Interactivity */

// ─── Navbar: glass effect on scroll ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── Mobile hamburger menu ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ─── Active nav link highlight on scroll ──────────────────────────
const sections  = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link');

const highlightNav = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  allLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', highlightNav);

// ─── Scroll Reveal Animation ───────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach(sib => {
          if (sib === entry.target) {
            entry.target.style.transitionDelay = `${delay * 0.1}s`;
          }
          delay++;
        });

        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Smooth scroll for all anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Typing effect on hero role (subtle) ──────────────────────────
const heroRole = document.querySelector('.hero-role');
if (heroRole) {
  const texts = [
    'Mahasiswa Informatika · Developer · Lifelong Learner',
    'Open to Magang · Freelance · Collaboration'
  ];
  let textIndex = 0;
  let charIndex  = 0;
  let isDeleting = false;

  const typeSpeed   = 55;
  const deleteSpeed = 30;
  const pauseDelay  = 2400;

  function type() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      heroRole.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, pauseDelay);
        return;
      }
    } else {
      heroRole.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
  }

  // Start typing after a short delay
  setTimeout(type, 1200);
}

// ─── Active link style (CSS hook) ─────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--text-primary) !important;
    background: var(--accent-bg) !important;
  }
`;
document.head.appendChild(style);
