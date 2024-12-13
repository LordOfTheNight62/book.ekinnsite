const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require(path.join(__dirname, '../controllers/userController'));
const { isLoggedIn, redirectIfLoggedIn } = require(path.join(__dirname, '../middlewares/auth'));

router.get('/login', redirectIfLoggedIn, userController.getLoginPage);
router.post('/login', userController.loginUser);
router.get('/register', redirectIfLoggedIn, userController.getRegisterPage);
router.post('/register', userController.createNewUser);

router.get('/account', isLoggedIn, userController.getAccountPage);
router.get('/account/mycomments', isLoggedIn, userController.getAllMyCommentsPage);
router.get('/account/mybooks', isLoggedIn, userController.getMyBooksPage);
router.get('/account/myfavorites', isLoggedIn, userController.getMyFavoritesPage);
router.post('/account', isLoggedIn, (req, res, next) => {
  if (req.query.req === 'change-password') {
    return userController.changeUserPassword(req, res);
  } else if (req.query.req === 'delete-account') {
    return userController.deleteUserByID(req, res);
  }
});
router.get('/logout', isLoggedIn, userController.logoutUser);
router.get('/logout-all', isLoggedIn, userController.logoutUserFromEverywhere);

module.exports = router;
