module.exports = function(app) {
  var passport = require('passport')

  /* GET login page. */
  app.get('/login', function(req, res) {
    res.render('login', { title: 'Login', class_name: 'login', message: req.flash('message') });
  })

  /* Handle Login POST */
  app.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
  }));

  /* GET Registration Page */
  app.get('/signup', function(req, res){
    res.render('register', { title: 'Register', class_name: 'login', message: req.flash('message') });
  });

  /* Handle Registration POST */
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* Handle Logout */
  app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
  }

  /* GET Dashboard Page */
  app.get('/', isAuthenticated, function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('dashboard', { title: 'Dashboard', class_name: 'nav-md', user: req.user, message: req.flash('message') });
  });

}
