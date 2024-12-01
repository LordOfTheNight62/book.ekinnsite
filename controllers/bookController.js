const Book = require('../models/bookModel');
const Comment = require('../models/commentModel');

exports.addNewBook = async (req, res) => {
  let { name, description, author, categoryID, price } = req.body;
  if (!name || !author || !categoryID || !price) {
    return res.status(302).redirect(`/admin-panel/books/add-book?message=error`);
  }
  price = parseFloat(price).toFixed(2);
  const book = new Book(name, description, author, categoryID, price);
  try {
    await Book.addBook(book);
    return res.redirect('/admin-panel/books/add-book?message=success');
  } catch (err) {
    console.error('Kitap eklenirken hata meydana geldi:', err);
    return res.redirect(`/admin-panel/books/add-book?message=error`);
  }
};

exports.getBookByID = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.getBook(id);
    return book;
  } catch (err) {}
};

exports.updateBookByID = async (req, res) => {
  const { name, description, author, categoryID, price } = req.body;
  const id = req.params.id;
  if (!name || !author || !categoryID || !price) {
    return res.redirect(`/admin-panel/books/edit-book/${id}?message=error`);
  }
  const book = new Book(name, description, author, categoryID, price);

  try {
    await book.updateBook(id, book);
    return res.redirect(`/admin-panel/books/edit-book/${id}?message=success`);
  } catch (err) {
    return res.redirect(`/admin-panel/books/edit-book/${id}?message=error`);
  }
};

exports.getAddNewBookPage = (req, res) => {
  res.render('admin/add-book', { title: 'Yeni Kitap Ekle', query: req.query });
};

exports.getEditBookPage = async (req, res) => {
  try {
    const book = await exports.getBookByID(req, res);
    res.render('admin/edit-book', { title: `${book.name} Kitabını Düzenle`, book, query: req.query || {} });
  } catch (err) {}
};

exports.getAllBooksPage = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.render('admin/books', { title: 'Tüm Kitaplar', books });
  } catch (err) {}
};

exports.getBookDetailPage = async (req, res) => {
  try {
    const book = await exports.getBookByID(req, res);
    const statistics = {
      totalComments: (await Comment.getAllCommentsCountByBookID(book.id)) || 0,
    };
    const comments = (await Comment.getAllCommentsByBookID(book.id)) || '';
    res.render('admin/book-detail', { title: book.name, book, comments, statistics });
  } catch (err) {
    res.status(404).render('error/error.ejs', { title: '404', statusCode: '404', message: 'Sayfa Bulunamadı' });
  }
};

exports.getDeleteBookPage = async (req, res) => {
  const id = req.params.id;
  try {
    await Book.deleteBook(id);
    res.render('admin/delete-book', { title: 'Kitap Sil', deleteStatus: 'success' });
  } catch (err) {
    res.render('admin/delete-book', { title: 'Kitap Sil', deleteStatus: 'error' });
  }
};

exports.searchBookByTerm = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const results = await Book.searchBook(searchTerm);
    res.render('admin/search', { title: `"${searchTerm}" için arama sonuçları `, results, searchTerm });
  } catch (err) {}
};

exports.getSearchPage = (req, res) => {
  res.render('admin/search', { title: 'Kitap Ara' });
};
