import re, os

BASE = os.path.dirname(__file__)

def read(name):
    with open(os.path.join(BASE, name), encoding='utf-8') as f:
        return f.read()

STYLE = read('tpl_style.html')  # includes <style>...</style>

IAD_LOGO_BLUE = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 32" role="img" aria-label="iad" class="nb-logo" fill="#00b4ec"><path d="M17.309,21.608c-0,-1.549 1.263,-2.805 2.821,-2.805l5.17,-0c1.558,-0 2.822,1.256 2.822,2.805c-0,1.55 -1.264,2.806 -2.822,2.806l-5.17,0c-1.558,0 -2.821,-1.256 -2.821,-2.806Zm-13.535,-21.608c2.084,0 3.773,1.68 3.773,3.752c0,2.072 -1.689,3.752 -3.773,3.752c-2.084,-0 -3.774,-1.68 -3.774,-3.752c-0,-2.072 1.69,-3.752 3.774,-3.752Zm46.201,0.01c8.949,0.056 16.185,7.286 16.185,16.197c0,6.782 -4.191,12.584 -10.128,14.998c-3.515,1.428 -8.049,1.199 -9.337,1.199l0,-0.188c0,-2.903 2.395,-5.021 5.274,-5.511c0.7,-0.119 1.379,-0.292 1.991,-0.54c3.95,-1.606 6.725,-5.463 6.725,-9.958c0,-5.916 -4.804,-10.716 -10.745,-10.753l-4.84,-0c-0.419,-0 -0.759,0.338 -0.759,0.755l-0,20.312c-0,3.221 -2.626,5.832 -5.866,5.832c-2.334,0 -4.446,-1.376 -5.378,-3.504l-9.93,-22.683c-0.165,-0.375 -0.699,-0.376 -0.865,-0.001l-10.053,22.711c-0.936,2.113 -3.038,3.477 -5.361,3.477c-3.238,0 -5.862,-2.612 -5.857,-5.831l0.024,-16.159c3.012,0 5.457,2.422 5.47,5.416l0.041,9.929c0.002,0.507 0.701,0.65 0.905,0.184l9.738,-22.268c0.941,-2.151 3.076,-3.542 5.435,-3.542c2.359,-0 4.463,1.37 5.415,3.497l9.959,22.255c0.207,0.463 0.903,0.316 0.903,-0.191l0,-19.814c0,-3.214 2.621,-5.819 5.853,-5.819l5.096,-0l0.105,-0Z"></path><path d="M118.474,23.252c0.515,0.488 0.918,1.058 1.208,1.709c0.29,0.651 0.436,1.381 0.436,2.156c-0,0.776 -0.146,1.495 -0.436,2.156c-0.291,0.662 -0.693,1.234 -1.208,1.716c-0.516,0.483 -1.121,0.858 -1.816,1.127c-0.696,0.268 -1.443,0.403 -2.274,0.403c-0.831,-0 -1.598,-0.134 -2.304,-0.403c-0.705,-0.269 -1.315,-0.647 -1.83,-1.134c-0.516,-0.488 -0.916,-1.06 -1.201,-1.717c-0.285,-0.656 -0.428,-1.372 -0.428,-2.148c-0,-0.776 0.143,-1.492 0.428,-2.149c0.285,-0.657 0.688,-1.229 1.208,-1.716c0.52,-0.488 1.131,-0.866 1.831,-1.134c0.701,-0.268 1.451,-0.403 2.281,-0.403c0.831,-0 1.593,0.134 2.289,0.403c0.695,0.268 1.301,0.646 1.816,1.134Zm-1.066,5.222c0.166,-0.408 0.248,-0.86 0.248,-1.358c-0,-0.497 -0.082,-0.95 -0.248,-1.358c-0.165,-0.408 -0.395,-0.761 -0.69,-1.059c-0.296,-0.299 -0.644,-0.528 -1.043,-0.687c-0.401,-0.159 -0.836,-0.238 -1.306,-0.238c-0.47,-0 -0.903,0.079 -1.298,0.238c-0.396,0.16 -0.743,0.388 -1.043,0.687c-0.3,0.298 -0.533,0.651 -0.698,1.059c-0.165,0.408 -0.247,0.871 -0.247,1.358c-0,0.487 0.082,0.938 0.247,1.35c0.165,0.413 0.396,0.769 0.69,1.067c0.296,0.299 0.644,0.528 1.043,0.687c0.401,0.159 0.836,0.238 1.306,0.238c0.471,0 0.903,-0.079 1.299,-0.238c0.395,-0.159 0.743,-0.389 1.043,-0.687c0.3,-0.298 0.533,-0.651 0.697,-1.059Zm-28.625,-6.579l1.996,-0l0.031,10.445l-2.282,-0l-0.013,-6.269l-3.093,5.165l-1.096,-0l-3.077,-5.031l0,6.135l-2.28,-0l-0,-10.446l2.011,0l3.935,6.486l3.868,-6.486Zm15.082,0l1.996,0l0.031,10.446l-2.282,-0l-0.014,-6.269l-3.092,5.165l-1.096,-0l-3.077,-5.031l0,6.135l-2.28,-0l-0,-10.446l2.01,0l3.935,6.486l3.869,-6.486Zm-28.289,0l-0,10.446l-2.432,-0l0,-10.446l2.432,0Zm61.711,0l-0,10.446l-2.432,-0l-0,-10.446l2.432,0Zm21.293,6.088l-0,2.418l5.718,-0l-0,1.94l-8.134,-0l-0,-10.446l7.939,0l-0,1.94l-5.523,0l-0,2.268l4.878,0l-0,1.88l-4.878,0Zm17.783,4.356l-2.626,-0l-2.017,-2.911l-0.114,0.001l-2.116,0l-0,2.91l-2.431,-0l-0,-10.445l4.547,-0c0.94,-0 1.75,0.151 2.431,0.455c0.68,0.303 1.206,0.738 1.576,1.305c0.37,0.568 0.555,1.254 0.555,2.03c-0,0.776 -0.185,1.445 -0.555,2.007c-0.371,0.562 -0.896,0.992 -1.576,1.291l-0.021,0.008l2.347,3.349Zm-3.212,-7.998c-0.37,-0.318 -0.93,-0.477 -1.68,-0.477l-1.982,0l-0,3.641l1.982,-0c0.75,-0 1.31,-0.162 1.68,-0.485c0.37,-0.324 0.555,-0.759 0.555,-1.336c-0,-0.577 -0.185,-1.024 -0.555,-1.343Zm-30.267,-2.446l-0,8.476l5.268,-0l-0,1.97l-7.699,-0l-0,-10.446l2.431,0Zm10.266,0l-0,10.446l-2.431,-0l-0,-10.446l2.431,0Zm-22.437,5.11c0.51,0.213 0.908,0.529 1.193,0.947c0.286,0.418 0.428,0.93 0.428,1.537c-0,0.895 -0.355,1.594 -1.066,2.096c-0.71,0.502 -1.756,0.754 -3.136,0.754l-5.433,-0l-0,-10.445l5.133,-0c1.32,-0 2.313,0.249 2.979,0.746c0.665,0.497 0.998,1.154 0.998,1.97c-0,0.547 -0.135,1.022 -0.405,1.425c-0.244,0.364 -0.57,0.652 -0.977,0.865c0.097,0.032 0.193,0.066 0.286,0.105Zm-1.328,3.208c0.325,-0.204 0.487,-0.54 0.487,-0.978c-0,-0.437 -0.162,-0.763 -0.487,-0.977c-0.325,-0.214 -0.803,-0.321 -1.433,-0.321l-2.837,-0l-0,2.582l2.837,-0c0.63,-0 1.108,-0.102 1.433,-0.306Zm-1.854,-6.499l-2.416,0l-0,2.462l2.416,0c0.591,0 1.043,-0.101 1.358,-0.305c0.316,-0.204 0.473,-0.525 0.473,-0.933c-0,-0.408 -0.157,-0.714 -0.473,-0.918c-0.315,-0.203 -0.768,-0.306 -1.358,-0.306Z"></path></svg>'''

