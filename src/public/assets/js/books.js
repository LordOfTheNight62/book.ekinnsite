document.addEventListener('DOMContentLoaded', () => {
  const maxLength = 50;
  const titles = document.querySelectorAll('.card-title');
  const authors = document.querySelectorAll('.card-author');
  const categories = document.querySelectorAll('.card-category');

  titles.forEach((title) => {
    if (title.textContent.length > maxLength) {
      title.textContent = title.textContent.slice(0, maxLength).trim() + '...';
    }
  });

  authors.forEach((author) => {
    if (author.textContent.length > maxLength) {
      author.textContent = author.textContent.slice(0, maxLength).trim() + '...';
    }
  });

  categories.forEach((category) => {
    if (category.textContent.length > maxLength) {
      category.textContent = category.textContent.slice(0, maxLength).trim() + '...';
    }
  });

  // Tüm taraycılar için sürükleme engelleme
  if (document.querySelectorAll('.no-drag')) {
    document.querySelectorAll('.no-drag').forEach((element) => {
      element.addEventListener('dragstart', function (event) {
        event.preventDefault();
      });
    });
  }
});
