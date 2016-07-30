module.exports = function(app) {

  this.find = function(req, res, next) {
    return res.send('User.find()')
  }

  this.findById = function(req, res, next) {
    return res.send(`User.findById(${req.params.id})`)
  }

  return this;

}
