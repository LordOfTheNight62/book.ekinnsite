document.addEventListener('DOMContentLoaded', () => {
  try {
    const cardSearchInput = document.querySelector('.card-search-input');
    const clearCardSearchBtn = document.querySelector('.clear-card-search-btn');
    const cards = document.querySelectorAll('.card');

    // Türkçe karakterleri normalize etme fonksiyonu
    const normalizeText = (text) => {
      const map = {
        ı: 'i',
        İ: 'i',
        ş: 's',
        Ş: 's',
        ğ: 'g',
        Ğ: 'g',
        ü: 'u',
        Ü: 'u',
        ö: 'o',
        Ö: 'o',
        ç: 'c',
        Ç: 'c',
      };
      return text
        .split('')
        .map((char) => map[char] || char)
        .join('');
    };

    cardSearchInput.addEventListener('input', () => {
      const filterText = normalizeText(cardSearchInput.value.toLowerCase());

      cards.forEach((card) => {
        const cardText = normalizeText(card.textContent.toLowerCase());
        let isMatched = false;

        if (cardText.includes(filterText)) {
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
  } catch (err) {
    console.error(err);
  }
});
