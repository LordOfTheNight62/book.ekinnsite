document.addEventListener('DOMContentLoaded', () => {
  const redirectTimer = document.querySelector('.redirect-timer');
  let count = 10;

  const countdown = setInterval(() => {
    count--;
    if (count < 0) {
      clearInterval(countdown);
      window.location.href = 'https://book.ekinn.site/';
    } else if (count >= 0) {
      redirectTimer.innerText = count;
    }
  }, 1000);
});
