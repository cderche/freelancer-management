module.exports = function(app) {

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
  }

  var isVerified = function(req, res, next) {
    if (req.user.verified)
      return next()
    res.redirect('/verify');
  }

  /* GET Dashboard Page */
  app.get('/', isAuthenticated, isVerified, function(req, res) {
    res.render('dashboard', { title: 'Dashboard', body_class: 'nav-md', user: req.user, message: req.flash('message') });
  });

  app.get('/verify', isAuthenticated, function(req, res) {
    res.render('verify', { title: 'Account Verification', user: req.user, message: req.flash('message') });
  })

}
