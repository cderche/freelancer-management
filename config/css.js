

module.exports = function(app) {
  var path = require('path');
  app.use(require('node-sass-middleware')({
    src: path.join(__dirname, '../public'),
    dest: path.join(__dirname, '../public'),
    indentedSyntax: true,
    sourceMap: true
  }));
}
