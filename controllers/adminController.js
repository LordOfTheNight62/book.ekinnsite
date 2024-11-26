const User = require('../models/userModel');

exports.getAdminPanelPage = async (req, res) => {
  try {
    const user = await User.getUserByID(req.session.userId);
    const statistics = {
      totalUser: await User.getTotalUserCount(),
    };
    res.render('admin-panel', { title: 'Yönetim Paneli', user, statistics });
  } catch (err) {}
};

exports.getAllUsersPage = async (req, res) => {
  try {
    const users = await User.getAllUser();
    const statistics = {
      totalUser: await User.getTotalUserCount(),
    };
    res.render('users', { title: 'Üye Listesi', users, statistics });
  } catch (err) {}
};