IAD_LOGO_WHITE = IAD_LOGO_BLUE.replace('class="nb-logo" fill="#00b4ec"', 'style="height:32px;width:auto;opacity:.7" fill="#fff"')

def head(title, description, canonical_path, robots, og_description, jsonld_graph, keywords=None):
    kw = f'\n<meta name="keywords" content="{keywords}"/>' if keywords else ''
    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>{title}</title>
<meta name="description" content="{description}"/>{kw}
<meta name="robots" content="{robots}"/>
<link rel="canonical" href="https://immobiliernarbonne.com{canonical_path}"/>
<meta property="og:title" content="{title}"/>
<meta property="og:description" content="{og_description}"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://immobiliernarbonne.com{canonical_path}"/>
<meta property="og:image" content="https://immobiliernarbonne.com/og-image.jpg"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:locale" content="fr_FR"/>
<meta property="og:site_name" content="Guillaume Roque — Immobilier Narbonne"/>
<meta name="twitter:card" content="summary_large_image"/>
<script type="application/ld+json">
{jsonld_graph}
</script>
<link rel="preload" href="/fonts/inter-variable-latin.woff2" as="font" type="font/woff2" crossorigin/>
{STYLE}
</head>
<body>
'''

def qnav_navbar(links, cta_href, cta_label):
    links_html = '\n  '.join(f'<a href="{h}">{l}</a>' for h, l in links)
    return f'''<!-- QUICKNAV -->
