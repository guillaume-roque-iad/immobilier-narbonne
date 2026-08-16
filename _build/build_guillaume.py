import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import head, qnav_navbar, breadcrumb, footer, cookie_and_scripts

TITLE = "Guillaume Roque, conseiller immobilier intervenant à Narbonne"
DESC = "Guillaume Roque, conseiller immobilier iad France, intervient à Narbonne et dans le Grand Narbonne depuis 2013. Parcours, méthode et coordonnées."
CANON = "/guillaume-roque"

jsonld = '''{"@context":"https://schema.org","@graph":[{"@type":"Person","@id":"https://immobiliernarbonne.com/#guillaume-roque","name":"Guillaume Roque","jobTitle":"Conseiller immobilier indépendant","image":"https://immobiliernarbonne.com/img-guillaume.jpg","email":"guillaume.roque@iadfrance.fr","telephone":"+33662108396","url":"https://immobiliernarbonne.com/guillaume-roque","worksFor":{"@type":"Organization","name":"I@D France"},"sameAs":["https://www.iadfrance.fr/conseiller-immobilier/guillaume.roque/estimation","https://www.google.com/maps?cid=10249811500579735043","https://www.instagram.com/guillaumeroqueiad/","https://www.facebook.com/guillaumeroque.immobilier/","https://www.linkedin.com/in/guillaume-roque-07a3bb8a/"]},{"@type":"RealEstateAgent","@id":"https://immobiliernarbonne.com/#agent","name":"Guillaume Roque — Immobilier Narbonne","telephone":"+33662108396","email":"guillaume.roque@iadfrance.fr","url":"https://immobiliernarbonne.com","areaServed":[{"@type":"City","name":"Narbonne"},{"@type":"AdministrativeArea","name":"Grand Narbonne"}],"employee":{"@id":"https://immobiliernarbonne.com/#guillaume-roque"}},{"@type":"WebPage","@id":"https://immobiliernarbonne.com/guillaume-roque#webpage","url":"https://immobiliernarbonne.com/guillaume-roque","name":"Guillaume Roque, conseiller immobilier intervenant à Narbonne","isPartOf":{"@id":"https://immobiliernarbonne.com/#website"},"about":{"@id":"https://immobiliernarbonne.com/#guillaume-roque"},"inLanguage":"fr-FR"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://immobiliernarbonne.com/"},{"@type":"ListItem","position":2,"name":"Guillaume Roque","item":"https://immobiliernarbonne.com/guillaume-roque"}]}]}'''

html = []
html.append(head(TITLE, DESC, CANON, "index, follow",
    "Guillaume Roque, conseiller iad France, intervient à Narbonne et dans le Grand Narbonne depuis 2013.",
    jsonld,
    keywords="Guillaume Roque, conseiller immobilier Narbonne, iad France Narbonne, agent immobilier Grand Narbonne"))

html.append(qnav_navbar([
    ("/", "Accueil"),
    ("#parcours", "Parcours"),
    ("#methode", "Ma méthode"),
    ("#zone", "Zone d'intervention"),
    ("#contact", "Coordonnées"),
], "/estimation-immobiliere-narbonne", "Estimation gratuite"))

html.append('<main>')
html.append(breadcrumb([("Accueil", "/"), ("Guillaume Roque", None)]))

