const express = require('express');
const router = express.Router();
const path = require('path');

const { isLoggedIn, isAdmin } = require(path.join(__dirname, '../middlewares/auth'));
const adminController = require(path.join(__dirname, '../controllers/adminController'));
const bookController = require(path.join(__dirname, '../controllers/bookController'));
const categoryController = require(path.join(__dirname, '../controllers/categoryController'));

router.use('/admin-panel', isLoggedIn, isAdmin);

router.get('/admin-panel', adminController.getAdminPanelPage);
router.get('/admin-panel/books', bookController.getAllBooksPage);
router.get('/admin-panel/books/search', (req, res, next) => {
  if (req.query.q) {
    bookController.searchBookByTerm(req, res);
  } else {
    bookController.getSearchPage(req, res);
  }
});
router.get('/admin-panel/users', adminController.getAllUsersPage);
router.get('/admin-panel/categories', adminController.getCategoriesPage);
router.post('/api/add-category', categoryController.addNewCategory);
router.post('/api/edit-category', categoryController.updateCategoryByID);
router.post('/api/delete-category', categoryController.deleteCategoryByID);
router.get('/admin-panel/comments', adminController.getAllCommentsPage);

module.exports = router;
