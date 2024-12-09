document.addEventListener('DOMContentLoaded', () => {
  const allCommentsField = document.querySelector('.all-comments-field');
  const commentCount = document.querySelector('.comment-count');
  const loading = document.querySelector('.loading');
  const loadingBlock = document.querySelector('.loading-block');

  allCommentsField.addEventListener('click', (e) => {
    if (e.target.closest('.delete-comment')) {
      loading.classList.toggle('d-none');
      loadingBlock.classList.toggle('d-none');
      const btn = e.target.closest('.delete-comment');
      const commentID = btn.getAttribute('data-comment-id');
      fetch('/api/user-delete-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentID }),
      })
        .then((response) => response.json())
        .then((data) => {
          const alert = document.querySelector('.alert-deleted');
          alert.classList.toggle('d-none');
          document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const deletedComment = document.querySelector(`[data-comment-id="${data.deletedCommentID}"`);
          deletedComment.closest('.card').remove();
          commentCount.innerText =
            data.statistics.totalComments > 0
              ? `Tüm Yorumlar (${data.statistics.totalComments} adet)`
              : 'Tüm Yorumlar (Yorum Yok)';

          if (data.statistics.totalComments === 0) document.querySelector('.search-field').remove();
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
