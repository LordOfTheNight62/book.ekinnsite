exports.checkRedirect = (req, res, next) => {
  if (req.query.continue) {
    req.session.redirectTo = req.query.continue;
  }
  next();
};
