document.addEventListener('DOMContentLoaded', () => {
  const tableSearchInput = document.querySelector('.table-search-input');
  const clearTableSearchBtn = document.querySelector('.clear-table-search-btn');
  const rows = document.querySelectorAll('tbody tr');

  tableSearchInput.addEventListener('input', () => {
    const filterText = tableSearchInput.value.toLowerCase();

    rows.forEach((row) => {
      const cells = row.getElementsByTagName('td');
      let isMatched = false;

      for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent.toLowerCase().includes(filterText)) {
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
});
