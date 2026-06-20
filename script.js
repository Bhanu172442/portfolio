const themeToggle = document.getElementById('themeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');
const typingElement = document.getElementById('typing');
const revealItems = document.querySelectorAll('.reveal-element');

const themes = {
  dark: '',
  light: 'light'
};

function setTheme(theme) {
  document.body.className = theme === 'light' ? 'light' : '';
  localStorage.setItem('portfolio-theme', theme);
}

function toggleTheme() {
  const current = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);

function initializeTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light') {
    setTheme('light');
  }
}

mobileMenu.addEventListener('click', () => {
  navbar.classList.toggle('open');
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
});

const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains('open')) {
      navbar.classList.remove('open');
    }
  });
});
