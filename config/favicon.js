module.exports = function(app) {
  var favicon = require('serve-favicon');
  var path = require('path');
  app.use(favicon(path.join(__dirname, '../.tmp/public', 'favicon.ico')));
}