<div class="qnav">
  {links_html}
  <div class="sep"></div>
  <a href="{cta_href}" class="cta">🏠 {cta_label}</a>
</div>

<!-- NAVBAR -->
<nav class="navbar">
  <a href="/" class="nb-brand">
    {IAD_LOGO_BLUE}
    <div class="nb-sep"></div>
    <div class="nb-name">Guillaume <em>Roque</em><br/>Immobilier · Narbonne</div>
  </a>
  <a href="{cta_href}" class="nb-cta">{cta_label}</a>
</nav>
'''

def breadcrumb(items):
    # items: list of (label, href_or_None for current)
    parts = []
    for label, href in items[:-1]:
        parts.append(f'<a href="{href}" style="color:var(--gris);text-decoration:none">{label}</a>')
    trail = ' → '.join(parts)
    last_label = items[-1][0]
    return f'''<div style="padding:14px 8vw 0;font-size:12.5px;color:var(--gris)">
  {trail} → <span style="color:var(--noir);font-weight:600">{last_label}</span>
</div>'''

def footer():
    return f'''<!-- FOOTER -->
<footer>
  <div class="ft">
    <div class="fb">
      {IAD_LOGO_WHITE}
      <p>Guillaume Roque · Conseiller immobilier iad France à Narbonne · Estimation gratuite, accompagnement complet pour la vente de votre maison ou appartement.</p>
    </div>
    <div class="fc">
      <h3>Mon accompagnement</h3>
      <a href="/estimation-immobiliere-narbonne">Faire estimer votre bien à Narbonne</a>
      <a href="/vendre-bien-narbonne">Vendre une maison ou un appartement à Narbonne</a>
      <a href="/prix-immobilier-narbonne">Consulter les prix immobiliers à Narbonne</a>
      <a href="/guillaume-roque">Découvrir la méthode de Guillaume Roque</a>
    </div>
    <div class="fc">
      <h3>Ressources</h3>
      <a href="/conseils/">Conseils pour vendre à Narbonne</a>
      <a href="/#avis">Avis clients</a>
      <a href="https://www.iadfrance.fr/conseiller-immobilier/guillaume.roque/estimation" target="_blank" rel="noopener" onclick="if(typeof trackEvent==='function')trackEvent('click_iad_profile',{{emplacement:'footer'}})">Profil officiel iad France</a>
      <a href="/">Accueil du site</a>
    </div>
    <div class="fc">
      <h3>Suivez-moi</h3>
      <a href="https://www.google.com/maps?cid=10249811500579735043" target="_blank" rel="noopener">Avis Google</a>
      <a href="https://www.instagram.com/guillaumeroqueiad/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.facebook.com/guillaumeroque.immobilier/" target="_blank" rel="noopener">Facebook</a>
      <a href="https://www.linkedin.com/in/guillaume-roque-07a3bb8a/" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </div>
  <div class="fbot">
    <p class="fleg">Guillaume Roque, mandataire indépendant en immobilier (sans détention de fonds), agent commercial de la SAS I@D France immatriculé au RSAC, titulaire de la carte de démarchage immobilier pour le compte de la société I@D France SAS. Site indépendant, non officiel iad France. © 2026</p>
    <span class="fcopy"><a href="/mentions-legales" style="color:inherit;text-decoration:underline">Mentions légales</a> · <a href="/politique-confidentialite" style="color:inherit;text-decoration:underline">Confidentialité</a> · <a href="/politique-confidentialite#cookies" onclick="if(typeof ouvrirGestionCookies==='function')return ouvrirGestionCookies();" style="color:inherit;text-decoration:underline">Gérer mes cookies</a> · <a href="https://www.iadfrance.fr/bareme_honoraires_iad.pdf" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">Barème d'honoraires</a> · immobiliernarbonne.com</span>
  </div>
