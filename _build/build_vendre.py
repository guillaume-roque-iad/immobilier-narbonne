import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import head, qnav_navbar, breadcrumb, footer, cookie_and_scripts

TITLE = "Vendre un bien à Narbonne | Guillaume Roque"
DESC = "Vendre une maison ou un appartement à Narbonne : accompagnement complet de l'estimation à la signature, avec Guillaume Roque, conseiller iad France."
CANON = "/vendre-bien-narbonne"

jsonld = '''{"@context":"https://schema.org","@graph":[{"@type":"Service","@id":"https://immobiliernarbonne.com/vendre-bien-narbonne#service","serviceType":"Accompagnement à la vente immobilière","provider":{"@id":"https://immobiliernarbonne.com/#agent"},"areaServed":[{"@type":"City","name":"Narbonne"},{"@type":"AdministrativeArea","name":"Grand Narbonne"}],"name":"Accompagnement à la vente d'un bien à Narbonne","description":"Accompagnement complet pour vendre une maison ou un appartement à Narbonne : estimation, préparation, diffusion, qualification des acquéreurs, visites, négociation, compromis et signature."},{"@type":"RealEstateAgent","@id":"https://immobiliernarbonne.com/#agent","name":"Guillaume Roque — Immobilier Narbonne","telephone":"+33662108396","email":"guillaume.roque@iadfrance.fr","url":"https://immobiliernarbonne.com","areaServed":[{"@type":"City","name":"Narbonne"},{"@type":"AdministrativeArea","name":"Grand Narbonne"}]},{"@type":"WebPage","@id":"https://immobiliernarbonne.com/vendre-bien-narbonne#webpage","url":"https://immobiliernarbonne.com/vendre-bien-narbonne","name":"Vendre un bien à Narbonne | Guillaume Roque","isPartOf":{"@id":"https://immobiliernarbonne.com/#website"},"about":{"@id":"https://immobiliernarbonne.com/vendre-bien-narbonne#service"},"inLanguage":"fr-FR"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://immobiliernarbonne.com/"},{"@type":"ListItem","position":2,"name":"Vendre un bien à Narbonne","item":"https://immobiliernarbonne.com/vendre-bien-narbonne"}]}]}'''

html = []
html.append(head(TITLE, DESC, CANON, "index, follow",
    "Vendre à Narbonne : accompagnement complet avec Guillaume Roque, conseiller iad France — de l'estimation à la signature.",
    jsonld,
    keywords="vendre maison Narbonne, vendre appartement Narbonne, agent immobilier Narbonne, accompagnement vente immobilière Narbonne"))

html.append(qnav_navbar([
    ("/", "Accueil"),
    ("#etapes", "Les étapes"),
    ("#expertise", "Expertise locale"),
    ("#faq", "Questions fréquentes"),
], "/estimation-immobiliere-narbonne", "Estimation gratuite"))

html.append('<main>')
html.append(breadcrumb([("Accueil", "/"), ("Vendre un bien à Narbonne", None)]))

