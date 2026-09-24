(() => {
  const root = document.querySelector('[data-catalogue]');
  if (!root) return;

  const grid = root.querySelector('.biens-grid');
  const town = root.querySelector('#biens-ville');
  const type = root.querySelector('#biens-type');
  const offer = root.querySelector('#biens-offre');
  const count = root.querySelector('#biens-resultat');
  const more = root.querySelector('#biens-plus');
  const reset = root.querySelector('#biens-reset');
  const source = root.querySelector('.biens-source');
  let items = null;
  let loading = null;
  let limit = 9;

  // Corrections vérifiées sur la page publique iad de Guillaume Roque.
  // Au 24/09/2026, iad affiche 105 biens disponibles.
  const catalogueCorrections = {
    updated: '2026-09-24',
    additionalItems: [
      {
        title: 'Appartement à Narbonne (11100)',
        ville: 'Narbonne',
        type: 'Appartement',
        offre: 'Vente',
        price: '118 000 €',
        details: ['2 pièces', '53 m²'],
        tags: ['Nouveau'],
        url: 'https://www.iadfrance.fr/annonce/appartement-vente-2-pieces-narbonne-53m2/r2114821',
        image: 'https://images.iadfrance.fr/property/broadcast/2026/09/23/01a0ced7c6473045e72374d1fa4423b6.jpg?format=auto&width=600',
        charges: ''
      },
      {
        title: 'Appartement à Narbonne (11100)',
        ville: 'Narbonne',
        type: 'Appartement',
        offre: 'Vente',
        price: '215 000 €',
        details: ['2 chambres', '3 pièces', '71 m²'],
        tags: ['Exclusivité', 'Nouveau'],
        url: 'https://www.iadfrance.fr/annonce/appartement-vente-3-pieces-narbonne-71m2/r2118039',
        image: 'https://images.iadfrance.fr/property/broadcast/2026/09/22/01a0c830ed4405f3e1c1d9a1e792fcc5.png?format=auto&width=600',
        charges: ''
      }
    ],
    excludedRefs: new Set([
      'r1702385-4',
      'r1702114-18',
      'r1983373-23',
      'r1983373-32'
    ]),
    removedTagsByRef: new Map([
      ['r2062986', new Set(['Nouveau'])],
      ['r2079926', new Set(['Nouveau'])],
      ['r2101887', new Set(['Nouveau'])],
      ['r2092836', new Set(['Nouveau'])],
      ['r2093358', new Set(['Nouveau'])]
    ])
  };

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function getReference(item) {
    return (item.url || '').split('/').filter(Boolean).pop() || '';
  }

  function applyCatalogueCorrections(item) {
    const reference = getReference(item);
    const removedTags = catalogueCorrections.removedTagsByRef.get(reference);
    if (!removedTags) return item;
    return {
      ...item,
      tags: (item.tags || []).filter(tag => !removedTags.has(tag))
    };
  }

  function syncSelect(select, values) {
    if (!select) return;
    const placeholder = select.options[0]?.textContent || 'Tous';
    const current = select.value;
    const first = element('option', '', placeholder);
    first.value = '';
    const fragment = document.createDocumentFragment();
    fragment.append(first);
    values
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'fr', {sensitivity: 'base'}))
      .forEach(value => {
        const option = element('option', '', value);
        option.value = value;
        fragment.append(option);
      });
    select.replaceChildren(fragment);
    if (values.includes(current)) select.value = current;
  }

  function syncFilters() {
    syncSelect(town, [...new Set(items.map(item => item.ville))]);
    syncSelect(type, [...new Set(items.map(item => item.type))]);
  }

  function formatUpdatedDate(value) {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split('-').map(Number);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Paris'
    }).format(new Date(Date.UTC(year, month - 1, day)));
  }

  function syncSource(updated) {
    if (!source) return;
    const date = formatUpdatedDate(updated);
    if (!date) return;
    const link = source.querySelector('a');
    source.replaceChildren(document.createTextNode(`Annonces importées le ${date} depuis `));
    if (link) source.append(link);
    source.append(document.createTextNode('. Retrouvez la disponibilité, le descriptif complet, les diagnostics et les informations sur les honoraires dans chaque fiche iad.'));
  }

  function createCard(item) {
    const article = element('article', 'bien-card');
    article.dataset.ville = item.ville;
    article.dataset.type = item.type;
    article.dataset.offre = item.offre;

    const link = element('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const displayPrice = item.offre === 'Location' ? `${item.price} / mois` : item.price;
    const reference = getReference(item);
    const description = [displayPrice, ...(item.details || [])].filter(Boolean).join(', ');
    link.setAttribute('aria-label', `${item.title} — ${description} — référence ${reference} — voir la fiche sur iad (nouvel onglet)`);

    if (item.image) {
      const image = element('img', 'bien-image');
      image.src = item.image;
      image.alt = item.title;
      image.width = 600;
      image.height = 450;
      image.loading = 'lazy';
      image.decoding = 'async';
      link.append(image);
    } else {
      link.append(element('div', 'bien-image bien-sans-photo', 'Photo disponible sur iad'));
    }

    const content = element('div', 'bien-content');
    const tags = element('div', 'bien-tags');
    [item.offre, ...(item.tags || [])].forEach(label => tags.append(element('span', 'bien-tag', label)));
    content.append(tags);
    content.append(element('p', 'bien-prix', displayPrice));
    content.append(element('p', 'bien-charge', item.charges || 'Prix affiché sur iad'));
    content.append(element('h3', '', item.title));
    content.append(element('p', 'bien-details', (item.details || []).join(' · ')));

    const action = element('span', 'bien-lien', 'Voir le bien sur iad ');
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'material-symbol material-symbol--arrow');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '/icons.svg?v=20260914#arrow-outward');
    icon.append(use);
    action.append(icon);
    content.append(action);
    link.append(content);
    article.append(link);
    return article;
  }

  function render(focusIndex) {
    if (!items) return;
    const matches = items.filter(item =>
      (!town.value || item.ville === town.value) &&
      (!type.value || item.type === type.value) &&
      (!offer.value || item.offre === offer.value)
    );
    const visible = matches.slice(0, limit);
    const fragment = document.createDocumentFragment();
    visible.forEach(item => fragment.append(createCard(item)));
    grid.replaceChildren(fragment);
    count.textContent = matches.length
      ? `${matches.length} bien${matches.length > 1 ? 's' : ''} · ${visible.length} affiché${visible.length > 1 ? 's' : ''}`
      : 'Aucun bien ne correspond à ces critères. Essayez une autre commune ou un autre type de bien.';
    more.hidden = matches.length <= limit;
    if (Number.isInteger(focusIndex)) {
      const next = grid.children[focusIndex];
      if (next) next.querySelector('a').focus({preventScroll:true});
    }
  }

  async function ensureCatalogue() {
    if (items) return true;
    if (loading) return loading;
    root.setAttribute('aria-busy', 'true');
    loading = fetch('/annonces-iad.json', {credentials:'same-origin', cache:'no-store'})
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data.items)) throw new Error('Catalogue invalide');
        const baseItems = data.items
          .filter(item => !catalogueCorrections.excludedRefs.has(getReference(item)))
          .map(applyCatalogueCorrections);
        const existingRefs = new Set(baseItems.map(getReference));
        const additionalItems = catalogueCorrections.additionalItems
          .filter(item => !existingRefs.has(getReference(item)))
          .map(applyCatalogueCorrections);
        const firstNonPrestige = baseItems.findIndex(item => !(item.tags || []).includes('Prestige'));
        const insertionIndex = firstNonPrestige === -1 ? baseItems.length : firstNonPrestige;
        items = [
          ...baseItems.slice(0, insertionIndex),
          ...additionalItems,
          ...baseItems.slice(insertionIndex)
        ];
        syncFilters();
        syncSource(catalogueCorrections.updated || data.updated);
        render();
        return true;
      })
      .catch(() => {
        count.textContent = 'Les premières annonces restent disponibles. Pour consulter tout le catalogue, utilisez le lien vers iad ci-dessous.';
        return false;
      })
      .finally(() => root.removeAttribute('aria-busy'));
    return loading;
  }

  [town, type, offer].forEach(input => input.addEventListener('change', async () => {
    limit = 9;
    if (await ensureCatalogue()) render();
  }));

  more.addEventListener('click', async () => {
    if (!await ensureCatalogue()) return;
    const previousCount = grid.children.length;
    limit += 9;
    render(previousCount);
  });

  reset.addEventListener('click', async () => {
    town.value = type.value = offer.value = '';
    limit = 9;
    if (await ensureCatalogue()) render();
  });

  root.querySelector('.biens-filtres').hidden = false;

  // Le catalogue est chargé immédiatement pour que les nouvelles annonces,
  // villes et typologies apparaissent sans dépendre du HTML de secours.
  ensureCatalogue();
})();