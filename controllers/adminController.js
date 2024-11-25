exports.getAdminPanelPage = (req, res) => {
  res.render('admin-panel', { title: 'Yönetim Paneli' });
};
