const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/auth');

router.post('/user-data', isLoggedIn, userController.changeUserAvatar);

module.exports = router;
