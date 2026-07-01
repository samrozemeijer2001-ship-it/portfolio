// ============================================
// Categorie-navigatie: filtert projectkaarten
// ============================================
document.addEventListener('DOMContentLoaded', () => {

  const tabs = document.querySelectorAll('.category-tab');
  const cards = document.querySelectorAll('.grid .card');
  const emptyState = document.querySelector('.empty-state');

  if (!tabs.length || !cards.length) return;

  function showCards(category) {
    let visibleCount = 0;

    cards.forEach((card) => {
      const isFeatured = card.dataset.featured === 'true';
      const cardCategory = card.dataset.category;

      const shouldShow =
        category === 'parels'
          ? isFeatured
          : cardCategory === category;

      if (shouldShow) {
        card.classList.remove('is-hidden');
        card.classList.add('is-visible');
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
        card.classList.remove('is-visible');
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // actieve status bijwerken
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // kaarten filteren op gekozen categorie
      const category = tab.dataset.category;
      showCards(category);
    });
  });

  // Standaard tab ("De Parels") tonen bij laden van de pagina
  const defaultTab = document.querySelector('.category-tab.active') || tabs[0];
  showCards(defaultTab.dataset.category);

});