html.append('''
<!-- HERO -->
<section class="hero" style="min-height:auto;padding-top:56px;padding-bottom:80px">
  <div>
    <div class="hero-tag">Conseiller iad France · Narbonne et Grand Narbonne</div>
    <h1>Guillaume Roque, votre<br/>conseiller immobilier <em>dans le Grand Narbonne.</em></h1>
    <p class="hero-sub">Conseiller immobilier indépendant, agent commercial du réseau iad France, j'interviens à Narbonne et dans le Grand Narbonne depuis 2013 pour accompagner mes clients dans l'estimation et la vente de leur bien.</p>
    <div class="hero-btns">
      <a href="/estimation-immobiliere-narbonne" class="btn-w">Demander une estimation gratuite</a>
      <a href="https://www.iadfrance.fr/conseiller-immobilier/guillaume.roque/estimation" target="_blank" rel="noopener" class="btn-o" onclick="if(typeof trackEvent==='function')trackEvent('click_iad_profile',{emplacement:'guillaume_hero'})">Voir mon profil officiel iad France</a>
    </div>
    <div class="hero-stats">
      <div class="hs"><strong>13 ans</strong><span>d'expérience à Narbonne</span></div>
      <div class="hs"><strong>iad France</strong><span>réseau de conseillers indépendants</span></div>
      <div class="hs"><strong>Narbonne</strong><span>et le Grand Narbonne</span></div>
    </div>
  </div>
  <div class="hero-right">
    <picture><source type="image/avif" srcset="/img-guillaume-480.avif 480w, /img-guillaume-640.avif 640w, /img-guillaume-900.avif 900w" sizes="(max-width: 1024px) 88vw, 420px"/><source type="image/webp" srcset="/img-guillaume-480.webp 480w, /img-guillaume-640.webp 640w, /img-guillaume-900.webp 900w" sizes="(max-width: 1024px) 88vw, 420px"/><img src="/img-guillaume.jpg" alt="Guillaume Roque, conseiller iad France à Narbonne" class="hero-photo" fetchpriority="high" decoding="async"/></picture>
    <div class="hero-card">
      <strong>Guillaume Roque</strong>
      <span>Conseiller iad France · Narbonne</span>
    </div>
  </div>
</section>

<!-- PARCOURS -->
<section class="guil" id="parcours">
  <div class="guil-img">
    <picture><source type="image/avif" srcset="/img-guillaume-480.avif 480w, /img-guillaume-640.avif 640w, /img-guillaume-900.avif 900w" sizes="(max-width: 1024px) 84vw, 560px"/><source type="image/webp" srcset="/img-guillaume-480.webp 480w, /img-guillaume-640.webp 640w, /img-guillaume-900.webp 900w" sizes="(max-width: 1024px) 84vw, 560px"/><img src="/img-guillaume.jpg" alt="Guillaume Roque, conseiller immobilier à Narbonne" class="guil-photo" loading="lazy" decoding="async"/></picture>
    <div class="guil-tag"><strong>Conseiller iad France</strong><span>Narbonne · depuis 2013</span></div>
  </div>
  <div>
    <div class="eyebrow">Parcours</div>
    <h2 class="stitle">Un statut clair,<br/>une <em>activité vérifiable.</em></h2>
    <p style="font-size:16px;color:var(--gris);line-height:1.75;margin-bottom:16px">Guillaume Roque est mandataire indépendant en immobilier (sans détention de fonds), agent commercial de la SAS I@D France immatriculé au RSAC (Registre Spécial des Agents Commerciaux), et titulaire de la carte de démarchage immobilier pour le compte de la société I@D France SAS.</p>
    <p style="font-size:16px;color:var(--gris);line-height:1.75;margin-bottom:16px">Ce site est un site personnel indépendant, non officiel iad France, édité par Guillaume Roque dans le cadre de son activité de conseiller immobilier. Son profil officiel, ses annonces et les informations vérifiées par le réseau sont centralisés sur <a href="https://www.iadfrance.fr/conseiller-immobilier/guillaume.roque/estimation" target="_blank" rel="noopener" style="color:var(--bleu);text-decoration:none;font-weight:600" onclick="if(typeof trackEvent==='function')trackEvent('click_iad_profile',{emplacement:'guillaume_parcours'})">le site officiel iad France</a>.</p>
    <div class="chips">
      <span class="chip">Mandataire indépendant</span>
      <span class="chip">Agent commercial iad France</span>
      <span class="chip">Immatriculé RSAC</span>
      <span class="chip">Narbonne · depuis 2013</span>
    </div>
  </div>
</section>

<!-- MÉTHODE -->
<section class="services" id="methode">
  <div class="svh">
    <div class="eyebrow">Ma méthode</div>
    <h2 class="stitle">Une approche<br/>fondée sur <em>les faits.</em></h2>
    <p class="ssub">Une méthode simple, expliquée clairement, sans promesse de délai ou de prix qui ne pourrait être tenue.</p>
  </div>
  <div class="svgrid">
    <div class="svcard"><div class="svicon">📊</div><h3>Estimation fondée sur les ventes réelles</h3><p>Chaque estimation s'appuie sur les données officielles DVF et les ventes comparables du secteur, pas sur un algorithme en ligne.</p></div>
    <div class="svcard"><div class="svicon">🤝</div><h3>Accompagnement de bout en bout</h3><p>Un seul interlocuteur, de l'estimation à la signature chez le notaire, pour éviter les intermédiaires multiples.</p></div>
    <div class="svcard"><div class="svicon">📍</div><h3>Une connaissance du secteur</h3><p>Une intervention concentrée à Narbonne et dans le Grand Narbonne, pour une lecture fine du marché local.</p></div>
    <div class="svcard"><div class="svicon">📞</div><h3>Une disponibilité directe</h3><p>Un contact direct par téléphone ou email, sans standard ni plateforme intermédiaire.</p></div>
  </div>
</section>

<!-- ZONE D'INTERVENTION -->
<section class="secteurs" id="zone">
  <div class="sech">
    <div class="eyebrow">Zone d'intervention</div>
    <h2 class="stitle">Narbonne<br/>et le <em>Grand Narbonne.</em></h2>
    <p class="ssub">Guillaume Roque, conseiller immobilier intervenant à Narbonne et dans le Grand Narbonne. Cette formulation reflète sa zone d'intervention commerciale ; elle ne constitue pas une déclaration d'agence ou de bureau physique à une adresse donnée.</p>
  </div>
  <div class="secgrid">
    <div class="seccard"><h3>Narbonne centre</h3><p>Maisons de ville, appartements anciens et biens de caractère au cœur de Narbonne.</p></div>
    <div class="seccard"><h3>Narbonne et périphérie</h3><p>Maisons individuelles et pavillons dans les quartiers résidentiels de la commune.</p></div>
    <div class="seccard"><h3>Grand Narbonne</h3><p>Communes limitrophes de l'agglomération narbonnaise, sur demande.</p></div>
  </div>
</section>

<!-- CONTACT -->
<section style="padding:100px 8vw" id="contact">
  <div style="max-width:640px;margin:0 auto;text-align:center">
    <div class="eyebrow">Coordonnées</div>
    <h2 class="stitle" style="margin-bottom:28px">Me <em>contacter.</em></h2>
    <div style="display:flex;flex-direction:column;gap:12px;align-items:center;margin-bottom:32px">
      <div class="cinfo">📞 <a href="tel:+33662108396" onclick="if(typeof trackEvent==='function')trackEvent('click_phone',{emplacement:'guillaume_contact'})">+33 6 62 10 83 96</a></div>
      <div class="cinfo">📍 <span>Intervient à Narbonne et dans le Grand Narbonne</span></div>
      <div class="cinfo">✉️ <span>&#103;&#117;&#105;&#108;&#108;&#97;&#117;&#109;&#101;&#46;&#114;&#111;&#113;&#117;&#101;&#64;&#105;&#97;&#100;&#102;&#114;&#97;&#110;&#99;&#101;&#46;&#102;&#114;</span></div>
    </div>
    <a href="/estimation-immobiliere-narbonne" class="btn-estim" style="background:var(--bleu-prof);color:#fff">Demander une estimation gratuite →</a>
  </div>
</section>
''')

html.append('</main>')
html.append(footer())
html.append(cookie_and_scripts())

out = ''.join(html)
with open(os.path.join(os.path.dirname(__file__), '..', 'guillaume-roque.html'), 'w', encoding='utf-8') as f:
    f.write(out)
print("WROTE", len(out), "bytes")
