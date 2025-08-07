document.addEventListener('DOMContentLoaded', () => {
  console.log(' index.js loaded and DOM is ready');

  // NAV MENU TOGGLE (for small screens)
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      console.log(' Menu toggled');
    });
  } else {
    console.warn(' Navigation elements not found.');
  }

  // HERO SECTION ANIMATION
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = 'translateY(20px)';
    setTimeout(() => {
      hero.style.transition = 'all 0.6s ease-out';
      hero.style.opacity = 1;
      hero.style.transform = 'translateY(0)';
      console.log(' Hero animated');
    }, 300);
  }

  // HEADER AUTO HIDE ON SCROLL
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      header.style.top = '-80px';
    } else {
      header.style.top = '0';
    }
    lastScrollY = window.scrollY;
  });

  // FOOTER DATE INSERTION
  const footer = document.querySelector('footer');
  const year = new Date().getFullYear();
  if (footer) {
    const dateInfo = document.createElement('p');
    dateInfo.innerHTML = `&copy; ${year} SkillWiseHub | Created by Muntu Titus`;
    footer.insertBefore(dateInfo, footer.firstChild);
    console.log(' Footer year inserted');
  }
});