</footer>
'''

def cookie_and_scripts(focusin_js=''):
    return f'''<!-- MESURE D'AUDIENCE (RGPD) -->
<!--
  Aucun identifiant GA4 n'est configure : tant que GA4_MEASUREMENT_ID reste
  vide, aucun script tiers n'est charge et aucun cookie de mesure n'est depose.
  Emplacement a completer par Guillaume : GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
-->
<div id="cookieBanner" style="display:none;position:fixed;left:0;right:0;bottom:0;z-index:2000;background:#0B2436;color:#fff;padding:18px 5vw">
  <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between">
    <div style="max-width:640px">
      <p style="font-size:12.5px;line-height:1.6;color:rgba(255,255,255,.9);margin:0 0 6px">Ce site n'utilise aujourd'hui aucun cookie de mesure d'audience. Si vous acceptez, un outil de mesure pourra être activé pour améliorer le site — vos coordonnées ne sont jamais transmises à cet outil. <a href="/politique-confidentialite" style="color:#fff;text-decoration:underline">En savoir plus</a></p>
      <p id="consentStatutTexte" style="font-size:11px;color:rgba(255,255,255,.6);margin:0"></p>
    </div>
    <div style="display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;align-items:center">
      <button id="consentBtnRetirer" onclick="retirerConsentement()" style="display:none;background:transparent;border:1px solid rgba(255,255,255,.4);color:#fff;font-size:12px;font-weight:600;padding:8px 16px;border-radius:100px;cursor:pointer">Retirer mon consentement</button>
      <button onclick="setConsent(false)" style="background:transparent;border:1px solid rgba(255,255,255,.4);color:#fff;font-size:12px;font-weight:600;padding:8px 16px;border-radius:100px;cursor:pointer">Refuser</button>
      <button onclick="setConsent(true)" style="background:var(--bleu);border:none;color:#fff;font-size:12px;font-weight:700;padding:8px 18px;border-radius:100px;cursor:pointer">Accepter</button>
      <button onclick="document.getElementById('cookieBanner').style.display='none'" aria-label="Fermer ce panneau" style="background:transparent;border:none;color:rgba(255,255,255,.55);font-size:16px;padding:4px 10px;cursor:pointer;line-height:1">✕</button>
    </div>
  </div>
</div>
<script>
var GA4_MEASUREMENT_ID = ''; // ex: 'G-XXXXXXXXXX' — laisser vide tant que Guillaume n'a pas fourni son propre identifiant GA4
var CONSENT_KEY = 'consent_mesure_audience';
var CONSENT_DUREE_MS = 183 * 24 * 60 * 60 * 1000; // ~6 mois — passé ce délai, le choix expire et est redemandé

window.dataLayer = window.dataLayer || [];
function gtag() {{ window.dataLayer.push(arguments); }}
gtag('consent', 'default', {{ analytics_storage: 'denied' }}); // mode Consent par défaut : refusé tant que non accepté explicitement

