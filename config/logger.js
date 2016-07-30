module.exports = function(app) {
  var logger = require('morgan');
  app.use(logger('dev'));
}
