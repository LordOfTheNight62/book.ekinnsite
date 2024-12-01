const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const { isLoggedIn } = require('../middlewares/auth');

router.post('/api/user-data', isLoggedIn, userController.changeUserData);
router.post('/api/user-comment', isLoggedIn, commentController.addNewComment);
router.post('/api/user-delete-comment', isLoggedIn, commentController.deleteCommentByID);
router.post('/api/user-avatar', isLoggedIn, userController.changeUserAvatar);

module.exports = router;
