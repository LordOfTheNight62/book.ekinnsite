const express = require('express');
const router = express.Router();

const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');
const categoryController = require('../controllers/categoryController');

router.use('/admin-panel', isLoggedIn, isAdmin);

router.get('/admin-panel', adminController.getAdminPanelPage);
router.get('/admin-panel/users', adminController.getAllUsersPage);
router.get('/admin-panel/categories', adminController.getCategoriesPage);
router.post('/api/add-category', categoryController.addNewCategory);
router.post('/api/edit-category', categoryController.updateCategoryByID);
router.post('/api/delete-category', categoryController.deleteCategoryByID);
router.get('/admin-panel/comments', adminController.getAllCommentsPage);

module.exports = router;
