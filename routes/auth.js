module.exports = function(app) {
  var passport = require('passport')

  /* GET login page. */
  app.get('/login', function(req, res) {
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



}
