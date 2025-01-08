document.addEventListener('DOMContentLoaded', () => {
  const addBookForm = document.getElementById('addBookForm');
  const bookDescriptionInput = document.querySelector('input[name="description"]');
  const quill = new Quill('#description-editor', {
    theme: 'snow',
    placeholder: 'Kitap Açıklaması Ekleyin (Zorunlu)',
    modules: {
      toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], [{ header: [3, false] }]],
    },
  });

  addBookForm.addEventListener('submit', () => {
    let bookDescription = quill.root.innerHTML;
    bookDescription = bookDescription.replace(/(<p><br><\/p>\s*)+/g, '');
    bookDescription = bookDescription.replace(/^<p><br><\/p>/, '');
    bookDescription = bookDescription.replace(/<p><br><\/p>$/, '');
    bookDescriptionInput.value = bookDescription;
  });
});
