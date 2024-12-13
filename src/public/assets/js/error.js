window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');

  if (message) {
    setTimeout(() => {
      const alerts = document.querySelectorAll('.alert');

      alerts.forEach((alert) => alert.classList.add('d-none'));
      urlParams.delete('message');
      if (urlParams.toString()) {
        location.search = urlParams.toString();
      } else {
        history.replaceState({}, '', window.location.pathname);
      }
    }, 10000);
  }
});
