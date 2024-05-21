module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      req.userId = req.user._id;
      return next();
    } else {
      res.redirect('/');
    }
  },
};
