const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');

router.get('/admin-panel/books/add-book', isLoggedIn, isAdmin, bookController.getAddNewBookPage);
router.post;
'/admin-panel/books/add-book', isLoggedIn, isAdmin, bookController.addNewBook;

router.get('/admin-panel/books/edit-book/:id', isLoggedIn, isAdmin, bookController.getEditBookPage);
router.post('/admin-panel/books/edit-book/:id', isLoggedIn, isAdmin, bookController.updateBookByID);

router.get(
  '/admin-panel/books/delete-book/:id',
  isLoggedIn,
  isAdmin,
  bookController.getDeleteBookPage
);

router.get('/admin-panel/books', isLoggedIn, isAdmin, bookController.getAllBooksPage);

router.get('/admin-panel/books/search', isLoggedIn, isAdmin, bookController.getSearchPage);
router.post('/admin-panel/books/search', isLoggedIn, isAdmin, bookController.searchBookByTerm);

router.get('/admin-panel/books/:id', isLoggedIn, isAdmin, bookController.getBookDetailPage);

module.exports = router;
