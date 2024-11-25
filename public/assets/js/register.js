document.addEventListener('DOMContentLoaded', () => {
  const userPasswordInput = document.getElementById('userPasswordInput');
  const passwordValidatorRows = document.querySelectorAll('.password-validator .row .col');

  userPasswordInput.addEventListener('input', () => {
    let value = userPasswordInput.value;

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
