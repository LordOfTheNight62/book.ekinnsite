const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Comment = require('../models/commentModel');

exports.getAdminPanelPage = async (req, res) => {
  try {
    const user = await User.getUserByID(req.session.userId);
    const statistics = {
      totalUser: await User.getTotalUserCount(),
      totalBooks: await Book.getTotalBookCount(),
      totalComments: await Comment.getAllCommentsCount(),
    };
    res.locals.layout = 'layouts/admin-layout';
    res.render('admin/admin-panel', { title: 'Yönetim Paneli', user, statistics });
  } catch (err) {}
};

exports.getAllUsersPage = async (req, res) => {
  try {
    const users = await User.getAllUserWithStatistics();
    const statistics = {
      totalUser: await User.getTotalUserCount(),
    };
    res.render('admin/users', { title: 'Üye Listesi', users, statistics });
  } catch (err) {}
};

exports.getAllCommentsPage = async (req, res) => {
  try {
    const comments = await Comment.getAllComments();
    const statistics = {
      totalComments: await Comment.getAllCommentsCount(),
    };
    res.render('admin/comments', { title: 'Tüm Yorumlar', comments, statistics });
  } catch (err) {}
};
