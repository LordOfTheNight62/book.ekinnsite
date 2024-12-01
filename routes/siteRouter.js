const express = require('express');
const router = express.Router();

const siteController = require('../controllers/siteController');

router.get('/', siteController.getHomePage);
router.get('/books', siteController.getBooksPage);
router.get('/books/search', siteController.getSearchPage);
router.post('/books/search', siteController.searchBookByTerm);
router.get('/books/:id', siteController.getBookDetailPage);

module.exports = router;
