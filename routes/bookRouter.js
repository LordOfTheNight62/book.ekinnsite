const express = require('express');
const router = express.Router();

const siteController = require('../controllers/siteController');
const bookController = require('../controllers/bookController');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');

router.get('/books', siteController.getBooksPage);
router.get('/books/search', siteController.getSearchPage);
router.post('/books/search', siteController.searchBookByTerm);
router.get('/books/add-book', isLoggedIn, bookController.getAddNewBookPage);
router.post('/books/add-book', isLoggedIn, bookController.addNewBook);
router.get('/books/edit-book/:id', bookController.getEditBookPage);
router.post('/books/edit-book/:id', bookController.updateBookByID);
router.get('/books/delete-book/:id', bookController.getDeleteBookPage);
router.get('/books/:id', siteController.getBookDetailPage);

router.use('/admin-panel', isLoggedIn, isAdmin);

router.get('/admin-panel/books', bookController.getAllBooksPage);

router.get('/admin-panel/books/search', bookController.getSearchPage);
router.post('/admin-panel/books/search', bookController.searchBookByTerm);

module.exports = router;
