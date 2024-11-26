const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');

router.use('/admin-panel', isLoggedIn, isAdmin);

router.get('/admin-panel/books/add-book', bookController.getAddNewBookPage);
router.post('/admin-panel/books/add-book', bookController.addNewBook);

router.get('/admin-panel/books/edit-book/:id', bookController.getEditBookPage);
router.post('/admin-panel/books/edit-book/:id', bookController.updateBookByID);

router.get('/admin-panel/books/delete-book/:id', bookController.getDeleteBookPage);

router.get('/admin-panel/books', bookController.getAllBooksPage);

router.get('/admin-panel/books/search', bookController.getSearchPage);
router.post('/admin-panel/books/search', bookController.searchBookByTerm);

router.get('/admin-panel/books/:id', bookController.getBookDetailPage);

module.exports = router;
