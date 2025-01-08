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
    if (/^(<p>\s*(<br>\s*)?<\/p>\s*)+$/.test(bookDescription)) {
      bookDescription = '';
    } else {
      // Diğer durumlarda gereksiz boş paragrafları temizle
      bookDescription = bookDescription.replace(/(<p><br><\/p>\s*)+/g, '');
      bookDescription = bookDescription.replace(/^<p><br><\/p>/, '');
      bookDescription = bookDescription.replace(/<p><br><\/p>$/, '').trim();
    }
    console.log(bookDescription);
    bookDescriptionInput.value = bookDescription;
  });
});
