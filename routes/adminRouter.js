const express = require('express');
const router = express.Router();

const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

router.use('/admin-panel', isLoggedIn, isAdmin);

router.get('/admin-panel', adminController.getAdminPanelPage);
router.get('/admin-panel/users', adminController.getAllUsersPage);

module.exports = router;
