module.exports = function(app) {
  var passport = require('passport')

  /* GET login page. */
  app.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', { title: 'Express', message: req.flash('message') });
  });

  /* Handle Login POST */
  app.post('/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* GET Registration Page */
  app.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });

  /* Handle Registration POST */
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* Handle Logout */
  app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  /* Handle Logout */
  app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      console.log('Authenticated');
      return next();
    console.log('Not Authenticated');
    res.redirect('/');
  }

  /* GET Dashboard */
  app.get('/dashboard', isAuthenticated, function(req, res){
    res.render('dashboard', { user: req.user });
  });

}
