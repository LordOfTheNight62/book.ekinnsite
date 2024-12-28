document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');

  searchForm.addEventListener('submit', () => {
    const input = searchForm.querySelector('input[name="q"]');
    input.value = encodeURIComponent(input.value);
  });
});
