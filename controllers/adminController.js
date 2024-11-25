const User = require('../models/userModel');

exports.getAdminPanelPage = async (req, res) => {
  const user = await User.getUserByID(req.session.userId);
  res.render('admin-panel', { title: 'Yönetim Paneli', user });
};
