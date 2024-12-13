const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require(path.join(__dirname, '../controllers/userController'));
const commentController = require(path.join(__dirname, '../controllers/commentController'));
const bookController = require(path.join(__dirname, '../controllers/bookController'));
const { isLoggedIn } = require(path.join(__dirname, '../middlewares/auth'));

router.post('/api/user-data', isLoggedIn, userController.changeUserData);
router.post('/api/user-comment', isLoggedIn, commentController.addNewComment);
router.post('/api/add-like', isLoggedIn, commentController.addLikeOrDislike);
router.post('/api/add-dislike', isLoggedIn, commentController.addLikeOrDislike);
router.post('/api/add-favorite', isLoggedIn, bookController.addNewFavorite);
router.post('/api/delete-favorite', isLoggedIn, bookController.deleteFavorite);
router.post('/api/user-delete-comment', isLoggedIn, commentController.deleteCommentByID);
router.post('/api/user-avatar', isLoggedIn, userController.changeUserAvatar);

module.exports = router;
