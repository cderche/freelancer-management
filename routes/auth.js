module.exports = function(app) {
  var passport = require('passport')

  /* GET login page. */
  app.get('/login', function(req, res) {
    if (req.isAuthenticated())
      return res.redirect('/')
    res.render('login', { title: 'Login', body_class: 'login', message: req.flash('message') });
  })

  /* Handle Login POST */
  app.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
  }));

  /* GET Registration Page */
  app.get('/signup', function(req, res){
    res.render('register', { title: 'Register', body_class: 'login', message: req.flash('message') });
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

  app.get('/forgot', function(req, res) {
    if (req.isAuthenticated())
      return res.redirect('/')
    res.render('forgot', { title: 'Forgot Password', body_class: 'login', message: req.flash('message') });
  })

  app.post('/forgot', app.middleware.password.forgot, function(req, res) {
    res.render('forgot', { title: 'Forgot Password', body_class: 'login', message: req.flash('message') });
  })

  app.get('/reset', function(req, res) {
    res.render('reset', { title: 'Reset Password', body_class: 'login', message: req.flash('message') });
  })

  app.post('/reset', app.middleware.password.reset, function(req, res) {
    res.render('reset', { title: 'Reset Password', body_class: 'login', message: req.flash('message') });
  })

}
