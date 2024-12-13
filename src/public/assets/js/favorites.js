document.addEventListener('DOMContentLoaded', () => {
  const addFavoriteBtn = document.querySelector('.add-favorite-btn');
  const deleteFavoriteBtn = document.querySelector('.delete-favorite-btn');
  const loading = document.querySelector('.loading');
  const loadingBlock = document.querySelector('.loading-block');
  if (addFavoriteBtn) {
    const userID = document.querySelector('[data-user-id]').getAttribute('data-user-id');
    const bookID = document.querySelector('[data-book-id]').getAttribute('data-book-id');
    addFavoriteBtn.addEventListener('click', () => {
      addFavoriteBtn.classList.toggle('d-none');
      deleteFavoriteBtn.classList.toggle('d-none');
      loading.classList.toggle('d-none');
      loadingBlock.classList.toggle('d-none');
      fetch('/api/add-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, bookID }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error('Hata, ', err);
        })
        .finally(() => {
          loading.classList.toggle('d-none');
          loadingBlock.classList.toggle('d-none');
        });
    });
  }

  if (deleteFavoriteBtn) {
    const userID = document.querySelector('[data-user-id]').getAttribute('data-user-id');
    const bookID = document.querySelector('[data-book-id]').getAttribute('data-book-id');
    deleteFavoriteBtn.addEventListener('click', () => {
      addFavoriteBtn.classList.toggle('d-none');
      deleteFavoriteBtn.classList.toggle('d-none');
      loading.classList.toggle('d-none');
      loadingBlock.classList.toggle('d-none');
      fetch('/api/delete-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, bookID }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error('Hata, ', err);
        })
        .finally(() => {
          loading.classList.toggle('d-none');
          loadingBlock.classList.toggle('d-none');
        });
    });
  }
});
