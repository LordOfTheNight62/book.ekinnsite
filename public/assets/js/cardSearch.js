document.addEventListener('DOMContentLoaded', () => {
  const cardSearchInput = document.querySelector('.card-search-input');
  const clearCardSearchBtn = document.querySelector('.clear-card-search-btn');
  const cards = document.querySelectorAll('.card');

  cardSearchInput.addEventListener('input', () => {
    const filterText = cardSearchInput.value.toLowerCase();

    cards.forEach((card) => {
      let isMatched = false;

      if (card.textContent.toLowerCase().includes(filterText)) {
        isMatched = true;
      }

      if (isMatched) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  clearCardSearchBtn.addEventListener('click', () => {
    cardSearchInput.value = '';
    cards.forEach((card) => {
      card.style.display = '';
    });
  });
});
