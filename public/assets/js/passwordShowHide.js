window.addEventListener('load', () => {
  const userPasswordInput = document.getElementById('userPasswordInput');
  const btnPasswordToggle = document.querySelector('.password-show-hide-toggle');
  const eyeIcon = btnPasswordToggle.querySelector('.bi');

  btnPasswordToggle.addEventListener('click', () => {
    userPasswordInput.type = userPasswordInput.type === 'password' ? 'text' : 'password';
    eyeIcon.classList.toggle('bi-eye-fill');
    eyeIcon.classList.toggle('bi-eye-slash-fill');
  });
});
