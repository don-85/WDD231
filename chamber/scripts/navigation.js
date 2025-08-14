// Accessible hamburger + wayfinding + no horizontal scroll traps
(function () {
  const btn = document.getElementById('nav-toggle');
  const list = document.getElementById('nav-links');
  if (!btn || !list) return;

  const toggle = () => {
    const open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) list.querySelector('a')?.focus();
  };

  btn.addEventListener('click', toggle);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && list.classList.contains('open')) toggle();
  });

  // Close on link click (improves mobile UX)
  list.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      list.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
    }
  });

  // Wayfinding: ensure current page link gets aria-current
  const here = location.pathname.split('/').pop() || 'index.html';
  list.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href') === here) {
      a.setAttribute('aria-current', 'page');
      a.classList.add('active');
    }
  });
})();
