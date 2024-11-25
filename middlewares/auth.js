// Oturum kontrol middleware'i
exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  return res.redirect('/login');
};

exports.redirectIfLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/account');
  }
  next();
};

// Rol kontrol middleware'i
exports.isAdmin = (req, res, next) => {
  if (req.session.role === 'admin') {
    return next();
  }
  return res.status(403).render('error/error.ejs', {
    title: '403',
    statusCode: '403',
    message: 'Sanırım yanlış geldiniz :)',
  });
};
