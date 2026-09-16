(function () {
  'use strict';

  var VIDEO_URL = 'https://www.youtube.com/shorts/d-kWucxZf6I';

  function addStyles() {
    if (document.getElementById('propertips-media-styles')) return;
    var style = document.createElement('style');
    style.id = 'propertips-media-styles';
    style.textContent = [
      '.propertips-logo-wrap{background:#fff;border-radius:18px;padding:13px 20px;margin:0 0 18px;display:flex;align-items:center;justify-content:center;min-height:86px}',
      '.propertips-logo-wrap img{display:block;width:min(230px,100%);height:auto}',
      '.propertips-video-link{width:100%;border-radius:18px;overflow:hidden;margin:0 0 24px;cursor:pointer;background:linear-gradient(135deg,#006f98,#004f72);color:#fff!important;position:relative;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.16);text-decoration:none}',
      '.propertips-video-link:hover .propertips-play{transform:scale(1.07)}',
      '.propertips-video-link:focus-visible{outline:3px solid #95ebff;outline-offset:3px}',
      '.propertips-video-poster{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:20px;text-align:center}',
      '.propertips-play{width:62px;height:62px;border-radius:50%;background:#ea584a;display:grid;place-items:center;transition:transform .2s;box-shadow:0 10px 26px rgba(0,0,0,.22)}',
      '.propertips-play::before{content:"";display:block;margin-left:4px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:17px solid #fff}',
      '.propertips-video-label{font-size:13px;font-weight:800;line-height:1.35;color:#fff}',
      '.propertips-video-hint{font-size:11px;line-height:1.4;color:rgba(255,255,255,.78)}',
      '@media(max-width:560px){.propertips-logo-wrap{min-height:76px;padding:11px 16px}.propertips-logo-wrap img{width:min(205px,100%)}.propertips-video-link{border-radius:15px}}'
    ].join('');
    document.head.appendChild(style);
  }

  function trackVideo() {
    if (typeof window.trackEvent === 'function') {
      window.trackEvent('click_propertips_video', { emplacement: 'bloc_propertips', ouverture: 'nouvel_onglet' });
    }
  }

  function enhance() {
    var section = document.getElementById('propertips');
    if (!section || section.getAttribute('data-media-enhanced') === '1') return !!section;

    var card = section.querySelector('.pt-card, .propertips-card');
    if (!card) return false;
    addStyles();

    var brand = card.querySelector('.pt-brand, .propertips-brand');
    var logoWrap = document.createElement('div');
    logoWrap.className = 'propertips-logo-wrap';
    logoWrap.innerHTML = '<img src="/propertips-logo.svg?v=20260916b" alt="propertips by iad" width="333" height="114" loading="lazy" decoding="async">';
    if (brand) brand.replaceWith(logoWrap); else card.prepend(logoWrap);

    var link = document.createElement('a');
    link.className = 'propertips-video-link';
    link.href = VIDEO_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Ouvrir la vidéo de présentation Propertips dans un nouvel onglet');
    link.innerHTML =
      '<span class="propertips-video-poster">' +
        '<span class="propertips-play" aria-hidden="true"></span>' +
        '<span class="propertips-video-label">Découvrir l’application en vidéo</span>' +
        '<span class="propertips-video-hint">La vidéo s’ouvre dans un nouvel onglet ↗</span>' +
      '</span>';

    logoWrap.insertAdjacentElement('afterend', link);
    link.addEventListener('click', trackVideo);

    section.setAttribute('data-media-enhanced', '1');
    return true;
  }

  function init() {
    if (enhance()) return;
    var observer = new MutationObserver(function () {
      if (enhance()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(function () { observer.disconnect(); }, 10000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
