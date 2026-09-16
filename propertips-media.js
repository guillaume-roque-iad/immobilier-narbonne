(function () {
  'use strict';

  var VIDEO_ID = 'd-kWucxZf6I';
  var labels = {
    fr: { video: 'Découvrir l’application en vidéo', play: 'Lire la vidéo de présentation', close: 'Réduire la vidéo' },
    es: { video: 'Descubrir la aplicación en vídeo', play: 'Ver el vídeo de presentación', close: 'Cerrar el vídeo' },
    en: { video: 'Discover the app in a video', play: 'Play the presentation video', close: 'Close video' },
    it: { video: 'Scopri l’app in video', play: 'Guarda il video di presentazione', close: 'Chiudi il video' },
    de: { video: 'Die App im Video entdecken', play: 'Präsentationsvideo abspielen', close: 'Video schließen' },
    pt: { video: 'Descobrir a aplicação em vídeo', play: 'Ver o vídeo de apresentação', close: 'Fechar vídeo' }
  };

  function text() {
    var lang = (document.documentElement.lang || 'fr').toLowerCase().split('-')[0];
    return labels[lang] || labels.fr;
  }

  function addStyles() {
    if (document.getElementById('propertips-media-styles')) return;
    var style = document.createElement('style');
    style.id = 'propertips-media-styles';
    style.textContent = [
      '.propertips-logo-wrap{background:#fff;border-radius:18px;padding:13px 20px;margin:0 0 18px;display:flex;align-items:center;justify-content:center;min-height:86px}',
      '.propertips-logo-wrap img{display:block;width:min(230px,100%);height:auto}',
      '.propertips-video-area{margin:0 0 24px}',
      '.propertips-video-trigger{width:100%;border:0;border-radius:18px;overflow:hidden;padding:0;cursor:pointer;background:linear-gradient(135deg,#006f98,#004f72);color:#fff;position:relative;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.16);font:inherit}',
      '.propertips-video-trigger:hover .propertips-play{transform:scale(1.07)}',
      '.propertips-video-trigger:focus-visible{outline:3px solid #95ebff;outline-offset:3px}',
      '.propertips-video-poster{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:20px;text-align:center}',
      '.propertips-play{width:62px;height:62px;border-radius:50%;background:#ea584a;display:grid;place-items:center;transition:transform .2s;box-shadow:0 10px 26px rgba(0,0,0,.22)}',
      '.propertips-play::before{content:"";display:block;margin-left:4px;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:17px solid #fff}',
      '.propertips-video-label{font-size:13px;font-weight:800;line-height:1.35;color:#fff}',
      '.propertips-inline-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%}',
      '.propertips-inline-frame{display:block;width:min(300px,100%);aspect-ratio:9/16;border:0;border-radius:18px;background:#000;box-shadow:0 16px 38px rgba(0,0,0,.28)}',
      '.propertips-inline-close{border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.1);color:#fff;border-radius:999px;padding:10px 16px;font:inherit;font-size:12px;font-weight:700;cursor:pointer}',
      '.propertips-inline-close:hover{background:rgba(255,255,255,.18)}',
      '.propertips-inline-close:focus-visible{outline:3px solid #95ebff;outline-offset:3px}',
      '@media(max-width:560px){.propertips-logo-wrap{min-height:76px;padding:11px 16px}.propertips-logo-wrap img{width:min(205px,100%)}.propertips-video-trigger{border-radius:15px}.propertips-inline-frame{width:min(285px,100%);border-radius:15px}}'
    ].join('');
    document.head.appendChild(style);
  }

  function trackVideo() {
    if (typeof window.tribuEvt === 'function') {
      window.tribuEvt('clic_video_propertips', { page: location.pathname });
    } else if (typeof window.trackEvent === 'function') {
      window.trackEvent('click_propertips_video', { emplacement: 'bloc_propertips' });
    }
  }

  function mountInlineVideo(area, trigger) {
    if (!area || area.querySelector('.propertips-inline-frame')) return;
    var t = text();
    trackVideo();

    var wrap = document.createElement('div');
    wrap.className = 'propertips-inline-wrap';
    wrap.innerHTML =
      '<iframe class="propertips-inline-frame" src="https://www.youtube-nocookie.com/embed/' + VIDEO_ID + '?autoplay=1&playsinline=1&rel=0&modestbranding=1" title="' + t.video + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
      '<button type="button" class="propertips-inline-close">' + t.close + '</button>';

    trigger.hidden = true;
    area.appendChild(wrap);

    var close = wrap.querySelector('.propertips-inline-close');
    close.addEventListener('click', function () {
      wrap.remove();
      trigger.hidden = false;
      trigger.focus();
    });
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

    var t = text();
    var area = document.createElement('div');
    area.className = 'propertips-video-area';

    var video = document.createElement('button');
    video.type = 'button';
    video.className = 'propertips-video-trigger';
    video.setAttribute('aria-label', t.play);
    video.innerHTML =
      '<span class="propertips-video-poster">' +
        '<span class="propertips-play" aria-hidden="true"></span>' +
        '<span class="propertips-video-label">' + t.video + '</span>' +
      '</span>';

    area.appendChild(video);
    logoWrap.insertAdjacentElement('afterend', area);
    video.addEventListener('click', function () { mountInlineVideo(area, video); });

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
