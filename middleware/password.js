module.exports = function(app) {

  this.forgot = function(req, res, next) {
    var username = req.body.username

    if (!username) {
      res.status(400)
      req.flash('message', `Username required`);
      return next()
    }

    // Find user
    User.findOne({ username: username }, function(err, user) {

      if (err || !user) {
        res.status(404)
        req.flash('message', `Unknown user ${req.body.username}`);
        return next()
      }

      // Generate & save reset token
      user.generate_reset_token(function() {
        // Send email with reset token
        req.flash('message', `Email sent to ${user.email}`);
        return next()
      })

    })
  }

  this.reset = function(req, res, next) {

    // Data
    if (!req.body || Object.keys(req.body).length == 0) {
      res.status(400)
      req.flash('message', `Data required`);
      return next()
    }

    // Password Match
    if (req.body.password !== req.body.password_confirmation) {
      res.status(400)
      req.flash('message', `Passwords don't match`);
      return next()
    }

    User.findOne({ reset_token: req.body.token }, function(err, user) {
      // Token not found
      if (err || !user) {
        res.status(404)
        req.flash('message', `Token doesn't exist`);
        return next()
      }

      if (user.reset_token_used) {
        res.status(403)
        req.flash('message', `This token has already been used`);
        return next()
      }

      user.password = User.create_hash(req.body.password)
      user.save(function(err) {
        if (err) {
          res.status(500)
          req.flash('message', `Something wrong happened on our side.`);
          return next()
        }
        req.flash('message', `Password was updated.`);
        res.redirect('/login')
      })


    })


  }

  return this;

}
