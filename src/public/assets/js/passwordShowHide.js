window.addEventListener('load', () => {
  const btnPasswordToggles = document.querySelectorAll('.password-show-hide-toggle');

  btnPasswordToggles.forEach((btnPasswordToggle) => {
    btnPasswordToggle.addEventListener('click', () => {
      const toggleId = btnPasswordToggle.getAttribute('data-toggle-id');
      const input = document.querySelector(`.user-password-input[data-toggle-id="${toggleId}"]`);
      const eyeIcon = btnPasswordToggle.querySelector('[class*="bi-eye"]');

      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
        eyeIcon.classList.toggle('bi-eye-fill');
        eyeIcon.classList.toggle('bi-eye-slash-fill');
      }
    });
  });
});
