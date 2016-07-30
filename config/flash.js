module.exports = function(app) {
  var flash = require('connect-flash')
  app.use(flash());
}
