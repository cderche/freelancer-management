// Must run after config-session
module.exports = function(app) {

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  // var bCrypt = require('bcrypt-nodejs');

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {
      console.log('passport.use(login)');
      // var isValidPassword = function(user, password){
      //   return bCrypt.compareSync(password, user.password);
      // }

      // check in mongo if a user with username exists or not
      User.findOne({ 'username' :  username },
        function(err, user) {
          // In case of any error, return using the done method
          if (err)
            return done(err);
          // Username does not exist, log error & redirect back
          if (!user){
            console.log('User Not Found with username '+username);
            return done(null, false,
                  req.flash('message', 'Invalid Email or Password.'));
          }
          // User exists but wrong password, log the error
          if (!user.validate_password(password)){
            console.log('Invalid Password');
            return done(null, false,
                req.flash('message', 'Invalid Email or Password.'));
          }
          // // User has been verified
          // if(!user.verified) {
          //   console.log('User has not been verified');
          //   return done(null, false,
          //       req.flash('message', 'This account has not been verified.'));
          // }

          // User and password both match, return user from
          // done method which will be treated like success
          return done(null, user);
        }
      );
    }
  ));

  passport.use('signup', new LocalStrategy({
      usernameField: 'email',
      passReqToCallback : true
    },
    function(req, username, password, done) {
      console.log('passport.use(signup)', username);
      // Generates hash using bCrypt
      // var createHash = function(password){
      //  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
      // }

      findOrCreateUser = function(){
        // find a user in Mongo with provided username
        User.findOne({'username':username},function(err, user) {
          // In case of any error return
          if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          // already exists
          if (user) {
            console.log('User already exists');
            return done(null, false,
               req.flash('message','User Already Exists'));
          } else {
            // if there is no user with that email
            // create the user
            console.log(req.body);
            var newUser = new User(req.body);
            newUser.username = username
            newUser.password = User.create_hash(password)
            // set the user's local credentials

            // save the user
            newUser.save(function(err) {
              if (err){
                console.log('Error in Saving user: '+err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          }
        });
      };

      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

}
