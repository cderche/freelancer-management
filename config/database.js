module.exports = function(app) {
  var mongoose = require('mongoose');
  // mongoose.connect(process.env.MONGODB_URL)
  mongoose.connect('mongodb://heroku_jl48rsp8:5s3uq3dh5kvnlf939bf8o2repk@ds029575.mlab.com:29575/heroku_jl48rsp8')

  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log(`we're connected!`)
  });
}