html.append('''
<!-- HERO -->
<section class="hero" style="min-height:auto;padding-top:56px;padding-bottom:80px">
  <div>
    <div class="hero-tag">Accompagnement complet · De l'estimation à la signature</div>
    <h1>Vendre votre maison<br/>ou appartement <em>à Narbonne.</em></h1>
    <p class="hero-sub">Vendre un bien ne se résume pas à publier une annonce. Je vous accompagne à chaque étape — estimation, préparation, diffusion, visites, négociation — pour vendre dans de bonnes conditions, au juste prix, à Narbonne et dans le Grand Narbonne.</p>
    <div class="hero-btns">
      <a href="/estimation-immobiliere-narbonne" class="btn-w">Faire estimer votre bien à Narbonne</a>
      <a href="#etapes" class="btn-o">Découvrir les étapes de la vente</a>
    </div>
  </div>
  <div class="hero-right">
    <picture><source type="image/avif" srcset="/img-guillaume-480.avif 480w, /img-guillaume-640.avif 640w, /img-guillaume-900.avif 900w" sizes="(max-width: 1024px) 88vw, 420px"/><source type="image/webp" srcset="/img-guillaume-480.webp 480w, /img-guillaume-640.webp 640w, /img-guillaume-900.webp 900w" sizes="(max-width: 1024px) 88vw, 420px"/><img src="/img-guillaume.jpg" alt="Guillaume Roque, conseiller iad France à Narbonne, accompagnement pour vendre un bien" class="hero-photo" fetchpriority="high" decoding="async"/></picture>
    <div class="hero-card">
      <strong>Guillaume Roque</strong>
      <span>Conseiller iad France · Narbonne</span>
    </div>
  </div>
</section>

<!-- ÉTAPES -->
<section class="services" id="etapes">
  <div class="svh">
    <div class="eyebrow">Comment ça marche</div>
    <h2 class="stitle">Les étapes<br/>d'une <em>vente réussie.</em></h2>
    <p class="ssub">Chaque vente est différente, mais la méthode reste la même : de l'estimation à la signature, vous êtes accompagné à chaque étape.</p>
  </div>
  <div class="svgrid">
    <div class="svcard"><div class="svicon">📊</div><h3>1. Estimation</h3><p>Une estimation gratuite et argumentée de votre bien, fondée sur les ventes réelles constatées à Narbonne, pas sur un algorithme en ligne.</p></div>
    <div class="svcard"><div class="svicon">🧹</div><h3>2. Préparation du bien</h3><p>Conseils concrets pour présenter votre bien sous son meilleur jour : rangement, petites réparations, mise en valeur des atouts.</p></div>
    <div class="svcard"><div class="svicon">📸</div><h3>3. Diffusion de l'annonce</h3><p>Photos, description et diffusion de votre annonce sur les portails immobiliers et le réseau iad France pour toucher les acquéreurs sérieux.</p></div>
    <div class="svcard"><div class="svicon">✅</div><h3>4. Qualification des acquéreurs</h3><p>Chaque demande de visite est qualifiée en amont : budget, financement, projet, pour ne vous faire visiter qu'à des acquéreurs sérieux.</p></div>
    <div class="svcard"><div class="svicon">🔑</div><h3>5. Visites</h3><p>Organisation et accompagnement des visites, avec un retour transparent après chaque rendez-vous.</p></div>
    <div class="svcard"><div class="svicon">🤝</div><h3>6. Négociation</h3><p>Négociation du prix et des conditions de vente dans votre intérêt, avec une position claire sur la valeur réelle de votre bien.</p></div>
    <div class="svcard"><div class="svicon">📝</div><h3>7. Compromis de vente</h3><p>Constitution du dossier, coordination avec le notaire et rédaction du compromis de vente dans les règles.</p></div>
    <div class="svcard"><div class="svicon">🏁</div><h3>8. Signature</h3><p>Suivi du dossier jusqu'à la signature de l'acte authentique chez le notaire, et remise des clés.</p></div>
  </div>
</section>

<!-- EXPERTISE MARCHÉ LOCAL -->
<section class="secteurs" id="expertise">
  <div class="sech">
    <div class="eyebrow">Expertise du marché local</div>
    <h2 class="stitle">Une connaissance<br/>du marché <em>à Narbonne.</em></h2>
    <p class="ssub">Intervenant à Narbonne et dans le Grand Narbonne, je fonde mes estimations et mes conseils de vente sur les ventes réelles du secteur plutôt que sur des moyennes nationales.</p>
  </div>
  <div class="secgrid">
    <div class="seccard"><h3>Données locales</h3><p>Analyse des ventes comparables à Narbonne à partir des données officielles DVF (valeurs foncières).</p></div>
    <div class="seccard"><h3>Réseau iad France</h3><p>Diffusion de votre annonce via le réseau national iad France, avec une visibilité locale à Narbonne.</p></div>
    <div class="seccard"><h3>Suivi personnalisé</h3><p>Un seul interlocuteur du premier contact à la signature, disponible par téléphone et par email.</p></div>
  </div>
  <div style="text-align:center;margin-top:36px">
    <a href="/prix-immobilier-narbonne" style="font-size:13px;font-weight:700;color:#0079A3;text-decoration:none">Consulter les prix immobiliers à Narbonne →</a>
  </div>
</section>

<!-- FAQ -->
<section style="padding:100px 8vw;background:#fff;max-width:900px;margin:0 auto" id="faq">
  <div class="sech" style="text-align:center;margin-bottom:48px">
    <div class="eyebrow">Questions fréquentes</div>
    <h2 class="stitle">Vendre à Narbonne :<br/>vos <em>questions.</em></h2>
  </div>
  <div style="display:flex;flex-direction:column;gap:22px">
    <div><h3 style="font-size:16px;font-weight:700;margin-bottom:6px">Combien coûte l'estimation ?</h3><p style="font-size:14.5px;color:var(--gris);line-height:1.7">L'estimation est gratuite et sans engagement, que vous vendiez rapidement ou dans plusieurs mois.</p></div>
    <div><h3 style="font-size:16px;font-weight:700;margin-bottom:6px">Combien de temps prend une vente à Narbonne ?</h3><p style="font-size:14.5px;color:var(--gris);line-height:1.7">Le délai dépend du type de bien, du secteur et du prix affiché. Il est abordé au cas par cas lors de l'estimation, sans promesse de délai générique.</p></div>
    <div><h3 style="font-size:16px;font-weight:700;margin-bottom:6px">Dois-je faire des travaux avant de vendre ?</h3><p style="font-size:14.5px;color:var(--gris);line-height:1.7">Pas nécessairement : cela dépend du bien et du budget. Des conseils de mise en valeur simples sont donnés lors de la visite d'estimation.</p></div>
    <div><h3 style="font-size:16px;font-weight:700;margin-bottom:6px">Puis-je vendre si mon bien est déjà en mandat ailleurs ?</h3><p style="font-size:14.5px;color:var(--gris);line-height:1.7">Cela dépend des conditions de votre mandat en cours. Cette question est étudiée avec vous avant toute démarche.</p></div>
  </div>
</section>

<!-- CTA ESTIMATION -->
<section class="estim">
  <div class="eyebrow" style="color:rgba(255,255,255,.85)">Première étape</div>
  <h2 class="stitle">Commencez par<br/>une <em>estimation gratuite.</em></h2>
  <p class="ssub">Sans engagement, je vous donne une première estimation argumentée de votre bien à Narbonne.</p>
  <a href="/estimation-immobiliere-narbonne" class="btn-estim">Faire estimer votre bien à Narbonne →</a>
</section>
''')

html.append('</main>')
html.append(footer())
html.append(cookie_and_scripts())

out = ''.join(html)
with open(os.path.join(os.path.dirname(__file__), '..', 'vendre-bien-narbonne.html'), 'w', encoding='utf-8') as f:
    f.write(out)
print("WROTE", len(out), "bytes")
