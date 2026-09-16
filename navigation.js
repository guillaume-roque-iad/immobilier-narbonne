(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const toggle = header.querySelector('.nb-menu-toggle');
  const menu = header.querySelector('.nb-links');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
  };

  toggle.addEventListener('click', () => {
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.setAttribute('aria-label', willOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180) closeMenu();
  });
})();

(() => {
  const script = document.createElement('script');
  script.src = '/propertips.js?v=20260916';
  script.defer = true;
  document.head.appendChild(script);

  const media = document.createElement('script');
  media.src = '/propertips-media.js?v=20260916f';
  media.defer = true;
  document.head.appendChild(media);
})();
