// Oturum kontrol middleware'i
exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }

  if (req.originalUrl !== '/login' && req.originalUrl !== '/register') {
    req.session.redirectTo = req.originalUrl;
  }
  return res.redirect('/login');
};

exports.redirectIfLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    const redirectUrl = req.session.redirectTo || '/account';
    delete req.session.redirectTo;
    return res.status(302).redirect(redirectUrl);
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
