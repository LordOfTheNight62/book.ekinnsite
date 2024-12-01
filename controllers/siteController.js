const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Comment = require('../models/commentModel');
const bookController = require('./bookController');

exports.getHomePage = async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await User.getUserByID(req.session.userId);
      res.render('index', { title: 'Ana Sayfa', user: user });
      return;
    }
    res.render('index', { title: 'Ana Sayfa', user: false });
  } catch (err) {
    console.error(err);
  }
};

exports.getBooksPage = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.render('books', { title: 'Tüm Kitaplar', books });
  } catch (err) {}
};

exports.getBookDetailPage = async (req, res) => {
  try {
    const book = await bookController.getBookByID(req, res);
    const comments = await Comment.getAllComments(req.params.id);
    const statistics = {
      totalComments: await Comment.getAllCommentsCount(book.id),
    };
    res.render('book-detail', { title: book.name, book, comments, statistics });
  } catch (err) {
    res.status(404).render('error/error.ejs', { title: '404', statusCode: '404', message: 'Sayfa Bulunamadı' });
  }
};

exports.searchBookByTerm = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const results = await Book.searchBook(searchTerm);
    res.render('search', { title: `"${searchTerm}" için arama sonuçları `, results, searchTerm });
  } catch (err) {}
};

exports.getSearchPage = (req, res) => {
  res.render('search', { title: 'Kitap Ara' });
};
