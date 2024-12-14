document.addEventListener('DOMContentLoaded', () => {
  const commentsField = document.querySelector('.comments-field');

  commentsField.addEventListener('click', (e) => {
    if (e.target.closest('.add-like-btn')) {
      const likeBtn = e.target.closest('.add-like-btn');
      const dislikeBtn = likeBtn.parentElement.querySelector('.add-dislike-btn');
      const likeCount = likeBtn.querySelector('.like-count');
      const dislikeCount = dislikeBtn.querySelector('.dislike-count');

      const likeData = {
        userID: document.querySelector('[data-user-id]').getAttribute('data-user-id'),
        commentID: likeBtn.closest('.card').getAttribute('data-comment-id'),
        isLike: true,
      };

      if (likeData.userID) {
        fetch('/api/add-like', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(likeData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedLike) {
              likeBtn.querySelector('.bi').className = 'bi bi-hand-thumbs-up text-primary';
            } else {
              likeBtn.querySelector('.bi').className = 'bi bi-hand-thumbs-up-fill text-primary';
            }
            dislikeBtn.querySelector('.bi').className = 'bi bi-hand-thumbs-down text-danger';

            likeCount.innerText = `${data.statistics.totalCommentLikes}`;
            dislikeCount.innerText = `${data.statistics.totalCommentDislikes}`;
          })
          .catch((err) => console.error('Hata: ', err));
      }
    } else if (e.target.closest('.add-dislike-btn')) {
      const dislikeBtn = e.target.closest('.add-dislike-btn');
      const likeBtn = dislikeBtn.parentElement.querySelector('.add-like-btn');
      const dislikeCount = dislikeBtn.querySelector('.dislike-count');
      const likeCount = likeBtn.querySelector('.like-count');

      const dislikeData = {
        userID: document.querySelector('[data-user-id]').getAttribute('data-user-id'),
        commentID: dislikeBtn.closest('.card').getAttribute('data-comment-id'),
        isLike: false,
      };

      if (dislikeData.userID) {
        fetch('/api/add-dislike', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dislikeData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedDislike) {
              dislikeBtn.querySelector('.bi').className = 'bi bi-hand-thumbs-down text-danger';
            } else {
              dislikeBtn.querySelector('.bi').className = 'bi bi-hand-thumbs-down-fill text-primary';
            }
            likeBtn.querySelector('.bi').className = 'bi bi-hand-thumbs-up text-primary';

            likeCount.innerText = `${data.statistics.totalCommentLikes}`;
            dislikeCount.innerText = `${data.statistics.totalCommentDislikes}`;
          })
          .catch((err) => console.error('Hata: ', err));
      }
    }
  });
});
