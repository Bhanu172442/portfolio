const themeToggle = document.getElementById('themeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');
const typingElement = document.getElementById('typing');
const revealItems = document.querySelectorAll('.reveal-element');

const body = document.body;

function updateToggleUI(theme) {
  if (!themeToggle) return;
  const isLight = theme === 'light';
  themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  if (isLight) themeToggle.classList.add('active');
  else themeToggle.classList.remove('active');
}

function setTheme(theme) {
  if (theme === 'light') body.classList.add('light');
  else body.classList.remove('light');
  try {
    localStorage.setItem('portfolio-theme', theme);
  } catch (e) {
    // ignore localStorage errors (private mode, etc.)
  }
  updateToggleUI(theme);
}

function toggleTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  const current = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

themeToggle && themeToggle.addEventListener('click', toggleTheme);

function initializeTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem('portfolio-theme');
  } catch (e) {
    saved = null;
  }
  if (saved) {
    setTheme(saved);
    return;
  }
  // Fall back to system preference if no saved choice
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(prefersLight ? 'light' : 'dark');
}

mobileMenu.addEventListener('click', () => {
  navbar.classList.toggle('open');
  // header height may change when nav opens (wraps lines) — update spacing
  setTimeout(adjustForHeader, 120);
});

const typingPhrases = [
  'Building intelligent systems with AI & ML.',
  'Delivering research-quality solutions.',
  'Optimizing models for real-world impact.',
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function updateTyping() {
  const phrase = typingPhrases[typingIndex];
  const currentText = phrase.substring(0, charIndex);
  typingElement.textContent = currentText;

  if (!isDeleting) {
    charIndex += 1;
    if (charIndex > phrase.length) {
      isDeleting = true;
      setTimeout(updateTyping, 1800);
      return;
    }
  } else {
    charIndex -= 1;
    if (charIndex < 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingPhrases.length;
    }
  }

  const delay = isDeleting ? 70 : 120;
  setTimeout(updateTyping, delay);
}

function revealOnScroll() {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      item.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  initializeTheme();
  updateTyping();
  revealOnScroll();
  adjustForHeader();
});

window.addEventListener('resize', () => {
  adjustForHeader();
});

function adjustForHeader() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const h = topbar.offsetHeight || 0;
  document.documentElement.style.setProperty('--header-height', h + 'px');
}

const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains('open')) {
      navbar.classList.remove('open');
    }
  });
});
