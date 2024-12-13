const User = require('../models/userModel');
const Book = require('../models/bookModel');

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

exports.getPrivacyPoliciesPage = (req, res) => {
  res.render('privacy-policies', { title: 'Gizlilik Politikası' });
};
