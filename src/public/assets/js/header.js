document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('[data-path]');

  links.forEach((link) => {
    const linkPath = link.getAttribute('data-path');
    if (currentPath === linkPath) link.classList.add('active');
    else link.classList.remove('active');
  });

  const headerSearchForms = document.querySelectorAll('.header-search-form');
  const headerSearchBtn = document.querySelectorAll('.header-search-btn');

  headerSearchForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  });

  headerSearchBtn.forEach((searchBtn) => {
    searchBtn.addEventListener('click', () => {
      let query = searchBtn.parentElement.querySelector('.header-search-input').value;
      if (query) {
        window.location.href = '/books/search?q=' + encodeURIComponent(query);
      }
    });

    searchBtn.parentElement.querySelector('.header-search-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  });
});
