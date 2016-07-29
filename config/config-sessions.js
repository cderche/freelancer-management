// Must load before passport.js
module.exports = function(app) {
  var session = require('express-session');
  var RedisStore = require('connect-redis')(session);

  app.use(session({
    store: new RedisStore({ url: process.env.REDIS_SESSIONS_URI }),
    secret: 'some_secret'
  }));
}
