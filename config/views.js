var path = require('path');

module.exports = function(app) {
  console.log('Configuring views.');
  app.set('../views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
}
