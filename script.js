const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealElements = document.querySelectorAll('.reveal');
const yearElement = document.getElementById('year');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyMessage = document.getElementById('copyMessage');
const email = 'vibol.khan.mail@gmail.com';

yearElement.textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add('visible');
    }
  });
};

const setActiveNavLink = () => {
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach((link) => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
};

copyEmailBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyMessage.textContent = 'Email copied to clipboard.';
  } catch (error) {
    copyMessage.textContent = 'Copy failed. Please copy the email manually.';
  }

  setTimeout(() => {
    copyMessage.textContent = '';
  }, 2500);
});

window.addEventListener('scroll', () => {
  revealOnScroll();
  setActiveNavLink();
});

window.addEventListener('load', () => {
  revealOnScroll();
  setActiveNavLink();
});
