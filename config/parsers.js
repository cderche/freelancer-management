var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function(app) {
  console.log('Configuring parsers.');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
}
