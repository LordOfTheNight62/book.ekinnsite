document.addEventListener('DOMContentLoaded', () => {
  try {
    const tableSearchInput = document.querySelector('.table-search-input');
    const clearTableSearchBtn = document.querySelector('.clear-table-search-btn');
    const rows = document.querySelectorAll('tbody tr');

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

    tableSearchInput.addEventListener('input', () => {
      const filterText = normalizeText(tableSearchInput.value.toLowerCase());

      rows.forEach((row) => {
        const cells = row.getElementsByTagName('td');
        let isMatched = false;

        for (let i = 0; i < cells.length; i++) {
          if (normalizeText(cells[i].textContent.toLowerCase()).includes(filterText)) {
            isMatched = true;
          }
        }

        if (isMatched) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });

    clearTableSearchBtn.addEventListener('click', () => {
      tableSearchInput.value = '';
      rows.forEach((row) => {
        row.style.display = '';
      });
    });
  } catch (err) {}
});
