const path = require('path');
const User = require(path.join(__dirname, '../models/userModel'));
const Book = require(path.join(__dirname, '../models/bookModel'));

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
  let q = req.query.q || '';
  q = decodeURIComponent(q).trim();
  try {
    const results = await Book.searchBook(q);
    res.render('search', { title: `"${q}" için arama sonuçları `, results, searchTerm: q });
  } catch (err) {}
};

exports.getSearchPage = (req, res) => {
  res.render('search', { title: 'Kitap Ara' });
};

exports.getPrivacyPoliciesPage = (req, res) => {
  res.render('privacy-policies', { title: 'Gizlilik Politikası' });
};
