const express = require('express');
const router = express.Router();

const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

router.get('/admin-panel', isLoggedIn, isAdmin, adminController.getAdminPanelPage);

module.exports = router;
