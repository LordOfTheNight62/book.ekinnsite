document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('commentForm');
  const nameInput = document.querySelector('input[name="name"]');
  const commentText = document.querySelector('textarea[name="comment"]');
  const commentsField = document.querySelector('.comments-field');
  const commentCount = document.querySelector('.comment-count');
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(commentForm);
    const commentFormData = {};
    formData.forEach((value, key) => {
      commentFormData[key] = value;
    });
    pathParts = window.location.pathname.split('/');
    commentFormData['bookID'] = pathParts[pathParts.length - 1];
    console.log(commentFormData);
    fetch('/api/user-comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Sunucudan gelen cevap:', data);
        const alert = document.querySelector('.alert-sent');
        alert.classList.toggle('d-none');
        nameInput.value = '';
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
        <h5 class="card-title">${data.comment.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
        <p class="card-text">${data.comment.comment}</p>
      </div>`;
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('card', 'my-1', 'w-100');
        commentDiv.innerHTML = commentContent;
        if (commentsField.firstChild) {
          commentsField.insertBefore(commentDiv, commentsField.firstChild); // İlk çocuk olarak ekler
        } else {
          commentsField.appendChild(commentDiv); // Eğer hiç çocuk yoksa, appendChild ile ekler
        }

        commentCount.innerText = `Tüm Yorumlar (${data.statistics.totalComments} adet)`;
        if (alert) {
          setTimeout(() => {
            alert.classList.toggle('d-none');
          }, 10000);
        }
      })
      .catch((err) => {
        console.log('Hata, ', err);
      });
  });
});
