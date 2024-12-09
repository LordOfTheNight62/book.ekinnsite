document.addEventListener('DOMContentLoaded', () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

  const printBtn = document.querySelector('.print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }
});
