const express = require('express');
const router = express.Router();
const path = require('path');

const siteController = require(path.join(__dirname, '../controllers/siteController'));
const bookController = require(path.join(__dirname, '../controllers/bookController'));
const { isLoggedIn, isAdmin, checkBookOwnerShip } = require(path.join(__dirname, '../middlewares/auth'));

router.get('/books', siteController.getBooksPage);
router.get('/books/search', (req, res, next) => {
  if (req.query.q) {
    siteController.searchBookByTerm(req, res);
  } else {
    siteController.getSearchPage(req, res);
  }
});
router.get('/books/add-book', isLoggedIn, bookController.getAddNewBookPage);
router.post('/books/add-book', isLoggedIn, bookController.addNewBook);
router.get('/books/edit-book/:id', checkBookOwnerShip, bookController.getEditBookPage);
router.post('/books/edit-book/:id', checkBookOwnerShip, bookController.updateBookByID);
router.get('/books/delete-book/:id', checkBookOwnerShip, bookController.getDeleteBookPage);
router.get('/:author/:title-b:id', bookController.getBookDetailPage);

module.exports = router;
