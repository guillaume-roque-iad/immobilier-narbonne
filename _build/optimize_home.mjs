import {readFile, writeFile} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const indexPath = new URL('index.html', root);
const css = (await readFile(new URL('refonte.css', root), 'utf8')).trim();
const catalogue = JSON.parse(await readFile(new URL('annonces-iad.json', root), 'utf8'));
let html = await readFile(indexPath, 'utf8');

const escapeText = value => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const escapeAttribute = value => escapeText(value).replaceAll('"', '&quot;');

function renderCard(item) {
  const details = Array.isArray(item.details) ? item.details : [];
  const displayPrice = item.offre === 'Location' ? `${item.price} / mois` : item.price;
  const reference = item.url.split('/').filter(Boolean).pop();
  const tags = [item.offre, ...(item.tags || [])]
    .map(label => `<span class="bien-tag">${escapeText(label)}</span>`)
    .join('');
  const accessibleDescription = [displayPrice, ...details].filter(Boolean).join(', ');
  const visual = item.image
    ? `<img class="bien-image" src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.title)}" width="600" height="450" loading="lazy" decoding="async"/>`
    : '<div class="bien-image bien-sans-photo">Photo disponible sur iad</div>';

  return `<article class="bien-card" data-ville="${escapeAttribute(item.ville)}" data-type="${escapeAttribute(item.type)}" data-offre="${escapeAttribute(item.offre)}"><a href="${escapeAttribute(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeAttribute(`${item.title} — ${accessibleDescription} — référence ${reference} — voir la fiche sur iad (nouvel onglet)`)}">${visual}<div class="bien-content"><div class="bien-tags">${tags}</div><p class="bien-prix">${escapeText(displayPrice)}</p><p class="bien-charge">${escapeText(item.charges || 'Prix affiché sur iad')}</p><h3>${escapeText(item.title)}</h3><p class="bien-details">${escapeText(details.join(' · '))}</p><span class="bien-lien">Voir le bien sur iad <svg class="material-symbol material-symbol--arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/icons.svg?v=20260914#arrow-outward"/></svg></span></div></a></article>`;
}

if (!Array.isArray(catalogue.items) || catalogue.items.length < 6) {
  throw new Error('Le catalogue doit contenir au moins six annonces.');
}

html = html.replace(/\n?<link rel="stylesheet" href="\/refonte\.css\?v=20260914c"\/>/, '');
html = html.replace(/\n?<style data-refonte>[\s\S]*?<\/style>\n?/, '\n');
html = html.replace(
  '<script src="/navigation.js?v=20260914" defer></script>',
  `<style data-refonte>\n${css}\n</style>\n<script src="/navigation.js?v=20260914" defer></script>`
);

const gridStart = '<div class="biens-grid">';
const gridEnd = '</div><div class="biens-actions">';
const start = html.indexOf(gridStart);
const end = html.indexOf(gridEnd, start);
if (start === -1 || end === -1) throw new Error('Grille des annonces introuvable.');
const cards = catalogue.items.slice(0, 6).map(renderCard).join('');
html = `${html.slice(0, start)}${gridStart}${cards}${html.slice(end)}`;

await writeFile(indexPath, html);
console.log(`Accueil optimisé : 6 annonces pré-rendues sur ${catalogue.items.length}.`);
