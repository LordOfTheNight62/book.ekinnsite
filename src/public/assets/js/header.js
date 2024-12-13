document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('[data-path]');

  links.forEach((link) => {
    const linkPath = link.getAttribute('data-path');
    if (currentPath === linkPath) link.classList.add('active');
    else link.classList.remove('active');
  });
});
