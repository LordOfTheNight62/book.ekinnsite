document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('[data-path]');

  links.forEach((link) => {
    const linkPath = link.getAttribute('data-path');
    if (currentPath === linkPath) link.classList.add('active');
    else link.classList.remove('active');
  });

  const headerSearchBtn = document.querySelectorAll('.header-search-btn');

  headerSearchBtn.forEach((searchBtn) => {
    searchBtn.addEventListener('click', function () {
      let query = searchBtn.parentElement.querySelector('.header-search-input').value;
      console.log(query);
      if (query) {
        window.location.href = '/books/search?q=' + encodeURIComponent(query);
      }
    });
  });

  document.querySelectorAll('.header-search-btn').addEventListener('click', function () {
    let query = document.querySelector('.header-search-input').value;
    console.log(query);
    if (query) {
      window.location.href = '/books/search?q=' + encodeURIComponent(query);
    }
  });
});
