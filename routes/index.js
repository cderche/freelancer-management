module.exports = function(app) {

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
  }

  /* GET Dashboard Page */
  app.get('/', isAuthenticated, function(req, res) {
    res.render('dashboard', { title: 'Dashboard', body_class: 'nav-md', user: req.user, message: req.flash('message') });
  });

}
