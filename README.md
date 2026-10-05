# immobilier-narbonne
Site vitrine de Guillaume Roque, conseiller iad Frane, secteur Narbonne (vendeurs)

<!-- Deploy trigger 2026-10-04 -->

## Indexation

La construction lance `node _build/update_indexing.mjs`. Ce script synchronise le sitemap avec les pages publiques de Guillaume (racine et dossier conseils), les liens internes et les redirections permanentes des variantes `.html` et slash final. Il conserve les exclusions `noindex` et ne modifie pas le sous-site Mickael. Les liens entre articles sont générés par thèmes ; l'historique des modifications significatives du HTML est enregistré dans `_build/indexing-state.json`.

Après ajout d'un article, exécuter ce script et le relier depuis la rubrique Conseils. Une page de confirmation, une page en préparation ou un contenu volontairement exclu ne doit pas entrer dans le sitemap.
