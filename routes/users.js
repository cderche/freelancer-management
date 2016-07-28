module.exports = function(app) {

  var user = app.middleware.user;

  app.get('/user', user.find);
  app.get('/user/:id', user.findById);

}
