document.addEventListener('DOMContentLoaded', () => {
  const newCategoryForm = document.getElementById('newCategoryForm');
  const editCategoryForm = document.getElementById('editCategoryForm');
  const categoryNameInput = document.querySelector('input[name="categoryName"]');
  const categoryDescText = document.querySelector('textarea[name="categoryDescription"]');
  const categoriesField = document.querySelector('.category-field');
  const categoryCount = document.querySelector('.category-count');
  const addCollapseBtn = document.querySelector('.add-collapse-btn');
  const editCollapseBtn = document.querySelector('.edit-collapse-btn');
  const addCollapse = document.querySelector('.add-collapse');
  const editCollapse = document.querySelector('.edit-collapse');
  const categorySelect = document.getElementById('categorySelect');
  const loading = document.querySelector('.loading');
  const loadingBlock = document.querySelector('.loading-block');

  addCollapseBtn.addEventListener('click', () => {
    editCollapse.classList.contains('show') && editCollapseBtn.click();
  });

  if (Number(categoryCount.getAttribute('data-total-categories')) > 1) {
    editCollapseBtn.classList.remove('d-none');
    editCollapse.classList.remove('d-none');
  }

  if (editCollapseBtn) {
    editCollapseBtn.addEventListener('click', () => {
      addCollapse.classList.contains('show') && addCollapseBtn.click();
    });
  }

  newCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loading.classList.toggle('d-none');
    loadingBlock.classList.toggle('d-none');
    const tbody = document.getElementsByTagName('tbody')[0];
    const formData = new FormData(newCategoryForm);
    const categoryFormData = {};
    formData.forEach((value, key) => {
      categoryFormData[key] = value;
    });

    fetch('/api/add-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.alert) {
          const alert = document.querySelector('.server-alert');
          alert.classList.toggle('d-none');
          alert.querySelector('.alert').innerText = `${data.message}`;
          setTimeout(() => {
            alert.classList.toggle('d-none');
          }, 5000);
          throw new Error('Gerekli alanları doldurun');
        }
        const alert = document.querySelector('.alert-added');
        alert.classList.toggle('d-none');
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
        categoryCount.innerText = `Tüm Kategoriler (${data.statistics.totalCategories} adet)`;
        categoryNameInput.value = '';
        categoryDescText.value = '';
        const categoryRow = `<tr data-category-id="${data.category.id}"><td>${data.category.name}</td><td>${data.category.description}</td><td><a href="javascript:void(0)" class="delete-category btn bg-danger text-light" title="Kategoriyi Sil"><i class="bi bi-trash"></i></a></td></tr>`;
        tbody.innerHTML += categoryRow;
        if (alert) {
          setTimeout(() => {
            alert.classList.toggle('d-none');
          }, 5000);
        }

        categorySelect.innerHTML = '';
        data.categories.forEach((category) => {
          if (category.name !== 'Diğer') {
            categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
          }
        });

        if (data.statistics.totalCategories > 1) {
          editCollapseBtn.classList.remove('d-none');
          editCollapse.classList.remove('d-none');
        }

        if (Number(categoryCount.getAttribute('data-total-categories')) > 1) {
          editCollapseBtn.classList.remove('d-none');
          editCollapse.classList.remove('d-none');
        }
      })
      .catch((err) => {
        console.error('Hata, ', err);
      })
      .finally(() => {
        loading.classList.toggle('d-none');
        loadingBlock.classList.toggle('d-none');
      });
  });

  editCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loading.classList.toggle('d-none');
    loadingBlock.classList.toggle('d-none');
    const updatedCategory = document.querySelector(`[data-category-id="${categorySelect.value}"]`);
    const formData = new FormData(editCategoryForm);
    const categoryFormData = {};
    formData.forEach((value, key) => {
      categoryFormData[key] = value;
    });

    categoryFormData['categoryID'] = categorySelect.value;

    fetch('/api/edit-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.alert) {
          const alert = document.querySelector('.server-alert');
          alert.classList.toggle('d-none');
          alert.querySelector('.alert').innerText = `${data.message}`;
          setTimeout(() => {
            alert.classList.toggle('d-none');
          }, 5000);
          throw new Error('Gerekli alanları doldurun');
        }
        const alert = document.querySelector('.alert-edited');
        alert.classList.toggle('d-none');
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const categoryRow = `<td>${data.updatedCategory.name}</td><td>${data.updatedCategory.description}</td><td><a href="javascript:void(0)" class="delete-category btn bg-danger text-light" title="Kategoriyi Sil"><i class="bi bi-trash"></i></a></td>`;
        updatedCategory.innerHTML = categoryRow;
        if (alert) {
          setTimeout(() => {
            alert.classList.toggle('d-none');
          }, 5000);
        }

        categorySelect.innerHTML = '';
        data.categories.forEach((category) => {
          if (category.name !== 'Diğer') {
            if (category.id === data.updatedCategory.id) {
              categorySelect.innerHTML += `<option value="${category.id}" selected>${category.name}</option>`;
            } else {
              categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
            }
          }
        });
      })
      .catch((err) => {
        console.error('Hata, ', err);
      })
      .finally(() => {
        loading.classList.toggle('d-none');
        loadingBlock.classList.toggle('d-none');
      });
  });

  categoriesField.addEventListener('click', (e) => {
    if (e.target.closest('.delete-category')) {
      loading.classList.toggle('d-none');
      loadingBlock.classList.toggle('d-none');
      const row = e.target.closest('tr');
      const categoryID = row.getAttribute('data-category-id');
      fetch('/api/delete-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryID }),
      })
        .then((response) => response.json())
        .then((data) => {
          const alert = document.querySelector('.alert-deleted');
          alert.classList.toggle('d-none');
          const deletedCategory = document.querySelector(`[data-category-id="${data.deletedCategoryID}"`);
          deletedCategory.remove();
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

          categorySelect.innerHTML = '';
          data.categories.forEach((category) => {
            if (category.name !== 'Diğer') {
              categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
            }
          });

          if (data.statistics.totalCategories <= 1) {
            editCollapseBtn.classList.add('d-none');
            editCollapse.classList.add('d-none');
          }
        })
        .catch((err) => {
          console.error('Hata, ', err);
        })
        .finally(() => {
          loading.classList.toggle('d-none');
          loadingBlock.classList.toggle('d-none');
        });
    }
  });
});
