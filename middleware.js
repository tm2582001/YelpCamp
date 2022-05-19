module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // original
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first");
    return res.redirect("/login");
  }
  next();
};

