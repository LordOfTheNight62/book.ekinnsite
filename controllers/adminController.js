const User = require('../models/userModel');

exports.getAdminPanelPage = async (req, res) => {
  const user = await User.getUserByID(req.session.userId);
  const statistics = {
    totalUser: await User.getTotalUser(),
  };
  res.render('admin-panel', { title: 'Yönetim Paneli', user, statistics });
};