function trackEvent(nom, params) {{
  window.dataLayer.push(Object.assign({{event: nom}}, params || {{}}));
}}

function lireConsentement() {{
  try {{
    var brut = localStorage.getItem(CONSENT_KEY);
    if (!brut) return null;
    var data = JSON.parse(brut);
    if (!data || !data.expiresAt || Date.now() > Date.parse(data.expiresAt)) return null; // choix expiré : on redemande
    return data;
  }} catch (e) {{ return null; }}
}}

function ecrireConsentement(choice) {{
  var maintenant = new Date();
  var expiration = new Date(maintenant.getTime() + CONSENT_DUREE_MS);
  var data = {{ choice: choice, date: maintenant.toISOString(), expiresAt: expiration.toISOString() }};
  try {{ localStorage.setItem(CONSENT_KEY, JSON.stringify(data)); }} catch (e) {{}}
  return data;
}}

function supprimerCookiesAnalytics() {{
  document.cookie.split(';').map(function (c) {{ return c.split('=')[0].trim(); }})
    .filter(function (n) {{ return n === '_gid' || n.indexOf('_ga') === 0; }})
    .forEach(function (n) {{
      document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname + ';';
    }});
}}

function loadGA4() {{
  if (!GA4_MEASUREMENT_ID) return;
  gtag('consent', 'update', {{ analytics_storage: 'granted' }});
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', GA4_MEASUREMENT_ID, {{ anonymize_ip: true }});
}}

function majInterfaceConsentement() {{
  var data = lireConsentement();
  var elStatut = document.getElementById('consentStatutTexte');
  var btnRetirer = document.getElementById('consentBtnRetirer');
  if (!elStatut) return;
  if (!GA4_MEASUREMENT_ID) {{
    elStatut.textContent = "Aucun outil de mesure d'audience n'est actif sur ce site actuellement.";
    if (btnRetirer) btnRetirer.style.display = 'none';
  }} else if (data && data.choice === 'accepted') {{
    elStatut.textContent = 'Mesure d\\'audience acceptée le ' + new Date(data.date).toLocaleDateString('fr-FR') + '.';
    if (btnRetirer) btnRetirer.style.display = 'inline-block';
  }} else if (data && data.choice === 'denied') {{
    elStatut.textContent = 'Mesure d\\'audience refusée le ' + new Date(data.date).toLocaleDateString('fr-FR') + '.';
    if (btnRetirer) btnRetirer.style.display = 'none';
  }} else {{
    elStatut.textContent = 'Aucun choix enregistré pour le moment.';
    if (btnRetirer) btnRetirer.style.display = 'none';
  }}
}}

function setConsent(accepte) {{
  ecrireConsentement(accepte ? 'accepted' : 'denied');
  var banniere = document.getElementById('cookieBanner');
  if (banniere) banniere.style.display = 'none';
  if (accepte) {{
    loadGA4();
  }} else {{
    gtag('consent', 'update', {{ analytics_storage: 'denied' }});
    supprimerCookiesAnalytics();
  }}
  majInterfaceConsentement();
}}

function retirerConsentement() {{
  ecrireConsentement('denied');
  gtag('consent', 'update', {{ analytics_storage: 'denied' }});
  supprimerCookiesAnalytics();
  majInterfaceConsentement();
  var banniere = document.getElementById('cookieBanner');
  if (banniere) banniere.style.display = 'none';
}}

function ouvrirGestionCookies() {{
  majInterfaceConsentement();
  var banniere = document.getElementById('cookieBanner');
  if (banniere) banniere.style.display = 'block';
  return false;
}}

(function initConsentement() {{
  var data = lireConsentement();
  if (data && data.choice === 'accepted') {{
    loadGA4();
  }} else if (!data && GA4_MEASUREMENT_ID) {{
    var banniere = document.getElementById('cookieBanner');
    if (banniere) banniere.style.display = 'block';
  }}
  majInterfaceConsentement();
  if (location.hash === '#cookies') {{ ouvrirGestionCookies(); }}
}})();
{focusin_js}
</script>

</body>
</html>
'''
