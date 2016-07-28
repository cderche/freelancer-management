var logger = require('morgan');

module.exports = function(app) {
  console.log('Configuring logger.');
  app.use(logger('dev'));
}
