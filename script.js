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

// BACK TO TOP BUTTON
document.addEventListener("DOMContentLoaded", () => {
  // Voorkomt dat de knop dubbel wordt aangemaakt
  if (document.querySelector(".back-to-top")) return;

  // Knop aanmaken
  const backToTopButton = document.createElement("button");
  backToTopButton.className = "back-to-top";
  backToTopButton.type = "button";
  backToTopButton.setAttribute("aria-label", "Terug naar boven");
  backToTopButton.innerHTML = "↑";

  document.body.appendChild(backToTopButton);

  // CSS automatisch toevoegen via JS
  const style = document.createElement("style");
  style.innerHTML = `
    .back-to-top {
      position: fixed;
      right: 24px;
      bottom: 24px;
      width: 54px;
      height: 54px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #1A1A1A;
      color: #fff;
      border: 2px solid #111;
      border-radius: 50%;
      box-shadow: 3px 4px 0px #111;

      font-family: 'Inter', sans-serif;
      font-size: 24px;
      font-weight: 800;
      line-height: 1;

      cursor: pointer;
      z-index: 9999;

      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(14px);

      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
    }

    .back-to-top.show {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateY(0);
    }

    .back-to-top:hover {
      transform: translateY(-3px);
      box-shadow: 4px 6px 0px #111;
    }

    @media (max-width: 600px) {
      .back-to-top {
        right: 18px;
        bottom: 18px;
        width: 48px;
        height: 48px;
        font-size: 21px;
      }
    }
  `;

  document.head.appendChild(style);

  // Knop tonen na ongeveer 2 schermen scrollen
  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight * 2) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  // Terug naar boven
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
