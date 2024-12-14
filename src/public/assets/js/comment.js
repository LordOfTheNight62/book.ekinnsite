document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('commentForm');
  const commentText = document.querySelector('textarea[name="comment"]');
  const commentsField = document.querySelector('.comments-field');
  const commentCount = document.querySelector('.comment-count');

  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(commentForm);
      const commentFormData = {};
      formData.forEach((value, key) => {
        commentFormData[key] = value;
      });

      commentFormData['bookID'] = document.getElementsByTagName('main')[0].getAttribute('data-book-id');

      fetch('/api/user-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      })
        .then((response) => response.json())
        .then((data) => {
          const alert = document.querySelector('.alert-sent');
          alert.classList.toggle('d-none');
          commentText.value = '';
          const date = new Date(data.comment.created_at).toLocaleString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Istanbul',
          });

          const commentContent = `<div class="card-body">
          <h5 class="card-title comment-user-name"><img class="rounded-circle avatar-img" src="/assets/img/avatars/${data.comment.avatar}.png" width="48" loading="lazy"> ${data.comment.name} <span class="card-subtitle text-muted comment-date">- ${date} </span></h5>
          <p class="card-text comment-text">${data.comment.comment}</p>
          <div>
          <button class="add-like-btn btn p-0" type="button"><i class="bi bi-hand-thumbs-up text-primary"></i> <span class="like-count">0</span></button>
          <button class="add-dislike-btn btn p-0" type="button"><i class="bi bi-hand-thumbs-down text-danger"></i> <span class="dislike-count">0</span></button>
          </div>
        </div>`;
          const commentDiv = document.createElement('div');
          commentDiv.classList.add('card', 'my-1', 'w-100');
          commentDiv.setAttribute('data-comment-id', `${data.comment.id}`);
          commentDiv.innerHTML = commentContent;
          if (commentsField.firstChild) {
            commentsField.insertBefore(commentDiv, commentsField.firstChild); // İlk çocuk olarak ekler
          } else {
            commentsField.appendChild(commentDiv); // Eğer hiç çocuk yoksa, appendChild ile ekler
          }
          commentsField.firstChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
          commentCount.innerText = `Tüm Yorumlar (${data.statistics.totalComments} adet)`;
          if (alert) {
            setTimeout(() => {
              alert.classList.toggle('d-none');
            }, 10000);
          }
        })
        .catch((err) => {
          console.error('Hata, ', err);
        });
    });
  }
});
