(() => {
  const root = document.querySelector('[data-catalogue]');
  if (!root) return;
  const cards = [...root.querySelectorAll('.bien-card')];
  const town = root.querySelector('#biens-ville');
  const type = root.querySelector('#biens-type');
  const offer = root.querySelector('#biens-offre');
  const count = root.querySelector('#biens-resultat');
  const more = root.querySelector('#biens-plus');
  let limit = 9;
  function render() {
    const matches = cards.filter(card => (!town.value || card.dataset.ville === town.value) && (!type.value || card.dataset.type === type.value) && (!offer.value || card.dataset.offre === offer.value));
    const visible = new Set(matches.slice(0, limit));
    cards.forEach(card => { card.hidden = !visible.has(card); });
    count.textContent = matches.length ? `${matches.length} bien${matches.length > 1 ? 's' : ''} · ${visible.size} affiché${visible.size > 1 ? 's' : ''}` : 'Aucun bien ne correspond à ces critères. Essayez une autre commune ou un autre type de bien.';
    more.hidden = matches.length <= limit;
  }
  [town, type, offer].forEach(input => input.addEventListener('change', () => { limit = 9; render(); }));
  more.addEventListener('click', () => {
    const previous = new Set(cards.filter(card => !card.hidden));
    limit += 9; render();
    const next = cards.find(card => !card.hidden && !previous.has(card));
    if (next) next.querySelector('a').focus({preventScroll:true});
  });
  root.querySelector('#biens-reset').addEventListener('click', () => {
    town.value = type.value = offer.value = ''; limit = 9; render();
  });
  root.querySelector('.biens-filtres').hidden = false;
  render();
})();
