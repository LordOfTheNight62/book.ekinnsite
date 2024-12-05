document.addEventListener('DOMContentLoaded', () => {
  const newCategoryForm = document.getElementById('newCategoryForm');
  const categoryNameInput = document.querySelector('input[name="categoryName"]');
  const categoryDescText = document.querySelector('textarea[name="categoryDescription"]');
  const categoriesField = document.querySelector('.category-field');
  const categoryCount = document.querySelector('.category-count');

  newCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(newCategoryForm);
    const categoryFormData = {};
    formData.forEach((value, key) => {
      categoryFormData[key] = value;
    });

    categoryFormData['categoryID'] = document.querySelector('[data-category-id]').getAttribute('data-category-id');

    fetch('/api/add-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        const alert = document.querySelector('.alert-added');
        alert.classList.toggle('d-none');
        categoryCount.innerText = `Tüm Kategoriler (${data.statistics.totalComments} adet)`;
        categoryNameInput.value = '';
        categoryDescText.value = '';
        if (alert) {
          setTimeout(() => {
            alert.classList.toggle('d-none');
          }, 5000);
        }
      })
      .catch((err) => {
        console.log('Hata, ', err);
      });
  });

  categoriesField.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.closest('.delete-category')) {
      const btn = e.target.closest('.delete-category');
      const categoryID = btn.getAttribute('data-category-id');
      fetch('/api/delete-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryID }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Sunucudan gelen cevap:', data);
          const alert = document.querySelector('.alert-deleted');
          alert.classList.toggle('d-none');
          const deletedCategory = document.querySelector(`[data-category-id="${data.deletedCategoryID}"`);
          deletedCategory.closest('tr').remove();
          document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
          categoryCount.innerText =
            data.statistics.totalCategories > 0
              ? `Tüm Kategoriler (${data.statistics.totalCategories} adet)`
              : 'Tüm Kategoriler (Kategori Yok)';

          if (data.statistics.totalComments === 0) document.querySelector('.category-field').remove();
          if (alert) {
            setTimeout(() => {
              alert.classList.toggle('d-none');
            }, 5000);
          }
        })
        .catch((err) => {
          console.log('Hata, ', err);
        });
    }
  });
});
