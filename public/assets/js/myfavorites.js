document.addEventListener('DOMContentLoaded', () => {
  const myFavoritesField = document.querySelector('.my-favorites-field');
  const favoritesCount = document.querySelector('.favorites-count');
  const loading = document.querySelector('.loading');
  const loadingBlock = document.querySelector('.loading-block');

  myFavoritesField.addEventListener('click', (e) => {
    if (e.target.closest('.delete-favorite-btn')) {
      loading.classList.toggle('d-none');
      loadingBlock.classList.toggle('d-none');
      const userID = document.querySelector('[data-user-id]').getAttribute('data-user-id');
      const bookID = document.querySelector('[data-book-id]').getAttribute('data-book-id');
      const btn = e.target.closest('delete-favorite-btn');
      fetch('/api/delete-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, bookID }),
      })
        .then((response) => response.json())
        .then((data) => {
          const alert = document.querySelector('.alert-deleted');
          alert.classList.toggle('d-none');
          const deletedFavorite = document.querySelector(`[data-book-id="${data.deletedBookID}"`);
          deletedFavorite.closest('.card').remove();
          document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
          favoritesCount.innerText =
            data.statistics.totalFavorites > 0
              ? `Favori Kitaplarım (${data.statistics.totalFavorites} adet)`
              : 'Favori Kitaplarım (Kitap Yok)';

          if (data.statistics.totalFavorites === 0) document.querySelector('.search-field').remove();
          if (alert) {
            setTimeout(() => {
              alert.classList.toggle('d-none');
            }, 10000);
          }
        })
        .catch((err) => {
          console.error('Hata, ', err);
        })
        .finally(() => {
          loading.classList.toggle('d-none');
          loadingBlock.classList.toggle('d-none');
        });
    }
  });
});
