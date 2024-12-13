const express = require('express');
const router = express.Router();
const path = require('path');

const siteController = require(path.join(__dirname, '../controllers/siteController'));
const bookController = require(path.join(__dirname, '../controllers/bookController'));
const { isLoggedIn, isAdmin, checkBookOwnerShip } = require(path.join(__dirname, '../middlewares/auth'));

router.get('/books', siteController.getBooksPage);
router.get('/books/search', siteController.getSearchPage);
router.post('/books/search', siteController.searchBookByTerm);
router.get('/books/add-book', isLoggedIn, bookController.getAddNewBookPage);
router.post('/books/add-book', isLoggedIn, bookController.addNewBook);
router.get('/books/edit-book/:id', checkBookOwnerShip, bookController.getEditBookPage);
router.post('/books/edit-book/:id', checkBookOwnerShip, bookController.updateBookByID);
router.get('/books/delete-book/:id', checkBookOwnerShip, bookController.getDeleteBookPage);
router.get('/books/:author/:title-b:id', bookController.getBookDetailPage);

router.use('/admin-panel', isLoggedIn, isAdmin);

router.get('/admin-panel/books', bookController.getAllBooksPage);

router.get('/admin-panel/books/search', bookController.getSearchPage);
router.post('/admin-panel/books/search', bookController.searchBookByTerm);

module.exports = router;
