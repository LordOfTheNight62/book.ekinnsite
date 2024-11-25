document.addEventListener('DOMContentLoaded', () => {
  const openDeleteAccountModalBtn = document.getElementById('openDeleteAccountModalBtn');
  const userNewPasswordInput = document.getElementById('userNewPasswordInput');
  const passwordValidatorRows = document.querySelectorAll('.password-validator .row .col');

  const urlParams = new URLSearchParams(window.location.search);
  const req = urlParams.get('req');
  if (req) {
    setTimeout(() => {
      urlParams.delete('req');
      if (urlParams.toString()) {
        location.search = urlParams.toString();
      } else {
        history.replaceState({}, '', window.location.pathname);
      }
    }, 3000);
  }
  try {
    openDeleteAccountModalBtn.click();
  } catch (err) {}

  userNewPasswordInput.addEventListener('input', () => {
    let value = userNewPasswordInput.value;

    if (value.length >= 8) {
      passwordValidatorRows[0].classList.toggle('text-success', true);
      passwordValidatorRows[0].classList.toggle('text-danger', false);
    } else {
      passwordValidatorRows[0].classList.toggle('text-success', false);
      passwordValidatorRows[0].classList.toggle('text-danger', true);
    }

    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) {
      passwordValidatorRows[1].classList.toggle('text-success', true);
      passwordValidatorRows[1].classList.toggle('text-danger', false);
    } else {
      passwordValidatorRows[1].classList.toggle('text-success', false);
      passwordValidatorRows[1].classList.toggle('text-danger', true);
    }

    if (/[0-9]/.test(value)) {
      passwordValidatorRows[2].classList.toggle('text-success', true);
      passwordValidatorRows[2].classList.toggle('text-danger', false);

      if (!/(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321|210)/.test(value)) {
        passwordValidatorRows[3].classList.toggle('text-success', true);
        passwordValidatorRows[3].classList.toggle('text-danger', false);
      } else {
        passwordValidatorRows[3].classList.toggle('text-success', false);
        passwordValidatorRows[3].classList.toggle('text-danger', true);
      }
    } else {
      passwordValidatorRows[2].classList.toggle('text-success', false);
      passwordValidatorRows[2].classList.toggle('text-danger', true);
      passwordValidatorRows[3].classList.toggle('text-success', false);
      passwordValidatorRows[3].classList.toggle('text-danger', true);
    }
  });
});
