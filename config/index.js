module.exports = function(app) {
  require('./views')(app)
  require('./favicon')(app)
  require('./logger')(app)
  require('./parsers')(app)
  require('./sass')(app)
  require('./public')(app)
  require('./sessions')(app)
}
