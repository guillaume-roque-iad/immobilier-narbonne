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
      '.propertips-home{padding:96px 8vw;background:#e9fcff;border-top:1px solid rgba(60,74,95,.18);border-bottom:1px solid rgba(60,74,95,.18)}',
      '.propertips-wrap{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(320px,.8fr);gap:64px;align-items:center}',
      '.propertips-home .eyebrow{color:#006390}',
      '.propertips-copy h2{font-size:clamp(32px,4.2vw,52px);font-weight:800;letter-spacing:-.035em;line-height:1.07;margin:0 0 18px}',
      '.propertips-copy h2 em{color:#ea584a;font-style:normal}',
      '.propertips-copy>p{font-size:16px;line-height:1.75;color:#4b5563;max-width:680px;margin-bottom:26px}',
      '.propertips-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;list-style:none;margin:0;padding:0}',
      '.propertips-steps li{background:#fff;border:1px solid rgba(60,74,95,.16);border-radius:16px;padding:18px 16px;font-size:12.5px;line-height:1.5;color:#3c4a5f;font-weight:600}',
      '.propertips-steps strong{display:block;color:#007daf;font-size:20px;margin-bottom:6px}',
      '.propertips-card{background:#3c4a5f;color:#fff;border-radius:26px;padding:36px;box-shadow:0 16px 38px rgba(60,74,95,.18)}',
      '.propertips-brand{display:block;color:#95ebff;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:22px}',
      '.propertips-amount{font-size:clamp(48px,6vw,68px);line-height:1;font-weight:800;letter-spacing:-.05em;margin-bottom:10px}',
      '.propertips-card p{font-size:13px;line-height:1.55;color:rgba(255,255,255,.82);margin:0 0 26px}',
      '.propertips-cta{display:inline-flex;width:100%;min-height:54px;align-items:center;justify-content:center;gap:10px;padding:14px 20px;border-radius:999px;background:#00b4ec;color:#111!important;text-decoration:none;font-family:Montserrat,Helvetica,Arial,sans-serif;font-style:italic;font-weight:800;transition:background .2s,transform .2s}',
      '.propertips-cta:hover{background:#95ebff;transform:translateY(-1px)}',
      '.propertips-invite{display:block;text-align:center;margin-top:12px;font-size:11px;color:rgba(255,255,255,.68)}',
      '.propertips-note{margin-top:22px!important;font-size:11px!important;line-height:1.55!important;color:#647184!important}',
      '.propertips-note a{color:#006390;font-weight:700}',
      '@media(max-width:900px){.propertips-home{padding:72px 8vw}.propertips-wrap{grid-template-columns:1fr;gap:36px}.propertips-card{max-width:620px}.propertips-steps{grid-template-columns:1fr}}',
      '@media(max-width:560px){.propertips-home{padding:58px 6vw}.propertips-card{padding:28px 22px;border-radius:22px}}'
    ].join('');
    document.head.appendChild(style);

    var section = document.createElement('section');
    section.className = 'propertips-home';
    section.id = 'propertips';
    section.setAttribute('aria-labelledby', 'propertips-title');
    section.innerHTML =
      '<div class="propertips-wrap">' +
        '<div class="propertips-copy">' +
          '<div class="eyebrow">Recommandation immobilière</div>' +
          '<h2 id="propertips-title">Un proche veut vendre ou acheter ? <em>Votre mise en relation peut être rémunérée.</em></h2>' +
          '<p>Rejoignez propertips grâce à mon invitation, puis transmettez depuis l’application les coordonnées d’un proche ayant un projet immobilier. Un conseiller iad prend le relais et vous suivez l’avancement de la recommandation.</p>' +
          '<ol class="propertips-steps"><li><strong>01</strong>Inscription gratuite sur propertips</li><li><strong>02</strong>Vous transmettez le projet de votre contact</li><li><strong>03</strong>Si la transaction aboutit, vous pouvez être rémunéré selon les conditions propertips</li></ol>' +
          '<p class="propertips-note">* Propertips indique une rémunération moyenne inférieure constatée de 500 € en 2025 pour la catégorie « mise en vente de biens », calculée sur les honoraires HT perçus par les partenaires et sous réserve des conditions applicables. Les sommes perçues peuvent constituer un revenu imposable. <a href="' + SOURCE_URL + '" target="_blank" rel="noopener noreferrer">Source officielle propertips ↗</a></p>' +
        '</div>' +
        '<aside class="propertips-card" aria-label="Inscription Propertips">' +
          '<span class="propertips-brand">propertips · groupe iad</span>' +
          '<div class="propertips-amount">≈ 500 €*</div>' +
          '<p>Rémunération moyenne inférieure annoncée par propertips pour une recommandation de mise en vente aboutie en 2025.</p>' +
          '<a class="propertips-cta" id="propertips-cta" href="' + INVITATION_URL + '" target="_blank" rel="noopener noreferrer">S’inscrire gratuitement avec mon invitation <span aria-hidden="true">↗</span></a>' +
          '<span class="propertips-invite">Invitation Guillaume Roque</span>' +
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
