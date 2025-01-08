document.addEventListener('DOMContentLoaded', () => {
  const userPasswordInput = document.getElementById('userPasswordInput');
  const passwordValidatorRows = document.querySelectorAll('.password-validator .row .col');
  const validatorIcons = document.querySelectorAll('.validator-icon');

  userPasswordInput.addEventListener('input', () => {
    let value = userPasswordInput.value;

    if (value.length >= 8) {
      passwordValidatorRows[0].classList.toggle('text-success', true);
      passwordValidatorRows[0].classList.toggle('text-danger', false);
      validatorIcons[0].className = 'validator-icon bi bi-patch-check-fill';
    } else {
      passwordValidatorRows[0].classList.toggle('text-success', false);
      passwordValidatorRows[0].classList.toggle('text-danger', true);
      validatorIcons[0].className = 'validator-icon bi bi-x-circle-fill';
    }

    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) {
      passwordValidatorRows[1].classList.toggle('text-success', true);
      passwordValidatorRows[1].classList.toggle('text-danger', false);
      validatorIcons[1].className = 'validator-icon bi bi-patch-check-fill';
    } else {
      passwordValidatorRows[1].classList.toggle('text-success', false);
      passwordValidatorRows[1].classList.toggle('text-danger', true);
      validatorIcons[1].className = 'validator-icon bi bi-x-circle-fill';
    }

    if (/[0-9]/.test(value)) {
      passwordValidatorRows[2].classList.toggle('text-success', true);
      passwordValidatorRows[2].classList.toggle('text-danger', false);
      validatorIcons[2].className = 'validator-icon bi bi-patch-check-fill';

      if (!/(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321|210)/.test(value)) {
        passwordValidatorRows[3].classList.toggle('text-success', true);
        passwordValidatorRows[3].classList.toggle('text-danger', false);
        validatorIcons[3].className = 'validator-icon bi bi-patch-check-fill';
      } else {
        passwordValidatorRows[3].classList.toggle('text-success', false);
        passwordValidatorRows[3].classList.toggle('text-danger', true);
        validatorIcons[3].className = 'validator-icon bi bi-x-circle-fill';
      }
    } else {
      passwordValidatorRows[2].classList.toggle('text-success', false);
      passwordValidatorRows[2].classList.toggle('text-danger', true);
      passwordValidatorRows[3].classList.toggle('text-success', false);
      passwordValidatorRows[3].classList.toggle('text-danger', true);
      validatorIcons[2].className = 'validator-icon bi bi-x-circle-fill';
      validatorIcons[3].className = 'validator-icon bi bi-x-circle-fill';
    }
  });
});
