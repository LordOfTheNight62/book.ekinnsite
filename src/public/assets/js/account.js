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

  const userDataForm = document.getElementById('userDataForm');
  const userNameInput = document.querySelector('input[name="userName"]');
  const userSurnameInput = document.querySelector('input[name="userSurname"]');

  userDataForm.addEventListener('click', (e) => {
    if (e.target.closest('.input-edit-btn')) {
      const btn = e.target.closest('.input-edit-btn');
      const input = btn.closest('.input-group').querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  });

  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(userDataForm);
    const userFormData = {};
    formData.forEach((value, key) => {
      userFormData[key] = value;
    });

    fetch('/api/user-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        userNameInput.value = data.userName;
        userSurnameInput.value = data.userSurname;
        const alert = document.querySelector('.alert-saved');
        alert.classList.toggle('d-none');
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Avatar Seçimi

  const avatarSelect = document.querySelector('.avatar-select');
  const avatarImgs = document.querySelectorAll('.avatar-img');

  avatarSelect.addEventListener('change', () => {
    fetch('/api/user-avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userAvatarValue: avatarSelect.value }), // Gönderilen veri
    })
      .then((response) => response.json())
      .then((data) => {
        const { userAvatarValue } = data;
        avatarImgs.forEach((avatarImg) => (avatarImg.src = `/assets/img/avatars/${userAvatarValue}.png`));
        const alert = document.querySelector('.alert-saved');
        alert.classList.toggle('d-none');
        document.getElementById('accountTabs').firstElementChild.querySelector('button').click();
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (alert) {
          setTimeout(() => {
            alert.classList.toggle('d-none');
          }, 10000);
        }
      })
      .catch((err) => {
        console.error('Hata oluştu:', err);
      });
  });
});
