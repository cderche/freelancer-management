// Must load before passport.js
module.exports = function(app) {
  var session = require('express-session');
  var RedisStore = require('connect-redis')(session);

  var options = {
    url: process.env.REDIS_SESSIONS_URI
  }

  app.use(session({
    store: new RedisStore(options),
    secret: 'some_secret'
  }));
}
