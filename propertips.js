(function () {
  'use strict';

  var INVITATION_URL = 'https://www.nosrezo.com/signup.php?code_invitation=KXECW41680';
  var SOURCE_URL = 'https://www.propertips.com/';

  function init() {
    if (document.getElementById('propertips')) return;
    if (location.pathname !== '/' && location.pathname !== '/index.html') return;

    var anchor = document.querySelector('.avis');
    if (!anchor) return;

    var style = document.createElement('style');
    style.id = 'propertips-styles';
    style.textContent = [
      '.pt-section{padding:92px 8vw;background:linear-gradient(180deg,#f8fdff 0%,#eaf8fd 100%);border-top:1px solid rgba(0,180,236,.12);border-bottom:1px solid rgba(0,180,236,.12)}',
      '.pt-grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(320px,.8fr);gap:54px;align-items:center}',
      '.pt-section .eyebrow{color:#006390;margin-bottom:14px}',
      '.pt-copy h2{font-size:clamp(34px,4.4vw,54px);font-weight:800;line-height:1.05;letter-spacing:-.04em;margin:0 0 20px;color:#111;max-width:760px}',
      '.pt-copy h2 em{color:#ea584a;font-style:normal}',
      '.pt-intro{font-size:17px;line-height:1.72;color:#435365;max-width:720px;margin:0 0 30px}',
      '.pt-intro strong{color:#111}',
      '.pt-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0;padding:0;list-style:none}',
      '.pt-step{background:#fff;border:1px solid rgba(60,74,95,.10);border-radius:18px;padding:18px;box-shadow:0 8px 24px rgba(34,52,68,.045);min-height:118px}',
      '.pt-step-num{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:#00b4ec;color:#111;font-size:12px;font-weight:900;margin-bottom:13px}',
      '.pt-step strong{display:block;font-size:13.5px;line-height:1.4;color:#26313f}',
      '.pt-card{background:#314154;color:#fff;border-radius:28px;padding:32px;box-shadow:0 20px 48px rgba(38,54,69,.18)}',
      '.pt-brand{display:block;color:#95ebff;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:24px}',
      '.pt-reward{text-align:center;padding:6px 0 18px}',
      '.pt-reward-number{font-size:clamp(60px,7vw,84px);font-weight:850;line-height:.92;letter-spacing:-.06em;color:#00b4ec}',
      '.pt-reward-label{font-size:17px;font-weight:750;line-height:1.35;color:#fff;margin-top:10px}',
      '.pt-reward-sub{font-size:20px;font-weight:850;color:#95ebff;margin-top:2px}',
      '.pt-reward-text{font-size:12.5px;line-height:1.55;color:rgba(255,255,255,.72);text-align:center;margin:0 0 24px}',
      '.pt-cta{display:flex;align-items:center;justify-content:center;width:100%;min-height:54px;padding:14px 20px;border-radius:999px;background:#00b4ec;color:#111!important;text-decoration:none;font-family:Montserrat,Helvetica,Arial,sans-serif;font-weight:850;font-style:italic;transition:transform .2s,background .2s}',
      '.pt-cta:hover{background:#95ebff;transform:translateY(-1px)}',
      '.pt-invitation{display:block;text-align:center;font-size:10.5px;color:rgba(255,255,255,.55);margin-top:11px}',
      '.pt-note{font-size:10.5px!important;line-height:1.55!important;color:#738090!important;margin:22px 0 0!important;max-width:720px!important}',
      '.pt-note a{color:#006390;font-weight:750}',
      '@media(max-width:900px){.pt-section{padding:70px 8vw}.pt-grid{grid-template-columns:1fr;gap:34px}.pt-card{max-width:620px}.pt-steps{grid-template-columns:1fr}.pt-step{min-height:0;display:flex;align-items:center;gap:14px}.pt-step-num{margin-bottom:0;flex:0 0 32px}}',
      '@media(max-width:560px){.pt-section{padding:56px 6vw}.pt-card{padding:24px 20px;border-radius:22px}.pt-copy h2{font-size:32px}.pt-intro{font-size:15.5px}.pt-reward-number{font-size:68px}}'
    ].join('');
    document.head.appendChild(style);

    var section = document.createElement('section');
    section.className = 'pt-section';
    section.id = 'propertips';
    section.setAttribute('aria-labelledby', 'propertips-title');
    section.innerHTML =
      '<div class="pt-grid">' +
        '<div class="pt-copy">' +
          '<div class="eyebrow">Recommandation immobilière</div>' +
          '<h2 id="propertips-title">Recommandez un proche et <em>soyez rémunéré.</em></h2>' +
          '<p class="pt-intro">Avec propertips, vous pouvez recommander un proche qui souhaite vendre ou acheter. <strong>Si la transaction aboutit, je vous reverse 6 % de ma commission d’agence.</strong></p>' +
          '<ol class="pt-steps">' +
            '<li class="pt-step"><span class="pt-step-num">1</span><strong>Inscription gratuite</strong></li>' +
            '<li class="pt-step"><span class="pt-step-num">2</span><strong>Vous recommandez un proche</strong></li>' +
            '<li class="pt-step"><span class="pt-step-num">3</span><strong>Vous suivez l’avancement</strong></li>' +
          '</ol>' +
          '<p class="pt-note">Rémunération sous réserve de l’aboutissement de la transaction et des conditions applicables de propertips. Les sommes perçues peuvent constituer un revenu imposable. <a href="' + SOURCE_URL + '" target="_blank" rel="noopener noreferrer">Informations officielles ↗</a></p>' +
        '</div>' +
        '<aside class="pt-card" aria-label="Inscription Propertips">' +
          '<span class="pt-brand">propertips · groupe iad</span>' +
          '<div class="pt-reward">' +
            '<div class="pt-reward-number">6 %</div>' +
            '<div class="pt-reward-label">de ma commission d’agence</div>' +
            '<div class="pt-reward-sub">pour vous</div>' +
          '</div>' +
          '<p class="pt-reward-text">Via propertips, si votre recommandation aboutit à une transaction.</p>' +
          '<a class="pt-cta" id="propertips-cta" href="' + INVITATION_URL + '" target="_blank" rel="noopener noreferrer">S’inscrire gratuitement <span aria-hidden="true">↗</span></a>' +
          '<span class="pt-invitation">Invitation Guillaume Roque</span>' +
        '</aside>' +
      '</div>';

    anchor.insertAdjacentElement('afterend', section);

    var cta = document.getElementById('propertips-cta');
    if (cta) {
      cta.addEventListener('click', function () {
        if (typeof window.trackEvent === 'function') {
          window.trackEvent('click_propertips', { emplacement: 'accueil_propertips' });
        }
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
