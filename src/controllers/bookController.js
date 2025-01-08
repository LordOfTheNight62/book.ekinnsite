const path = require('path');
const Book = require(path.join(__dirname, '../models/bookModel'));
const Category = require(path.join(__dirname, '../models/categoryModel'));
const Comment = require(path.join(__dirname, '../models/commentModel'));
const { updateSitemap } = require(path.join(__dirname, '../utils/sitemap'));

exports.addNewBook = async (req, res) => {
  const { name, description, author, categoryID } = req.body;
  if (!name || !author || !categoryID || !description) {
    return res.status(302).redirect(`/books/add-book?message=error`);
  }

  const book = new Book(name, description, author, categoryID);
  const userID = req.session.userId;
  try {
    await Book.addBook(book, userID);
    res.redirect('/books/add-book?message=success');
    updateSitemap();
    return;
  } catch (err) {
    console.error('Kitap eklenirken hata meydana geldi:', err);
    return res.redirect(`/books/add-book?message=error`);
  }
};

exports.addNewFavorite = async (req, res) => {
  const { userID, bookID } = req.body;
  try {
    const isFavorite = await Book.isFavorite(userID, bookID);
    if (!isFavorite) {
      const favorites = await Book.addFavorite(userID, bookID);
      return res.json({ message: 'Favorilere başarıyla eklendi', favorites });
    }
  } catch (err) {
    console.error('Kitap eklenirken hata meydana geldi:', err);
    return res.redirect(`/books/add-book?message=error`);
  }
};

exports.deleteFavorite = async (req, res) => {
  const { userID, bookID } = req.body;
  try {
    const isFavorite = await Book.isFavorite(userID, bookID);
    if (isFavorite) {
      await Book.deleteFavorite(userID, bookID);
      const statistics = {
        totalFavorites: (await Book.getFavoritesCountByUserID(userID)) || 0,
      };
      return res.json({ message: 'Favorilerden başarıyla kaldırıldı', deletedBookID: bookID, statistics });
    }
  } catch (err) {
    console.error('Kitap eklenirken hata meydana geldi:', err);
    return res.redirect(`/books/add-book?message=error`);
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
  const { name, description, author, categoryID } = req.body;
  const id = req.params.id;
  if (!name || !author || !categoryID) {
    return res.redirect(`/books/edit-book/${id}?message=error`);
  }

  try {
    const book = new Book(name, description, author, categoryID);
    await Book.updateBook(id, book);
    updateSitemap();
    return res.redirect(`/books/edit-book/${id}?message=success`);
  } catch (err) {
    return res.redirect(`/books/edit-book/${id}?message=error`);
  }
};

exports.getAddNewBookPage = async (req, res) => {
  try {
    const categories = await Category.getCategories();
    res.render('add-book', { title: 'Yeni Kitap Ekle', categories, query: req.query });
  } catch (err) {}
};

exports.getEditBookPage = async (req, res) => {
  try {
    const book = await exports.getBookByID(req, res);
    const categories = await Category.getCategories();
    res.render('edit-book', { title: `${book.name} Kitabını Düzenle`, book, categories, query: req.query || {} });
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
    let isFavorite = false;
    let isLiked = false;
    let isDisliked = false;
    if (req.session.isAuthenticated) {
      const userID = req.session?.userId;
      isFavorite = await Book.isFavorite(userID, book.id);
      isLiked = (await Comment.isLike(userID, book.id)) || null;
      isDisliked = (await Comment.isDislike(userID, book.id)) || null;
    }
    const statistics = {
      totalComments: (await Comment.getAllCommentsCountByBookID(book.id)) || 0,
    };
    const comments = (await Comment.getAllCommentsByBookID(book.id)) || '';
    res.render('book-detail', { title: book.name, book, comments, statistics, isFavorite, isLiked, isDisliked });
  } catch (err) {
    res.status(404).render('error/error.ejs', { title: '404', statusCode: '404', message: 'Sayfa Bulunamadı' });
  }
};

exports.getDeleteBookPage = async (req, res) => {
  const id = req.params.id;
  try {
    await Book.deleteBook(id);
    res.render('delete-book', { title: 'Kitap Sil', deleteStatus: 'success' });
    updateSitemap();
  } catch (err) {
    res.render('delete-book', { title: 'Kitap Sil', deleteStatus: 'error' });
  }
};

exports.searchBookByTerm = async (req, res) => {
  let q = req.query.q || '';
  q = decodeURIComponent(q).trim();
  console.log(q);
  try {
    const results = await Book.searchBook(q);
    res.render('admin/search', { title: `"${q}" için arama sonuçları `, results, searchTerm: q });
  } catch (err) {}
};

exports.getSearchPage = (req, res) => {
  res.render('admin/search', { title: 'Kitap Ara' });
};
