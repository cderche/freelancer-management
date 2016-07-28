if (!global.hasOwnProperty('User')) {
  var mongoose = require('mongoose')

  global.User = mongoose.model('User', {
    username: String,
    password: String,
    email:    String
  })
}

module.exports = global.User
